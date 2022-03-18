// 并查集
function UnionSet(n) {
  this.father = [];
  this.size = new Array(n).fill(1);
  for (let i = 0; i < n; i++) {
    this.father[i] = i;
  }
}

// 查找
UnionSet.prototype.find = function (x) {
  // 路径优化
  return (this.father[x] =
    this.father[x] === x ? x : this.find(this.father[x]));
};

// 合并
UnionSet.prototype.merge = function (a, b) {
  const fa = this.find(a);
  const fb = this.find(b);
  if (fa === fb) return;
  // 按质优化
  if (this.size[fa] > this.size[fb]) {
    this.father[fb] = fa;
    this.size[fa] += this.size[fb];
  } else {
    this.father[fa] = fb;
    this.size[fb] += this.size[fa];
  }
  return;
};
