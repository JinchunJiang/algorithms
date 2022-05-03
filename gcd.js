// 欧几里得算法
function gcd(a, b) {
  if (b) return gcd(b, a % b);
  return a;
}

// console.log(gcd(4, 6));

// 扩展欧几里得算法
function exGcd(a, b) {
  let x, y;

  function _exGcd(a, b) {
    if (b === 0) {
      x = 1;
      y = 0;
      return a;
    }
    let r = _exGcd(b, a % b);
    let temp = y;
    y = x - Math.floor(a / b) * y;
    x = temp;
    return r;
  }

  let r = _exGcd(a, b);
  console.log(`${a} * ${x} + ${b} * ${y} = ${r}`);
  return r;
}

exGcd(3, 5);
exGcd(4, 6);
exGcd(89, 65);
