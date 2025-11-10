"use client";

import { memo } from "react";

import { Button } from "@heroui/react";

interface SocialLoginProps {
  handleGoogleLogin: () => void;
  loginLoading: boolean;
}

/**
 * SocialLogin - Google login button
 */
export const SocialLogin = memo(
  ({ handleGoogleLogin, loginLoading }: SocialLoginProps) => {
    return (
      <div className="pt-2 border-t mt-2">
        <div className="text-center text-sm text-slate-500 mb-2">
          Nebo pokračujte přes
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="flex-1"
            onClick={handleGoogleLogin}
            disabled={loginLoading}
          >
            Google
          </Button>
        </div>
      </div>
    );
  }
);

SocialLogin.displayName = "SocialLogin";
