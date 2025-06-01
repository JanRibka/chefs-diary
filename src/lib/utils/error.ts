import logger from "@/lib/services/loggerService";

import AuthError from "../errors/AuthError";
import ConflictError from "../errors/ConflictError";
import ForbiddenError from "../errors/ForbiddenError";
import NotFoundError from "../errors/NotFoundError";
import UnauthorizedError from "../errors/UnauthorizedError";
import GetErrorMessageOptionsType from "../types/common/GetErrorMessageOptionsType";
import { logConsoleError } from "./console";

/**
 * Gets error message from error object and log error message
 * @param error Error object
 * @param options Error message options
 
 * @returns {string}
 */
export function getErrorMessageFromError(
  error: unknown,
  options: GetErrorMessageOptionsType = {}
): string {
  const {
    logErrorMessageEnable = true,
    logConsoleErrorEnable = true,
    consoleErrorTitle = "Chyba:",
  } = options;
  const errorMessage =
    error instanceof Error ? error.stack || error.message : String(error);
  const resultErrorMessage =
    error instanceof Error ? error.message : String(error);

  logConsoleError(error, {
    logConsoleErrorEnable: logConsoleErrorEnable,
    consoleErrorTitle: consoleErrorTitle,
  });

  //TODO: Toto bude taky ve funcki a budou tam podminky jako v logCOnsoleError
  if (logErrorMessageEnable) {
    logger.error(errorMessage);
  }

  return resultErrorMessage;
}

/**
 * Gets AuthError from error object
 * @param error Error object
 * @returns {errorMessage, isAuthError}
 */
export function getAuthErrorFromError<T>(error: unknown): {
  errorMessage: keyof T;
  isAuthError: boolean;
} {
  const isAuthError = error instanceof AuthError;
  let errorMessage: keyof T;

  if (isAuthError) {
    errorMessage = error.message as keyof T;
  } else {
    errorMessage = "" as keyof T;
  }

  return {
    errorMessage,
    isAuthError,
  };
}

/**
 * Gets Conflict error message from error object
 * @param error Error object
 * @param overrideMessage Fallback error message
 * @returns {errorMessage, isAuthError}
 */
export function getConflictErrorFromError(
  error: unknown,
  overrideMessage?: string
): {
  isConflictError: boolean;
  errorMessage: string;
} {
  const isConflictError = error instanceof ConflictError;
  let errorMessage: string;

  if (isConflictError) {
    errorMessage = overrideMessage ?? error.message;
  } else {
    errorMessage = "";
  }

  return {
    errorMessage,
    isConflictError,
  };
}

/**
 * Gets Not found error message from error object
 * @param error Error object
 * @param overrideMessage Fallback error message
 * @returns {errorMessage, isNotFoundError}
 */
export function getNotFoundErrorFromError(
  error: unknown,
  overrideMessage?: string
): {
  isNotFoundError: boolean;
  errorMessage: string;
} {
  const isNotFoundError = error instanceof NotFoundError;
  let errorMessage: string;

  if (isNotFoundError) {
    errorMessage = overrideMessage ?? error.message;
  } else {
    errorMessage = "";
  }

  return {
    errorMessage,
    isNotFoundError,
  };
}

/**
 * Handles API error
 * @param error Error object
 * @param context Context
 * @returns {Response}
 */
export function handleApiError(
  error: unknown,
  context?: { consoleErrorTitle?: string }
): Response {
  if (error instanceof UnauthorizedError) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  if (error instanceof ForbiddenError) {
    return new Response("Forbidden", {
      status: 403,
    });
  }

  const errorMessage = getErrorMessageFromError(error, {
    consoleErrorTitle: context?.consoleErrorTitle ?? "API error",
  });

  return new Response(errorMessage || "Došlo k neznámé chybě", { status: 500 });
}
