import React from "react";

export default function Header({ nav }) {
  const items = [
    ["/", "Home"],
    ["/programs", "Programs"],
    ["/inquire", "Request proposal"],
  ];
  const btn = {
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    border: 0,
    padding: "10px 14px",
    borderRadius: 999,
    cursor: "pointer",
  };
  return (
    <div style={{ background: "#0ea5a4", color: "#fff" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "12px 24px" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
          <strong style={{ letterSpacing: 0.4 }}>I LIKE ME</strong>
          <nav style={{ display: "flex", gap: 8 }}>
            {items.map(([to, label]) => (
              <button key={to} onClick={() => nav(to)} style={btn}>
                {label}
              </button>
            ))}
            <a href="#/contact" style={{ ...btn, background: "#ff6a13", textDecoration: "none" }}>
              Contact
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
