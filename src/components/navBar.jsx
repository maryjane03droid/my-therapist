import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">My Therapist</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/mood">Mood</Link>

        {user && <Link to="/journal">Journal</Link>}
        {user && <Link to="/chat">AI Chat</Link>}
        {user && <Link to="/profile">Profile</Link>}
        {user && <Link to="/support-group">Support Group</Link>}

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}