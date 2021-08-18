import 'reflect-metadata';
 const key = 'reflectKey'
 let ax = null;
 let bx = null
function modifyClass (param:string) {
    return (target) => {
        target.prototype.extraProp = param
        Reflect.defineMetadata(Symbol.for('META_PARAM'), param, target.prototype)
        ax = target

    }
}
function modefyMethod(target, propertyKey:string, descriptor:PropertyDescriptor) {
    Reflect.defineMetadata(key, 'Hello Reflect', target)
    const func = descriptor.value
    bx = target
    descriptor.value = function () {
        console.log(`Before ${propertyKey} excuted`)
        func.apply(this, arguments)
    }
}

function modefyProp(target, propertyKey) {
    target[propertyKey] = 'Hello Decorator Prop'
}
function protertyDe(target, name, index) {
    console.log(target, name, index,'参数装饰器')
  }

@modifyClass('new Prop') // 在原型上增加新的属性
class A {

     @modefyProp public type: string 

    @modefyMethod
    say(@protertyDe string) {
        console.log('say hi')
        let str = Reflect.getMetadata(key, this)
        console.log(str)
    }
}

const a = new A()
a.type= '1'
console.log((a as any).__proto__ )
a.say('111')
console.log('---')
console.log(ax.prototype ,bx,ax.prototype === bx )