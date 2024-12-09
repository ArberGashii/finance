import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { appRoutes, authRoutes } from "./routes";
import { Spin } from "antd";
import "./index.css";

const AuthLayout = lazy(() => import("./AuthLayout/AuthLayout"));
const RootLayout = lazy(() => import("./rootlayout/RootLayout"));

export const FallBack = () => {
  return <Spin fullscreen />;
};

const App = () => {
  return (
    <>
      {/* public routes */}
      <Routes>
        <Route element={<AuthLayout />}>
          {authRoutes.map(({ path, Element }) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<FallBack />}>
                  <Element />
                </Suspense>
              }
            />
          ))}
        </Route>
      </Routes>

      {/*  protected routes */}
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Navigate to={appRoutes[0]} replace />} />
          {appRoutes.map(({ path, Element }) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<FallBack />}>
                  <Element />
                </Suspense>
              }
            />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default App;
