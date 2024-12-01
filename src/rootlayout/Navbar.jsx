import { useMemo } from "react";
import { routes, settingsRoutes } from "../routes";

const Navbar = () => {
  const { pathname } = location;

  const directory = useMemo(() => {
    const merge = [...routes, ...settingsRoutes];
    const matched = merge?.find(({ path }) => path === pathname)?.name || "";
    return matched;
  }, [pathname]);

  console.log({ directory });
  return <div className="font-bold text-3xl text-gray-700">{directory}</div>;
};

export default Navbar;
