// export default function vNode(sel, data, children = [], txt = '',elm) {
//     return {
//         sel,
//         data,
//         children,txt,
//         elm
//     }
// }
/**
 * @param sel 选择器String
 * @param data 属性集合
 * @param children 子节点
 * @param tex 字符串
 * @param elm Dom节点
 */
export default class Vnode {
    constructor(sel,data, children = [], txt ='', elm) {
        this.sel = sel
        this.data = data
        this.children = children
        this.txt = txt
        this.elm = elm
    }
}
