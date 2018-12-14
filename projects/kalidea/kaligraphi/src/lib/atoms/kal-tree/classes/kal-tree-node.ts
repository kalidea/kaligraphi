export class KalTreeNode {

  children?: KalTreeNode[] = [];
  title ?= '';

  constructor(options: KalTreeNode) {
    this.children = options.children;
    this.title = options.title;
  }
}
