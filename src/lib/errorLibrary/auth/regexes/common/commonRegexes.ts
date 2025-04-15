export const LOWERCASE_REGEX = "[a-z]";
export const LOWER_UPPERCASE_REGEX = "[a-zA-Z]";
export const LOWER_UPPERCASE_NUMBERS_REGEX = "[a-zA-Z0-9]";
export const loweUpperCaseNumberSpecialCharRegex = (specialChar: string) =>
  `[a-zA-Z0-9${specialChar}]`;
export const UPPERCASE_REGEX = "[A-Z]";
export const NUMBERS_REGEX = "[0-9]";
export const customCharRegex = (customChar: string) => {
  return `[${customChar}]`;
};
export const SPECIAL_CHARACTERS_REGEX = "[$@!%*#?&(){}/+\\_\\-.;,~><:|]";
export const minMaxLengthRegex = (min: number, max?: number) => {
  return `{${min},${max}}`;
};
export const ALL_ALFA_NUMERIC_REGEX = "[\\w]";
export const allAlfaNumericCustomCharRegex = (customChar: string) => {
  return `[\\w${customChar}]`;
};
export const EMAIL_END_REGEX = "\\.[a-zA-Z]{2,4}$";
