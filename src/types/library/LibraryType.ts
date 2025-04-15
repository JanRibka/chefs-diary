type LibraryTypeProperty =
  | "registerUserMainError"
  | "loginUserMainError"
  | "loginRequired"
  | "loginMinLength"
  | "loginMaxLength"
  | "loginStartWithLetter"
  | "loginAllowedCharacters"
  | "emailRequired"
  | "emailInvalid"
  | "emailExists"
  | "passwordRequired"
  | "passwordMinLength"
  | "passwordMaxLength"
  | "passwordLoweCase"
  | "passwordUpperCase"
  | "passwordNumbers"
  | "confirmPasswordRequired"
  | "confirmPasswordOneOf"
  | "incorrectLoginPassword"
  | "accessDenied";

type LibraryType = Record<LibraryTypeProperty, string>;

export default LibraryType;
