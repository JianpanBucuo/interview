import io from 'socket.io-client'
// 这里判断是否是https，如果是https就需要使用wss协议
const socketProtocal = (window.location.protocol.includes('https') ? 'wss' : 'ws');
// 这里就进行连接并且不重新连接，这样可以制作一个断开连接的功能
const socket = io(`${socketProtocal}://${window.location.host}`, { reconnection: false })
// 连接服务器
socket.on('connect', function () {
    console.log('成功连接服务器')
    socket.emit('message',{id:'1',txt:'hello'});
  })

  function userLogin () {
    let loginName = document.getElementById('js-loginName').value
      socket.emit('login', {
        name: 'nic'
      })
  }
  const oLoginBtn = document.getElementById('login')
  oLoginBtn.addEventListener('click', userLogin)



  socket.on('success', function (data) {
  console.log('success',data)
})


// 测试重新写

// const rewrite = () => {
//     const origin = oLoginBtn.onclick
//     return function () {
//         const event = new Event('click')
//         event.arguments = arguments
//         window.dispatchEvent(event)
//         console.log(origin,'origin')
//         // origin.apply(this,arguments)
//     }
// }
// oLoginBtn.onclick = rewrite('click')
oLoginBtn.addEventListener('click',() => {
    console.log('rewrite click')
})
