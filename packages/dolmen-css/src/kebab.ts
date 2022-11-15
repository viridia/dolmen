// From https://stackoverflow.com/questions/63116039/camelcase-to-kebab-case
export const camelToKebab = (str: string) =>
  str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase());
