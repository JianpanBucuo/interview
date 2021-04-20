
import h from './h'
import patch from './patch'
const container = document.getElementById('container')
const Vnode =  h('div', {

},[
    h('h3', {}, '标题'),
    h('h4', {}, '副标题'),
    h('ul',{}, [
        h('li', {}, '内容1'),
        h('li', {}, '内容2'),
    ]),
    h('p',  {},
        h('span', {}, '页脚'),
     )
])
patch(container, h('h1', {}, '你好'))