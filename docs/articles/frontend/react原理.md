# react原理

图片和内容部分来自 https://aojiaodemeng.github.io/react-illustration-series/

## 核心包关系图分析

![核心包关系图](images/react-core.png)

下面为基于文档中 `react-core.png` 的详尽说明，按职责分层并补充示例调用序列，便于把抽象流程对应到源码实现。

一、总体分工（一句话概括）
- `react-reconciler`：负责构建/调和 Fiber 树（计算差异、收集副作用）。
- `scheduler`：负责按优先级/时间切片调度调和工作，决定何时运行 reconciler 的 `workLoop`。
- `react-dom`：负责提交阶段（把 reconciler 的副作用应用到浏览器 DOM）以及宿主环境的配置（`ReactDOMHostConfig`）。

二、关键模块与职责（深入）
- `react-reconciler`（调和细节）
	- `workLoop`：驱动调和的循环体，按照是否并发（concurrent）选择不同入口：`renderRootConcurrent` 或 `renderRootSync`。
	- `performUnitOfWork(fiber)`：每次处理单个 Fiber 节点，职责分成两部分：
		- `beginWork(fiber)`：计算该 fiber 的下一个状态，处理 `updateQueue`（合并 setState/update），并调用子节点的 reconciliation（例如 `reconcileChildren`）以生成/复用子 fiber；此阶段可能发生 bailout（当 props/state 未变时跳过子树）。
		- `completeWork(fiber)`：完成当前节点，生成 DOM 节点（host component）或收集副作用（例如需要插入/删除/更新的标记），并把这些副作用通过 fiber 链接到父节点（维护 `firstEffect`/`lastEffect`/`nextEffect`）。
	- effect（副作用）收集：调和阶段不会直接操作 DOM，而是把需要在提交阶段执行的操作记录在 effect list 上，最终由 `commitRoot` 统一执行。

- `react-dom`（提交阶段的三部分）
	- Before Mutation（变更前）阶段：触发 `getSnapshotBeforeUpdate` 等需要在 DOM 更新前读取布局信息的生命周期/Hook。
	- Mutation（变更）阶段：执行实际的 DOM 操作（插入、删除、更新属性）。
	- Layout（布局）阶段：同步调用 `useLayoutEffect` 的回调与 ref 的更新，这些在变更应用后立即运行。

- `scheduler`（调度与时间切片）
	- 核心是提供 `unstable_scheduleCallback`、`unstable_cancelCallback`、`requestHostCallback` 等接口，决定何时调用传入的回调。
	- 常见宿主实现采用 `MessageChannel` 驱动微任务轮询；时间切片由 `shouldYield()` 与 `frameDeadline` 控制（即长任务中断并在下一帧继续）。
	- Scheduler 按“优先级 lane”或“优先级等级”（Immediate、UserBlocking、Normal、Low、Idle）来排序任务，React 的 `ensureRootIsScheduled` 会把更新映射到合适的优先级并选择 `scheduleSyncCallback`（同步）或 `scheduleCallback`（异步）进行注册。

三、典型调用序列（带示例，便于对照源码）
下面以一个并发模式下组件调用 `setState` 为例，给出从触发到 DOM 更新的关键步骤（数字可与图上箭头对应）：

1. 组件调用 `setState`：向当前 fiber 的 `updateQueue` 推入更新对象。
2. React 触发 `updateContainer` / `scheduleUpdateOnFiber`：找到根 fiber 并调用 `ensureRootIsScheduled(root, currentEventPriority)`。
3. `ensureRootIsScheduled`：根据更新的 lane/优先级选择调度函数：若为同步优先级调用 `scheduleSyncCallback`，否则调用 `scheduleCallback`（并传入合适的优先级）。
4. Scheduler 层：通过 `requestHostCallback` 把任务注册到宿主（例如 `MessageChannel`），等待宿主唤醒并在合适时间调用回调。
5. 宿主执行回调到 Scheduler 的 `workLoop`：Scheduler 检查任务优先级并在当前帧内调用 React 提供的回调（即 reconciler 的 `performConcurrentWorkOnRoot`）。
6. `performConcurrentWorkOnRoot` 调用 reconciler 的 `workLoop`：开始 `performUnitOfWork` 的循环，`beginWork` 创建/更新子 fiber，`completeWork` 收集 effect。
7. 当调和完成（或中途被时间切片暂停）并存在副作用时，reconciler 调用 `commitRoot` 进入提交阶段。
8. `commitRoot` 按顺序执行 Before Mutation → Mutation → Layout 阶段，最终 DOM 更新完成，`useLayoutEffect` 回调执行，refs 被同步更新。

