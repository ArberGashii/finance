import {
  AppstoreAddOutlined,
  UserOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

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
