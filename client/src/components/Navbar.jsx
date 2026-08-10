import { useEffect, useState } from "react";
import { Avatar, Input, Badge, Tooltip, Dropdown } from "antd";

import {
  SearchOutlined,
  UserOutlined,
  BellOutlined,
  SettingOutlined,
  CheckOutlined,
} from "@ant-design/icons";

import { useLocation, useNavigate } from "react-router-dom";

import "../styles/Navbar.css";

const API_URL = "http://localhost:5000/api/books";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [search, setSearch] = useState("");

  const pageInfo = {
    "/dashboard": {
      title: "Dashboard",
      subtitle: "Welcome back to BookVault",
    },

    "/library": {
      title: "My Library",
      subtitle: "Manage your books and reading collection.",
    },

    "/add-book": {
      title: "Add Book",
      subtitle: "Add a new book to your personal library.",
    },

    "/reports": {
      title: "Reports",
      subtitle: "View statistics and insights about your library.",
    },

    "/settings": {
      title: "Settings",
      subtitle: "Manage your BookVault preferences.",
    },

    "/notifications": {
      title: "Notifications",
      subtitle: "View your latest library notifications.",
    },
  };

  const currentPage =
    pageInfo[location.pathname] || {
      title: "BookVault",
      subtitle: "Your personal digital library",
    };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentSearch = params.get("search") || "";

    setSearch(currentSearch);
  }, [location.search]);

  const fetchBooks = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load books");
      }

      const data = await response.json();

      const bookList = Array.isArray(data) ? data : [];

      setBooks(bookList);

      generateNotifications(bookList);
    } catch (error) {
      console.error("Notification error:", error);

      setBooks([]);

      setNotifications([
        {
          id: "welcome",
          title: "Welcome to BookVault",
          message: "Your personal library is ready.",
          read: false,
        },
      ]);
    }
  };

  const generateNotifications = (bookList) => {
    const newNotifications = [];

    if (bookList.length === 0) {
      newNotifications.push({
        id: "empty-library",
        title: "Your library is empty",
        message:
          "Add your first book to start building your collection.",
        read: false,
      });
    }

    bookList.forEach((book) => {
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
        newNotifications.push({
          id: `reading-${book.id}`,
          title: "Currently Reading",
          message: `You are currently reading "${book.title}".`,
          read: false,
        });
      }

      if (status === "completed") {
        newNotifications.push({
          id: `completed-${book.id}`,
          title: "Book Completed",
          message: `You completed "${book.title}".`,
          read: false,
        });
      }

      if (
        progress >= 90 &&
        status !== "completed"
      ) {
        newNotifications.push({
          id: `progress-${book.id}`,
          title: "Almost Finished",
          message: `"${book.title}" is ${progress}% complete.`,
          read: false,
        });
      }

      if (rating >= 4) {
        newNotifications.push({
          id: `rating-${book.id}`,
          title: "Highly Rated Book",
          message: `You rated "${book.title}" ${rating}/5.`,
          read: false,
        });
      }
    });

    setNotifications(newNotifications);
  };

  const handleSearch = (value) => {
    const trimmedValue = value.trim();

    setSearch(value);

    if (trimmedValue) {
      navigate(
        `/library?search=${encodeURIComponent(trimmedValue)}`
      );
    } else {
      navigate("/library");
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;

    setSearch(value);

    if (value.trim() === "") {
      if (location.pathname === "/library") {
        navigate("/library");
      }
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const notificationMenu = {
    items: [
      {
        key: "header",
        label: (
          <div className="notification-header">
            <strong>Notifications</strong>

            {unreadCount > 0 && (
              <button
                className="mark-read-button"
                onClick={(event) => {
                  event.stopPropagation();
                  markAllAsRead();
                }}
              >
                <CheckOutlined />
                Mark all as read
              </button>
            )}
          </div>
        ),

        disabled: true,
      },

      ...(notifications.length > 0
        ? notifications.map((notification) => ({
            key: String(notification.id),

            label: (
              <div
                className={`notification-item ${
                  notification.read
                    ? "read"
                    : "unread"
                }`}
              >
                <div className="notification-dot">
                  {!notification.read && <span />}
                </div>

                <div className="notification-content">
                  <strong>
                    {notification.title}
                  </strong>

                  <p>
                    {notification.message}
                  </p>
                </div>
              </div>
            ),
          }))
        : [
            {
              key: "none",
              label: (
                <div className="no-notifications">
                  No notifications
                </div>
              ),
            },
          ]),

      {
        type: "divider",
      },

      {
        key: "view-all",
        label: (
          <div className="view-all-notifications">
            View all notifications
          </div>
        ),

        onClick: () =>
          navigate("/notifications"),
      },
    ],
  };

  return (
    <header className="navbar">

      <div className="navbar-title">
        <h2>{currentPage.title}</h2>

        <p>{currentPage.subtitle}</p>
      </div>

      <div className="navbar-right">

        <Input
          prefix={<SearchOutlined />}
          placeholder="Search books..."
          className="navbar-search"
          value={search}
          onChange={handleSearchChange}
          onPressEnter={(event) =>
            handleSearch(event.target.value)
          }
          allowClear
        />

        <Tooltip title="Notifications">
          <Dropdown
            menu={notificationMenu}
            trigger={["click"]}
            placement="bottomRight"
            overlayClassName="notification-dropdown"
          >
            <button className="navbar-icon">
              <Badge
                count={unreadCount}
                size="small"
                overflowCount={99}
              >
                <BellOutlined />
              </Badge>
            </button>
          </Dropdown>
        </Tooltip>

        <Tooltip title="Settings">
          <button
            className="navbar-icon"
            onClick={() =>
              navigate("/settings")
            }
          >
            <SettingOutlined />
          </button>
        </Tooltip>

        <button
          className="navbar-profile"
          onClick={() =>
            navigate("/profile")
          }
        >
          <Avatar
            size={40}
            icon={<UserOutlined />}
          />

          <div className="navbar-user-info">
            <strong>User</strong>

            <span>Library Member</span>
          </div>
        </button>

      </div>
    </header>
  );
}