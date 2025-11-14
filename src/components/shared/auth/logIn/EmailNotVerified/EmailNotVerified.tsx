"use client";

import { memo } from "react";

import ResendVerificationLinkStatusEnum from "@/lib/enums/ResendVerificationLinkStatusEnum";

import EmailNotVerifiedContent from "./components/EmailNotVerifiedContent";
import EmailNotVerifiedSuccess from "./components/EmailNotVerifiedSuccess";
import { useEmailNotVerifiedActions } from "./hooks/useEmailNotVerifiedActions";
import { useEmailNotVerifiedState } from "./hooks/useEmailNotVerifiedState";
import { EmailNotVerifiedProps } from "./types/EmailNotVerifiedProps";

/**
 * EmailNotVerified component - Main orchestrator for email verification functionality
 * Uses Pure Orchestration Pattern with multi-file structure
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const EmailNotVerified = memo<EmailNotVerifiedProps>((props) => {
  // PERFORMANCE: useEmailNotVerifiedState hook handles form state and errors
  const { state, action, isLoading, errors, setErrors } = useEmailNotVerifiedState();

  // PERFORMANCE: useEmailNotVerifiedActions hook handles form submission and change events
  const { handleSubmit, handleChange } = useEmailNotVerifiedActions(setErrors);

  // PERFORMANCE: Conditional rendering based on success state
  if (state.generalState === ResendVerificationLinkStatusEnum.SUCCESS) {
    return <EmailNotVerifiedSuccess email={state.form?.email ?? ""} />;
  }

  // PERFORMANCE: Render main content with all necessary props
  return (
    <EmailNotVerifiedContent
      {...props}
      errors={errors}
      isLoading={isLoading}
      action={action}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
});

EmailNotVerified.displayName = "EmailNotVerified";

export default EmailNotVerified;