import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="card" style={{ textAlign: "center" }}>
        <h1>🌿 Mental Support App</h1>

        <button onClick={() => navigate("/chat")}>Chat</button>
        <button onClick={() => navigate("/mood")}>Mood</button>
        <button onClick={() => navigate("/journal")}>Journal</button>
      </div>
    </Layout>
  );
}