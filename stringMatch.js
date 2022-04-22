// 字符串暴力匹配算法
function bruteForce(text, pattern) {
  for (let i = 0; text[i]; ++i) {
    let flag = 1;
    for (let j = 0; pattern[j]; ++j) {
      if (text[i + j] === pattern[j]) continue;
      flag = 0;
      break;
    }
    if (flag === 1) return i;
  }
  return -1;
}

// KMP算法
// 可以处理流数据的单模匹配问题
function kmp(text, pattern) {
  const n = pattern.length;
  const next = new Array(n);
  function getNext() {
    next[0] = -1;
    for (let i = 1, j = -1; pattern[i]; i++) {
      while (j !== -1 && pattern[j + 1] !== pattern[i]) j = next[j];
      if (pattern[j + 1] === pattern[i]) j++;
      next[i] = j;
    }
    return;
  }
  function getNextJ(c, j) {
    while (j !== -1 && c !== pattern[j + 1]) j = next[j];
    if (c === pattern[j + 1]) j++;
    return j;
  }
  getNext();
  // 本质上是个状态机
  // 给个字符，j就变一下
  for (let i = 0, j = -1; text[i]; i++) {
    // j代表pattern中前面与text相匹配的最后一位（绿色串的最后一位）
    // i代表text中不与pattern相匹配的第一位（黄色位置）
    j = getNextJ(text[i], j);
    if (!pattern[j + 1]) return i - j;
  }
  return -1;
}

// 单模匹配，效率比KMP更高
// 需要预先知道文本串
function sunday(text, pattern) {
  const map = new Map();
  const n = text.length,
    m = pattern.length;
  for (let i = 0; i < m; i++) map.set(pattern[i], i);
  for (
    let i = 0;
    i + m <= n;
    i += m - (map.has(text[i + m]) ? map.get(text[i + m]) : -1)
  ) {
    let flag = 1;
    for (let j = 0; pattern[j]; j++) {
      if (text[i + j] === pattern[j]) continue;
      flag = 0;
      break;
    }
    if (flag) return i;
  }
  return -1;
}

// shift-and算法也可以处理流数据
// 不仅可以处理单模问题，还可以处理(a|b|c)&(d|e|f)此类的同一个位置有多个字符可以匹配的问题
function shiftAnd(text, pattern) {
  const n = pattern.length;
  const code = new Map();
  for (let i = 0; i < n; i++) {
    let val = 0;
    if (code.has(pattern[i])) val = code.get(pattern[i]);
    code.set(pattern[i], val | (1 << i)); // map中存储字符在模式串中的位置，用二进制表示
  }
  // p表示原先的p值
  // c表示新来的字符
  function getNextP(p, c) {
    // 设p原先为3，表示p能匹配到模式串的第0位和第1位
    // 则新来了一个字符后，p可能匹配到模式串的第1位和第2位，以及第0位
    // 将可能的值与code中字符的二进制表示进行与操作，即可得真实的匹配位置
    return ((p << 1) | 1) & code.get(c); // 注意，字符串的二进制表示是左低右高，所以需要左移
  }
  let p = 0; // p代表以当前字符作为结尾，能匹配到模式串中前i位，则p的第i位则为1
  for (let i = 0; text[i]; i++) {
    p = getNextP(p, text[i]);
    if (p & (1 << (n - 1))) {
      // 说明模式串完全匹配上了
      return i - n + 1;
    }
  }
  return -1;
}

console.log("bruteForce:");
console.log(bruteForce("hello", "hell"));
console.log(bruteForce("hello", "ell"));
console.log(bruteForce("hello", "world"));

console.log("kmp:");
console.log(kmp("hello", "hell"));
console.log(kmp("hello", "ell"));
console.log(kmp("hello", "world"));

console.log("sunday:");
console.log(sunday("hello", "hell"));
console.log(sunday("hello", "ell"));
console.log(sunday("hello", "world"));

console.log("shiftAnd:");
console.log(shiftAnd("hello", "hell"));
console.log(shiftAnd("hello", "ell"));
console.log(shiftAnd("hello", "world"));
