import { LogInFormErrorType } from "@/lib/validations/schemas/shared/logIn/logInValidationSchema";

/**
 * State for LogIn component
 */
export interface LogInState {
  errors: LogInFormErrorType;
  setErrors: React.Dispatch<React.SetStateAction<LogInFormErrorType>>;
  isLoading: boolean;
}
