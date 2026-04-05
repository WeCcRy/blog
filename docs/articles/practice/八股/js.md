# JavaScript

## JS的数据类型有哪些，区别是什么

八大数据类型:Undefined,Null,Boolean,Number,String,Object,Symbol,BigInt

Symbol和BigInt是ES6引入的新类型，Symbol代表创建后独一无二的数据类型，BigInt用来表示Number无法精确表示的范围

栈->存储原始数据类型(Undefined,Null,Boolean,Number,String,Symbol,BigInt)

堆->存储引用数据类型(Object,Array,Function)

两种类型的区别是：

- 原始数据类型直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；
- 引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

V8 引擎中存在两个完全不同的 “堆”：
- 堆内存：用于存储引用类型对象，是动态内存区域，实际就是一块内存空间，其中分为新生代和老生代。
- 堆结构（优先队列）：用于内部调度，如定时器排序、任务优先级管理、GC 算法。
前者是内存空间，后者是算法工具，同名但完全无关。

通过Symbol.for()可以获得对应字符串的唯一Symbol，该方法在同一个环境下获得值均是相同的

使用Symbol.keyFor(symbol)可以获得symbol对应的字符串

## BigInt相关补充

背景：后端传入一个相当大的数字，js无法精确表示，导致回显错误

前端中可以接受到的最大数值为2^53-1，超过这个数值会出现精度丢失的问题，js会自动四舍五入

BigInt只有在前端中自己声明时才可以表示超出该范围的数值，后端传入的数字再解析的时候就会自动四舍五入，没办法处理

```js
// BigInt的使用方式
const bigIntValue = BigInt("1234567890123456789012345678901234567890"); // 使用字符串创建
const bigIntValue2 = 1234567890123456789012345678901234567890n; // 使用数字后加n创建,不加n会自动四舍五入
```

## 如何检测数据类型

```javascript
// 1.typeof
console.log(typeof 2);  // number
// 2.instanceof 只能用于判断引用类型数据
console.log([] instanceof Array) // true
console.log({} instanceof Object) // true
const arrowFunc = () => console.log();
console.log(arrowFunc instanceof Function); // true
// 3.constructor 一般用于查看对象上的构造函数。如果原型链prototype的指向被修改，则constructor也会指向新的构造函数
console.log((2).constructor) // ƒ Number() { [native code] }
console.log((2).constructor.name) // Number 可用于类型检查
// 4.对象上的原型方法Object.prototype.toString.call(),注意这里的tostring是Object身上的，而不是普通obj上的，普通obj的tostring方法会被重写
console.log(Object.prototype.toString.call(2)) // '[object Number]'
```

## 如何检测数组类型

```js
obj = []
// 1.Object.prototype.toString.call(obj).slice(8.-1),slice用于裁切掉[object ]
console.log(Object.prototype.toString.call(obj).slice(8,-1)=='Array') //true

// 2.原型链判断
obj.__proto__ === Array.prototype;

// 3.ES6新增的isArray方法
Array.isArray(obj);

// 4.instanceof
obj instanceof Array;

// 5.通过Array.prototype.isPrototypeOf()
Array.prototype.isPrototypeOf(obj);
```

## undefined 和 null的区别

undefined出现在，未声明变量，声明但未定义变量，是一种系统默认返回的值，一般表示这里应该有值，但目前没有。

null一般需要主动用于给对象赋初始值，用来表示这里不应该有值，为空对象。typeof null的返回值为Object

## isNaN和Number.isNaN的区别

isNaN函数执行时，会先将参数进行类型转换，如果可以进行类型转换，则返回false，不可以则返回true

Number.isNaN，不会进行类型转换，而是直接判断，只有传入的为NaN才会返回true，判断上要求更加严格

```
isNaN("666")  // false
isNan("haha")  // true
Number.isNaN("6")  // false
Number.isNaN(NaN)  // true
```

## ==、===和Object.is(A,B)的区别

== 会进行类型的强制转换

=== 不会进行类型的强制转换，但 +0=== -0 返回true，NaN === NaN返回false

```
// Object.is本质上和===一样，对于上述问题进行了修复
Object.is(+0,-0) // false
Object.is(+0,0)  // true
Object.is(-0,0)  // false
Object.is(NaN,NaN)  // true
```

## 什么是包装类型

在string、number和boolean类型值上调用方法时，会将值转成对应类型的对象，这种包装时临时的，调用结束后就会销毁实例，恢复原来的类型。

```
// 调用Boolean对象的注意点
var bool = new Boolean(false);  // bool为对象
if (bool) { // 参数为对象，任何对象都会返回true
    console.log('run?'); // 会进到 if 条件里面吗？
}
```

## + 操作符何时被用于字符串的拼接

\+ 操作符其中的一个操作数是字符串的时候（或者可以隐式转换成字符串），则执行拼接，否则执行加法。除了 \+ 操作符的其他运算符都是进行数字操作

## 扩展运算符和Object.assign的拷贝行为

```
// 扩展运算符...
let a = {
  info:{
    name: 'worker',
    age: 18
  },
  gender:'male'
}
let b = {...a}
b.gender = "female"
b.info.age = 20
console.log(a) // {info:{name:'workder',age:20},gender:'male'}

// Object.assign(target,source)
let a = {
  info:{
    name: 'worker',
    age: 18
  },
  gender:'male'
}
let b = Object.assign({},a)
b.gender = "female"
b.info.age = 20
console.log(a) // {info:{name:'workder',age:20},gender:'male'}
```

两者对于对象的引用数据类型是**浅拷贝**，对于基本数据类型是深拷贝

## 如何判断空对象

**`Object.keys(obj).length === 0`**

## for in 和for of

for in 一般用于获取对象的属性，也可以获取数组的索引（但会包括数组的其他属性（如果声明了的话））

for of 一般用于获取对象和数组的值

遍历数组一般使用for和forEach(数组自身方法)方法

arr.forEach((value,index,array)=>{}),array是调用forEach的数组。推荐在回调函数中使用array

四者性能for>for of>forEach>for in

## 基本类型方法

### Number

```javascript
// 静态方法，通过Number.调用
Number.isNaN(value) // 判断一个值是否为NaN，与全局的isNa方法相比，该方法直接和NaN进行对比，不会进行类型转换
Number.isFinite(value)// 判断值是Infinity，-Infinity或NaN
Number.isInteger(value) // 判断值是否为整数
Number.parseFloat(value) // 将字符串(只支持字符串)转换成浮点数，全局的parseFloat会先将参数转成字符串，再转成浮点数
Number.parseInt(value) // 将字符串转换成整数

// 实例方法，运用在具体的变量上
const num = 3.14;
console.log(num.toFixed(3)); // "3.142"，固定小数位数
console.log(num.toExponential(1)); // "3.1e+0"，转科学计数法
console.log(num.toString()); // "3.14159" 转字符串
```

### String

```javascript
const str = "Hello, world!";

// 字符串查找与匹配
console.log(str.includes("world")); // 检查字符串是否包含子串"world"，返回true
console.log(str.indexOf("o"));      // 返回子串"o"首次出现的位置，返回4

// 字符串截取与替换
console.log(str.slice(7, 12));      // 提取索引7到12(不包含)的子串，返回"world",不修改原字符串
console.log(str.replace("world", "universe")); // 替换首个"world"为"universe"，返回"Hello, universe!"

// 字符串格式化与转换
console.log(str.toUpperCase());     // 将字符串转为大写，返回"HELLO, WORLD!"
console.log("   Trim me   ".trim()); // 移除字符串两端空格，返回"Trim me"

// 字符串分割与连接
console.log(str.split(", "));       // 按", "分割字符串，返回数组["Hello", "world!"]
console.log(["a", "b", "c"].join("-")); // 用"-"连接数组元素，返回"a-b-c"
```

substring和slice的区别

| 特性             | `substring()`                  | `slice()`                  |
| ---------------- | ------------------------------ | -------------------------- |
| **修改原字符串** | ❌ 不修改                       | ❌ 不修改                   |
| **参数交换**     | ✅ 自动交换（若 `start > end`） | ❌ 不交换                   |
| **负数索引**     | ❌ 视为 `0`                     | ✅ 支持（从末尾计算）       |
| **推荐场景**     | 明确知道起始索引且顺序正确     | 需要负数索引或处理动态索引 |

### Array

