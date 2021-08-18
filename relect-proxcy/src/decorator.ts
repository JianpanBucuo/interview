import "reflect-metadata";
const mixin = (...mixins) => (targetClass) => {
    mixins = [targetClass, ...mixins];
    function copyProperties(target, source) {
      for (let key of Reflect.ownKeys(source)) {
        if (key !== 'constructor'
          && key !== 'prototype'
          && key !== 'name'
        ) {
          let desc = Object.getOwnPropertyDescriptor(source, key);
          Object.defineProperty(target, key, desc);
        }
      }
    }
    // class Mixin {
    //   constructor( ) {
    //     for (let mixin of mixins) {
    //       copyProperties(this, new mixin( )); // 拷贝实例属性
    //     }
        
    //   }
    //   c1 = () => {
    //     console.log('this is child')
    // }
    // }
  
    // for (let mixin of mixins) {
    //   copyProperties(Mixin, mixin); // 拷贝静态属性
    //   copyProperties(Mixin.prototype, mixin.prototype); // 拷贝原型属性
    // }
    // return Mixin;
    return new Proxy(targetClass, {
        construct(target, args) {
          const obj = new target(...args);
          for (let mixin of mixins) {
              copyProperties(obj, new mixin()); // 拷贝实例属性
          }
          return obj;
        }
      });

  }
  
  class Parent1 {
    p1() {
        console.log('this is parent1')
    }
    c1 = () => {
        console.log('this is child')
    }
}
class Parent2 {
    p2() {
        console.log('this is parent2')
    }
    c1 = () => {
        console.log('this is child')
    }
}
class Parent3 {
    p3() {
        console.log('this is parent3')
    }
    c1 = () => {
        console.log('this is child')
    }
}
@mixin(Parent1, Parent2, Parent3)
class Child {
    c1 = () => {
        console.log('this is child')
    }
}
const child = new Child();
console.log((child as any).p1());


const throttle = (time) => {
    let prev = new Date()
    return (target, name, descriptor) => {
        const func = descriptor.value
        if(typeof func === 'function') {
            descriptor.value = function(...args) {
                const now = new Date()
                if(now.getTime() - prev.getTime() > time) {
                    func.apply(this, args)
                    prev = new Date()
                }
                
            }
        }
    }
}

class Methods {
    @throttle(300)
    scroll() {

    }
}