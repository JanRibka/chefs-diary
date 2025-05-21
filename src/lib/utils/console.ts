import LogConsoleErrorType from "../types/common/LogConsoleErrorType";

export function logConsoleError(
  error: unknown,
  options: LogConsoleErrorType = {}
) {
  const { logConsoleError = true, consoleErrorTitle = "Chyba:" } = options;

  if (
    typeof window !== "undefined" &&
    process.env.NODE_ENV !== "production" &&
    logConsoleError
  ) {
    console.error(consoleErrorTitle, error);
  }
}