## 启动过程

![](./images/react-start.png)

区分legacy（react 17 及更早）和concurrent（react 18+）入口的示例：


```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// 同步渲染（React 17 及更早常用）
ReactDOM.render(<App />, document.getElementById('root'))
```


```jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// 并发根（React 18+ 推荐）
const root = createRoot(document.getElementById('root'))
root.render(<App />)
```

- `ReactDOMRoot / ReactDOMBlockingRoot / LegacyRoot`（第一个对象：外部根对象）
	- 由 `createRoot` / `createBlockingRoot` / 旧的 `render` 路径构建，`createRoot`和`createBlockingRoot`会返回这个外部根对象，但旧的 `render` 路径不会返回外部根对象。它们是对外的宿主根对象，包含对内部根（通常存放在 `this._internalRoot`，会调用`createRootImpl`返回函数结果）的引用，并对外暴露 `render`/`unmount` 等方法。

- `fiberRoot`（react内部根状态对象，图中第二个对象）
	- 由 `createContainer` → `createFiberRoot` 创建，是调和器维护的根级别全局状态（比如 `current` 指向根 fiber、callback 列表、pending updates、containerInfo 等）。
	- `markContainerAsRoot` 会把宿主（DOM）容器标记为根并把它与 `fiberRoot` 关联。关联顺序外部根对象 → `fiberRoot` → DOM容器

- `hostRootFiber`（HostRoot 类型的第一个 Fiber，图中第三个对象）
	- `createHostRootFiber` 返回的第一个 Fiber 实例，`fiberRoot.current` 指向它。它的 `mode` 位决定了后续树上节点的工作模式（如并发/阻塞/同步相关的 flags）。
	- 此 Fiber 上会初始化 `updateQueue`（图中 `initialUpdateQueue`），用于保存挂起的根级更新（例如 hydration 或初次 mount 的更新）。

主要调用序列（简化）：

1. 调用 `createRoot(container)` / `createBlockingRoot` / `legacy render`。
2. 在 `createRootImpl`/`createContainer` 内部，会调用 `markContainerAsRoot(container)`，然后调用 `createFiberRoot(containerInfo, ...)` 创建 `fiberRoot`。
3. `createFiberRoot` 调用 `createHostRootFiber(mode)` 生成根 Fiber，并在 root 上建立 `initialUpdateQueue`、把 `fiberRoot.current` 指向该 hostRootFiber。
4. `ReactDOMRoot`（或其变体）将 `fiberRoot` 保存为内部引用（例如 `this._internalRoot = createRootImpl(...)`），对外提供 `render` 调度入口；后续的更新走 `scheduleUpdateOnFiber` → reconciler 的调度路径。

关键说明：

- 启用方式：并发能力是按“根”启用的——使用 `createRoot` 创建的根会走并发/可中断的调度路径；使用 `ReactDOM.render` 的根则是同步老路径。
- 调度差异：并发根会把渲染拆成可中断的工作（时间切片），使用更细粒度的优先级调度（lane）；老根是同步，一次性完成调和与提交。
- react 中最广为人知的可中断渲染(`render` 可以中断, 部分生命周期函数有可能执行多次,`UNSAFE_componentWillMount`,`UNSAFE_componentWillReceiveProps`)只有在`HostRootFiber.mode === ConcurrentRoot | BlockingRoot`才会开启. 如果使用的是`legacy`, 即通过`ReactDOM.render(<App/>, dom)`这种方式启动时`HostRootFiber.mode = NoMode`, 这种情况下无论是首次 `render` 还是后续 `update` 都只会进入同步工作循环, `reconciliation`没有机会中断, 所以生命周期函数只会调用一次.
- 副作用可观察性：在并发模式下某些副作用触发时机会和旧模式不同；开发模式的 `StrictMode` 还会额外双调用组件 mount/unmount 来帮助发现不安全的副作用。
- 新 API：并发根支持 `startTransition`/`useTransition`、更广泛的自动批处理与改进的 `Suspense` 行为，便于构建响应性更好的界面。

## 优先级管理

实现的功能：
- 可中断渲染：允许调和过程被打断，以便在高优先级任务（如用户交互）到来时能及时响应。
- 时间切片：将长时间运行的任务分割成多个小块，在每个块之间检查是否需要让出控制权，以保持界面响应。
- 异步渲染：支持在未来某个时间点完成渲染，而不是必须立即完成。

