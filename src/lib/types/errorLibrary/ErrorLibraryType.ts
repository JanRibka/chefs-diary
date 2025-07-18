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
  | "emailMaxLength"
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
  | "verifyEmailVerificationTokenNotFound"
  | "passwordResetMainError"
  | "passwordResetTokenNotFound"
  | "passwordResetTokenExpired"
  | "adminRequired"
  | "editorRequired"
  | "unitNameRequired"
  | "unitNameMaxLength"
  | "unitDisplayNameRequired"
  | "unitDisplayNameMaxLength"
  | "unitGroupNameRequired"
  | "unitGroupNameMaxLength";

type ErrorLibraryType = Record<LibraryTypeProperty, string>;

export default ErrorLibraryType;
