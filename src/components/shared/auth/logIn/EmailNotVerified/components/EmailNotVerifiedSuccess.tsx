import { memo } from "react";

import VerifyLinkSentSuccess from "../../VerifyLinkSentSuccess";

/**
 * Props for EmailNotVerifiedSuccess component
 */
interface EmailNotVerifiedSuccessProps {
  email: string;
}

/**
 * EmailNotVerifiedSuccess component - renders the success state after email verification
 * @param props - Component props
 * @returns JSX.Element
 */
const EmailNotVerifiedSuccess = memo<EmailNotVerifiedSuccessProps>(({ email }) => {
  return <VerifyLinkSentSuccess email={email} />;
});

EmailNotVerifiedSuccess.displayName = "EmailNotVerifiedSuccess";

export default EmailNotVerifiedSuccess;