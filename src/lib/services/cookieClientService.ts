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
