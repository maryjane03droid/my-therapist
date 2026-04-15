import { useEffect, useMemo, useState } from "react";
import { ref, push, set, onValue } from "firebase/database";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const moodOptions = [
  { label: "Happy", score: 5, emoji: "😊", desc: "Feeling positive and energetic" },
  { label: "Calm", score: 4, emoji: "😌", desc: "Relaxed and steady" },
  { label: "Neutral", score: 3, emoji: "😐", desc: "Balanced and okay" },
  { label: "Anxious", score: 2, emoji: "😟", desc: "Worried or uneasy" },
  { label: "Sad", score: 1, emoji: "😢", desc: "Feeling low or down" },
];

export default function Mood() {
  const { user } = useAuth();

  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  // FETCH MOODS
  useEffect(() => {
    if (!user) {
      setMoodHistory([]);
      return;
    }

    const moodsRef = ref(db, `users/${user.uid}/moods`);

    const unsubscribe = onValue(moodsRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setMoodHistory([]);
        return;
      }

      const moodsArray = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));

      moodsArray.sort((a, b) => b.createdAt - a.createdAt);
      setMoodHistory(moodsArray);
    });

    return () => unsubscribe();
  }, [user]);

  const latestMood = moodHistory[0];

  // INSIGHT
  const insight = useMemo(() => {
    if (!moodHistory.length) {
      return "Start by logging your mood today.";
    }

    const recent = moodHistory.slice(0, 7);
    const avg =
      recent.reduce((sum, item) => sum + Number(item.score || 0), 0) /
      recent.length;

    if (avg <= 2) {
      return "You’ve been feeling low recently. Try reaching out or taking time to rest.";
    }

    if (avg <= 3) {
      return "Your moods are mixed. Keep tracking and notice patterns.";
    }

    return "Your mood trend looks positive. Keep going.";
  }, [moodHistory]);

  // SAVE MOOD
  const handleSaveMood = async () => {
    if (!user) {
      setMessage("Login to save your mood.");
      return;
    }

    if (!selectedMood) {
      setMessage("Select a mood first.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const moodsRef = ref(db, `users/${user.uid}/moods`);
      const newMoodRef = push(moodsRef);

      await set(newMoodRef, {
        mood: selectedMood.label,
        score: selectedMood.score,
        emoji: selectedMood.emoji,
        note: note.trim(),
        createdAt: Date.now(),
      });

      setSelectedMood(null);
      setNote("");
      setMessage("Mood saved.");
    } catch (err) {
      setMessage("Error saving mood.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mood-screen">

      {/* HERO */}
      <div className="mood-hero">
        <h1>How are you feeling today?</h1>
        <p>Write your thoughts, then choose a mood.</p>
      </div>

      <div className="mood-layout">

        {/* LEFT SIDE */}
        <div className="mood-left">

          {/* NOTE FIRST */}
          <div className="mood-panel">
            <h2>Write a note</h2>

            <textarea
              className="mood-textarea"
              placeholder="Write how your day is going..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {/* MOOD SECOND */}
          <div className="mood-panel">
            <h2>Select your mood</h2>

            <div className="mood-grid">
              {moodOptions.map((mood) => (
                <button
                  key={mood.label}
                  className={`mood-card-option ${
                    selectedMood?.label === mood.label ? "selected-mood-card" : ""
                  }`}
                  onClick={() => setSelectedMood(mood)}
                >
                  <span className="mood-emoji">{mood.emoji}</span>
                  <div>
                    <h3>{mood.label}</h3>
                    <p>{mood.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* SAVE */}
          <div className="mood-panel">
            <button
              className="mood-save-btn"
              onClick={handleSaveMood}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Mood"}
            </button>

            {message && <p className="mood-message">{message}</p>}
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="mood-right">

          {/* LATEST */}
          <div className="mood-panel">
            <h2>Latest Mood</h2>

            {latestMood ? (
              <>
                <h3>
                  {latestMood.emoji} {latestMood.mood}
                </h3>
                <p>{latestMood.note || "No note"}</p>
              </>
            ) : (
              <p>No mood yet.</p>
            )}
          </div>

          {/* INSIGHT */}
          <div className="mood-panel">
            <h2>Insight</h2>
            <p>{insight}</p>
          </div>

        </div>

      </div>
    </section>
  );
}