const webRoutes = {
  Home: "/",
  About: "/o-me",
  Recipes: "/recepty",
  Contact: "/kontakt",
  Dictionary: "/slovnik",
  FoodSubstitutes: "/nahrady-potravin",
  LogIn: "/prihlaseni",
  SignUp: "/registrace",
  ForgottenPassword: "/zapomenute-heslo",
} as const;

export default webRoutes;

export type RouteProperty = keyof typeof webRoutes;
export type RouteValue = (typeof webRoutes)[RouteProperty];
