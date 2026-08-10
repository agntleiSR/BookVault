import { Card, Typography } from "antd";

import MainLayout from "../layouts/MainLayout";

import "../styles/Settings.css";

const { Title, Text } = Typography;

export default function Settings() {
  return (
    <MainLayout>
      <div className="settings-page">
        <Card className="settings-card">
          <div className="settings-icon">
            ⚙️
          </div>

          <Title level={2}>
            Settings
          </Title>

          <Text>
            Settings and account customization features
            are coming soon.
          </Text>

          <div className="settings-coming-soon">
            Coming Soon
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}