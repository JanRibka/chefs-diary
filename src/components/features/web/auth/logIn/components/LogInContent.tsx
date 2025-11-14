import { memo } from 'react';

import CreateAccount from '@/components/shared/auth/createAccount/CreateAccount';
import LogInForm from '@/components/shared/auth/logIn/LogInForm/LogInForm';
import webRoutes from '@/lib/routes/webRoutes';

import { LogInActions } from '../types/LogInActions';
import { LogInState } from '../types/LogInState';

/**
 * Props for LogInContent component
 */
interface LogInContentProps {
  state: LogInState & {
    state: Awaited<ReturnType<typeof import("@/actions/web/auth").logInAction>>;
    action: (payload: FormData) => void;
  };
  actions: LogInActions;
}

/**
 * LogInContent component - handles the main login form content
 * @param props - Component props
 * @returns JSX.Element
 */
const LogInContent = memo<LogInContentProps>(({ state, actions }) => {
  return (
    <>
      <LogInForm
        state={state.state}
        errors={state.errors}
        isLoading={state.isLoading}
        persistLoginCookieName="persistLogin"
        forgottenPasswordLink={webRoutes.ForgottenPassword}
        action={state.action}
        handleSubmit={actions.handleSubmit}
        handleChange={actions.handleChange}
      />
      <CreateAccount />
    </>
  );
});

LogInContent.displayName = "LogInContent";

export default LogInContent;
