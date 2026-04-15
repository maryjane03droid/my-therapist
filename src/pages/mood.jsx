import { useState } from "react";
import Layout from "../components/layout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function Mood() {
  const [mood, setMood] = useState(null);

  // Temporary data (later replace with Firebase data)
  const data = [
    { day: "Mon", mood: 3 },
    { day: "Tue", mood: 4 },
    { day: "Wed", mood: 2 },
    { day: "Thu", mood: 5 },
    { day: "Fri", mood: 4 },
    { day: "Sat", mood: 3 },
    { day: "Sun", mood: 5 }
  ];

  return (
    <Layout>
      {/* Mood Selection */}
      <div className="card" style={{ textAlign: "center" }}>
        <h2>How are you feeling today?</h2>

        <div style={{ fontSize: "35px", margin: "20px 0" }}>
          <span style={styles.emoji} onClick={() => setMood(5)}>😊</span>
          <span style={styles.emoji} onClick={() => setMood(3)}>😐</span>
          <span style={styles.emoji} onClick={() => setMood(1)}>😔</span>
        </div>

        <p>
          Selected Mood:{" "}
          {mood === 5 ? "Happy 😊" : mood === 3 ? "Neutral 😐" : mood === 1 ? "Sad 😔" : "None"}
        </p>
      </div>

      {/* Analytics */}
      <div className="card">
        <h2>📊 Mood Analytics</h2>
        <p>Track your emotional trends over time</p>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis domain={[1, 5]} />
            <Tooltip />
            <Line type="monotone" dataKey="mood" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Layout>
  );
}

const styles = {
  emoji: {
    cursor: "pointer",
    margin: "10px",
    transition: "0.2s"
  }
};