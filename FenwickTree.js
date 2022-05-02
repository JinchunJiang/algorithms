// 树状数组
// 使用场景：求前缀和

// 求数字x的二进制表示中最后一位1的位权
function lowbit(x) {
  return x & -x;
}

// 获取数字长度
function getLen(n) {
  let len = 0;
  do {
    n = parseInt(n / 10);
    len++;
  } while (n);
  return len;
}

class FenwickTree {
  #n;
  constructor(n) {
    this.#n = n;
    this.c = new Array(n + 1).fill(0);
  }

  // 原数组第i位的值
  at(i) {
    return this.query(i) - this.query(i - 1);
  }

  // 原数组第i位增加x
  add(i, x) {
    while (i <= this.#n) {
      this.c[i] += x;
      i += lowbit(i);
    }
    return;
  }

  // 前i位的前缀和
  query(i) {
    let sum = 0;
    while (i) {
      sum += this.c[i];
      i -= lowbit(i);
    }
    return sum;
  }

  // 打印输出
  output() {
    const len = 5;
    let str1 = "",
      str2 = "",
      str3 = "",
      str4 = "",
      str5 = "";
    for (let i = 1; i <= this.#n; i++) {
      let j = len - getLen(i);
      while (j--) str1 += " ";
      str1 += i;

      let k = len;
      while (k--) str2 += "=";

      let m = len - getLen(this.c[i]);
      while (m--) str3 += " ";
      str3 += this.c[i];

      let n = len - getLen(this.at(i));
      while (n--) str4 += " ";
      str4 += this.at(i);

      let a = len - getLen(this.query(i));
      while (a--) str5 += " ";
      str5 += this.query(i);
    }
    console.log(str1);
    console.log(str2);
    console.log(str3);
    console.log(str4);
    console.log(str5);
  }
}

(function () {
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const n = arr.length;
  const tree = new FenwickTree(n);
  for (let i = 1; i <= n; i++) {
    tree.add(i, arr[i - 1]);
  }
  tree.add(5, 5);
  tree.output();
})();
