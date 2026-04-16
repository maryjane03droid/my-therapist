import { useEffect, useMemo, useState } from "react";
import { ref, push, set, onValue, remove, update } from "firebase/database";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContexts";
import { FaPen } from "react-icons/fa";
const moodThemes = {
  Happy: {
    emoji: "😊",
    message:
      "You seem to be in a lighter space today. This is a good time to reflect on what is going well.",
  },
  Calm: {
    emoji: "😌",
    message:
      "You seem emotionally steady today. Try writing about what is helping you feel grounded.",
  },
  Neutral: {
    emoji: "😐",
    message:
      "Today may feel balanced or ordinary. Even small reflections can help you understand yourself better.",
  },
  Anxious: {
    emoji: "😟",
    message:
      "You may be carrying worry or tension today. Writing things down can help slow racing thoughts.",
  },
  Sad: {
    emoji: "😢",
    message:
      "Today may feel emotionally heavy. Be gentle with yourself and write freely without pressure.",
  },
};

export default function Journal() {
  const { user } = useAuth();

  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);
  const [latestMood, setLatestMood] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!user) {
      setEntries([]);
      setLatestMood(null);
      return;
    }

    const journalRef = ref(db, `users/${user.uid}/journals`);
    const moodRef = ref(db, `users/${user.uid}/moods`);

    const unsubscribeJournal = onValue(journalRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setEntries([]);
        return;
      }

      const journalArray = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));

      journalArray.sort((a, b) => b.createdAt - a.createdAt);
      setEntries(journalArray);
    });

    const unsubscribeMood = onValue(moodRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setLatestMood(null);
        return;
      }

      const moodArray = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));

      moodArray.sort((a, b) => b.createdAt - a.createdAt);
      setLatestMood(moodArray[0]);
    });

    return () => {
      unsubscribeJournal();
      unsubscribeMood();
    };
  }, [user]);

  const journalSummary = useMemo(() => {
    if (!entries.length) {
      return {
        total: 0,
        latestDate: "No entries yet",
      };
    }

    return {
      total: entries.length,
      latestDate: new Date(entries[0].createdAt).toLocaleDateString(),
    };
  }, [entries]);

  const moodPrompt = useMemo(() => {
    if (!latestMood?.mood) {
      return {
        emoji: "📝",
        message:
          "You haven’t logged a mood today yet, but you can still write what is on your mind.",
      };
    }

    return moodThemes[latestMood.mood] || moodThemes.Neutral;
  }, [latestMood]);

  const handleSaveJournal = async () => {
    if (!user) {
      setNotice("Please log in to save your journal entry.");
      return;
    }

    if (!entry.trim()) {
      setNotice("Please write something before saving.");
      return;
    }

    try {
      setSaving(true);
      setNotice("");

      if (editingId) {
        const currentEntryRef = ref(
          db,
          `users/${user.uid}/journals/${editingId}`,
        );

        await update(currentEntryRef, {
          text: entry.trim(),
        });

        setNotice("Journal entry updated successfully.");
        setEditingId(null);
      } else {
        const journalRef = ref(db, `users/${user.uid}/journals`);
        const newEntryRef = push(journalRef);

        await set(newEntryRef, {
          text: entry.trim(),
          moodAtTime: latestMood?.mood || "Not logged",
          createdAt: Date.now(),
        });

        setNotice("Journal entry saved successfully.");
      }

      setEntry("");
    } catch (error) {
      console.error(error);
      setNotice("Something went wrong while saving your entry.");
    } finally {
      setSaving(false);
    }
  };

  const handleEditJournal = (item) => {
    setEntry(item.text || "");
    setEditingId(item.id);
    setNotice("Editing journal entry.");
  };

  const handleDeleteJournal = async (id) => {
    if (!user) return;

    try {
      setDeletingId(id);
      setNotice("");

      const currentEntryRef = ref(db, `users/${user.uid}/journals/${id}`);
      await remove(currentEntryRef);

      if (editingId === id) {
        setEditingId(null);
        setEntry("");
      }

      setNotice("Journal entry deleted successfully.");
    } catch (error) {
      console.error(error);
      setNotice("Something went wrong while deleting your entry.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEntry("");
    setNotice("Edit cancelled.");
  };

  return (
    <section className="journal-screen">
      <div className="journal-hero">
        <div className="journal-hero-left">
          <span className="journal-badge">Private Reflection Space</span>
          <h1>Write what is on your mind today</h1>
          <p>
            Use this space to reflect, release thoughts, and keep a personal
            record of how you are feeling over time.
          </p>
        </div>

        <div className="journal-hero-visual">
          <FaPen className="journal-hero-icon" />
        </div>
      </div>

      <div className="journal-top-row">
        <div className="journal-mood-card">
          <div className="journal-mood-top">
            <div className="journal-mood-icon">
              {latestMood?.emoji || moodPrompt.emoji}
            </div>
            <div>
              <h3>Your mood for today</h3>
              <p className="journal-mood-status">
                {latestMood ? `${latestMood.mood}` : "Not logged yet"}
              </p>
            </div>
          </div>

          <p className="journal-mood-message">{moodPrompt.message}</p>
        </div>

        <div className="journal-summary-card">
          <div className="journal-summary-item">
            <span>Total Entries</span>
            <strong>{journalSummary.total}</strong>
          </div>
          <div className="journal-summary-item">
            <span>Last Written</span>
            <strong>{journalSummary.latestDate}</strong>
          </div>
        </div>
      </div>

      <div className="journal-layout">
        <div className="journal-main-card">
          <div className="section-heading">
            <h2>
              {editingId ? "Edit journal entry" : "Today’s journal entry"}
            </h2>
            <p>
              Be as honest as you need to be. This is your private space to
              reflect freely.
            </p>
          </div>

          <textarea
            className="journal-textarea"
            placeholder="Start writing here... What happened today? What are you feeling? What is weighing on you or helping you?"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            rows={10}
          />

          <div className="journal-action-row">
            <button
              className="journal-save-btn"
              onClick={handleSaveJournal}
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Journal Entry"
                  : "Save Journal Entry"}
            </button>

            {editingId && (
              <button type="button" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>

          {notice && <p className="journal-notice">{notice}</p>}
        </div>

        <div className="journal-side-column">
          <div className="journal-side-card">
            <h3>Helpful prompts</h3>
            <ul className="journal-prompt-list">
              <li>What felt strongest for me today?</li>
              <li>What triggered this mood?</li>
              <li>What do I need right now?</li>
              <li>What helped, even a little?</li>
            </ul>
          </div>

          <div className="journal-side-card">
            <h3>Writing reminder</h3>
            <p>
              You do not need perfect words. A few honest sentences are enough.
            </p>
          </div>
        </div>
      </div>

      <div className="journal-history-card">
        <div className="section-heading">
          <h2>Previous entries</h2>
          <p>Your past reflections are saved here.</p>
        </div>

        {entries.length === 0 ? (
          <div className="journal-empty-state">
            <h3>No journal entries yet</h3>
            <p>
              Your saved reflections will appear here after you write your first
              entry.
            </p>
          </div>
        ) : (
          <div className="journal-history-list">
            {entries.map((item) => (
              <div key={item.id} className="journal-entry-card">
                <div className="journal-entry-top">
                  <div className="journal-entry-meta">
                    <span className="journal-entry-date">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                    <span className="journal-entry-mood">
                      Mood: {item.moodAtTime}
                    </span>
                  </div>
                </div>

                <p className="journal-entry-text">{item.text}</p>

                <div>
                  <button
                    type="button"
                    onClick={() => handleEditJournal(item)}
                    disabled={saving}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteJournal(item.id)}
                    disabled={deletingId === item.id}
                  >
                    {deletingId === item.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
