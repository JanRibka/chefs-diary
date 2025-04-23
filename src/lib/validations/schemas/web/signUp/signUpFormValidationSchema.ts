import { bool, InferType, string } from "yup";

import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";
import {
  EMAIL_END_REGEX,
  LOWER_UPPERCASE_REGEX,
  loweUpperCaseNumberSpecialCharRegex,
} from "@/lib/errorLibrary/auth/regexes/common/commonRegexes";

import confirmPasswordValidationSchema from "../../shared/confirmPassword/confirmPasswordSchema";

const signUpFormValidationSchema = confirmPasswordValidationSchema.shape({
  userName: string()
    .required(getErrorTextByKey("loginRequired"))
    .matches(
      new RegExp(`^${LOWER_UPPERCASE_REGEX}`),
      getErrorTextByKey("loginStartWithLetter")
    )
    .matches(
      new RegExp(`^${loweUpperCaseNumberSpecialCharRegex("-_")}*$`),
      getErrorTextByKey("loginAllowedCharacters")
    )
    .min(4, getErrorTextByKey("loginMinLength", "4"))
    .max(24, getErrorTextByKey("loginMaxLength", "24")),
  email: string()
    .required(getErrorTextByKey("emailRequired"))
    .email(getErrorTextByKey("emailInvalid"))
    .matches(new RegExp(EMAIL_END_REGEX), getErrorTextByKey("emailInvalid")),

  termsAgreement: bool().required(getErrorTextByKey("termsAgreementRequired")),
});

export default signUpFormValidationSchema;

export type SignUpFormType = InferType<typeof signUpFormValidationSchema>;
export type SignUpFormErrorType = {
  [K in keyof SignUpFormType | "timestamp"]?: string;
};

export type SignUpValidationResultState = {
  form?: Partial<SignUpFormType>;
  errors?: SignUpFormErrorType;
};
