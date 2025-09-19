import React from "react";

export default function Footer() {
  return (
    <div style={{ background: "#f3f4f6", marginTop: 24 }}>
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "12px 24px", display: "flex", justifyContent: "space-between" }}>
        <span>© {new Date().getFullYear()} I LIKE ME</span>
        <a href="#/contact" style={{ textDecoration: "none" }}>Contact</a>
      </div>
    </div>
  );
}
