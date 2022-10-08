/** Utility function to lerp 2 RGB colors in hex format.
    @param ca The first color in 6-digit hex format `#dddddd`.
    @param cb The second color in 6-digit hex format `#dddddd`.
    @param t Interpolation factor (0..1).
*/
export function mix(ca: string, cb: string, t: number): string {
  const d2h = (d: number) => d.toString(16);
  const h2d = (h: string) => parseInt(h, 16);

  let result: string[] = ['#'];
  for (let i = 1; i < 6; i += 2) {
    const c1 = h2d(ca.slice(i, i + 2)),
      c2 = h2d(cb.slice(i, i + 2));

    const cr = d2h(Math.floor(c1 + (c2 - c1) * t));
    result.push(`00${cr}`.slice(-2));
  }

  return result.join('');
}
