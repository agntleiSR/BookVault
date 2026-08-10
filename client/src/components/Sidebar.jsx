import { Layout, Menu, Modal } from "antd";

import {
  HomeOutlined,
  BookOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Link, useLocation, useNavigate } from "react-router-dom";

import "../styles/Sidebar.css";

const { Sider } = Layout;

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    Modal.confirm({
      title: "Logout",
      content: "Are you sure you want to logout?",
      okText: "Logout",
      cancelText: "Cancel",
      centered: true,

      onOk: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login", {
          replace: true,
        });
      },
    });
  };

  return (
    <Sider
      className="sidebar"
      width={250}
    >
      <div className="logo">
        <span>📚</span>
        <h2>BookVault</h2>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
      >

        <Menu.Item
          key="/dashboard"
          icon={<HomeOutlined />}
        >
          <Link to="/dashboard">
            Dashboard
          </Link>
        </Menu.Item>

        <Menu.Item
          key="/library"
          icon={<BookOutlined />}
        >
          <Link to="/library">
            My Library
          </Link>
        </Menu.Item>

        <Menu.Item
          key="/reports"
          icon={<BarChartOutlined />}
        >
          <Link to="/reports">
            Reports
          </Link>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          key="/logout"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>

      </Menu>
    </Sider>
  );
}