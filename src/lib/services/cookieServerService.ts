import { cookies } from "next/headers";

/**
 * Sets cookie on server side
 * @param name Cookie name
 * @param value Cookie value
 * @param exMonths Cookie expiration in months
 */
export const setCookieAsync = async (
  name: string,
  value: string,
  exMonths: number
): Promise<void> => {
  const d = new Date();

  d.setMonth(d.getMonth() + exMonths);

  const cookieStore = await cookies();
  cookieStore.set(name, value, { path: "/", expires: d });
};

/**
 * Gets cookie on server side
 * @param name Cookie name
 * @returns {Promise<string | null>}
 */
export const getCookieAsync = async (name: string): Promise<string | null> => {
  const cookieStore = await cookies();

  const c = cookieStore.get(name);

  if (c) {
    return c.value;
  }

  return "";
};

/**
 * Gets all cookie names on server side
 * @returns {Promise<Array<string> | null>}
 */
export const getCookieNamesAsync = async (): Promise<Array<string> | null> => {
  const cookieStore = await cookies();

  const cs = cookieStore.getAll();

  if (cs.length > 0) {
    return cs.map((item) => item.name);
  }

  return [];
};

/**
 * Deletes cookie by cookie name on server side
 * @param name Cookie name
 */
export const deleteCookieAsync = async (name: string): Promise<void> => {
  const cookieStore = await cookies();

  cookieStore.delete(name);
};
