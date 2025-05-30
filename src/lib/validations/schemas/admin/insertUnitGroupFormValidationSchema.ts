import { InferType, object, string } from "yup";

import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";

const insertUnitGroupFormValidationSchema = object().shape({
  name: string()
    .required(getErrorTextByKey("unitGroupNameRequired"))
    .max(20, getErrorTextByKey("unitGroupNameMaxLength", "20")),
});

export default insertUnitGroupFormValidationSchema;

export type InsertUnitGroupFormType = InferType<
  typeof insertUnitGroupFormValidationSchema
>;
export type InsertUnitGroupFormErrorType = {
  [K in keyof InsertUnitGroupFormType | "general" | "timestamp"]?: string;
};
