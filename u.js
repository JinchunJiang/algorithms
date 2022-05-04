// 用线性筛求解莫比乌斯函数

const MAX = 100;

function mu(n) {
  const mu = new Array(MAX).fill(0); // 莫比乌斯的解
  const primes = new Array(MAX).fill(0); // 0代表是素数
  mu[1] = 1;
  for (let i = 2; i <= n; i++) {
    if (!primes[i]) {
      mu[i] = -1;
      primes[++primes[0]] = i;
    }
    for (let j = 1; j <= primes[0]; j++) {
      if (primes[j] * i > n) break;
      primes[i * primes[j]] = 1;
      if (i % primes[j] === 0) break;
      mu[i * primes[j]] = -mu[i];
    }
  }
  for (let i = 1; i <= n; i++) {
    console.log(`mu[${i}]=${mu[i]}`);
  }
  return;
}

(function () {
  mu(10);
})();
