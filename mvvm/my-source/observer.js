var data = {
    name: 'nic',
    innerObj: {
      a: 'b'
    }
  }
  observe(data)
  data.name = '1'

//   拦截器
function observe(obj) {
  if (!obj || typeof obj !== 'object') {
    return
  }
  Object.keys(obj).forEach((key) => {
    defineReactive(obj, key, obj[key])
  })
}
function defineReactive(obj, key, val) {
  observe(val)
  var dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: false,
    get: function () {
        Dep.target && dep.addSub(Dep.target)
        return val
    },
    set: function (newVal) {
        if(newVal === val) return
        
        console.log('监听到了', val, '--->', newVal)
        val = newVal
        dep.notify()
    }
  })
}


// 实现消息订阅器，收集订阅者，数据变动触发通知（发布）， -> 通知订阅者更新

function Dep () {
    this.subs = []
}
Dep.prototype = {
    addSub:function(sub) {
        this.subs.push(sub)
    },
    notify:function() {
        this.subs.forEach(v => {
            v.update()
        })
    }
}