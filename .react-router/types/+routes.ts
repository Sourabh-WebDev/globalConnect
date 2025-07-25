// Generated by React Router

import "react-router"

declare module "react-router" {
  interface Register {
    pages: Pages
    routeFiles: RouteFiles
  }
}

type Pages = {
  "/": {
    params: {};
  };
  "/login": {
    params: {};
  };
  "/register": {
    params: {};
  };
  "/dashboard": {
    params: {};
  };
  "/timesheet": {
    params: {};
  };
};

type RouteFiles = {
  "root.tsx": {
    id: "root";
    page: "/" | "/login" | "/register" | "/dashboard" | "/timesheet";
  };
  "./routes/home.tsx": {
    id: "routes/home";
    page: "/";
  };
  "./routes/auth/login.tsx": {
    id: "routes/auth/login";
    page: "/login";
  };
  "./routes/auth/layout.tsx": {
    id: "routes/auth/layout";
    page: "/register";
  };
  "./routes/auth/register.tsx": {
    id: "routes/auth/register";
    page: "/register";
  };
  "./routes/global-layout.tsx": {
    id: "routes/global-layout";
    page: "/dashboard" | "/timesheet";
  };
  "./routes/dashboard.tsx": {
    id: "routes/dashboard";
    page: "/dashboard";
  };
  "./routes/timesheet.tsx": {
    id: "routes/timesheet";
    page: "/timesheet";
  };
};