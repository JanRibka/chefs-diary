import { InferType } from "yup";

import confirmPasswordValidationSchema from "../confirmPassword/confirmPasswordValidationSchema";

const passwordResetFormValidationSchema = confirmPasswordValidationSchema.shape(
  {}
);

export default passwordResetFormValidationSchema;

export type PasswordResetFormType = InferType<
  typeof passwordResetFormValidationSchema
>;
export type PasswordResetFormErrorType = {
  [K in keyof PasswordResetFormType | "general" | "timestamp"]?: string;
};
