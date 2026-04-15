import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="home-page">
      <div className="hero-card">
        <h1>Your safe space for emotional wellness</h1>
        <p>
          Track your mood, write private journal entries, and talk to an AI support assistant.
        </p>

        <div className="hero-actions">
          <Link to="/mood" className="primary-btn">Track Mood</Link>
          <Link to="/chat" className="secondary-btn">Talk to AI</Link>
        </div>
      </div>
    </section>
  );
}