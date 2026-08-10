import { useEffect, useState } from "react";

import {
  Card,
  Col,
  Empty,
  Row,
  Spin,
  Statistic,
  Table,
  Tag,
  Typography,
  message,
} from "antd";

import {
  BookOutlined,
  CheckCircleOutlined,
  ReadOutlined,
  StarFilled,
  PieChartOutlined,
  RiseOutlined,
} from "@ant-design/icons";

import MainLayout from "../layouts/MainLayout";
import "../styles/Reports.css";

const { Title, Text } = Typography;

const API_URL = "http://localhost:5000/api/books";

export default function Reports() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load books");
      }

      const data = await response.json();

      setBooks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      message.error("Unable to load reports");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const totalBooks = books.length;

  const readingBooks = books.filter(
    (book) =>
      String(book.status || "").toLowerCase() === "reading"
  ).length;

  const completedBooks = books.filter(
    (book) =>
      String(book.status || "").toLowerCase() === "completed"
  ).length;

  const wantToReadBooks = books.filter(
    (book) =>
      String(book.status || "").toLowerCase() === "want to read"
  ).length;

  const averageRating =
    totalBooks > 0
      ? (
          books.reduce(
            (total, book) =>
              total + Number(book.rating || 0),
            0
          ) / totalBooks
        ).toFixed(1)
      : "0.0";

  const averageProgress =
    totalBooks > 0
      ? Math.round(
          books.reduce(
            (total, book) =>
              total + Number(book.progress || 0),
            0
          ) / totalBooks
        )
      : 0;

  const statusData = [
    {
      name: "Reading",
      value: readingBooks,
    },
    {
      name: "Completed",
      value: completedBooks,
    },
    {
      name: "Want to Read",
      value: wantToReadBooks,
    },
  ];

  const categoryCounts = {};

  books.forEach((book) => {
    const category = book.category || "Uncategorized";

    categoryCounts[category] =
      (categoryCounts[category] || 0) + 1;
  });

  const categoryData = Object.entries(categoryCounts)
    .map(([category, count]) => ({
      category,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  const ratingCounts = {
    "5 Stars": 0,
    "4 Stars": 0,
    "3 Stars": 0,
    "2 Stars": 0,
    "1 Star": 0,
    "Unrated": 0,
  };

  books.forEach((book) => {
    const rating = Number(book.rating || 0);

    if (rating >= 5) {
      ratingCounts["5 Stars"]++;
    } else if (rating >= 4) {
      ratingCounts["4 Stars"]++;
    } else if (rating >= 3) {
      ratingCounts["3 Stars"]++;
    } else if (rating >= 2) {
      ratingCounts["2 Stars"]++;
    } else if (rating >= 1) {
      ratingCounts["1 Star"]++;
    } else {
      ratingCounts["Unrated"]++;
    }
  });

  const ratingData = Object.entries(ratingCounts).map(
    ([rating, count]) => ({
      rating,
      count,
    })
  );

  const bookColumns = [
    {
      title: "Book",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag>{status || "No Status"}</Tag>
      ),
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      render: (progress) =>
        `${Number(progress || 0)}%`,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <span className="report-rating">
          <StarFilled />
          {" "}
          {Number(rating || 0).toFixed(1)}
        </span>
      ),
    },
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="reports-loading">
          <Spin size="large" />
          <p>Loading reports...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="reports-page">

        <div className="reports-header">
          <div>
            <Title level={2}>
              Reports
            </Title>

            <Text>
              Overview and statistics of your personal library.
            </Text>
          </div>
        </div>

        <Row
          gutter={[20, 20]}
          className="report-stat-row"
        >

          <Col xs={24} sm={12} lg={4}>
            <Card className="report-card">
              <Statistic
                title="Total Books"
                value={totalBooks}
                prefix={<BookOutlined />}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={4}>
            <Card className="report-card">
              <Statistic
                title="Reading"
                value={readingBooks}
                prefix={<ReadOutlined />}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={4}>
            <Card className="report-card">
              <Statistic
                title="Completed"
                value={completedBooks}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={4}>
            <Card className="report-card">
              <Statistic
                title="Want to Read"
                value={wantToReadBooks}
                prefix={<BookOutlined />}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={4}>
            <Card className="report-card">
              <Statistic
                title="Average Rating"
                value={averageRating}
                prefix={<StarFilled />}
                suffix="/ 5"
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={4}>
            <Card className="report-card">
              <Statistic
                title="Average Progress"
                value={averageProgress}
                prefix={<RiseOutlined />}
                suffix="%"
              />
            </Card>
          </Col>

        </Row>

        <Row
          gutter={[20, 20]}
          className="report-section"
        >

          <Col xs={24} lg={12}>
            <Card
              title={
                <span>
                  <PieChartOutlined /> Books by Status
                </span>
              }
              className="report-card"
            >

              {totalBooks > 0 ? (
                <div className="status-report">

                  {statusData.map((item) => {

                    const percentage =
                      totalBooks > 0
                        ? Math.round(
                            (item.value /
                              totalBooks) *
                              100
                          )
                        : 0;

                    return (
                      <div
                        className="status-row"
                        key={item.name}
                      >

                        <div className="status-label">
                          <span>
                            {item.name}
                          </span>

                          <strong>
                            {item.value}
                          </strong>
                        </div>

                        <div className="report-progress">
                          <div
                            className="report-progress-fill"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>

                        <span className="percentage">
                          {percentage}%
                        </span>

                      </div>
                    );
                  })}

                </div>
              ) : (
                <Empty description="No books available" />
              )}

            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title="Rating Distribution"
              className="report-card"
            >

              {totalBooks > 0 ? (
                <div className="rating-report">

                  {ratingData.map((item) => {

                    const percentage =
                      totalBooks > 0
                        ? Math.round(
                            (item.count /
                              totalBooks) *
                              100
                          )
                        : 0;

                    return (
                      <div
                        className="rating-row"
                        key={item.rating}
                      >

                        <span className="rating-name">
                          {item.rating}
                        </span>

                        <div className="report-progress">
                          <div
                            className="report-progress-fill"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>

                        <span>
                          {item.count}
                        </span>

                      </div>
                    );
                  })}

                </div>
              ) : (
                <Empty description="No ratings available" />
              )}

            </Card>
          </Col>

        </Row>

        <Row
          gutter={[20, 20]}
          className="report-section"
        >

          <Col xs={24} lg={10}>
            <Card
              title="Categories"
              className="report-card"
            >

              {categoryData.length > 0 ? (

                <div className="category-list">

                  {categoryData.map((item) => (

                    <div
                      className="category-item"
                      key={item.category}
                    >

                      <span>
                        {item.category}
                      </span>

                      <Tag>
                        {item.count}
                      </Tag>

                    </div>

                  ))}

                </div>

              ) : (
                <Empty description="No categories available" />
              )}

            </Card>
          </Col>

          <Col xs={24} lg={14}>
            <Card
              title="Reading Progress"
              className="report-card"
            >

              {books.length > 0 ? (

                <Table
                  columns={bookColumns}
                  dataSource={books}
                  rowKey="id"
                  pagination={{
                    pageSize: 5,
                  }}
                  scroll={{
                    x: 600,
                  }}
                />

              ) : (
                <Empty description="No books available" />
              )}

            </Card>
          </Col>

        </Row>

      </div>
    </MainLayout>
  );
}