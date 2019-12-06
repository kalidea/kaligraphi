/**
 * Capitalize the given word.
 */
export function capitalize(word: string): string {
  return word.charAt(0).toLocaleUpperCase() + word.slice(1);
}
