// 单调栈，用来维护最近大于/小于关系

function ms(arr) {
  const _ms = []; // 单调递减栈
  const n = arr.length;
  const pre = new Array(n).fill(-1); // 当前元素之前第一个比它大的元素
  const next = new Array(n).fill(n); // 当前元素之后第一个比它大的元素
  for (let i = 0; i < n; i++) {
    while(_ms.length && arr[_ms[_ms.length - 1]] < arr[i]) {
      next[_ms[_ms.length - 1]] = i;
      _ms.pop();
    }
    if (_ms.length) pre[i] = _ms[_ms.length - 1];
    _ms.push(i);
  }
  let is = '', a = '', b = '', c = '';
  for (let i = 0; i < n; i ++) is += `${i} `;
  for (let i = 0; i < n; i ++) a += `${arr[i]} `;
  for (let i = 0; i < n; i ++) b += `${pre[i]} `;
  for (let i = 0; i < n; i ++) c += `${next[i]} `;
  console.log(is);
  console.log(a);
  console.log(b);
  console.log(c);
}

const arr = [1,2,3,4,3];
ms(arr);