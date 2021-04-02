// Object.defineProperty 可为对应的属性添加特性描述，和存取器描述


var obj = {
    name:'nic'
}

// value 默认 undefined
// writable 默认为false
Object.defineProperty(obj,'name', {
    writable: false  // 设置为false，不可被重写
})
obj.name = 'no'
console.log(obj)
// { name: 'nic' }

// enumerable 默认为false
Object.defineProperty(obj,'name', {
    enumerable: false  // 设置为false，不可被枚举
})
console.log(Object.keys(obj))  // 返回空数组


// configurable 目标属性特性是否可以再次修改 (writable, configurable, enumerable)  true可以， false则不可再被修改 默认为false
Object.defineProperty(obj,'age',{
     value:'2'
})
 
obj.age  = '1'
delete obj.age
console.log(obj.age)

// 存储器描述， 当使用了 getter，和setter 不允许使用 writable 和 value
var val = 1
Object.defineProperty(obj,'sex',{
    get:function() {
        return val
    },
    set:function(newval) {
        val = newval
    },
    // writable:false,
    // value:'222'  Cannot both specify accessors and a value or writable attribute,
})