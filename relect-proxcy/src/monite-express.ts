import "reflect-metadata";

const METHOD_METADETA = 'method'
const PATH_METADETA = 'path'
const PARAMS_METADETA = 'params'
export function Controller(path: string): ClassDecorator {
    return (target) => {
      //给当前类添加一个元数据
      Reflect.defineMetadata(PATH_METADETA, path, target);
    }
  }
  export function createdMethod(methods: string) {
    return (path: string): MethodDecorator => {
      return (target: any, key: string | symbol, descriptor: any) => {
        //给类的属性添加属性，描述当前属性的路径
        Reflect.defineMetadata(PATH_METADETA, path, target, key);
        //添加方法元数据，描述当前方法为什么方法
        Reflect.defineMetadata(METHOD_METADETA, methods, target, key)
      }
    }
  }
  function createParams(param:string) {
    return (field?:string) => {
      return (target: any, name: string, index: number) => {
        let params =
          Reflect.getMetadata(PARAMS_METADETA,new target.constructor(), name) || [];
          console.log(params,'parasm')
        params.push({ key: param, index: index,field:field });
        console.log('target',target, name)
        Reflect.defineMetadata(PARAMS_METADETA, params, target, name);
      };
    };
  }
  //要想加其他的装饰器用这个方法在添加就行了
export const Get = createdMethod('get')
export const Post = createdMethod('post')


export const Body = createParams("body");
export const Query = createParams("query");

    //   @ts-ignore
@Controller('/User')
export class UserController{

  @Post('/test')
  add(@Body() body:any,@Query('user') query:any){
          //   @ts-ignore
          console.log(body)
   
    return {
      a:11
    }
  }

}
const  a = new UserController()
a.add({},{})
console.log('outpath',Reflect.getMetadata('path',UserController))
console.log('innerpath',Reflect.getMetadata('path',a, 'add'))
console.log('param',Reflect.getMetadata(PARAMS_METADETA,a,'add'))