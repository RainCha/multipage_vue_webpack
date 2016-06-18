Vue + ES6 + webpack 项目框架
---
### 准备工作

1. 克隆到本地

> git clone @gitxxx

2. 安装依赖

> npm i

3. 运行查看

> npm run dev

在浏览器打开 localhost:3040 请查看首页

### 简要说明
```
src/views        站点入口目录，放置的是入口的js；
src/components   Vue 组件目录，所有的业务逻辑主要集中于此；
src/assets       放置图片资源的目录
```

### 开发约定

当新创建一个页面时，如一个详情页 detail，需要做以下几件事情：

1. 在 `views` 目录新建 `detail` 目录，并在目录下 创建 `detail.js`。 结果： `/views/detail/detail.js`
2. 拷贝一份 `index.js` 的内容粘贴至 `detail.js`, 修改其中所 import 的 `.vue` 文件为需要的 vue 组件 ，比如新建一个 `Detail.vue` 文件（里面要写点东西哦~）
2. 打开 `webpack.config.js`
3. 在 `entry` 里面 添加一行 `detail : devEntry +'/detail/detail.js'`,
4. 找到 `plugins` 数组里面，追加下面一段代码：

```
new HtmlWebpackPlugin({
  filename: './detail/index.html',
  template: './src/webpackTpl.html',
  inject: true,
  hash: true,
  chunks: ['detail'],
  minify: {
    removeComments: true,
    collapseWhitespace: false
  }
}),
```

这段代码的作用是创建 html 文件，并引入所依赖的 js 文件，可以发现与其他 HtmlWebpackPlugin 不同之处 只有 filename 和 chunks 两处。

5. 运行 `npm run dev` 后，打开浏览器 输入 `localhost:3040/detail` ,便可以看到内容。

之后就可以在 `Detail.vue` 中快快乐乐的写代码了。



### 部署

> 运行 `npm run build` 把生成的 dist 目录传到服务器上便可
