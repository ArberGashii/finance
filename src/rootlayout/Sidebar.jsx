import { useCallback } from "react";
import { routes } from "../routes";
import { useNavigate } from "react-router-dom";
import useAuthenticate from "../zustand/useAuth";
import { UserOutlined } from "@ant-design/icons";
import { Popover } from "antd";

const Sidebar = ({ showSider = false }) => {
  const navigate = useNavigate();
  const logout = useAuthenticate((state) => state.logout);

  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
      ``;
    },
    [navigate]
  );

  return (
    <div
      className={`bg-white w-[340px] flex-col p-4 justify-between h-[${
        showSider ? "fit-content" : "screen"
      }] border ${showSider ? "flex" : "hidden"} md:flex lg:flex`}
    >
      {/* Header */}
      <div>
        <span className="font-bold text-violet-500 text-xl">HR.MGMT</span>
      </div>

      {/* Navigation Routes */}
      <div className="flex-1 flex flex-col gap-1 mt-9">
        {routes
          .filter(({ showInSidebar }) => showInSidebar)
          .map(({ path, Icon, name }) => {
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
        <Popover
          trigger="click"
          overlayInnerStyle={{
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "1px solid #E5E7EB",
            padding: 0,
            minWidth: "120px",
          }}
          arrow={false}
          content={
            <div className="flex flex-col bg-white  divide-y divide-gray-200 w-[150px] rounded-[12px]">
              <button
                className="w-full px-4 py-2 text-gray-700 font-medium text-sm hover:bg-red-50 rounded-tl-[12px] rounded-tr-[12px] hover:text-red-500 transition focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Logout"
                onClick={logout}
              >
                Logout
              </button>
              <button
                onClick={() => navigate("/finance/settings/activity")}
                className="w-full px-4 py-2 text-gray-700 font-medium text-sm hover:bg-blue-50 rounded-br-[12px] rounded-bl-[12px] hover:text-blue-500 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Activity"
              >
                Activity
              </button>
            </div>
          }
          placement="left"
        >
          <div
            className="flex items-center gap-2 px-4 py-2 text-gray-600 font-medium text-sm rounded-md cursor-pointer hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
            tabIndex={0}
            aria-haspopup="true"
            aria-expanded="false"
          >
            <UserOutlined />
            <span>Account</span>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default Sidebar;
