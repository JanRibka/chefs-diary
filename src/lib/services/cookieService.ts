import { cookies } from "next/headers";

export const setCookie = (name: string, value: string, exMonths: number) => {
  const d = new Date();

  d.setMonth(d.getMonth() + exMonths);

  const expires: string = "expires=" + d.toUTCString();

  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export const setCookieAsync = async (
  name: string,
  value: string,
  exMonths: number
) => {
  const d = new Date();

  d.setMonth(d.getMonth() + exMonths);

  const cookieStore = await cookies();
  cookieStore.set(name, value, { path: "/", expires: d });
};

export const getCookie = (name: string) => {
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

export const getCookieAsync = async (name: string) => {
  const cookieStore = await cookies();

  const c = cookieStore.get(name);

  if (c) {
    return c.value;
  }

  return "";
};

export const getCookieNames = () => {
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

export const getCookieNamesAsync = async () => {
  const cookieStore = await cookies();

  const cs = cookieStore.getAll();

  if (cs.length > 0) {
    return cs.map((item) => item.name);
  }

  return [];
};

export const deleteCookie = (name: string, domain?: string) => {
  let auxDomain: string = "";

  if (domain) {
    auxDomain = " domain=" + domain + ";";
  }

  document.cookie = name + "=;" + auxDomain + " max-age=0;";
};

export const deleteCookieAsync = async (name: string) => {
  const cookieStore = await cookies();

  cookieStore.delete(name);
};
