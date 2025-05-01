export type RouteProperty = "LogIn" | "SignUp";
export type RouteValue = "/prihlaseni" | "/registrace";

const webRoutes: Record<RouteProperty, RouteValue> = {
  LogIn: "/prihlaseni",
  SignUp: "/registrace",
};

export default webRoutes;
