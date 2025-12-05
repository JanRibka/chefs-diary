/**
 * Get variant index for rotating through 12 variants
 * Converts any index to 0-11 range for use with tailwind-variants
 *
 * @param index - Item index from array
 * @returns Variant index (0-11)
 *
 * @example
 * getVariantIndex(0) // => 0
 * getVariantIndex(13) // => 1
 * getVariantIndex(24) // => 0
 */
export function getVariantIndex(
  index: number
): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 {
  return (index % 12) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
}
