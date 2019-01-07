export class KalTreeNode {

  id: string;

  children?: KalTreeNode[];

  title ? = '';

  constructor(options?: KalTreeNode) {
    if (options) {
      options = Object.assign(new KalTreeNode(), options);
      this.id = options.id;
      this.children = options.children;
      this.title = options.title;
    }
  }
}

export class KalFlatTreeNode {

  id: string;

  children?: KalFlatTreeNode[];

  title ? = '';

  level ? = 0;

  expandable ? = false;

  constructor(options?: KalFlatTreeNode) {
    if (options) {
      options = Object.assign(new KalFlatTreeNode(), options);
      this.id = options.id;
      this.children = options.children;
      this.title = options.title;
      this.level = options.level;
      this.expandable = options.expandable === true;
    }
  }
}
