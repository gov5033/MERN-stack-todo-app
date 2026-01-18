import { useState } from "react";
import Todo from "./Todo";

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: dark ? "#0f172a" : "#f1f5f9",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Theme toggle */}
      <button
        onClick={() => setDark(!dark)}
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          padding: "8px 14px",
          borderRadius: "20px",
          border: "none",
          background: dark ? "#1e293b" : "#e2e8f0",
          color: dark ? "#e5e7eb" : "#0f172a",
          cursor: "pointer",
        }}
      >
        {dark ? "☀ Light" : "🌙 Dark"}
      </button>

      <Todo dark={dark} />
    </div>
  );
}
