# Vue

## SPA 是如何实现

是利用了url中的hash特点(页面不会刷新)，原来的hash值是作为页面的锚实现快速定位的。SPA通过监听hash值的变化(触发hashChange事件)，解析hash的新值对应的路由，通过js隐藏当前页面，显示hash值对应的路由并请求数据。

当然，SPA也可以使用history模式，它通过 history.pushState() 或 history.replaceState() 方法，直接修改 URL 的 “路径部分”。不过此时后端不知道前端路由已经发生了变化，如果直接输入非入口的html，且后端没有做配置的话，会返回404

## computed和watch区别

**对于Computed：**

- 它支持缓存(通过**dirty**，也就是flag实现，依赖发生变化时会将dirty置为true)，只有依赖的数据发生了变化，才会重新计算
- 不支持异步，当Computed中有异步操作时，无法监听数据的变化
- computed的值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data声明过，或者父组件传递过来的props中的数据进行计算的。
- 如果一个属性是由其他属性计算而来的，这个属性依赖其他的属性，一般会使用computed
- 如果computed属性的属性值是函数，那么默认使用get方法，函数的返回值就是属性的属性值；在computed中，属性有一个get方法和一个set方法，当数据发生变化时，会调用set方法。

**对于Watch：**

- 它不支持缓存，数据变化时，它就会触发相应的操作
- 支持异步监听
- 监听的函数接收两个参数，第一个参数是最新的值，第二个是变化之前的值
- 当一个属性发生变化时，就需要执行相应的操作
- 监听数据必须是data中声明的或者父组件传递过来的props中的数据，当发生变化时，会触发其他操作，函数有两个的参数：

- - immediate：组件加载立即触发回调函数
  - deep：深度监听，发现数据内部的变化，在复杂数据类型中使用，例如数组中的对象发生变化。需要注意的是，deep无法监听到数组和对象内部的变化。

当想要执行异步或者昂贵的操作以响应不断的变化时，就需要使用watch。

**总结：**

- computed 计算属性 : 依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值。 
- watch 侦听器 : 更多的是**观察**的作用，**无缓存性**，类似于某些数据的监听回调，每当监听的数据变化时都会执行回调进行后续操作。 

## v-if和v-show的区别

- **手段**：v-if是动态的向DOM树内添加或者删除DOM元素；v-show是通过设置DOM元素的display样式属性控制显隐；
- **编译过程**：v-if切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；v-show只是简单的基于css切换；
- **编译条件**：v-if是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译; v-show是在任何条件下，无论首次条件是否为真，都被编译，然后被缓存，而且DOM元素保留；
- **性能消耗**：v-if有更高的切换消耗；v-show有更高的初始渲染消耗；
- **使用场景**：v-if适合运营条件不大可能改变；v-show适合频繁切换。

## v-model 是如何实现的，语法糖实际是什么

本质上是一个两个功能的语法糖

```js
:modelValue="foo"
@update:modelValue="$event => (foo = $event)"
```

多用在表单中，如果用在父子组件中，需要在子组件中使用props和emit来触发父组件的修改

```js
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
```

vue3.4中添加了一个新的语法糖，defineModel()可用在子组件中，替代上面的两个操作

```js
// 第一个参数对应父组件中v-model:title,第二个可以进行配置，如required,default等
const title = defineModel('title', { required: true })
```

## keep-alive

`<keep-alive>`标签用于将标签内的组件缓存起来

缓存对应的周期是onActivated()和onDeactivated() ，但会少beforeDestroy 和 destroyed 两个钩子，因为组件不会被销毁

keep-alive有以下三个属性：

- include 字符串（逗号分割），只有名称匹配的组件会被匹配；
- exclude 字符串（逗号分割），任何名称匹配的组件都不会被缓存；
- max 数字，最多可以缓存多少组件实例，采用最近最久未使用LRU算法。

## nextTick()

在以下情况下，会用到nextTick：

- 在数据变化后执行的某个操作，而这个操作需要使用随数据变化而变化的DOM结构的时候，这个操作就需要方法在`nextTick()`的回调函数中。
- 在vue生命周期中，如果在created()钩子进行DOM操作，也一定要放在`nextTick()`的回调函数中。因为在created()钩子函数中，页面的DOM还未渲染，这时候也没办法操作DOM，所以，此时如果想要操作DOM，必须将操作的代码放在`nextTick()`的回调函数中。

$nextTick使用事件循环的原理来实现在视图渲染完成后执行所有回调函数的功能。

而且，为在视图渲染完成后尽快执行回调，$nextTick根据浏览器的兼容性来渲染执行异步任务的方法，先检查是否能使用微任务（Promise, MutationObserver），不行的话则使用宏任务（setImmediate, setTimeout）。

## vue中template到render的过程

