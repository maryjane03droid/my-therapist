import { useEffect, useMemo, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [moods, setMoods] = useState([]);
  const [journals, setJournals] = useState([]);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setMoods([]);
      setJournals([]);
      setChats([]);
      return;
    }

    const profileRef = ref(db, `users/${user.uid}/profile`);
    const moodRef = ref(db, `users/${user.uid}/moods`);
    const journalRef = ref(db, `users/${user.uid}/journals`);
    const chatRef = ref(db, `users/${user.uid}/chats`);

    const unsubProfile = onValue(profileRef, (snapshot) => {
      setProfile(snapshot.val() || null);
    });

    const unsubMood = onValue(moodRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setMoods([]);
        return;
      }

      const moodArray = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));

      moodArray.sort((a, b) => b.createdAt - a.createdAt);
      setMoods(moodArray);
    });

    const unsubJournal = onValue(journalRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setJournals([]);
        return;
      }

      const journalArray = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));

      journalArray.sort((a, b) => b.createdAt - a.createdAt);
      setJournals(journalArray);
    });

    const unsubChat = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setChats([]);
        return;
      }

      const chatArray = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));

      chatArray.sort((a, b) => b.createdAt - a.createdAt);
      setChats(chatArray);
    });

    return () => {
      unsubProfile();
      unsubMood();
      unsubJournal();
      unsubChat();
    };
  }, [user]);

  const latestMood = moods[0];
  const latestJournal = journals[0];
  const latestChat = chats[0];

  const stats = useMemo(() => {
    if (!moods.length) {
      return {
        moodAverage: "-",
        commonMood: "No data",
      };
    }

    const recent = moods.slice(0, 7);
    const average =
      recent.reduce((sum, item) => sum + Number(item.score || 0), 0) / recent.length;

    const counts = {};
    moods.forEach((item) => {
      counts[item.mood] = (counts[item.mood] || 0) + 1;
    });

    const commonMood = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );

    return {
      moodAverage: average.toFixed(1),
      commonMood,
    };
  }, [moods]);

  const wellbeingSummary = useMemo(() => {
    if (!moods.length && !journals.length && !chats.length) {
      return "You are just getting started. Begin with a mood check-in or a journal entry to build your personal wellness space.";
    }

    if (moods.length && Number(stats.moodAverage) <= 2.3) {
      return "Your recent mood logs suggest you may be going through a difficult stretch. Try to be gentle with yourself and keep using the support tools available here.";
    }

    if (journals.length >= 3 && chats.length >= 2) {
      return "You have been actively reflecting and seeking support. That consistency can be a strong sign of self-awareness and emotional care.";
    }

    if (moods.length && Number(stats.moodAverage) >= 3.8) {
      return "Your recent mood pattern looks relatively steady. Keep up the habits that are helping you feel more balanced.";
    }

    return "Your profile is building a clearer picture of your emotional wellbeing. Keep checking in regularly to notice patterns over time.";
  }, [moods, journals, chats, stats.moodAverage]);

  return (
    <section className="profile-screen">
      <div className="profile-hero">
        <div className="profile-hero-left">
          <span className="profile-badge">Personal Wellness Dashboard</span>
          <h1>Welcome back{profile?.name ? `, ${profile.name}` : ""}</h1>
          <p>
            This is your personal summary space. Review your mood trends, journal
            activity, and AI support history all in one place.
          </p>

          <div className="profile-hero-actions">
            <Link to="/mood" className="profile-primary-btn">
              Update Mood
            </Link>
            <Link to="/journal" className="profile-secondary-btn">
              Write Journal
            </Link>
          </div>
        </div>

        <div className="profile-hero-card">
          <div className="profile-avatar">
            {profile?.name
              ? profile.name.charAt(0).toUpperCase()
              : user?.email?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="profile-user-info">
            <h3>{profile?.name || "User"}</h3>
            <p>{profile?.email || user?.email}</p>
            <span className="profile-user-tag">My Therapist Member</span>
          </div>
        </div>
      </div>

      <div className="profile-stats-grid">
        <div className="profile-stat-card green-stat">
          <span className="stat-title">Mood Logs</span>
          <strong>{moods.length}</strong>
        </div>

        <div className="profile-stat-card peach-stat">
          <span className="stat-title">Journal Entries</span>
          <strong>{journals.length}</strong>
        </div>

        <div className="profile-stat-card blue-stat">
          <span className="stat-title">AI Conversations</span>
          <strong>{chats.length}</strong>
        </div>

        <div className="profile-stat-card lilac-stat">
          <span className="stat-title">Weekly Mood Avg</span>
          <strong>{stats.moodAverage}</strong>
        </div>
      </div>

      <div className="profile-layout">
        <div className="profile-main-column">
          <div className="profile-section-card summary-card-profile">
            <div className="section-heading">
              <h2>Wellbeing Summary</h2>
              <p>Your overall emotional snapshot based on recent app activity.</p>
            </div>

            <p className="wellbeing-summary-text">{wellbeingSummary}</p>
          </div>

          <div className="profile-section-card">
            <div className="section-heading">
              <h2>Latest Mood</h2>
              <p>Your most recent emotional check-in.</p>
            </div>

            {latestMood ? (
              <div className="profile-highlight-card">
                <div className="profile-highlight-top">
                  <div className="highlight-emoji">{latestMood.emoji || "🙂"}</div>
                  <div>
                    <h3>{latestMood.mood}</h3>
                    <span>{new Date(latestMood.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <p>{latestMood.note || "No note added for this mood entry."}</p>
              </div>
            ) : (
              <div className="profile-empty-card">
                No mood entry yet. Start by logging your mood today.
              </div>
            )}
          </div>

          <div className="profile-section-card">
            <div className="section-heading">
              <h2>Latest Journal Entry</h2>
              <p>Your most recent personal reflection.</p>
            </div>

            {latestJournal ? (
              <div className="profile-highlight-card">
                <div className="profile-highlight-top">
                  <div className="highlight-icon">📓</div>
                  <div>
                    <h3>Journal Reflection</h3>
                    <span>{new Date(latestJournal.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <p>{latestJournal.text}</p>
              </div>
            ) : (
              <div className="profile-empty-card">
                No journal entry yet. Write a short reflection to begin your journaling history.
              </div>
            )}
          </div>
        </div>

        <div className="profile-side-column">
          <div className="profile-section-card">
            <div className="section-heading">
              <h2>Activity Insights</h2>
              <p>Simple patterns from your recent activity.</p>
            </div>

            <div className="profile-insight-list">
              <div className="profile-insight-item">
                <span>Most Common Mood</span>
                <strong>{stats.commonMood}</strong>
              </div>

              <div className="profile-insight-item">
                <span>Last Mood Update</span>
                <strong>
                  {latestMood
                    ? new Date(latestMood.createdAt).toLocaleDateString()
                    : "No data"}
                </strong>
              </div>

              <div className="profile-insight-item">
                <span>Last Journal Entry</span>
                <strong>
                  {latestJournal
                    ? new Date(latestJournal.createdAt).toLocaleDateString()
                    : "No data"}
                </strong>
              </div>

              <div className="profile-insight-item">
                <span>Last AI Chat</span>
                <strong>
                  {latestChat
                    ? new Date(latestChat.createdAt).toLocaleDateString()
                    : "No data"}
                </strong>
              </div>
            </div>
          </div>

          <div className="profile-section-card">
            <div className="section-heading">
              <h2>Latest AI Support</h2>
              <p>Your most recent AI conversation response.</p>
            </div>

            {latestChat ? (
              <div className="profile-highlight-card">
                <div className="profile-highlight-top">
                  <div className="highlight-icon">🤖</div>
                  <div>
                    <h3>AI Support Reply</h3>
                    <span>{new Date(latestChat.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <p>{latestChat.aiReply}</p>
              </div>
            ) : (
              <div className="profile-empty-card">
                No AI support conversation yet. Talk to the AI when you want guidance or reflection.
              </div>
            )}
          </div>

          <div className="profile-section-card quick-links-card">
            <div className="section-heading">
              <h2>Quick Actions</h2>
              <p>Go directly to the support tools you need.</p>
            </div>

            <div className="profile-quick-links">
              <Link to="/mood" className="quick-link-btn">
                Mood Tracker
              </Link>
              <Link to="/journal" className="quick-link-btn">
                Journal
              </Link>
              <Link to="/chat" className="quick-link-btn">
                AI Chat
              </Link>
              <Link to="/support-group" className="quick-link-btn">
                Support Help
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}