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

const pathConstants = {
  dashboard: "/",
  addShipment: "/add-shipment",
};

export const routes = [
  { path: "/", Icon: AppstoreOutlined, name: "Dashboard" },
  {
    path: "/add-shipment",
    Icon: AppstoreAddOutlined,
    name: "Add new shipment",
  },
];

export const settingsRoutes = [
  {
    path: "/account",
    Icon: UserOutlined,
    name: "Account",
  },
];

export const appRoutes = [
  { path: pathConstants["dashboard"], Element: Dashboard },
  { path: pathConstants["addShipment"], Element: AddShipment },
];
