import{_ as l,C as t,c as i,o as e,ae as n,j as c,a,G as o}from"./chunks/framework.z0sZ1NT9.js";const h="/blog/assets/react-redux.CbOKGAZi.png",y=JSON.parse('{"title":"React18","description":"","frontmatter":{},"headers":[],"relativePath":"articles/frontend/React18.md","filePath":"articles/frontend/React18.md"}'),r={name:"articles/frontend/React18.md"};function d(g,s,u,k,E,v){const p=t("Outlet");return e(),i("div",null,[s[2]||(s[2]=n(`<h1 id="react18" tabindex="-1">React18 <a class="header-anchor" href="#react18" aria-label="Permalink to &quot;React18&quot;">​</a></h1><h1 id="jsx" tabindex="-1">JSX <a class="header-anchor" href="#jsx" aria-label="Permalink to &quot;JSX&quot;">​</a></h1><h2 id="响应表达式" tabindex="-1">响应表达式 <a class="header-anchor" href="#响应表达式" aria-label="Permalink to &quot;响应表达式&quot;">​</a></h2><p>通过 <code>{}</code> 识别表达式，类似vue中的双<code>{}</code></p><h2 id="列表渲染" tabindex="-1">列表渲染 <a class="header-anchor" href="#列表渲染" aria-label="Permalink to &quot;列表渲染&quot;">​</a></h2><p>对比vue中用v-for</p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;ul&gt;</span></span>
<span class="line"><span>    {list.map(item=&gt;&lt;li key = {item.id}&gt;{item.value}&lt;/li&gt;)}</span></span>
<span class="line"><span>&lt;/ul?</span></span></code></pre></div><h2 id="条件渲染" tabindex="-1">条件渲染 <a class="header-anchor" href="#条件渲染" aria-label="Permalink to &quot;条件渲染&quot;">​</a></h2><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const flag = 0;</span></span>
<span class="line"><span>return (</span></span>
<span class="line"><span>  &lt;&gt;</span></span>
<span class="line"><span>    {flag == 1 &amp;&amp; &lt;div&gt;flag=1时显示&lt;/div&gt; }  {/*前面需要先判断一下，否则为0的时候会直接显示0，如果变量是true/false则无需判断*/}</span></span>
<span class="line"><span>    {flag ? &lt;div&gt;三元真时显示&lt;/div&gt;:&lt;div&gt;三元假时显示&lt;/div&gt;} {/*三元可以直接用隐式转换*/}</span></span>
<span class="line"><span>  &lt;/&gt;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 复杂逻辑渲染</span></span>
<span class="line"><span>const flag = 2; // 情况分别为0，1，2</span></span>
<span class="line"><span>function render() {</span></span>
<span class="line"><span>  if (flag == 0) {</span></span>
<span class="line"><span>    return &lt;div&gt;flag=0时显示&lt;/div&gt;</span></span>
<span class="line"><span>  } else if (flag == 1) {</span></span>
<span class="line"><span>    return &lt;div&gt;flag=1时显示&lt;/div&gt;</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    return &lt;div&gt;flag=2时显示&lt;/div&gt;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>return (</span></span>
<span class="line"><span>  &lt;&gt;</span></span>
<span class="line"><span>    {render()}</span></span>
<span class="line"><span>  &lt;/&gt;</span></span>
<span class="line"><span>)</span></span></code></pre></div><h2 id="事件绑定" tabindex="-1">事件绑定 <a class="header-anchor" href="#事件绑定" aria-label="Permalink to &quot;事件绑定&quot;">​</a></h2><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const pa = &quot;haha&quot;</span></span>
<span class="line"><span>function handleClick1() {</span></span>
<span class="line"><span>  console.log(&quot;click&quot;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>function handleClick2(e){</span></span>
<span class="line"><span>  console.log(e)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>function handleClick3(e,param){</span></span>
<span class="line"><span>  console.log(e)</span></span>
<span class="line"><span>  console.log(param)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>return (</span></span>
<span class="line"><span>  &lt;&gt;</span></span>
<span class="line"><span>    &lt;button onClick={handleClick1}&gt;按钮1&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;button onClick={(e)=&gt;handleClick2(e)}&gt;按钮2&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;button onClick={(e)=&gt;handleClick3(e,pa)}&gt;按钮3&lt;/button&gt;</span></span>
<span class="line"><span>  &lt;/&gt;</span></span>
<span class="line"><span>)</span></span></code></pre></div><h2 id="自定义组件" tabindex="-1">自定义组件 <a class="header-anchor" href="#自定义组件" aria-label="Permalink to &quot;自定义组件&quot;">​</a></h2><p>实现方法是定义一个名称首字母大写的函数，在函数内部返回HTML标签</p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const Button = () =&gt; {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;button&gt;按钮&lt;/button&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>return (</span></span>
<span class="line"><span>  &lt;&gt;</span></span>
<span class="line"><span>    &lt;div className=&quot;App&quot;&gt;</span></span>
<span class="line"><span>      &lt;Button&gt;&lt;/Button&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  &lt;/&gt;</span></span>
<span class="line"><span>)</span></span></code></pre></div><h2 id="响应式变量" tabindex="-1">响应式变量 <a class="header-anchor" href="#响应式变量" aria-label="Permalink to &quot;响应式变量&quot;">​</a></h2><p>通过useState()实现，返回一个数组[具体的变量名，set方法]</p><p>set方法是异步的，并不会同步更新数据</p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function Button({ count, onClick }) {</span></span>
<span class="line"><span>  return &lt;button onClick={onClick}&gt;按钮{count}&lt;/button&gt;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>function App() {</span></span>
<span class="line"><span>  const [count, setCount] = useState(0) // count是一个状态变量，setCount是一个函数，用于更新count的值</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;&gt;</span></span>
<span class="line"><span>      &lt;div className=&quot;App&quot;&gt;</span></span>
<span class="line"><span>        &lt;Button count={count} onClick={() =&gt; setCount(count + 1)} /&gt;      &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;/&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 响应式对象的实现，不能直接更改对象的属性，需要调用对应的修改方法，在方法中解构对象，再添加需要修改的内容</span></span>
<span class="line"><span>const [obj, setobj] = useState(</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    name: &#39;小明&#39;,</span></span>
<span class="line"><span>    age: 18,</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>const fun = () =&gt; {</span></span>
<span class="line"><span>  setobj({</span></span>
<span class="line"><span>    ...obj,</span></span>
<span class="line"><span>    age: obj.age + 1</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>return (</span></span>
<span class="line"><span>  &lt;&gt;</span></span>
<span class="line"><span>    &lt;div className=&quot;App&quot;&gt;</span></span>
<span class="line"><span>      &lt;div&gt;</span></span>
<span class="line"><span>        {obj.name}+{obj.age}</span></span>
<span class="line"><span>      &lt;/div&gt;   </span></span>
<span class="line"><span>      &lt;button onClick={fun}&gt;点击&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  &lt;/&gt;</span></span>
<span class="line"><span>)</span></span></code></pre></div><h2 id="样式引入" tabindex="-1">样式引入 <a class="header-anchor" href="#样式引入" aria-label="Permalink to &quot;样式引入&quot;">​</a></h2><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 1.行内样式</span></span>
<span class="line"><span>function App() {</span></span>
<span class="line"><span>  const style = {</span></span>
<span class="line"><span>    color: &#39;red&#39;,</span></span>
<span class="line"><span>    fontSize: &#39;30px&#39;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;&gt;</span></span>
<span class="line"><span>      &lt;div className=&quot;App&quot;&gt;</span></span>
<span class="line"><span>        &lt;div style={style}&gt;test&lt;/div&gt;</span></span>
<span class="line"><span>      &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;/&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 2.外部引入</span></span>
<span class="line"><span>// style.css</span></span>
<span class="line"><span>.foo{</span></span>
<span class="line"><span>    background-color: red;</span></span>
<span class="line"><span>    font-size: 30px;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// app</span></span>
<span class="line"><span>import &#39;./test.css&#39;</span></span>
<span class="line"><span>function App() {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;&gt;</span></span>
<span class="line"><span>      &lt;div className=&quot;App&quot;&gt;</span></span>
<span class="line"><span>        &lt;div className=&#39;foo&#39;&gt;test&lt;/div&gt; {/*通过css文件引入的样式，使用className对应文件中的类名*/}</span></span>
<span class="line"><span>      &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;/&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 动态绑定类名,可以使用模板字符串，或下载classNames包</span></span>
<span class="line"><span>&lt;div className = {\`static-class \${active === isActive &amp;&amp; &#39;active-class&#39;}\`}&gt;&lt;/div&gt;</span></span></code></pre></div><h2 id="表单的双向绑定" tabindex="-1">表单的双向绑定 <a class="header-anchor" href="#表单的双向绑定" aria-label="Permalink to &quot;表单的双向绑定&quot;">​</a></h2><p>类似vue中的v-model</p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const [value, setValue] = useState(&#39;&#39;)</span></span>
<span class="line"><span>return (</span></span>
<span class="line"><span>  &lt;&gt;</span></span>
<span class="line"><span>    &lt;div className=&quot;App&quot;&gt;</span></span>
<span class="line"><span>      &lt;input</span></span>
<span class="line"><span>        type=&quot;text&quot;</span></span>
<span class="line"><span>        value={value} /* 获取数据 */</span></span>
<span class="line"><span>        onChange={(e) =&gt; setValue(e.target.value)} /* 修改数据 */</span></span>
<span class="line"><span>      &gt;&lt;/input&gt;</span></span>
<span class="line"><span>      &lt;div&gt;result:{value}&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  &lt;/&gt;</span></span>
<span class="line"><span>)</span></span></code></pre></div><h2 id="获取dom" tabindex="-1">获取dom <a class="header-anchor" href="#获取dom" aria-label="Permalink to &quot;获取dom&quot;">​</a></h2><p>和vue中获取dom对象一样</p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function App() {</span></span>
<span class="line"><span>  const inputRef = useRef(null) // 先绑定一个空的ref</span></span>
<span class="line"><span>  const showDom = () =&gt; {</span></span>
<span class="line"><span>    console.log(inputRef.current) // 通过current属性获取DOM元素</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;&gt;</span></span>
<span class="line"><span>      &lt;input type=&quot;text&quot; ref={inputRef}&gt; {/* 绑定ref */}</span></span>
<span class="line"><span>      &lt;/input&gt;</span></span>
<span class="line"><span>      &lt;button onClick={showDom}&gt;Show DOM&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="组件间通信" tabindex="-1">组件间通信 <a class="header-anchor" href="#组件间通信" aria-label="Permalink to &quot;组件间通信&quot;">​</a></h2><p>父子通信，类似vue中的props</p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function Son(props) {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;span&gt;子组件&lt;/span&gt;</span></span>
<span class="line"><span>      &lt;div&gt;{props.content}&lt;/div&gt; {/* props是一个对象，里面存储所有父组件传入的键值对，子组件只能读取无法修改 */}</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// App相当于父组件</span></span>
<span class="line"><span>function App() {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;&gt;</span></span>
<span class="line"><span>      &lt;Son content=&quot;父组件传入&quot;&gt; {/* 传入子组件 */}</span></span>
<span class="line"><span>    &lt;/Son&gt;</span></span>
<span class="line"><span>    &lt;/&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 可以在子组件标签中传入标签或数据，子组件都可以通过props.children获得</span></span>
<span class="line"><span>&lt;Son content=&quot;父组件传入&quot;&gt; </span></span>
<span class="line"><span>{data}</span></span>
<span class="line"><span>&lt;span&gt;父组件传入的值&lt;/span&gt;</span></span>
<span class="line"><span>&lt;/Son&gt;</span></span></code></pre></div><p>子传父，通过父组件传入方法，调用后返回</p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function Son(props) {</span></span>
<span class="line"><span>  const {func} = props // 解构出函数</span></span>
<span class="line"><span>  func(&quot;子组件传递过来的数据&quot;)  // 调用函数传值</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;子组件&lt;/div&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// App相当于父组件</span></span>
<span class="line"><span>function App() {</span></span>
<span class="line"><span>  const [data, setData] = useState(&#39;&#39;)</span></span>
<span class="line"><span>  const getData = (msg)=&gt; {</span></span>
<span class="line"><span>    setData(msg)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;&gt;</span></span>
<span class="line"><span>    &lt;Son func={getData}&gt; {/* 传递函数 */}</span></span>
<span class="line"><span>    &lt;/Son&gt;</span></span>
<span class="line"><span>    &lt;div&gt;输出:{data}&lt;/div&gt; </span></span>
<span class="line"><span>    &lt;/&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>兄弟组件通信，通过父组件传递信息(状态提升)</p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function SonA(props) {</span></span>
<span class="line"><span>  const data = &quot;AtoB&quot; // A组件要传递给B组件的数据</span></span>
<span class="line"><span>  const {func} = props // 解构出函数</span></span>
<span class="line"><span>  func(data)  // 调用函数传值</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;子组件A&lt;/div&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function SonB(props) {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;&gt;</span></span>
<span class="line"><span>    &lt;div&gt;子组件B&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div&gt;子组件B接收到的数据:{props.data}&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;/&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function App() {</span></span>
<span class="line"><span>  const [data, setData] = useState(&#39;&#39;)</span></span>
<span class="line"><span>  const getData = (msg)=&gt; {</span></span>
<span class="line"><span>    setData(msg)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;&gt;</span></span>
<span class="line"><span>    &lt;SonA func={getData}/&gt;  {/* 传递函数给子组件A,用于接受A传递给B的数据 */}</span></span>
<span class="line"><span>    &lt;SonB data={data}/&gt;  {/* 传递数据给子组件B */}</span></span>
<span class="line"><span>    &lt;/&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>祖孙组件之间的通信，类似vue中的provide/inject</p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const DataContext = createContext(null) // 在全局创建一个上下文对象</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function A(props) {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;&gt;</span></span>
<span class="line"><span>    &lt;B&gt;&lt;/B&gt;</span></span>
<span class="line"><span>    &lt;/&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function B(){</span></span>
<span class="line"><span>  const data = useContext(DataContext) // 使用上下文数据,使用data可以接收到数据</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>  &lt;div&gt;这里是B组件，获取到的上下文数据是：{data}&lt;/div&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>function App() {</span></span>
<span class="line"><span>  const [data, setData] = useState(&#39;父组件数据&#39;) // 定义一个状态变量data</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;&gt;</span></span>
<span class="line"><span>    &lt;input value={data} onInput={(e)=&gt;setData(e.target.value)}&gt;&lt;/input&gt;</span></span>
<span class="line"><span>    &lt;DataContext.Provider value={data}&gt; {/* 使用value提供上下文数据 */}</span></span>
<span class="line"><span>    &lt;A&gt;&lt;/A&gt;  {/* 这里的所有组件都可以通过DataContext获取到父组件的data数据 */}</span></span>
<span class="line"><span>    &lt;/DataContext.Provider&gt;</span></span>
<span class="line"><span>    &lt;/&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="useeffect" tabindex="-1">useEffect <a class="header-anchor" href="#useeffect" aria-label="Permalink to &quot;useEffect&quot;">​</a></h2><p>一般用于渲染完成或依赖数据更新之后所进行的操作</p><p>useEffect(执行的函数，依赖项)</p><p>依赖项有三种情况:</p><ul><li>为空。useEffect中的函数会在组件渲染完成后执行一次，当组件中的响应式数据发生变更后再执行一次</li><li>为空数组[]。useEffect中的函数会在组件渲染完成后执行一次</li><li>为[<strong>name</strong>]。useEffect中的函数会在组件渲染完成后执行一次，当<strong>name</strong>变更后再执行一次（name为定义的响应式变量）</li></ul><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const url = &quot;http://geek.itheima.net/v1_0/channels&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function App() {</span></span>
<span class="line"><span>  const [list, setList] = useState([]) // 定义一个状态变量data</span></span>
<span class="line"><span>  useEffect(() =&gt; {</span></span>
<span class="line"><span>    async function getList(url) {  // 异步函数需要写在useEffect内部，否则会报错（无法使用第一个参数直接调用函数，因为异步函数的返回值是Promise）</span></span>
<span class="line"><span>      const res = await fetch(url)</span></span>
<span class="line"><span>      const data = await res.json()  // fetch返回的是一个Stream流，需要序列化</span></span>
<span class="line"><span>      return data</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    getList(url).then(data =&gt; {</span></span>
<span class="line"><span>      const res = data.data.channels</span></span>
<span class="line"><span>      setList(res)</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  , [])</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;&gt;</span></span>
<span class="line"><span>    &lt;ul&gt;</span></span>
<span class="line"><span>      {list &amp;&amp; list.map((item) =&gt; {</span></span>
<span class="line"><span>        return (</span></span>
<span class="line"><span>          &lt;li key={item.id}&gt;</span></span>
<span class="line"><span>            &lt;h3&gt;{item.name}&lt;/h3&gt;</span></span>
<span class="line"><span>          &lt;/li&gt;</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>      })}</span></span>
<span class="line"><span>    &lt;/ul&gt;</span></span>
<span class="line"><span>    &lt;/&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在useEffect中编写函数，一般被称作副作用函数，对于异步函数而言，如果没有清除副作用函数则会继续执行，所以需要编写清理函数，如清空定时器，取消网络请求等</p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 如何清除副作用函数：在首个函数参数内，加入return ()=&gt;{清除逻辑}</span></span>
<span class="line"><span>useEffect(()=&gt;{</span></span>
<span class="line"><span>    const timer = setInterval(()=&gt;{</span></span>
<span class="line"><span>        console.log(&quot;--执行中--&quot;)</span></span>
<span class="line"><span>    },1000)</span></span>
<span class="line"><span>    return ()=&gt;{clearInterval(timer)}</span></span>
<span class="line"><span>})</span></span></code></pre></div><h2 id="自定义hook" tabindex="-1">自定义Hook <a class="header-anchor" href="#自定义hook" aria-label="Permalink to &quot;自定义Hook&quot;">​</a></h2><p>用来将可复用的代码包装起来</p><p>封装自定义hook的通用思路</p><ol><li>声明一个名称以use开头的函数</li><li>在函数内部封装可以复用的逻辑</li><li>将组件中用到的状态和函数return出去</li><li>在哪个组件中需要用到封装的逻辑，就通过解构，将状态和函数获得并使用</li></ol><p>hook(use*)的使用规则：</p><ul><li>只能在组件中或其他自定义Hook函数中使用</li><li>只能在组件的顶层进行调用，无法嵌套在if、for、内部函数中</li></ul><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 示例</span></span>
<span class="line"><span>function useToggle(){</span></span>
<span class="line"><span>  const [value, setValue] = useState(true)</span></span>
<span class="line"><span>  const toggle = () =&gt; {</span></span>
<span class="line"><span>    setValue(!value)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return { value, toggle } // 将状态和函数返回</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function App() {</span></span>
<span class="line"><span>  const { value, toggle } = useToggle() // 解构对象</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;&gt;</span></span>
<span class="line"><span>      &lt;div&gt;</span></span>
<span class="line"><span>        {value &amp;&amp; &lt;h1&gt;hello&lt;/h1&gt;}</span></span>
<span class="line"><span>        &lt;button onClick={toggle}&gt;Toggle&lt;/button&gt;</span></span>
<span class="line"><span>      &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;/&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="usememo" tabindex="-1">useMemo <a class="header-anchor" href="#usememo" aria-label="Permalink to &quot;useMemo&quot;">​</a></h2><p>计算属性</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 第一个参数是计算函数，需要返回计算后的值；第二个参数则是依赖项，即当依赖项变更后再重新计算</span></span>
<span class="line"><span>useMemo(func, dependencies)</span></span></code></pre></div><h1 id="redux" tabindex="-1">Redux <a class="header-anchor" href="#redux" aria-label="Permalink to &quot;Redux&quot;">​</a></h1><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 1. 定义 reducer 函数 </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 根据不同的 action 对象，返回不同的 state</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// state 管理数据的初始状态</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// action 对象的 type 属性标记需要做的修改操作</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> state</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { count: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> reducer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">state</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">action</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  switch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (action.type) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    case</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;INCREMENT&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 必须返回一个新的对象，Redux不允许在原有state上进行修改，Redux会绑定到新对象上去</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { count: state.count </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    case</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;DECREMENT&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { count: state.count </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> state</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 2. 使用reducer函数生成store实例,整个应用一般就一个store实例</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> store</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Redux.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">createStore</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(reducer)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 3. 通过 store 实例的 subscribe 订阅数据变化</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 回调函数在每一次 state 发生变化时自动执行</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">store.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">subscribe</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(store.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getState</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 会返回当前的store对象</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getElementById</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;count&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).innerText </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> store.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getState</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().count</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 4. 通过 store 的 dispatch 函数提交 action 的更改状态</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> inBtn</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getElementById</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;increment&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">inBtn.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;click&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 匹配的是 action 对象，所以传入 action 对象</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  store.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dispatch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    type: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;INCREMENT&#39;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> //一般必须要有type属性，也可以传递其他信息</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 减</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> dBtn</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getElementById</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;decrement&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dBtn.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;click&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  store.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dispatch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    type: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;DECREMENT&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><h2 id="react-redux" tabindex="-1">React-redux <a class="header-anchor" href="#react-redux" aria-label="Permalink to &quot;React-redux&quot;">​</a></h2><p>首先需要安装@reduxjs/toolkit和redux</p><p>操作逻辑如下</p><p>注:actions.payload就是图四调用中传入的参数</p><p><img src="`+h+`" alt=""></p><p>由于Redux自身只支持同步actions的操作，如果想使用异步actions，就必须要引入redux-thunk，这是一个中间件，用于拦截actions-&gt;state，可以在内部添加复杂逻辑。</p><p>redux-thunk会检测到返回的是函数，并自动执行它，传入 <code>dispatch</code> 和 <code>getState</code>两个函数。如果传递的是普通对象，redux-thunk不会进行额外操作。</p><p>写法如下</p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 这是一个异步的actions</span></span>
<span class="line"><span>const fetchFoodList = () =&gt; {</span></span>
<span class="line"><span>	// 返回一个异步的函数</span></span>
<span class="line"><span>    return async(dispatch) =&gt; {</span></span>
<span class="line"><span>        const response = await axios.get(&quot;http://localhost:3004/takeaway&quot;)</span></span>
<span class="line"><span>        // console.log(response.data)</span></span>
<span class="line"><span>        dispatch(setFoodList(response.data))</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 通过调用该函数实现actions操作</span></span>
<span class="line"><span>export {fetchFoodList}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 外界调用dispatch(fetchFoodList()),redux-thunk会检测dispatch的参数，发现是函数，于是自动执行它，传入 dispatch 和 getState</span></span></code></pre></div><h1 id="react-router" tabindex="-1">React-router <a class="header-anchor" href="#react-router" aria-label="Permalink to &quot;React-router&quot;">​</a></h1><p>相关包名为react-router-dom</p><h2 id="路由模块声明" tabindex="-1">路由模块声明 <a class="header-anchor" href="#路由模块声明" aria-label="Permalink to &quot;路由模块声明&quot;">​</a></h2><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 引入包</span></span>
<span class="line"><span>import {createBrowserRouter,RouterProvider} from &#39;react-router-dom&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 创建路由</span></span>
<span class="line"><span>const router = createBrowserRouter([</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    path: &quot;/&quot;,</span></span>
<span class="line"><span>    element: &lt;App /&gt;,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  {path: &quot;/about&quot;,</span></span>
<span class="line"><span>    element: &lt;div&gt;About&lt;/div&gt;,</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>])</span></span>
<span class="line"><span></span></span>
<span class="line"><span>createRoot(document.getElementById(&#39;root&#39;)).render(</span></span>
<span class="line"><span>  &lt;StrictMode&gt;</span></span>
<span class="line"><span>    {/*传递路由*/}</span></span>
<span class="line"><span>    &lt;RouterProvider router={router} /&gt;</span></span>
<span class="line"><span>  &lt;/StrictMode&gt;,</span></span>
<span class="line"><span>)</span></span></code></pre></div><h2 id="路由导航" tabindex="-1">路由导航 <a class="header-anchor" href="#路由导航" aria-label="Permalink to &quot;路由导航&quot;">​</a></h2><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { Link,useNavigate } from &quot;react-router-dom&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const About = () =&gt; {</span></span>
<span class="line"><span>    const navigate = useNavigate() </span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>        &lt;div&gt;</span></span>
<span class="line"><span>        &lt;h1&gt;About&lt;/h1&gt;</span></span>
<span class="line"><span>        &lt;p&gt;This is the about page.&lt;/p&gt;</span></span>
<span class="line"><span>        {/*声明式导航,使用自带的Link标签，react会解析成a标签*/}</span></span>
<span class="line"><span>        &lt;Link to=&quot;/contact&quot;&gt;联系我们&lt;/Link&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        {/*编程式导航，使用useNavigate钩子*/}</span></span>
<span class="line"><span>        &lt;button onClick={() =&gt; navigate(&quot;/contact&quot;)}&gt;</span></span>
<span class="line"><span>            联系我们</span></span>
<span class="line"><span>        &lt;/button&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default About</span></span></code></pre></div><h2 id="路由传参" tabindex="-1">路由传参 <a class="header-anchor" href="#路由传参" aria-label="Permalink to &quot;路由传参&quot;">​</a></h2><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{/*searchParams传参,通过在?后拼接kv，使用&amp;区分*/}</span></span>
<span class="line"><span>&lt;button onClick={() =&gt; navigate(&quot;/contact?id=1&amp;name=john&quot;)}&gt;</span></span>
<span class="line"><span>searchParams传参</span></span>
<span class="line"><span>&lt;/button&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{/*使用useSearchParams钩子接受参数*/}</span></span>
<span class="line"><span>const [params] = useSearchParams() // 返回的是数组，先解构</span></span>
<span class="line"><span>const name = params.get(&#39;name&#39;) // 通过get方法</span></span></code></pre></div><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{/*Params传参*/}</span></span>
<span class="line"><span>&lt;button onClick={() =&gt; navigate(&quot;/contact/1/john&quot;)}&gt;</span></span>
<span class="line"><span>Params传参</span></span>
<span class="line"><span>&lt;/button&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 需要在路由处配置</span></span>
<span class="line"><span>const router = createBrowserRouter([</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    path: &quot;/contact/:id/:name&quot;, // 配置接受的参数</span></span>
<span class="line"><span>    element: &lt;Contact/&gt;,</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>])</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{/*使用useParams钩子接受参数*/}</span></span>
<span class="line"><span>const params = useParams() // 返回的是对象</span></span>
<span class="line"><span>const name = params.name   // 直接访问对象属性即可</span></span></code></pre></div><h2 id="嵌套路由" tabindex="-1">嵌套路由 <a class="header-anchor" href="#嵌套路由" aria-label="Permalink to &quot;嵌套路由&quot;">​</a></h2>`,74)),c("p",null,[s[0]||(s[0]=a("通过在路由中配置Children实现子路由，然后再在主路由中配置")),o(p),s[1]||(s[1]=a(",该标签会将对应的路由组件渲染到该标签内"))]),s[3]||(s[3]=n(`<div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 创建路由</span></span>
<span class="line"><span>const router = createBrowserRouter([</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    path: &quot;/&quot;,</span></span>
<span class="line"><span>    element: &lt;App&gt;&lt;/App&gt;,</span></span>
<span class="line"><span>    children: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        path: &quot;/about&quot;,</span></span>
<span class="line"><span>        element: &lt;About&gt;&lt;/About&gt;,</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        path: &quot;/contact&quot;,</span></span>
<span class="line"><span>        element: &lt;Contact&gt;&lt;/Contact&gt;,</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// &lt;Outlet&gt;</span></span>
<span class="line"><span>&lt;Link to=&quot;/about&quot;&gt;关于我们&lt;/Link&gt;</span></span>
<span class="line"><span>&lt;Link to=&quot;/contact&quot;&gt;联系我们&lt;/Link&gt;</span></span>
<span class="line"><span>&lt;Outlet&gt;&lt;/Outlet&gt; //会根据点击跳转的路由，渲染对应的组件</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>子路由如果需要直接渲染（而不是通过路由跳转），需要把path去掉，换成index:true。这样的话路由会直接渲染到&lt;Outlet&gt;中</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 404路由</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`react</span></span>
<span class="line"><span>const router = createBrowserRouter([</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  { </span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  // 末尾添加</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>  	path:&#39;*&#39;, //找不到路由信息的会走该路由</span></span>
<span class="line"><span>  	element:&lt;NotFound /&gt;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>]);</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 路由模式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`createBrowserRouter\` 对应的是history模式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`createHashRouter\` 对应的是hash模式</span></span></code></pre></div>`,1))])}const m=l(r,[["render",d]]);export{y as __pageData,m as default};
