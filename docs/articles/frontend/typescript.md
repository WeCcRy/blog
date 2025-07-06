# Typescript

## 类型

### 原始类型

```typescript
let str: string = "jimmy";
let num: number = 24;
let bool: boolean = false;
let u: undefined = undefined;
let n: null = null;
let obj: object = {x: 1};
let big: bigint = 100n;
let sym: symbol = Symbol("me"); 
```

### 基础类型

| 类型      | 描述                                 | 示例                                                 |
| --------- | ------------------------------------ | ---------------------------------------------------- |
| string    | 字符串                               | `let name: string = "wy"`                            |
| number    | 整数、浮点数、x进制数                | `let age: number = 99`                               |
| boolean   | 布尔值                               | `let finished: boolean = false`                      |
| array     | 存储相同类型元素的数组               | `let list: number[] = [1, 2, 3]`                     |
| tuple     | 存储一致类型和长度的数组             | `let person: [string, number] = ["wy", 99]`          |
| enum      | 一组命名的常量                       | `enum Color {Red, Green, Blue}`                      |
| any       | 任意类型，无类型检查                 | `let value: any = 42`                                |
| void      | 无返回值                             | `function fn(): void {}`                             |
| null      | 空值                                 | `let empty: null = null`                             |
| undefined | 未定义值                             | `let undef: undefined = undefined`                   |
| never     | 不应该有返回值，常用于抛出错误的函数 | `function error(): never {throw new Error("error")}` |
| object    | 表示非原始类型                       | `let obj: object = {name: "wy"}`                     |
| union     | 联合类型，即多种类型之一             | `let a: number \| string; a = 1`                     |
| unknown   | 类型暂不确定                         | `let value: unknown = 4`                             |

**原始数据类型**：直接存储在栈中，占据空间小，大小固定。这种数据类型往往是不可变的（即使修改也是创造一个修改后的新值）

**引用数据类型**：存储在堆中，占据空间大，大小不固定，可变。引用数据类型在栈中存储指针，指向堆中实体的起始地址，使用时，通过指针来访问堆获取数据

Object,object和{}的区别。Object可以用来代表任何类型，object只能表示非原始类型（即引用类型），{}表示的类型同Object，但是属性无法被修改

类型范围由大到小：any,unknown => Object => number,string,... =>never。unknown类型相较于any更加安全，因为无法调用这种类型的属性和函数，且该类型的值只能赋值给unknown或any

### 接口(interface)类型

```typescript
interface A{
	readonly name:string//这个readonly是只读属性，意思就是说只能读取，不能将其他值赋值给他
	age?:number//这个问号就是可选的意思，条件稍微宽松了一些，下面引用这个age的话有没有这个属性都可以，不会报错
}

let obj:A = {
    name:"wy",//这里如果不写name就会报错，因为我们在上面定义了A类型集合，并且在这个变量中引入了(里面必须要有name属性且类型为字符串)
    age:99
}
```

### 数组类型

```typescript
// 普通声明方式，类型加中括号
let arr:number[] = [1,2,3,4];//数字类型的数组
let arr2:string[] = ["1","2","3","4"];//字符串类型的数组
let arr3:any[] = [1,"2",true,undefined,[],{}];//任意类型的数组

let arr4:number[][][] = [[[]],[[]],[[]]] //三维数组
//这个也能够决定你二维数组还是三维数组想要套几层就写几层

// 泛型声明，Array<T>
let arr1:Array<number> = [1,2,3,4,5]
let arr2:Array<string> = ["1","2","3","4","5"]
let arr3:Array<boolean> = [true]

//泛型数组套娃写法(还能够决定数组里面数组的类型之类的)
let arr4:Array<Array<number>> = [[123],[456]]
```

### 类数组 -- arguments

```typescript
function Arr(...args: any): void {//...args为ES6的解构方式，任意类型，voidwei不能有返回值
    console.log(arguments)//输出{'0':4,'1':56,'2':789}

    // let arr:number[] = arguments//报错，类型“IArguments”缺少类型“number[]”的以下属性: pop, push, concat, join 及其他 27 项
    let arr1: IArguments = arguments//解决方法

//     其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
//     interface IArguments {
//         [index: number]: any;
//         length: number;
//         callee: Function;
//     }
}

Arr(4, 56, 789)
```

