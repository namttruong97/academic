export const classMapping = (...arrays: Array<string | boolean | undefined>) =>
  arrays
    .filter((item) => item)
    .join(' ')
    .trim()
    .replace(/\s{2,}/g, ' ');

export const capitalized = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
