"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function login(event) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.get("username"),
        password: form.get("password"),
      }),
    });

    setIsLoading(false);

    if (!response.ok) {
      setError("Username or password is incorrect.");
      return;
    }

    window.location.href = "/admin/portfolio";
  }

  return (
    <main className="admin-shell">
      <form className="admin-login-card" onSubmit={login}>
        <p className="eyebrow">True Designs Admin</p>
        <h1>Portfolio Login</h1>
        <label>
          Username
          <input name="username" required autoComplete="username" placeholder="admin" />
        </label>
        <label>
          Password
          <input name="password" required type="password" autoComplete="current-password" placeholder="Enter password" />
        </label>
        {error && <p className="admin-error">{error}</p>}
        <button className="button primary" type="submit" disabled={isLoading}>
          {isLoading ? "Checking..." : "Login"}
        </button>
      </form>
    </main>
  );
}