### 联合类型

```typescript
// 使用运算符 |
let myPhone: number | string  = '010-820'
```

### 交叉类型

```typescript
// 使用运算符 &
interface Pople{
    name:string
    age:number
}
interface Man{
    gender:number
}

const fn = (man:Pople & Man):void => {//这里通过了&将Pople跟Man交叉在了一起，则man需要处理Pople也要处理Man。还可以继续跟更多个interface
    console.log(man)
}

fn({
    name:"wy",
    age:99,
    gender:1
})
```

### 类型断言

用于欺骗TypeScript编译器，使其通过编译

主要用于以下情况：

（1）将一个联合类型推断为其中一个类型

（2）将一个父类断言为更加具体的子类

（3）将任何一个类型断言为 any

（4）将 any 断言为一个具体的类型

```typescript
// 值 as 类型 或 <类型>值
 interface A{
    run:string
}
interface B{
    build:string
}

let fn = (type:A | B) =>{
    console.log((<A>type).run);
  //console.log((type as A).run); 两种断言方式
}

fn({
    build:"123"//这里是没办法传过去的，断言是不能够滥用的，因为我们确实没有.run这个内容
})
```

还是一种情况是常量断言

```typescript
// 值 as const

// 对于一般字面值而言，const 和 as const的作用是一致的
const names = 'wy'
names = 'aa' //无法修改
 
let names2 = 'wy' as const
names2 = 'aa' //无法修改

// 对于引用类型如对象而言，const只能保证引用的地址不变，而无法保证内容不变，而as const可以把对象的属性改成readonly，来保证对象的内容也无法改变
const myObject = { name: 'John', age: 30 }; // 类型推断为 { name: string, age: number }
const myConstObject = { name: 'John', age: 30 } as const; // 类型推断为 { readonly name: "John", readonly age: 30 }
```

### ECMA内置类型

```typescript
let b: Boolean = new Boolean(1)
let n: Number = new Number(true)
let s: String = new String('aaa')
let d: Date = new Date()
let r: RegExp = /^1/
let e: Error = new Error("error!")
```

DOM元素和BOM元素也有自己的映射类型

### 元组类型

存放不同类型数据的数组

```typescript
let arr:[string,number] = ['wy',22] //这样的方式就叫做元组，定义了每个位置需要满足的不同类型，元素需要严格满足规定类型

arr.push('111',2222,433) // push的元素需要严格满足规定的类型
arr[0] = "wyy"  // 可以直接修改元素，但是修改的元素类型必须严格满足

console.log(arr)
```

### 枚举类型

```typescript
// 数字定义枚举，默认从0开始
enum Color{
    red,    // 0
    green,  // 1
    blue    // 2
}
console.log(Color.red,Color.blue,Color.green)//能够得到他们的顺序数字，这里返回0，2，1

// 自定义起始数字，实现增长枚举
enum Color{
    red=2,  // 2
    green,  // 3
    blue    // 4
}
console.log(Color.red,Color.blue,Color.green)//能够得到他们的顺序数字，这里返回2，4，3

// 异构枚举，混用字符串和数字定义
enum Types{
   No = "No",
   Yes = 1,
}
console.log(Types) // { '1': 'Yes', No: 'No', Yes: 1 }采用数值的会带一个反向映射

// 接口枚举，满足接口要求
enum Color{
     no = "NO",
     yes = 1
 }

interface A{
    red:Color.yes
}

let B:A = {
    red:Color.yes
    //或者直接red:1，只能填入这两个内容其中之一，其他的会报错
}
```

```typescript
// const枚举，在enum前使用const修饰符实现，主要是编译结果不同

// 1.不使用const修饰符
// ts
enum Types{//有没有const决定是编译成对象还是编译成常量
    sucess,
    fail
}
let code:number = 0
if(code === Types.sucess){
    console.log("haha")
}
// js
"use strict";
var Types; // 编译成了对象
(function (Types) {
    Types[Types["sucess"] = 0] = "sucess";
    Types[Types["fail"] = 1] = "fail";
})(Types || (Types = {}));
let code = 0;
if (code === Types.sucess) {
    console.log("haha");
}

// 2.使用const修饰符
// ts
const enum Types{//有没有const决定是编译成对象还是编译成常量
    sucess,
    fail
}
let code:number = 0
if(code === Types.sucess){
    console.log("haha")
}
// js
"use strict";
let code = 0;	// 直接编译成常量0
if (code === 0 /* Types.sucess */) {
    console.log("haha");
}

```

