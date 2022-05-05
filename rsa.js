const MAX_N = 10000;
const prime = new Array(MAX_N + 5).fill(0);

// 线性筛
function initPrime() {
  for (let i = 2; i <= MAX_N; i++) {
    if (prime[i] === 0) {
      prime[++prime[0]] = i;
    }
    for (let j = 1; j <= prime[0]; j++) {
      if (i * prime[j] > MAX_N) break;
      prime[i * prime[j]] = 1;
      if (i % prime[j] === 0) break;
    }
  }
  return;
}

// 求两数的最大公约数
function gcd(a, b) {
  if (b) return gcd(b, a % b);
  return a;
}

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

  _exGcd(a, b);
  return { x, y };
}

// 快速求解a^b%c
function quickMod(a, b, c) {
  let ans = 1,
    temp = a;
  while (b) {
    if (b & 1) ans = (ans * temp) % c;
    temp = (temp * temp) % c;
    b >>= 1;
  }
  return ans;
}

// 制作RSA钥匙的主函数
(function () {
  initPrime(); // 初始化素数列表
  const primeCnt = prime[0];
  let p, q, pInd, qInd;
  do {
    pInd = primeCnt - parseInt(Math.random() * 100);
    qInd = primeCnt - parseInt(Math.random() * 100);
  } while (pInd === qInd);
  // 第一步：选取两个较大的素数
  p = prime[pInd];
  q = prime[qInd];
  // 第二步，求解phiN=(p - 1) * (q - 1)
  const N = p * q;
  const phiN = (p - 1) * (q - 1);
  // 第三步，随便做一把加密钥匙e(e与phiN互质)
  let e;
  do {
    e = parseInt(Math.random() * phiN);
  } while (e === 0 || gcd(e, phiN) !== 1);
  // 第四步，精心设计一把解密钥匙d
  // e * d % phiN = 1
  let { x: d } = exGcd(e, phiN);
  d = ((d % phiN) + phiN) % phiN;
  console.log(`验证：e*d%phiN=${(e * d) % phiN}`); // 验证是否等于1
  // 第五步，打包加密钥匙和解密钥匙
  console.log(`(${e}, ${N})`); // 加密钥匙
  console.log(`(${d}, ${N})`); // 解密钥匙

  // 使用钥匙进行加解密
  const arr = [28, 2, 500];
  arr.forEach((n) => {
    const C = quickMod(n, e, N);
    const M = quickMod(C, d, N);
    console.log("--------");
    console.log(`加密结果：${n}=>${C}`);
    console.log(`解密结果：${C}=>${M}`);
  });
})();
