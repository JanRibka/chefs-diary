const webRoutes = {
  LogIn: "/prihlaseni",
  SignUp: "/registrace",
  ForgottenPassword: "/zapomenute-heslo",
  Test: "/test",
  Test2: "/test2",
} as const;

export default webRoutes;

export type RouteProperty = keyof typeof webRoutes;
export type RouteValue = (typeof webRoutes)[RouteProperty];
