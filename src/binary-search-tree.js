const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.tree = null
  }

  root() {
    return this.tree;
  }

  add(data) {
    let current = this.tree;
    let previous = current;
    if (!current) {
      this.tree = new Node(data)
    } else {
      let isLeft = false;
      while (current !== null) {
        if (data < current.data) {
          previous = current;
          current = current.left;
          isLeft = true;
        } else {
          previous = current;
          current = current.right;
          isLeft = false;
        }
      }

      if (isLeft) {
        previous.left = new Node(data);
      } else {
        previous.right = new Node(data);
      }
    }
  }

  has(data) {
    let current = this.tree;
    if (!current) {
      return false;
    } else {
      let isFound = false;
      while (!isFound) {
        if (current === null) {
          return isFound;
        } else if (data < current.data) {
          if(current.data === data){
            isFound = true;
            break;
          }
          current = current.left;
        } else {
          if(current.data === data){
            isFound = true;
            break;
          }
          current = current.right;
        }
      }
      
      return isFound;
    }
  }

  find(data) {
    let current = this.tree;
    if (!current) {
      return null;
    } else {
      let isFound = false;
      while (!isFound) {
        if (current === null) {
          return null;
        } else if (data < current.data) {
          if(current.data === data){
            isFound = true;
            break;
          }
          current = current.left;
        } else {
          if(current.data === data){
            isFound = true;
            break;
          }
          current = current.right;
        }
      }
      
      return isFound ? current : null;
    }
  }

  remove(data) {
    this.tree = supportRemoveFunction(this.tree, data)

    function supportRemoveFunction(item, data){
      if (item === null) {
        return null;
      }
      
      if (data < item.data) {
        item.left = supportRemoveFunction(item.left, data); 
        return item;
      }
      
      if (data > item.data) {
        item.right = supportRemoveFunction(item.right, data);
        return item;
      }
      
      if(data === item.data){
        if (item.left === null && item.right === null) {
          item = null;
        } else if (item.left === null) {
          item = item.right;
        } else if (item.right === null) {
          item = item.left;
        } else {
          let minItem = item.right;
          while (minItem.left !== null) {
            minItem = minItem.left;
          }
          item.data = minItem.data;
          item.right = supportRemoveFunction(item.right, minItem.data); 
        }
        return item;
      }
    }
  }


  min() {
    let current = this.tree;

    if (current !== null) {
      while (current.left !== null) {
        current = current.left;
      }
      return current.data;
    } else {
      return;
    }
  }

  max() {
    let current = this.tree;

    if (current !== null) {
      while (current.right !== null) {
        current = current.right;
      }
      return current.data;
    } else {
      return;
    }
  }
}

module.exports = {
  BinarySearchTree
};