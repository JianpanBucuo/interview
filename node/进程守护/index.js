// 
var spawn = require('child_process').spawn;
var process = require('process');

// var p = spawn('node',['b.js']);
var p = spawn('node', ['b.js'], {
  detached: true
})
// spawn的第三个参数 可以设置detached属性，如果该属性为true，则会调用 setsid方法，完成进程守护
console.log(process.pid, p.pid);

/**
 * setsid 主要完成三件事：
 * 该进程变成一个新会话的会话领导。
 * 该进程变成一个新进程组的组长。
 * 该进程没有控制终端
 */



