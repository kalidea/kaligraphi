/**
 * Clamps a value to be between two numbers, by default 0 and 100.
 */
export function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}
