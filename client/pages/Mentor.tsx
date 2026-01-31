import { useState } from "react";
import Layout from "@/components/Layout";

interface Message {
  id: number;
  type: "user" | "mentor";
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "Explain superposition in simple terms",
  "Why is the Bloch sphere important?",
  "What's the difference between H and X gates?",
  "How does quantum entanglement work?",
];

const mentorResponses: Record<string, string> = {
  "Explain superposition in simple terms":
    "Superposition means a quantum bit (qubit) can exist in multiple states at the same time, unlike classical bits that are either 0 or 1. Imagine a coin spinning in the air - it's both heads and tails until it lands. Similarly, a qubit is in a combination of |0⟩ and |1⟩ states simultaneously. When you measure it, the superposition 'collapses' into one of the two states. This is what makes quantum computers powerful!",
  "Why is the Bloch sphere important?":
    "The Bloch sphere is a visual representation of a single qubit's state in 3D space. Every point on the sphere represents a valid quantum state. The north pole represents |0⟩, the south pole represents |1⟩, and all other points represent superpositions. It helps us visualize quantum operations - when we apply a quantum gate, we're essentially rotating the state vector on this sphere. This makes it easier to understand how quantum gates work.",
  "What's the difference between H and X gates?":
    "Both gates transform qubit states, but in different ways:\n\nHadamard (H) gate: Creates equal superposition. If you start with |0⟩, it creates a state that has 50% chance of measuring |0⟩ or |1⟩. It's like spinning the state vector to be pointing 'outward' from the sphere.\n\nPauli-X gate: Flips the state. |0⟩ becomes |1⟩ and |1⟩ becomes |0⟩. It's like a classical NOT gate. It rotates the state vector 180° around the X-axis.",
  "How does quantum entanglement work?":
    "Entanglement occurs when two or more qubits are created in such a way that their quantum states are interdependent. Measuring one qubit instantly determines the state of the other, no matter the distance between them. For example, Bell states create perfectly correlated qubits where if one is |0⟩, the other must be in a specific state. This correlation doesn't allow faster-than-light communication, but it's a fundamental resource for quantum algorithms.",
};

export default function Mentor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      type: "mentor",
      content:
        "Hello! I'm your AI Mentor. I'm here to help you understand quantum computing concepts, explain experimental results, and answer any questions you have about quantum mechanics. What would you like to learn about?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: messages.length,
      type: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const response =
        mentorResponses[messageText as keyof typeof mentorResponses] ||
        `Great question about "${messageText.substring(0, 30)}...". In quantum computing, this involves several important concepts. Let me break it down for you:\n\n1. First, consider the fundamental principles of quantum mechanics\n2. Then, think about how these apply to qubits and quantum gates\n3. Finally, consider the practical implications for quantum algorithms\n\nWould you like me to elaborate on any of these points?`;

      const mentorMessage: Message = {
        id: messages.length + 1,
        type: "mentor",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, mentorMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">AI Mentor</h1>
            <p className="text-muted-foreground">Your personal quantum computing guide</p>
          </div>

          {/* Chat Container */}
          <div className="flex flex-col h-[600px] rounded-xl border border-border bg-gradient-to-br from-card to-card/50 overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-br-none"
                        : "bg-muted text-muted-foreground rounded-bl-none border border-border"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <p
                      className={`text-xs mt-2 ${
                        message.type === "user"
                          ? "text-primary-foreground/60"
                          : "text-muted-foreground/60"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted border border-border px-4 py-3 rounded-lg rounded-bl-none">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && !isLoading && (
              <div className="border-t border-border px-6 py-4 bg-background/50">
                <p className="text-xs text-muted-foreground font-semibold mb-3 uppercase">
                  Suggested Topics
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="text-left text-xs p-3 rounded-lg bg-primary/10 border border-primary/30 text-muted-foreground hover:text-primary hover:border-primary/60 hover:bg-primary/20 transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-border p-4 bg-background/30">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask me about quantum computing..."
                  className="flex-1 px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !input.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-border bg-gradient-to-br from-card to-card/50">
              <h3 className="font-bold text-foreground mb-3">💡 Pro Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Ask about specific quantum gates and their effects</li>
                <li>Request explanations of experimental results</li>
                <li>Ask for clarification on confusing concepts</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-gradient-to-br from-card to-card/50">
              <h3 className="font-bold text-foreground mb-3">📚 Topics I Know</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Quantum gates and circuit operations</li>
                <li>Superposition and entanglement</li>
                <li>Measurement and probability</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
