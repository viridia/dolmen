/** Utility function to lerp 2 RGB colors in hex format.
    @param color The first color in 6-digit hex format `#dddddd`.
    @param alpha Alpha value (0 - 1).
*/
export function setAlpha(color: string, alpha: number): string {
  const d2h = (d: number) => d.toString(16);

  return `${color.slice(0, 7)}${d2h(alpha * 255)}`;
}
