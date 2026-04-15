const getAIResponse = (input) => {
  const text = input.toLowerCase();

  if (text.includes("sad") || text.includes("down")) {
    return "I'm really sorry you're feeling this way 💚 You're not alone.";
  }

  if (text.includes("happy") || text.includes("good")) {
    return "That's amazing 😊 Keep embracing the positive energy!";
  }

  if (text.includes("stress") || text.includes("tired")) {
    return "It sounds overwhelming. Try taking a short break or deep breathing 🌿";
  }

  return "I'm here for you 💚 Tell me more.";
};