### 类型别名

type，可以定义类型和值的别名

```typescript
// 定义类型别名
type str = string 
let s:str = "wy"

// 定义联合类型别名
type un = string | number
let u1:un = "wy" // un=string
let u2:un = 10   // un=number

// 定义值别名
type value = boolean | 0 | '213'
 
let s:value = true  //变量s的值  只能是上面value定义的值
```

```typescript
// type和interface的区别
// 1. interface是可以继承type的，但是type是没办法继承interface的，只能够使用&进行合并
type Person = {
  name: string;
  age: number;
};
// 定义一个 interface，继承自 Person type，并添加一个新的属性 gender
interface Employee extends Person {
  gender: 'male' | 'female';
}
// 创建一个符合 Employee 接口的对象
let employee: Employee = {
  name: 'John Doe',
  age: 30,
  gender: 'male'
};

// 2.interface是没办法写联合类型的，必须要里面写一个属性才能够去写联合类型(不能直接在外面添加联合类型)，而type能够直接写联合类型
type s = number[] | string//type直接写联合类型

interface A {
    name:string | number//要在内部属性才能写联合类型
}

// 3.interface重复写是会合并在一起的，type不行
interface A{
    name:string | number
}
interface A{
    age:number
}// 此时接口A包含name和age
```

### never类型

使用 never 类型来表示不应该存在的状态，一般用于兜底，如抛出错误等。联合类型中携带never会直接被忽视

### Symbol类型

Symbol是ES6的原生属性，可以传递参数生成唯一参数，参数只支持string和number

如果使用Symbol类型作为对象的key，无法直接通过访问对象来获取到该key，只能通过特定方法获取

```typescript
Reflect.ownKeys() // 方法返回一个由目标对象自身的属性键组成的数组。它的返回值等同于 
Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))。
```



## 属性

任意属性[xx:string]: xx

```typescript
// 任意属性
interface Person{
    name:string,
    age?:number,
    [propName:string]:string|number//这个属性一旦定义了，引用这个Person的对象就能够写入任意属性，属性的形式主要看冒号后面你定义了什么类型，比如在这里定义的类型就是string和number类型，不是这两者的类型就会报错，包括在Person里面定义除了string跟number之外其他类型也会报错
    //可以理解为这个 [propName:stirng]任意属性的优先度相当高
}
```

只读属性 readonly

可选属性 ?

继承属性 extends

## 函数

### 函数重载

TS中的函数重载，分为重载签名（可以有多个）和实现签名（只能有一个），重载签名用于制定规则（传入参数及类型和返回值类型），实现签名用于实现函数（类型的范围应该满足所有重载情况）。调用函数时，编译器会从第一个重载签名开始访问，直到找到符合函数签名的

```typescript
function add(a: number, b: number): number; // 重载签名
function add(a: string, b: string): string;	// 重载签名
function add(a: string, b: number): string; // 重载签名
function add(a: number, b: string): string; // 重载签名

// 实现签名，需要满足所有重载签名的情况
function add(a: string | number, b: string | number) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

console.log(add(1,2)) // 3
```

本质上是伪重载，最后实现还是要兼容所有情况，更像是一种声明，只是能够更加方便使用者去理解这个函数，方便维护

## 调用签名

让一个接口可以像函数一样被调用。多用于Vue3中绑定事件名称

```
export interface CollapseEmits {
    (e: 'update:modelValue', value: NameType[]): void
    (e: 'change', value: NameType[]): void
}
```

## Class类

