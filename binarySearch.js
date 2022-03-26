// 二分查找算法
// 需要保证nums已排序，一般是升序

// 查找升序数组中target的位置，如果不存在返回-1
function binarySearch(nums, target) {
  if (!nums.length) return -1;
  let l = 0, r = nums.length - 1, mid;
  while (r - l > 3) {
    mid = (l + r) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[mid] > target) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  for (let i = l; i <= r; i++) {
    if (nums[i] === target) return i;
  }
  return -1;
}

// 二分查找算法变式
// 将升序数组转换为[0,0,0,1,1,1,1], 1代表>=target
// 查找转换后数组中第一个1的位置
function binarySearch2(nums, target) {
  if (!nums.length) return -1;
  let l = 0, r = nums.length - 1, mid;
  while (r - l > 3) {
    mid = (l + r) >> 1;
    if (nums[mid] >= target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  for (let i = l; i <= r; i++) {
    if (nums[i] >= target) return i;
  }
  return nums.length;
}