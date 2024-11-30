import { routes, settingsRoutes } from "../routes";

const Sidebar = () => {
  return (
    <div className="bg-white w-[280px] flex flex-col p-4 justify-between h-screen">
      {/* Header */}
      <div>
        <span className="font-bold text-violet-500 text-xl">HR.MGMT</span>
      </div>

      {/* Navigation Routes */}
      <div className="flex-1 flex flex-col gap-1 mt-4">
        {routes.map(({ Icon, name }) => (
          <div
            key={name}
            className="text-gray-600 font-medium flex items-center gap-3 px-2 py-3 rounded-md cursor-pointer hover:bg-[#f3f5ff] transition-all"
          >
            <Icon className="text-xl" />
            {name}
          </div>
        ))}
      </div>

      {/* Settings Routes */}
      <div className="flex flex-col gap-1">
        {settingsRoutes.map(({ Icon, name }) => (
          <div
            key={name}
            className="font-medium flex items-center gap-3 px-2 py-3 rounded-md cursor-pointer hover:bg-[#f3f5ff] transition-all"
          >
            <Icon size={20} />
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
