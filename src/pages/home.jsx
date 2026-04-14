
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🌿 Mental Support App</h1>
      <p>Your safe space for support and growth</p>

      <button onClick={() => navigate("/chat")}>Start Chat</button>
      <button onClick={() => navigate("/mood")}>Check Mood</button>
      <button onClick={() => navigate("/journal")}>Journal</button>
    </div>
  );
}