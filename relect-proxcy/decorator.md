首先所有的对类的修饰，都是定义在类这个对象上面的，而所有的对类的属性或者方法的修饰，都是定义在类的原型上面的

## 装饰器

1. 类装饰器
2. 属性装饰器
3. 方法装饰器
   `可以通过高阶函数，给装饰器传参`

##### 类装饰器

类装饰器接收一个`目标类`作为参数，可以给目标类增加静态属性

除了更改目标类，还可以通过修改原型，给实例添加新的属性

如果返回了一个类，就可以把原来的那个类替换掉。

```ts
// 原型上增加方法
const decoratorClass = (func) => (targetClass) => {
  const prototype = targetClass.prototype
  prototype.speak = func
}
// 增加静态属性
const decoratorClass2 = (targetClass) => {
  targetClass.decorator = 'decorator'
}
class Hero {
  attack() {}
}
@decoratorClass(() => console.log('higher'))
class Yasuo extends Hero {
  speak() {}
}
const yasuo = new Yasuo()
yasuo.speak()

class Cat {
  constructor() {
    console.log('喵！')
  }
}
// 返回类的方法和属性必须和之前类的方法和属性相同
function mewing(num: number) {
  return (target: any) => {
    return class Dog {
      constructor() {
        for (let i = 0; i < num; i++) console.log('汪！')
      }
    }
  }
}

new Cat() // 汪 汪
```

##### 属性装饰器

属性装饰器表达式会在运行时当做函数被调用，传入 2 个参数

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
2. 成员的名字

```ts
const DefaultValue = (value: string) => (target: any, propertyName: string) => {
  target[propertyName] = value
}

class Hello {
  @DefaultValue('212') greeting: string
}
var a = new Hello()
console.log(a.greeting) // 212
```

##### 方法装饰器

方法装饰器表达式会在运行时当做函数被调用，参入下列 3 个参数

1. 对于静态成员来说是类的构造函数，对于实例成员是`类的原型对象`
2. 成员的名字
3. 成员的属性描述符
   `注意 如果代码输出目标版本小于ES5，属性描述符将会是undefined`
   如果方法装饰器返回一个值，它会被用作方法的属性描述符
   `注意 如果代码输出目标版本小于ES5返回值会被忽略。`

```ts
function time(target, name, descriptor) {
  const func = descriptor.value
  if (typeof func === 'function') {
    descriptor.value = function (...args) {
      console.time()
      const result = func.apply(this, args)
      console.timeEnd()
      return result
    }
  }
}

class Person {
  @time
  say(a) {
    console.log('hello', a)
    return {
      a: '1'
    }
  }
}
const person = new Person()
person.say('2', '333')
```

##### 参数装饰器

参数装饰器声明在一个参数声明之前

参数装饰器应用于类构造函数或方法声明

参数装饰器表达式会在运行时当做函数被调用，参入下列三个参数

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
2. `该方法的名字`
3. 参数在函数参数列表中的索引

```ts
function protertyDe(target, name, index) {
  console.log(target, name, index)
}
```

#### 装饰器执行顺序

```ts
// 装饰器的执行顺序
// 类装饰器
function clazz() {
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
function property2(value: any) {
  console.log('属性装饰器：执行前')
  return (t: any, k: any) => {
    console.log('属性装饰器：执行后')
  }
}
function parameter1() {
  console.log('参数装饰器1 before')
  return (t: any, k: any, i: any) => {
    console.log('参数装饰器1 after')
  }
}

function parameter2() {
  console.log('参数装饰器2 before')
  return (t: any, k: any, i: any) => {
    console.log('参数装饰器2 after')
  }
}

@clazz()
class CallSequence {
  @property2('2') property: undefined
  @method()
  abc() {
    console.log('abc')
  }
  @method()
  ab2c(@parameter1() a, @parameter2() b) {
    console.log('abc')
  }
}
// 属性装饰器：执行前
// 属性装饰器：执行后
// 方法装饰器：执行前
// 方法装饰器： 执行后
// 方法装饰器：执行前
// 参数装饰器1 before
// 参数装饰器2 before
// 参数装饰器2 after
// 参数装饰器1 after
// 方法装饰器： 执行后
// 类装饰器：执行前
// 类装饰器：执行后
```

先执行方法和属性装饰器，谁先定义先执行谁

如执行方法装饰器时，遇到参数装饰器，先执行参数装饰器

最后执行类装饰器
