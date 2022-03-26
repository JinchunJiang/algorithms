// 一个简单的哈希表

// 链表节点
class ListNode {
  constructor(val = undefined, next = null) {
    this.val = val;
    this.next = next;
  }
}

var MyHashSet = function() {
  this.set = [];
  this.capacity = 1000; // 容量
};

// 哈希函数
MyHashSet.prototype.hash = function(key) {
  return key % this.capacity;
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function(key) {
  // 拉链法解决哈希冲突，数组中存储链表
  if (this.contains(key)) return;
  const idx = this.hash(key);
  if (!this.set[idx]) {
    // 创建虚拟头节点
    const head = new ListNode();
    this.set[idx] = head;
  }
  // 头插法，直接接在虚拟头后面
  const p = this.set[idx];
  const node = new ListNode(key, p.next);
  p.next = node;
  return;
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function(key) {
  if (!this.contains(key)) return;
  const idx = this.hash(key);
  let p = this.set[idx];
  while (p && p.next) {
    if (p.next.val === key) {
      const next = p.next;
      p.next = next.next;
      next.next = null;
      return;
    }
  }
  return;
};

/** 
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function(key) {
  const idx = this.hash(key);
  let p = this.set[idx];
  while (p) {
    if(p.val === key) return true;
    p = p.next;
  }

  return false;
};