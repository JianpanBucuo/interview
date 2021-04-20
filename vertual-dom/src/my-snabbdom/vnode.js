export default function vNode(sel, data, children = [], txt = '',elm) {
    return {
        sel,
        data,
        children,txt,
        elm
    }
}