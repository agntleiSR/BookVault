import { useEffect, useState } from "react";

import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Card,
  message,
  Spin,
} from "antd";

import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import "../styles/AddBook.css";

export default function EditBook() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/books/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to load book");
      }

      const book = await response.json();

      form.setFieldsValue({
        title: book.title,
        author: book.author,
        category: book.category,
        status: book.status,
        rating: Number(book.rating || 0),
        progress: Number(book.progress || 0),
        description: book.description,
        coverUrl: book.coverUrl,
      });
    } catch (error) {
      console.error(error);
      message.error("Unable to load book");
      navigate("/library");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setSaving(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/books/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: values.title,
            author: values.author,
            category: values.category,
            status: values.status,
            rating: values.rating || 0,
            progress: values.progress || 0,
            description: values.description || null,
            coverUrl: values.coverUrl || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update book"
        );
      }

      message.success("Book updated successfully");

      navigate("/library");
    } catch (error) {
      console.error(error);
      message.error(
        error.message || "Unable to update book"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="add-book-page">
          <Card className="add-book-card">
            <div
              style={{
                textAlign: "center",
                padding: "50px",
              }}
            >
              <Spin size="large" />
              <p>Loading book...</p>
            </div>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="add-book-page">

        <Card className="add-book-card">

          <h1>Edit Book</h1>

          <p>
            Update the information of your book.
          </p>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >

            <Form.Item
              label="Book Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please enter the book title",
                },
              ]}
            >
              <Input
                placeholder="Enter book title"
              />
            </Form.Item>

            <Form.Item
              label="Author"
              name="author"
              rules={[
                {
                  required: true,
                  message: "Please enter the author",
                },
              ]}
            >
              <Input
                placeholder="Enter author name"
              />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
            >
              <Input
                placeholder="e.g. Fiction, Romance, Fantasy"
              />
            </Form.Item>

            <Form.Item
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Please select a status",
                },
              ]}
            >
              <Select
                options={[
                  {
                    value: "Want to Read",
                    label: "Want to Read",
                  },
                  {
                    value: "Reading",
                    label: "Reading",
                  },
                  {
                    value: "Completed",
                    label: "Completed",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
            >
              <InputNumber
                min={0}
                max={5}
                step={0.5}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Progress (%)"
              name="progress"
            >
              <InputNumber
                min={0}
                max={100}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
            >
              <Input.TextArea
                rows={4}
                placeholder="Enter book description"
              />
            </Form.Item>

            <Form.Item
              label="Cover URL"
              name="coverUrl"
            >
              <Input
                placeholder="Enter cover image URL"
              />
            </Form.Item>

            <div className="add-book-actions">

              <Button
                onClick={() => navigate("/library")}
              >
                Cancel
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                loading={saving}
              >
                Save Changes
              </Button>

            </div>

          </Form>

        </Card>

      </div>
    </MainLayout>
  );
}