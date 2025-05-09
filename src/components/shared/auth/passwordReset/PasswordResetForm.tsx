import ConfirmPassword from "@/components/shared/confirmPassword/ConfirmPassword";
import Form from "@/components/shared/form/Form";
import FormAlert from "@/components/shared/form/FormAlert";
import FormHeading from "@/components/shared/form/FormHeading";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";
import PasswordResetStatusEnum from "@/lib/enums/PasswordResetStatusEnum";
import FormActionState from "@/lib/types/actions/FormActionState";
import {
  PasswordResetFormErrorType,
  PasswordResetFormType,
} from "@/lib/validations/schemas/shared/passwordReset/passwordResetFormValidationSchema";

type Props = {
  token: string;
  state: FormActionState<
    PasswordResetStatusEnum,
    PasswordResetFormType,
    PasswordResetFormErrorType
  >;
  errors: Record<string, string>;
  isLoading: boolean;
  action: (payload: FormData) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: () => void;
};

export default function PasswordResetForm({
  token,
  state,
  errors,
  isLoading,
  action,
  handleSubmit,
  handleChange,
}: Props) {
  return (
    <section>
      <div className="flex flex-col items-center">
        <FormHeading>Obnovení hesla</FormHeading>
        <FormAlert className="mb-4" title={errors.general} />

        <Form
          className="flex flex-col items-center"
          noValidate
          onSubmit={handleSubmit}
          action={action}
          onChange={handleChange}
        >
          <input
            name="token"
            type="text"
            className="hidden"
            readOnly
            value={token}
          />
          <ConfirmPassword
            valuePassword={state.form?.password}
            valueConfirmPassword={state.form?.confirmPassword}
            errors={errors}
          />

          <SubmitButton fullWidth color="primary" isLoading={isLoading}>
            Změnit heslo
          </SubmitButton>
        </Form>
      </div>
    </section>
  );
}