```javascript
const arr = [1,2,3]

const newArr = Array.from(arr) // 可以将arr实现浅拷贝（arr中的引用对象依旧为原来的引用对象），或者将一个类数组或可迭代对象(Map,Set)转换成数组
console.log(Array.from(arr, x => x * 2)); // [2, 4, 6] // 也可以添加操作
// 其他浅拷贝数组的方法
const shallowCopy = [...originalArray]; // 解构
const shallowCopy = originalArray.slice(); // 调用数组的slice方法
const shallowCopy = [].concat(...originalArray); // 使用concat拼接，concat会扁平化一层数组

const arr = Array.of(1,2,3) // [1,2,3] // 将所有传入的参数形成一个数组
arr.keys() // 返回索引
arr.values()  // 返回值
arr.entries()  // 返回索引键值
arr.fill(0, 2, 4); // (value,from,to)从索引2到4（不包含4),填充0，start和end为可选，默认为首尾

arr.sort((a,b)=>a-b) // 看a-b的返回值，负数为升序，正数为降序

// 数组迭代方法
// every()：对数组每一项都运行传入的函数，如果对每一项函数都返回true，则这个方法返回true。
// filter()：对数组每一项都运行传入的函数，函数返回true 的项会组成数组之后返回。
// forEach()：对数组每一项都运行传入的函数，没有返回值。
// map()：对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组。
// some()：对数组每一项都运行传入的函数，如果有一项函数返回true，则这个方法返回true。
// array.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
// acc是累计的类容，cur是当前值，index是当前索引，array是源数组。如果不提供initialValue，则首次迭代会将accumulator设为initialValue，而currentValue从第二个元素开始
```

- **不修改的方法**：通常以“创建新数组”或“查询”为核心（如 `map`、`filter`、`slice`）。返回的新数组对引用类型元素为浅拷贝。

- **修改的方法**：通常涉及“增删改”或“排序”（如 `push`、`splice`、`sort`）。

- **ES2023+ 新增的不可变版本**：

| 修改方法    | 不可变版本     |
| ----------- | -------------- |
| `sort()`    | `toSorted()`   |
| `reverse()` | `toReversed()` |
| `splice()`  | `with()`       |

下表对比 `slice` 与 `splice`：

| 项目           | `slice`              | `splice`               |
| -------------- | -------------------- | ---------------------- |
| 是否修改原数组 | ❌ 不修改，返回新数组 | ✅ 修改原数组           |
| 返回值         | 截取的新数组         | 被删除的元素组成的数组 |
| 典型场景       | 复制、截取数组片段   | 增删改数组元素         |

### Map

- `set()` 方法可以添加键/值对；
- `get()` 方法根据键返回对应的值；
- `has()` 方法返回布尔值，表明 Map 中是否存在指定键；
- `delete()` 方法用于移除 Map 对象中指定的元素；
- clear() 方法会移除 Map 对象中的所有元素；
- size 属性可以获取 Map 对象中的键/值对的数量。

#### WeakMap

键只能是对象类型，且为弱引用，可以被垃圾检测机制回收。不可枚举，不可迭代

- set() 方法可以添加键/值对；
- get() 方法可以指定某个键来返回某个 Map 对象中对应的值；
- has() 方法返回一个bool值，用来表明 Map 中是否存在指定键；
- delete() 方法用于移除 Map 对象中指定的元素；

### Object

```javascript
Object.defineProperties(对象，{key:value,key:value}) // 可以在其中配置writable，enumerable和configurable
Object.assign(obj1,obj2) // 用于合并多个对象，基本类型为浅拷贝。如果有重复的以最后一个为准
Object.create(obj,{key:value}) // 创建一个继承自obj的对象，可以使用第二个参数来为其添加属性

obj.isPrototypeOf(OBJ) // （左操作数）是否存在于另一个对象（右操作数）的原型链中
obj instanceOf func // 左操作数（对象）是否是右操作数（构造函数）的直接或间接实例
```

## 事件循环

1. 执行同步代码
2. 清空所有微任务队列
3. 执行 requestAnimationFrame 回调
4. 执行页面布局、重绘渲染
5. 处理宏任务队列（setTimeout、事件、IO 等）
6. 有空余时间 → 执行 requestIdleCallback

### requestAnimationFrame

requestAnimationFrame 是一个专门用于动画的 API，回调函数会在浏览器下一次重绘之前执行，适合进行动画更新。它的回调函数会接收一个 timestamp 参数，表示回调被调用时的时间戳，可以用来计算动画的进度。

```javascript
// 简单示例，让一个元素从左向右移动100px，使用requestAnimationFrame实现动画效果
const box = document.getElementById('box')
let x = 0
let rafId

function animate() {
  x += 2

  if (x >= 100) {
    x = 100
    box.style.left = x + 'px'
    // 取消，不再执行
    cancelAnimationFrame(rafId)
    return
  }

  box.style.left = x + 'px'

  rafId = requestAnimationFrame(animate)
}

rafId = requestAnimationFrame(animate)
```

### requestIdleCallback

requestIdleCallback 是一个用于在浏览器空闲时执行回调的 API，适合进行一些不紧急的任务，如预加载资源、数据分析等。回调函数会接收一个 deadline 参数，包含一个 timeRemaining() 方法，可以用来判断当前空闲时间还剩多少。这个方法优先级很低，可能永远不会执行

```javascript
// 简单示例，使用requestIdleCallback上报埋点
// 埋点队列
let trackQueue = []

// 1. 埋点入口：只入队，不上报，mc/mv埋点手动调用track函数
function track(event) {
  trackQueue.push(event)

  // 达到阈值，触发上报
  if (trackQueue.length >= 20) {
    scheduleReport()
  }
}

// 2. 闲时调度（核心：模拟 requestIdleCallback）
function scheduleReport() {
  if (window.requestIdleCallback) {
    // 浏览器闲时上报，超时2s必定发送兜底
    requestIdleCallback(report, { timeout: 2000 })
  } else {
    setTimeout(report, 0)
  }
}

// 3. 真正上报：一次性发一批，不是发多个
async function report() {
  if (trackQueue.length === 0) return

  // 拷贝当前队列，立即清空
  const data = [...trackQueue]
  trackQueue = []

  try {
    await fetch('/report', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  } catch (err) {
    // 失败重新塞回队列，下次再试
    trackQueue.unshift(...data)
  }
}

// 4. 定时兜底，防止永远不上报
setInterval(scheduleReport, 2000)
```


微任务：Promise.then/catch/finally、MutationObserver、process.nextTick(Node)

宏任务：setTimeout/setInterval、setImmediate(Node)、I/O（网络请求）、UI渲染（reflow/repaint）、onMessage、MessageChannel.onMessage

postMessage是同步任务

### setTimeout

多次调用setTimeout(fn, 0)并不意味着fn会在0毫秒后执行，而是会被放入宏任务队列中，等当前执行栈清空后才会执行，所以实际的延迟时间可能会大于0毫秒，具体取决于当前执行栈的长度和系统的调度。且如果系统检测到连续调用setTimeout(fn, 0)，会自动将延迟时间增加到4毫秒，以避免过度占用CPU资源。

### postMessage

postMessage定位为「通用跨上下文通信工具」，适合各类简单至中等复杂度的跨域/跨窗口通信，核心场景如下：

1. 父页面 ↔ iframe 通信（最常用）：父页面向iframe内嵌页面发送指令、传递数据，或iframe向父页面反馈结果（如iframe加载完成、表单提交状态）。

2. 跨域页面通信：两个不同域名的窗口（如A域名页面打开B域名页面）之间传递数据，无需后端代理，直接通过postMessage实现。

3. 主线程 ↔ Web Worker 通信：主线程向Worker发送计算任务、配置参数，Worker完成计算后向主线程返回结果，避免阻塞主线程。

4. 简单双向消息交互：通过`e.source`实现双向通信，无需提前保存目标窗口引用，收到消息后可直接回复发送方（如A→B发送请求，B通过e.source向A回复响应）。

5. 单次/少量消息传递：适合非高频、数据量不大的消息通知（如页面状态同步、简单指令传递）。

#### 使用流程

1. 核心语法

发送消息：`targetWindow.postMessage(data, targetOrigin, [transferable])`
- targetWindow：目标窗口（接收消息的窗口/Worker），即“要把消息发给谁”，不是当前自身窗口（重点区分：当前窗口是发送方，targetWindow是接收方）。

- data：要传递的消息内容，支持结构化克隆（可传对象、数组、Blob、File等，不支持函数、Symbol）。一般可以通过配置data中的type字段来区分消息类型，方便接收方处理。可参考数据结构示例：

```javascript
{​
    type: '消息类型', // 核心：区分普通/特殊消息的标识​
    content: '消息内容', // 实际要传递的数据​
    extra: {} // 可选：额外参数（如port、数组等）​
}
```

- targetOrigin：目标窗口的域名（如`https://xxx.com`），用于安全校验，生产环境必须指定具体域名，禁止用`*`（`*`表示允许任意域名接收，有安全风险）。

