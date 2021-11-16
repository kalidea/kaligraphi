/**
 * Moves an array item from one position to another.
 * Note: This is a pure function so a new array will be returned, instead of altering the array argument.
 *
 * @see https://github.com/granteagon/move
 */
export function move(array: any[], moveIndex: number, toIndex: number) {
  const startElement = array.splice(moveIndex, 1);

  array.splice(toIndex, 0, ...startElement);
  return array;
}
