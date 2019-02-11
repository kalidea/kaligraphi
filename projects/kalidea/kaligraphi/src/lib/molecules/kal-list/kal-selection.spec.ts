import {
  KalSelectionModel,
} from 'projects/kalidea/kaligraphi/src/lib/molecules/kal-list/kal-list-selection';
import { cloneDeep, range } from 'lodash';

const items = range(0, 4).map(id => ({id}));

describe('KalSelectionModel', () => {

  it('should create an instance', () => {
    const selection = new KalSelectionModel();
    expect(selection).toBeTruthy();
  });

  it('should select item in single selection mode (all: false)', () => {
    const selection = new KalSelectionModel();

    selection.select(items[0]);

    expect(selection.isSelected(items[0])).toBeTruthy('first item should be selected');
    expect(selection.isSelected(items[1])).toBeFalsy('second item should not be selected');

    selection.select(cloneDeep(items[1]));

    expect(selection.isSelected(items[1])).toBeTruthy('second item should be selected');

  });

  it('should select item in multiple selection mode (all: true)', () => {
    const selection = new KalSelectionModel({multiple: true, all: true});

    const item = items[0];

    selection.deselect(item);

    expect(selection.isSelected(item)).toBeFalsy('first item should not be selected');

    selection.select(cloneDeep(item));

    expect(selection.isSelected(item)).toBeTruthy('first item should be selected');

  });

  it('should select item in multiple selection mode', () => {
    const selection = new KalSelectionModel({multiple: true});

    selection.select(items[0]);
    selection.select(items[1]);

    expect(selection.isSelected(items[0])).toBeTruthy();
    expect(selection.isSelected(items[1])).toBeTruthy();
    expect(selection.isSelected(items[2])).toBeFalsy();
    expect(selection.isSelected(items[3])).toBeFalsy();
  });

  it('should deselect item in multiple selection mode', () => {
    const selection = new KalSelectionModel({multiple: true});

    selection.select(items[0]);
    selection.select(items[1]);

    selection.deselect(items[0]);

    expect(selection.isSelected(items[1])).toBeTruthy();
    expect(selection.isSelected(items[0])).toBeFalsy();

    selection.select(items[1]);

    expect(selection.isSelected(items[1])).toBeTruthy();
    expect(selection.isSelected(items[0])).toBeFalsy();

  });

  it('should clear the selection', () => {
    const selection = new KalSelectionModel({multiple: true});

    selection.select(items[0]);
    selection.select(items[1]);

    selection.clear();

    expect(selection.isSelected(items[0])).toBeFalsy();
    expect(selection.isSelected(items[1])).toBeFalsy();

  });

  it('should select all items', () => {
    const selection = new KalSelectionModel({multiple: true, all: true});

    items.forEach(
      item => {
        expect(selection.isSelected(item)).toBeTruthy();
      }
    );

  });

  it('should verify that items are excluded (all: true)', () => {
    const selection = new KalSelectionModel({multiple: true, all: true});
    const selectedItem = items[0];

    selection.deselect(selectedItem);

    expect(selection.isSelected(selectedItem)).toBeFalsy();

    items.filter(element => element !== selectedItem).forEach(
      item => {
        expect(selection.isSelected(item)).toBeTruthy();
      }
    );
  });

  it('should verify that items are included after deselection (all: true)', () => {
    const selection = new KalSelectionModel({multiple: true, all: true});
    const selectedItem1 = items[0];
    const selectedItem2 = items[1];

    selection.deselect(selectedItem1);
    selection.select(selectedItem1);

    selection.deselect(selectedItem2);
    selection.select(selectedItem2);

    expect(selection.isSelected(selectedItem1)).toBeTruthy();
    expect(selection.isSelected(selectedItem2)).toBeTruthy();
  });

  it('should verify that the selection is empty (all: false)', () => {
    const selection = new KalSelectionModel({multiple: true});

    expect(selection.isEmpty()).toBeTruthy();

    selection.select(items[0]);
    selection.select(items[1]);

    expect(selection.isEmpty()).toBeFalsy();
  });

  it('should verify that the selection is empty (all: true)', () => {
    const selection = new KalSelectionModel({multiple: true, all: true, count: items.length});

    expect(selection.isEmpty()).toBeFalsy();

    selection.deselect(items[0]);

    expect(selection.isEmpty()).toBeFalsy();

    items.forEach(
      item => {
        selection.deselect(item);
      }
    );

    expect(selection.isEmpty()).toBeTruthy();

  });

  it('should verify that the selection has value (all: true)', () => {
    const selection = new KalSelectionModel({multiple: true, all: true, count: items.length});

    expect(selection.hasValue()).toBeTruthy();

    selection.deselect(items[0]);

    expect(selection.hasValue()).toBeTruthy();

    items.forEach(
      item => {
        selection.deselect(item);
      }
    );

    expect(selection.hasValue()).toBeFalsy();

  });

  it('should toggle item (all: false)', () => {
    const selection = new KalSelectionModel({multiple: true});
    const selectedItem = items[0];

    expect(selection.isSelected(selectedItem)).toBeFalsy();

    selection.toggle(selectedItem);

    expect(selection.isSelected(selectedItem)).toBeTruthy();

    selection.toggle(selectedItem);

    expect(selection.isSelected(selectedItem)).toBeFalsy();

  });

  it('should toggle item (all: true)', () => {
    const selection = new KalSelectionModel({multiple: true, all: true});
    const selectedItem = items[0];

    expect(selection.isSelected(selectedItem)).toBeTruthy();

    selection.toggle(selectedItem);

    expect(selection.isSelected(selectedItem)).toBeFalsy();

    selection.toggle(selectedItem);

    expect(selection.isSelected(selectedItem)).toBeTruthy();

  });

  it('should count items (all: false)', () => {
    const selection = new KalSelectionModel({multiple: true, count: items.length});

    expect(selection.total).toEqual(0);

    selection.select(items[0]);

    expect(selection.total).toEqual(1);

    selection.select(items[0]);

    expect(selection.total).toEqual(1);

    selection.select(cloneDeep(items[0]));

    expect(selection.total).toEqual(1);

  });

  it('should count items (all: true)', () => {
    const selection = new KalSelectionModel({multiple: true, count: items.length, all: true});

    expect(selection.total).toEqual(items.length);

    selection.deselect(items[0]);
    selection.deselect(cloneDeep(items[1]));

    expect(selection.total).toEqual(items.length - 2);

    selection.select(items[0]);
    selection.select(cloneDeep(items[1]));

    expect(selection.total).toEqual(items.length);

  });
});
