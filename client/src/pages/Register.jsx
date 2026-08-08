import { Form, Input, Button } from "antd";
import {
    UserOutlined,
    LockOutlined,
    MailOutlined,
    BookOutlined
} from "@ant-design/icons";

import { Link } from "react-router-dom";

import "../styles/Auth.css";

export default function Register(){

return(

<div className="auth-page">

<div className="auth-container">

<div className="auth-left">

<BookOutlined className="auth-logo"/>

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

<Form layout="vertical">

<Form.Item>

<Input
size="large"
placeholder="Full Name"
prefix={<UserOutlined/>}
/>

</Form.Item>

<Form.Item>

<Input
size="large"
placeholder="Username"
prefix={<UserOutlined/>}
/>

</Form.Item>

<Form.Item>

<Input
size="large"
placeholder="Email"
prefix={<MailOutlined/>}
/>

</Form.Item>

<Form.Item>

<Input.Password
size="large"
placeholder="Password"
prefix={<LockOutlined/>}
/>

</Form.Item>

<Form.Item>

<Input.Password
size="large"
placeholder="Confirm Password"
prefix={<LockOutlined/>}
/>

</Form.Item>

<Button
type="primary"
className="auth-btn"
>

Create Account

</Button>

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