首先通过parse方法将template转换成ast（抽象语法树）

深度遍历AST，查看每个子树的节点元素是否为静态节点或者静态节点根（即不依赖响应式数据）。如果为静态节点，他们生成的DOM永远不会改变，这对运行时模板更新起到了极大的优化作用。

最后将ast转换成js代码（先转成render函数的参数，再使用render函数进行渲染）

## vue中的单项数据流

子组件不可以直接改变父组件的数据。这样做主要是为了维护父子组件的**单向数据流**。每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。如果这样做了，Vue 会在浏览器的控制台中发出警告。

Vue提倡单向数据流，即父级 props 的更新会流向子组件，但是反过来则不行。这是为了防止意外的改变父组件状态，使得应用的数据流变得难以理解，导致数据流混乱。如果破坏了单向数据流，当应用复杂时，debug 的成本会非常高。

**只能通过** `$emit` **派发一个自定义事件，父组件接收到后，由父组件修改。**

## assets和static的区别

**相同点：** `assets` 和 `static` 两个都是存放静态资源文件。项目中所需要的资源文件图片，字体图标，样式文件等都可以放在这两个文件下，这是相同点

**不相同点：**`assets` 中存放的静态资源文件在项目打包时，也就是运行 `npm run build` 时会将 `assets` 中放置的静态资源文件进行打包上传，所谓打包简单点可以理解为压缩体积，代码格式化。而压缩后的静态资源文件最终也都会放置在 `static` 文件中跟着 `index.html` 一同上传至服务器。`static` 中放置的静态资源文件就不会要走打包压缩格式化等流程，而是直接进入打包好的目录，直接上传至服务器。因为避免了压缩直接进行上传，在打包时会提高一定的效率，但是 `static` 中的资源文件由于没有进行压缩等操作，所以文件的体积也就相对于 `assets` 中打包后的文件提交较大点。在服务器中就会占据更大的空间。

**建议：** 将项目中 `template`需要的样式文件js文件等都可以放置在 `assets` 中，走打包这一流程。减少体积。而项目中引入的第三方的资源文件如`iconfoont.css` 等文件可以放置在 `static` 中，因为这些引入的第三方文件已经经过处理，不再需要处理，直接上传。

打包会重新命名资源，可能会导致相对路径的引用出现问题。一般static中的数据使用绝对路径，assets中的使用相对路径

## vue中常用的性能优化

1.路由懒加载。import是异步加载，然后打包工具会分辨import，使其成为独立的包。

```js
// 使用ES6中的动态导入
const Home = () => import('./views/Home.vue')
const About = () => import('./views/About.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

// 直接使用
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('./views/About.vue')
  }
]
```

2. 图片懒加载

可以使用库vue-lazyload

原理是监控图片是否出现在可视区域内，如果没有出现，则使用一个默认图片进行占位，如果出现则引入图片

```
// 监视图片是否出现在可视区域内
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// 监听滚动事件
window.addEventListener('scroll', throttle(checkImages, 200));
```

3. 防抖和节流

防抖：仅在停止触发后执行一次

节流：固定时间间隔执行一次

4. keep-alive
5. v-show复用组件
6. 组件按需导入

## vue的生命周期

vue3中的生命周期：setup, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onActivated, onDeactivated.

vue2有两个钩子对应setup：beforeCreate和created。（vue2的生命周期钩子函数中没有on）

## Vue 子组件和父组件执行顺序

从外到内，再从内到外（before操作外->内，ed操作内到外）

**加载渲染过程：**

1. 父组件 beforeCreate
2. 父组件 created
3. 父组件 beforeMount
4. 子组件 beforeCreate
5. 子组件 created
6. 子组件 beforeMount
7. 子组件 mounted
8. 父组件 mounted

**更新过程：**

1. 父组件 beforeUpdate
2. 子组件 beforeUpdate
3. 子组件 updated
4. 父组件 updated

**销毁过程：**

1. 父组件 beforeDestroy
2. 子组件 beforeDestroy
3. 子组件 destroyed
4. 父组件 destoryed

## 路由中的hash和history区别

Vue-Router有两种模式：**hash模式**和**history模式**。默认的路由模式是hash模式。

#### 1. hash模式

**简介：** hash模式是开发中默认的模式，它的URL带着一个#，例如：http://www.abc.com/#/vue，它的hash值就是`#/vue`。

**特点**：hash值会出现在URL里面，但是不会出现在HTTP请求中，对后端完全没有影响。所以改变hash值，不会重新加载页面。这种模式的浏览器支持度很好，低版本的IE浏览器也支持这种模式。hash路由被称为是前端路由，已经成为SPA（单页面应用）的标配。

**原理：** hash模式的主要原理就是**onhashchange()事件**：