```typescript
//在TypeScript中是需要提前声明类型的
class Person {
    name:string
    age:number
    sub:boolean
    
    constructor (name:string,age:number,sub:boolean) { // 声明了哪些属性，构造函数中就需要包含哪些属性
 		this.name = name
        this.age = age
        this.sub = sub
    }
}

new Person("wy",22,false)

// 属性修饰词 public private protected static
// public => 内、外部均可访问
// private => 仅内部可访问
// protected => 仅内部和继承的子类可以访问
```

类中的静态属性

- 静态属性和非静态属性之间的区别
  - 在内存中存放的位置不同：所有 static 修饰的属性和方法都存放在内存的方法区里，而非静态的都存在堆内存中
  - 出现的时机不同：静态属性和方法在没创建对象之前就存在，而非静态的需要在创建对象才存在
  - 静态属性是整个类都公用的
  - 生命周期不一样，静态在类消失后被销毁，非静态在对象销毁后销毁
  - 用法：静态的可以直接通过类名访问，非静态只能通过对象进行访问
- 使用static的注意事项 （需要注意静态的生成时间早于非静态的）
  - 带静态修饰符的方法只能访问静态属性
  - 非静态方法既能访问静态属性也能访问非静态属性
  - 非静态方法不能定义静态变量
  - 静态方法不能使用 this 关键字
  - 静态方法不能调用非静态方法，反之可以
- 父子类中静态和非静态的关系（同名时子类优先）
  - 对于非静态属性，子类可以继承父类非静态属性，但是当父子类出现相同的非静态属性时，不会发生子类的重写并覆盖父类的非静态属性，而是隐藏父类的非静态属性
  - 对于非静态方法，子类可以继承并重写父类的非静态方法
  - 对于静态属性，子类可以继承父类的静态属性，但是如果和非静态属性一样时，会被隐藏
  - 对于静态方法，子类可以继承父类的静态方法，但是不能重写静态方法，同名时会隐藏父类的

使用class使用extends来继承class类，使用implements来实现interface接口

```typescript
interface Person {
  run(type: boolean): boolean;
}

interface H {
  set(): void;
}

class A {
  //也可以使用继承去使用
  params: string;
  constructor(params: string) {
    this.params = params;
  }
}

// !!!extends在前，implements在后
class Man extends A implements Person, H {
  // 实现接口Person和H
  run(type: boolean): boolean {	
    return type;
  }
  set() {
    //啥也没有，这就是用接口去描述类
  }
}

```

##  泛型

类似C++中的T

```typescript
// 使用泛型约束,来确保属性一定有Length属性
interface Len{
    length:number
}

function getLegth<T extends Len>(arg:T) {//使用接口让泛型T继承了Len
  return arg.length
}

getLength(1)//这个时候我们这样使用就会提示我们类型"number"的参数不能赋给"Len"的参数
//我们依次对数组、字符串、布尔值都进行尝试，分别为可以、可以、不可以

// 也可以使用keyof T来获取T的属性，从而达到约束
function prop<T, K extends keyof T>(obj: T, key: K) {
   return obj[key]
}
 
let o = { a: 1, b: 2, c: 3 }
 
prop(o, 'a') 
prop(o, 'd') //，我们需要约束一下这个o里面并没有的东西，此时就会报错发现找不到
//通过提示，我门可以看到类型"d"的参数不能赋给类型"a"|"b"|"c"的参数

// prop的实现
function prop<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

Partial\<T\> 将类型的属性变成可选,内置属性，只可用于对象的第一层

```typescript
// 类似效果
type Partial<T> = {
  [P in keyof T]?: T[P];
};

interface UserInfo {
    id: string;
    name: string;
}
type NewUserInfo = Partial<UserInfo>;
const user: NewUserInfo = {
    name: 'wy'
}

// 如何实现深度的Partial
type DeepPartial<T> = {
     // 如果是 object，则递归类型
    [U in keyof T]?: T[U] extends object
      ? DeepPartial<T[U]>
      : T[U]
};

type PartialedWindow = DeepPartial<T>; // 现在T上所有属性都变成了可选了
```

Required\<T\> 将类型的属性变成必选，同样只作用于第一层

```typescript
// 类似实现
type Required<T> = { 
    [P in keyof T]-?: T[P] 
};
```

Pick\<T\>用于从某个类型中挑选个别属性出来

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

// 必须实现title和completed
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

Record\<K extends keyof any, T\>,将K中所有属性的值都转换成T类型

```typescript
interface PageInfo {
  title: string;
  id: number;
}

