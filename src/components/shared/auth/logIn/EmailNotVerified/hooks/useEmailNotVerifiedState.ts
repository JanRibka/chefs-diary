import { useActionState, useEffect, useMemo, useState } from 'react';

import { resendVerificationLinkAction } from '@/actions/web/verifyEmail';
import useIsFirstRender from '@/lib/hooks/useIsFirstRender';
import {
    ResendVerificationEmailFormErrorType
} from '@/lib/validations/schemas/web/resendVerificationEmail/resendVerificationEmailValidationSchema';

/**
 * Hook for managing EmailNotVerified component state
 * Handles form state, errors, and loading states
 *
 * @returns Object with state values { state, errors, isLoading }
 */
export const useEmailNotVerifiedState = () => {
  const isFirstRender = useIsFirstRender();

  const [state, action, isLoading] = useActionState(
    resendVerificationLinkAction,
    {}
  );
  const [errors, setErrors] = useState<ResendVerificationEmailFormErrorType>(
    {}
  );

  useEffect(() => {
    if (isFirstRender || !state.errors) return;

    setErrors(state.errors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // PERFORMANCE: useMemo pro stabilní objekt reference (prevence zbytečných re-renderů)
  return useMemo(
    () => ({
      state,
      action,
      isLoading,
      errors,
      setErrors,
    }),
    [state, action, isLoading, errors, setErrors]
  );
};
