var getMid = function (a, b, c) {
  if (a > b) [a, b] = [b, a];
  if (a > c) [a, c] = [c, a];
  if (b > c) [b, c] = [c, b];
  return b;
};

var quickSort = function (arr, l, r) {
  if (l >= r) return;
  while (l < r) {
    var x = l,
      y = r,
      mid = getMid(arr[l], arr[r], arr[(l + r) >> 1]);
    while (x <= y) {
      while (arr[x] < mid) x++;
      while (arr[y] > mid) y--;
      if (x <= y) {
        [arr[x], arr[y]] = [arr[y], arr[x]];
        x++;
        y--;
      }
    }
    quickSort(arr, x, r);
    r = y;
  }
};

const arr = [2, 1, 2, 5, 4];
quickSort(arr, 0, 4);
console.log(arr);