type Page = "home" | "about" | "contact";

// Page中所有属性类型都转换成PageInfo的属性类型
const x: Record<Page, PageInfo> = {
  about: { title: "about", id: 1 },
  contact: { title: "contact", id: 2 },
  home: { title: "home", id: 3 },
};
```

ReturnType\<fun\>用来得到fun的返回值类型

Exclude\<T,U\>，将U中有的属性从T中删去，（删去交集）

```
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number
```

Extract\<T, U\> 的作用是从 T 中提取出 U，（提出交集）

```
type T0 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
type T1 = Extract<string | number | (() => void), Function>; // () =>void
```

Omit\<T, K extends keyof any\> 的作用是使用 T 类型中除了 K 类型的所有属性，来构造一个新的类型。

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

NonNullable\<T\> 的作用是用来过滤类型T中的 null 及 undefined 类型

```typescript
type T0 = NonNullable<string | number | undefined>; // string | number
type T1 = NonNullable<string[] | null | undefined>; // string[]
```

Parameters\<T\> 的作用是用于获得函数的参数类型组成的元组类型

```typescript
// T必须是函数
type A = Parameters<() =>void>// []
type B = Parameters<typeof Array.isArray>// [any]
type C = Parameters<typeof parseInt>// [string, (number | undefined)?]
type D = Parameters<typeof Math.max>// number[]
```

## namespace 命名空间

namespace中是单独的作用域，可以向外暴露参数以供使用

## mixin混入

对象的合并可以通过Object.assign()实现

类的合并需要通过mixin实现

```typescript
// 需要混入的类
class Sprite {
  name = "";
  x = 0;
  y = 0;

  constructor(name: string) {
    this.name = name;
    console.log(this.name)
  }
}

type Constructor = new (...args: any[]) => {}; // 确保是类

type GConstructor<T = {}> = new (...args: any[]) => T; // 用于确保是一个受约束的基类

function Scale<TBase extends Constructor>(Base: TBase) {
  return class Scaling extends Base {
    _scale = 1;

    setScale(scale: number) {
      this._scale = scale;
    }

    get scale(): number {
      return this._scale;
    }
  };
}

const EightBitSprite = Scale(Sprite); // 此时返回的是个类

const flappySprite = new EightBitSprite("Bird"); // 输出Bird
flappySprite.setScale(0.8);
console.log(flappySprite.scale); // 0.8
```

## 装饰器

### 装饰器工厂

用于在装饰器中传递参数

```typescript
const watcher = (name:string):ClassDecorator =>{
  return (target:Function) =>{ // 装饰器内容
      target.prototype.getNames = ():string =>{
          return name
      }
  }
}
@watcher("haha") // 传递参数haha
class A{
  
}
let a = new A()
console.log((<any>a).getNames()) // haha
```

### 类装饰器(classDecorator)

用于在class前装饰，类型为classDecorator。可以不修改class，同时在class上添加新功能

```typescript
const watcher = (name: string): ClassDecorator => {
    return (target: Function) => { // target为A的构造函数
        target.prototype.getParams = <T>(params: T): T => {
            return params
        }
        target.prototype.getOptions = (): string => {
            return name
        }
    }
}
const watcher2 = (name: string): ClassDecorator => {
    return (target: Function) => { // target为A的构造函数
        target.prototype.getNames = ():string => {
            return name
        }
    }
}
 
@watcher2('name2')
@watcher('name')
class A {
    constructor() {
 
    }
}
 
 
const a = new A();
console.log((a as any).getOptions());
console.log((a as any).getNames());
```

### 方法装饰器(MethodDecorator)

```typescript
const met:MethodDecorator = (...args) => {
  console.log(args);
}

class A {
  constructor() {

  }
  @met
  getName ():string {
      return 'haha';
  }
}

