// 堆
var Heap = function (cmp) {
  this.cnt = 0;
  this.queue = [];
  this.cmp = cmp; // 设置比较函数，用于设置是小顶堆还是大顶堆
};
// 查看堆顶元素
Heap.prototype.top = function () {
  if (this.cnt) return this.queue[0];
  return null;
};
// 查看堆中元素数量
Heap.prototype.size = function () {
  return this.cnt;
};
// 入堆
Heap.prototype.push = function (val) {
  this.queue[this.cnt++] = val;
  this.adjustUp();
};
// 出堆
Heap.prototype.pop = function () {
  if (!this.cnt) return;
  if (this.cnt > 1)
    [this.queue[0], this.queue[this.cnt - 1]] = [
      this.queue[this.cnt - 1],
      this.queue[0],
    ];
  this.cnt--;
  this.adjustDown();
};
// 向上调整
Heap.prototype.adjustUp = function () {
  if (this.cnt <= 1) return;
  let i = this.cnt - 1;
  while (i) {
    const parentIndex = Math.floor((i - 1) / 2);
    if (!this.cmp(this.queue[parentIndex], this.queue[i])) {
      return;
    } else {
      [this.queue[i], this.queue[parentIndex]] = [
        this.queue[parentIndex],
        this.queue[i],
      ];
      i = parentIndex;
    }
  }
  return;
};
// 向下调整
Heap.prototype.adjustDown = function () {
  if (this.cnt <= 1) return;
  let i = 0;
  while (2 * i + 1 < this.cnt) {
    const left = i * 2 + 1;
    const right = i * 2 + 2;
    let temp = this.queue[i];
    if (this.cmp(temp, this.queue[left])) temp = this.queue[left];
    if (right < this.cnt && this.cmp(temp, this.queue[right]))
      temp = this.queue[right];
    if (temp === this.queue[i]) return;
    else {
      if (temp === this.queue[left]) {
        [this.queue[i], this.queue[left]] = [this.queue[left], this.queue[i]];
        i = left;
      } else {
        [this.queue[i], this.queue[right]] = [this.queue[right], this.queue[i]];
        i = right;
      }
    }
  }
};

exports.Heap = Heap;