```javascript
window.onhashchange = function(event){
	console.log(event.oldURL, event.newURL);
	let hash = location.hash.slice(1);
}
```

使用onhashchange()事件的好处就是，在页面的hash值发生变化时，无需向后端发起请求，window就可以监听事件的改变，并按规则加载相应的代码。除此之外，hash值变化对应的URL都会被浏览器记录下来，这样浏览器就能实现页面的前进和后退。虽然是没有请求后端服务器，但是页面的hash值和对应的URL关联起来了。

#### 2. history模式

**简介：** history模式的URL中没有#，它使用的是传统的路由分发模式，即用户在输入一个URL时，服务器会接收这个请求，并解析这个URL，然后做出相应的逻辑处理。

**特点：** 当使用history模式时，URL就像这样：http://abc.com/user/id。相比hash模式更加好看。但是，history模式需要后台配置支持。如果后台没有正确配置，访问时会返回404。

**API：** history api可以分为两大部分，切换历史状态和修改历史状态：

- **修改历史状态**：包括了 HTML5 History Interface 中新增的 `pushState()` 和 `replaceState()` 方法，这两个方法应用于浏览器的历史记录栈，提供了对历史记录进行修改的功能。只是当他们进行修改时，虽然修改了url，但浏览器不会立即向后端发送请求。如果要做到改变url但又不刷新页面的效果，就需要前端用上这两个API。
- **切换历史状态：** 包括`forward()`、`back()`、`go()`三个方法，对应浏览器的前进，后退，跳转操作。

虽然history模式丢弃了丑陋的#。但是，它也有自己的缺点，就是在刷新页面的时候，如果没有相应的路由或资源，就会刷出404来。

如果想要切换到history模式，就要进行以下配置（后端也要进行配置）：

```javascript
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

#### 3. 两种模式对比

调用 history.pushState() 相比于直接修改 hash，存在以下优势:

- pushState() 设置的新 URL 可以是与当前 URL 同源的任意 URL；而 hash 只可修改 # 后面的部分，因此只能设置与当前 URL 同文档的 URL；
- pushState() 设置的新 URL 可以与当前 URL 一模一样，这样也会把记录添加到栈中；而 hash 设置的新值必须与原来不一样才会触发动作将记录添加到栈中；
- pushState() 通过 stateObject 参数可以添加任意类型的数据到记录中；而 hash 只可添加短字符串；
- pushState() 可额外设置 title 属性供后续使用。
- hash模式下，仅hash符号之前的url会被包含在请求中，后端如果没有做到对路由的全覆盖，也不会返回404错误；history模式下，前端的url必须和实际向后端发起请求的url一致，如果没有对用的路由处理，将返回404错误。

vue-router的实现也是基于以上两种模式，通过调整hash值或者pushstate，遍历路由表中符合的路由，将组件渲染到router-view中，从而实现SPA的跳转。

## Vue-router跳转和location.href有什么区别

- 使用 `location.href= /url `来跳转，简单方便，但是刷新了页面；
- 使用 `history.pushState( /url )` ，无刷新页面，静态跳转；
- 引进 router ，然后使用 `router.push( /url )` 来跳转，使用了 `diff` 算法，实现了按需加载，减少了 dom 的消耗。还会走路由守卫，传参等步骤

## params传参和query传参的区别

params传参, 必须在路由中配置才能在$route.params中获得

```js
// 路由配置（?表示:id 可选，如果没有则必传）
{
  path: '/user/:id?',  // :id 后面的 ? 表示可选
  name: 'User'
}

// 有效导航方式
router.push({ name: 'User', params: { id: 123 } });  // URL: /user/123
router.push('/user/123');                            // 等效
router.push({ name: 'User' });                      // URL: /user（params.id 为 undefined）
```

query传参，直接在路径后拼接?xxx=xx&xxx=xx。也可以在router.push中添加query对象

## Vuex

#### 1 **State（状态）**

- 应用的数据源，类似于组件中的 `data`。
- 所有组件共享的状态存储。

#### 2 **Mutations（突变）**

- 更改 state 的唯一途径，类似于组件中的 `methods`。
- 必须是同步函数。

#### 3 **Actions（动作）**

- 处理异步操作（如 API 请求）。
- 通过触发 mutations 间接修改 state。
- 每个 action 都会接收一个 **context 对象**，它包含以下属性：
  - `state`：当前模块的 state（等同于 `store.state`）
  - `getters`：当前模块的 getters（等同于 `store.getters`）
  - `commit`：用于触发 mutations 的方法（等同于 `store.commit`）
  - `dispatch`：用于触发其他 actions 的方法（等同于 `store.dispatch`）

#### 4 **Getters（获取器）**

- 类似于组件中的 `computed`，用于获取 state 的派生数据。

```js
// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    user: null
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async fetchUser({ commit }) { 
      const response = await fetch('/api/user');
      const user = await response.json();
      commit('setUser', user);  // 触发 mutation
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    }
  }
});
```

```js
// 如何使用
<template>
  <div>
    Count: {{ $store.state.count }}
  </div>
