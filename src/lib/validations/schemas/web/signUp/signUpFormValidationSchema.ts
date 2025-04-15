import { bool, InferType, object, ref, string } from "yup";

import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";
import {
  EMAIL_END_REGEX,
  LOWER_UPPERCASE_REGEX,
  LOWERCASE_REGEX,
  loweUpperCaseNumberSpecialCharRegex,
  NUMBERS_REGEX,
  UPPERCASE_REGEX,
} from "@/lib/errorLibrary/auth/regexes/common/commonRegexes";

const signUpFormValidationSchema = object().shape({
  userName: string()
    .required(getErrorTextByKey("loginRequired"))
    .min(4, getErrorTextByKey("loginMinLength", "4"))
    .max(24, getErrorTextByKey("loginMaxLength", "24"))
    .matches(
      new RegExp(`^${LOWER_UPPERCASE_REGEX}`),
      getErrorTextByKey("loginStartWithLetter")
    )
    .matches(
      new RegExp(`${loweUpperCaseNumberSpecialCharRegex("-_")}$`),
      getErrorTextByKey("loginAllowedCharacters")
    ),
  email: string()
    .email(getErrorTextByKey("emailInvalid"))
    .required(getErrorTextByKey("emailRequired"))
    .matches(new RegExp(EMAIL_END_REGEX), getErrorTextByKey("emailInvalid")),
  password: string()
    .required(getErrorTextByKey("passwordRequired"))
    .min(8, getErrorTextByKey("passwordMinLength", "8"))
    .max(24, getErrorTextByKey("passwordMaxLength", "24"))
    .matches(new RegExp(LOWERCASE_REGEX), getErrorTextByKey("passwordLoweCase"))
    .matches(
      new RegExp(UPPERCASE_REGEX),
      getErrorTextByKey("passwordUpperCase")
    )
    .matches(new RegExp(NUMBERS_REGEX), getErrorTextByKey("passwordNumbers")),
  confirmPassword: string()
    .required(getErrorTextByKey("confirmPasswordRequired"))
    .oneOf([ref("password")], getErrorTextByKey("confirmPasswordOneOf")),
  termsAgreement: bool().oneOf([true], getErrorTextByKey("accessDenied")),
});

export default signUpFormValidationSchema;

export type SignUpFormType = InferType<typeof signUpFormValidationSchema>;

export type SignUpActionState = {
  form?: Partial<SignUpFormType>;
  errors?: {
    [K in keyof SignUpFormType]?: string;
  };
};
