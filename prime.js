// 质数筛

// 枚举
function countPrimes(n) {
  function isPrime(x) {
    for (let i = 2; i * i <= x; i++) {
      if (x % i === 0) return 0;
    }
    return 1;
  }
  let cnt = 0;
  for (let i = 2; i < n; i++) {
    cnt += isPrime(i);
  }
  return cnt;
}

// 埃氏筛
function aiPrime(n) {
  const isPrime = new Array(n).fill(0); // 0表示是质数
  let cnt = 0;
  for (let i = 2; i < n; i++) {
    if (!isPrime[i]) {
      cnt++;
      for (let j = i * i; j < n; j += i) {
        // i * i, (i + 1)i...
        isPrime[j] = 1;
      }
    }
  }
  return cnt;
}

// 线性筛
// 时间复杂度O(n)
function linearPrime(n) {
  const isPrime = new Array(n).fill(0); // 0代表是素数
  // isPrime[0]存放素数的个数
  for (let i = 2; i < n; i++) {
    if (!isPrime[i]) isPrime[++isPrime[0]] = i;
    for (let j = 1; j <= isPrime[0]; j++) {
      if (i * isPrime[j] > n) break;
      isPrime[i * isPrime[j]] = 1;
      if (i % isPrime[j] === 0) break;
    }
  }
  return isPrime[0];
}

console.log(countPrimes(10));
console.log(aiPrime(10));
console.log(linearPrime(10));
