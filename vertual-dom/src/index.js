import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
  } from "snabbdom";
  


const patch = init(  [  classModule,
    propsModule,
    styleModule,
    eventListenersModule])
const myVnode1 = h('a', {
    props:{
        href:'https://www.baidu.com',
        target:'_blank'
    },
},'aaaaaas')
console.log(myVnode1)
const myVnode2 = h('div', {
    props:{
         class:'div-class'
    },
},'盒子')
const myVnode3= h('div', {
    props:{
         class:'div-class'
    },  
},[
    myVnode2,myVnode1
])

const Vnode4 = h('ul', {},[
    h('li',{
        key:1
    },'a'),
    h('li',{
        key:2
    },'b'),
    h('li',{
        key:3
    },'c')
])
const Vnode5 = h('ul', {},[
    h('li',{ key:4},'d'),
    h('li',{ key:1},'a'),
    h('li',{ key:2},'b'),
    h('li',{ key:3},'c')
    
])

 
const container = document.getElementById('container')
const btn = document.getElementById('btn')

btn.onclick = function() {
    patch(Vnode4, Vnode5)
}
// 虚拟节点上树
// patch(container, myVnode1)

patch(container, Vnode4)
// const patch = init([
//     // Init patch function with chosen modules
//     classModule, // makes it easy to toggle classes
//     propsModule, // for setting properties on DOM elements
//     styleModule, // handles styling on elements with support for animations
//     eventListenersModule, // attaches event listeners
//   ]);
  
//   const container = document.getElementById("container");
//   const someFn = ()=> {
//       console.log('some fn')
//   }
//   const anotherEventHandler = () => {
//       console.log('another')
//   }
//   const vnode = h("div#container.two.classes", { on: { click: someFn } }, [
//     h("span", { style: { fontWeight: "bold" } }, "This is bold"),
//     " and this is just normal text",
//     h("a", { props: { href: "/foo" } }, "I'll take you places!"),
//   ]);
//   // Patch into empty DOM element – this modifies the DOM as a side effect
//   patch(container, vnode);
  
//   const newVnode = h(
//     "div#container.two.classes",
//     { on: { click: anotherEventHandler } },
//     [
//       h(
//         "span",
//         { style: { fontWeight: "normal", fontStyle: "italic" } },
//         "This is now italic type"
//       ),
//       " and this is still just normal text",
//       h("a", { props: { href: "/bar" } }, "I'll take you places!"),
//     ]
//   );
//   // Second `patch` invocation
//   patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state

