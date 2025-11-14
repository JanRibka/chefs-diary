"use client";

import { memo } from 'react';

import LogIn from '@/components/features/web/auth/logIn/LogIn';

/**
 * LoginFormContent - Login form popover orchestrator
 *
 * Coordinates form inputs, buttons, and social login.
 */
export const LoginFormContent = memo(() => {
  return <LogIn />;
});

LoginFormContent.displayName = "LoginFormContent";
