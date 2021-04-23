class Vnode {
    constructor(sel,data, children = [], txt ='', elm) {
        this.sel = sel
        this.data = data
        this.children = children
        this.txt = txt
        this.elm = elm
    }
}

function h (sel, data, childrenOrTxt) {
    if(arguments.length !== 3) {
        console.log('warning: must 3 arguments')
    }
    if(typeof childrenOrTxt === 'string' || typeof childrenOrTxt === 'number') {
        return new Vnode(sel, data,[], childrenOrTxt, undefined)
    }
    if(Array.isArray(childrenOrTxt)) {
        const children = []
        for(let i =0; i< childrenOrTxt.length; i++) {
            if(typeof childrenOrTxt[i] !== 'object') {
                console.log(childrenOrTxt[i], 'not a function')
            }
            children.push(childrenOrTxt[i])
        }
        return new Vnode(sel, data,children,'', undefined)
    }
    if(typeof childrenOrTxt === 'object' && childrenOrTxt.sel) {
        const children = []
        children.push(childrenOrTxt)
        return new Vnode(sel, data, children, '', undefined)
     }
}
function  createElement(Vnode) {
    const domNode = document.createElement(Vnode.sel)
    if(Vnode.text !== '' && Vnode.children.length === 0) {
        console.log('内部是文本节点')
        domNode.innerText = Vnode.txt
        Vnode.elm = domNode
    }
    if(Vnode.children.length > 0) {
        for(let i = 0; i<Vnode.children.length; i++) {
            const ch = Vnode.children[i]
            const chDom = createElement(ch)
            domNode.appendChild(chDom)
        }
        Vnode.elm = domNode
    }
    return Vnode
}
function patch(oldVnode, newVnode) {
    // 
    if(oldVnode.sel === undefined) {
        oldVnode = new Vnode(oldVnode)
    }
    if(!sameNode(oldVnode, newVnode)) {
        const newEle = createElement(newVnode)
        newEle && oldVnode.elm.parentNode.insertBefore(newEle,oldVnode.elm)
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
}
function  sameNode(oldVnode,newVnode) {
    return oldVnode.sel === newVnode.sel && oldVnode.data.key === newVnode.data.key
}
const node1 = h('div',{},[
    h('ul', {}, [
        h('li', {}, 'line 1'),
        h('li',{}, 'line2')
    ])
])
