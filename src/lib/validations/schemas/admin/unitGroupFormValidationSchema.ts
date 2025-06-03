import { InferType, object, string } from "yup";

import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";

const unitGroupFormValidationSchema = object().shape({
  name: string()
    .required(getErrorTextByKey("unitGroupNameRequired"))
    .max(20, getErrorTextByKey("unitGroupNameMaxLength", "20")),
});

export default unitGroupFormValidationSchema;

export type UnitGroupFormType = InferType<typeof unitGroupFormValidationSchema>;
export type UnitGroupFormErrorType = {
  [K in keyof UnitGroupFormType | "general" | "timestamp"]?: string;
};
