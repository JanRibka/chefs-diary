import { bool, InferType, string } from 'yup';

import getErrorTextByKey from '@/lib/errorLibrary/auth/authErrorLibrary';
import {
    EMAIL_END_REGEX, LOWER_UPPERCASE_REGEX, loweUpperCaseNumberSpecialCharRegex
} from '@/lib/errorLibrary/auth/regexes/common/commonRegexes';

import confirmPasswordValidationSchema from '../../shared/confirmPassword/confirmPasswordValidationSchema';

const signUpFormValidationSchema = confirmPasswordValidationSchema.shape({
  userName: string()
    .required(getErrorTextByKey("userNameRequired"))
    .matches(
      new RegExp(`^${LOWER_UPPERCASE_REGEX}`),
      getErrorTextByKey("userNameStartWithLetter")
    )
    .matches(
      new RegExp(`^${loweUpperCaseNumberSpecialCharRegex("-_")}*$`),
      getErrorTextByKey("userNameAllowedCharacters")
    )
    .min(4, getErrorTextByKey("userNameMinLength", "4"))
    .max(24, getErrorTextByKey("userNameMaxLength", "24")),
  email: string()
    .required(getErrorTextByKey("emailRequired"))
    .email(getErrorTextByKey("emailInvalid"))
    .max(50, getErrorTextByKey("emailMaxLength", "50"))
    .matches(new RegExp(EMAIL_END_REGEX), getErrorTextByKey("emailInvalid")),

  termsAgreement: bool().required(getErrorTextByKey("termsAgreementRequired")),
});

export default signUpFormValidationSchema;

export type SignUpFormType = InferType<typeof signUpFormValidationSchema>;
export type SignUpFormErrorType = {
  [K in keyof SignUpFormType | "general" | "timestamp"]?: string;
};
