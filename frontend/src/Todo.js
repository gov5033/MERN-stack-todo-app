import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

export default function Todo({ dark }) {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;
    await axios.post(API_URL, { title });
    setTitle("");
    fetchTodos();
  };

  const toggle = async (id, completed) => {
    await axios.put(`${API_URL}/${id}`, { completed: !completed });
    fetchTodos();
  };

  const remove = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTodos();
  };

  const visibleTodos = useMemo(() => {
    if (filter === "active") return todos.filter(t => !t.completed);
    if (filter === "completed") return todos.filter(t => t.completed);
    return todos;
  }, [todos, filter]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "520px",
        background: dark ? "#020617" : "#ffffff",
        color: dark ? "#e5e7eb" : "#0f172a",
        borderRadius: "14px",
        padding: "28px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 600 }}>Tasks</h1>
        <p style={{ fontSize: "13px", opacity: 0.7, marginTop: "4px" }}>
          {todos.filter(t => t.completed).length} of {todos.length} completed
        </p>
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "18px" }}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTodo()}
          placeholder="What needs to be done?"
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: "8px",
            border: "1px solid #cbd5f5",
            fontSize: "14px",
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            background: "#4f46e5",
            color: "white",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "18px" }}>
        {["all", "active", "completed"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "4px 12px",
              borderRadius: "999px",
              fontSize: "12px",
              border: "none",
              cursor: "pointer",
              background:
                filter === f ? "#e0e7ff" : "transparent",
              color: filter === f ? "#3730a3" : "inherit",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      {visibleTodos.length === 0 ? (
        <p style={{ textAlign: "center", opacity: 0.6, padding: "20px" }}>
          Nothing here yet
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {visibleTodos.map(todo => (
            <li
              key={todo._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                marginBottom: "8px",
              }}
            >
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggle(todo._id, todo.completed)}
                />
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    opacity: todo.completed ? 0.5 : 1,
                    fontSize: "14px",
                  }}
                >
                  {todo.title}
                </span>
              </div>
              <button
                onClick={() => remove(todo._id)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "18px",
                  opacity: 0.6,
                }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
