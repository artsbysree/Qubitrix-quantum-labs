import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const modules = [
  {
    id: 1,
    title: "Basics of Qubits",
    description: "Understand the fundamental unit of quantum information - the qubit.",
    topics: ["Classical Bits", "Quantum Bits", "Quantum States", "Measurement"],
    progress: 100,
    icon: "⚛️",
    relatedLab: "/labs/qubit",
  },
  {
    id: 2,
    title: "Superposition",
    description: "Learn how qubits exist in multiple states simultaneously.",
    topics: ["Linear Combinations", "Probability Amplitudes", "Wave Functions", "Coherence"],
    progress: 75,
    icon: "🌊",
    relatedLab: "/labs/qubit",
  },
  {
    id: 3,
    title: "Quantum Gates",
    description: "Master the building blocks of quantum circuits.",
    topics: ["Pauli Gates (X, Y, Z)", "Hadamard Gate", "CNOT Gate", "Circuit Composition"],
    progress: 50,
    icon: "🔧",
    relatedLab: "/labs/gates",
  },
  {
    id: 4,
    title: "Entanglement",
    description: "Explore quantum correlations and Bell states.",
    topics: ["Bell States", "Quantum Correlation", "Non-locality", "Applications"],
    progress: 25,
    icon: "🔗",
    relatedLab: "/labs/entanglement",
  },
  {
    id: 5,
    title: "Noise & Decoherence",
    description: "Understand how real quantum systems lose their quantum properties.",
    topics: ["Decoherence Channels", "Error Sources", "Relaxation", "Dephasing"],
    progress: 0,
    icon: "📊",
    relatedLab: "/labs/noise",
  },
];

export default function Learning() {
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const overallProgress = Math.round(modules.reduce((sum, m) => sum + m.progress, 0) / modules.length);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Learning Path</h1>
            <p className="text-muted-foreground">Master quantum computing concepts step by step</p>

            {/* Overall Progress */}
            <div className="mt-8 p-6 rounded-xl border border-border bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Your Progress</h3>
                  <p className="text-sm text-muted-foreground">You're learning quantum computing</p>
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {overallProgress}%
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Modules Grid */}
          <div className="space-y-4">
            {modules.map((module) => (
              <div
                key={module.id}
                className="rounded-xl border border-border bg-gradient-to-br from-card to-card/50 overflow-hidden hover:border-primary/50 transition-all duration-300"
              >
                <button
                  onClick={() =>
                    setExpandedModule(expandedModule === module.id ? null : module.id)
                  }
                  className="w-full p-6 flex items-start gap-6 hover:bg-primary/5 transition-colors text-left"
                >
                  {/* Icon */}
                  <div className="text-4xl flex-shrink-0">{module.icon}</div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {module.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{module.description}</p>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1 max-w-xs">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold text-primary">{module.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                            style={{ width: `${module.progress}%` }}
                          />
                        </div>
                      </div>

                      {module.progress === 100 && (
                        <span className="text-sm font-semibold text-green-400">✓ Complete</span>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  <svg
                    className={`w-6 h-6 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                      expandedModule === module.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>

                {/* Expanded Content */}
                {expandedModule === module.id && (
                  <div className="px-6 py-6 border-t border-border bg-background/50">
                    <div className="space-y-6">
                      {/* Topics */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">
                          Topics Covered
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {module.topics.map((topic, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20"
                            >
                              <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                              <span className="text-sm text-foreground">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="p-4 rounded-lg bg-muted/30 border border-border">
                        <h4 className="text-sm font-semibold text-foreground mb-2">
                          About this module
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          This module provides comprehensive coverage of {module.title.toLowerCase()}.
                          Work through the topics and then practice with the related lab to solidify your understanding.
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button className="flex-1 px-4 py-2 rounded-lg bg-primary/20 text-primary font-semibold hover:bg-primary/30 transition-colors border border-primary/30">
                          {module.progress === 100 ? "✓ Review" : "Continue Learning"}
                        </button>
                        <Link
                          to={module.relatedLab}
                          className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all text-center"
                        >
                          Go to Lab →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Next Steps */}
          <div className="mt-12 p-8 rounded-xl border border-border bg-gradient-to-br from-card to-card/50">
            <h3 className="text-xl font-bold text-foreground mb-4">Next Steps</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  1
                </span>
                <span className="text-muted-foreground">
                  Complete the "Quantum Gates" module to unlock the Gates Playground lab
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  2
                </span>
                <span className="text-muted-foreground">
                  Master "Entanglement" to understand advanced quantum correlations
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  3
                </span>
                <span className="text-muted-foreground">
                  Use the AI Mentor for detailed explanations on challenging topics
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
