// export default function vNode(sel, data, children = [], txt = '',elm) {
//     return {
//         sel,
//         data,
//         children,txt,
//         elm
//     }
// }
export default class Vnode {
    constructor(sel,data, children = [], txt ='', elm) {
        this.sel = sel
        this.data = data
        this.children = children
        this.txt = txt
        this.elm = elm
    }
}
