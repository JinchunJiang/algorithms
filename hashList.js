// 哈希链表
// 常见用于LRU

// 双向链表
class DoubleLinkNode {
  constructor(val = undefined, prev = null, next = null) {
    this.val = val;
    this.prev = prev;
    this.next = next;
  }
  
  // 从链表中删除当前节点
  clearThis() {
    this.prev.next = this.next;
    if (this.next) this.next.prev = this.prev;
    this.prev = null;
    this.next = null;
  }

  // 将传入节点加入到链表尾部
  addTail(node) {
    let p = this;
    while (p && p.next) {
      p = p.next;
    }
    node.prev = p;
    p.next = node;
  }
}
/**
 * @param {number} capacity
 */
 var LRUCache = function(capacity) {
  this.set = new Array(capacity + 1);
  this.capacity = capacity;
  this.cnt = 0;
  this.head = new DoubleLinkNode();
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  if (!this.set[key]) return -1;
  let node = this.set[key];
  node.clearThis(); // 将当前节点从链表中删除，并加入到尾部
  this.head.addTail(node);
  return node.val[1];
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  if (this.get(key, value) >= 0) {
    // 如果当前key已存在，则将value覆盖
    this.set[key].val[1] = value;
    return;
  };
  const node = new DoubleLinkNode([key, value]);
  this.head.addTail(node);
  this.set[key] = node;
  this.cnt++;
  if (this.cnt > this.capacity) {
    const h = this.head.next;
    h?.clearThis();
    this.set[h.val[0]] = null;
    this.cnt--;
  }
  return;
};
