import { InferType, object, string } from "yup";

import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";
import { EMAIL_END_REGEX } from "@/lib/errorLibrary/auth/regexes/common/commonRegexes";

const resendVerificationEmailValidationSchema = object().shape({
  email: string()
    .required(getErrorTextByKey("emailRequired"))
    .email(getErrorTextByKey("emailInvalid"))
    .matches(new RegExp(EMAIL_END_REGEX), getErrorTextByKey("emailInvalid")),
});

export default resendVerificationEmailValidationSchema;

export type ResendVerificationEmailFormType = InferType<
  typeof resendVerificationEmailValidationSchema
>;
export type ResendVerificationEmailFormErrorType = {
  [K in
    | keyof ResendVerificationEmailFormType
    | "general"
    | "timestamp"]?: string;
};
