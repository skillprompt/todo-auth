import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export function LoginForm() {
  const navigate = useNavigate();

  const authCtx = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    console.log({ username, password });

    const res = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message);
      return;
    }

    console.log("Login data", data);
    // redirect to the dashboard
    navigate("/dashboard");
  };

  if (authCtx.data?._id) {
    navigate("/dashboard");
    return;
  }

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
      onSubmit={handleSubmit}
    >
      <h2>Login</h2>
      <label htmlFor="username">Username</label>
      <input
        style={{
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "0.25rem",
          fontSize: "1rem",
          lineHeight: "1.5rem",
        }}
        type="text"
        id="username"
        name="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        style={{
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "0.25rem",
          fontSize: "1rem",
          lineHeight: "1.5rem",
        }}
        type="password"
        id="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      {message ? (
        <p
          style={{
            color: "red",
          }}
        >
          {message}
        </p>
      ) : null}

      <button
        style={{
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "0.25rem",
          fontSize: "1rem",
          lineHeight: "1.5rem",
          cursor: "pointer",
        }}
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