- transferable（可选，第三个参数）：可选的可转移对象列表（数组形式），用于传递“可转移所有权”的对象，最常用场景就是配合MessageChannel传递port（端口），也可传递ArrayBuffer等。传递后，原上下文将失去该对象的所有权，无法再使用。示例（结合MessageChannel的port传递）：`targetWindow.postMessage(data, targetOrigin, [port])`;其中`[port]`就是第三个参数，用于将MessageChannel的端口（如port2）传递给目标上下文，实现后续点对点通信（这也是MessageChannel依赖postMessage的核心原因）。

2. 基础用法

示例：A页面（父页面）向B页面（iframe内嵌页面）发送消息

```javascript
// A页面（发送方）：获取iframe的targetWindow，发送消息
const iframe = document.querySelector('iframe');
const targetWindow = iframe.contentWindow; // targetWindow是B页面（接收方）, contentWindow是获取iframe内嵌页面的窗口对象
// 发送消息，指定目标域名（生产环境替换为实际域名）
targetWindow.postMessage({ type: 'greet', content: '你好，B页面' }, 'https://b-domain.com');

// B页面（接收方）：监听message事件，接收消息
window.addEventListener('message', (e) => {
  // 安全校验：只处理信任域名的消息（必写，防止恶意攻击）
  if (e.origin !== 'https://a-domain.com') return;
  
  console.log('B页面收到消息：', e.data); // 打印：{ type: 'greet', content: '你好，B页面' }
  console.log('消息发送方：', e.source); // e.source 就是A页面的窗口对象
});
```

3. 双向通信

关键：B页面收到A的消息后，通过`e.source`（即A页面的窗口对象），直接向A页面回复消息，无需额外获取A的引用，实现双向交互。

```javascript
// A页面（发送方+接收方）：发送消息 + 监听B的回复
const iframe = document.querySelector('iframe');
const targetWindow = iframe.contentWindow;

// 1. A向B发送消息
targetWindow.postMessage({ type: 'greet', content: '你好，B页面' }, 'https://b-domain.com');

// 2. A监听B的回复
window.addEventListener('message', (e) => {
  if (e.origin !== 'https://b-domain.com') return;
  console.log('A页面收到回复：', e.data); // 接收B的回复
});

// B页面（接收方+回复方）：接收A的消息 + 用e.source回复
window.addEventListener('message', (e) => {
  if (e.origin !== 'https://a-domain.com') return;
  
  // e.source 就是A页面的窗口对象，直接用它回复A
  e.source.postMessage({ type: 'reply', content: '收到，A页面' }, 'https://a-domain.com');
});
```

4. 向Worker发送消息

```javascript
const worker = new Worker('worker.js');​
// 特殊消息：计算任务​
worker.postMessage({​
  type: 'workerCalc', // 标识：Worker计算任务（特殊消息）​
  data: [10, 20] // 计算参数​
});​
// 普通消息：通知Worker停止任务​
worker.postMessage({​
  type: 'workerStop', // 标识：普通控制消息​
  content: '停止当前计算'​
});​
​
// 接收方（Worker）：根据type执行不同逻辑​
self.addEventListener('message', (e) => {​
  switch (e.data.type) {​
    case 'workerCalc':​
      // 处理特殊消息：计算任务​
      const result = e.data.data[0] + e.data.data[1];​
      // 重点：此处用self.postMessage 和 e.source.postMessage 效果对比（聚焦Worker场景）​
      self.postMessage({ type: 'calcResult', result }); // 推荐写法​
      // e.source.postMessage({ type: 'calcResult', result }); // 可选写法（效果一致，但多余，self一般就是主线程）​
      break;​
    case 'workerStop':​
      // 处理普通消息：停止任务​
      self.close();​
      break;​
  }​
});
```

### MessageChannel

`MessageChannel` 接口允许我们创建一个新的消息通道，并通过它的两个 `MessagePort` 属性发送数据。它主要用于在不同的执行上下文（如主线程与 Worker、多个 iframe 之间）建立直接的双向通信管道。

#### 使用场景

1.  **Worker 间直接通信**：通常我们将数据发给 Web Worker，Worker 处理完后再发给主线程。如果需要两个独立 Worker 之间相互通信，通过主线程中转会带来额外开销，这时可以将 `MessageChannel` 的一个端口传递给一个 Worker，另一个端口传递给另一个 Worker，实现两个 Worker 之间直接通信。
2.  **跨 Iframe 通信**：在不同 `iframe` 或主页面与 `iframe` 之间进行私密且互不干扰的通信。相比 `window.postMessage` 向整个窗口广播，`MessageChannel` 提供了点对点的通信方式。
3.  **深拷贝**：利用其内部的结构化克隆算法（Structured Clone Algorithm），可以实现一个包含处理循环引用或特殊数据类型对象的深拷贝函数（不过现在有 `structuredClone` 原生 API 后，这种用法较少被提及，但在老版本浏览器中是一种经典的 Hack 方式）。
4.  **宏任务调度**：在 Vue 的早期版本（Vue 2.5 左右）中，为了实现 `nextTick`，曾经使用 `MessageChannel` 来实现宏任务的异步调度，因为它的执行时机比 `setTimeout(fn, 0)` 略快且不受浏览器 4ms 最小延迟限制。

#### 扩展：React 为什么依赖 MessageChannel 进行调度？

在前端框架的调度机制中，`MessageChannel` 扮演着非常重要的角色，尤其是在 React 的底层 Scheduler（调度器）中：

**1. 核心诉求：时间切片（Time Slicing）**
React 16 引入 Fiber 架构后，实现了**可中断的异步渲染（Concurrent Mode）**。React 需要在执行耗时的渲染任务时，定期（通常每 5ms 左右）将控制权交还给浏览器，让浏览器优先去处理用户的输入（如点击、输入框输入）或者执行 UI 重绘，从而防止页面卡顿（掉帧）。

**2. 为什么必须是宏任务（Macrotask）？**
交还了控制权之后，React 还需要在浏览器闲下来时继续刚才未完成的渲染工作。要想在主线程处理完其他事情后再次恢复执行，React 必须开辟一个新的**宏任务**去重新排队（如果用微任务，微任务会一直阻塞浏览器的重绘，这跟不中断是一样的效果，起不到让出线程的作用）。

**3. 为什么是 `MessageChannel` 而不是 `setTimeout`？**
既然要使用宏任务，大家最熟悉的通常是 `setTimeout(fn, 0)`。但是，根据 HTML 标准规范，原生的 `setTimeout` 在嵌套调用层级超过 5 层时，会强制施加一个 **4ms 的最小延迟**（节流限制）。
对于 React 这样需要非常高频地中断、恢复调度的场景来说，每次中断都额外等 4ms 完全不可接受，会导致 CPU 时间被大量浪费。
而 `MessageChannel` 的 `onmessage` 同样是一个宏任务，但**它的延迟几乎为 0ms**，执行时机比 `setTimeout` 快得多，完美契合了 React Scheduler 需要零延迟、高频派发宏任务来让出主线程的需求。

**4. React 如何利用它**

具体来说，React 的 Scheduler 会：
1. 自己创建一个 `new MessageChannel()`
2. 把任务函数绑定到 `channel.port1.onmessage` 上
3. 当时间切片耗尽（比如执行了 5ms），React 需要主动暂停任务，此时它会调用 `channel.port2.postMessage(null)`
4. 这句话的作用就是抛出一个“宏任务”炸弹到事件循环（Event Loop）中。
5. 此时控制权回到浏览器手中，浏览器可以顺势处理用户的点击或页面的重绘。
6. 等浏览器手头上的其他任务做完，Event Loop 轮转到下一个宏任务，碰巧刚才 React 扔进来的宏任务触发了，于是 `port1.onmessage` 再次带起 React，继续回去执行下一个 5ms 的任务。

