export async function getAIResponse(userMessage, recentMessages = []) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const recentContext = recentMessages
    .slice(-4)
    .map((msg) => `${msg.sender === "user" ? "User" : "AI"}: ${msg.text}`)
    .join("\n");

  const prompt = `
You are a calm, supportive mental wellness assistant inside an app called My Therapist.

Your job:
- respond with empathy
- help the user reflect on their feelings
- give practical, gentle advice
- suggest healthy next steps
- do NOT diagnose mental illness
- do NOT shame the user
- if the message sounds severe or unsafe, advise the user to seek immediate help from a trusted person or local emergency/professional support

Return your response in this exact JSON format:
{
  "reply": "supportive response here",
  "analysis": "brief emotional analysis here",
  "advice": ["tip 1", "tip 2", "tip 3"]
}

Conversation context:
${recentContext}

Current user message:
${userMessage}
`;

  if (!apiKey) {
    return fallbackAI(userMessage);
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await res.json();
    const raw =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return {
      reply: parsed.reply || "I'm here with you.",
      analysis: parsed.analysis || "You seem to be dealing with a lot emotionally.",
      advice: Array.isArray(parsed.advice) ? parsed.advice : [],
    };
  } catch (error) {
    console.error("Gemini error:", error);
    return fallbackAI(userMessage);
  }
}

function fallbackAI(message) {
  const text = message.toLowerCase();

  if (text.includes("stress") || text.includes("overwhelmed")) {
    return {
      reply:
        "I’m sorry things feel heavy right now. It sounds like you may be carrying a lot at once. Try slowing down, focusing on one task at a time, and giving yourself permission to pause.",
      analysis:
        "Your message suggests stress and emotional overload.",
      advice: [
        "Break one big task into smaller steps",
        "Take a 5-minute breathing break",
        "Talk to someone you trust today",
      ],
    };
  }

  if (text.includes("sad") || text.includes("down") || text.includes("tired")) {
    return {
      reply:
        "That sounds really hard. Feeling low can make everything feel heavier than usual. You do not have to solve everything at once today.",
      analysis:
        "Your message suggests low mood and emotional fatigue.",
      advice: [
        "Rest for a while without guilt",
        "Write down what is weighing on you",
        "Reach out to one supportive person",
      ],
    };
  }

  if (text.includes("anxious") || text.includes("worried") || text.includes("fear")) {
    return {
      reply:
        "It sounds like anxiety is taking up a lot of space for you right now. Try grounding yourself in the present moment and focusing on what is within your control.",
      analysis:
        "Your message suggests worry, tension, or anxiety.",
      advice: [
        "Take 5 slow breaths",
        "Name 3 things you can see around you",
        "Write down one thing you can control right now",
      ],
    };
  }

  return {
    reply:
      "Thank you for sharing that. I’m here to help you reflect on it. You can tell me more about how your day has been or what has been weighing on your mind.",
    analysis:
      "You may be looking for emotional support and reflection.",
    advice: [
      "Describe what happened today",
      "Notice what emotion feels strongest right now",
      "Take one small step to care for yourself today",
    ],
  };
}