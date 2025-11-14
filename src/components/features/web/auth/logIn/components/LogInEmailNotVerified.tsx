import { memo } from 'react';

import EmailNotVerified from '@/components/shared/auth/logIn/EmailNotVerified/EmailNotVerified';

/**
 * Props for LogInEmailNotVerified component
 */
interface LogInEmailNotVerifiedProps {
  email: string;
}

/**
 * LogInEmailNotVerified component - handles email not verified state
 * @param props - Component props
 * @returns JSX.Element
 */
const LogInEmailNotVerified = memo<LogInEmailNotVerifiedProps>(({ email }) => {
  return <EmailNotVerified email={email} />;
});

LogInEmailNotVerified.displayName = "LogInEmailNotVerified";

export default LogInEmailNotVerified;
