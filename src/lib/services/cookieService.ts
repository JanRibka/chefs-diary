import { cookies } from "next/headers";

/**
 * Sets cookie on client side
 * @param name Cookie name
 * @param value Cookie value
 * @param exMonths Cookie expiration in months
 */
export const setCookie = (
  name: string,
  value: string,
  exMonths: number
): void => {
  const d = new Date();

  d.setMonth(d.getMonth() + exMonths);

  const expires: string = "expires=" + d.toUTCString();

  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

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
 * Gets cookie on client side
 * @param name Cookie name
 * @returns {string | null}
 */
export const getCookie = (name: string): string | null => {
  const cName = name + "=";
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(cName) === 0) {
      return c.substring(cName.length, c.length);
    }
  }
  return "";
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
 * Gets all cookie names on client side
 * @returns {Array<string> | null}
 */
export const getCookieNames = (): Array<string> | null => {
  const result: string[] = [];
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }

    const cookieName: string = c.split("=")[0];

    result.push(cookieName);
  }

  return result;
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
 * Deletes cookie by cookie name on client side
 * @param name Cookie name
 * @param domain DOmain
 */
export const deleteCookie = (name: string, domain?: string): void => {
  let auxDomain: string = "";

  if (domain) {
    auxDomain = " domain=" + domain + ";";
  }

  document.cookie = name + "=;" + auxDomain + " max-age=0;";
};

/**
 * Deletes cookie by cookie name on server side
 * @param name Cookie name
 */
export const deleteCookieAsync = async (name: string): Promise<void> => {
  const cookieStore = await cookies();

  cookieStore.delete(name);
};
