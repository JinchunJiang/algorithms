// 单调队列mq，常用来维护滑动窗口最值问题
var maxSlidingWindow = function(nums, k) {
  const dequeue = []; // 双端队列
  Array.prototype.size = function() {
    return this.length;
  }
  Array.prototype.tail = function() {
    if (!this.size()) return;
    return this[this.length - 1];
  }
  const ret = [];
  for (let i = 0; i < nums.length; i++) {
    // 此处维护滑动窗口的最大值
    while (dequeue.size() && nums[dequeue.tail()] < nums[i]) dequeue.pop(); // 将破坏单调性的元素从队尾出队
    dequeue.push(i);
    if (i === k - 1) ret.push(nums[dequeue[0]]);
    if (i < k) continue;
    if (dequeue[0] < i - k + 1) {
      // 此时队首元素已经划出窗口，需要从队首出队
      dequeue.shift();
    }
    ret.push(nums[dequeue[0]]);
  }

  return ret;
};

const arr = [1,3,-1,-3,5,3,6,7];
console.log(maxSlidingWindow(arr, 3))