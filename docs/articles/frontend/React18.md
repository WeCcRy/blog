# React18

## 函数式编程和组件式编程的区别

在 React 语境下，这通常探讨的是 **函数组件（Functional Components）** 与 **类组件（Class Components）** 的区别。这两种不同的组件写法分别代表了不同的编程范式。

### 1. 核心概念对比

*   **类组件（Class Components）**：属于**面向对象编程（OOP）**。它关注的是组件实例和生命周期。组件有自己的内部状态（`this.state`），并通过 `this` 来访问数据。需要通过生命周期钩子（如 `componentDidMount`、`componentDidUpdate`）来管理不同的阶段逻辑。
*   **函数组件（Functional Components）**：属于**函数式编程（FP）**。核心思想是**确定的输入决定确定的输出**（`UI = f(state)`）。它更加关注数据的转化和渲染本身，不关心实例化，利用闭包（Closure）来捕获每一次渲染的独立状态。（即每一次的渲染都是基于当时的状态，类组件中渲染依赖state，但state是可变的）


### 2. 状态与副作用管理

*   **类组件**：往往通过生命周期将所有逻辑混杂在一起。比如在 `componentDidMount` 里同时发起不同的网络请求、绑定各类事件监听，然后再在 `componentWillUnmount` 里解绑事件。
*   **函数组件**：凭借 React Hooks（如 `useState`、`useEffect`），可以按具体的业务功能将相关的副作用代码聚合在一起（例如订阅与清理写在同一个 `useEffect` 内），而不是根据生命周期硬性拆分。

| class 组件               | Hooks 组件               |
| ------------------------ | ------------------------ |
| constructor              | useState                 |
| getDerivedStateFromProps | useState 里面 setxx 函数 |
| shouldComponentUpdate    | useMemo                  |
| render                   | 函数本身（执行函数）     |
| componentDidMount        | useEffect                |
| componentDidUpdate       | useEffect                |
| componentWillUnmount     | useEffect 里面返回的函数 |
| componentDidCatch        | 无                       |
| getDerivedStateFromError | 无                       |


# JSX

## 响应表达式

通过 `{}` 识别表达式，类似vue中的双`{}`

## 列表渲染

对比vue中用v-for

```react
<ul>
    {list.map(item=><li key = {item.id}>{item.value}</li>)}
</ul?
```

## 条件渲染

```react
const flag = 0;
return (
  <>
    {flag == 1 && <div>flag=1时显示</div> }  {/*前面需要先判断一下，否则为0的时候会直接显示0，如果变量是true/false则无需判断*/}
    {flag ? <div>三元真时显示</div>:<div>三元假时显示</div>} {/*三元可以直接用隐式转换*/}
  </>
)

// 复杂逻辑渲染
const flag = 2; // 情况分别为0，1，2
function render() {
  if (flag == 0) {
    return <div>flag=0时显示</div>
  } else if (flag == 1) {
    return <div>flag=1时显示</div>
  } else {
    return <div>flag=2时显示</div>
  }
}
return (
  <>
    {render()}
  </>
)
```

## 事件绑定

```react
const pa = "haha"
function handleClick1() {
  console.log("click")
}
function handleClick2(e){
  console.log(e)
}
function handleClick3(e,param){
  console.log(e)
  console.log(param)
}
return (
  <>
    <button onClick={handleClick1}>按钮1</button>
    <button onClick={(e)=>handleClick2(e)}>按钮2</button>
    <button onClick={(e)=>handleClick3(e,pa)}>按钮3</button>
  </>
)
```

## 自定义组件

实现方法是定义一个名称首字母大写的函数，在函数内部返回HTML标签	

```react
const Button = () => {
  return (
    <button>按钮</button>
  )
}

return (
  <>
    <div className="App">
      <Button></Button>
    </div>
  </>
)
```

## 响应式变量

通过useState()实现，返回一个数组[具体的变量名，set方法]

set方法是异步的，并不会同步更新数据

