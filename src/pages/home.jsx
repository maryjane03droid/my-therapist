import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-text">
          <p className="hero-tag">24/7 AI mental wellness support</p>
          <h1>Your safe space to talk, reflect, and heal</h1>
          <p className="hero-description">
            MY Therapist is a supportive platform that offers AI-powered counseling,
            private journaling, mood tracking, and motivational wellness content in
            one calming digital space.
          </p>

          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary">
              Start Your Journey
            </Link>
            <Link to="/counseling" className="btn btn-outline">
              Try Counseling
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <h3>24/7</h3>
              <p>Support access</p>
            </div>
            <div className="stat-card">
              <h3>Private</h3>
              <p>Journaling space</p>
            </div>
            <div className="stat-card">
              <h3>Daily</h3>
              <p>Mood check-ins</p>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-card main-card">
            <h3>How are you feeling today?</h3>
            <p className="mood-line">😊 Calm</p>
            <p className="mood-line">🙂 Hopeful</p>
            <p className="mood-line">😔 Overwhelmed</p>
            <button className="mini-btn">Log Mood</button>
          </div>

          <div className="visual-card floating-card top-card">
            <p>AI Chat Support</p>
          </div>

          <div className="visual-card floating-card bottom-card">
            <p>Daily Wellness Tools</p>
          </div>
        </div>
      </section>

      <section className="trust-section">
        <div className="section-heading">
          <p className="section-tag">Why this platform matters</p>
          <h2>You do not have to struggle alone</h2>
          <p>
            Many people need a place where they can express themselves freely,
            track their emotional wellbeing, and receive support without fear of
            judgment. MY Therapist is designed to make that first step feel easier.
          </p>
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <p className="section-tag">Core features</p>
          <h2>Everything you need in one place</h2>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>AI Counseling</h3>
            <p>
              Talk to an AI support assistant anytime for guided conversations and
              emotional support.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📓</div>
            <h3>Private Journaling</h3>
            <p>
              Write down your thoughts, feelings, and experiences in a safe personal
              journal.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Mood Tracking</h3>
            <p>
              Monitor emotional patterns over time and understand how you are really
              doing each day.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>Wellness Content</h3>
            <p>
              Access motivational content, self-help tools, and supportive resources
              tailored to your journey.
            </p>
          </div>
        </div>
      </section>

      <section className="steps-section">
        <div className="section-heading">
          <p className="section-tag">Simple process</p>
          <h2>How it works</h2>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <span>01</span>
            <h3>Create an account</h3>
            <p>Sign up securely and access your personal wellness dashboard.</p>
          </div>

          <div className="step-card">
            <span>02</span>
            <h3>Check in daily</h3>
            <p>Track your mood and reflect on how you feel each day.</p>
          </div>

          <div className="step-card">
            <span>03</span>
            <h3>Talk and reflect</h3>
            <p>Use AI counseling and journaling to process your thoughts.</p>
          </div>

          <div className="step-card">
            <span>04</span>
            <h3>Grow over time</h3>
            <p>Review progress and build healthier emotional habits.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-box">
          <h2>Begin your healing journey today</h2>
          <p>
            Start with one conversation, one journal entry, or one mood check-in.
            Small steps matter.
          </p>
          <Link to="/signup" className="btn btn-primary">
            Get Started Now
          </Link>
        </div>
      </section>
    </main>
  );
}