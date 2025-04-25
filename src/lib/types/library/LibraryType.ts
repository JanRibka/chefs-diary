type LibraryTypeProperty =
  | "registerUserMainError"
  | "loginUserMainError"
  | "loginRequired"
  | "loginMinLength"
  | "loginMaxLength"
  | "loginStartWithLetter"
  | "loginAllowedCharacters"
  | "loginExists"
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
  | "accessDenied"
  | "termsAgreementRequired";

type LibraryType = Record<LibraryTypeProperty, string>;

export default LibraryType;
