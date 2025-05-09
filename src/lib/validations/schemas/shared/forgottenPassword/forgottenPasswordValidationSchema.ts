import { InferType, object, string } from "yup";

import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";
import { EMAIL_END_REGEX } from "@/lib/errorLibrary/auth/regexes/common/commonRegexes";

const forgottenPasswordFormValidationSchema = object().shape({
  email: string()
    .required(getErrorTextByKey("emailRequired"))
    .email(getErrorTextByKey("emailInvalid"))
    .matches(new RegExp(EMAIL_END_REGEX), getErrorTextByKey("emailInvalid")),
});

export default forgottenPasswordFormValidationSchema;

export type ForgottenPasswordFormType = InferType<
  typeof forgottenPasswordFormValidationSchema
>;
export type ForgottenPasswordFormErrorType = {
  [K in keyof ForgottenPasswordFormType | "general" | "timestamp"]?: string;
};
