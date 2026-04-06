## webpack的目的

早期的前端开发中，开发者需要手动引入每个JavaScript文件和CSS文件，这在项目规模较大时会变得非常麻烦和容易出错。webpack的出现解决了这个问题，它是一个模块打包工具，可以将项目中的各种资源（JavaScript、CSS、图片等）视为模块，并根据依赖关系将它们打包成一个或多个文件，从而简化了资源管理和加载过程。且可以适配不同的语法（React,Vue,TS,ES6+）,并对代码进行优化（如Tree Shaking、Code Splitting等），提升性能。

## webpack打包流程

1. **入口（Entry）**：webpack从一个或多个入口文件开始构建依赖图，默认是`src/index.js`。
2. **模块解析（Module Resolution）**：webpack根据入口文件分析依赖关系，递归地解析所有依赖的模块。
3. **加载器（Loaders）**：webpack使用加载器来处理非JavaScript文件（如CSS、图片等），将它们转换为JavaScript模块。
4. **插件（Plugins）**：webpack使用插件来执行更广泛的任务，如优化打包结果、管理资源等。
5. **输出（Output）**：webpack将打包后的文件输出到指定的目录，默认是`dist`。

### 1.入口

一般配置在webpack.config.js中，指定入口文件路径，如：

```javascript
module.exports = {
  entry: './src/index.js',
  // ...
};
```

webpack会从这个入口文件开始，分析其依赖关系，构建出一个依赖图（有向无环图）。解析文件中的import语句，找到所有依赖的模块，使用loader，再继续解析这些模块的依赖，直到没有新的依赖为止。

### 2.模块解析

webpack会根据入口文件分析依赖关系，递归地解析所有依赖的模块。对于每个模块，webpack会将其转换为一个JavaScript模块，并将其添加到依赖图中。对于不同的模块（本地模块、第三方模块等），webpack会采用不同的解析策略。如果是本地模块，webpack会根据相对路径解析；如果是第三方模块，webpack会根据模块名称在`node_modules`目录中查找（找到文件的index.js）。

### 3.加载器

确定模块路径并读取文件内容后，webpack 会根据配置的 loader 规则对对应文件进行编译转换，例如通过 babel-loader 处理 JSX、ES6+ 语法，通过 css-loader 处理样式文件，将各类资源统一转为 webpack 可处理的 JS 模块。在所有模块递归解析、编译完成并形成完整依赖图之后，webpack 会根据代码分割策略（如 splitChunks）对模块进行分组，将业务代码、第三方依赖、异步路由等拆分为不同的 chunk，再经过优化（如 Tree Shaking、代码压缩），最终封装成浏览器可运行的资源并输出到指定目录。
