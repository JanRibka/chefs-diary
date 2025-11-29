import SessionUserType from "@/lib/types/common/SessionUserType";

/**
 * UserContentProps - Props interface for UserContent component
 */
export interface UserContentProps {
  user: SessionUserType | null;
  resolvedTheme: string | undefined;
}
