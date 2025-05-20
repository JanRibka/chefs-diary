import logger from "@/lib/services/loggerService";

import AuthError from "../errors/AuthError";

/**
 * Gets error message from error object and log error message
 * @param error Error object
 * @param logErrorMessage Log error message
 * @returns {string}
 */
export function getErrorMessageFromError(
  error: unknown,
  logErrorMessage: boolean
): string {
  const errorMessage =
    error instanceof Error ? error.stack || error.message : String(error);

  if (logErrorMessage) {
    logger.error(errorMessage);
  }

  return errorMessage;
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
