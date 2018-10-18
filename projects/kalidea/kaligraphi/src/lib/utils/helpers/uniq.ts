/**
 * helpers for unicity
 */

class Unicity {
  private counter = 0;
  get next() {
    return this.counter++;
  }
}

const unicity = new Unicity();

export function uniqid(prefix = '') {
  return prefix + unicity.next;
}
