import LogInStatusEnum from '@/lib/enums/LogInStatusEnum';
import FormActionState from '@/lib/types/actions/FormActionState';
import {
    LogInFormErrorType, LogInFormType
} from '@/lib/validations/schemas/shared/logIn/logInValidationSchema';

/**
 * Props for LogInForm component
 */
export interface LogInFormProps {
  state: FormActionState<LogInStatusEnum, LogInFormType, LogInFormErrorType>;
  errors: Record<string, string>;
  isLoading: boolean;
  persistLoginCookieName: string;
  forgottenPasswordLink:
    | typeof import("@/lib/routes/webRoutes").default.ForgottenPassword
    | typeof import("@/lib/routes/adminRoutes").default.ForgottenPassword;
  action: (payload: FormData) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: () => void;
}
