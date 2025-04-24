import LibraryType from '@/lib/types/library/LibraryType';
import { stringFormat } from '@/lib/utils/string';

const errorTexts: LibraryType = {
  registerUserMainError: "Registrace skončila chybou, zkuste to prosím znovu",
  loginUserMainError: "Přihlášení skončilo chybou, zkuste to prosím znovu",
  loginRequired: "Uživatelské jméno je povinné",
  loginMinLength: "Uživatelské jméno musí obsahovat alespoň {0} znak",
  loginMaxLength: "Uživatelské jméno může obsahovat maximálně {0} znak",
  loginStartWithLetter: "Uživatelské jméno musí začínat písmenem",
  loginAllowedCharacters:
    "Uživatelské jméno může obsahovat pouze písmena, čísla, pomlčku a podtržítko",
  emailRequired: "Email je povinný",
  emailInvalid: "Email není platná emailová adresa",
  emailExists: "Email již existuje",
  passwordRequired: "Heslo je povinné",
  passwordMinLength: "Heslo musí obsahovat alespoň {0} znak",
  passwordMaxLength: "Heslo může obsahovat maximálně {0} znak",
  passwordLoweCase: "Heslo musí obsahovat alespoň jedno malé písmeno",
  passwordUpperCase: "Heslo musí obsahovat alespoň jedno velké písmeno",
  passwordNumbers: "Heslo musí obsahovat alespoň jednu číslici",
  confirmPasswordRequired: "Heslo pro potvrzení je povinné",
  confirmPasswordOneOf: "Hesla se neshodují",
  incorrectLoginPassword: "Neplatné uživatelské jméno, nebo heslo",
  accessDenied: "Byl vám odepřen přístup",
  termsAgreementRequired: "Chybí souhlas s podmínkami",
};

const getErrorTextByKey = (key: keyof LibraryType, ...args: string[]) => {
  if (args.length > 0) {
    const errorText = stringFormat(
      errorTexts?.[key as keyof LibraryType] ?? key,
      ...args
    ).replace("znak", getZnakText(parseInt(args[0])));
    return errorText;
  }

  return errorTexts?.[key as keyof LibraryType] ?? key;
};

const getZnakText = (count: number) => {
  if (count === 1) return "znak";
  if (count >= 2 && count <= 4) return "znaky";
  return "znaků";
};

export default getErrorTextByKey;
