# React18

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

计算属性

```
// 第一个参数是计算函数，需要返回计算后的值；第二个参数则是依赖项，即当依赖项变更后再重新计算
useMemo(func, dependencies)
```



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

![](./react-redux.png)

由于Redux自身只支持同步actions的操作，如果想使用异步actions，就必须要引入redux-thunk，这是一个中间件，用于拦截actions->state，可以在内部添加复杂逻辑。

redux-thunk会检测到返回的是函数，并自动执行它，传入 `dispatch` 和 `getState`两个函数。如果传递的是普通对象，redux-thunk不会进行额外操作。

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