内部存在的优先级类型：
- fiber优先级（lane）：React 内部使用 lane 来表示更新的优先级，常见的有 Immediate、UserBlocking、Normal、Low、Idle 等等级。每个更新会被分配一个或多个 lane，调度器根据 lane 的优先级来决定何时执行该更新。
- 调度优先级：Scheduler 提供的优先级等级（ImmediatePriority、UserBlockingPriority、NormalPriority、LowPriority、IdlePriority）用于调度回调的执行时机。
- 优先级等级：实现上述两套优先级体系的切换

### 什么是Lane（车道模型）？

1. `Lane`类型被定义为二进制变量, 利用了位掩码的特性, 在频繁运算的时候占用内存少, 计算速度快.
   - `Lane`和`Lanes`就是单数和复数的关系, 代表单个任务的定义为`Lane`, 代表多个任务的定义为`Lanes`
2. 旧版使用的字段是`expirationTime`, 代表任务的过期时间, 通过比较过期时间来判断优先级. 新版使用`Lane`, 代表任务的优先级, 通过比较`Lane`的优先级来判断优先级.以前使用的`expirationTime`都改为`Lane`来管理优先级.
3. `Lane`相较于`expirationTime`的优势在于：
   1. 更高的性能：`Lane`使用位掩码进行优先级计算，内存占用更少，计算速度更快。
      > 在expirationTime模型设计之初, react 体系中还没有Suspense 异步渲染的概念. 现在有如下场景: 有 3 个任务, 其优先级 A > B > C, 正常来讲只需要按照优先级顺序执行就可以了. 但是现在情况变了: A 和 C 任务是CPU密集型, 而 B 是IO密集型(Suspense 会调用远程 api, 算是 IO 任务), 即 A(cpu) > B(IO) > C(cpu). 此时的需求需要将任务B从 group 中分离出来, 先处理 cpu 任务A和C.
```javascript
// 从 group 中删除或增加 task
// 1) 通过 expirationTime 实现（链表）
// - 删除单个 task（从链表中删除一个元素）
task.prev.next = task.next;

// - 增加单个 task（按优先级插入链表）
let current = queue;
while (task.expirationTime >= current.expirationTime) {
  current = current.next;
}
task.next = current.next;
current.next = task;

// - 比较 task 是否在 group 中（基于范围）
const isTaskIncludedInBatchByExpiration =
  taskPriority <= highestPriorityInRange &&
  taskPriority >= lowestPriorityInRange;

// 2) 通过 Lanes 实现（位运算）
// - 删除单个 task
batchOfTasks &= ~task;
// - 增加单个 task
batchOfTasks |= task;
// - 比较 task 是否在 group 中（基于位掩码）
const isTaskIncludedInBatchByLanes = (task & batchOfTasks) !== 0;
```
   2. 更方便判断单个任务和批量任务的优先级是否重叠
```javascript
// 判断：单 task 与 batch 的优先级是否重叠
// 1) 基于 expirationTime
const isTaskIncludedInBatchByExpiration = priorityOfTask >= priorityOfBatch;
// 2) 基于 Lanes（位掩码）
const isTaskIncludedInBatchByLanes = (task & batchOfTasks) !== 0;

// 当处理一组任务且每个任务优先级不一致时：
// - expirationTime 需要维护 [highest, lowest] 范围
const isTaskIncludedInBatchRange =
  taskPriority <= highestPriorityInRange &&
  taskPriority >= lowestPriorityInRange;
// - Lanes 直接通过位运算判断
const isTaskIncludedInBatchByLanes2 = (task & batchOfTasks) !== 0;
```

### 常见车道类型


- `NoLane`
	- 二进制：`0b0`

- `Sync` / `Immediate`（位 0）
	- 二进制：`0b1` （`1 << 0`）

- `InputDiscrete`（离散输入，位 1）
	- 二进制：`0b10` （`1 << 1`）

- `InputContinuous`（连续输入，位 2）
	- 二进制：`0b100` （`1 << 2`）

- `Default`（默认，位 3）
	- 二进制：`0b1000` （`1 << 3`）

- `Transition`（过渡 / startTransition，示例占用位 4..15）
	- 示例：`TransitionLane1 = 0b1_0000` （`1 << 4`）、`TransitionLane2 = 0b10_0000` （`1 << 5`），依此类推直到 `1 << 15`。

