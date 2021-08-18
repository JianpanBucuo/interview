"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
class Hero {
    attack() { }
}
// 类装饰器
const decoratorClass = (func) => (targetClass) => {
    targetClass.decorator = 'decorator'; // 给目标类增加静态属性
    const prototype = targetClass.prototype;
    prototype.speak = func;
};
let Yasuo = class Yasuo extends Hero {
    attack() {
        console.log("斩钢闪");
    }
    speak() {
    }
};
Yasuo = __decorate([
    decoratorClass(() => console.log('higher '))
], Yasuo);
const eg = new Yasuo();
eg.speak();
// 属性装饰器
const DefaultValue = (value) => (target, propertyName) => {
    target[propertyName] = value;
};
class Hello {
    constructor() {
        this.greeting = '1';
    }
}
__decorate([
    DefaultValue('212'),
    __metadata("design:type", String)
], Hello.prototype, "greeting", void 0);
var a = new Hello();
console.log(a.greeting);
//  方法装饰器
function time(target, name, descriptor) {
    const func = descriptor.value;
    if (typeof func === 'function') {
        descriptor.value = function (...args) {
            console.time();
            func.apply(this, args);
            console.timeEnd();
        };
    }
}
function enumerable(value) {
    return function (target, propertyKey, descriptor) {
        descriptor.enumerable = value;
    };
}
function time2(target, name, descriptor) {
    const func = descriptor.value;
    if (typeof func === 'function') {
        descriptor.value = function (...args) {
            func.apply(this, args);
        };
    }
}
class Person {
    say(a, v) {
        console.log('hello', a, v);
    }
}
__decorate([
    time, time2,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], Person.prototype, "say", null);
const person = new Person();
person.say('2', '333');
// 多重继承
const mixin = (...mixins) => (targetClass) => {
    mixins = [targetClass, ...mixins];
    function copyProperties(target, source) {
        for (let key of Reflect.ownKeys(source)) {
            if (key !== 'constructor'
                && key !== 'prototype'
                && key !== 'name') {
                let desc = Object.getOwnPropertyDescriptor(source, key);
                Object.defineProperty(target, key, desc);
            }
        }
    }
    class Mixin {
        constructor(...args) {
            for (let mixin of mixins) {
                copyProperties(this, new mixin(...args));
            }
        }
    }
    for (let mixin of mixins) {
        copyProperties(Mixin, mixin); // 拷贝静态属性
        copyProperties(Mixin.prototype, mixin.prototype); // 拷贝原型属性
    }
    return Mixin;
};
const requiredMetadataKey = Symbol("required");
console.log;
function required(target, propertyKey, parameterIndex) {
    let existingRequiredParameters = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}
let Cat = class Cat {
    constructor() {
        console.log("喵！");
    }
    cute() {
        console.log('cut');
    }
};
Cat = __decorate([
    mewing(2),
    __metadata("design:paramtypes", [])
], Cat);
function mewing(num) {
    return (target) => {
        return class Dog {
            constructor() {
                for (let i = 0; i < num; i++)
                    console.log("汪！");
            }
            cute() {
                console.log('1');
            }
        };
    };
}
function enumerable2(value) {
    return function (target, key, descriptor) {
        descriptor.enumerable = value;
    };
}
new Cat();
function emoji(target, propertyKey, paramIndex) {
    let params = [];
    params[paramIndex] = '234';
    target.cute = target[propertyKey].bind(target, ...params);
}
// 装饰器的执行顺序
// 类装饰器
function clazz() {
    console.log('类装饰器：执行前');
    return (target) => {
        console.log('类装饰器：执行后');
    };
}
// 方法装饰器
function method() {
    console.log('方法装饰器：执行前');
    return (t, k, p) => {
        console.log('方法装饰器： 执行后');
    };
}
// 属性装饰器
function property2(value) {
    console.log('属性装饰器：执行前');
    return (t, k) => {
        console.log('属性装饰器：执行后');
    };
}
function parameter1() {
    console.log("参数装饰器1 before");
    return (t, k, i) => {
        console.log("参数装饰器1 after");
    };
}
function parameter2() {
    console.log("参数装饰器2 before");
    return (t, k, i) => {
        console.log("参数装饰器2 after");
    };
}
let CallSequence = class CallSequence {
    abc() {
        console.log('abc');
    }
    ab2c(a, b) {
        console.log('abc');
    }
};
__decorate([
    method(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CallSequence.prototype, "abc", null);
__decorate([
    property2('2'),
    __metadata("design:type", void 0)
], CallSequence.prototype, "property", void 0);
__decorate([
    method(),
    __param(0, parameter1()), __param(1, parameter2()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CallSequence.prototype, "ab2c", null);
CallSequence = __decorate([
    clazz()
], CallSequence);
//# sourceMappingURL=a.js.map