"use client";

import { memo } from 'react';

import LogInFormContent from './components/LogInFormContent';
import { useLogInFormState } from './hooks/useLogInFormState';
import { LogInFormProps } from './types/LogInFormProps';

/**
 * LogInForm component - Main orchestrator for login form functionality
 * Uses Pure Orchestration Pattern with multi-file structure
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const LogInForm = memo<LogInFormProps>((props) => {
  // PERFORMANCE: useLogInFormState hook handles persist login and focus logic
  const { refLogin, persistLogin, handleChangePersistLogin } =
    useLogInFormState(props.persistLoginCookieName);

  // PERFORMANCE: Render form content with all necessary props
  return (
    <LogInFormContent
      {...props}
      persistLogin={persistLogin}
      handleChangePersistLogin={handleChangePersistLogin}
      refLogin={refLogin}
    />
  );
});

LogInForm.displayName = "LogInForm";

export default LogInForm;
