/**
 * 
 * Compile主要做的事情是解析模板指令，将模板中的变量替换成数据
 * 然后初始化渲染页面视图
 * 并将每个指令对应的节点绑定更新函数
 * 添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图 
 */
function Compile (el) {
    this.$el = this.isElementNode(el) ? el: document.querySelector(el)
    if(this.$el) {
        // 将节点转换成文档碎片fragment，进行解析编译操作
        this.$fragment = this.node2Fragment(this.$el)
        this.init()
        this.$el.appendChild(this.$fragment)
    }
}
Compile.prototype = {
    init: function() {
        this.compileElement(this.$fragment)
    },
    node2Fragment:function(el){
        // 将原生节点拷贝到fragment
        var fragment = document.createDocumentFragment()
        var child
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    },
    compileElement:function(el) {
        var childNodes = el.childNodes
        var me = this
        Array.prototype.slice.call(childNodes).forEach(  (node) => {
            var text = node.textContent
            var reg = /\{\{(.*)\}\})/
            // 是否是元素节点
            if(this.isElementNode(node)) {
                this.compile(node)
            }
            // 是否是文本节点
            else if (this.isTextNode(node) && reg.test(text)) {
                // RegExp.$1 最新匹配上的元素
                this.compileText(node,RegExp.$1)
            }
            if(node.childNodes && node.childNodes.length > 0 ){
                this.compileElement(node)
            }
        })
    },

    compile:function() {

    },
    compileText:function() {

    },
    isElementNode:function(node) {
        // nodeType 1 元素节点
        
            return node.nodeType === 1
        },
    isTextNode:function(node) {
        //  nodeType 3 文本节点
        return node.nodeType === 3
    },
}

