import Link from 'next/link';
import { memo } from 'react';

import Form from '@/components/shared/form/Form';
import FormAlert from '@/components/shared/form/FormAlert';
import FormHeading from '@/components/shared/form/FormHeading';
import SubmitButton from '@/components/shared/submitButton/SubmitButton';
import ValidateInput from '@/components/shared/validateInput/ValidateInput';
import ValidatePasswordInput from '@/components/shared/validatePasswordInput/ValidatePasswordInput';
import { nameof } from '@/lib/utils/nameof';
import logInFormValidationSchema, {
    LogInFormType
} from '@/lib/validations/schemas/shared/logIn/logInValidationSchema';
import { Checkbox } from '@heroui/react';
import { Tooltip } from '@heroui/tooltip';

import { LogInFormProps } from '../types/LogInFormProps';

/**
 * Props for LogInFormContent component
 */
interface LogInFormContentProps extends LogInFormProps {
  persistLogin: boolean | null;
  handleChangePersistLogin: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  refLogin: React.RefObject<HTMLInputElement | null>;
}

/**
 * LogInFormContent component - renders the login form UI
 * @param props - Component props
 * @returns JSX.Element
 */
const LogInFormContent = memo<LogInFormContentProps>(
  ({
    state,
    errors,
    isLoading,
    forgottenPasswordLink,
    action,
    handleSubmit,
    handleChange,
    persistLogin,
    handleChangePersistLogin,
    refLogin,
  }) => {
    return (
      <section suppressHydrationWarning>
        <div className="flex flex-col items-center">
          <FormHeading>Přihlášení</FormHeading>
          <FormAlert className="mb-4" title={errors.general} />

          <Form
            className="flex flex-col items-center"
            noValidate
            onSubmit={handleSubmit}
            action={action}
            onChange={handleChange}
          >
            <ValidateInput
              ref={refLogin}
              value={state.form?.email}
              name={nameof<LogInFormType>("email")}
              label="Email"
              className="mb-4"
              required
              errors={errors}
              autoComplete="username"
              fullWidth
              variant="faded"
              color="primary"
              validationSchema={logInFormValidationSchema}
            />

            <ValidatePasswordInput
              value={state.form?.password}
              name={nameof<LogInFormType>("password")}
              label="Heslo"
              className="mb-4"
              required
              errors={errors}
              autoComplete="current-password"
              fullWidth
              variant="faded"
              color="primary"
              validationSchema={logInFormValidationSchema}
            />

            <div className="flex items-center justify-between w-full mb-4">
              <Tooltip content="Odškrtněte, pokud jste na veřejném počítači">
                {persistLogin !== null && persistLogin !== undefined && (
                  <Checkbox
                    isSelected={persistLogin}
                    value={persistLogin.toString()}
                    name={nameof<LogInFormType>("persistLogin")}
                    onChange={handleChangePersistLogin}
                  >
                    Zůstat přihlášený
                  </Checkbox>
                )}
              </Tooltip>
              <p>
                <Link href={forgottenPasswordLink} className="text-primary">
                  Zapomněli jste heslo?
                </Link>
              </p>
            </div>

            <SubmitButton fullWidth color="primary" isLoading={isLoading}>
              Přihlásit
            </SubmitButton>
          </Form>
        </div>
      </section>
    );
  }
);

LogInFormContent.displayName = "LogInFormContent";

export default LogInFormContent;
