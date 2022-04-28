const BASE = 26;
const MAX_CNT = 10000;

class Node {
  flag = 0;
  next = new Array(BASE).fill(0); // 存储节点在数组中的下标
}
/**
 *
 * @param {char} c
 */
function getInd(c) {
  return c.charCodeAt() - "a".charCodeAt();
}

function getNewNode() {
  const node = new Node();
  trie[cnt] = node;
  return cnt++;
}

// next保存数组下标的字典树
const trie = []; // 存放节点
let cnt; // 能够使用的节点编号
let root; // 根节点的编号

// 初始化
function clearTrie() {
  cnt = 2;
  root = 1;
  trie[root] = new Node();
  return;
}

function insert(s) {
  let p = root;
  for (let x of s) {
    const ind = getInd(x);
    if (!trie[p].next[ind]) trie[p].next[ind] = getNewNode();
    p = trie[p].next[ind];
  }
  trie[p].flag = 1;
  return;
}

function search(s) {
  let p = root;
  for (let x of s) {
    const ind = getInd(x);
    p = trie[p].next[ind];
    if (!p) return false;
  }
  return !!trie[p].flag;
}

// 双数组字典树
const base = new Array(MAX_CNT).fill(0);
const check = new Array(MAX_CNT).fill(0);
let daRoot = 1; // 双数组字典树的根节点编号

function getBaseValue(root) {
  let b = 1,
    flag = 0;
  while (flag === 0) {
    flag = 1;
    b++;
    for (let i = 0; i < BASE; i++) {
      if (trie[root].next[i] === 0) continue; // 边不存在
      if (check[b + i] === 0) continue;
      flag = 0;
      break;
    }
  }
  return b;
}

function convertToDoubleArrTrie(root, daRoot) {
  if (root === 0) return;
  let maxInd = daRoot;
  // 确定当前节点的base值
  base[daRoot] = getBaseValue(root);
  for (let i = 0; i < BASE; i++) {
    if (trie[root].next[i] === 0) continue;
    check[base[daRoot] + i] = daRoot;
    // 将独立成词的节点编号设置为负数
    if (trie[trie[root].next[i]].flag) {
      check[base[daRoot] + i] = -daRoot;
    }
  }
  for (let i = 0; i < BASE; i++) {
    if (trie[root].next[i] === 0) continue;
    maxInd = Math.max(
      maxInd,
      convertToDoubleArrTrie(trie[root].next[i], base[daRoot] + i)
    );
  }
  return maxInd;
}

function daSearch(s) {
  let p = daRoot;
  for (let x of s) {
    const ind = getInd(x);
    if (Math.abs(check[base[p] + ind]) !== p) return false;
    p = base[p] + ind;
  }
  return check[p] < 0;
}

(function () {
  clearTrie();

  console.log(search("hello"));
  insert("hello");
  insert("world");
  console.log(`trie size: ${cnt - 1}`);
  console.log(
    `double array trie size: ${convertToDoubleArrTrie(root, daRoot)}`
  );

  console.log(`search hello from trie: ${search("hello")}`);
  console.log(`search hello from double array trie: ${daSearch("hello")}`);
  console.log(`search world from trie: ${search("world")}`);
  console.log(`search world from double array trie: ${daSearch("world")}`);
  console.log(`search jjc from trie: ${search("jjc")}`);
  console.log(`search jjc from double array trie: ${daSearch("jjc")}`);
})();
