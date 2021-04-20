### 虚拟 dom

用 javascript 对象描述 DOM 的层次结构

```js
var vertualDom = {
  sel: 'div',
  data: {
    class: {
      box: true
    }
  },
  children: [
    {
      sel: 'h3',
      text: 'title'
    },
    {
      sel: 'ul',
      data: {},
      children: [
        {
          sel: 'li',
          data: {},
          children: [],
          text: 'text'
        }
      ]
    }
  ]
}
const newVertualDom = {}

export interface VNode {
  sel: string | undefined;
  data: VNodeData | undefined;
  children: Array<VNode | string> | undefined;
  elm: Node | undefined; //真正的Dom节点
  text: string | undefined;
  key: Key | undefined; // 唯一标识
}
```

diff 是发生在虚拟 DOM 上的。
新的虚拟 DOM 和 旧的虚拟 DOM 进行比较，进行最小化更新

Dom -> 虚拟 Dom (模板编译)

### h 函数

1. key 服务于最小量更新的。

2. 只有同一个虚拟节点才会精细更新， 否则会全量更新
   （选择器不同 或 key 不同 会被视为不是同一个节点）

3. 只进行同层比较，不进行跨层比较

### diff

1. 处理新旧节点不是同一个节点时

疑问

如何定义新节点和老节点是否是同一个节点

笔记

1. 创建节点时，子节点需要递归出来
