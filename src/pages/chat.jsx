import { useState } from "react";
import Layout from "../components/layout";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;

    const newMessages = [
      ...messages,
      { text: input, sender: "user" },
      { text: "I'm here for you 💚", sender: "ai" }
    ];

    setMessages(newMessages);
    setInput("");
  };

  return (
    <Layout>
      <div className="card">
        <h2>Chat</h2>

        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.sender}:</b> {m.text}
          </p>
        ))}

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </Layout>
  );
}