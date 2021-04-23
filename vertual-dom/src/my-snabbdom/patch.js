import Vnode from './vnode'
import createElement from './createElement'
export default function patch(oldVnode, newVnode) {
    //判断 oldValue 是 虚拟节点 还是 Dom节点
    if(oldVnode.sel === undefined) {
        // 包装为虚拟节点
        console.log('oldValue是dom')
        oldVnode =new Vnode(oldVnode.tagName.toLowerCase(), {}, [], '', oldVnode)
    }
    //判断 oldVnode 和 newVnode是否是同一个节点
    if(!sameNode(oldVnode, newVnode)) {
        // 不是同一个节点
        //删除旧的，插入新的
        const newEle = createElement(newVnode)
        console.log(oldVnode.elm)
        newEle && oldVnode.elm.parentNode.insertBefore(newEle,oldVnode.elm)
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    } else {
        // 是同一个节点
        // 精细化比较
    }
    
}
function sameNode(oldVnode, newVnode) {
    return oldVnode.sel === newVnode.sel && oldVnode.data.key === newVnode.data.key
}