import { useCallback } from "react";
import { routes, settingsRoutes } from "../routes";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  return (
    <div className="bg-white w-[280px] flex flex-col p-4 justify-between h-screen">
      {/* Header */}
      <div>
        <span className="font-bold text-violet-500 text-xl">HR.MGMT</span>
      </div>

      {/* Navigation Routes */}
      <div className="flex-1 flex flex-col gap-1 mt-9">
        {routes.map(({ path, Icon, name }) => {
          const isActive = location.pathname === path;
          return (
            <div
              onClick={() => handleNavigate(path)}
              key={name}
              className={`${
                isActive && "bg-[#f3f5ff]"
              } text-gray-600 font-medium flex items-center gap-3 px-2 py-3 rounded-md cursor-pointer hover:bg-[#f3f5ff] transition-all`}
            >
              <Icon className="text-xl" />
              {name}
            </div>
          );
        })}
      </div>

      {/* Settings Routes */}
      <div className="flex flex-col gap-1">
        {settingsRoutes.map(({ path, Icon, name }) => {
          const isActive = location.pathname === path;

          return (
            <div
              onClick={() => handleNavigate(path)}
              key={name}
              className={`${
                isActive && "bg-[#f3f5ff]"
              } text-gray-600 font-medium flex items-center gap-3 px-2 py-3 rounded-md cursor-pointer hover:bg-[#f3f5ff] transition-all`}
            >
              <Icon size={20} />
              {name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
