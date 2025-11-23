import { useMemo } from "react";

import LogInStatusEnum from "@/lib/enums/LogInStatusEnum";

import { LogInActions } from "../types/LogInActions";
import { LogInState } from "../types/LogInState";
import { useLogInActions } from "./useLogInActions";
import { useLogInState } from "./useLogInState";

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

  // PERFORMANCE: useLogInActions hook handles form submission and change events
  const actions = useLogInActions(logInState, logInState.setErrors);

  // PERFORMANCE: Determine render state based on server response
  return useMemo((): LogInRenderState => {
    // Early return for success state
    if (logInState.state?.generalState === LogInStatusEnum.SUCCESS) {
      return { type: "success" };
    }

    // Early return for email not verified state
    if (logInState.state?.generalState === LogInStatusEnum.EMAIL_NOT_VERIFIED) {
      return {
        type: "email-not-verified",
        email: logInState.state.form?.email ?? "",
      };
    }

    // Default content state
    return {
      type: "content",
      state: {
        errors: logInState.errors,
        setErrors: logInState.setErrors,
        isLoading: logInState.isLoading,
        state: logInState.state,
        action: logInState.action,
      },
      actions,
    };
  }, [
    logInState.isLoading,
    logInState.state,
    logInState.action,
    logInState.errors,
    logInState.setErrors,
    actions,
  ]);
};
