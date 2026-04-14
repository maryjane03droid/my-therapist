import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;

    setMessages([...messages, { text: input, sender: "user" }]);

    // TEMP AI response
    setMessages(prev => [
      ...prev,
      { text: input, sender: "user" },
      { text: "I'm here for you 💚", sender: "ai" }
    ]);

    setInput("");
  };

  return (
    <div>
      <h2>AI Support Chat</h2>

      <div>
        {messages.map((msg, i) => (
          <p key={i}>
            <b>{msg.sender}:</b> {msg.text}
          </p>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Talk to me..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}