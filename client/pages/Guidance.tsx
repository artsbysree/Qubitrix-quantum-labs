import { useState } from "react";
import Layout from "@/components/Layout";

interface Message {
  id: number;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedPrompts = [
  "Why did my result change?",
  "What does noise represent?",
  "How should I read the sphere visualization?",
  "Can I improve my experiment results?",
];

export default function Guidance() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      content:
        "Hello! I'm here to help you understand quantum computing concepts and guide you through your experiments. Feel free to ask me anything about quantum labs, experimental results, or quantum computing theory.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages([...messages, newUserMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate assistant response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "Why did my result change?":
          "Your results changed because quantum systems are probabilistic and affected by noise. With higher noise levels, the quantum states become less stable, leading to different measurement outcomes. Try reducing the noise level to see more consistent results.",
        "What does noise represent?":
          "Noise in quantum systems represents unwanted interactions that disrupt qubit states. Common sources include temperature fluctuations, electromagnetic radiation, and physical vibrations. This is one of the major challenges in building practical quantum computers.",
        "How should I read the sphere visualization?":
          "The Bloch sphere visualizes the state of a single qubit. The point on the sphere represents the qubit's quantum state. As noise increases, the state vector's precision decreases, moving further from the ideal position.",
        "Can I improve my experiment results?":
          "Yes! You can improve results by: 1) Using error mitigation techniques, 2) Reducing noise through better hardware, 3) Running multiple measurements and averaging, 4) Using quantum error correction codes.",
      };

      const assistantResponse = responses[messageText] || 
        "That's a great question! In quantum computing, it's important to understand both the theoretical foundations and practical limitations of real quantum systems. What specific aspect would you like to explore further?";

      const newAssistantMessage: Message = {
        id: messages.length + 2,
        type: "assistant",
        content: assistantResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newAssistantMessage]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Lab Guidance</h1>
            <p className="text-muted-foreground">
              Get help understanding quantum concepts and experimental results
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col h-[600px] bg-white border border-border rounded-lg overflow-hidden">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted text-muted-foreground rounded-bl-none border border-border"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.type === "user"
                          ? "text-primary-foreground/70"
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
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Prompts (shown when no messages beyond initial) */}
            {messages.length === 1 && !isLoading && (
              <div className="border-t border-border px-6 py-4 bg-muted/10">
                <p className="text-xs text-muted-foreground font-medium mb-3">
                  Suggested questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-xs px-3 py-1.5 bg-white border border-border rounded-full hover:border-primary hover:text-primary transition-colors text-muted-foreground font-medium"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-border p-4">
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
                  placeholder="Ask a question..."
                  className="flex-1 px-4 py-2 border border-border rounded-lg bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !input.trim()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Common Questions",
                items: [
                  "Understanding quantum gates",
                  "Interpreting measurement results",
                  "Managing quantum noise",
                ],
              },
              {
                title: "Learning Resources",
                items: [
                  "Quantum computing fundamentals",
                  "Error mitigation techniques",
                  "Real quantum hardware overview",
                ],
              },
            ].map((section, idx) => (
              <div key={idx} className="bg-muted/20 border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-sm text-muted-foreground">
                      <button className="hover:text-primary hover:underline transition-colors text-left">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
