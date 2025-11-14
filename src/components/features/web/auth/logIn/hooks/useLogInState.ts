"use client";

import { useActionState, useEffect, useMemo, useState } from 'react';

import { logInAction } from '@/actions/web/auth';
import useIsFirstRender from '@/lib/hooks/useIsFirstRender';
import { LogInFormErrorType } from '@/lib/validations/schemas/shared/logIn/logInValidationSchema';

import { LogInState } from '../types/LogInState';

/**
 * Hook for managing LogIn component state
 * @returns LogIn state and server action state
 */
export function useLogInState(): LogInState & {
  state: Awaited<ReturnType<typeof logInAction>>;
  action: (payload: FormData) => void;
} {
  const isFirstRender = useIsFirstRender();

  const [state, action, isLoading] = useActionState(logInAction, {});
  const [errors, setErrors] = useState<LogInFormErrorType>({});

  useEffect(() => {
    if (isFirstRender || !state.errors) return;

    setErrors(state.errors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return useMemo(
    () => ({
      state,
      action,
      errors,
      isLoading,
    }),
    [state, action, errors, isLoading]
  );
}
