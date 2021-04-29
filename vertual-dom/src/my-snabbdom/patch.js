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
    console.log(sameNode(oldVnode, newVnode))
    if(!sameNode(oldVnode, newVnode)) {
        // 不是同一个节点
        //删除旧的，插入新的
        const newEle = createElement(newVnode)
        console.log(oldVnode.elm)
        newEle && oldVnode.elm.parentNode.insertBefore(newEle,oldVnode.elm)
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    } else {
        // 是同一个节点
        if(newVnode === oldVnode) {return}
        // 精细化比较
        // newVnode有text
        if(newVnode.txt !== '' && newVnode.children.length === 0) {
            console.log('新Vnode有text属性没有children')
            if(newVnode.txt !== oldVnode.txt) {
                oldVnode.elm.innerText = newVnode.txt
            }
        } else {
            console.log('新Vnode没有text属性有children')
            if(oldVnode.children.length > 0) {
                console.log('老节点有children')
            } else {
                console.log('老节点没有children')
                oldVnode.innerText = ''
                for(let i = 0; i< newVnode.children.length; i++ ){
                    const chDom = createElement(newVnode.children[i])
                    oldVnode.elm.appendChild(chDom)
                }
            }
        }
    }
}
function sameNode(oldVnode, newVnode) {
    return oldVnode.sel === newVnode.sel && oldVnode.data.key === newVnode.data.key
}