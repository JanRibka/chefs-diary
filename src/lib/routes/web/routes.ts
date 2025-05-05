export type RouteProperty =
  | "LogIn"
  | "SignUp"
  | "ForgottenPassword"
  | "Test"
  | "Test2";
export type RouteValuePublic =
  | "/prihlaseni"
  | "/registrace"
  | "/zapomenute-heslo";
export type RouteValuePrivate = "/test" | "/test2";
export type RouteValue = RouteValuePublic | RouteValuePrivate;

const webRoutes: Record<RouteProperty, RouteValue> = {
  LogIn: "/prihlaseni",
  SignUp: "/registrace",
  ForgottenPassword: "/zapomenute-heslo",
  Test: "/test",
  Test2: "/test2",
};

export default webRoutes;