```react
function Button({ count, onClick }) {
  return <button onClick={onClick}>按钮{count}</button>
}


function App() {
  const [count, setCount] = useState(0) // count是一个状态变量，setCount是一个函数，用于更新count的值
  return (
    <>
      <div className="App">
        <Button count={count} onClick={() => setCount(count + 1)} />      </div>
    </>
  )
}

// 响应式对象的实现，不能直接更改对象的属性，需要调用对应的修改方法，在方法中解构对象，再添加需要修改的内容
const [obj, setobj] = useState(
  {
    name: '小明',
    age: 18,
  }
)
const fun = () => {
  setobj({
    ...obj,
    age: obj.age + 1
  })
}
return (
  <>
    <div className="App">
      <div>
        {obj.name}+{obj.age}
      </div>   
      <button onClick={fun}>点击</button>
    </div>
  </>
)
```

如果组件不是通过函数返回实现的，而是通过 class 实现的，则需要通过 `this.setState` 方法更新。此时 `setState` 非全量更新，而是局部更新（和旧的 state 进行合并，合并第一层的属性）。

### 一、setState 的执行流程

1.  **调用 `setState`**：将更新动作放入队列。
2.  **决定处理时机**：根据 React 版本和场景决定是“同步”还是“异步（批处理）”。
3.  **处理队列**：合并更新，触发 `render`。

### 二、React 17 及以前：受控的批处理

#### 1. 实现原理

React 17 的批处理本质上是通过**同步代码包裹**（Sync Logic Wrap）实现的。React 会在调用你的事件处理函数前，通过 `batchedUpdates` 开关将全局标志位设为 `true`。

*   **同步流程**：整个“收集 setState -> 执行你的函数 -> 触发 render”的过程都是在同一个**同步宏任务**中完成的。
*   **同步局限**：由于它是靠同步执行流中 `finally` 块来关闭开关并触发渲染的，一旦遇到 `setTimeout` 等异步操作，这段同步逻辑早已结束。

```javascript
// setState 核心逻辑 (React 17)
function setState(newState) {
  if (isBatchingUpdates) {
    updateQueue.push(newState); // 批处理：收集更新
  } else {
    // 立即执行同步更新 + 同步 render() (导致多次渲染断点)
  }
}

// 批量更新的开关 (同步包裹)
function batchedUpdates(fn) {
  isBatchingUpdates = true;    
  try {
    fn();                      // 同步执行你的逻辑
  } finally {
    isBatchingUpdates = false; 
    flushUpdateQueue();        // 同步触发一次 render
  }
}
```

#### 2. 同步 vs 异步场景

*   **异步（批量更新）**：React 能接管的地方（如合成事件、生命周期）。
*   **同步（立即更新）**：React 无法接管的地方（如 `setTimeout`、原生 DOM 事件）。

**为什么 `setTimeout` 会逃脱？**
当 `setTimeout` 的回调执行时，`batchedUpdates` 的 `finally` 块早已执行完毕，`isBatchingUpdates` 已被重置为 `false`，导致更新变为同步。

#### 3. React 17 场景总结

| 场景                         | `isBatchingUpdates` | 表现               | `render` 次数 |
| :--------------------------- | :------------------ | :----------------- | :------------ |
| 合成事件（`onClick` 等）     | `true`              | 异步，批量合并     | 1 次          |
| 生命周期                     | `true`              | 异步，批量合并     | 1 次          |
| `setTimeout` / `setInterval` | `false`             | **同步，立即更新** | 多次          |
| 原生 DOM 事件                | `false`             | **同步，立即更新** | 多次          |



### 三、React 18：自动批处理 (Automatic Batching)

#### 1. 实现原理

React 18 彻底抛弃了同步标志位，改为将“处理队列”动作调度到**异步微任务**中执行：

*   **异步性**：无论在何处调用 `setState`，React 都会先将更新放入队列，并触发一个微任务（Microtask）。
*   **全场景自动合并**：由于微任务会在“当前宏任务（如点击事件、定时器回调）的所有同步代码跑完后”才执行，因此无论 `setState` 在哪里调用，都能实现异步合并。

