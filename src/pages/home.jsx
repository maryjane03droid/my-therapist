import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div style={styles.container}>
        
        {/* Header */}
        <h1 style={styles.title}>🌿 Mental Support</h1>
        <p style={styles.subtitle}>
          Your safe space for healing, growth, and reflection
        </p>

        {/* Cards Section */}
        <div style={styles.grid}>
          
          <div style={styles.card} onClick={() => navigate("/chat")}>
            💬
            <h3>AI Support Chat</h3>
            <p>Talk and feel supported anytime</p>
          </div>

          <div style={styles.card} onClick={() => navigate("/mood")}>
            😊
            <h3>Mood Tracker</h3>
            <p>Check in with your emotions</p>
          </div>

          <div style={styles.card} onClick={() => navigate("/journal")}>
            📓
            <h3>Journal</h3>
            <p>Write your private thoughts</p>
          </div>

          <div style={styles.card} onClick={() => navigate("/groups")}>
            👥
            <h3>Support Groups</h3>
            <p>Connect with others safely</p>
          </div>

        </div>

        {/* Footer CTA */}
        <div style={styles.footer}>
          <button onClick={() => navigate("/chat")}>
            Start Your Journey 💚
          </button>
        </div>

      </div>
    </Layout>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px"
  },

  title: {
    fontSize: "36px",
    marginBottom: "10px",
    color: "#1b4332"
  },

  subtitle: {
    color: "#40916c",
    marginBottom: "30px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    cursor: "pointer",
    transition: "0.2s",
  },

  footer: {
    marginTop: "40px"
  }
};