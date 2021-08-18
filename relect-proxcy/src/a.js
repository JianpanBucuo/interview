var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Hero = /** @class */ (function () {
    function Hero() {
    }
    Hero.prototype.attack = function () { };
    return Hero;
}());
var decoratorClass = function (func) { return function (targetClass) {
    targetClass.decorator = 'decorator'; // 给目标类增加静态属性
    var prototype = targetClass.prototype;
    prototype.speak = func;
}; };
var Yasuo = /** @class */ (function (_super) {
    __extends(Yasuo, _super);
    function Yasuo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Yasuo.prototype.attack = function () {
        console.log("斩钢闪");
    };
    Yasuo.prototype.speak = function () {
    };
    Yasuo = __decorate([
        decoratorClass(function () { return console.log('higher '); })
    ], Yasuo);
    return Yasuo;
}(Hero));
var eg = new Yasuo();
eg.speak();
function readonly(target, name, descriptor) {
    descriptor.writable = false;
    return descriptor;
}
var Person = /** @class */ (function () {
    function Person() {
        this.name2 = 'person';
    }
    __decorate([
        readonly
    ], Person.prototype, "name2", void 0);
    return Person;
}());
var person = new Person();
person.name2 = 'tom';
