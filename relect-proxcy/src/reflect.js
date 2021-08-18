var myObject = {
    foo: 1,
    bar: 2,
    get baz() {
      return this.foo + this.bar;
    },
  };
  
  var myReceiverObject = {
    foo: 4,
    bar: 4,
  };
  
  Reflect.get(myObject, 'baz', myReceiverObject) // 8

  var myObject = {
    foo: 1,
    set bar(value) {
      return this.foo = value;
    },
  }
  
  myObject.foo // 1
  
  Reflect.set(myObject, 'foo', 2);
  myObject.foo // 2
  
  Reflect.set(myObject, 'bar', 3)
  myObject.foo // 3


  var myObject = {
    foo: 4,
    set bar(value) {
      return this.foo = value;
    },
  };
  
  var myReceiverObject = {
    foo: 0,
  };
  
  Reflect.set(myObject, 'bar', 1, myReceiverObject);
  myObject.foo // 4
  myReceiverObject.foo // 1



  var myObject = {
    foo: 1,
  };
  
  // 旧写法
  'foo' in myObject // true
  
  // 新写法
  Reflect.has(myObject, 'foo') // true


const myObj = { foo: 'bar' };

// 旧写法
delete myObj.foo;

// 新写法
Reflect.deleteProperty(myObj, 'foo');

// 使用构造函数创建对象
function Greeting(name) {
    this.name = name;
  }
  
  // new 的写法
  const instance = new Greeting('张三');
  
  // Reflect.construct 的写法
  const instance = Reflect.construct(Greeting, ['张三']);