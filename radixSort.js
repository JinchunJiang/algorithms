/**
 * 基数排序（一般只用来排序非负整数）
 * 处理步骤：
 *  1、首先获取数组最大数的位数
 *  2、从低到高统计各个位数的数字出现的频次（次数），先从个位开始，依次统计数组元素个位是0-9的个数
 *  3、计算前缀和（此时可得原数组根据个位数字排序后，相同个位数字出现在排序数组中的最后一个位置）
 *  4、根据个位数字排序，从后往前依次放置元素（此时可得原数组根据个位数字排序后的数组，此步骤需要保证相同个位元素在原数组中的顺序）
 *  5、重复2-4步骤，直至处理完最高位
 *  6、完成基数排序
 */
function radixSort(arr) {
  if (arr.length <= 1) return arr;
  const radixs = new Array(10);
  const max = Math.max(...arr);
  const maxBit = getBit(max);
  let curBit = 1;
  const temp = [];
  while (curBit <= maxBit) {
    radixs.fill(0) // reset
    for (let i of arr) {
      radixs[getBitNum(i, curBit)]++;
    } 
    for (let i = 1; i <= 9; i++) {
      radixs[i] = radixs[i - 1] + radixs[i];
    }
    for (let i = arr.length - 1; i >= 0; i--) {
      temp[--radixs[getBitNum(arr[i], curBit)]] = arr[i];
    }
    for (let i = 0; i < arr.length; i++) arr[i] = temp[i];
    curBit++;
  }
  return arr;
}
// 获取个位、十位、百位...的数字
function getBitNum(n, bit) {
  let ans;
  while (bit) {
    if (n === 0) return 0;
    ans = n % 10;
    n = parseInt(n / 10);
    bit--;
  }
  return ans;
}
// 获取当前数字的位数
function getBit(n) {
  let bit = 0;
  do {
    n = parseInt(n / 10);
    bit++;
  } while (n);
  return bit;
}