export function classes(
  ...clsList: ReadonlyArray<Record<string, boolean> | string | undefined>
): Record<string, boolean> | undefined {
  let empty = true;
  let result: Record<string, boolean> = {};
  for (let cls of clsList) {
    if (typeof cls === 'string') {
      result[cls] = true;
      empty = false;
    } else if (typeof cls === 'object') {
      for (let key in cls) {
        empty = false;
        result[key] = !!cls[key];
      }
    }
  }
  return empty ? undefined : result;
}
