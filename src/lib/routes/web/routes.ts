export type RouteProperty = "LogIn" | "SignUp" | "ForgottenPassword" | "Test";
export type RouteValuePublic =
  | "/prihlaseni"
  | "/registrace"
  | "/zapomenute-heslo";
export type RouteValuePrivate = "/test";
export type RouteValue = RouteValuePublic | RouteValuePrivate;

const webRoutes: Record<RouteProperty, RouteValue> = {
  LogIn: "/prihlaseni",
  SignUp: "/registrace",
  ForgottenPassword: "/zapomenute-heslo",
  Test: "/test",
};

export default webRoutes;
