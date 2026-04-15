import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav style={styles.navbar}>
        {/* LOGO */}
        <div style={styles.logo}>🌿My Therapist</div>

        {/* LINKS */}
        <ul style={{ ...styles.links, ...(open ? styles.linksActive : {}) }}>
          <li><Link style={styles.link} to="/">Home</Link></li>
          <li><Link style={styles.link} to="/dashboard">Dashboard</Link></li>
          <li><Link style={styles.link} to="/chat">AI Chat</Link></li>
          <li><Link style={styles.link} to="/profile">Profile</Link></li>
        </ul>

        {/* MENU BUTTON (MOBILE) */}
        <button style={styles.menuBtn} onClick={() => setOpen(!open)}>
          ☰
        </button>
      </nav>

      {/* INLINE STYLES */}
      <style>{`
        @media (max-width: 768px) {
          ul {
            display: none;
          }

          ul.active {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 20px",
    background: "rgba(15, 23, 42, 0.95)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid #1e293b",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#22c55e",
  },

  links: {
    listStyle: "none",
    display: "flex",
    gap: "18px",
    margin: 0,
    padding: 0,
  },

  linksActive: {
    position: "absolute",
    top: "60px",
    right: "20px",
    flexDirection: "column",
    background: "#0f172a",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  },

  link: {
    textDecoration: "none",
    color: "#e2e8f0",
    fontSize: "14px",
    padding: "8px 10px",
    borderRadius: "8px",
    display: "block",
  },

  menuBtn: {
    display: "none",
    background: "#22c55e",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
  },
};