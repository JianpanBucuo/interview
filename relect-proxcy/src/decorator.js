"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
require("reflect-metadata");
var mixin = function () {
    var mixins = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        mixins[_i] = arguments[_i];
    }
    return function (targetClass) {
        mixins = __spreadArray([targetClass], mixins);
        function copyProperties(target, source) {
            for (var _i = 0, _a = Reflect.ownKeys(source); _i < _a.length; _i++) {
                var key = _a[_i];
                if (key !== 'constructor'
                    && key !== 'prototype'
                    && key !== 'name') {
                    var desc = Object.getOwnPropertyDescriptor(source, key);
                    Object.defineProperty(target, key, desc);
                }
            }
        }
        var Mixin = /** @class */ (function () {
            function Mixin() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                this.c1 = function () {
                    console.log('this is child');
                };
                console.log(args);
                for (var _a = 0, mixins_2 = mixins; _a < mixins_2.length; _a++) {
                    var mixin_1 = mixins_2[_a];
                    copyProperties(this, new (mixin_1.bind.apply(mixin_1, __spreadArray([void 0], args)))()); // 拷贝实例属性
                }
            }
            return Mixin;
        }());
        for (var _i = 0, mixins_1 = mixins; _i < mixins_1.length; _i++) {
            var mixin_2 = mixins_1[_i];
            copyProperties(Mixin, mixin_2); // 拷贝静态属性
            copyProperties(Mixin.prototype, mixin_2.prototype); // 拷贝原型属性
        }
        return Mixin;
    };
};
var Parent1 = /** @class */ (function () {
    function Parent1() {
        this.c1 = function () {
            console.log('this is child');
        };
    }
    Parent1.prototype.p1 = function () {
        console.log('this is parent1');
    };
    return Parent1;
}());
var Parent2 = /** @class */ (function () {
    function Parent2() {
        this.c1 = function () {
            console.log('this is child');
        };
    }
    Parent2.prototype.p2 = function () {
        console.log('this is parent2');
    };
    return Parent2;
}());
var Parent3 = /** @class */ (function () {
    function Parent3() {
        this.c1 = function () {
            console.log('this is child');
        };
    }
    Parent3.prototype.p3 = function () {
        console.log('this is parent3');
    };
    return Parent3;
}());
var Child = /** @class */ (function () {
    function Child() {
        this.c1 = function () {
            console.log('this is child');
        };
    }
    Child = __decorate([
        mixin(Parent1, Parent2, Parent3)
    ], Child);
    return Child;
}());
var child = new Child();
console.log(child);