- `Retry` / `Hydration`（示例高位，例如位 16..17）
	- 示例：`0b1 << 16`、`0b1 << 17`

- `Low` / `Idle`（低优先级 / 空闲，例如位 22..23）
	- 示例：`0b1 << 22`、`0b1 << 23`

说明：React 通过组合这些位（位掩码）来表示一组 pending lanes，例如 `pendingLanes |= TransitionLane1`，并用 `(pendingLanes & lane) !== 0` 来判断某个 lane 是否存在。JavaScript 的位运算在底层当作有符号 32 位整数，最高位是符号位（索引 31）。为了避免符号位带来的负数/不确定行为，实践中只用低 31 位（索引 0 到 30）

## 调度原理

```markdown
外部发起调度
    ↓
unstable_scheduleCallback
    ├─ 生成任务：id、callback、priorityLevel、startTime
    ├─ 根据优先级计算 timeout → expirationTime
    ├─ sortIndex = expirationTime
    └─ 推入最小堆 taskQueue，并 requestHostCallback(flushWork)
                ↓
requestHostCallback
    ├─ 保存 scheduledHostCallback = flushWork
    └─ port.postMessage(null) 触发异步宏任务
                ↓
performWorkUntilDeadline
    ├─ 设置 deadline = now + yieldInterval（5ms）
    ├─ 执行 flushWork
    └─ 根据返回值判断是否继续下一轮调度
                ↓
flushWork
    ├─ 标记正在工作
    └─ 调用 workLoop 消费任务队列
                ↓
workLoop【时间切片核心】
    ├─ 取堆顶任务（sortIndex 最小，优先级最高）
    ├─ 判断：是否过期 / 是否需要让出主线程（shouldYieldToHost）
    ├─ 执行任务 callback
    ├─ 任务完成则 pop 出堆，未完成则保留
    └─ 返回是否还有剩余任务
                ↓
shouldYieldToHost【是否暂停】
    ├─ 超过 5ms 且有用户输入/渲染 → 让出
    ├─ 超过 300ms → 必须让出
    └─ 否则继续执行
```

### unstable_scheduleCallback

调度的入口，实现将任务注册到 Scheduler 中。它会根据传入的优先级计算任务的过期时间，并把任务推入一个最小堆（`taskQueue`）中，确保优先级最高的任务总是在堆顶。

主要功能
1. 创建任务
2. 加入任务队列 taskQueue
3. 调用 requestHostCallback 开始调度
4. 支持优先级

```javascript
// 省略部分无关代码
function unstable_scheduleCallback(priorityLevel, callback, options) {
  // 1. 获取当前时间
  var currentTime = getCurrentTime();
  var startTime;
  if (typeof options === 'object' && options !== null) {
    // 从函数调用关系来看, 在v17.0.2中,所有调用 unstable_scheduleCallback 都未传入options
    // 所以省略延时任务相关的代码
  } else {
    startTime = currentTime;
  }
  // 2. 根据传入的优先级, 设置任务的过期时间
  var timeout;
  switch (priorityLevel) {
    case ImmediatePriority:
      timeout = IMMEDIATE_PRIORITY_TIMEOUT;
      break;
    case UserBlockingPriority:
      timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
      break;
    case IdlePriority:
      timeout = IDLE_PRIORITY_TIMEOUT;
      break;
    case LowPriority:
      timeout = LOW_PRIORITY_TIMEOUT;
      break;
    case NormalPriority:
    default:
      timeout = NORMAL_PRIORITY_TIMEOUT;
      break;
  }
  // 通过初始时间和 timeout 计算出过期时间
  var expirationTime = startTime + timeout;
  // 3. 创建新任务
  var newTask = {
    id: taskIdCounter++,
    callback,
    priorityLevel,
    startTime,
    expirationTime,
    sortIndex: -1,
  };
  if (startTime > currentTime) {
    // 省略无关代码 v17.0.2中不会使用
  } else {
    newTask.sortIndex = expirationTime; // 根据过期时间排序，过期时间越早优先级越高，如果过期时间一致，则根据任务 id 排序，id 越小优先级越高
    // 4. 加入任务队列
    push(taskQueue, newTask);
    // 5. 请求调度
    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork); // 这里把 flushWork 注册到宿主环境，等待执行
    }
  }
  return newTask;
}
```

### requestHostCallback

