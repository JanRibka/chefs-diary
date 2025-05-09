const adminRoutes = {
  LogIn: "/admin/prihlaseni",
  ForgottenPassword: "/admin/zapomenute-heslo",
  Dashboard: "/admin",
} as const;

export default adminRoutes;

export type RouteProperty = keyof typeof adminRoutes;
export type RouteValue = (typeof adminRoutes)[RouteProperty];
