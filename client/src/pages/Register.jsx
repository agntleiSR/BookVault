import { Form, Input, Button, message } from "antd";
import {
    UserOutlined,
    LockOutlined,
    MailOutlined,
    BookOutlined
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";

export default function Register() {
    const navigate = useNavigate();

    const handleRegister = async (values) => {
        try {
            await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    fullName: values.fullName,
                    username: values.username,
                    email: values.email,
                    password: values.password
                }
            );

            message.success("Account created successfully!");

            navigate("/login");

        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Registration failed. Please try again.";

            message.error(errorMessage);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-container">

                <div className="auth-left">

                    <BookOutlined className="auth-logo" />

                    <h1>BookVault</h1>

                    <p>
                        Create your personal digital library and
                        keep every book in one place.
                    </p>

                </div>

                <div className="auth-right">

                    <div className="auth-card">

                        <div className="auth-title">
                            Create Account
                        </div>

                        <div className="auth-subtitle">
                            Join BookVault today
                        </div>

                        <Form
                            layout="vertical"
                            onFinish={handleRegister}
                        >

                            <Form.Item
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your full name."
                                    }
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Full Name"
                                    prefix={<UserOutlined />}
                                />
                            </Form.Item>

                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter a username."
                                    }
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Username"
                                    prefix={<UserOutlined />}
                                />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        type: "email",
                                        message: "Please enter a valid email."
                                    }
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Email"
                                    prefix={<MailOutlined />}
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        min: 6,
                                        message:
                                            "Please enter a Password"
                                    }
                                ]}
                            >
                                <Input.Password
                                    size="large"
                                    placeholder="Password"
                                    prefix={<LockOutlined />}
                                />
                            </Form.Item>

                            <Form.Item
                                name="confirmPassword"
                                dependencies={["password"]}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please confirm your password."
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (
                                                !value ||
                                                getFieldValue("password") ===
                                                    value
                                            ) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(
                                                new Error(
                                                    "Passwords do not match."
                                                )
                                            );
                                        }
                                    })
                                ]}
                            >
                                <Input.Password
                                    size="large"
                                    placeholder="Confirm Password"
                                    prefix={<LockOutlined />}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    className="auth-btn"
                                >
                                    Create Account
                                </Button>
                            </Form.Item>

                        </Form>

                        <div className="auth-footer">

                            Already have an account?

                            {" "}

                            <Link to="/login">
                                Login
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}