实现异步调度。 React Scheduler 通过 `requestHostCallback` 把回调注册到宿主环境（例如浏览器），常见的实现是利用 `MessageChannel` 来创建一个异步执行器，确保回调在“下一个宏任务”中执行，从而不阻塞当前的渲染或用户交互。

```javascript
const channel = new MessageChannel();
const port = channel.port2;
channel.port1.onmessage = performWorkUntilDeadline;

// 请求回调
requestHostCallback = function(callback) {
  // 1. 保存callback
  scheduledHostCallback = callback;
  if (!isMessageLoopRunning) {
    isMessageLoopRunning = true;
    // 2. 通过 MessageChannel 发送消息
    port.postMessage(null);
  }
};
// 取消回调
cancelHostCallback = function() {
  scheduledHostCallback = null;
};
```

### performWorkUntilDeadline 

实际的任务执行代码，是 Scheduler 的核心执行入口。它会在宿主环境（例如浏览器）触发时被调用，负责执行调度的回调函数（通常是 `flushWork`），并根据执行结果决定是否继续下一轮调度。

```javascript
const performWorkUntilDeadline = () => {
  if (scheduledHostCallback !== null) {
    const currentTime = getCurrentTime(); // 1. 获取当前时间
    deadline = currentTime + yieldInterval; // 2. 设置deadline
    const hasTimeRemaining = true;
    try {
      // 3. 执行回调, 返回是否有还有剩余任务
      const hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
      if (!hasMoreWork) {
        // 没有剩余任务, 退出
        isMessageLoopRunning = false;
        scheduledHostCallback = null;
      } else {
        port.postMessage(null); // 有剩余任务, 发起新的调度
      }
    } catch (error) {
      port.postMessage(null); // 如有异常, 重新发起调度
      throw error;
    }
  } else {
    isMessageLoopRunning = false;
  }
  needsPaint = false; // 重置开关
};
```

### flushWork

`flushWork` 负责维护调度状态，并调用 `workLoop` 来执行任务队列中的任务。它会设置全局标记来表示正在执行调度，并在完成后还原这些标记，以确保调度状态的正确性。

```javascript
// 省略无关代码
function flushWork(hasTimeRemaining, initialTime) {
  // 1. 做好全局标记, 表示现在已经进入调度阶段
  isHostCallbackScheduled = false;
  isPerformingWork = true;
  const previousPriorityLevel = currentPriorityLevel;
  try {
    // 2. 循环消费队列
    return workLoop(hasTimeRemaining, initialTime);
  } finally {
    // 3. 还原全局标记
    currentTask = null;
    currentPriorityLevel = previousPriorityLevel;
    isPerformingWork = false;
  }
}
```
### workLoop

`workLoop` 是 Scheduler 中的核心函数，负责从 `taskQueue` 中取出任务并执行。它会根据任务的过期时间和当前时间来判断是否需要让出主线程，以实现时间切片。

```javascript
// 省略部分无关代码
function workLoop(hasTimeRemaining, initialTime) {
  let currentTime = initialTime; // 保存当前时间, 用于判断任务是否过期
  currentTask = peek(taskQueue); // 获取队列中的第一个任务
  while (currentTask !== null) {
    if (
      currentTask.expirationTime > currentTime &&
      (!hasTimeRemaining || shouldYieldToHost())
    ) {
      // 虽然currentTask没有过期, 但是执行时间超过了限制(毕竟只有5ms, shouldYieldToHost()返回true). 停止继续执行, 让出主线程
      break;
    }
    const callback = currentTask.callback;
    if (typeof callback === 'function') {
      currentTask.callback = null;
      currentPriorityLevel = currentTask.priorityLevel;
      const didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
      // 执行回调
      const continuationCallback = callback(didUserCallbackTimeout);
      currentTime = getCurrentTime();
      // 回调完成, 判断是否还有连续(派生)回调
      if (typeof continuationCallback === 'function') {
        // 产生了连续回调(如fiber树太大, 出现了中断渲染), 保留currentTask
        currentTask.callback = continuationCallback;
      } else {
        // 把currentTask移出队列
        if (currentTask === peek(taskQueue)) {
          pop(taskQueue);
        }
      }
    } else {
      // 如果任务被取消(这时currentTask.callback = null), 将其移出队列
      pop(taskQueue);
    }
    // 更新currentTask
    currentTask = peek(taskQueue);
  }
  if (currentTask !== null) {
    return true; // 如果task队列没有清空, 返回true. 等待调度中心下一次回调
  } else {
    return false; // task队列已经清空, 返回false.
  }
}
```

