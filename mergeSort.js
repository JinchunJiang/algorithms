// 归并排序
function mergeSort(arr, l, r) {
  if (l >= r) return;
  const mid = (l + r) >> 1;
  mergeSort(arr, l, mid);
  mergeSort(arr, mid + 1, r);
  let i = l,
    j = mid + 1,
    k = l;
  const temp = [];
  while (i <= mid || j <= r) {
    if (j > r || (i <= mid && arr[i] <= arr[j])) {
      temp[k++] = arr[i++];
    } else {
      temp[k++] = arr[j++];
    }
  }
  for (let x = l; x <= r; x++) {
    arr[x] = temp[x];
  }
  return;
}