```javascript
let updateQueue = [];
let isFlushScheduled = false; // 是否已调度过微任务

function setState(newState) {
  updateQueue.push(newState);  // 永远先放入队列，不立即执行

  if (!isFlushScheduled) {
    isFlushScheduled = true;
    // 调度异步微任务 (核心变更：从同步变异步)
    queueMicrotask(() => {
      isFlushScheduled = false;
      flushQueue();            // 在这里统一处理合并，触发一次 render
    });
  }
}
```

#### 2. 为什么微任务能自动合并？

微任务的特性是：**同步代码全部执行完，才会执行微任务**。
即便在 `setTimeout` 中，多次 `setState` 也会先放入队列，等该次宏任务的同步代码跑完后，再由微任务统一处理。

#### 3. React 18 场景总结

| 场景                         | 表现               | `render` 次数 |
| :--------------------------- | :----------------- | :------------ |
| 合成事件                     | 批量更新           | 1 次          |
| 生命周期                     | 批量更新           | 1 次          |
| `setTimeout` / `setInterval` | **✅ 自动批量更新** | 1 次          |
| 原生 DOM 事件                | **✅ 自动批量更新** | 1 次          |

### 四、核心对比总结

| 特性                | React 17                   | React 18                     |
| :------------------ | :------------------------- | :--------------------------- |
| **控制方式**        | `isBatchingUpdates` 标志位 | 微任务调度                   |
| **`setState` 本身** | 可能同步执行               | **永远是异步的**（放入队列） |
| **`render` 触发**   | 可能立即触发               | 永远通过微任务异步触发       |
| **`setTimeout`**    | ❌ 同步更新                 | ✅ 自动批量更新               |
| **原生事件**        | ❌ 同步更新                 | ✅ 自动批量更新               |
| **批处理范围**      | 仅 React 能接管的地方      | **全场景覆盖**               |

### 五、一句话总结

*   **React 17**：通过手动开关标志位，利用同步代码块的包裹来实现批处理，`setTimeout` 等场景因脱离包裹环境而失效。
*   **React 18**：利用事件循环机制（微任务），确保无论在何处调用，都会在当前同步代码执行完后才进行合并更新。

### 六、如何脱离自动批处理

*   **React 17 及以前**：可以使用 `setTimeout` 等异步操作包裹 `setState`。
*   **React 18**：提供了 `flushSync` API 用于强制同步刷新 DOM，从而避免批处理。

```react
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCount(c => c + 1);
  });
  // 此时 DOM 已经同步更新
  flushSync(() => {
    setFlag(f => !f);
  });
  // 此时 DOM 再次同步更新
}
```

## 样式引入


```react
// 1.行内样式
function App() {
  const style = {
    color: 'red',
    fontSize: '30px'
  }
  return (
    <>
      <div className="App">
        <div style={style}>test</div>
      </div>
    </>
  )
}

// 2.外部引入
// style.css
.foo{
    background-color: red;
    font-size: 30px;
}
// app
import './test.css'
function App() {
  return (
    <>
      <div className="App">
        <div className='foo'>test</div> {/*通过css文件引入的样式，使用className对应文件中的类名*/}
      </div>
    </>
  )
}
// 动态绑定类名,可以使用模板字符串，或下载classNames包
<div className = {`static-class ${active === isActive && 'active-class'}`}></div>
```

## 表单的双向绑定

类似vue中的v-model

```react
const [value, setValue] = useState('')
return (
  <>
    <div className="App">
      <input
        type="text"
        value={value} /* 获取数据 */
        onChange={(e) => setValue(e.target.value)} /* 修改数据 */
      ></input>
      <div>result:{value}</div>
    </div>
  </>
)
```

## 获取dom

和vue中获取dom对象一样

```react
function App() {
  const inputRef = useRef(null) // 先绑定一个空的ref
  const showDom = () => {
    console.log(inputRef.current) // 通过current属性获取DOM元素
  }
  return (
    <>
      <input type="text" ref={inputRef}> {/* 绑定ref */}
      </input>
      <button onClick={showDom}>Show DOM</button>
    </>
  )
}
```

