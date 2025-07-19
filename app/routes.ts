import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  // login page is the home page (`/`)
  index("./routes/auth/login.tsx"),

  // layout wraps `register` route
  layout("./routes/auth/layout.tsx", [
    route("register", "./routes/auth/register.tsx"),
  ]),
    route("dashboard", "./routes/dashboard.tsx"),
] satisfies RouteConfig;
