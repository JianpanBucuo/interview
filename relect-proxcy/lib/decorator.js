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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
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
};
class Parent1 {
    constructor() {
        this.c1 = () => {
            console.log('this is child');
        };
    }
    p1() {
        console.log('this is parent1');
    }
}
class Parent2 {
    constructor() {
        this.c1 = () => {
            console.log('this is child');
        };
    }
    p2() {
        console.log('this is parent2');
    }
}
class Parent3 {
    constructor() {
        this.c1 = () => {
            console.log('this is child');
        };
    }
    p3() {
        console.log('this is parent3');
    }
}
let Child = class Child {
    constructor() {
        this.c1 = () => {
            console.log('this is child');
        };
    }
};
Child = __decorate([
    mixin(Parent1, Parent2, Parent3)
], Child);
const child = new Child();
console.log(child.p1());
const throttle = (time) => {
    let prev = new Date();
    return (target, name, descriptor) => {
        const func = descriptor.value;
        if (typeof func === 'function') {
            descriptor.value = function (...args) {
                const now = new Date();
                if (now.getTime() - prev.getTime() > time) {
                    func.apply(this, args);
                    prev = new Date();
                }
            };
        }
    };
};
class Methods {
    scroll() {
    }
}
__decorate([
    throttle(300),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Methods.prototype, "scroll", null);
//# sourceMappingURL=decorator.js.map