import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';

import {
    ResendVerificationEmailFormErrorType
} from '@/lib/validations/schemas/web/resendVerificationEmail/resendVerificationEmailValidationSchema';
import {
    validateResendVerificationLinkForm
} from '@/lib/validations/validations/web/resendVerificationLink/validateResendVerificationLinkForm';

/**
 * Hook for managing EmailNotVerified component actions
 * Handles form submission and change events
 *
 * @param setErrors - Function to set errors state
 * @returns Object with action handlers { handleSubmit, handleChange }
 */
export const useEmailNotVerifiedActions = (
  setErrors: Dispatch<SetStateAction<ResendVerificationEmailFormErrorType>>
) => {
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData);
      const validationResult = validateResendVerificationLinkForm(data);

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
    setErrors((prev) => ({
      ...prev,
      general: "",
    }));
  }, [setErrors]);

  // PERFORMANCE: useMemo pro stabilní objekt reference (prevence zbytečných re-renderů)
  return useMemo(
    () => ({
      handleSubmit,
      handleChange,
    }),
    [handleSubmit, handleChange]
  );
};