### shouldYieldToHost

时间切片功能, 用于判断当前任务是否已经执行超过了时间切片的周期（默认5ms），如果是则让出主线程，以便浏览器可以处理用户输入或渲染等高优先级任务。

```javascript
const localPerformance = performance;
// 获取当前时间
getCurrentTime = () => localPerformance.now();

// 时间切片周期, 默认是5ms(如果一个task运行超过该周期, 下一个task执行之前, 会把控制权归还浏览器)
let yieldInterval = 5;

let deadline = 0; // deadline会在其他函数中被设置为当前时间 + yieldInterval, 用于判断是否需要让出主线程
const maxYieldInterval = 300;
let needsPaint = false;
const scheduling = navigator.scheduling;
// 是否让出主线程
shouldYieldToHost = function() {
  const currentTime = getCurrentTime();
  if (currentTime >= deadline) {
	// 需要
    if (needsPaint || scheduling.isInputPending()) {
      return true;
    }
    return currentTime >= maxYieldInterval; // 这里的 maxYieldInterval 通过一个大的时间阈值，在应用启动初期给予 React 更高的执行权重，而在 300ms 后切换到以 5ms 为周期的严格时间切片模式。
  } else {
    // 依然有时间片可以执行, 不需要让出主线程
    return false;
  }
};

// 请求绘制
requestPaint = function() {
  needsPaint = true;
};

// 设置时间切片的周期
forceFrameRate = function(fps) {
  if (fps < 0 || fps > 125) {
    // Using console['error'] to evade Babel and ESLint
    console['error'](
      'forceFrameRate takes a positive int between 0 and 125, ' +
        'forcing frame rates higher than 125 fps is not supported',
    );
    return;
  }
  if (fps > 0) {
    yieldInterval = Math.floor(1000 / fps);
  } else {
    // reset the framerate
    yieldInterval = 5;
  }
};
```

> navigator.scheduling.isInputPending() 是一个实验性 API，用于检测是否有用户输入事件（如点击、键盘输入等）正在等待处理。React Scheduler 使用它来判断是否需要让出主线程，以便浏览器可以优先处理用户输入，从而提高界面响应性。如果用户有输入等待处理，这个函数会返回true

### 与react-conciler的关系

`react-conciler`在第二步中使用`ensureRootIsScheduled`, 通过这个函数来调用`unstable_scheduleCallback`把调和任务注册到 Scheduler 中。

```javascript
function ensureRootIsScheduled(root, currentTime) {
  // 1. 获取当前 root 上所有等待处理的 Lanes 中优先级最高的那一个
  const nextLanes = getNextLanes(root, NoLanes);
  
  // 2. 如果没有任务了，取消之前的调度并退出（有可能是更新合并或者组件卸载）
  if (nextLanes === NoLanes) {
    if (root.callbackNode !== null) {
      cancelCallback(root.callbackNode);
    }
    root.callbackPriority = NoLane;
    root.callbackNode = null;
    return;
  }

  // 3. 检查当前是否已经有一个正在进行的调度任务
  const existingCallbackPriority = root.callbackPriority; // 当前正在调度的任务优先级
  const newCallbackPriority = getHighestPriorityLane(nextLanes); // 新任务的优先级（即等待处理的 lanes 中优先级最高的 lane）

  // 【核心点】如果新任务的优先级和正在运行的任务优先级一致，直接复用，不需要重复调度(防抖)
  if (newCallbackPriority === existingCallbackPriority) {
    return;
  }

  // 4. 如果优先级变了（有了更高优先级的任务），取消旧的并开启新的
  if (root.callbackNode !== null) {
    cancelCallback(root.callbackNode);
  }

  let newCallbackNode;
  // 5. 根据优先级决定调用 Scheduler 的哪个接口
  if (newCallbackPriority === SyncLane) {
    // 同步任务（Legacy 模式或高优同步）
    scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root));
    newCallbackNode = null; 
  } else {
    // 异步/并发任务
    const schedulerPriorityLevel = lanePriorityToSchedulerPriority(newCallbackPriority);
    // 关键：这里调用了你文档中写的 unstable_scheduleCallback
    newCallbackNode = scheduleCallback(
      schedulerPriorityLevel,
      performConcurrentWorkOnRoot.bind(null, root)
    );
  }

  root.callbackPriority = newCallbackPriority;
  root.callbackNode = newCallbackNode;
}
```

## fiber