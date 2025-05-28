import LogConsoleErrorType from "../types/common/LogConsoleErrorType";

export function logConsoleError(
  error: unknown,
  options: LogConsoleErrorType = {}
) {
  const { logConsoleErrorEnable = true, consoleErrorTitle = "Chyba:" } =
    options;

  if (
    typeof window !== "undefined" &&
    process.env.NODE_ENV !== "production" &&
    logConsoleErrorEnable
  ) {
    console.error(consoleErrorTitle, error);
  }
}
