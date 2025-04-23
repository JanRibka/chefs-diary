import * as Yup from "yup";

// TODO: Zvazit jestli tu mus9 b7t generika, ted s emi nechce nad t9m premyslet
export const validateField = <T extends object>(
  validationSchema: Yup.ObjectSchema<T>,
  name: string,
  value: unknown
): string => {
  let errorMessage: string = "";
  try {
    validationSchema
      .partial()
      .validateSync({ [name as string]: value }, { abortEarly: false });
  } catch (error) {
    (error as Yup.ValidationError).inner.every((err: Yup.ValidationError) => {
      if (!!errorMessage) {
        return false;
      }

      errorMessage = err.message;
    });
  }

  return errorMessage;
};

export const validateFieldAsync = async <T extends object>(
  validationSchema: Yup.ObjectSchema<T>,
  name: string,
  value: unknown
): Promise<string> => {
  let errorMessage: string = "";
  try {
    await validationSchema
      .partial()
      .validate({ [name as string]: value }, { abortEarly: false });
  } catch (error) {
    (error as Yup.ValidationError).inner.every((err: Yup.ValidationError) => {
      if (!!errorMessage) {
        return false;
      }

      errorMessage = err.message;
    });
  }

  return errorMessage;
};
