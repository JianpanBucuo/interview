import Vnode from './vnode'
//  c可能是children 或者 txt
// h('div', {}, 'txt')
// h('div', {}, [h()])
// h('div', {}, h())
export default function h(sel, data, childrenOrTxt) {

    if(arguments.length !== 3) {
        console.warn('must 3 arguments')
    }
    if(typeof childrenOrTxt === 'string' || typeof childrenOrTxt === 'number') {
        return new Vnode(
            sel,data,[],childrenOrTxt, undefined
        )
    }
    if(Array.isArray(childrenOrTxt)) {
        const children = []
        for(let i = 0; i< childrenOrTxt.length; i++) {
            if(typeof childrenOrTxt[i] !== 'object') {
                console.log(childrenOrTxt[i],'not h function')
            }
            children.push(childrenOrTxt[i])
        }
        return new Vnode(sel, data, children, '', undefined)
    }
    if(typeof childrenOrTxt === 'object' && childrenOrTxt.sel) {
        const children = []
        children.push(childrenOrTxt)
        return new Vnode(sel, data, children, '', undefined)
    }
}