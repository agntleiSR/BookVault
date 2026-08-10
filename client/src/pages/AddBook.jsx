import { useState } from "react";

import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Card,
  message,
  Upload,
} from "antd";

import {
  InboxOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import "../styles/AddBook.css";

const { Dragger } = Upload;

export default function AddBook() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [cover, setCover] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  // ==========================================
  // COVER UPLOAD
  // ==========================================

  const handleCoverChange = (info) => {
    const file = info.file;

    if (!file) return;

    // Check image
    if (!file.type.startsWith("image/")) {
      message.error("Please upload an image file.");
      return;
    }

    // Check size - 5MB maximum
    if (file.size > 5 * 1024 * 1024) {
      message.error("Cover image must be smaller than 5MB.");
      return;
    }

    setCover(file);

    // Preview
    const previewUrl = URL.createObjectURL(file);
    setCoverPreview(previewUrl);
  };

  // ==========================================
  // REMOVE COVER
  // ==========================================

  const removeCover = () => {
    setCover(null);

    if (coverPreview) {
      URL.revokeObjectURL(coverPreview);
    }

    setCoverPreview(null);
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/books",
        {
          method: "POST",
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

            // Temporary cover value
            coverUrl: cover ? cover.name : null,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add book");
      }

      message.success("Book added successfully!");

      removeCover();

      navigate("/library");

    } catch (error) {
      console.error(error);

      message.error("Unable to add book");

    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>

      <div className="add-book-page">

        <Card className="add-book-card">

          <h1>Add Book</h1>

          <p>
            Add a new book to your personal library.
          </p>

          <Form
            layout="vertical"
            onFinish={handleSubmit}
          >

            {/* =====================================
                BOOK COVER
            ====================================== */}

            <Form.Item label="Book Cover">

              {!coverPreview ? (

                <Dragger
                  name="cover"
                  multiple={false}
                  accept="image/*"
                  beforeUpload={() => false}
                  onChange={handleCoverChange}
                  showUploadList={false}
                  className="cover-uploader"
                >

                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>

                  <p className="ant-upload-text">
                    Click or drag a cover image here
                  </p>

                  <p className="ant-upload-hint">
                    JPG, PNG, WEBP or other image formats.
                    Maximum size: 5MB.
                  </p>

                </Dragger>

              ) : (

                <div className="cover-preview">

                  <img
                    src={coverPreview}
                    alt="Book cover preview"
                  />

                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={removeCover}
                  >
                    Remove Cover
                  </Button>

                </div>

              )}

            </Form.Item>


            {/* =====================================
                TITLE
            ====================================== */}

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


            {/* =====================================
                AUTHOR
            ====================================== */}

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


            {/* =====================================
                CATEGORY
            ====================================== */}

            <Form.Item
              label="Category"
              name="category"
            >
              <Input
                placeholder="e.g. Fiction, Romance, Fantasy"
              />
            </Form.Item>


            {/* =====================================
                STATUS
            ====================================== */}

            <Form.Item
              label="Status"
              name="status"
              initialValue="Want to Read"
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


            {/* =====================================
                RATING
            ====================================== */}

            <Form.Item
              label="Rating"
              name="rating"
              initialValue={0}
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


            {/* =====================================
                PROGRESS
            ====================================== */}

            <Form.Item
              label="Progress (%)"
              name="progress"
              initialValue={0}
            >
              <InputNumber
                min={0}
                max={100}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>


            {/* =====================================
                ACTIONS
            ====================================== */}

            <div className="add-book-actions">

              <Button
                onClick={() =>
                  navigate("/library")
                }
              >
                Cancel
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Add Book
              </Button>

            </div>

          </Form>

        </Card>

      </div>

    </MainLayout>
  );
}