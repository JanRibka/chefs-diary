import { InferType, object, ref, string } from "yup";

import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";
import {
  LOWERCASE_REGEX,
  NUMBERS_REGEX,
  UPPERCASE_REGEX,
} from "@/lib/errorLibrary/auth/regexes/common/commonRegexes";

const confirmPasswordValidationSchema = object().shape({
  password: string()
    .required(getErrorTextByKey("passwordRequired"))
    .matches(new RegExp(LOWERCASE_REGEX), getErrorTextByKey("passwordLoweCase"))
    .matches(
      new RegExp(UPPERCASE_REGEX),
      getErrorTextByKey("passwordUpperCase")
    )
    .matches(new RegExp(NUMBERS_REGEX), getErrorTextByKey("passwordNumbers"))
    .min(8, getErrorTextByKey("passwordMinLength", "8"))
    .max(24, getErrorTextByKey("passwordMaxLength", "24")),
  confirmPassword: string()
    .required(getErrorTextByKey("confirmPasswordRequired"))
    .oneOf([ref("password")], getErrorTextByKey("confirmPasswordOneOf")),
});

export default confirmPasswordValidationSchema;

export type ConfirmPasswordFormType = InferType<
  typeof confirmPasswordValidationSchema
>;
export type ConfirmPasswordFormErrorType = {
  [K in keyof ConfirmPasswordFormType]?: string;
};
