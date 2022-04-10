// 红黑树

class Node {
  constructor(val = undefined, color = 1, left = null, right = null) {
    this.val = val;
    this.color = color; // 0: red; 1: black; 2: double black;
    this.left = left;
    this.right = right;
  }
}

const NIL = new Node(); // 虚拟空节点

function getNewNode(val) {
  return new Node(val, 0, NIL, NIL);
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
function insert(root, val) {
  root = _insert(root, val);
  root.color = 1; // 平衡条件2:红黑色的根节点是黑色的
  return root;
}

function _insert(root, val) {
  if (root === NIL) return getNewNode(val);
  if (root.val === val) return root;
  if (root.val > val) root.left = _insert(root.left, val);
  else root.right = _insert(root.right, val);
  return insertMaintain(root);
}

// 插入调整
function insertMaintain(root) {
  let flag = 0;
  if (root.left.color === 0 && hasRedChild(root.left)) flag = 1;
  if (root.right.color === 0 && hasRedChild(root.right)) flag = 2;
  if (flag === 0) return root;
  if (root.left.color === 0 && root.right.color === 0) {
    // 插入调整情况1，站在祖父节点向下看，父节点和叔叔节点都是红色
    // 将祖父节点改成红色，父节点和叔叔节点都改成黑色
    root.color = 0;
    root.left.color = root.right.color = 1;
    return root;
  }
  if (flag === 1) {
    if (root.left.right.color === 0) {
      // LR
      root.left = leftRotate(root.left);
    }
    root = rightRotate(root); // LL
  } else {
    if (root.right.left.color === 0) {
      // RL
      root.right = rightRotate(root.right);
    }
    root = leftRotate(root); // RR
  }
  // 红色上浮或红色下沉均可，这里采用红色上浮
  root.color = 0;
  root.left.color = root.right.color = 1;
  return root;
}

function erase(root, val) {
  root = _erase(root, val);
  root.color = 1;
  return root;
}

function _erase(root, val) {
  if (root === NIL) return root;
  if (val < root.val) {
    root.left = _erase(root.left, val);
  } else if (val > root.val) {
    root.right = _erase(root.right, val);
  } else {
    if (root.left === NIL || root.right === NIL) {
      // 当前节点度为0或者度为1
      const temp = root.left === NIL ? root.right : root.left;
      // 精髓！！！
      // 涵盖了当前节点为黑或红且度为0或1的4种情况
      temp.color += root.color;
      delete root;
      return temp;
    } else {
      // 度为2的节点
      const temp = predeccessor(root);
      root.val = temp.val;
      root.left = _erase(root.left, temp.val);
    }
  }
  return eraseMaintain(root);
}

// 删除调整
function eraseMaintain(root) {
  // 当前节点的子节点没有双重黑时不需要调整
  if (root.left.color !== 2 && root.right.color !== 2) return root;
  if (hasRedChild(root)) {
    // 说明双重黑的兄弟节点是红色
    // 要通过旋转将红色的兄弟节点变成根节点
    // 并使得旋转之后双重黑节点的兄弟节点也是黑色的
    root.color = 0; // 将原先的root节点改成红色
    if (root.left.color === 0) {
      root = rightRotate(root);
      root.right = eraseMaintain(root.right);
    } else {
      root = leftRotate(root);
      root.left = eraseMaintain(root.left);
    }
    root.color = 1; // 将新的root节点改成黑色
    return root;
  }
  // 说明双重黑的兄弟节点y是黑色
  if (
    (root.left.color === 1 && !hasRedChild(root.left)) ||
    (root.right.color === 1 && !hasRedChild(root.right))
  ) {
    // 情况一：y下面没有红色子节点
    root.left.color -= 1;
    root.right.color -= 1;
    root.color += 1;
    return root;
  }
  // 情况二
  if (root.left.color === 1) {
    // L
    root.right.color = 1; // 先将双重黑变成黑
    if (root.left.left.color !== 0) {
      // LR
      // 先一个左旋变成LL类型
      root.left.color = 0; // 原根节点变成红色
      root.left = leftRotate(root.left);
      root.left.color = 1; // 新根节点变为黑色
    }
    root.left.color = root.color; // 将新根的颜色变成原根的颜色
    root = rightRotate(root); // LL
  } else {
    // R
    root.left.color = 1; // 先将双重黑变成黑
    if (root.right.right.color !== 0) {
      // RL
      // 先一个右旋变成RR类型
      root.right.color = 0; // 原根节点变成红色
      root.right = rightRotate(root.right);
      root.right.color = 1; // 新根节点变为黑色
    }
    root.right.color = root.color; // 将新根的颜色变成原根的颜色
    root = leftRotate(root); // RR
  }
  root.left.color = root.right.color = 1; // 将当前根节点的子节点都改为黑色
  return root;
}

// 寻找前驱节点
function predeccessor(root) {
  let temp = root.left;
  while (temp.right !== NIL) temp = temp.right;
  return temp;
}

// 判断子节点是否为红色
function hasRedChild(root) {
  if (root === NIL) return false;
  return root.left.color === 0 || root.right.color === 0;
}

// 左旋
function leftRotate(root) {
  const newRoot = root.right;
  root.right = newRoot.left;
  newRoot.left = root;
  return newRoot;
}

// 右旋
function rightRotate(root) {
  const newRoot = root.left;
  root.left = newRoot.right;
  newRoot.right = root;
  return newRoot;
}

(function () {
  let root = NIL;
  let n = 1;
  while (n < 7) {
    root = insert(root, n++);
  }
  // console.log("==== before erase ====");
  // output(root);
  // console.log("==== before erase ====");
  root = erase(root, 3);
  console.log("==== print ====");
  output(root);
  console.log("==== print done ====");
})();

// 前序遍历打印root
function output(root) {
  if (root === NIL) return;
  console.log(`${root.color}|${root.val}  ${root.left.val} ${root.right.val}`);
  output(root.left);
  output(root.right);
}
