import { LogInFormErrorType } from '@/lib/validations/schemas/shared/logIn/logInValidationSchema';

/**
 * State for LogIn component
 */
export interface LogInState {
  errors: LogInFormErrorType;
  isLoading: boolean;
}
