import React, { useState } from "react";

const APP_PASSWORD = "01227920414";

function LoginGate({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (password !== APP_PASSWORD) {
      setError("Mật khẩu không đúng.");
      setPassword("");

      return;
    }

    sessionStorage.setItem("payroll_logged_in", "true");

    onLogin();
  }

  return (
    <main className="login-page">
      <form
        className="login-card"
        onSubmit={handleSubmit}
      >
        <h1>Quản lý lương</h1>

        <p>Nhập mật khẩu để mở ứng dụng.</p>

        <input
          type="password"
          value={password}
          placeholder="Mật khẩu"
          autoFocus
          onChange={(event) => {
            setPassword(event.target.value);
            setError("");
          }}
        />

        {error && (
          <p className="login-error">
            {error}
          </p>
        )}

        <button type="submit">
          Đăng nhập
        </button>
      </form>
    </main>
  );
}

export default LoginGate;