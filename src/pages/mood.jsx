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

const moodMap = {
  Happy: { score: 5, emoji: "😊" },
  Calm: { score: 4, emoji: "😌" },
  Neutral: { score: 3, emoji: "😐" },
  Anxious: { score: 2, emoji: "😟" },
  Sad: { score: 1, emoji: "😢" },
};

export default function Mood() {
  const { user } = useAuth();

  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

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

  const insight = useMemo(() => {
    if (!moodHistory.length) {
      return "Start with a quick check-in today. Your emotional pattern will appear here as you keep logging your mood.";
    }

    const recent = moodHistory.slice(0, 7);
    const avg =
      recent.reduce((sum, item) => sum + Number(item.score || 0), 0) / recent.length;

    if (avg <= 2) {
      return "Your recent moods have been low. Take things gently today and consider reaching out to someone you trust.";
    }

    if (avg <= 3) {
      return "Your mood has been mixed lately. Keep tracking it and notice what makes your day lighter or heavier.";
    }

    return "Your recent mood trend looks positive. Keep doing the little things that support your wellbeing.";
  }, [moodHistory]);

  const stats = useMemo(() => {
    if (!moodHistory.length) {
      return {
        total: 0,
        average: "-",
        commonMood: "No data",
      };
    }

    const recent = moodHistory.slice(0, 7);
    const average =
      recent.reduce((sum, item) => sum + Number(item.score || 0), 0) / recent.length;

    const counts = {};
    moodHistory.forEach((item) => {
      counts[item.mood] = (counts[item.mood] || 0) + 1;
    });

    const commonMood = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );

    return {
      total: moodHistory.length,
      average: average.toFixed(1),
      commonMood,
    };
  }, [moodHistory]);

  const weeklyChartData = useMemo(() => {
    const source = moodHistory.slice(0, 7).reverse();

    return source.map((item, index) => ({
      id: item.id || index,
      label: new Date(item.createdAt).toLocaleDateString(undefined, {
        weekday: "short",
      }),
      score: Number(item.score || 0),
      emoji: item.emoji || moodMap[item.mood]?.emoji || "🙂",
      mood: item.mood,
    }));
  }, [moodHistory]);

  const handleSaveMood = async () => {
    if (!user) {
      setMessage("Please log in to save your mood.");
      return;
    }

    if (!selectedMood) {
      setMessage("Please select a mood first.");
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
      setMessage("Mood saved successfully.");
    } catch (err) {
      setMessage("There was a problem saving your mood.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mood-screen">
      <div className="mood-hero">
        <div className="mood-hero-text-block">
          <span className="mood-badge">Daily Mood Check-In</span>
          <h1>Check in with yourself today</h1>
          <p>
            Write a short note, choose your mood, and see a simple emotional trend
            over time.
          </p>

          <div className="mood-mini-stats">
            <div className="mini-stat">
              <span>Total Logs</span>
              <strong>{stats.total}</strong>
            </div>
            <div className="mini-stat">
              <span>Weekly Avg</span>
              <strong>{stats.average}</strong>
            </div>
            <div className="mini-stat">
              <span>Most Common</span>
              <strong>{stats.commonMood}</strong>
            </div>
          </div>
        </div>

        <div className="mood-hero-art">
          <svg viewBox="0 0 320 220" className="mood-svg" aria-hidden="true">
            <circle cx="230" cy="55" r="28" fill="#c2e2cf" />
            <circle cx="85" cy="70" r="42" fill="#d9efe2" />
            <rect x="55" y="85" width="210" height="105" rx="24" fill="#ffffff" stroke="#cfe2d7" />
            <circle cx="120" cy="125" r="20" fill="#eef7f1" />
            <circle cx="200" cy="125" r="20" fill="#eef7f1" />
            <path d="M105 155 C125 175, 195 175, 215 155" fill="none" stroke="#17663f" strokeWidth="8" strokeLinecap="round" />
            <circle cx="120" cy="125" r="7" fill="#17663f" />
            <circle cx="200" cy="125" r="7" fill="#17663f" />
            <rect x="95" y="35" width="128" height="22" rx="11" fill="#17663f" opacity="0.16" />
          </svg>
        </div>
      </div>

      <div className="mood-layout">
        <div className="mood-left">
          <div className="mood-panel">
            <div className="section-heading">
              <h2>Select your mood</h2>
              <p>Pick the one that best matches how you feel right now.</p>
            </div>

            <div className="mood-grid">
              {moodOptions.map((mood) => (
                <button
                  key={mood.label}
                  type="button"
                  className={`mood-card-option ${
                    selectedMood?.label === mood.label ? "selected-mood-card" : ""
                  }`}
                  onClick={() => setSelectedMood(mood)}
                >
                  <span className="mood-emoji">{mood.emoji}</span>
                  <div className="mood-option-text">
                    <h3>{mood.label}</h3>
                    <p>{mood.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mood-panel featured-panel">
            <div className="section-heading">
              <h2>Write a note</h2>
              <p>Start with a short reflection about your day, thoughts, or feelings.</p>
            </div>

            <textarea
              className="mood-textarea"
              placeholder="Example: I feel a bit stressed today, but I’m trying to stay calm and finish my work..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={5}
            />
          </div>

          <div className="mood-panel save-panel">
            <div className="save-panel-content">
              <div>
                <h3>Save today’s check-in</h3>
                <p>Your note and mood will be added to your personal mood history.</p>
              </div>

              <button
                className="mood-save-btn"
                onClick={handleSaveMood}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Mood"}
              </button>
            </div>

            {message && <p className="mood-message">{message}</p>}
          </div>

          <div className="mood-panel">
            <div className="section-heading">
              <h2>Weekly Mood Chart</h2>
              <p>A simple view of your recent emotional pattern.</p>
            </div>

            {weeklyChartData.length ? (
              <div className="simple-chart">
                {weeklyChartData.map((item) => (
                  <div key={item.id} className="chart-item">
                    <div className="chart-bar-wrap">
                      <div
                        className="chart-bar"
                        style={{ height: `${item.score * 22}%` }}
                        title={`${item.label}: ${item.mood}`}
                      >
                        <span className="chart-emoji">{item.emoji}</span>
                      </div>
                    </div>
                    <span className="chart-label">{item.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state-card">
                Save a few moods to see your weekly chart.
              </div>
            )}
          </div>
        </div>

        <div className="mood-right">
          <div className="mood-panel right-highlight-card">
            <div className="section-heading">
              <h2>Latest Mood</h2>
              <p>Your most recent emotional check-in.</p>
            </div>

            {latestMood ? (
              <div className="latest-mood-card">
                <div className="latest-mood-top">
                  <span className="latest-mood-emoji">{latestMood.emoji}</span>
                  <div>
                    <h3>{latestMood.mood}</h3>
                    <span className="latest-mood-date">
                      {new Date(latestMood.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                <p className="latest-mood-note">
                  {latestMood.note || "No note was added for this entry."}
                </p>
              </div>
            ) : (
              <div className="empty-state-card">
                No mood has been logged yet.
              </div>
            )}
          </div>

          <div className="mood-panel right-highlight-card">
            <div className="section-heading">
              <h2>Insight</h2>
              <p>A short reflection based on your recent entries.</p>
            </div>

            <div className="insight-card">
              <p>{insight}</p>
            </div>
          </div>

          <div className="mood-panel">
            <div className="section-heading">
              <h2>Recent History</h2>
              <p>Your latest mood logs.</p>
            </div>

            {moodHistory.length > 0 ? (
              <div className="history-list">
                {moodHistory.slice(0, 6).map((entry) => (
                  <div key={entry.id} className="history-card">
                    <div className="history-card-top">
                      <div className="history-mood-badge">
                        <span>{entry.emoji}</span>
                        <strong>{entry.mood}</strong>
                      </div>
                      <span className="history-time">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="history-card-note">
                      {entry.note || "No note added."}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state-card">
                Your recent mood history will appear here once you start saving entries.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}