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
  | "emailNotVerified"
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
  | "termsAgreementRequired"
  | "resendVerificationEmailMainError"
  | "verificationTokenNotFound"
  | "verificationTokenExpired"
  | "verifyTokenMainError";

type ErrorLibraryType = Record<LibraryTypeProperty, string>;

export default ErrorLibraryType;
