var compileUtil = {
    on(node, expr, vm, eventName) {
        node.addEventListener(eventName, (e) => {
            vm[expr].call(vm,e)
        })
    },
    html(node, expr, vm) {
        console.log('html',node, expr, vm)
        let value = this.getVal(vm,expr)
        this.updater['htmlUpdater'](node,  value)
        new Watcher(vm, expr, (newVal) => {
            // 如果数据跟新了会触发此方法，给输入框赋值
            this.updater['htmlUpdater'](node, newVal)
        })
        
    },
    getContentValue(vm,expr) {
        // 遍历表达式，将内容重新替换成一个完整的内容，返还回去
        return expr.replace(/\{\{(.+?)\}\}/g, (match, changedExpr) => { 
            return this.getVal(vm, changedExpr)
        })
    },
    text(node, expr, vm) {
        let content = expr.replace(/\{\{(.+?)\}\}/g, (match, exprIn) => {
            // 给表达式每个变量，都加上观察者
            console.log(exprIn,'exprIn')
            new Watcher(vm, exprIn, (newVal) => {
                // 如果数据跟新了会触发此方法 
                
                this.updater['textUpdater'](node,this.getContentValue(vm, expr)) //返回一个全的字符串
            })
            return this.getVal(vm, exprIn)
        })
        this.updater['textUpdater'](node, content)
    },
    model(node, expr, vm) {
        //node 节点
        // expr 表达式 school.name
        // vm 实例 
        var value = this.getVal(vm, expr)
        this.updater['modelUpdater'](node, value)
        // 添加观察者
        new Watcher(vm, expr, (newVal) => {
            // 如果数据跟新了会触发此方法，给输入框赋值
            this.updater['modelUpdater'](node, newVal)
        })
        // 视图 -> 数据
        node.addEventListener('input', (e) => {
            // 获取用户输入的内容e.target.value
            this.setVal(vm,expr, e.target.value)
        })
    },
      getVal(vm, expr) {
        // 根据表达式 取到对应数据
       
        let arr = expr.split('.')
     
        return arr.reduce((data, current) => {
            return data[current]
        }, vm.$data)
    },
    setVal(vm,expr, value) {
        expr.split('.').reduce((data, current,index, arr) => {
            if(arr.length - 1 === index) {
              return  data[current] = value
            }
            return data[current]
        }, vm.$data)
    },
    updater:{
        modelUpdater(node, value) {
            node.value = value
        },
        htmlUpdater(node ,value) {
            node.innerHTML = value
        },
        textUpdater(node, value) {
            node.textContent = value
        }
    }
}

//基类 调度

class Compiler {
    constructor(el, vm) {
        //判断el属性 是否是元素，如果不是元素，就获取他
        this.el = this.isElementNode(el) ? el : document.querySelector(el)
        //把当前节点中的元素获取到，放到内存中
        this.vm =vm
        let fragement = this.node2Fragement(this.el)
        // 把节点中的内容进行替换, 编译模板，用数据编译
        this.compile(fragement)

        // 把内容塞到页面中
        this.el.appendChild(fragement)
    }
    isElementNode (node) {
        return node.nodeType === 1
    }
    // 编译 内存中的模板
    compile(node) {
        let childNodes = node.childNodes
       Array.prototype.slice.call(childNodes).forEach(child => {
            if(this.isElementNode(child)) {
                this.compileElement(child)
                //如果是元素，则再次遍历子节点
                this.compile(child)
            } else {
                this.compileText(child)
            }
        })
    }
    // 是否是指令
    isDirective(attrName) {
        return attrName.indexOf('v-') === 0
    }
    //编译元素
    compileElement(node) {
        let attributes = node.attributes //类数组
        Array.prototype.slice.call(attributes).forEach(attr => {
            let{ name, value:expr }=attr
            if(this.isDirective(name)) {
                let [,directive] = name.split('-') // v-html v-on:click
                let [directiveName, eventName] = directive.split(':')
                console.log(directiveName,'name')
                // 需要调用不同指令处理
                
                compileUtil[directiveName](node, expr, this.vm, eventName)
            }
        })
    }
    //编译文本
    compileText(node) {
        let content = node.textContent
        // ?惰性匹配
        if(/\{\{(.+?)\}\}/.test(content)) {
            // 找到所有文本{{}}
            compileUtil['text'](node, content,this.vm)
        }
        //判断当前文本中的内容是否包含{{}}
    }
    // 把节点移动到内存中
    node2Fragement(node) {
        let fragment = document.createDocumentFragment()
        let firstChild;
        while (firstChild = node.firstChild) {
            // 每拿到一个节点，都放到fragment
            fragment.appendChild(firstChild)
        }
        return fragment
    }
}

