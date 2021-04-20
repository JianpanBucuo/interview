export default function createElement(VNode,pivot) {
    // 将节点插入到pivot标杆之前
    let domNode = document.createElement(VNode.sel)
    // 子节点还是文本
    console.log(VNode)
    if(VNode.text !== '' &&  VNode.children.length === 0) {
        console.log('内部是文本节点')
        domNode.innerText = VNode.txt
        pivot.parentNode.insertBefore(domNode,pivot )
    } else if (VNode.children.length > 0) {
        //有子节点
    }
}