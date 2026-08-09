import { Form, Input, Button, message } from "antd";
import {
    UserOutlined,
    LockOutlined,
    BookOutlined
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    username: values.username,
                    password: values.password
                }
            );

            // Save the JWT token
            localStorage.setItem("token", response.data.token);

            // Save user information if returned by the API
            if (response.data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
            }

            message.success("Login successful!");

            // Go to Dashboard
            navigate("/dashboard");

        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Invalid username or password.";

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
                        Organize your collection.
                        Track your reading.
                        Discover your next adventure.
                    </p>

                </div>

                <div className="auth-right">

                    <div className="auth-card">

                        <div className="auth-title">
                            Welcome Back
                        </div>

                        <div className="auth-subtitle">
                            Login to continue
                        </div>

                        <Form
                            layout="vertical"
                            onFinish={handleLogin}
                        >

                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your username."
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
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your password."
                                    }
                                ]}
                            >
                                <Input.Password
                                    size="large"
                                    placeholder="Password"
                                    prefix={<LockOutlined />}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    className="auth-btn"
                                >
                                    Login
                                </Button>
                            </Form.Item>

                        </Form>

                        <div className="auth-footer">

                            Don't have an account?

                            {" "}

                            <Link to="/register">
                                Create Account
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}