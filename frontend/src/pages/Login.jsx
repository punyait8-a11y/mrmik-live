/* =========================
   src/pages/Login.jsx
========================= */

import { useState } from "react";

import "../styles/Login.css";

import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheck
} from "react-icons/fa";

function Login() {

  const [showPassword, setShowPassword]
    = useState(false);

  const [username, setUsername]
    = useState("");

  const [password, setPassword]
    = useState("");

  /* =========================
     LOGIN
  ========================= */

  const handleLogin = () => {

    if (
      username === "" ||
      password === ""
    ) {

      alert("Username dan Password wajib diisi");

      return;

    }

    /* =========================
       USER LOGIN
    ========================= */

    const users = [

      {
        username: "admin",
        password: "admin123"
      },

      {
        username: "mrmik",
        password: "123"
      },

      {
        username: "akreditasi",
        password: "123"
      }

    ];

    const cekUser = users.find(

      (u) =>

        u.username === username &&
        u.password === password

    );

    if (cekUser) {

      /* LOGIN */
      localStorage.setItem("login","true");

localStorage.setItem(
  "username",
  username
);

      /* SIMPAN USERNAME */
      localStorage.setItem(
        "username",
        username
      );

      alert(
        "Login berhasil"
      );

      window.location.href =
        "/dashboard";

    } else {

      alert(
        "Username atau Password salah"
      );

    }

  };

  /* =========================
     ENTER KEYBOARD
  ========================= */

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      handleLogin();

    }

  };

  return (

    <div className="login-container">

      {/* LEFT */}

      <div className="login-left">

        <h1>

          MRMIK Accreditation System

        </h1>

        <p>

          Platform digital terintegrasi
          untuk pengelolaan eviden,
          monitoring dokumen,
          dan pencapaian standar
          akreditasi rumah sakit modern.

        </p>

        <div className="feature-list">

          <div>
            <FaCheck />
            Realtime Accreditation Dashboard
          </div>

          <div>
            <FaCheck />
            Integrated Evidence Management
          </div>

          <div>
            <FaCheck />
            Document Monitoring System
          </div>

          <div>
            <FaCheck />
            Secure & Responsive Platform
          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div className="login-right">

        <div className="login-box">

          <h2>

            Login Sistem

          </h2>

          <p className="subtitle">

            Hospital Accreditation Platform

          </p>

          {/* USERNAME */}

          <div className="input-group">

            <FaUser className="icon" />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              onKeyDown={handleKeyDown}
            />

          </div>

          {/* PASSWORD */}

          <div className="input-group">

            <FaLock className="icon" />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              onKeyDown={handleKeyDown}
            />

            <div
              className="eye"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >

              {
                showPassword
                  ? <FaEyeSlash />
                  : <FaEye />
              }

            </div>

          </div>

          {/* BUTTON */}

          <button onClick={handleLogin}>

            Login Sistem

          </button>

          {/* INFO LOGIN */}

          <div className="login-info">

            <p>
              Username :
              <b> admin </b>
            </p>

            <p>
              Password :
              <b> admin123 </b>
            </p>

          </div>

          <p className="footer-text">

            Powered by Hospital Information System

          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;