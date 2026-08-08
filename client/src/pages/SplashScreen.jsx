import { Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Splash.css";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash">
      <div className="logo">
        📚
      </div>

      <h1>BookVault</h1>
      <p>Your Personal Digital Library</p>

      <Spin size="large" />
       
    </div>
  );
}