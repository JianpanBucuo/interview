class Vue  {
    constructor(options){
        this.$el = options.el
        this.$data = options.data
        let computed = options.computed
        let methods = options.methods
        if(this.$el) {
            new Observer(this.$data)

            for(let key in computed) {
                Object.defineProperty(this.$data, key, {
                    get:() => {
                        return computed[key].call(this.$data)
                    }
                })
            }
            for(let key in methods) {
                Object.defineProperty(this, key, {
                    get:() => {
                        return methods[key]
                    }
                })
            }
            this.proxyVm(this.$data)

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
                    data[key] = newVal
                }
            })
        }
    }
}
class Observer {
    constructor(data) {
        this.observer(data)
    }
    observer(data) {
        if(data && typeof data === 'object') {
            for(let key in data) {
                this.defineReactive(data, key, data[key])
            }
        }
    }
    defineReactive(obj, key, val) {
        this.observer(val)

        Object.defineProperty(obj, key, {
            get() {
                return val
            },
            set:(newVal) => {
                if(newVal !== val){
                    val = newVal
                }
            }
        })
    }
}

class Compiler {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el)
        this.vm = vm
        let fragement = this.node2Fragement(this.el)
        // 
        this.compile(fragement)
    }
    isElementNode(node) {
        return node.nodeType === 1
    }
    compile(node) {
        let childNodes = node.childNodes
        Array.prototype.slice.call(childNodes).forEach(child => {
            if(this.isElementNode(child)) {
                this.compileElement(child)
                this.compile(child)
            } else {
                this.compileText(child)
            }
        })
    }
    isDirective(attrName) {
        return attrName.indexOf('v-') === 0
    }
    //编译元素
    compileElement(node) {

    }
    // 编译文本
    compileText(node) {
        let content = node.textContent
        if(/\{\{(.+?)\}\}/.test(content)) {
            // compileUtil['text'](node, content, this.vm)
            console.log(content,'conent')
        }

    }
    // 把节点移动到内存中
    node2Fragement(node) {
        let fragment = document.createDocumentFragment()
        let firstChild;
        while(firstChild = node.firstChild) {
            fragment.appendChild(firstChild)
        }
        return fragment
    }
} 