var path = require('path');
var webpack = require('webpack');

// 生成HTML
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 所有的入口所在目录
var devEntry = './src/views';

module.exports = {
  entry: {
    index: devEntry +'/index/index.js',
    about: devEntry +'/about/about.js',
    list:  devEntry +'/list/list.js',
    concat:  devEntry +'/concat/concat.js',
    // ....
  },
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
    new HtmlWebpackPlugin({
      filename: './list/index.html',
      template: './src/webpackTpl.html',
      inject: true,
      hash: true,
      chunks: ['list'],
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new HtmlWebpackPlugin({
      filename: './about/index.html',
      template: './src/webpackTpl.html',
      inject: true,
      hash: true,
      chunks: ['about'],
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new HtmlWebpackPlugin({
      filename: './concat/index.html',
      template: './src/webpackTpl.html',
      inject: true,
      hash: true,
      chunks: ['concat'],
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    //热加载
    new webpack.HotModuleReplacementPlugin(),
  ],
  babel: {
   // enable stage 0 babel transforms.
   presets: ['es2015', 'stage-0'],
   plugins: ['transform-runtime']
 },
 devServer : {
    contentBase: './dist',
    host: 'localhost',
    port: 3040, //默认8080
    inline: true, //可以监控js变化
    hot: true, //热启动
  }
}
