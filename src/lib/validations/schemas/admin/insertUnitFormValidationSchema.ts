import { InferType, object, string } from "yup";

import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";

const insertUnitFormValidationSchema = object().shape({
  name: string()
    .required(getErrorTextByKey("unitNameRequired"))
    .max(10, getErrorTextByKey("unitNameMaxLength", "10")),
  // displayName: string()
  //   .required(getErrorTextByKey("unitDisplayNameRequired"))
  //   .max(10, getErrorTextByKey("unitDisplayNameMaxLength", "10")),
});

export default insertUnitFormValidationSchema;

export type InsertUnitFormType = InferType<
  typeof insertUnitFormValidationSchema
>;
export type InsertUnitFormErrorType = {
  [K in keyof InsertUnitFormType | "general" | "timestamp"]?: string;
};
