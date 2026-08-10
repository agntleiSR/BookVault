import { Layout } from "antd";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "../styles/MainLayout.css";

const { Content } = Layout;

export default function MainLayout({ children }) {
  return (
    <Layout className="main-layout">

      <Sidebar />

      <Layout className="main-area">

        <Navbar />

        <Content className="main-content">
          {children}
        </Content>

      </Layout>

    </Layout>
  );
}