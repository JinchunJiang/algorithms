// 并查集
class UnionSet {
  constructor(n) {
    this.n = n;
    this.father = [];
    this.size = new Array(n).fill(1); // 记录节点数,默认每个节点都是一棵独立的子树
    // 给每个节点赋个默认编号
    for (let i = 0; i < n; i++) {
      this.father[i] = i;
    }
  }
  // 查找
  find(x) {
    // 路径压缩：在查找的过程中把节点挂在到根节点下，所有联通的节点形成一棵树
    return (this.father[x] =
      this.father[x] === x ? x : this.find(this.father[x]));
  }
  // 合并
  merge(a, b) {
    const fa = this.find(a);
    const fb = this.find(b);
    if (fa === fb) return; // 说明已经联通，不需要合并
    // 按质优化，谁节点数多谁当爸爸，这样可以使最终形成的树高更小
    if (this.size[fa] > this.size[fb]) {
      this.father[fb] = fa;
      this.size[fa] += this.size[fb];
    } else {
      this.father[fa] = fb;
      this.size[fb] += this.size[fa];
    }
  }
}