## forwardRef 与 useImperativeHandle

用于在函数组件中向父组件暴露内部 DOM 或自定义实例方法，常与 `forwardRef` 配合使用(react19以前，react19以后可以直接传入ref而不使用forwardRef)。

简单示例（`forwardRef` 转发 ref 到子组件的 DOM）：

```react
// 子组件通过 forwardRef 转发 ref 到内部 DOM
const Child = forwardRef((props, ref) => {
  return <input ref={ref} placeholder="child input" />
})

function Parent() {
  const inputRef = useRef(null)
  const focus = () => inputRef.current && inputRef.current.focus()
  return (
    <>
      <Child ref={inputRef} />
      <button onClick={focus}>聚焦子输入框</button>
    </>
  )
}
```

配合 `useImperativeHandle` 自定义暴露给父组件的接口（只导出需要的方法，保持封装）：

```react
// 子组件自定义暴露的实例方法
const Child = forwardRef((props, ref) => {
  const inputRef = useRef(null)
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current && inputRef.current.focus(),
    clear: () => { if (inputRef.current) inputRef.current.value = '' }
  }), [])
  return <input ref={inputRef} />
})

function Parent() {
  const childRef = useRef(null)
  return (
    <>
      <Child ref={childRef} />
      <button onClick={() => childRef.current?.focus()}>调用子 focus()</button>
      <button onClick={() => childRef.current?.clear()}>调用子 clear()</button>
    </>
  )
}
```

注意：
- `forwardRef` 用于将父组件的 `ref` 传递给函数组件；
- `useImperativeHandle` 应只暴露必要方法，避免破坏组件封装；
- 第三个参数（依赖数组）控制返回值重建时机。




## 组件间通信

父子通信，类似vue中的props

```react
function Son(props) {
  return (
    <div>
      <span>子组件</span>
      <div>{props.content}</div> {/* props是一个对象，里面存储所有父组件传入的键值对，子组件只能读取无法修改 */}
    </div>
  )
}
// App相当于父组件
function App() {
  return (
    <>
      <Son content="父组件传入"> {/* 传入子组件 */}
    </Son>
    </>
  )
}

// 可以在子组件标签中传入标签或数据，子组件都可以通过props.children获得
<Son content="父组件传入"> 
{data}
<span>父组件传入的值</span>
</Son>
```

子传父，通过父组件传入方法，调用后返回

```react
function Son(props) {
  const {func} = props // 解构出函数
  func("子组件传递过来的数据")  // 调用函数传值
  return (
    <div>子组件</div>
  )
}
// App相当于父组件
function App() {
  const [data, setData] = useState('')
  const getData = (msg)=> {
    setData(msg)
  }
  return (
    <>
    <Son func={getData}> {/* 传递函数 */}
    </Son>
    <div>输出:{data}</div> 
    </>
  )
}
```

兄弟组件通信，通过父组件传递信息(状态提升)

```react
function SonA(props) {
  const data = "AtoB" // A组件要传递给B组件的数据
  const {func} = props // 解构出函数
  func(data)  // 调用函数传值
  return (
    <div>子组件A</div>
  )
}

function SonB(props) {
  return (
    <>
    <div>子组件B</div>
    <div>子组件B接收到的数据:{props.data}</div>
    </>
  )
}

function App() {
  const [data, setData] = useState('')
  const getData = (msg)=> {
    setData(msg)
  }
  return (
    <>
    <SonA func={getData}/>  {/* 传递函数给子组件A,用于接受A传递给B的数据 */}
    <SonB data={data}/>  {/* 传递数据给子组件B */}
    </>
  )
}
```

祖孙组件之间的通信，类似vue中的provide/inject

