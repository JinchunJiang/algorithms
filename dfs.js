// 深度优先搜索dfs(递归思想)
 var findTargetSumWays = function(nums, target) {
  let ans = 0;
  const dfs = (l, rest) => {
    // 终止递归判断
    if (l === nums.length) {
      if (rest === 0) {
        ans++;
      }
      return ;
    }
    // 向下递归
    dfs(l + 1, rest - nums[l]);
    dfs(l + 1, rest + nums[l]);
    return;
  }
  dfs(0, target);
  return ans;
};