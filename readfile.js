var fs = require('fs')



function geFileList(path){
 var entryNames = [];
 readFile(path,entryNames);
 return entryNames;
}

//遍历读取文件
function readFile(path,entryNames){

 //同步读取文件
 files = fs.readdirSync(path);

 files.forEach(walk);

 function walk(file) {
  states = fs.statSync(path+'/'+file);

  if(states.isDirectory())  {

    readFile(path+'/'+file,entryNames);

  }else {
    // 把所有的入口文件名放入数组里面
    entryNames.push(file.replace(/\.js/,''));

  }
 }
}

module.exports = geFileList('./src/views');
