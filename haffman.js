// 哈弗曼编码

const { Heap } = require("./heap");

// 步骤：
// 1. 统计字符出现的频率（概率）
// 2. 每次从中选出概率最低的两个字符，组成一个节点，直至所有的节点都挂在二叉树的叶子上
// 3. 进行编码。

// 假设已经统计好了频次
const chars = [
  { char: "a", freq: 100 },
  { char: "b", freq: 50 },
  { char: "c", freq: 200 },
  { char: "d", freq: 1000 },
  { char: "e", freq: 10 },
];

class Node {
  constructor(ch = "", freq, left, right) {
    this.ch = ch;
    this.freq = freq;
    this.left = left;
    this.right = right;
  }
}

function getCode(c) {
  return c.charCodeAt() - "a".charCodeAt();
}

function extractCode(root, prefix, code) {
  if (root.ch) {
    code[getCode(root.ch)] = prefix;
    return;
  }
  extractCode(root.left, prefix + "0", code);
  extractCode(root.right, prefix + "1", code);
}

(function () {
  // 小顶堆
  const h = new Heap(function (a, b) {
    return a.freq > b.freq;
  });
  for (let item of chars) {
    h.push(new Node(item.char, item.freq));
  }
  while (h.size() > 1) {
    const a = h.top();
    h.pop();
    const b = h.top();
    h.pop();
    h.push(new Node("", a.freq + b.freq, a, b));
  }
  const root = h.top(); // 哈弗曼编码树
  const code = new Array(128).fill("");
  extractCode(root, "", code); // 编码
  for (let item of chars) {
    console.log(`${item.char}(${item.freq}): ${code[getCode(item.char)]}`);
  }
})();
