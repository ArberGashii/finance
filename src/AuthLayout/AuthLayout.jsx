import { Navigate, Outlet } from "react-router-dom";
import useAuthenticate from "../zustand/useAuth";
import { FallBack } from "../App";

const AuthLayout = () => {
  const currentUser = useAuthenticate((state) => state.currentUser);
  const loading = useAuthenticate((state) => state.loading);
  if (loading) {
    return <FallBack />;
  }
  if (!currentUser) {
    return (
      <section className="flex flex-1 justify-center items-center flex-col h-screen">
        <Outlet />
      </section>
    );
  }
  return currentUser ? (
    <Navigate to="/finance/" />
  ) : (
    <section className="bg-[#f9faff] h-screen flex flex-col">
      <Outlet />
    </section>
  );
};

export default AuthLayout;