const a = new A();
// args中包含三个内容
// 1. 对于静态成员，会返回类的构造函数；对于普通成员，则返回类的原型对象(即{})
// 2. 为修饰的方法名字
// 3. 为属性描述符，其中的value属性存储了所修饰的方法
```

### 属性装饰器(PropertyDecorator)

```typescript
const met:PropertyDecorator = (...args) => {
    console.log(args); [ {}, 'name', undefined ]
}
 
class A {
    @met
    name:string
    constructor() {
 
    }
   
}
  
const a = new A();
// args包含两个参数
// 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
// 2. 修饰的属性名字
```

### 参数装饰器(ParameterDecorator)

```typescript
const met:ParameterDecorator = (...args) => {
    console.log(args); // [ {}, 'setParasm', 0 ]
}
 
class A {
    constructor() {
 
    }
    setParasm (@met name:string = '213') {
 
    }
}
 
const a = new A();
// args中包含三个参数
// 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
// 2. 调用的方法的名字
// 3. 参数在函数参数列表中的索引
```

## TS-编写发布订阅模式

```typescript
interface Evenet{
  on:(name:string,fn:Function) => void,
  emit:(name:string,...args:Array<any>) => void//派发
  off:(name:string,fn:Function)=> void//移除
  once:(name:string,fn:Function) => void//只执行一次
}
  
interface List{
  [key:string]:Array<Function>
}
 
class Dispatch implements Evenet{//通过implements来约束这个类(Evenet)
  list:List
  constructor(){
      this.list = {}
  }
  on(name:string,fn:Function){
      const callback = this.list[name] || []//如果有取到值的话那就是一个数组，没有取到值的话就是一个空数组
      callback.push(fn)//因为不管怎么说，callback都是数组，所以我们后面的数组也可以直接添加上去
      this.list[name] = callback
      console.log(this.list);
  }
  emit(name:string,...args:Array<any>){
      let eventName = this.list[name]
      //on监听跟emit派发的时候 name 是需要一样的，不然会出错，所以我们这里要进行一个判断
      if(eventName){
          eventName.forEach(fn=>{
              //内容从下面的o.emit()传送上来
              fn.apply(this,args)//第一个参数this指向，第二个参数为数组，这里也刚好是一个数组就直接传进去。会将on监听的数据直接打印出来，这里打印出来66 99
          })
      }else{
          console.error(`名称错误${name}`)
      }
  }
  off(name:string,fn:Function){
      //off是删除一个函数，所以我们在下面将创建一个fn函数让他来删一下
      let eventName = this.list[name]
      //跟emit一样的，需要进行判断有没有值，还有就是函数存不存在，不存在的话就没得删了对吧
      if(eventName && fn){
          //我们要通过索引来将其删掉
          let index = eventName.findIndex(fns=> fns === fn )
          eventName.splice(index,1)
          console.log(eventName)
      }else{
          console.error(`名称错误${name}`)
      }
  }
  once(name:string,fn:Function){
      let de = (...args:Array<any>) =>{
          fn.apply(this,args)//指向到那个只调用一次函数的那里
          this.off(name,de)//调用完就把它删掉，这就是只能调用一次的原因哈哈
      }
      this.on(name,de)//第一个还是名字，第二个临时函数
  }
}

const o = new Dispatch()//初始化

o.on('post',()=>{//post作为key
  console.log(66);
})//第一个参数是事件名称，第二个是回调函数

o.on('post',(...args:Array<any>)=>{
  console.log(99,args)
  //这里我们对第二个回调函数传入了...args，也就是收到了o.emit除了第一个参数后面那些乱七八糟的东西(因为我们设定了any，对接收的类型并没有限制，所以收到什么乱七八糟的东西都不奇怪)，并在控制台打印了出来
})

const fn = (...args:Array<any>) => {
  console.log(args,2)
}
o.on('post',fn)//没错，这个就是特地创建出来删掉的
o.off('post',fn)//将fn删掉
//o.on('post2',()=>{
  //都会在控制台显示出来
//})
o.once('post',(...args:Array<any>)=>{
  console.log(args,'once')
})

o.emit('post',1,false,{name:"haha"})//除了第一个参数一样是事件，后面参数是不限制个数的，而且传什么都行
o.emit('post',2,false,{name:"haha"})//这里如果收到就是有问题的，因为我们在上面使用once了，只调用一次
```

