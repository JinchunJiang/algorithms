// 广度优先搜索bfs
var updateMatrix = function(mat) {
  const m = mat.length, n = mat[0].length;
  const ret = [];
  const queue = [];
  const size = () => {
    return queue.length;
  }
  // 初始化队列
  for (let x = 0; x < m; x++) {
    ret.push([]);
    for (let y = 0; y < n; y++) {
      if (mat[x][y] === 0) {
        ret[x][y] = 0;
        queue.push([x, y, 0]);
      } else {
        ret[x][y] = -1; // 初始值为-1
      }
    }
  }
  // 方向数组，上下左右
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ];
  while (size()) {
    const top = queue.shift(); // 取状态+弹出状态
    // 扩展状态
    for (let d of directions) {
      const x = top[0] + d[0];
      const y = top[1] + d[1];
      // 判断坐标合法性
      if (x < 0 || x >= m) continue;
      if (y < 0 || y >= n) continue;
      // 判断当前坐标是否已访问
      if (ret[x][y] !== -1) continue;
      queue.push([x, y, top[2] + 1]);
      ret[x][y] = top[2] + 1;
    }
  }

  return ret;
};