import { InferType, object, string } from "yup";

import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";

const ingredientFormValidationSchema = object().shape({
  name: string()
    .required(getErrorTextByKey("ingredientNameRequired"))
    .max(20, getErrorTextByKey("ingredientNameMaxLength", "20")),
});

export default ingredientFormValidationSchema;

export type IngredientFormType = InferType<
  typeof ingredientFormValidationSchema
>;
export type IngredientFormErrorType = {
  [K in keyof IngredientFormType | "general" | "timestamp"]?: string;
};
// TODO: General a timestamp by mohly být v nějaké generalError typu
