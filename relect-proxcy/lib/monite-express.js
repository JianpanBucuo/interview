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
exports.UserController = exports.Query = exports.Body = exports.Post = exports.Get = exports.createdMethod = exports.Controller = void 0;
require("reflect-metadata");
const METHOD_METADETA = 'method';
const PATH_METADETA = 'path';
const PARAMS_METADETA = 'params';
function Controller(path) {
    return (target) => {
        //给当前类添加一个元数据
        Reflect.defineMetadata(PATH_METADETA, path, target);
    };
}
exports.Controller = Controller;
function createdMethod(methods) {
    return (path) => {
        return (target, key, descriptor) => {
            //给类的属性添加属性，描述当前属性的路径
            Reflect.defineMetadata(PATH_METADETA, path, target, key);
            //添加方法元数据，描述当前方法为什么方法
            Reflect.defineMetadata(METHOD_METADETA, methods, target, key);
        };
    };
}
exports.createdMethod = createdMethod;
function createParams(param) {
    return (field) => {
        return (target, name, index) => {
            let params = Reflect.getMetadata(PARAMS_METADETA, new target.constructor(), name) || [];
            console.log(params, 'parasm');
            params.push({ key: param, index: index, field: field });
            console.log('target', target, name);
            Reflect.defineMetadata(PARAMS_METADETA, params, target, name);
        };
    };
}
//要想加其他的装饰器用这个方法在添加就行了
exports.Get = createdMethod('get');
exports.Post = createdMethod('post');
exports.Body = createParams("body");
exports.Query = createParams("query");
//   @ts-ignore
let UserController = class UserController {
    add(body, query) {
        //   @ts-ignore
        console.log(body);
        return {
            a: 11
        };
    }
};
__decorate([
    exports.Post('/test'),
    __param(0, exports.Body()), __param(1, exports.Query('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "add", null);
UserController = __decorate([
    Controller('/User')
], UserController);
exports.UserController = UserController;
const a = new UserController();
a.add({}, {});
console.log('outpath', Reflect.getMetadata('path', UserController));
console.log('innerpath', Reflect.getMetadata('path', a, 'add'));
console.log('param', Reflect.getMetadata(PARAMS_METADETA, a, 'add'));
//# sourceMappingURL=monite-express.js.map