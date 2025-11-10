"use client";

import NextLink from "next/link";
import { memo } from "react";

import webRoutes from "@/lib/routes/webRoutes";
import { Button } from "@heroui/react";

interface FormButtonsProps {
  loginLoading: boolean;
}

/**
 * FormButtons - Submit button and links
 */
export const FormButtons = memo(({ loginLoading }: FormButtonsProps) => {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <Button
          type="submit"
          size="sm"
          className="flex-1"
          disabled={loginLoading}
        >
          {loginLoading ? "Probíhá..." : "Přihlásit"}
        </Button>
        <NextLink
          href={webRoutes.ForgottenPassword}
          className="text-sm text-slate-500 underline"
        >
          Zapomenuté
        </NextLink>
      </div>

      <div className="text-center text-sm">
        <span className="mr-2">Ještě nemáte účet?</span>
        <NextLink
          href={webRoutes.SignUp}
          className="font-semibold text-primary"
        >
          Registrovat se
        </NextLink>
      </div>
    </>
  );
});

FormButtons.displayName = "FormButtons";
