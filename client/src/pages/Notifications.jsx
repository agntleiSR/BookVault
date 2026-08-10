import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Empty,
  Button,
  Tag,
  message,
} from "antd";

import {
  BellOutlined,
  CheckOutlined,
  BookOutlined,
  ReadOutlined,
  CheckCircleOutlined,
  StarFilled,
} from "@ant-design/icons";

import MainLayout from "../layouts/MainLayout";

import "../styles/Notifications.css";

const { Title, Text } = Typography;

const API_URL = "http://localhost:5000/api/books";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load books");
      }

      const books = await response.json();

      const generated = [];

      if (books.length === 0) {
        generated.push({
          id: "empty",
          type: "library",
          title: "Your library is empty",
          message:
            "Add your first book to start building your collection.",
        });
      }

      books.forEach((book) => {
        const status = String(
          book.status || ""
        ).toLowerCase();

        const progress = Number(
          book.progress || 0
        );

        const rating = Number(
          book.rating || 0
        );

        if (status === "reading") {
          generated.push({
            id: `reading-${book.id}`,
            type: "reading",
            title: "Currently Reading",
            message: `You are currently reading "${book.title}".`,
          });
        }

        if (status === "completed") {
          generated.push({
            id: `completed-${book.id}`,
            type: "completed",
            title: "Book Completed",
            message: `You completed "${book.title}".`,
          });
        }

        if (
          progress >= 90 &&
          status !== "completed"
        ) {
          generated.push({
            id: `progress-${book.id}`,
            type: "progress",
            title: "Almost Finished",
            message: `"${book.title}" is ${progress}% complete.`,
          });
        }

        if (rating >= 4) {
          generated.push({
            id: `rating-${book.id}`,
            type: "rating",
            title: "Highly Rated Book",
            message: `You rated "${book.title}" ${rating}/5.`,
          });
        }
      });

      setNotifications(generated);
    } catch (error) {
      console.error(error);
      message.error(
        "Unable to load notifications"
      );
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "reading":
        return <ReadOutlined />;

      case "completed":
        return <CheckCircleOutlined />;

      case "rating":
        return <StarFilled />;

      case "progress":
        return <BookOutlined />;

      default:
        return <BellOutlined />;
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="notifications-page">
          <Card className="notifications-card">
            <Text>
              Loading notifications...
            </Text>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="notifications-page">

        <div className="notifications-header">
          <div>
            <Title level={2}>
              Notifications
            </Title>

            <Text>
              Stay updated with your library activity.
            </Text>
          </div>

          {notifications.length > 0 && (
            <Button
              icon={<CheckOutlined />}
              onClick={() =>
                message.success(
                  "All notifications marked as read"
                )
              }
            >
              Mark All as Read
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <Card className="notifications-card">
            <Empty
              image={
                <BellOutlined
                  style={{
                    fontSize: 50,
                  }}
                />
              }
              description="No notifications"
            />
          </Card>
        ) : (
          <div className="notification-list">

            {notifications.map(
              (notification) => (
                <Card
                  key={notification.id}
                  className="notification-card"
                >
                  <div className="notification-page-icon">
                    {getIcon(
                      notification.type
                    )}
                  </div>

                  <div className="notification-page-content">
                    <div className="notification-page-title">
                      <Title level={4}>
                        {notification.title}
                      </Title>

                      <Tag color="blue">
                        New
                      </Tag>
                    </div>

                    <Text>
                      {notification.message}
                    </Text>
                  </div>
                </Card>
              )
            )}

          </div>
        )}

      </div>
    </MainLayout>
  );
}