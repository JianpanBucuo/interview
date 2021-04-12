class Vue {
    constructor(options) {
        this.$el = options.el
        this.$data = options.data
        
        if(this.$el) {
            new Observer(this.$data)

            new Compiler(this.$el, this)
        }
    }
}
var compileUtil = {
    html(node, expr,vm) {
        console.log('in html',expr)
        let value = this.getVal(vm, expr)
        console.log(value)
        this.updater['htmlUpdater'](node, value)
        new Watcher(vm, expr, (newVal) => {
            console.log('newVal',newVal)
            this.updater['htmlUpdater'](node, newVal)
        })
    },
    text(node, expr,vm) {
        console.log('in text')
        let value = expr.replace(/\{\{(.+?)\}\}/g, (match, exprIn) => {
            return this.getVal(vm, exprIn)
        })
        this.updater['textUpdater'](node, value)
    },
    on(node, expr,vm, eventName) {
        console.log('in on')
    },
    model(node, expr,vm) {
        console.log('in model')
    },
    getVal(vm, expr) {
        let arr = expr.split('.')
         
        return arr.reduce((data, current) => {
            return data[current]
        },vm.$data)
    },
    updater:{
        htmlUpdater(node, value) {
            node.innerHTML = value
        },
        textUpdater(node, value) {
            node.textContent = value
        }
    }
}
class Observer {
    constructor(data) {
        this.observer(data) 
    }
    observer(data) {
        if(data && typeof data  ==='object') {
            for(let key in data) {
                this.defineReactive(data, key, data[key])
            }
        }
    }
    defineReactive(obj, key, val) {
        if(typeof val === 'object') {
            this.observer(val)
        }
        var dep = new Dep()
        Object.defineProperty(obj, key, {
            get() {
                if(Dep.target) {
                    dep.addSub(Dep.target)
                }
                return val
            },
            set:(newVal) => {
                if(newVal !== val) {
                    val = newVal
                    this.observer(newVal)
                    dep.notify()
                }
            }
        })
    }
}

class Compiler {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el)  
        this.vm = vm
        //拿到虚拟节点
        let fragment = this.node2Fragment(  this.el )
        //将虚拟节点与data，结合起来
    
        this.compile(fragment)
        this.el.appendChild(fragment)
    }

    isElementNode(node) {
        return node.nodeType === 1
    }
    isTextNode(node) {
        return node.nodeType === 3
    }
    node2Fragment(node) {
        let fragment = document.createDocumentFragment()
        let firstChild;
        while(firstChild = node.firstChild) {
            fragment.appendChild(firstChild)
        }
        return fragment
    }
    compile(node) {
        let childNodes = node.childNodes
        Array.prototype.slice.call(childNodes).forEach(child =>{
            
            if(this.isElementNode(child)) {
                
                this.compileElement(child)
                this.compile(child)
            }
            
            if(this.isTextNode(child)){
                this.compileText(child)
            }
        })
    }
    compileElement(node) {
        let attributes = node.attributes
        Array.prototype.slice.call(attributes).forEach(attr => {
            let {name, value: expr} = attr
            if(this.isDirective(name)) {
                let [,directive] = name.split('-')
                let [directiveName, eventName] = directive.split(':')
                compileUtil[directiveName](node, expr, this.vm, eventName)
            }
        })
    }
    compileText(node) {
        let content = node.textContent
        if(/\{\{(.+?)\}\}/.test(content)) {
            compileUtil['text'](node, content, this.vm)
        }
    }
    isDirective(attrName) {
        return attrName.indexOf('v-') === 0
    }
}

//订阅者
class Dep {
    constructor() {
        this.subs = []
    }
    addSub(watcher) {
        this.subs.push(watcher)
    }
    notify() {
        console.log('notify',this.subs)
        this.subs.forEach(watcher => {
            watcher.update()
        })
    }
}

class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm 
        this.expr = expr
        this.cb = cb
        this.oldValue = this.get()
    }
    get() {
        Dep.target = this
        let value = compileUtil.getVal(this.vm, this.expr)
        Dep.target = null
        return value
    }
    update() {
        console.log(this.vm,this.vm.$data.school,'newVal')
        let newVal = compileUtil.getVal(this.vm, this.expr)
        
        if(newVal !==this.oldValue) {
            this.cb(newVal)
        }
    }
}