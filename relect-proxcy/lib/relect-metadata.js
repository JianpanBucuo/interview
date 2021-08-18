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
function log(constructor, propertyName, descriptor) {
    let type, paramtypes, returntype;
    type = Reflect.getMetadata('design:type', constructor, propertyName);
    if (descriptor) {
        console.log('-----descriptor');
        paramtypes = Reflect.getMetadata('design:paramtypes', constructor, propertyName);
        returntype = Reflect.getMetadata('design:returntype', constructor, propertyName);
        console.log(propertyName, type, paramtypes, returntype);
    }
    else {
        if (propertyName) {
            console.log('-----propertyName');
            console.log(propertyName, type);
        }
        else {
            console.log('-----else');
            paramtypes = Reflect.getMetadata("design:paramtypes", constructor);
            console.log(constructor, paramtypes);
        }
    }
}
let A = class A {
    constructor(m) {
        this.m = m;
        // ...
    }
    getMes(mes) {
        return mes;
    }
};
A.n = 'hello';
__decorate([
    log,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Number)
], A.prototype, "getMes", null);
__decorate([
    log,
    __metadata("design:type", String)
], A, "n", void 0);
A = __decorate([
    log,
    __metadata("design:paramtypes", [String])
], A);
//# sourceMappingURL=relect-metadata.js.map