```react
const DataContext = createContext(null) // 在全局创建一个上下文对象

function A(props) {
  return (
    <>
    <B></B>
    </>
  )
}

function B(){
  const data = useContext(DataContext) // 使用上下文数据,使用data可以接收到数据
  return (
  <div>这里是B组件，获取到的上下文数据是：{data}</div>
  )
}
function App() {
  const [data, setData] = useState('父组件数据') // 定义一个状态变量data
  return (
    <>
    <input value={data} onInput={(e)=>setData(e.target.value)}></input>
    <DataContext.Provider value={data}> {/* 使用value提供上下文数据 */}
    <A></A>  {/* 这里的所有组件都可以通过DataContext获取到父组件的data数据 */}
    </DataContext.Provider>
    </>
  )
}
```

## useEffect

一般用于渲染完成或依赖数据更新之后所进行的操作

useEffect(执行的函数，依赖项)

依赖项有三种情况:

- 为空。useEffect中的函数会在组件渲染完成后执行一次，当组件中的响应式数据发生变更后再执行一次
- 为空数组[]。useEffect中的函数会在组件渲染完成后执行一次
- 为[**name**]。useEffect中的函数会在组件渲染完成后执行一次，当**name**变更后再执行一次（name为定义的响应式变量）

```react
const url = "http://geek.itheima.net/v1_0/channels"

function App() {
  const [list, setList] = useState([]) // 定义一个状态变量data
  useEffect(() => {
    async function getList(url) {  // 异步函数需要写在useEffect内部，否则会报错（无法使用第一个参数直接调用函数，因为异步函数的返回值是Promise）
      const res = await fetch(url)
      const data = await res.json()  // fetch返回的是一个Stream流，需要序列化
      return data
    }
    getList(url).then(data => {
      const res = data.data.channels
      setList(res)
    })
  }
  , [])
  return (
    <>
    <ul>
      {list && list.map((item) => {
        return (
          <li key={item.id}>
            <h3>{item.name}</h3>
          </li>
        )
      })}
    </ul>
    </>
  )
}
```

在useEffect中编写函数，一般被称作副作用函数，对于异步函数而言，如果没有清除副作用函数则会继续执行，所以需要编写清理函数，如清空定时器，取消网络请求等

```react
// 如何清除副作用函数：在首个函数参数内，加入return ()=>{清除逻辑}
useEffect(()=>{
    const timer = setInterval(()=>{
        console.log("--执行中--")
    },1000)
    return ()=>{clearInterval(timer)}
})
```

## useLayoutEffect

与useEffect类似，区别在于useLayoutEffect会在DOM更新完成后立即执行（会阻塞浏览器绘制），而useEffect会在DOM更新完成后延迟执行（等浏览器空闲时）。因此，如果需要在DOM更新后立即读取布局信息或同步执行副作用，应该使用useLayoutEffect。

渲染 → DOM更新 → useLayoutEffect → 浏览器绘制 → useEffect

如果需要在使用useEffect的时候，更新了组件的状态，可能会重新渲染组件，导致页面闪烁，这时可以使用useLayoutEffect来避免这种情况，因为它会在DOM更新后立即执行，可以同步更新状态，避免不必要的重新渲染。


## 自定义Hook

用来将可复用的代码包装起来

封装自定义hook的通用思路

1. 声明一个名称以use开头的函数
2. 在函数内部封装可以复用的逻辑
3. 将组件中用到的状态和函数return出去
4. 在哪个组件中需要用到封装的逻辑，就通过解构，将状态和函数获得并使用

hook(use*)的使用规则：

- 只能在组件中或其他自定义Hook函数中使用
- 只能在组件的顶层进行调用，无法嵌套在if、for、内部函数中

```react
// 示例
function useToggle(){
  const [value, setValue] = useState(true)
  const toggle = () => {
    setValue(!value)
  }
  return { value, toggle } // 将状态和函数返回
}

function App() {
  const { value, toggle } = useToggle() // 解构对象
  return (
    <>
      <div>
        {value && <h1>hello</h1>}
        <button onClick={toggle}>Toggle</button>
      </div>
    </>
  )
}
```

## useMemo

计算属性，用于缓存结果，当依赖项发生变化时才会重新计算，否则会直接返回之前缓存的结果，避免不必要的计算，提高性能。

