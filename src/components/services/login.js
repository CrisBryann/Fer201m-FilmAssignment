import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import "../services/login.scss";
import Header from "../header/header";
import Register from "./register";
import Reset from "./reset";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";

export default function Logintest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(""); // State for notification message
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // Loading
    }
    if (user) {
      navigate("/"); // Redirect to the dashboard upon successful login
    }
  }, [user, loading]);
  return (
    <>
      <div className="fullscreen-login-container">
        <Header />

        <div className="login">
          <div className="login__container">
            {notification && (
              <div
                className="notification"
                style={{ color: "red", marginBottom: "20px" }}
              >
                {notification}
              </div>
            )}
            <h2 style={{ marginBottom: "30px", color: "rgb(250, 245, 236)" }}>
              Đăng Nhập
            </h2>
            <input
              type="text"
              className="login__textBox"
              a
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email Address"
            />

            <input
              type="password"
              className="login__textBox"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <button className="login__btn">SIGN IN</button>
            <div
              className="login__google"
              onClick={signInWithGoogle}
              style={{ cursor: "pointer", marginBottom: "10px" }}
            >
              <FcGoogle size={25} />
              Login With Google
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              If you dont have account
              <Link
                style={{ color: "rgb(252, 229, 182)", padding: "10px 10px" }}
              >
                SIGN UP
              </Link>
              here !
            </div>
          </div>
          <div id="register-popup" className="register-popup">
            <Register />
          </div>
          <div id="reset-popup" className="register-popup">
            <Reset />
          </div>
        </div>
      </div>
    </>
  );
}
