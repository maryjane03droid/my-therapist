import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="home-screen">
      <div className="home-hero">
        <div className="home-hero-content">
          <span className="home-badge">Your personal wellness space</span>
          <h1>You do not have to carry everything alone.</h1>
          <p className="home-hero-text">
            My Therapist is a calm and supportive space where you can track your mood,
            write private reflections, and get gentle AI support whenever you need it.
          </p>

          <div className="home-hero-actions">
            <Link to="/mood" className="home-primary-btn">
              Start Mood Check-In
            </Link>
            <Link to="/chat" className="home-secondary-btn">
              Talk to AI Support
            </Link>
          </div>

          <div className="home-mini-trust">
            <div className="trust-pill">Private journaling</div>
            <div className="trust-pill">Daily mood tracking</div>
            <div className="trust-pill">Supportive AI guidance</div>
          </div>
        </div>

        <div className="home-hero-visual">
          <div className="hero-illustration-card">
            <div className="hero-blob hero-blob-one"></div>
            <div className="hero-blob hero-blob-two"></div>

            <div className="hero-face-card">
              <div className="hero-face-top">
                <span className="hero-circle small"></span>
                <span className="hero-circle large"></span>
              </div>

              <div className="hero-face-main">
                <div className="face-avatar">🙂</div>
                <div className="face-lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>

              <div className="hero-face-bottom">
                <div className="tiny-card soft-green">Breathe</div>
                <div className="tiny-card soft-yellow">Reflect</div>
                <div className="tiny-card soft-pink">Heal</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="home-quick-grid">
        <Link to="/mood" className="home-feature-card card-green">
          <div className="feature-icon">📊</div>
          <h3>Mood Tracker</h3>
          <p>
            Check in daily, log how you feel, and build a simple emotional pattern over time.
          </p>
        </Link>

        <Link to="/journal" className="home-feature-card card-peach">
          <div className="feature-icon">📓</div>
          <h3>Private Journal</h3>
          <p>
            Write your thoughts in a safe personal space and return to them whenever you need.
          </p>
        </Link>

        <Link to="/chat" className="home-feature-card card-blue">
          <div className="feature-icon">🤖</div>
          <h3>AI Support Chat</h3>
          <p>
            Talk through your feelings and receive calm, supportive responses at any time.
          </p>
        </Link>

        <Link to="/support-group" className="home-feature-card card-lilac">
          <div className="feature-icon">🤝</div>
          <h3>Support Group</h3>
          <p>
            Find community, shared encouragement, and a reminder that others understand too.
          </p>
        </Link>
      </div>

      <div className="home-middle-layout">
        <div className="home-affirmation-card">
          <div className="section-tag">Today’s Gentle Reminder</div>
          <h2>Small steps still count.</h2>
          <p>
            You do not need to fix everything today. A short note, one honest mood check-in,
            or one calm conversation can already be a meaningful step forward.
          </p>

          <div className="affirmation-actions">
            <Link to="/journal" className="soft-action-btn">
              Write what’s on your mind
            </Link>
            <Link to="/mood" className="soft-action-btn secondary-soft">
              Log today’s mood
            </Link>
          </div>
        </div>

        <div className="home-side-stack">
          <div className="home-side-card calm-card">
            <div className="side-card-icon">🌿</div>
            <div>
              <h3>Calm Design</h3>
              <p>
                Soft colors, simple navigation, and emotionally safe spacing designed to reduce stress.
              </p>
            </div>
          </div>

          <div className="home-side-card warm-card">
            <div className="side-card-icon">💡</div>
            <div>
              <h3>Helpful Insights</h3>
              <p>
                Your mood entries and reflections can help you notice emotional patterns more clearly.
              </p>
            </div>
          </div>

          <div className="home-side-card support-card">
            <div className="side-card-icon">💬</div>
            <div>
              <h3>Always Available</h3>
              <p>
                AI support is available whenever you need a quiet place to pause and reflect.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="home-bottom-section">
        <div className="home-bottom-card">
          <div className="bottom-card-header">
            <span className="bottom-icon">🧠</span>
            <h3>Why this space helps</h3>
          </div>
          <p>
            When people are struggling, they often need something that feels easy to start.
            My Therapist brings mood tracking, journaling, and supportive AI guidance into one
            calm experience so users can begin with whatever feels manageable in that moment.
          </p>
        </div>

        <div className="home-bottom-card">
          <div className="bottom-card-header">
            <span className="bottom-icon">✨</span>
            <h3>What you can do today</h3>
          </div>
          <p>
            Start with one action: log your mood, write a short note, or open the support chat.
            The goal is not perfection. The goal is to help you feel a little more supported than before.
          </p>
        </div>
      </div>
    </section>
  );
}