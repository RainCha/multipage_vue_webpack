var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');

// 生成HTML
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 读取所有入口文件名
var entryNames = require('./readfile.js');

console.log("入口文件名:",entryNames);


// 所有的入口所在目录
var devEntry = './src/views';

var webpackConfig = {
  entry: {}, //放在底部注入
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name]/[name].min.js',
    chunkFilename: 'chunk/[id].chunk.js'
  },
  module: {
    loaders: [
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        loader: 'url-loader?limit=8192&name=./images/[hash].[ext]'
      },
      {
        test: /\.vue$/, // a regex for matching all files that end in `.vue`
        loader: 'vue'   // loader to use for matched files
      },
      {
        // use babel-loader for *.js files
        test: /\.js$/,
        loader: 'babel',
        // 排除node_modules
        exclude: /node_modules/
      }
    ]
  },
  plugins: [

    //热加载
    new webpack.HotModuleReplacementPlugin(),

    //  保留首页，其余页面从底部注入
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/webpackTpl.html',
      inject: true,
      hash: true,
      chunks: ['index'],
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
  ],
  babel: {
   // enable stage 0 babel transforms.
   presets: ['es2015', 'stage-0'],
   plugins: ['transform-runtime']
 },
 devServer : {
     contentBase: './dist',  // 配置开发环境下的静态资源路径
    host: 'localhost',    // 浏览器访问IP
    port: 3040, //默认8080
    inline: true, // 监听变化，刷新页面
    hot: true, //热加载
  }
};


// 加载入口与配置html页面输出
var entriesHtmlObj = getEntriesAndHtml(entryNames);


// 加载 HtmlWebpackPlugin 的所有配置
webpackConfig.plugins = _.concat(webpackConfig.plugins,entriesHtmlObj.htmlArr);
webpackConfig.entry =  _.assign({},webpackConfig.entry,entriesHtmlObj.entryObj);

console.info("->=>=>=> webpack is running,please wait a second...");

module.exports = webpackConfig ;



// 加载入口与配置html页面输出
function getEntriesAndHtml(entryNames){
  var entryObj = {};
  var htmlArr = [];
  _.map(entryNames,function(entry){
    entryObj[entry] = devEntry +'/'+entry+'/'+ entry +'.js';

    // 过滤掉首页方便访问
    if(entry !== 'index'){
      var html_webpack_plugin = new HtmlWebpackPlugin({
        filename: './'+ entry +'/index.html',
        template: './src/webpackTpl.html',
        inject: true,
        hash: true,
        chunks: [entry],
        minify: {
          removeComments: true,
          collapseWhitespace: false
        }
      });
      htmlArr.push(html_webpack_plugin);
    }
  });

  return {
    entryObj:entryObj,
    htmlArr:htmlArr
  }

}
