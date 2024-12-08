import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import useAuthenticate from "../zustand/useAuth";

const RootLayout = () => {
  const currentUser = useAuthenticate((state) => state.currentUser);

  return currentUser ? (
    <section className="h-screen bg-[#f9faff] flex text-gray-900">
      <Sidebar />
      <div className="flex flex-col mx-4 mt-4 lg:mt-8 gap-4 w-full">
        <Navbar />
        <div className={`overflow-auto`}>
          <Outlet />
        </div>
      </div>
    </section>
  ) : (
    <Navigate to="/finance/login" />
  );
};

export default RootLayout;
