import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🌿</span>
          <span>MY Therapist</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/counseling" className={({ isActive }) => (isActive ? "active" : "")}>
            Counseling
          </NavLink>
          <NavLink to="/journal" className={({ isActive }) => (isActive ? "active" : "")}>
            Journal
          </NavLink>
          <NavLink to="/moodtracker" className={({ isActive }) => (isActive ? "active" : "")}>
            Mood Tracker
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
            Login
          </NavLink>
        </nav>

        <div className="nav-actions">
          <Link to="/signup" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}