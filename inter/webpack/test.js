const fs = require('fs')
const path = require('path')
const options = require('./webpack.config')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')

const Parser = {
  getAst: path => {
    // 读取入口文件
    const content = fs.readFileSync(path, 'utf-8')
    // 将文件内容转为AST抽象语法树
    return parser.parse(content, {
      sourceType: 'module'
    })
  },
  getDependecies: (ast, filename) => {
    const dependecies = {}
    // 遍历所有的 import 模块,存入dependecies
    traverse(ast, {
      // 类型为 ImportDeclaration 的 AST 节点 (即为import 语句)
      ImportDeclaration({ node }) {
        const dirname = path.dirname(filename)
        // 保存依赖模块路径,之后生成依赖关系图需要用到
        const filepath = './' + path.join(dirname, node.source.value)
        dependecies[node.source.value] = filepath
      }
    })
    return dependecies
  },
  getCode: ast => {
    // AST转换为code
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })
    return code
  }
}
class Compiler {
    constructor(options) {
      const { entry, output } = options;
      this.entry = entry;
      this.output = output;
      this.modules = [];
    }
    // 构建启动
    run() {
      const info = this.build(this.entry);
      this.modules.push(info);
      this.modules.forEach(({ dependecies }) => {
        if (dependecies) {
          for (const dependency in dependecies) {
            this.modules.push(this.build(dependecies[dependency]));
          }
        }
      });
      const dependencyGraph = this.modules.reduce(
        (graph, item) => ({
          ...graph,
          [item.filename]: {
            dependecies: item.dependecies,
            code: item.code
          }
        }),
        {}
      );
      this.generate(dependencyGraph);
    }
    build(filename) {
      const { getAst, getDependecies, getCode } = Parser;
      const ast = getAst(filename);
      const dependecies = getDependecies(ast, filename);
      const code = getCode(ast);
      return {
        filename,
        dependecies,
        code
      };
    }
    generate(code) {
      const filePath = path.join(this.output.path, this.output.filename);
      const bundle = `(function(graph){
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
        require('${this.entry}')
      })(${JSON.stringify(code)})`;
      fs.writeFileSync(filePath, bundle, "utf-8");
    }
  }
new Compiler(options).run()
