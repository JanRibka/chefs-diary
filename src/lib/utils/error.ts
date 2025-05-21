import logger from "@/lib/services/loggerService";

import AuthError from "../errors/AuthError";
import ForbiddenError from "../errors/ForbiddenError";
import UnauthorizedError from "../errors/UnauthorizedError";
import GetErrorMessageOptionsType from "../types/common/GetErrorMessageOptionsType";

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
    logErrorMessage = true,
    logConsoleError = true,
    consoleErrorTitle = "Chyba:",
  } = options;

  const errorMessage =
    error instanceof Error ? error.stack || error.message : String(error);

  if (logConsoleError) {
    console.error(consoleErrorTitle, error);
  }

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