> **对比补充 (Vue 为什么不用宏任务？微任务不卡事件循环吗？)**：
> 
> **1. 微任务确实会阻塞渲染**：微任务是在当前宏任务执行完毕后、浏览器重绘*前*执行的。如果 Vue 发起的组件更新和 DOM 生成非常庞大，这个微任务环节就会执行很久，确实会堵塞浏览器的呈现流水线，导致掉帧卡顿。
>
> **2. Vue 是故意这么设计（批量异步更新）**：多数业务场景中，我们会在同步代码中连续多次改变数据（如 `a=1; b=2`）。Vue 会把这些连串的操作合并进一个更新队列。然后只开启一个微任务 `Promise.then`，目的是为了在**浏览器下一次重绘前**，把所有要变的真实 DOM **一口气全改掉**，避免浏览器傻乎乎地去重排多次、避免用户看到中间的残缺状态（屏幕闪烁）。
> 
> **3. 为什么 Vue 敢卡主线程而 React 必须切片？**
> React 只要组件状态变化，往往需要从上往下重新对比庞大的虚拟 DOM 树（尤其是以前的版本），计算量极大。如果不主动切片（宏任务让出线程），动辄几十上百毫秒的阻塞会造成极其严重的卡顿。
> 而 Vue 的更新得益于 Proxy 的依赖收集和编译时的静态提升，它**极其清楚知道哪里需要更新（极细的颗粒度）**。绝大多数普通大小的组件更新，Vue 都能在短短几毫秒内利用微任务瞬间搞定，完全没必要中途挂起。至于偶尔遇到一次性渲染一万行表格这种极端情况，Vue 认为应该通过上层的业务手段（如虚拟列表、分页）去解决，而不是牺牲框架核心调度的简洁与稳定性来做时间切片。
>
> **4. 理念差异：对状态变化的“感知粒度”**
> - **React** 是“不可变数据（Immutable）”+“粗粒度”感知。当你调用 `setState` 时，React 根本不知道到底是哪个具体的属性改变了，它只知道“这个 Fiber 节点（组件）的状态脏了”，需要被重新执行（Render），由于 React 不知道究竟改了哪，所以它只能把这个组件及其子组件全部执行一遍，生成全新的虚拟 DOM，最后通过 Diff 算法把新旧树对比，查出来哪里不同再去更新真实 DOM。这个“大海捞针”般的盲猜+对比过程是非常耗时的。
> - **Vue** 是“响应式数据（Reactive）”+“细粒度”感知。由于数据被 `Proxy` 劫持了（或者 Vue2 的 `Object.defineProperty`），当你修改 `obj.a = 1` 时，Vue 精确知道是 `a` 变了，并且精确知道页面上只有哪几个 DOM 节点绑定了 `a`。Vue 3 配合编译时的靶向更新（PatchFlags），甚至可以直接跳过大部分不需要更新的虚拟节点，直接去修改那个具体的真实 DOM 属性。 
>
> **5. 最终框架复杂度的体现**
> 正是因为上述的感知粒度不同，导致 React 的计算负担重得出奇。所以 React 也不得不在底层维护一套极其复杂的、带有各种优先级（Lane 机制）并且依赖 `MessageChannel` 进行中断恢复的 Scheduler 任务调度系统。而 Vue 凭着精确的制导武器，只需要用一个简单的微任务队列，把所有的靶向 DOM 更新一次性冲刷（flush）掉即可。

#### 使用方法

`MessageChannel` 实例拥有两个只读属性：`port1` 和 `port2`。这两个端口相互连接，你可以从 `port2` 发送消息到 `port1`，反之亦然。

**1. 基本用法**

```javascript
const channel = new MessageChannel();

// 监听 port1 接收到的消息
channel.port1.onmessage = function (event) {
  console.log('port1 收到消息:', event.data);
};

// 监听 port2 接收到的消息
channel.port2.onmessage = function (event) {
  console.log('port2 收到消息:', event.data);
};

// 发送消息
channel.port1.postMessage('Hello from port1');
channel.port2.postMessage('Hello from port2');
```

**2. 在 iframe 中使用**

这是 `MessageChannel` 非常典型的用例，主页面与 iframe 建立点对点通信：

```javascript
// 主页面 (index.html)
const iframe = document.querySelector('iframe');
const channel = new MessageChannel();

// 监听 port1 的消息
channel.port1.onmessage = (e) => {
  console.log('主页面收到了来自 iframe 的消息:', e.data);
};

// 必须等待 iframe 加载完成
iframe.addEventListener('load', () => {
  // 把 port2 发送给 iframe，通过 Transferable objects 转移所有权
  // 注意，第二个参数是目标源，'*' 仅作演示，生产环境应指定具体域名
  iframe.contentWindow.postMessage('init', '*', [channel.port2]); 
});

// 主页面发送消息到 iframe
channel.port1.postMessage('主页面发来问候！');
```

```javascript
// iframe 页面 (iframe.html)
window.addEventListener('message', (event) => {
  // 检查是否是被赋予 port2 的初始化消息
  if (event.data === 'init' && event.ports.length > 0) {
    const port2 = event.ports[0];
    
    // 监听来自 port1 的消息
    port2.onmessage = (e) => {
      console.log('iframe 收到了来自主页面的消息:', e.data);
    };
    
    // 通过 port2 回发消息
    port2.postMessage('iframe 收到啦，哈喽主页面！');
  }
});
```

**3. 利用其实现深拷贝**

返回的是一个 Promise 因为消息传递是异步的。需要注意的是，因为 `MessageChannel` 内部使用的是**结构化克隆算法（Structured Clone Algorithm）**，它虽然支持循环引用以及 Date、RegExp、Map、Set 等对象，但它**无法克隆函数和 Symbol**（如果遇到会抛出 `DataCloneError` 异常或静默丢失）。

> **对比 `JSON.parse(JSON.stringify(obj))` 的巨大优势：**
> 虽然两者都不能克隆函数，但在处理复杂对象时，MessageChannel（结构化克隆）远比 JSON 方法强大：
> 1. **完全支持循环引用**：`JSON.stringify` 遇到循环引用的对象会直接抛出报错（TypeError: Converting circular structure to JSON），而结构化克隆可以完美处理。
> 2. **保留内置对象类型**：`JSON` 序列化会把 `Date` 强转成字符串，把 `RegExp`、`Map`、`Set` 变成 `{}`（空对象），把 `NaN` 和 `Infinity` 变成 `null`。而结构化克隆能原封不动地保留这些复杂对象的数据结构和类型。
> 3. **保留 `undefined` 字段**：`JSON` 会把对象中值为 `undefined` 的键直接剔除丢失，而结构化克隆会保留该字段。

```javascript
function deepClone(obj) {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel();
    port2.onmessage = (event) => resolve(event.data);
    port1.postMessage(obj);
  });
}

// 使用
const obj = { a: 1, b: { c: 2 } };
obj.d = obj; // 循环引用
deepClone(obj).then((cloneObj) => console.log(cloneObj));
```

### BroadcastChannel

`BroadcastChannel` 接口允许同源的不同浏览器窗口、Tab 页、iframe 或 Worker 之间进行实时的广播通信。它建立了一个多对多的通信通道，所有连接到同一个频道的实例都可以发送和接收消息。

#### 使用场景

1. **多标签页状态同步**：例如用户在一个 Tab 页中登录或登出，其他打开的相同网站的 Tab 页可以通过 `BroadcastChannel` 收到通知并自动刷新状态，无需轮询服务器。
2. **跨窗口数据共享**：在一些复杂的 Web 应用中（如多窗口的在线编辑器或数据大屏），可以将主控制窗口的数据实时同步到其他展示窗口。
3. **同源离线资源的协调**：配合 Service Worker，在后台完成资源更新或数据同步后，通知所有打开的前端页面进行相应的 UI 更新。
4. **统一的主题或配置切换**：用户在一个页面修改了系统主题色或多语言偏好，所有同源页面瞬间同步生效。

#### 使用方法

使用 `BroadcastChannel` 非常简单，只需要实例化时传入一个频道名称（String），并监听 `message` 事件即可。

**注意（核心机制）：**
- **必须同源同名**：只有同源（协议、域名、端口相同）且连接到**同一个频道名称**（如 `new BroadcastChannel('app_channel')`）的页面（Tab / iframe / Worker）才能互相通信。
- **浏览器层面的事件总线**：你可以把它理解为浏览器内部实现的一个跨页面的 EventBus（事件总线）或发布-订阅模型。底层由浏览器内核在内存中维护这个频道的连接映射。
- **不包含发送者自身**：调用 `bc.postMessage()` 的页面自身**不会**触发 `message` 事件，只有其他订阅了该频道的页面会收到。

**1. 基本用法**

```javascript
// 在页面 A 中创建一个广播频道，频道名称为 "my_app_channel"
const bc = new BroadcastChannel('my_app_channel');

// 监听其他页面发来的消息
bc.onmessage = (event) => {
  console.log('接收到广播消息:', event.data);
};

// 发送消息到该频道的所有其他订阅者
bc.postMessage('Hello, 另外的页面！');

// 页面关闭或不再需要通信时，断开连接
// bc.close();
```

**2. 在多标签页间同步登录状态**

```javascript
// 所有页面都连接到同一个频道
const authChannel = new BroadcastChannel('auth_channel');

// 监听登出事件
authChannel.onmessage = (event) => {
  if (event.data.action === 'logout') {
    // 处理登出逻辑，例如跳回登录页
    console.log('用户已在其他页面登出，本页面跟随登出');
    window.location.href = '/login';
  }
};

// 当用户在本页面主动点击登出按钮时
function handleLogout() {
  // 1. 广播登出消息给其他 Tab 页
  authChannel.postMessage({ action: 'logout' });
  // 2. 本页面执行跳转
  window.location.href = '/login';
}
```



# ES6中的新特性

## let，const，var的区别

**（1）块级作用域**:块作用域由 `{ }`包括，let和const具有块级作用域，var不存在块级作用域。块级作用域解决了ES5中的两个问题：

