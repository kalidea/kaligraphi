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

// tslint:disable-next-line:max-classes-per-file
export class KalFlatTreeNode {

  id: string;

  children?: KalFlatTreeNode[];

  title ? = '';

  level ? = 0;

  expandable ? = false;

  constructor(options?: KalFlatTreeNode) {

    if (options) {
      Object.keys(options).forEach(k => {
        const key = k as keyof KalFlatTreeNode;

        if (typeof options[key] !== 'undefined') {
          // @ts-ignore
          this[key] = options[key];
        }
      });
    }
  }
}
