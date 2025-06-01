import { InferType, object, string } from "yup";

import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";

const editUnitGroupFormValidationSchema = object().shape({
  name: string()
    .required(getErrorTextByKey("unitGroupNameRequired"))
    .max(20, getErrorTextByKey("unitGroupNameMaxLength", "20")),
});

export default editUnitGroupFormValidationSchema;

export type EditUnitGroupFormType = InferType<
  typeof editUnitGroupFormValidationSchema
>;
export type EditUnitGroupFormErrorType = {
  [K in keyof EditUnitGroupFormType | "general" | "timestamp"]?: string;
};
