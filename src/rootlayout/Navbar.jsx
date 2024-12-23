import { useEffect, useMemo, useState } from "react";
import { routes } from "../routes";
import { useLocation } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { pathname } = useLocation();

  const [openSider, setOpenSider] = useState(false);
  const directory = useMemo(() => {
    const matched = routes?.find(({ path }) => path === pathname)?.name || "";
    return matched;
  }, [pathname]);

  useEffect(() => {
    setOpenSider(false);
  }, [pathname]);

  return (
    <div className="flex justify-between items-center border-b p-2 px-4 bg-white">
      <div className="font-medium text-2xl md:font-bold md:text-3xl lg:font-bold lg:text-[24.5px] text-[#505050]">
        {directory}
      </div>
      {/* Hide MenuOutlined on large screens */}
      <MenuOutlined
        className="lg:hidden cursor-pointer text-2xl"
        onClick={() => setOpenSider(true)}
      />
      <Drawer
        bodyStyle={{ margin: 0, padding: 0 }}
        placement="left"
        open={openSider}
        onClose={() => setOpenSider(false)}
        width={340}
      >
        <Sidebar showSider={true} />
      </Drawer>
    </div>
  );
};

export default Navbar;
