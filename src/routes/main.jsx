import React, { Suspense, Fragment, lazy } from "react";
import { Routes, Navigate, Route } from "react-router-dom";

import LayoutLogado from "../components/LayoutLogado/main";

export const renderRoutes = (routes = []) => (
  <Suspense>
    <Routes>
      {routes.map((route, i) => {
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Layout>
                {route.routes ? renderRoutes(route.routes) : <Component />}
              </Layout>
            }
          />
        );
      })}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Suspense>
);

const routes = [
  {
    path: "*",
    layout: LayoutLogado,
    routes: [
    //   {
    //     exact: true,
    //     path: "/login",
    //     component: lazy(() => import("../pages/login/Login")),
    //   },
      {
        exact: true,
        path: "/",
        component: lazy(() => import("../pages/Main/main")),
      },
    ],
  },
];

export default routes;
