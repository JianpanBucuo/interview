(function(graph){
        function require(moduleId){ 
          function localRequire(relativePath){
            return require(graph[moduleId].dependecies[relativePath])
          }
          var exports = {};
          (function(require,exports,code){
            eval(code)
          })(localRequire,exports,graph[moduleId].code);
          return exports;
        }
        require('./src/index.js')
      })({"./src/index.js":{"dependecies":{"./b.js":"./src\\b.js"},"code":"\"use strict\";\n\nvar _b = require(\"./b.js\");\n\n// import {parse} from '@babel/parser'\n// import wopay from 'wopay'\nvar a = 1;\nconsole.log('index.js x', _b.x);\n\nvar func = function func() {\n  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '1';\n  return a;\n};"},"./src\\b.js":{"dependecies":{"./c.js":"./src\\c.js"},"code":"\"use strict\";\n\nvar _c = require(\"./c.js\");\n\nvar x = 'in b ';\nmodule[\"export\"] = {\n  x: x\n};"}})