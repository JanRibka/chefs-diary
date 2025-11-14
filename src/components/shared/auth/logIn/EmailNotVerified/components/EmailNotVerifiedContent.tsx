import { memo } from 'react';

import EmailNotVerifiedForm from '../../EmailNotVerifiedForm/EmailNotVerifiedForm';
import { EmailNotVerifiedProps } from '../types/EmailNotVerifiedProps';

/**
 * Props for EmailNotVerifiedContent component
 */
interface EmailNotVerifiedContentProps extends EmailNotVerifiedProps {
  errors: Record<string, string>;
  isLoading: boolean;
  action: (payload: FormData) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: () => void;
}

/**
 * EmailNotVerifiedContent component - renders the main email verification form UI
 * @param props - Component props
 * @returns JSX.Element
 */
const EmailNotVerifiedContent = memo<EmailNotVerifiedContentProps>(
  ({ email, errors, isLoading, action, handleSubmit, handleChange }) => {
    return (
      <EmailNotVerifiedForm
        email={email}
        errors={errors}
        isLoading={isLoading}
        action={action}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    );
  }
);

EmailNotVerifiedContent.displayName = "EmailNotVerifiedContent";

export default EmailNotVerifiedContent;
