import { headers } from "next/headers";

/**
 * Gets the IP address from the request headers.
 * @returns {Promise<string | null>}
 */
export async function getIpAddressFromHeaders(): Promise<string | null> {
  const headersList = await headers();

  return headersList.get("x-forwarded-for") || headersList.get("x-real-ip");
}
