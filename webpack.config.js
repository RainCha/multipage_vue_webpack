var path = require('path');
var webpack = require('webpack');

// 插件作用：将样式提取到单独的css文件里,而不是被打包到js文件里
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// 生成HTML
var HtmlWebpackPlugin = require('html-webpack-plugin');


// webpack 配置
var config = {

  //配置入口文件
  entry: {
    index: './src/js/page/index.js',
    list: './src/js/page/list.js',
    about: './src/js/page/about.js',
    // ...
  },

  output: {
    path: path.join(__dirname, 'dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
    publicPath: '/dist/',               //模板、样式、脚本、图片等资源对应的server上的路径
    filename: 'js/[name].js',           //每个页面对应的主js的生成配置
    chunkFilename: 'js/[id].chunk.js'   //chunk生成的配置
  },

  module: {
     //加载器
     loaders: [
         {
             test: /\.css$/,
             loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
         }, {
             test: /\.less$/,
             loader: ExtractTextPlugin.extract('css!less')
         }, {
             test: /\.html$/,
             loader: "html?attrs=img:src img:data-src"
         }, {
             //文件加载器，处理文件静态资源
             test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
             loader: 'file-loader?name=./fonts/[name].[ext]'
         }, {
             //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
             //如下配置，将小于8192byte的图片转成base64码
             test: /\.(png|jpg|gif)$/,
             loader: 'url-loader?limit=8192&name=./images/[hash].[ext]'
         },{
           {
               // vue-loader
               test: /\.vue$/,
               loader: 'vue-loader'
           }
         }
     ]
   },

   plugins: [
     //使jquery变成全局变量，不再需要require('jquery')
     new webpack.ProvidePlugin({
       $: 'jquery'
     }),
     // 将公共模块提取，生成名为`vendors`的chunk
     new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        chunks: ['index','list','about'], //提取哪些模块共有的部分
        minChunks: 3                      // 提取至少3个模块共有的部分
     }),

     //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
     new ExtractTextPlugin('css/[name].css'),

     // HtmlWebpackPlugin，模板生成相关的配置，每个对于一个页面的配置，有几个入口写几个配置
     new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
         favicon: './src/images/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
         filename: './views/index.html', //生成的html存放路径，相对于path
         template: './src/views/index.html', //html模板路径
         inject: 'body', //js插入的位置，true/'head'/'body'/false
         hash: true, //为静态资源生成hash值
         chunks: ['vendors', 'index'],//需要引入的chunk，不配置就会引入所有页面的资源
         minify: { //压缩HTML文件
             removeComments: true, //移除HTML中的注释
             collapseWhitespace: false //删除空白符与换行符
         }
     }),

     new HtmlWebpackPlugin({
        favicon: './src/images/favicon.ico',
        filename: './views/list.html',
        template: './src/views/list.html',
        inject: true,
        hash: true,
        chunks: ['vendors', 'list'],
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
     }),

     new HtmlWebpackPlugin({
       favicon: './src/images/favicon.ico',
       filename: './views/about.html',
       template: './src/views/about.html',
       inject: true,
       hash: true,
       chunks: ['vendors', 'about'],
       minify: {
           removeComments: true,
           collapseWhitespace: false
       }
     }),

     //热加载
     new webpack.HotModuleReplacementPlugin(),

   ],
   //使用webpack-dev-server，提高开发效率
  devServer : {
    contentBase: './',
    host: 'localhost',
    port: 3030, //默认8080
    inline: true, //可以监控js变化
    hot: true, //热启动
  }


};

module.exports =  config;
