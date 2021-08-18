import "reflect-metadata";
class Hero {
    attack() {}
}

 
// 类装饰器
const decoratorClass =(func) => (targetClass) => {
    targetClass.decorator = 'decorator' // 给目标类增加静态属性
    const prototype = targetClass.prototype
    prototype.speak = func
    }
 
@decoratorClass(() => console.log('higher '))
class Yasuo extends Hero {
    
    attack() {
        console.log("斩钢闪");
    }
    speak() {

    }
}
const eg = new Yasuo()
eg.speak()

// 属性装饰器
const DefaultValue =(value: string)  =>(target: any, propertyName: string ) => {
        target[propertyName] = value;
     
}
 
class Hello {
    @DefaultValue('212') greeting: string = '1';
}

var a = new Hello()
console.log(a.greeting)

//  方法装饰器
function time(target, name, descriptor) {
    const func = descriptor.value;
    if (typeof func === 'function') {
        descriptor.value = function(...args) {
            console.time();
             func.apply(this, args);
            console.timeEnd();
        }
    }
}
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}
function time2(target, name, descriptor) {
    const func = descriptor.value
    if(typeof func === 'function') {
        descriptor.value = function(...args) {
            func.apply(this, args)
        }
    }
}
class Person {
    @time@time2
    say(a,v) {
        console.log('hello',a,v)
    }
}
const person = new Person();
person.say('2','333');

// 多重继承


const mixin = (...mixins) => (targetClass) => {
    mixins = [targetClass, ...mixins]
    function copyProperties(target, source) {
        for(let key of Reflect.ownKeys(source)) {
            if(key !== 'constructor'
                && key !== 'prototype'
                && key !== 'name') {
                    let desc = Object.getOwnPropertyDescriptor(source, key)
                    Object.defineProperty(target, key, desc)
            }   
        }
    }
    class Mixin {
        constructor(...args) {
            for(let mixin of mixins) {
                copyProperties(this, new mixin(...args));
            }
        }
    }
    for (let mixin of mixins) {
        copyProperties(Mixin, mixin); // 拷贝静态属性
        copyProperties(Mixin.prototype, mixin.prototype); // 拷贝原型属性
      }
      return Mixin;
    
}

const requiredMetadataKey = Symbol("required");

console.log
function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}



@mewing(2)
class Cat {
  constructor() {
    console.log("喵！");
  }
  cute() {
      console.log('cut')
  }
}

function mewing(num: number) {
  return (target: any) => {
    return class Dog {
      constructor() {
        for (let i = 0; i < num; i++) console.log("汪！");
      } 
      cute() {
        console.log('1')
      }
    };
  };
}
function enumerable2(value: boolean) {
    return function(target: any, key:string, descriptor: TypedPropertyDescriptor<any>) {
        descriptor.enumerable = value
    }
}

new Cat();



function emoji(target:any, propertyKey:string, paramIndex: number) {
    let params = []
    params[paramIndex] = '234'
    target.cute = target[propertyKey].bind(target,...params)
}


// 装饰器的执行顺序
// 类装饰器
function  clazz() {
    console.log('类装饰器：执行前')
    return (target: any) => {
        console.log('类装饰器：执行后')
    }
}
// 方法装饰器
function method() {
    console.log('方法装饰器：执行前')
    return (t: any, k: any, p: any) => {
        console.log('方法装饰器： 执行后')
    }
}
// 属性装饰器
function property2(value:any) {
    console.log('属性装饰器：执行前')
    return (t: any, k: any) => {
        console.log('属性装饰器：执行后')
    }
}
function parameter1() {
    console.log("参数装饰器1 before");
    return (t: any, k: any, i: any) => {
      console.log("参数装饰器1 after");
    };
  }
  
  function parameter2() {
    console.log("参数装饰器2 before");
    return (t: any, k: any, i: any) => {
      console.log("参数装饰器2 after");
    };
  }
  
  
@clazz()
class CallSequence{
    
    @method()
    abc() {
        console.log('abc')
    }
    @property2('2') property: undefined
    @method()
    ab2c(@parameter1() a, @parameter2() b) {
        console.log('abc')
    }
}