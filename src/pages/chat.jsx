import { useEffect, useState } from "react";
import { ref, push, set, onValue } from "firebase/database";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { getAIResponse } from "../services/serviceAi";


export default function Chat() {
  const { user } = useAuth();

  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!user) {
      setChatHistory([]);
      return;
    }

    const chatsRef = ref(db, `users/${user.uid}/chats`);

    const unsubscribe = onValue(chatsRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setChatHistory([]);
        return;
      }

      const chatsArray = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));

      chatsArray.sort((a, b) => b.createdAt - a.createdAt);
      setChatHistory(chatsArray);
    });

    return () => unsubscribe();
  }, [user]);

  const handleSend = async () => {
    if (!user) {
      setNotice("Please log in to use AI support.");
      return;
    }

    if (!input.trim()) {
      setNotice("Please type a message first.");
      return;
    }

    const userText = input.trim();
    setInput("");
    setNotice("");
    setLoading(true);

    try {
      const tempUserMessage = {
        sender: "user",
        text: userText,
        createdAt: Date.now(),
      };

      const aiResult = await getAIResponse(userText, [...chatHistory, tempUserMessage]);

      const chatsRef = ref(db, `users/${user.uid}/chats`);
      const newChatRef = push(chatsRef);

      await set(newChatRef, {
        userMessage: userText,
        aiReply: aiResult.reply,
        analysis: aiResult.analysis,
        advice: aiResult.advice || [],
        createdAt: Date.now(),
      });
    } catch (error) {
      console.error(error);
      setNotice("Something went wrong while talking to the AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="chat-screen">
      <div className="chat-hero">
        <div className="chat-hero-left">
          <span className="chat-badge">AI Support Space</span>
          <h1>Talk through what you are feeling</h1>
          <p>
            This is a calm space where you can express yourself, receive supportive
            feedback, and save your reflections privately.
          </p>
        </div>

        <div className="chat-hero-art">
          <div className="chat-illustration-card">
            <div className="chat-bubble bubble-one">You are safe here</div>
            <div className="chat-bubble bubble-two">Let’s talk it through</div>
            <div className="chat-avatar">🤖</div>
          </div>
        </div>
      </div>

      <div className="chat-layout">
        <div className="chat-main-card">
          <div className="chat-header-row">
            <div className="chat-intro">
              <h2>Tell the AI what you are feeling today</h2>
              <p className="chat-intro-sub">
                You can be honest. Start with whatever feels heaviest on your mind right now.
              </p>

              <div className="chat-intro-tags">
                <span>Stress</span>
                <span>Anxiety</span>
                <span>Overthinking</span>
                <span>Feeling low</span>
              </div>
            </div>
          </div>

          <div className="chat-input-area chat-input-top">
            <textarea
              className="chat-textarea"
              placeholder="Tell me what you are feeling today..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
            />

            <div className="chat-actions">
              <button
                className="chat-send-btn"
                onClick={handleSend}
                disabled={loading}
              >
                {loading ? "Thinking..." : "Send Message"}
              </button>
            </div>

            {notice && <p className="chat-notice">{notice}</p>}
          </div>

          <div className="chat-history-section">
            <div className="chat-history-title">
              <h3>Saved Conversations</h3>
              <p>Your previous chats with AI support appear below.</p>
            </div>

            <div className="chat-messages">
              {chatHistory.length === 0 ? (
                <div className="chat-empty-state">
                  <h3>No conversation yet</h3>
                  <p>
                    Start by typing how you feel above. The AI will reply with support,
                    analysis, and practical advice.
                  </p>
                </div>
              ) : (
                chatHistory.map((item) => (
                  <div key={item.id} className="chat-block">
                    <div className="chat-message user-message">
                      <div className="chat-role">You</div>
                      <p>{item.userMessage}</p>
                    </div>

                    <div className="chat-message ai-message">
                      <div className="chat-role">AI Support</div>
                      <p>{item.aiReply}</p>

                      {item.analysis && (
                        <div className="chat-analysis">
                          <strong>Analysis:</strong>
                          <span>{item.analysis}</span>
                        </div>
                      )}

                      {item.advice?.length > 0 && (
                        <div className="chat-advice">
                          <strong>Advice:</strong>
                          <ul>
                            {item.advice.map((tip, index) => (
                              <li key={index}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="chat-side-column">
          <div className="chat-side-card">
            <h3>What this AI does</h3>
            <p>
              It listens to your message, reflects the emotional tone, and gives gentle,
              practical advice.
            </p>
          </div>

          <div className="chat-side-card">
            <h3>Helpful prompts</h3>
            <ul className="prompt-list">
              <li>I feel overwhelmed today</li>
              <li>I have too much work and I’m anxious</li>
              <li>I feel tired and unmotivated</li>
              <li>I need help calming down</li>
            </ul>
          </div>

          <div className="chat-side-card">
            <h3>Reminder</h3>
            <p>
              This AI offers support and reflection, but it is not a replacement for a
              trained mental health professional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}