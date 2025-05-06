type LibraryTypeProperty =
  | "registerUserMainError"
  | "userNameUserMainError"
  | "userNameRequired"
  | "userNameMinLength"
  | "userNameMaxLength"
  | "userNameStartWithLetter"
  | "userNameAllowedCharacters"
  | "userNameExists"
  | "userNameRestricted"
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
  | "verifyTokenMainError"
  | "verifyEmailVerificationTokenNotFound";

type ErrorLibraryType = Record<LibraryTypeProperty, string>;

export default ErrorLibraryType;
