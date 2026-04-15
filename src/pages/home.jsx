import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [mood, setMood] = useState("");
  const [message, setMessage] = useState("");

  const moods = [
    { label: "😊 Happy", value: "Happy" },
    { label: "😔 Sad", value: "Sad" },
    { label: "😰 Anxious", value: "Anxious" },
    { label: "😡 Angry", value: "Angry" },
    { label: "😌 Calm", value: "Calm" },
  ];

  const handleSubmit = () => {
    const entry = {
      mood,
      message,
      date: new Date().toISOString(),
    };

    const old = JSON.parse(localStorage.getItem("moodData")) || [];
    localStorage.setItem("moodData", JSON.stringify([...old, entry]));

    setMood("");
    setMessage("");
    alert("Saved successfully 🌿");
  };

  return (
    <div className="home-wrapper">

      {/* HERO SECTION */}
      <div className="hero-card">
        <h1>🌿 Your Mood Matters</h1>
        <p>Track your emotions & talk to your AI wellness assistant</p>
      </div>

      {/* MOOD SECTION */}
      <div className="card">
        <h2>How are you feeling today?</h2>

        <div className="mood-grid">
          {moods.map((m) => (
            <button
              key={m.value}
              onClick={() => setMood(m.value)}
              className={`mood-btn ${mood === m.value ? "active" : ""}`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* TEXT SECTION */}
      <div className="card">
        <h2>Talk about it</h2>

        <textarea
          placeholder="Write what's on your mind..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="button-row">
          <button className="primary" onClick={handleSubmit}>
            Save Mood
          </button>

          <button className="secondary" onClick={() => navigate("/chat")}>
            Open AI Chat 💬
          </button>
        </div>
      </div>

    </div>
  );
}