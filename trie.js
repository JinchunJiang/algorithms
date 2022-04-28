// 字典树

const BASE = 26;

class Node {
  flag = false;
  next = new Array(BASE);
}

class Trie {
  #root = new Node(); // 私有属性root
  insert(word) {
    let p = this.#root;
    for (let x of word) {
      const ind = x.charCodeAt() - "a".charCodeAt();
      if (!p.next[ind]) p.next[ind] = new Node();
      p = p.next[ind];
    }
    if (p.flag) return false; // 说明该单词已存在
    p.flag = true;
    return true;
  }

  search(word) {
    let p = this.#root;
    for (let x of word) {
      const ind = x.charCodeAt() - "a".charCodeAt();
      if (!p.next[ind]) return false;
      p = p.next[ind];
    }
    return p.flag;
  }

  output() {
    this._output(this.#root, "");
  }

  _output(node, s) {
    if (!node) return;
    if (node.flag) {
      console.log("单词:", s);
    }
    for (let i = 0; i < BASE; i++) {
      this._output(node.next[i], s + String.fromCharCode("a".charCodeAt() + i));
    }
    return;
  }

  // clearTrie() {
  //   this._clearTrie(this.#root);
  // }

  // _clearTrie(node) {
  //   if (!node) return;
  //   for (let i = 0; i < BASE; i++) {
  //     this._clearTrie(node.next[i]);
  //   }
  //   delete node;
  //   return;
  // }
}

(function () {
  const t = new Trie();
  // console.log(t.search("world"));
  console.log(t.insert("hello"));
  console.log(t.insert("world"));
  console.log(t.insert("a"));
  console.log(t.insert("zd"));
  console.log(t.insert("jjc"));
  t.output();
  // console.log(t.search("hello"));
  // console.log(t.search("world"));
})();
