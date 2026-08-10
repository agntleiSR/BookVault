import { useEffect, useState } from "react";

import {
    Row,
    Col,
    Card,
    Typography,
    Progress,
    Button,
    Empty,
    Spin,
} from "antd";

import {
    BookOutlined,
    ReadOutlined,
    CheckCircleOutlined,
    StarFilled,
} from "@ant-design/icons";

import MainLayout from "../layouts/MainLayout";

import "../styles/Dashboard.css";

const { Title, Text } = Typography;

const API_URL = "http://localhost:5000/api/books";

export default function Dashboard() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("Failed to fetch books");
            }

            const data = await response.json();

            setBooks(
                Array.isArray(data)
                    ? data
                    : []
            );
        } catch (error) {
            console.error(
                "Error loading books:",
                error
            );

            setBooks([]);
        } finally {
            setLoading(false);
        }
    };

    const totalBooks = books.length;

    const currentlyReading = books.filter(
        (book) =>
            String(book.status || "")
                .toLowerCase() === "reading"
    ).length;

    const completed = books.filter(
        (book) =>
            String(book.status || "")
                .toLowerCase() === "completed"
    ).length;

    const averageRating =
        books.length > 0
            ? (
                  books.reduce(
                      (total, book) =>
                          total +
                          Number(
                              book.rating || 0
                          ),
                      0
                  ) / books.length
              ).toFixed(1)
            : "0.0";

    const stats = [
        {
            title: "Total Books",
            value: totalBooks,
            icon: <BookOutlined />,
        },
        {
            title: "Currently Reading",
            value: currentlyReading,
            icon: <ReadOutlined />,
        },
        {
            title: "Completed",
            value: completed,
            icon: <CheckCircleOutlined />,
        },
        {
            title: "Average Rating",
            value: averageRating,
            icon: <StarFilled />,
        },
    ];

    const currentBook = books.find(
        (book) =>
            String(book.status || "")
                .toLowerCase() === "reading"
    );

    const recentBooks = [...books]
        .sort(
            (a, b) =>
                new Date(
                    b.createdAt || 0
                ) -
                new Date(
                    a.createdAt || 0
                )
        )
        .slice(0, 4);

    if (loading) {
        return (
            <MainLayout>
                <div className="dashboard-loading">
                    <Spin size="large" />

                    <p>
                        Loading your library...
                    </p>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="dashboard">

                <div className="dashboard-header">
                    <Title level={2}>
                        Welcome Back 👋
                    </Title>

                    <Text>
                        Here's an overview of
                        your personal library.
                    </Text>
                </div>

                <Row
                    gutter={[20, 20]}
                    className="stats-row"
                >
                    {stats.map((item) => (
                        <Col
                            xs={24}
                            sm={12}
                            lg={6}
                            key={item.title}
                        >
                            <Card className="glass-card stat-card">

                                <div className="stat-icon">
                                    {item.icon}
                                </div>

                                <Title level={2}>
                                    {item.value}
                                </Title>

                                <Text>
                                    {item.title}
                                </Text>

                            </Card>
                        </Col>
                    ))}
                </Row>

                {currentBook ? (
                    <Card className="glass-card continue-reading">

                        <div className="continue-info">

                            <Title level={3}>
                                Continue Reading
                            </Title>

                            <Text
                                strong
                                className="book-title"
                            >
                                {currentBook.title}
                            </Text>

                            <br />

                            <Text className="book-author">
                                {currentBook.author}
                            </Text>

                            <Progress
                                percent={Math.min(
                                    100,
                                    Math.max(
                                        0,
                                        Number(
                                            currentBook.progress ||
                                                0
                                        )
                                    )
                                )}
                                strokeColor="#2563eb"
                                trailColor="#e5e7eb"
                            />

                        </div>

                        <Button
                            type="primary"
                            size="large"
                            className="continue-button"
                        >
                            Continue
                        </Button>

                    </Card>
                ) : (
                    <Card className="glass-card continue-reading">

                        <div>
                            <Title level={3}>
                                Continue Reading
                            </Title>

                            <Text>
                                You don't have a book
                                currently marked as
                                "Reading".
                            </Text>
                        </div>

                    </Card>
                )}

                <Title
                    level={3}
                    className="section-title"
                >
                    Recently Added
                </Title>

                {recentBooks.length > 0 ? (
                    <Row gutter={[20, 20]}>

                        {recentBooks.map(
                            (book, index) => (
                                <Col
                                    xs={24}
                                    sm={12}
                                    lg={6}
                                    key={
                                        book.id ||
                                        index
                                    }
                                >
                                    <Card className="glass-card book-card">

                                        <div className="cover">
                                            {book.coverUrl ? (
                                                <img
                                                    src={
                                                        book.coverUrl
                                                    }
                                                    alt={
                                                        book.title
                                                    }
                                                />
                                            ) : (
                                                "📚"
                                            )}
                                        </div>

                                        <Title level={5}>
                                            {book.title}
                                        </Title>

                                        <Text className="author">
                                            {book.author}
                                        </Text>

                                        <div className="book-bottom">

                                            <span>
                                                {book.status ||
                                                    "No Status"}
                                            </span>

                                            <span>
                                                ⭐{" "}
                                                {Number(
                                                    book.rating ||
                                                        0
                                                ).toFixed(
                                                    1
                                                )}
                                            </span>

                                        </div>

                                    </Card>
                                </Col>
                            )
                        )}

                    </Row>
                ) : (
                    <Card className="glass-card empty-books">

                        <Empty
                            description="No books added yet"
                        />

                    </Card>
                )}

            </div>
        </MainLayout>
    );
}