- 内层变量可能覆盖外层变量
- 用来计数的循环变量泄露为全局变量

**（2）变量提升**:var存在变量提升，let和const不存在变量提升，即在变量只能在声明之后使用，否在会报错。

**（3）给全局添加属性**:浏览器的全局对象是window，Node的全局对象是global。var声明的变量为全局变量，并且会将该变量添加为全局对象的属性，但是let和const不会。

**（4）重复声明**:var声明变量时，可以重复声明变量，后声明的同名变量会覆盖之前声明的遍历。const和let不允许重复声明变量。

**（5）暂时性死区**:在使用let、const命令声明变量之前，该变量都是不可用的。这在语法上，称为**暂时性死区**。使用var声明的变量不存在暂时性死区。

**（6）初始值设置**:在变量声明时，var 和 let 可以不用设置初始值。而const声明变量必须设置初始值。

**（7）指针指向**:let和const都是ES6新增的用于创建变量的语法。 let创建的变量是可以更改指针指向（可以重新赋值）。但const声明的变量是不允许改变指针的指向。



```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 同时输出3，3，3。因为setTimeout是宏任务，js执行到这的时候，会将宏任务放入队列，然后循环三次。循环结束后再执行宏任务队列中的任务，此时var声明的变量会保留在外部的作用域中，所以最后会输出3，3，3。
  }, 100);
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 同时输出0，1，2。因为let是块作用域，只会在内部被使用
  }, 100);
}

// 如何异步输出？
for (let i = 0; i < 3; i++) {
  await new Promise(resolve => setTimeout(resolve, 100)); // await会等待Promise完成，setTimeout中执行resolve，使得Promise状态发生改变
  console.log(i); // 0、1、2间隔100ms依次输出
}
```

## const声明的对象是否可修改

const是指向目标地址的指针不可修改，而目标地址的内容可以修改，对于基础类型而言，无法在原有地址上修改内容，所以无法修改。对于引用类型而言，可以修改

## 箭头函数的特点

- 箭头函数没有自己this，**this在函数定义的时候就会被确定，默认为外层的this**，且永远不会改变
- 使用call(),apply(),bind()等方法无法改变箭头函数中的this指向
- 箭头函数为匿名函数，所以无法通过new来构造
- 箭头函数无法通过arguments来获取函数参数，只能通过扩展运算符来获得

ps:`arguments`还有一个属性callee，指向`arguments`对象所在函数。可以通过`arguments.callee()`来实现递归

## 模板语法与字符串处理

```js
let a = "hello";
let b = "world";
console.log(`${a + b}`);

// 字符串类型数据的自带方法
string.includes(str)   //判断是否包含str
string.startsWith(str) //判断是否以str开始
string.endWith(str)    //判断是否以str结束
string.repeat(num)     //对字符串重复num次
```

## new的实现原理

本质上可以理解成继承，步骤如下

1. 首先创建了一个新的空对象
2. 将对象的原型设置成构造函数的prototype对象
3. 让函数的this指向这个对象，然后执行构造函数的代码
4. 判断函数的返回值类型，如果是基础类型，则返回创建的对象，如果是引用类型，则返回引用的对象

```js
// 以下代码解释第四点
function Test(name) {
  this.name = name
  return 1 // 返回基本类型
}
const t = new Test('xxx')
console.log(t.name) // 'xxx'，说明返回的构造了的对象

function Test(name) {
  this.name = name
  console.log(this) // Test { name: 'xxx' }
  return { age: 26 }
}
const t = new Test('xxx')
console.log(t) // { age: 26 } //说明返回的是{ age: 26 }
console.log(t.name) // 'undefined'
```

## map和object的区别

| Map                                                                        | Object                                                                                                                    |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Map默认情况不包含任何键，只包含显式插入的键。                              | Object 有一个原型, 原型链上的键名有可能和自己在对象上的设置的键名产生冲突。                                               |
| Map的键可以是任意值，包括函数、对象或任意基本类型。                        | Object 的键必须是 String 或是Symbol。                                                                                     |
| Map 中的 key 是有序的。因此，当迭代的时候， Map 对象以插入的顺序返回键值。 | Object 的键顺序为（按数值索引（非负整数型的键）升序排列；然后按插入顺序列出其它字符串键；最后按插入顺序列出 Symbol 键。） |
| Map 的键值对个数可以轻易地通过size 属性获取                                | Object 的键值对个数只能手动计算                                                                                           |
| Map 是 iterable 的，所以可以直接被迭代。                                   | 迭代Object需要以某种方式获取它的键然后才能迭代。                                                                          |
| 在频繁增删键值对的场景下表现更好。                                         | 在频繁添加和删除键值对的场景下未作出优化。                                                                                |

## map和weakMap的区别

1. Map

   Map的key可以为任意类型。自身携带的操作方法如下

   size,set,get,has,delete,clear,keys,values,entries,forEach

2. weakMap

   weakMap中key值必须是对象，只有set,get,has,delete方法（因为weakMap中的key有可能随时被回收，所以不提供），weakMap中的key是弱引用对象，当该对象的引用次数归零后，垃圾回收机制会自动回收，weakMap中的该key无法再被访问

## 正则表达式（待补充）

## JSON

用于数据交换，通过JSON.stringify将js数据转换成JSON，通过JSON.parse将JSON转换成js数据

## JS中的类数组是什么

函数的arguments对象，DOM方法（如querySelectorAll）返回的NodeList对象，字符串等都属于类数组对象

拥有length属性和若干索引属性的对象可以被称作类数组对象，类数组对象无法调用数组的方法。可以通过以下方式实现类数组到数组的转换

```
Array.prototype.slice.call(arrayLike);
Array.prototype.splice.call(arrayLike, 0); //会清空源对象
Array.prototype.concat.apply([], arrayLike);
Array.from(arrayLike); //推荐，同时适用set，map
```

## 常见的位运算符

运算符均是对二进制数值进行转换

| 运算符 | 描述 | 运算规则                                                       |
| ------ | ---- | -------------------------------------------------------------- |
| `&`    | 与   | 两个位都为 1 时，结果为 1                                      |
| `      | `    | 或                                                             | 任一位为 1 则结果为 1 |
| `^`    | 异或 | 两个位相同为 0，相异为 1                                       |
| `~`    | 取反 | 0 变 1，1 变 0                                                 |
| `<<`   | 左移 | 各二进制位全部左移若干位，高位丢弃，低位补 0                   |
| `>>`   | 右移 | 各二进制位全部右移若干位，正数高位补 0，负数高位补 1，低位丢弃 |

## 什么是DOM和BOM

- DOM 指的是文档对象模型，它指的是把文档当做一个对象，这个对象主要定义了处理网页内容的方法和接口。
- BOM 指的是浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的方法和接口。BOM 的核心是 `window`，而 `window` 对象具有双重角色：既是通过 JS 访问浏览器窗口的一个接口，又是一个全局对象（Global）。这意味着在网页中定义的任何对象、变量和函数，都会作为全局对象的属性或方法存在。`window` 对象含有 `location`、`navigator`、`screen` 等子对象，并且 DOM 的根对象 `document` 也是 `window` 的子对象。

`window`（BOM 顶层对象），示意结构如下，这些对象可以直接调用，最后会找到`window`对象上的属性或方法：

```text
window (BOM 顶层对象)
├─ document → DOM 树根
│   ├─ html
│   ├─ head
│   └─ body
│
├─ location     // 地址栏
├─ navigator    // 浏览器信息
├─ history      // 历史记录
├─ screen       // 屏幕信息
├─ frames       // 框架
├─ console      // 控制台
├─ alert()      // 弹窗
└─ setTimeout() // 定时器
```

## Ajax

通过JS实现异步通信，来更新网页

操作步骤：

- **创建一个 XMLHttpRequest 对象**。
- 在这个对象上**使用 open 方法创建一个 HTTP 请求**，open 方法所需要的参数是请求的方法、请求的地址、是否异步和用户的认证信息。
- 在发起请求前，可以为这个对象**添加一些信息和监听函数**。比如说可以通过 setRequestHeader 方法来为请求添加头信息。还可以为这个对象添加一个状态监听函数。一个 XMLHttpRequest 对象一共有 5 个状态，当它的状态变化时会触发onreadystatechange 事件，可以通过设置监听函数，来处理请求成功后的结果。当对象的 readyState 变为 4 的时候，代表服务器返回的数据接收完成，这个时候可以通过判断请求的状态，如果状态是 2xx 或者 304 的话则代表返回正常。这个时候就可以通过 response 中的数据来对页面进行更新了。
- 当对象的属性和监听函数设置完成后，最后调**用 `send` 方法来向服务器发起请求**，可以传入参数作为发送的数据体。

