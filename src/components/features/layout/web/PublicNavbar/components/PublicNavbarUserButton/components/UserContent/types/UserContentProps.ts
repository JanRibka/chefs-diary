import { UserSession } from "../../../../../types/UserSession";

/**
 * UserContentProps - Props interface for UserContent component
 */
export interface UserContentProps {
  user: UserSession | undefined;
  resolvedTheme: string | undefined;
}
