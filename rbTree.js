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
  while (n < 10) {
    root = insert(root, n++);
    console.log("==== rbt print ====");
    output(root);
    console.log("==== rbt print done ====");
  }
})();

// 前序遍历打印root
function output(root) {
  if (root === NIL) return;
  console.log(`${root.color}|${root.val}  ${root.left.val} ${root.right.val}`);
  output(root.left);
  output(root.right);
}
