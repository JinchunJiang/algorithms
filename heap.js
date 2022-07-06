/**
 * 堆（or优先队列）：基于完全二叉树的数据结构
 * 用于维护最值，堆顶维护最大值就是大顶堆，堆顶维护最小值就是小顶堆
 */
class Heap {
  #cnt = 0;
  #queue = [];
  /**
   * 比较函数，(pre, next) => boolean
   * true则交换
   * false不交换
   */
  #cmp;
  constructor(cmp) {
    this.#cmp = cmp;
  }
  // 获取堆中元素数量
  size() {
    return this.#cnt;
  }
  // 获取堆顶元素
  top() {
    if (this.#cnt) return this.#queue[0];
    return null;
  }
  // 入堆
  push(val) {
    this.#queue[this.#cnt++] = val;
    this.adjustUp();
  }
  // 向上调整
  adjustUp() {
    if (this.#cnt <= 1) return;
    let i = this.#cnt - 1;
    while (i) {
      const parentInd = (i - 1) >> 1;
      if (!this.#cmp(this.#queue[parentInd], this.#queue[i])) return;
      [this.#queue[i], this.#queue[parentInd]] = [
        this.#queue[parentInd],
        this.#queue[i],
      ];
      i = parentInd;
    }
  }
  // 出堆
  pop() {
    if (!this.#cnt) return;
    if (this.#cnt > 1) {
      [this.#queue[this.#cnt - 1], this.#queue[0]] = [
        this.#queue[0],
        this.#queue[this.#cnt - 1],
      ];
    }
    this.#cnt--;
    this.adjustDonw();
  }
  // 向下调整
  adjustDonw() {
    if (this.#cnt <= 1) return;
    let i = 0;
    while (2 * i + 1 < this.#cnt) {
      const left = 2 * i + 1,
        right = 2 * i + 2;
      let temp = this.#queue[i];
      if (this.#cmp(temp, this.#queue[left])) temp = this.#queue[left];
      if (right < this.#cnt && this.#cmp(temp, this.#queue[right]))
        temp = this.#queue[right];
      if (temp === this.#queue[i]) return;
      if (temp === this.#queue[left]) {
        [this.#queue[left], this.#queue[i]] = [
          this.#queue[i],
          this.#queue[left],
        ];
        i = left;
      } else {
        [this.#queue[right], this.#queue[i]] = [
          this.#queue[i],
          this.#queue[right],
        ];
        i = right;
      }
    }
  }
}

exports.Heap = Heap;
