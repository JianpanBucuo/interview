
import h from './h'
import patch from './patch'
const container = document.getElementById('container')
const Vnode1 =  h('div', {
key:1
},[
    h('h3', {}, '标题'),
    h('h4', {}, '副标题'),
    h('ul',{}, [
        h('li', {}, '内容1'),
        h('ol', {}, [
            h('li', {}, '内容2'),
            h('li', {}, '内容3'),
        ]),
    ]),
    h('p',  {},
        h('span', {}, '页脚'),
     )
])
const Vnode2 =  h('div', {
key:2
},[
    h('h3', {}, '标题AAA'),
 
])
patch(container, h('h1', {key:3}, Vnode1))

const btn = document.getElementById('btn')
btn.onclick= () => {
    patch(Vnode1,Vnode2)
}