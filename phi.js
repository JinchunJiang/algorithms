// 欧拉函数

function phi(n) {
  let x = 2,
    ans = n;
  while (x * x <= n) {
    if (n % x === 0) ans -= parseInt(ans / x);
    while (n % x === 0) n = parseInt(n / x);
    x += 1;
  }
  if (n !== 1) ans -= parseInt(ans / x);
  return ans;
}

console.log(phi(5));
console.log(phi(6));
console.log(phi(12));
