import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, BookOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

export default function Login() {

    return (

        <div className="auth-page">

            <div className="auth-container">

                <div className="auth-left">

                    <BookOutlined className="auth-logo"/>

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

                        <Form layout="vertical">

                            <Form.Item>

                                <Input

                                    size="large"

                                    placeholder="Username"

                                    prefix={<UserOutlined/>}

                                />

                            </Form.Item>

                            <Form.Item>

                                <Input.Password

                                    size="large"

                                    placeholder="Password"

                                    prefix={<LockOutlined/>}

                                />

                            </Form.Item>

                            <Button
                                htmlType="submit"
                                type="primary"
                                className="auth-btn"
                            >

                                Login

                            </Button>

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