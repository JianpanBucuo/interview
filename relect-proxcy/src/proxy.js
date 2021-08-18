var person = {
    name: "张三"
  };
  

  var proxy = new Proxy(person, {
      get(target, propKey) {
          if(propKey in target) {
              return target[propKey]
          }
          throw new Error('111')
      }
  })