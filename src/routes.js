import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { CiUser } from "react-icons/ci";

export const routes = [
  { path: "/", Icon: LuLayoutDashboard, name: "Dashboard" },
  {
    path: "/add-shipment",
    Icon: MdOutlineDashboardCustomize,
    name: "Add new shipment",
  },
];

export const settingsRoutes = [
  {
    path: "/account",
    Icon: CiUser,
    name: "Account",
  },
];