</template>

<script>
export default {
  computed: {
    // 使用计算属性映射 state
    count() {
      return this.$store.state.count; // 使用state
    }
  }
}
</script>
// -------------------------------------------------------------------
<template>
  <button @click="increment">+1</button>
</template>

<script>
export default {
  methods: {
    increment() {
      this.$store.commit('increment');  // 触发 mutation，只支持同步操作，异步操作需要通过actions实现
    }
  }
}
</script>
// -------------------------------------------------------------------
<template>
  <button @click="fetchUser">获取用户</button>
</template>

<script>
export default {
  methods: {
    async fetchUser() {
      await this.$store.dispatch('fetchUser');  // 触发 action
    }
  }
}
</script>
// -------------------------------------------------------------------
<template>
  <div>
    Double Count: {{ doubleCount }}
  </div>
</template>

<script>
export default {
  computed: {
    doubleCount() {
      return this.$store.getters.doubleCount;  // 获取 getter
    }
  }
}
</script>
```

##  Vuex 和 localStorage 的区别

**（1）最重要的区别**

- vuex存储在内存中
- localstorage 则以文件的方式存储在本地，只能存储字符串类型的数据，存储对象需要 JSON的stringify和parse方法进行处理。 读取内存比读取硬盘速度要快

**（2）应用场景**

- Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。vuex用于组件之间的传值。
- localstorage是本地存储，是将数据存储到浏览器的方法，一般是在跨页面传递数据时使用 。
- Vuex能做到数据的响应式，localstorage不能

**（3）永久性**

刷新页面时vuex存储的值会丢失（因为值存储在内存中，页面刷新时会充值vue实例和store），localstorage不会。建议vuex在state中的值发生变化的时候，将值存储到localstorage中，并在store初始化中，通过actions检测值是否存在并恢复。

## vue3相较于vue2的变化

使用es6的proxy替换了Object.defineProperty()，使得可以检测对象的修改和删除(vue2需要通过vue.set,vue.delete)

vue3可以使用组合式声明，对ts的支持也更好。vue2只能使用函数式声明

## 虚拟dom

从本质上来说，Virtual Dom是一个JavaScript对象，通过对象的方式来表示DOM结构。将页面的状态抽象为JS对象的形式，配合不同的渲染工具，使跨平台渲染成为可能。通过事务处理机制，将多次DOM修改的结果一次性的更新到页面上，从而有效的减少页面渲染的次数，减少修改DOM的重绘重排次数，提高渲染性能。

## diff算法原理

在新老虚拟DOM对比时：

- 首先，对比节点本身，判断是否为同一节点，如果不为相同节点，则删除该节点重新创建节点进行替换
- 如果为相同节点，进行patchVnode，判断如何对该节点的子节点进行处理，先判断一方有子节点一方没有子节点的情况(如果新的children没有子节点，将旧的子节点移除)
- 比较如果都有子节点，则进行updateChildren，判断如何对这些新老节点的子节点进行操作（diff核心）。
- 匹配时，找到相同的子节点，递归比较子节点

在diff中，只对同层的子节点进行比较，放弃跨级的节点比较，使得时间复杂从O(n3)降低值O(n)，也就是说，只有当新旧children都为多个子节点时才需要用核心的Diff算法进行同层级比较

## Vue中key的作用

vue 中 key 值的作用可以分为两种情况来考虑：

- 第一种情况是 v-if 中使用 key。由于 Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。因此当使用 v-if 来实现元素切换的时候，如果切换前后含有相同类型的元素，那么这个元素就会被复用。如果是相同的 input 元素，那么切换前后用户的输入不会被清除掉，这样是不符合需求的。因此可以通过使用 key 来唯一的标识一个元素，这个情况下，使用 key 的元素不会被复用。这个时候 key 的作用是用来标识一个独立的元素。
- 第二种情况是 v-for 中使用 key。用 v-for 更新已渲染过的元素列表时，它默认使用“就地复用”的策略。如果数据项的顺序发生了改变，Vue 不会移动 DOM 元素来匹配数据项的顺序，而是简单复用此处的每个元素。因此通过为每个列表项提供一个 key 值，来以便 Vue 跟踪元素的身份，从而高效的实现复用。这个时候 key 的作用是为了高效的更新渲染虚拟 DOM。

key 是为 Vue 中 vnode 的唯一标记，通过这个 key，diff 操作可以更准确、更快速

- 更准确：因为带 key 就不是就地复用了，在 sameNode 函数a.key === b.key对比中可以避免就地复用的情况。所以会更加准确。
- 更快速：利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快