// 实现数据劫持 
class Observer {
    constructor(data) {
        console.log(data,'observer')
        this.observer(data)
    }
    observer(data) {
        console.log(data,typeof data ,' obsever')
        if(data && typeof data === 'object') {
            //如果是对象，循环对象
            for(let key in data) {
                this.defineReactive(data, key, data[key])
            }
        }
    }
    defineReactive(obj, key, val) {
        this.observer(val)
        let dep = new Dep() //给每一个属性，都加上发布订阅的功能
        //因是局部作用域，每一个变量都对应自己的一个dep
        Object.defineProperty(obj, key, {
            get() {
                if(Dep.target) {
                    dep.addSub(Dep.target)
                }
                return val
            },
            set:(newVal) =>  {
                console.log(newVal,'newVal')
                if(newVal !== val) {
                    this.observer(newVal)
                    val = newVal
                    dep.notify()
                }
                
            }
        })
    }
}
// 订阅者
class Dep {
    constructor() {
        this.subs = [] //存放所有的 watcher
    }
    addSub(watcher) {
        //添加watcher
        this.subs.push(watcher)
    }
    //发布
    notify() {
        console.log('notify')
        this.subs.forEach(watcher => {
            watcher.update()
        })
    }
}
// 订阅者发布 触发观察者的更新

// 观察者
class Watcher {
    constructor(vm, expr, cb) {
        // vm: 数据
        // expr：表达式
        // cb: callback
        this.vm = vm
        this.expr = expr // school.name
        this.cb = cb
        // 默认存放一个老值
        this.oldValue = this.get()
    }
    get() {
        //20分
        // new Watcher 会产生实例
        Dep.target = this // 将自己放到target
        // 取值时，因为数据劫持，会调用 Object.defineProperty中的get
        console.log(Dep.target, this.expr, 'watcher')
        let value = compileUtil.getVal(this.vm, this.expr)
        Dep.target = null
        return value
    }
    //数据变化后，会调用观察者的updata方法
    update() {
        let newVal = compileUtil.getVal(this.vm, this.expr)
       
        if(newVal !== this.oldValue) {
            this.cb(newVal)
        }
    }
}
// vm.$watch(vm,'school.name',(newVal) =>{

// })
class Vue {
    constructor(options) {
        this.$el = options.el
        this.$data = options.data
        let computed = options.computed
        let methods = options.methods
        //如果根元素存在，编译模板
        if(this.$el) {

            //把数据 全部转换成用 Object.defineProperty来定义 
            new Observer(this.$data)    

            // computed
            for(let key in computed) {
                Object.defineProperty(this.$data, key,{
                    get:() => {
                        return computed[key].call(this.$data)
                    }
                })
            }
            // methods
            for(let key in methods) {
                Object.defineProperty(this, key, {
                    get:() => {
                        return methods[key]
                    }
                })
            }
            //把数据获取操作， vm上的取值操作 都代理到 vm.$data
            this.proxyVm(this.$data)
            // 编译模板 
            new Compiler(this.$el, this)
        }
    }
    proxyVm(data) {
        for(let key in data) {
            Object.defineProperty(this, key, {
                get() {
                    return data[key]
                },
                set(newVal) {
                      data[key]= newVal
                }
            })
        }
    }
}

 