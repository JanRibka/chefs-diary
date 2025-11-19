"use client";

import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import type { UserSession } from "../types/UserSession";

/**
 * useNavbarAuth - hook for authentication state
 * Gets current user session from next-auth
 *
 * @returns object with { session, user }
 *
 * @example
 * const { session, user } = useNavbarAuth();
 * if (session) { // User is logged in }
 */
export const useNavbarAuth = () => {
  const { data: session } = useSession();
  const user = session?.user as UserSession | undefined;

  // PERFORMANCE: stabilní object reference (prevence re-renderů)
  return useMemo(() => ({ session, user }), [session, user]);
};