```
// 第一个参数是计算函数，需要返回计算后的值；第二个参数则是依赖项，即当依赖项变更后再重新计算
useMemo(func, dependencies)
```

## \<\>和\<Fragment\>的区别
\<\>是\<Fragment\>的语法糖，区别在于可以在\<Fragment\>上添加key


## memo组件

一般情况下，父组件的重新渲染会导致子组件的重新渲染，即使子组件的props没有发生变化，这时可以使用memo组件来优化性能，memo组件会对比前后props的变化（浅比较），如果没有变化则不会重新渲染子组件。

基本用法：`const MemoizedComponent = memo(SomeComponent, arePropsEqual?)`,其中`someComponent`是要包装的组件，`arePropsEqual`是一个可选的函数，用于自定义比较逻辑，默认情况下，memo会进行浅比较(Object.is)。

自定义比较逻辑：
`memo` 接受第二个参数 `arePropsEqual(prevProps, nextProps)`。
- 返回 `true`：不重新渲染（props 相等）
- 返回 `false`：重新渲染（props 不相等）
- 注意：这与 `shouldComponentUpdate` 的返回值逻辑相反。

```javascript
const MyComponent = memo(Chart, (prevProps, nextProps) => {
  // 可以在这里实现深比较，或者只比较特定的某些 props
  return prevProps.data.id === nextProps.data.id;
});
```

两种用法：
```js
// 1. 使用React.memo
import React from 'react'
const memoComp = React.memo(({ value }) => {
  return <div>{value}</div>
})
// 2. 使用memo函数
import { memo } from 'react'
const memoComp = memo(({ value }) => {
  return <div>{value}</div>
})
```

什么场景下使用memo组件：
- 父组件频繁更新，但子组件的props不经常变化
- 子组件的渲染比较复杂，性能开销较大
- 子组件的props是基本类型
- 子组件的props是对象类型，但父组件每次更新时都会传入同一个对象（即引用地址不变）
- 一般来说，渲染item的组件推荐使用memo

什么情况下不适合使用memo组件：
- 父组件更新不频繁，或者子组件的渲染开销较小（比较的开销可能大于渲染开销）
- 子组件的props几乎总是变化（例如父组件传入了未经过 `useCallback` 或 `useMemo` 优化的引用类型数据）

## useCallback

`useCallback` 用于缓存函数，返回一个 memoized 版本的回调函数，该函数仅在依赖项发生变化时才会更新。它的作用是避免在组件重新渲染时创建新的函数实例，从而优化性能。

使用场景：
- 子组件使用 `React.memo` 包裹，并且父组件传递了一个函数作为 props。使用 `useCallback` 可以确保在父组件重新渲染时，传递给子组件的函数引用保持不变，从而避免子组件不必要的重新渲染。
- 函数作为依赖项传入 `useEffect`、`useMemo` 或其他 `useCallback` 时，使用 `useCallback` 可以确保依赖项的稳定性，避免因函数引用变化而导致的副作用重新执行。

## 事件代理机制

React 事件代理机制总结

核心结论

React 事件系统本质是一个增强版的事件委托，把整棵组件树的事件统一代理到 root 上，触发时再沿着 fiber 树路径分发。

一、基础机制

onClick 不是真正绑在 DOM 上的


你写的所有 onClick、onClickCapture 等 只是存在对应的 fiber 节点上 真正的监听器只有两个，绑在 root 上：  root.addEventListener('click', handleCapture, true)   // 代理所有捕获事件 root.addEventListener('click', handleBubble, false)   // 代理所有冒泡事件

触发时按路径分发

用户点击 button     ↓ 浏览器通知 root 的监听器     ↓ React 通过 nativeEvent.target 找到 button 的 fiber     ↓ 沿着 fiber.return 向上收集路径（从内到外）     [button, inner, outer, root]     ↓ 捕获阶段：反向遍历路径，依次触发 onClickCapture（从外到内） 冒泡阶段：正向遍历路径，依次触发 onClick（从内到外）

