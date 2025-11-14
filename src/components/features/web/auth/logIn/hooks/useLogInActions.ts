import { useCallback, useMemo } from 'react';

import { validateLogInForm } from '@/lib/validations/validations/shared/logIn/validateLogInForm';

import { LogInActions } from '../types/LogInActions';
import { LogInState } from '../types/LogInState';

/**
 * Hook for managing LogIn component actions
 * @param state - LogIn state
 * @param setErrors - Function to set errors
 * @returns LogIn actions
 */
export function useLogInActions(
  state: LogInState,
  setErrors: React.Dispatch<React.SetStateAction<LogInState["errors"]>>
): LogInActions {
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData);
      const validationResult = validateLogInForm(data);

      if (!validationResult.success) {
        event.preventDefault();
        setErrors({
          ...validationResult.error,
          timestamp: new Date().getTime().toString(),
        });
      }
    },
    [setErrors]
  );

  const handleChange = useCallback(() => {
    if (state.errors.general) {
      setErrors((prev) => ({
        ...prev,
        general: "",
      }));
    }
  }, [state.errors.general, setErrors]);

  return useMemo(
    () => ({
      handleSubmit,
      handleChange,
    }),
    [handleSubmit, handleChange]
  );
}
