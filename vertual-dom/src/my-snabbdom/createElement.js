
export default function createElement(VNode) {
    let domNode = document.createElement(VNode.sel)
    // 子节点还是文本
    if(VNode.text !== '' &&  VNode.children.length === 0) {
        console.log('内部是文本节点')
        domNode.innerText = VNode.txt
        VNode.elm = domNode
    } else if (VNode.children.length > 0) {
        //有子节点
        for(let i = 0; i < VNode.children.length ; i++) {
            const ch = VNode.children[i]
            const chDom = createElement(ch)
            domNode.appendChild(chDom)
            VNode.elm = domNode
        }
    }
    // 返回Dom
    return VNode.elm 
}