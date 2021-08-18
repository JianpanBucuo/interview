import 'reflect-metadata';
 
type constructor<T = any> = new(...args:Array<any>) =>T

function log<T> (constructor: constructor<T>| {}, propertyName?:string, descriptor?: PropertyDescriptor) {
    let type:Function,
        paramtypes: Array<Function>,
        returntype:Function
    
        type = Reflect.getMetadata('design:type', constructor, propertyName)
        if(descriptor) {
            console.log('-----descriptor')
            paramtypes = Reflect.getMetadata('design:paramtypes', constructor, propertyName)
            returntype = Reflect.getMetadata('design:returntype', constructor, propertyName)
            console.log(propertyName, type, paramtypes, returntype)
        } else {
            if(propertyName) {
                console.log('-----propertyName')
                console.log(propertyName,type);
            }
            else {
                console.log('-----else')
                paramtypes = Reflect.getMetadata("design:paramtypes",constructor);
                console.log(constructor,paramtypes);
            }
        }
}

@log
class A {
    @log
    static n: string = 'hello';
    constructor(private m: string) {
        // ...
    }
    @log
    getMes(mes:number): number {
        return mes;
    }
}