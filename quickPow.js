// 快速幂算法
function quickPow(a, b) {
  if (a === 1) return 1;
  let ans = 1;
  // 将b用二进制表示进行次方运算
  while (b) {
    if (b & (1 !== 0)) ans *= a;
    a *= a;
    b >>= 1;
  }
  return ans;
}

console.log(quickPow(5, 4));
