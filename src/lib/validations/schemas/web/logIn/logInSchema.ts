import { bool, InferType, object, string } from "yup";

import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";
import { EMAIL_END_REGEX } from "@/lib/errorLibrary/auth/regexes/common/commonRegexes";

const logInFormValidationSchema = object().shape({
  email: string()
    .required(getErrorTextByKey("emailRequired"))
    .email(getErrorTextByKey("emailInvalid"))
    .matches(new RegExp(EMAIL_END_REGEX), getErrorTextByKey("emailInvalid")),
  password: string().required(getErrorTextByKey("passwordRequired")),
  persistLogin: bool().optional(),
});

export default logInFormValidationSchema;

export type LogInFormType = InferType<typeof logInFormValidationSchema>;
export type LogInFormErrorType = {
  [K in keyof LogInFormType | "general" | "timestamp"]?: string;
};
