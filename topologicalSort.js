// 拓扑排序
function topologicalSort(arr, n) {
  if (!arr || !arr.length) return arr;
  const indegs = new Array(n).fill(0); // 入度
  const g = new Array(n); // 维护某节点指向的节点
  for (let i = 0; i < n; i++) {
    g[i] = [];
  }
  for (let i of arr) {
    indegs[i[0]]++; // 根据节点指向来判断，填充入度数组
    g[i[1]].push(i[0]);
  }
  const queue = [];
  for (let i = 0; i < indegs.length; i++) {
    // 将入度为0的节点推入队列
    if (!indegs[i]) {
      queue.push(i);
    }
  }
  let len = queue.length;
  const ans = [];
  while (len) {
    const top = queue.shift();
    ans.push(top);
    len--;
    for (let i of g[top]) {
      indegs[i]--;
      if (!indegs[i]) {
        queue.push(i);
        len++;
      }
    }
  }
  return ans; // 拓扑序
}
