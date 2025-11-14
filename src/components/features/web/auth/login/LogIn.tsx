"use client";

import { memo } from 'react';

import LogInContent from '../logIn/components/LogInContent';
import LogInEmailNotVerified from '../logIn/components/LogInEmailNotVerified';
import LogInSuccess from '../logIn/components/LogInSuccess';
import { useLogInOrchestration } from '../logIn/hooks/useLogInOrchestration';

/**
 * LogIn component - Main orchestrator for login functionality
 * Uses Pure Orchestration Pattern with multi-file structure
 * @returns JSX.Element
 */
const LogIn = memo(() => {
  // PERFORMANCE: useLogInOrchestration hook manages all state and determines render state
  const renderState = useLogInOrchestration();

  // PERFORMANCE: Switch statement for different render states
  switch (renderState.type) {
    case "success":
      return <LogInSuccess />;

    case "email-not-verified":
      return <LogInEmailNotVerified email={renderState.email} />;

    case "content":
      return (
        <LogInContent state={renderState.state} actions={renderState.actions} />
      );
  }
});

LogIn.displayName = "LogIn";

export default LogIn;
