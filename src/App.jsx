import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { appRoutes } from "./routes";
import { Skeleton } from "antd";

// const AuthLayout = lazy(() => import("./AuthLayout/AuthLayout"));
const RootLayout = lazy(() => import("./rootlayout/RootLayout"));

const FallBack = () => {
  return <Skeleton active />;
};

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route
          path="/finance"
          element={<Navigate to={appRoutes[0]} replace />}
        />
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
  );

  // <RootLayout />;
};

export default App;
