import {
  AppstoreAddOutlined,
  UserOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { lazy } from "react";

const Dashboard = lazy(() => import("./rootlayout/pages/Dashboard/Dashboard"));
const AddShipment = lazy(() =>
  import("./rootlayout/pages/AddShipment/AddShipments")
);
const Login = lazy(() => import("./AuthLayout/pages/Login"));

const pathConstants = {
  dashboard: "/finance/",
  addShipment: "/finance/add-shipment",
  editShipment: "/finance/add-shipment/:xId",
  login: "/finance/login",
};

export const routes = [
  { path: "/finance/", Icon: AppstoreOutlined, name: "Dashboard" },
  {
    path: "/finance/add-shipment",
    Icon: AppstoreAddOutlined,
    name: "Add new shipment",
  },
];

export const settingsRoutes = [
  {
    path: "/finance/account",
    Icon: UserOutlined,
    name: "Account",
  },
];

export const appRoutes = [
  { path: pathConstants["dashboard"], Element: Dashboard },
  { path: pathConstants["addShipment"], Element: AddShipment },
];

export const authRoutes = [{ path: pathConstants["login"], Element: Login }];
