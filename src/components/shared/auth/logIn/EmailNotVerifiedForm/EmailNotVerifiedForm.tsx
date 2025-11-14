"use client";

import { memo } from 'react';

import EmailNotVerifiedFormContent from './components/EmailNotVerifiedFormContent';
import { EmailNotVerifiedFormProps } from './types/EmailNotVerifiedFormProps';

/**
 * EmailNotVerifiedForm component - Main orchestrator for email verification form functionality
 * Uses Pure Orchestration Pattern with multi-file structure
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const EmailNotVerifiedForm = memo<EmailNotVerifiedFormProps>((props) => {
  // PERFORMANCE: Render form content with all necessary props
  return <EmailNotVerifiedFormContent {...props} />;
});

EmailNotVerifiedForm.displayName = "EmailNotVerifiedForm";

export default EmailNotVerifiedForm;
