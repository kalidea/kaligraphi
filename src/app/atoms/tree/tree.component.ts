import { ChangeDetectionStrategy, Component, Injectable, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { KalTreeDataSource } from '@kalidea/kaligraphi';
import { NestedTreeControl } from '@angular/cdk/tree';

export class FileNode {
  children?: FileNode[];

  title: string;
}

/**
 * The Json tree data in string. The data could be parsed into Json object
 */
const TREE_DATA = JSON.stringify({
  Applications: {
    Calendar: 'app',
    Chrome: 'app',
    Webstorm: 'app'
  },
  Documents: {
    angular: {
      src: {
        compiler: 'ts',
        core: 'ts'
      }
    },
    material2: {
      src: {
        button: 'ts',
        checkbox: 'ts',
        input: 'ts'
      }
    }
  },
  Downloads: {
    October: 'pdf',
    November: 'pdf',
    Tutorial: 'html'
  },
  Pictures: {
    'Photo Booth Library': {
      Contents: 'dir',
      Pictures: 'dir'
    },
    Sun: 'png',
    Woods: 'jpg'
  }
});

@Injectable({
  providedIn: 'root'
})
export class FileDatabase {
  dataChange = new BehaviorSubject<FileNode[]>([]);

  constructor() {
    this.initialize();
  }

  get data(): FileNode[] {
    return this.dataChange.value;
  }

  initialize() {
    // Parse the string to json object.
    const dataObject = JSON.parse(TREE_DATA);

    // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
    //     file node as children.
    const data = this.buildFileTree(dataObject, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */
  buildFileTree(obj: { [key: string]: any }, level: number): FileNode[] {
    const tree = Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new FileNode();
      node.title = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        }
      }

      return accumulator.concat(node);
    }, []);
    // console.log(tree);
    return tree;
  }
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeComponent {


  dataSource: KalTreeDataSource<FileNode>;

  constructor(private database: FileDatabase) {
    this.dataSource = new KalTreeDataSource();

    database.dataChange.subscribe(data => this.dataSource.data = data);
  }

}
