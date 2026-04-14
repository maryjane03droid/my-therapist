import { useState } from "react";
import Layout from "../components/layout";

export default function Mood() {
  const [mood, setMood] = useState("");

  return (
    <Layout>
      <div className="card">
        <h2>How are you feeling?</h2>

        <button onClick={() => setMood("Happy 😊")}>😊</button>
        <button onClick={() => setMood("Neutral 😐")}>😐</button>
        <button onClick={() => setMood("Sad 😔")}>😔</button>

        <p>{mood}</p>
      </div>
    </Layout>
  );
}