注意：浏览器捕获是从外到内的，但 React 收集路径是从 target fiber 向上收集的（从内到外），最终通过遍历方向来保证触发顺序正确。

二、捕获和冒泡的顺序


捕获和冒泡的顺序完全依赖浏览器原生机制 不是优先级队列，React 不需要额外判断：  root.addEventListener('click', handleCapture, true)   → 浏览器捕获阶段触发 → 处理 onClickCapture  root.addEventListener('click', handleBubble, false)   → 浏览器冒泡阶段触发 → 处理 onClick  浏览器原生保证捕获先于冒泡 React 只需要在对应监听器里处理对应的合成事件  // 优先级队列是 Fiber 调度的概念 // 是 setState 之后的事，和事件触发顺序完全无关

三、React 16 vs React 17

React 16（委托在 document）

事件流： document捕获 → 原生事件 → document冒泡（合成事件在这里处理）  onClick 必须等事件冒泡到 document 才触发 button 上没有任何原生监听器 所以 wrapper 在中途 stopPropagation 事件到不了 document → 合成事件完全收不到 ❌

React 17+（委托在 root）


事件流： document捕获 → root捕获(onClickCapture) → 原生捕获 → 原生冒泡 → root冒泡(onClick) → document冒泡  合成事件在 root 就处理完，不依赖冒泡到 document root 外部的 stopPropagation 不再影响合成事件 ✅ 多个 React 实例各自代理自己的 root，互不干扰 ✅

四、stopPropagation 的影响


React 16：   root 内外任何地方截断  → 合成事件失效 ❌   （合成事件依赖冒泡到 document，中途截断就完全失效）  React 17+：   root 内部截断  → 合成事件失效（符合预期）⚠️   root 外部截断  → 合成事件不受影响 ✅  不会踩坑的情况：   ✅ 全程只用 React 合成事件   ✅ 不混用原生 addEventListener   ✅ 不在原生事件里 stopPropagation   → React 16 和 17 对你完全无感知

五、完整流程

用户点击 button     ↓ 浏览器捕获（从外到内）     document → root → outer → inner → button     ↓ root 捕获监听器触发     → 从 button fiber 向上收集路径     → 反向遍历，触发所有 onClickCapture ✅     ↓ 原生捕获继续（outer → inner → button）     ↓ 浏览器冒泡（从内到外）     button → inner → outer → root     ↓ root 冒泡监听器触发     → 从 button fiber 向上收集路径     → 正向遍历，触发所有 onClick ✅     ↓ 冒泡继续到 document     ↓ onClick 里如果有 setState     → 才进入 Fiber 调度，才涉及优先级

六、一句话记忆


事件代理：  2 个监听器代理整棵树，onClick 不是真正绑在 DOM 上 收集路径：  从 target fiber 向上收集，再靠遍历方向区分捕获/冒泡 捕获冒泡：  靠浏览器原生机制区分，与优先级队列无关 React 16：  委托在 document，中途截断合成事件就失效 React 17：  委托在 root，不受外部干扰，支持微前端


# Redux

```javascript
// 1. 定义 reducer 函数 
// 根据不同的 action 对象，返回不同的 state
// state 管理数据的初始状态
// action 对象的 type 属性标记需要做的修改操作
const state = { count: 0 }

function reducer (state, action) {
  switch (action.type) {
    case 'INCREMENT':
      // 必须返回一个新的对象，Redux不允许在原有state上进行修改，Redux会绑定到新对象上去
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: state.count - 1 }
    default:
      return state
  }
}
// 2. 使用reducer函数生成store实例,整个应用一般就一个store实例
const store = Redux.createStore(reducer)

// 3. 通过 store 实例的 subscribe 订阅数据变化
// 回调函数在每一次 state 发生变化时自动执行
store.subscribe(() => {
  console.log(store.getState()) // 会返回当前的store对象
  document.getElementById('count').innerText = store.getState().count

})
// 4. 通过 store 的 dispatch 函数提交 action 的更改状态
const inBtn = document.getElementById('increment')
inBtn.addEventListener('click', () => {
  // 匹配的是 action 对象，所以传入 action 对象
  store.dispatch({
    type: 'INCREMENT' //一般必须要有type属性，也可以传递其他信息
  })
})
// 减
const dBtn = document.getElementById('decrement')
dBtn.addEventListener('click', () => {
  store.dispatch({
    type: 'DECREMENT'
  })
})
```

