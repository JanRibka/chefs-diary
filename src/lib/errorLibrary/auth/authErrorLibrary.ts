import ErrorLibraryType from "@/lib/types/errorLibrary/ErrorLibraryType";
import { stringFormat } from "@/lib/utils/string";

const errorTexts: ErrorLibraryType = {
  registerUserMainError: "Registrace skončila chybou, zkuste to prosím znovu",
  userNameUserMainError: "Přihlášení skončilo chybou, zkuste to prosím znovu",
  userNameRequired: "Uživatelské jméno je povinné",
  userNameMinLength: "Uživatelské jméno musí obsahovat alespoň {0} znak",
  userNameMaxLength: "Uživatelské jméno může obsahovat maximálně {0} znak",
  userNameStartWithLetter: "Uživatelské jméno musí začínat písmenem",
  userNameAllowedCharacters:
    "Uživatelské jméno může obsahovat pouze písmena, čísla, pomlčku a podtržítko",
  userNameRestricted:
    "Byl zaznamenán velký počet přihlášení. Přihlášení je dočasně zablokováno z bezpečnostních důvodů. Zkuste to prosím za pár minut.",
  userNameExists: "Uživatelské jméno již existuje",
  emailRequired: "Email je povinný",
  emailInvalid: "Email není platná emailová adresa",
  emailExists: "Email již existuje",
  emailNotVerified: "Email není ověřený",
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
  resendVerificationEmailMainError:
    "Odeslání nového odkazu skončilo chybou, zkuste to prosím znovu",
  verificationTokenNotFound: "E-mail pro odeslání odkazu není platný",
  verificationTokenExpired: "Platnost odkazu vypršela",
  verifyTokenMainError:
    "Ověřování emailu skončilo chybou, zkuste to prosím znovu",
};

const getErrorTextByKey = (key: keyof ErrorLibraryType, ...args: string[]) => {
  if (args.length > 0) {
    const errorText = stringFormat(
      errorTexts?.[key as keyof ErrorLibraryType] ?? key,
      ...args
    ).replace("znak", getZnakText(parseInt(args[0])));
    return errorText;
  }

  return errorTexts?.[key as keyof ErrorLibraryType] ?? key;
};

const getZnakText = (count: number) => {
  if (count === 1) return "znak";
  if (count >= 2 && count <= 4) return "znaky";
  return "znaků";
};

export default getErrorTextByKey;
