function Compile(el, vm) {
    this.$vm = vm
    this.$el = this.isElementNode(el) ? el: document.querySelector(el)
    console.log(this.$el)
    if(this.$el) {
        this.$fragment = this.node2Fragment(this.$el)
        this.init()
        console.log(this.$fragment)
        this.$el.appendChild(this.$fragment)
    }
}
Compile.prototype = {
    isElementNode:function(el) {
        return el.nodeType === 1
    },
    isTextNode:function(el) {
        return el.nodeType === 3
    },
    compile:function(node) {
        var nodeAttrs = node.attributes
 
        Array.prototype.slice.call(nodeAttrs).forEach(attr => {
            
            var attrName = attr.name
           
            if(this.isDirective(attrName)) {
                var exp = attr.value
                var dir = attrName.substring(2)
               
                if(this.isEventDirective(dir)) {
                // v-on:click
                compileUtil.eventHandler(node, this.$vm, exp, dir)
                } else {
                // v-show: show  v-if: if
                compileUtil[dir] && compileUtil[dir](node,this.$vm, exp)
                }
                node.removeAttribute(attrName)
                 
            }
        })
    },
    compileText:function(node, reg) {
        console.log('compileText',node, reg)
    },
    compileElement:function(el) {
        var childNodes = el.childNodes
        Array.prototype.slice.call(childNodes).forEach(node => {
            var text = node.textContent
            var reg = /\{\{(.*)\}\}/
            if(this.isElementNode(node)) {
                this.compile(node)
            }
            else if (this.isTextNode(node) && reg.test(text)) {
                this.compileText(node, RegExp.$1.trim())
            }
            if(node.childNodes && node.childNodes.length > 0) {
                this.compileElement(node)
            }
        })
    },
    init:function() {
        this.compileElement(this.$fragment)
    },
    node2Fragment(el) {
        var fragment = document.createDocumentFragment()
        var child;
        
        while(child = el.firstChild) {
            fragment.appendChild(child)
        }
        return fragment
    },
    isDirective:function (attr) {
        return attr.indexOf('v-') === 0
    },
    isEventDirective:function(dir) {
        return dir.indexOf('on') === 0
    }
    
    
}


var compileUtil = {
 bind:function(node, vm, exp, dir) {
     var updaterFn = updater[dir +'Updater']
     updaterFn && updaterFn(node, this._getVMVal(vm, exp))
 },
 text:function (node, vm, exp) {
     this.bind(node, vm, exp, 'text')

 },
 html:function(node,vm, exp) {
    this.bind(node,vm, exp, 'html')
 },
 model:function() {

 },
 class:function() {

 },
 eventHandler:function(node, vm, exp, dir) {
    //  exp为 属性的值
    // dir   eg: v-on:click 里的 on:click
    var eventType = dir.split(':')[1]
    var fn = vm.$options.methods && vm.$options.methods[exp]
    if(eventType && fn) {
        node.addEventListener(eventType, fn.bind(vm), false)
    }

 },
 _getVMVal:function(vm, exp) {
    //exp ===   a.b.c
    console.log(vm,'vm')
    var val = vm
    exp = exp.split('.') // [a,b]
    exp.forEach(k => {
        val = val[k]
    })
    return  val
 },
 _setVMVal:function(vm, exp, value){
    //  exp为 value
    var val = vm
    exp = exp.split('.') // a.b.c 
    exp.forEach((k, i) => {
        if(i < exp.length - 1) {
            val = val[k]
        } else {
            val[k] = value
        }
    })
 }
}
var updater = {
    textUpdater:function (node, value) {
        node.textContent === typeof value === 'undefined' ? '' : value
    },
    htmlUpdater:function(node, value) {
        node.innerHTML = typeof value === 'undefined' ? '' : value
    },
    //用新的 className 替换旧的 className
    classUpdater:function(node, value, oldValue) {
        var className = node.className;
        // 去除空白符
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },
    // input
    modelUpdater: function(node, value) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
}

function watcher () {

}