```js
const url = "/server";
let xhr = new XMLHttpRequest();
// 创建 Http 请求
xhr.open("GET", url, true);
// 设置状态监听函数
xhr.onreadystatechange = function() {
  if (this.readyState !== 4) return;
  // 当请求成功时
  if (this.status === 200) {
    handle(this.response);
  } else {
    console.error(this.statusText);
  }
};
// 设置请求失败时的监听函数
xhr.onerror = function() {
  console.error(this.statusText);
};
// 设置请求头信息
xhr.responseType = "json";
xhr.setRequestHeader("Accept", "application/json");
// 发送 Http 请求
xhr.send(null);

// 使用Promise封装
function getJSON(url) {
  // 创建一个 promise 对象
  let promise = new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    // 新建一个 http 请求
    xhr.open("GET", url, true);
    // 设置状态的监听函数
    xhr.onreadystatechange = function() {
      // xhr的readyState共有5中类型，0(创建但没open)，1(已调用open)，2(已send并获取头部)，3(已send并获取头部和部分信息)，4(完成)
      if (this.readyState !== 4) return;
      // 当请求成功或失败时，改变 promise 的状态
      // status请求完成前为0
      if (this.status === 200) {
        resolve(this.response); //resolve
      } else {
        reject(new Error(this.statusText)); //reject
      }
    };
    // 设置错误监听函数
    xhr.onerror = function() {
      reject(new Error(this.statusText));
    };
    // 设置响应的数据类型
    xhr.responseType = "json";
    // 设置请求头信息
    xhr.setRequestHeader("Accept", "application/json");
    // 发送 http 请求
    xhr.send(null);
  });
  return promise;
}
```

## ES6模块和CommonJS模块的区别

cjs语法：`const mod = require('./mod')`；导出：`module.exports = …` 或 `exports.xxx = …`。导入得到的是 module.exports 的当前值（对对象为引用），不是 ESM 的“实时绑定”，运行中加载

esm语法：`import mod from './mod'`；导出：`export default …` 或 `export const xxx = …`。导入得到的是一个只读引用，编译时加载，支持动态导入



| **特性**                 | **CommonJS**（一般用于服务端node）                                                          | **ES6 模块**                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **复制机制**             | 值复制（基本类型）或引用复制（对象）                                                        | 实时绑定的引用                                                      |
| **能否修改原模块对象**   | 能（通过引用修改对象属性）                                                                  | 能（通过只读引用修改对象属性）                                      |
| **能否重新赋值导入变量** | 能（但仅影响本地副本）                                                                      | 不能（只读引用，赋值报错）                                          |
| **本质区别**             | 运行时动态加载，值传递或引用传递。因为CJS输出的是一个对象，该对象需要在脚本运行完成后才生成 | 编译时静态分析，实时绑定引用。ESM的输出是静态的，在编译时就能生成。 |
| **加载方式**             | 同步加载                                                                                    | 异步加载                                                            |

## for ... of ...

| 特性     | `for...of`                          | `for...in`                 |
| :------- | :---------------------------------- | :------------------------- |
| 遍历内容 | **可迭代对象**的值(或键值)          | 对象的可枚举属性           |
| 适用对象 | 数组、字符串、Map、Set 等可迭代对象 | 普通对象                   |
| 原型属性 | 不遍历原型链上的属性(效率更高)      | 会遍历原型链上的可枚举属性 |
| 顺序     | 按迭代器定义的顺序                  | 不保证顺序                 |

```js
//  若要让普通对象可以使用for...of，需要给普通对象加上迭代器属性
var obj = {
    a:1,
    b:2,
    c:3
};

obj[Symbol.iterator] = function(){
	var keys = Object.keys(this);
	var count = 0;
	return {
		next(){
			if(count<keys.length){
				return {value: obj[keys[count++]],done:false}; // 迭代器语法
			}else{
				return {value:undefined,done:true};  // 迭代器语法
			}
		}
	}
};

for(var k of obj){
	console.log(k);
}
```

## ajax、fetch、axios的区别

**ajax**

- 本身是针对MVC编程，不符合前端MVVM的浪潮
- 基于原生XHR开发，XHR本身的架构不清晰

**fetch**

- ES6启用，使用了Promise对象
- 支持async/await
- fetch只对网络请求报错，对400，500都当做成功的请求，服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。需要拿到fetch中promise返回的response对象，查看其中的ok属性，通过ok属性判断请求是否成功（ok属性会判断状态码在 200-299 范围内）
- 默认不会带cookie，需要添加配置项： fetch(url, {credentials: 'include'})
- `fetch()` 接收到的 `response` 是一个 `Stream` 对象，需要将 `response` 序列化(json())才能获取到数据

**axios**的请求过程为：

1. 创建请求实例（配置url，header等）
2. 通过请求拦截器（对请求进行修改）
3. 转换请求数据（将js数据转换成JSON）
4. 发起网络请求（web端使用XMLHttpRequest，node端使用http模块），自动处理跨域
5. 通过响应拦截器（对响应进行修改）
6. 转换数据（将JSON转换成js）

## 数组的遍历方法

| **方法**                  | **是否改变原数组** | **特点**                                                                                                                    |
| ------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| forEach()                 | 否                 | 数组方法，默认不改变原数组，没有返回值，不可以链式调用                                                                      |
| map()                     | 否                 | 数组方法，不改变原数组，**返回新数组**，可链式调用                                                                          |
| filter()                  | 否                 | 数组方法，过滤数组，**返回包含符合条件的元素的数组**，可链式调用                                                            |
| for...of                  | 否                 | for...of遍历具有Iterator迭代器的对象的属性，返回的是数组的元素、对象的属性值，不能遍历普通的obj对象，将异步循环变成同步循环 |
| every() 和 some()         | 否                 | 数组方法，some()只要有一个是true，便**返回true**；而every()只要有一个是false，便**返回false**.                              |
| find() 和 findIndex()     | 否                 | 数组方法，find()返回的是第一个符合条件的值；findIndex()返回的是第一个返回条件的值的**索引值**                               |
| reduce() 和 reduceRight() | 否                 | 数组方法，reduce()对数组正序操作；reduceRight()对数组逆序操作                                                               |

## 原型和原型链

当我声明一个普通函数（构造函数）的时候，js会自动生成一个对象，内容包含一个constructor指向普通函数和一个\__proto\_\_ 指向Object.prototype(最终原型) 	

