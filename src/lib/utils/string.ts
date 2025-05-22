export const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const stringFormat = (str: string, ...args: string[]): string => {
  return str.replace(/{(\d+)}/g, (match, number: string) => {
    const argIndex: number = parseInt(number);
    return typeof args[argIndex] !== "undefined" ? args[argIndex] : match;
  });
};

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}
