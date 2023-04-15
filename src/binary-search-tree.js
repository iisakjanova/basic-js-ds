const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor(){
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    const newNode = new Node(data);

    if(!this.treeRoot) {
      this.treeRoot = newNode;
      return this;
    }

    let current = this.treeRoot;

    while(true) {
      if(current.data > data) {
        if(!current.left) {
          current.left = newNode;
          return this;
        }

        current = current.left;
      } else {
        if(!current.right) {
          current.right = newNode;
          return this;
        }

        current = current.right;
      }
    }
  }

  has(data) {
    if(!this.treeRoot) {
      return false;
    }

    let current = this.treeRoot;

    while(true) {
      if(data === current.data) {
        return true;
      }

      if(data < current.data) {
        if(!current.left) {
          return false;
        }

        current = current.left;
      } else {
        if(!current.right) {
          return false;
        }

        current = current.right;
      }
    }
  }

  find(data) {
    if(!this.treeRoot) {
      return null;
    }

    let current = this.treeRoot;

    while(true) {
      if(data === current.data) {
        return current;
      }

      if(data < current.data) {
        if(!current.left) {
          return null;
        }

        current = current.left;
      } else {
        if(!current.right) {
          return null;
        }

        current = current.right;
      }
    }
  }

  remove(data) {
    this.treeRoot = this._removeNode(this.treeRoot, data);
  }

  _removeNode(current, data) {
    if(current === null) {
      return null;
    }

    if(data < current.data) {
      current.left = this._removeNode(current.left, data);
    } else if(data > current.data) {
      current.right = this._removeNode(current.right, data);
    } else {
      if(current.left === null && current.right === null) {  // no children
        current = null;
      } else if(current.left === null) {   // one child (right)
        current = current.right;
      } else if(current.right === null) {  // one child (left)
        current = current.left;
      } else {                            // two children
        let minRight = this._findMinNode(current.right);
        current.data = minRight.data;
        current.right = this._removeNode(current.right, minRight.data);
      }
    }

    return current;
  }

  _findMinNode(node) {
    if(node.left === null) {
      return node;
    } else {
      return this._findMinNode(node.left);
    }
  }

  min() {
    if(!this.treeRoot) {
      return null;
    }

    let current = this.treeRoot;

    while(current.left) {
      current = current.left;
    }

    return current.data;
  }

  max() {
    if(!this.treeRoot) {
      return null;
    }

    let current = this.treeRoot;

    while(current.right) {
      current = current.right;
    }

    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};