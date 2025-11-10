"use client";

import { memo } from "react";

import { FormButtons } from "./FormButtons";
import { FormInputs } from "./FormInputs";
import { SocialLogin } from "./SocialLogin";

interface LoginFormContentProps {
  flyoutFirstInputRef: React.RefObject<HTMLInputElement | null>;
  loginEmail: string;
  setLoginEmail: (email: string) => void;
  loginPassword: string;
  setLoginPassword: (password: string) => void;
  loginLoading: boolean;
  loginError: string | null;
  handleLoginSubmit: (e: React.FormEvent) => void;
  handleGoogleLogin: () => void;
}

/**
 * LoginFormContent - Login form popover orchestrator
 *
 * Coordinates form inputs, buttons, and social login.
 */
export const LoginFormContent = memo(
  ({
    flyoutFirstInputRef,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    loginLoading,
    loginError,
    handleLoginSubmit,
    handleGoogleLogin,
  }: LoginFormContentProps) => {
    return (
      <div className="p-4 rounded-2xl shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/10 dark:border-slate-800/40">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold">Přihlášení</h3>
            <p className="text-sm text-slate-500">Přihlaste se do svého účtu</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-3">
            <FormInputs
              flyoutFirstInputRef={flyoutFirstInputRef}
              loginEmail={loginEmail}
              setLoginEmail={setLoginEmail}
              loginPassword={loginPassword}
              setLoginPassword={setLoginPassword}
            />

            {loginError && (
              <div className="text-sm text-red-600">{loginError}</div>
            )}

            <FormButtons loginLoading={loginLoading} />
            <SocialLogin
              handleGoogleLogin={handleGoogleLogin}
              loginLoading={loginLoading}
            />
          </form>
        </div>
      </div>
    );
  }
);

LoginFormContent.displayName = "LoginFormContent";
