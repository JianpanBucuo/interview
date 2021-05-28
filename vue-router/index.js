
// 重写方法
const _wr = type => {
    const origin = history[type];
    return function() {
        console.log(arguments,'arguments')
        const event = new Event(type)
        event.arguments = arguments
        window.dispatchEvent(event)
        console.log(this,'this')
   }
}
//重写方法
 history.pushState = _wr('pushState')
 history.replaceState = _wr('replaceState')
//实现监听
window.addEventListener('replaceState', function(e) {
  console.log('THEY DID IT AGAIN! replaceState 111111')
})
window.addEventListener('pushState', function(e) {
  console.log('THEY DID IT AGAIN! pushState 2222222')
})
