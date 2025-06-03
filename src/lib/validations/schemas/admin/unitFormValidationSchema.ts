import { InferType, object, string } from "yup";

import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";

const unitFormValidationSchema = object().shape({
  name: string()
    .required(getErrorTextByKey("unitNameRequired"))
    .max(10, getErrorTextByKey("unitNameMaxLength", "10")),
  // displayName: string()
  //   .required(getErrorTextByKey("unitDisplayNameRequired"))
  //   .max(10, getErrorTextByKey("unitDisplayNameMaxLength", "10")),
});

export default unitFormValidationSchema;

export type UnitFormType = InferType<typeof unitFormValidationSchema>;
export type UnitFormErrorType = {
  [K in keyof UnitFormType | "general" | "timestamp"]?: string;
};
