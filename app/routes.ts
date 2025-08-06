import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  // home page is now `/`
  index("./routes/home.tsx"),

  // /login route
  route("login", "./routes/auth/login.tsx"),

  // layout wraps `register` route
  layout("./routes/auth/layout.tsx", [
    route("register", "./routes/auth/register.tsx"),
  ]),

  layout("./routes/global-layout.tsx", [
    route("dashboard", "./routes/dashboard.tsx"),
    route("timesheet", "./routes/timesheet.tsx"),
    route("timesheetAdd", "./routes/timesheetAdd.tsx"),
  ]),


  // 🔥 Catch-all 404 route
  route("*", "./routes/not-found.tsx"),

  // /dashboard rout
] satisfies RouteConfig;