## React-redux

首先需要安装@reduxjs/toolkit和redux

操作逻辑如下

注:actions.payload就是图四调用中传入的参数

![](./images/react-redux.png)

由于Redux自身只支持同步actions的操作，如果想使用异步actions，就必须要引入redux-thunk，这是一个中间件，用于拦截actions->state，可以在内部添加复杂逻辑。

原先流程是使用时直接使用dispatch传入名称和参数，现在相当于使用一个异步函数包上这个流程，然后直接dispatch这个函数。redux-thunk会检测到返回的是函数，并自动执行它，传入 `dispatch` 和 `getState`两个函数。如果传递的是普通对象，redux-thunk不会进行额外操作。

写法如下

```react
// 这是一个异步的actions
const fetchFoodList = () => {
	// 返回一个异步的函数
    return async(dispatch) => {
        const response = await axios.get("http://localhost:3004/takeaway")
        // console.log(response.data)
        dispatch(setFoodList(response.data))
    }
}

// 通过调用该函数实现actions操作
export {fetchFoodList}

// 外界调用dispatch(fetchFoodList()),redux-thunk会检测dispatch的参数，发现是函数，于是自动执行它，传入 dispatch 和 getState
```

# React-router

相关包名为react-router-dom

## 路由模块声明

```react
// 引入包
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

// 创建路由
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {path: "/about",
    element: <div>About</div>,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*传递路由*/}
    <RouterProvider router={router} />
  </StrictMode>,
)
```

## 路由导航

```react
import { Link,useNavigate } from "react-router-dom"

const About = () => {
    const navigate = useNavigate() 
    return (
        <div>
        <h1>About</h1>
        <p>This is the about page.</p>
        {/*声明式导航,使用自带的Link标签，react会解析成a标签*/}
        <Link to="/contact">联系我们</Link>

        {/*编程式导航，使用useNavigate钩子*/}
        <button onClick={() => navigate("/contact")}>
            联系我们
        </button>
        </div>
    )
}

export default About
```

## 路由传参

```react
{/*searchParams传参,通过在?后拼接kv，使用&区分*/}
<button onClick={() => navigate("/contact?id=1&name=john")}>
searchParams传参
</button>

{/*使用useSearchParams钩子接受参数*/}
const [params] = useSearchParams() // 返回的是数组，先解构
const name = params.get('name') // 通过get方法
```

```react
{/*Params传参*/}
<button onClick={() => navigate("/contact/1/john")}>
Params传参
</button>

// 需要在路由处配置
const router = createBrowserRouter([
  {
    path: "/contact/:id/:name", // 配置接受的参数
    element: <Contact/>,
  }
])

{/*使用useParams钩子接受参数*/}
const params = useParams() // 返回的是对象
const name = params.name   // 直接访问对象属性即可
```

## 嵌套路由

通过在路由中配置Children实现子路由，然后再在主路由中配置<Outlet/>,该标签会将对应的路由组件渲染到该标签内

````react
// 创建路由
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
    ],
  },
]);

// <Outlet>
<Link to="/about">关于我们</Link>
<Link to="/contact">联系我们</Link>
<Outlet></Outlet> //会根据点击跳转的路由，渲染对应的组件
```

子路由如果需要直接渲染（而不是通过路由跳转），需要把path去掉，换成index:true。这样的话路由会直接渲染到<Outlet>中

## 404路由

```react
const router = createBrowserRouter([
  {
  ...
  },
  { 
  ...
  },
  ...
  // 末尾添加
  {
  	path:'*', //找不到路由信息的会走该路由
  	element:<NotFound />
  }
]);
```

## 路由模式

`createBrowserRouter` 对应的是history模式

`createHashRouter` 对应的是hash模式

