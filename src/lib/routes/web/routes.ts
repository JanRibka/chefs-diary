export type RouteProperty = "LogIn" | "SignUp" | "ForgottenPassword";
export type RouteValue = "/prihlaseni" | "/registrace" | "/zapomenute-heslo";

const webRoutes: Record<RouteProperty, RouteValue> = {
  LogIn: "/prihlaseni",
  SignUp: "/registrace",
  ForgottenPassword: "/zapomenute-heslo",
};

export default webRoutes;