![](https://cdn.nlark.com/yuque/0/2021/png/1500604/1615475711487-c474af95-b5e0-4778-a90b-9484208d724d.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_18%2Ctext_5b6u5L-h5YWs5LyX5Y-377ya5YmN56uv5YWF55S15a6d%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10%2Fformat%2Cwebp%2Fresize%2Cw_618%2Climit_0)

个人理解：首先所有引用类型都有\_\_proto\_\_，函数可以通过\_\_proto\_\_找到Function.prototype，从而使用通用的方法(bind,call),通过prototype找到与自己对应的原型对象，原型对象通过\__proto\_\_属性找到自己原型链中的上一层，通过constructor找到对应的构造函数。逐层搜索原型链最终回到Object.prototype。

ES6后不推荐使用_\_proto__来访问原型对象，建议使用Object.getPrototypeOf(obj)

原型链的终点是Object.prototype.\_\_proto\_\_，而Object.prototype._\_proto\_\_===null，所以也可以说原型链的终点就是null

对象可以通过从原型链中层层向上寻找可使用的方法，可以通过hasOwnProperty()来判断是否属于原型链的属性

| 属性   | __proto__                | prototype                |
| ------ | ------------------------ | ------------------------ |
| 谁拥有 | 所有对象                 | 只有函数拥有             |
| 作用   | 构成原型链，用于查找属性 | 作为模板，给实例当原型   |
| 指向   | 该对象的原型对象         | 一个对象，含 constructor |
| 关键字 | 隐式原型                 | 显式原型                 |

`实例.__proto__  = 构造函数.prototype`

## 什么是闭包

闭包是指有权访问另一个函数作用域中的变量的函数，创建闭包最常见的方法就是在一个函数内创建另一个函数，这个创建的函数可以访问到当前函数的局部变量。一般出现在嵌套函数中（外层函数的变量被内层函数使用，导致外层函数执行完毕时，声明的变量因为内层函数的引用而被保留）

闭包的常用作用：

- 可以在函数外部访问到函数内部的局部变量
- 会保留闭包内所用的对象的引用，从而不被垃圾回收机制回收

如何解决：

用完外层变量后，将其设为null，解除引用



## 作用域、作用域链

（1）全局作用域

- 最外层函数和最外层函数外面定义的变量拥有全局作用域
- 所有未定义直接赋值的变量自动声明为全局作用域
- 所有window对象的属性拥有全局作用域
- 全局作用域有很大的弊端，过多的全局作用域变量会污染全局命名空间，容易引起命名冲突。

（2）函数作用域

- 函数作用域声明在函数内部的变量，一般只有固定的代码片段可以访问到
- 作用域是分层的，内层作用域可以访问外层作用域，反之不行

（3）块级作用域

- 使用ES6中新增的let和const指令可以声明块级作用域，块级作用域可以在函数中创建也可以在一个代码块中的创建（由`{ }`包裹的代码片段）
- let和const声明的变量不会有变量提升，也不可以重复声明
- 在循环中比较适合绑定块级作用域，这样就可以把声明的计数器变量限制在循环内部。

（4）作用域链

​	在当前作用域中查找所需变量，但是该作用域没有这个变量，那这个变量就是自由变量。如果在自己作用域找不到该变量就去父级作用域查找，依次向上级作用域查找，直到访问到window对象就被终止，这一层层的关系就是作用域链。作用域链的作用是保证对执行环境有权访问的所有变量和函数的有序访问，通过作用域链，可以访问到外层环境的变量和函数。

## 执行上下文

**（1）全局执行上下文**

任何不在函数内部的都是全局执行上下文，它首先会创建一个全局的window对象，并且设置this的值等于这个全局对象，一个程序中只有一个全局执行上下文。

**（2）函数执行上下文**

当一个函数被调用时，就会为该函数创建一个新的执行上下文，函数的上下文可以有任意多个。

**（3）**`eval`**函数执行上下文**

执行在eval函数中的代码会有属于他自己的执行上下文，不过eval函数不常使用，不做介绍。

当JavaScript执行代码时，首先遇到全局代码，会创建一个全局执行上下文并且压入执行栈中，每当遇到一个函数调用，就会为该函数创建一个新的执行上下文并压入栈顶，引擎会执行位于执行上下文栈顶的函数，当函数执行完成之后，执行上下文从栈中弹出，继续执行下一个上下文。当所有的代码都执行完毕之后，从栈中弹出全局执行上下文。



在执行一段JS代码之前，需要先解析代码。解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来，变量先赋值为undefined（let 和 const 也提升，但不会赋 undefined，而是处于未初始化状态，不能提前访问。），函数先声明好可使用。这一步执行完了，才开始正式的执行程序。

在一个函数执行之前，也会创建一个函数执行上下文环境，跟全局执行上下文类似，不过函数执行上下文会多出this（绑定this）和arguments

## apply/call/bind

三者都是为了改变函数执行的上下文（改变this），如果传入underfined或null则绑定的是全局的window对象

```js
// apply将接受两个参数，第一个参数是this的指向，第二个参数是函数参数，一般是数组或者类数组的形式，该方法只能临时改变this
// apply->array
function fn(...args){
    console.log(this,args);
}
let obj = {
    myname:"张三"
}
fn.apply(obj,[1,2]); // ->Object,Array
fn(1,2) // ->Window,Array

// call本质和apply类似，不过接受多个参数，第一个参数是this指向，后续参数均是函数参数
// call->comma
function fn(...args){
    console.log(this,args);
}
let obj = {
    myname:"张三"
}
fn.call(obj,1,2); // ->Object,Array
fn(1,2) // ->Window,Array

// bind与前两者不同，不是立即执行，而是需要先通过bind绑定对象，返回后的函数就直接改变了绑定的对象，再通过调用返回后的函数实现
function fn(...args){
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

const bindFn = fn.bind(obj); // this 也会变成传入的obj ，bind函数不会立即执行，需要手动执行
bindFn(1,2) // ->Object,Array
fn(1,2) // ->Window,Array
```

## 如何实现异步编程

在JS中实现异步编程的方法有如下几种：

- 回调函数嵌套回调函数，容易形成回调地狱
- Promise，也可以嵌套Promise，但会造成多个then调用
- generator
- async/await，该机制相当于Promise和generator的结合，当函数内部执行到一个 await 语句的时候，如果语句返回一个 promise 对象，那么函数将会等待 promise 对象的状态变为 resolve 后再继续向下执行，如果是普通表达式，则会直接执行。对于async函数而言，返回的也是一个Promise对象，如果async函数内有返回值，该值会作为resolve的值。async/await可以解决频繁调用.then的情况

```js
// 原函数
function doIt() {
    console.time("doIt");
    const time1 = 300;
    step1(time1)
        .then(time2 => step2(time2))
        .then(time3 => step3(time3))
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("doIt");
        });
}
doIt();

// async/await版本,将原先的链式.then拆分成多个await执行即可，每个await都会阻塞，和以上版本的性质类似
async function doIt() {
    console.time("doIt");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time2);
    const result = await step3(time3);
    console.log(`result is ${result}`);
    console.timeEnd("doIt");
}
doIt();
```

```js
// 在async/await中捕获异常
async function fn(){
    try{
        let a = await Promise.reject('error')
    }catch(error){
        console.log(error)
    }
}
```

## Promise

![](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png)

构建promise的时候，其中的代码会立即执行，.then()后的是微任务

Promise实例存在三种状态：Pending(进行中)，Resolved(已完成)，Rejected(已拒绝)

存在两种过程pending->fulfilled:Resolved和pending->rejected:Rejected，一旦进入任一状态后就无法再更改

可以直接通过Promise.resolve/reject()来创建一个对象，对象创建后可以直接使用.then()

promise.then(成功的函数，失败的函数)，.then执行后返回的也是Promise对象，所以可以直接.then链式调用

.then()中必须传入函数，如果传入的非函数，则会用上一个Promise的结果进行透传

```js
Promise.resolve(1) // Promise的值为1
  .then(2)  // 非函数，透传，值为1
  .then(Promise.resolve(3)) // 非函数，透传，值为1（.then中只接受函数传递，其他情况都是值传递，.then(()=>Promise.resolve(3)这种情况会返回3)）
  .then(console.log) // 输出1
```

也可以不写失败的函数，改写成promise.then(成功的函数).catch(失败的函数)

.catch只能捕获之前Promise中throw的error，如果是return error，则会包装成return resolve(error)

.finally方法不接受任何参数（内部不关心promise的状态，传入值都为undefined），也不会传递任何值（会将前面Promise的值透传下去）

Promise.all()方法可以完成并行任务，它接收一个数组，数组的每一项都是一个`promise`对象。当数组中所有的`promise`的状态都达到`resolved`的时候，`all`方法的状态就会变成`resolved`，并返回一个包含所有resolve结果的数组，如果有一个状态变成了`rejected`，那么`all`方法的状态就会变成`rejected`,且会立刻终止。如果传入的数组中有非`promise`对象的值，那么该值会被包装成一个`resolved`状态的`promise`对象。

```js
// Promise手写
function myPromiseAll(promiseArray) {
    return new Promise((resolve,reject)=>{  // 返回一个Promise
        if(!Array.isArray(promiseArray)){
            return reject(new TypeError('argument must be an array'))
        }
        const length = promiseArray.length  // 获取数组长度
        const result = new Array(length)    // 创建一个和promiseArray长度相同的数组,用于存储结果
        if(length === 0){
            return resolve(result) 
        }
        let count = 0
        promiseArray.forEach((promise,index)=>{
            Promise.resolve(promise).then(res=>{
                count++
                result[index] = res
                if(count === length){
                    resolve(result)
                }
            }).catch(err=>{
                reject(err)
            })
        })

    })
}
```

Promise.race()方法与all类似，接受的参数是一个每项都是`promise`的数组，但是与`all`不同的是，当最先执行完的事件执行完之后，就直接返回该`promise`对象的值。如果第一个`promise`对象状态变成`resolved`，那自身的状态变成了`resolved`；反之第一个`promise`变成`rejected`，那自身状态就会变成`rejected`。

```js
// 可以在数组中添加一个计时器函数，当超出这个时间后，就不执行原先的命令	
Promise.race([promise1,timeOutPromise(5000)]).then(res=>{})
```

```js
// 手写Promise.race()
function myPromiseRace(promiseArray) {
    return new Promise((resolve, reject) => {  // 返回一个Promise
        const length = promiseArray.length
        if (!Array.isArray(promiseArray)) {
            return reject(new TypeError('argument must be an array'))
        }
        if (length === 0) {
            return resolve([])
        }
        // Promise.resolve会将每一个值包装成Promise，并放入微任务序列，等到forEach结束后，再并行执行微任务序列
        promiseArray.forEach((promise, index) => {
            Promise.resolve(promise).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })

    })
}
```

Promise.allSettled同时执行多个异步操作，并在所有操作都完成后（无论成功还是失败）获取每个操作的结果。与 Promise.all 不同，allSettled 不会因某个 Promise 失败而提前终止，而是始终等待所有 Promise 完成。

```js
// 手写Promise.allSettled
function myPromiseAllSettled(promiseArray) {
    return new Promise((resolve, reject) => {  // 返回一个Promise
        if (!Array.isArray(promiseArray)) {
            return reject(new TypeError('argument must be an array'))
        }
        const length = promiseArray.length  // 获取数组长度
        const results = new Array(length)
        let completedCount = 0  // 计数器，记录完成的Promise数量
        if (length === 0) {
            return resolve(results)
        }
        promiseArray.forEach((promise, index) => {
            // 将每个元素包装为 Promise（处理非 Promise 值）
            Promise.resolve(promise)
                .then(value => {
                    // 成功时记录结果
                    results[index] = {
                        status: 'fulfilled',
                        value
                    };
                })
                .catch(reason => {
                    // 失败时记录结果
                    results[index] = {
                        status: 'rejected',
                        reason
                    };
                })
                .finally(() => {
                    // 无论成功或失败，计数加1
                    completedCount++;

                    // 所有 Promise 都已完成（无论状态如何）
                    if (completedCount === promiseArray.length) {
                        resolve(results);
                    }
                });
        });

    })
}
```

Promise.finally()是最后执行的方法，不管Promise的状态是fulfilled还是rejected都会执行

## 垃圾回收机制

垃圾回收机制只会回收堆的内存（用于存储对象，数组，函数）

垃圾回收算法：

- 标记清除。首先回收机制会**递归遍历**堆内存上的所有对象，并给这些对象打上标记，删除那些没有标记的对象
  - 优点：简单
  - 缺点：会产生碎片
- 标记整理。标记过程类似，只是在清除过程后，算法会将活着的对象往内存的一端进行移动，最后清理掉另一端的内存
- 引用计数。当变量声明并赋值后，引用值为1。当该变量被赋给另一个值后，引用值加一，相反，解除引用时，引用值减一。当引用值为0时，将其回收

V8引擎对于内存区的优化。以下数据结构用的都是虚拟地址

首先将内存区划分成新生代区和老生代区，一般老生代区的容量大于新生代区。将新生代区一分为二，划分成使用区和空闲区。新生代区的回收机制如下：

当使用区的内存即将满的时候，将使用区的内容全部移动到空闲区，移动过程中进行引用检查和排序，随后在空闲区内执行垃圾回收，回收后，空闲区会变为使用区，原先的使用区则变成空闲区。在经历两次空闲交换后仍存活的对象，就会移动到老生代区。老生代区采用的是标记整理机制。日过需要处理的对象占用空间过大，会直接进入老生代区。

完整流程：

（一）新生代：Scavenge 算法（复制算法）
1. 原理
基于复制 - 清除，利用新生代对象存活率低的特点，牺牲一半空间换速度：
初始：所有新对象分配在 From 空间，To 空间空
触发回收（From 空间满）：
从 GC Roots（全局对象、调用栈、寄存器、闭包、DOM 句柄）出发，标记所有存活对象
把存活对象复制到 To 空间，按内存地址紧凑排列（无碎片）
直接清空整个 From 空间（死亡对象直接丢弃，无需逐个处理）
交换 From/To 身份：原 To 变新 From，原 From 变新 To，等待下一次回收
2. 优点
速度极快：仅复制存活对象，新生代存活少，耗时短（毫秒级）
无内存碎片：复制后对象连续排列，分配效率高（指针 bump 分配）
实现简单，适合小空间、高频率回收
3. 缺点
空间利用率低：永远浪费一半新生代空间
不适合大对象：复制大对象耗时、占空间，所以大对象直接进老生代
（二）老生代：Mark-Sweep（标记 - 清除）+ Mark-Compact（标记 - 整理）
老生代对象存活率高、空间大，复制算法会浪费大量空间、复制耗时，所以用标记 - 清除为主，标记 - 整理解决碎片问题。
1. Mark-Sweep（标记 - 清除）—— 基础回收
分两步：
标记阶段：从 GC Roots 遍历所有可达对象，打上「存活」标记；不可达（无引用）的就是垃圾
清除阶段：遍历整个老生代堆，把未标记的垃圾对象直接回收，释放内存到空闲链表（Free List）
优点：无需移动对象、空间利用率 100%；缺点：产生大量内存碎片（空闲内存分散，无法分配大对象），清除阶段需全堆遍历，耗时久。
2. Mark-Compact（标记 - 整理）—— 碎片整理
解决 Mark-Sweep 的碎片问题，分三步：
标记：同 Mark-Sweep，标记所有存活对象
整理：把存活对象向堆的一端移动、紧凑排列，覆盖死亡对象空间
清除：移动完成后，直接回收端外的所有连续空闲空间
优点：彻底消除碎片，后续分配效率高；缺点：移动对象耗时、需修改所有引用地址（指针更新），停顿更长，所以只在碎片严重时触发。

## async/await

ES8新增

使用async包装的函数需要返回Promise对象。如果返回的值非Promise对象，会使用Promise.resolve()包裹。如果函数内部throw error，则会返回Promise.reject(error)。

await 关键字期待（但实际上并不要求）一个实现 thenable 接口的对象，但常规的值也可以。如果是实现 thenable 接口的对象，则这个对象可以由 await 来“解包”。如果不是，则这个值就被当作已经解决的期约。

代码输出题中，将await后的函数看成Promise，后续的代码看成.then(即微任务序列)。如果await 后的函数reject或抛出错误，则终止后续代码运行

## Reflect和Proxy

Proxy为代理，可以为对象设置代理对象并设置拦截器，拦截器为一个对象，属性为拦截方法。拦截方法基本都是对应Object上的方法。

```
// 设置拦截器
const handle = {
  	get(target, prop, receiver) {
        console.log(`Getting property "${prop}"`);
        return Reflect.get(target, prop, receiver); // 使用反射获取值，避免无限拦截循环
  }
}
const target = {
	id:1
}
const targetProxy = new Proxy(target,handle);
```

> 上述内容为什么需要使用`receiver`参数？
> 答：是为了解决原对象中存在getter函数时的问题，如果不传入receiver参数，且原来的对象中存在getter函数，如
> ```js
> const target = {
> 	id:1,
> 	get uid(){
> 		return this.id;
> 	}
> }
> ```
> 那么在`handle`中使用`Reflect.get(target, prop, receiver)`或`target[prop]`时，当访问`uid`属性时，会调用getter函数，此时getter函数中的`this`指向`target`对象，而不是代理对象`targetProxy`，如果getter函数中访问了其他属性（如访问了`id`），就不会经过代理，通过传入`receiver`参数，可以确保在访问getter函数时，`this`指向代理对象，从而避免了这个问题。

另一种可能出错的例子：
```js
const parent = {
  data: 'parent',
  get value() {
    return this.data
  }
}

const child = Object.create(parent)
child.data = 'child'

const proxy = new Proxy(child, {
  get(target, prop, receiver) {
    return Reflect.get(target, prop)
  }
})
```
这种情况，child继承了parent的value属性，当访问`child.value`,this指向child，返回child.data的值'child'，但访问proxy的时候，this指向child，而child没有value方法，所以会沿着原型链访问到parent对象的方法，返回'parent'，这时就不符合预期了，通过传入receiver参数，可以确保在访问getter函数时，this指向代理对象，从而返回正确的值。


Reflect为配合Proxy的元编程类型，不会触发任何拦截器，Proxy拥有的所有拦截器都有对应的Reflect方法，传参也和上述示例类似。会根据操作的成功与否返回布尔值。

## 尾调用优化

指在函数return的时候，执行另一个函数并返回

```js
function outerFunction() {
	return innerFunction(); // 尾调用
}
```

在ES6**优化前**，执行这个例子会在内存中发生如下的操作：

1. 执行到outerFunction 函数体，第一个栈帧被推到栈上。
2. 执行outerFunction 函数体，到return 语句。计算返回值必须先计算innerFunction。
3. 执行到innerFunction 函数体，第二个栈帧被推到栈上。
4. 执行innerFunction 函数体，计算其返回值。
5. 将返回值传回outerFunction，然后outerFunction 再返回值。
6. 将栈帧弹出栈外。

再ES6**优化后**，执行这个例子会在内存中发生如下的操作：

1. 执行到outerFunction 函数体，第一个栈帧被推到栈上。
2. 执行outerFunction 函数体，到达return 语句。为求值返回语句，必须先求值innerFunction。
3. 引擎发现把第一个栈帧弹出栈外也没问题，因为innerFunction 的返回值也是outerFunction的返回值。
4. 弹出outerFunction 的栈帧。
5. 执行到innerFunction 函数体，栈帧被推到栈上。
6. 执行innerFunction 函数体，计算其返回值。
7. 将innerFunction 的栈帧弹出栈外。

第一种情况下，每多调用一次嵌套函数，就会多增加一个栈帧。而第二种情况下无论调用多少次嵌套函数，都只有一个栈帧。这就是ES6尾调用优化的关键：如果函数的逻辑允许基于尾调用将其销毁，则引擎就会那么做。
