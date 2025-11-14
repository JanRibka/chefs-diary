import { useCallback, useMemo, useState } from 'react';

import LogInStatusEnum from '@/lib/enums/LogInStatusEnum';

import { LogInActions } from '../types/LogInActions';
import { LogInState } from '../types/LogInState';
import { useLogInActions } from './useLogInActions';
import { useLogInState } from './useLogInState';

/**
 * Return type for useLogInOrchestration hook
 */
export type LogInRenderState =
  | { type: "success" }
  | { type: "email-not-verified"; email: string }
  | {
      type: "content";
      state: LogInState & {
        state: Awaited<
          ReturnType<typeof import("@/actions/web/auth").logInAction>
        >;
        action: (payload: FormData) => void;
      };
      actions: LogInActions;
    };

/**
 * Hook for orchestrating LogIn component logic
 * Manages state, actions, and determines what to render
 *
 * @returns LogInRenderState - information about what component to render
 */
export const useLogInOrchestration = (): LogInRenderState => {
  // PERFORMANCE: useLogInState hook handles server state and initial errors
  const logInState = useLogInState();

  // PERFORMANCE: Memoize state object to prevent unnecessary re-renders
  const state = useMemo<LogInState & typeof logInState>(
    () => ({
      errors: logInState.errors,
      isLoading: logInState.isLoading,
      state: logInState.state,
      action: logInState.action,
    }),
    [logInState]
  );

  // PERFORMANCE: Use local state for errors to handle client-side validation
  const [localErrors, setLocalErrors] = useState(state.errors);

  // PERFORMANCE: Memoize setLocalErrors callback to prevent unnecessary re-renders in useLogInActions
  const memoizedSetLocalErrors = useCallback(
    (value: React.SetStateAction<typeof localErrors>) => setLocalErrors(value),
    []
  );

  // PERFORMANCE: Memoize state with local errors for actions
  const stateWithErrors = useMemo(
    () => ({ ...state, errors: localErrors }),
    [state, localErrors]
  );

  // PERFORMANCE: useLogInActions hook handles form submission and change events
  const actions = useLogInActions(stateWithErrors, memoizedSetLocalErrors);

  // PERFORMANCE: Determine render state based on server response
  return useMemo((): LogInRenderState => {
    // Early return for success state
    if (state.state?.generalState === LogInStatusEnum.SUCCESS) {
      return { type: "success" };
    }

    // Early return for email not verified state
    if (state.state?.generalState === LogInStatusEnum.EMAIL_NOT_VERIFIED) {
      return {
        type: "email-not-verified",
        email: state.state.form?.email ?? "",
      };
    }

    // Default content state
    return {
      type: "content",
      state: {
        errors: localErrors,
        isLoading: state.isLoading,
        state: state.state,
        action: state.action,
      },
      actions,
    };
  }, [state.isLoading, state.state, state.action, localErrors, actions]);
};
