"use client";

import { useCallback, useEffect, useMemo, useRef } from 'react';

import useToggle from '@/lib/hooks/useToggle';

/**
 * Hook for managing LogInForm component state
 * Handles persist login toggle and input focus
 *
 * @param persistLoginCookieName - Name of the cookie for persist login
 * @returns Object with persist login state and handlers
 */
export const useLogInFormState = (persistLoginCookieName: string) => {
  const refLogin = useRef<HTMLInputElement>(null);

  const [persistLogin, setPersistLogin] = useToggle(
    persistLoginCookieName,
    false
  );

  useEffect(() => {
    refLogin.current?.focus();
  }, []);

  const handleChangePersistLogin = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.currentTarget.checked;
      setPersistLogin(checked);
    },
    [setPersistLogin]
  );

  return useMemo(
    () => ({
      refLogin,
      persistLogin,
      handleChangePersistLogin,
    }),
    [persistLogin, handleChangePersistLogin]
  );
};
