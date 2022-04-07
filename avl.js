// 实现AVL(平衡二叉搜索树)

class TreeNode {
  constructor(val = undefined, height = 0, left = null, right = null) {
    this.val = val;
    this.height = height;
    this.left = left;
    this.right = right;
  }
}

const NIL = new TreeNode(); // 虚拟空节点

function getNewNode(val) {
  return new TreeNode(val, 1, NIL, NIL);
}

// 清空
function clear(root) {
  if (root === NIL) return;
  clear(root.left);
  clear(root.right);
  delete root;
  return;
}

// 插入
function insert(node, val) {
  if (node === NIL) return getNewNode(val);
  if (node.val === val) return node;
  else if (val < node.val) {
    node.left = insert(node.left, val);
  } else {
    node.right = insert(node.right, val);
  }
  updateHeight(node);
  return maintain(node);
}

// 删除值为val的节点
function erase(node, val) {
  if (node === NIL) return node;
  if (val < node.val) {
    // 说明值为val的节点在左子树
    node.left = erase(node.left, val);
  } else if (val > node.val) {
    node.right = erase(node.right, val);
  } else {
    // 删除当前节点
    if (node.left === NIL || node.right === NIL) {
      // 当前节点度为0或1
      const temp = node.left === NIL ? node.right : node.left;
      delete node;
      return temp;
    } else {
      const temp = predeccessor(node); // 获取当前节点的前驱节点，即值小于当前节点值的最大节点
      node.val = temp.val;
      node.left = erase(node.left, temp.val);
    }
  }
  updateHeight(node);
  return maintain(node);
}

// 获取前驱节点
function predeccessor(node) {
  if (node === NIL) return node;
  let temp = node.left;
  while (temp.right !== NIL) temp = temp.right;
  return temp;
}

// 更新树高
function updateHeight(node) {
  if (node === NIL) return;
  node.height = Math.max(node.left.height, node.right.height) + 1;
  return;
}

// 调整
function maintain(node) {
  if (node === NIL || Math.abs(node.left.height - node.right.height) < 2)
    return node;
  // 失衡
  if (node.left.height > node.right.height) {
    if (node.left.right.height > node.left.left.height) {
      // LR型
      node.left = leftRotate(node.left);
    }
    node = rightRotate(node); // LL型或LR型
  } else {
    if (node.right.left.height > node.right.right.height) {
      // RL型
      node.right = rightRotate(node.right);
    }
    node = leftRotate(node); // RL型或RR型
  }
  return node;
}

// 左旋
function leftRotate(node) {
  const newRoot = node.right;
  node.right = newRoot.left;
  newRoot.left = node;
  updateHeight(node);
  updateHeight(newRoot);
  return newRoot;
}

// 右旋
function rightRotate(node) {
  const newRoot = node.left;
  node.left = newRoot.right;
  newRoot.right = node;
  updateHeight(node);
  updateHeight(newRoot);
  return newRoot;
}

(function () {
  let root = getNewNode(5);
  root = insert(root, 3);
  root = insert(root, 11);
  root = insert(root, 9);
  root = insert(root, 12);
  root = insert(root, 7);
  console.log("==== 开始打印 ==== ");
  output(root);
  console.log("==== 结束打印 ==== ");
})();

// 前序遍历打印树
function output(node) {
  if (node === NIL) {
    console.log(`${node.val}[${node.height}]`);
    return;
  }
  console.log(`${node.val}[${node.height}]`);
  output(node.left);
  output(node.right);
}
