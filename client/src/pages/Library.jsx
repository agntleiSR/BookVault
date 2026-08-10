import { useEffect, useState } from "react";

import {
  Input,
  Select,
  Button,
  Card,
  Tag,
  Popconfirm,
  message,
} from "antd";

import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  StarFilled,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import "../styles/Library.css";

const API_URL = "http://localhost:5000/api/books";

export default function Library() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load books");
      }

      const data = await response.json();

      setBooks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      message.error("Unable to load books");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete book"
        );
      }

      message.success("Book deleted successfully");

      fetchBooks();
    } catch (error) {
      console.error(error);

      message.error(
        error.message || "Unable to delete book"
      );
    }
  };

  const filteredBooks = books.filter((book) => {
    const text = search.toLowerCase();

    const matchesSearch =
      book.title
        ?.toLowerCase()
        .includes(text) ||
      book.author
        ?.toLowerCase()
        .includes(text);

    const matchesStatus =
      status === "All" ||
      book.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout>

      <div className="library-page">

        <div className="library-header">

          <div>
            <h1>My Library</h1>

            <p>
              Your personal collection of books.
            </p>
          </div>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() =>
              navigate("/add-book")
            }
          >
            Add Book
          </Button>

        </div>

        <div className="library-toolbar">

          <Input
            prefix={<SearchOutlined />}
            placeholder="Search books..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <Select
            value={status}
            onChange={setStatus}
            options={[
              {
                value: "All",
                label: "All Books",
              },
              {
                value: "Reading",
                label: "Reading",
              },
              {
                value: "Completed",
                label: "Completed",
              },
              {
                value: "Want to Read",
                label: "Want to Read",
              },
            ]}
          />

        </div>

        {loading ? (

          <div
            style={{
              textAlign: "center",
              padding: "60px",
            }}
          >
            Loading books...
          </div>

        ) : filteredBooks.length > 0 ? (

          <div className="book-grid">

            {filteredBooks.map((book) => (

              <Card
                key={book.id}
                className="book-card"
                bodyStyle={{
                  padding: 0,
                }}
              >

                <div className="book-cover">

                  {book.coverUrl ? (

                    <img
                      src={book.coverUrl}
                      alt={book.title}
                    />

                  ) : (

                    <span>📖</span>

                  )}

                </div>

                <h2>
                  {book.title}
                </h2>

                <p>
                  by {book.author}
                </p>

                <div className="book-info">

                  <Tag>
                    {book.status || "No Status"}
                  </Tag>

                  <span>
                    <StarFilled />
                    {" "}
                    {book.rating || 0}
                  </span>

                </div>

                <div className="progress">

                  <span>
                    Progress:{" "}
                    {book.progress || 0}%
                  </span>

                  <div className="progress-bar">

                    <div
                      style={{
                        width: `${
                          book.progress || 0
                        }%`,
                      }}
                    />

                  </div>

                </div>

                <div className="book-actions">

                  <Button
                    icon={<EditOutlined />}
                    onClick={() =>
                      navigate(
                        `/edit-book/${book.id}`
                      )
                    }
                  >
                    Edit
                  </Button>

                  <Popconfirm
                    title="Delete this book?"
                    description="This action cannot be undone."
                    okText="Delete"
                    cancelText="Cancel"
                    onConfirm={() =>
                      deleteBook(book.id)
                    }
                  >

                    <Button
                      danger
                      icon={<DeleteOutlined />}
                    >
                      Delete
                    </Button>

                  </Popconfirm>

                </div>

              </Card>

            ))}

          </div>

        ) : (

          <div className="empty-library">

            <h2>
              No books found
            </h2>

            <p>
              Add your first book to your library.
            </p>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() =>
                navigate("/add-book")
              }
            >
              Add Book
            </Button>

          </div>

        )}

      </div>

    </MainLayout>
  );
}