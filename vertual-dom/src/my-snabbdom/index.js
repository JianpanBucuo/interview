
import h from './h'
import patch from './patch'
const container = document.getElementById('container')


const Vnode3 =  h('div', {
    key:3
    },h('ul', {}, [
        h('li', {}, 'AAA')
    ]))
patch(container,Vnode3)

const btn = document.getElementById('btn')
btn.onclick= () => {
    patch(Vnode3, h('section', {
        key:3
        },h('ul', {}, [
            h('li', {}, 'AAA'),
            h('li', {}, 'AAAA')
        ])))
}