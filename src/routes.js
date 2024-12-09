import { AppstoreAddOutlined, AppstoreOutlined } from "@ant-design/icons";
import { lazy } from "react";

const Dashboard = lazy(() => import("./rootlayout/pages/Dashboard/Dashboard"));
const AddShipment = lazy(() =>
  import("./rootlayout/pages/AddShipment/AddShipments")
);
const Login = lazy(() => import("./AuthLayout/pages/Login"));
const SettingsActivity = lazy(() =>
  import("./rootlayout/pages/settings/activity/SettingsActivity")
);
const pathConstants = {
  dashboard: "/finance/",
  addShipment: "/finance/add-shipment",
  editShipment: "/finance/add-shipment/:xId",
  login: "/finance/login",
  "settings activity": "/finance/settings/activity",
};

export const routes = [
  {
    path: "/finance/",
    Icon: AppstoreOutlined,
    name: "Dashboard",
    showInSidebar: true,
  },
  {
    path: "/finance/add-shipment",
    Icon: AppstoreAddOutlined,
    name: "Add new shipment",
    showInSidebar: true,
  },
  {
    path: "/finance/settings/activity",
    Icon: AppstoreAddOutlined,
    name: "Activity",
    showInSidebar: false,
  },
];

export const appRoutes = [
  { path: pathConstants["dashboard"], Element: Dashboard },
  { path: pathConstants["addShipment"], Element: AddShipment },
  { path: pathConstants["settings activity"], Element: SettingsActivity },
];

export const authRoutes = [{ path: pathConstants["login"], Element: Login }];
