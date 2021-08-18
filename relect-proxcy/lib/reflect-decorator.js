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
const key = 'reflectKey';
let ax = null;
let bx = null;
function modifyClass(param) {
    return (target) => {
        target.prototype.extraProp = param;
        Reflect.defineMetadata(Symbol.for('META_PARAM'), param, target.prototype);
        ax = target;
    };
}
function modefyMethod(target, propertyKey, descriptor) {
    Reflect.defineMetadata(key, 'Hello Reflect', target);
    const func = descriptor.value;
    bx = target;
    descriptor.value = function () {
        console.log(`Before ${propertyKey} excuted`);
        func.apply(this, arguments);
    };
}
function modefyProp(target, propertyKey) {
    target[propertyKey] = 'Hello Decorator Prop';
}
function protertyDe(target, name, index) {
    console.log(target, name, index, '参数装饰器');
}
let A = class A {
    say(string) {
        console.log('say hi');
        let str = Reflect.getMetadata(key, this);
        console.log(str);
    }
};
__decorate([
    modefyProp,
    __metadata("design:type", String)
], A.prototype, "type", void 0);
__decorate([
    modefyMethod,
    __param(0, protertyDe),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], A.prototype, "say", null);
A = __decorate([
    modifyClass('new Prop') // 在原型上增加新的属性
], A);
const a = new A();
a.type = '1';
console.log(a.__proto__);
a.say('111');
console.log('---');
console.log(ax.prototype, bx, ax.prototype === bx);
//# sourceMappingURL=reflect-decorator.js.map