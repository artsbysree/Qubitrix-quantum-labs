import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  relatedLab?: string;
  duration: string;
}

interface CourseLevel {
  level: "Beginner" | "Intermediate" | "Advanced";
  icon: string;
  color: string;
  lessons: Lesson[];
  description: string;
}

const courses: CourseLevel[] = [
  {
    level: "Beginner",
    icon: "🌱",
    color: "from-green-500/20 to-green-600/20",
    description: "Start your quantum journey with fundamental concepts",
    lessons: [
      {
        id: "b1",
        title: "What is Quantum Computing?",
        description:
          "Explore the basics of quantum computing and why it's revolutionary",
        content:
          "Quantum computers use quantum bits (qubits) instead of classical bits. Unlike classical bits that are either 0 or 1, qubits can exist in superposition - both 0 and 1 simultaneously. This fundamental difference allows quantum computers to process information in entirely new ways.",
        duration: "5 min",
      },
      {
        id: "b2",
        title: "Classical Bits vs Qubits",
        description:
          "Understand the difference between classical and quantum information",
        content:
          "Classical bits are deterministic - they're either 0 or 1. Qubits are probabilistic and can be in a superposition of states. A qubit can be |0⟩, |1⟩, or any combination of both, giving quantum computers exponential computational advantages for certain problems.",
        duration: "7 min",
      },
      {
        id: "b3",
        title: "Superposition Explained",
        description: "Learn how qubits can exist in multiple states at once",
        content:
          "Superposition is one of the most powerful features of quantum computing. A qubit in superposition is a linear combination of |0⟩ and |1⟩ states: |ψ⟩ = α|0⟩ + β|1⟩. The values α and β are called amplitudes, and their squares give measurement probabilities.",
        relatedLab: "/labs/qubit",
        duration: "8 min",
      },
      {
        id: "b4",
        title: "Measurement Basics",
        description:
          "Understand how quantum measurement collapses superposition",
        content:
          "When you measure a qubit, superposition collapses into a definite state: either 0 or 1. The probability of each outcome depends on the amplitudes. This is fundamental: measurement destroys quantum information and cannot be undone.",
        relatedLab: "/labs/qubit",
        duration: "6 min",
      },
    ],
  },
  {
    level: "Intermediate",
    icon: "⚡",
    color: "from-blue-500/20 to-blue-600/20",
    description: "Master quantum operations and multi-qubit systems",
    lessons: [
      {
        id: "i1",
        title: "The Bloch Sphere",
        description: "Visualize single qubit states in 3D space",
        content:
          "The Bloch sphere is a powerful visualization tool for understanding single-qubit states. Every point on the Bloch sphere represents a valid quantum state. The north pole is |0⟩, the south pole is |1⟩, and points on the equator are superpositions. Quantum gates rotate the state vector around the sphere.",
        relatedLab: "/labs/qubit",
        duration: "10 min",
      },
      {
        id: "i2",
        title: "Quantum Gates",
        description: "Learn about basic quantum gate operations",
        content:
          "Quantum gates transform qubit states, similar to how logic gates work in classical computers. The most important gates are the Pauli gates (X, Y, Z), the Hadamard gate (H), and the CNOT gate for two-qubit operations. Each gate corresponds to a rotation or reflection on the Bloch sphere.",
        relatedLab: "/labs/gates",
        duration: "12 min",
      },
      {
        id: "i3",
        title: "Multi-Qubit Systems",
        description: "Work with multiple qubits and quantum circuits",
        content:
          "When you have multiple qubits, the state space grows exponentially. Two qubits need 4 amplitudes (|00⟩, |01⟩, |10⟩, |11⟩), three qubits need 8, and so on. This exponential growth is the source of quantum computing's power.",
        relatedLab: "/labs/gates",
        duration: "9 min",
      },
      {
        id: "i4",
        title: "Entanglement Fundamentals",
        description: "Understand quantum entanglement and Bell states",
        content:
          "Entanglement is a uniquely quantum phenomenon where two qubits become correlated such that measuring one instantly determines the other. Bell states are maximally entangled two-qubit states. Entanglement is crucial for many quantum algorithms.",
        relatedLab: "/labs/entanglement",
        duration: "10 min",
      },
    ],
  },
  {
    level: "Advanced",
    icon: "🚀",
    color: "from-purple-500/20 to-purple-600/20",
    description: "Explore advanced topics and real quantum systems",
    lessons: [
      {
        id: "a1",
        title: "Quantum Algorithms Overview",
        description: "Survey famous quantum algorithms and their advantages",
        content:
          "Quantum algorithms like Shor's factoring algorithm, Grover's search, and the quantum Fourier transform exploit quantum properties to solve problems faster than classical algorithms. These algorithms demonstrate why quantum computing is so powerful for specific problem classes.",
        duration: "15 min",
      },
      {
        id: "a2",
        title: "Noise and Decoherence",
        description: "Understand quantum errors in real hardware",
        content:
          "Real quantum computers are noisy. Decoherence causes qubits to lose quantum properties and collapse to classical states. Noise comes from environmental interactions, temperature, electromagnetic radiation, and gate operation imperfections. This is the biggest challenge in quantum computing.",
        relatedLab: "/labs/noise",
        duration: "12 min",
      },
      {
        id: "a3",
        title: "Error Mitigation & Correction",
        description: "Learn techniques to handle quantum errors",
        content:
          "Error mitigation techniques include redundant encoding, error correction codes, and measurement-based error recovery. These methods add overhead but are essential for scaling quantum computers. Quantum error correction is a fundamental requirement for practical quantum computing.",
        duration: "14 min",
      },
      {
        id: "a4",
        title: "Real Hardware vs Simulators",
        description:
          "Explore the differences between simulated and real quantum systems",
        content:
          "Quantum simulators run on classical computers and can perfectly represent quantum states without noise. Real quantum hardware (IBM, Google, IonQ) has noise, limited connectivity, and calibration errors. Understanding these differences is crucial for quantum software development.",
        duration: "11 min",
      },
    ],
  },
];

export default function Learning() {
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-3">Learning Path</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Progress through structured quantum computing concepts from
              beginner to advanced. Each lesson is paired with an interactive
              lab to reinforce your learning.
            </p>
          </div>

          {/* Course Levels */}
          <div className="space-y-12">
            {courses.map((course, courseIdx) => (
              <div key={course.level}>
                {/* Course Header */}
                <div
                  className={`mb-8 p-8 rounded-xl bg-gradient-to-r ${course.color} border border-border`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-4xl">{course.icon}</span>
                    <div>
                      <h2 className="text-3xl font-bold text-foreground">
                        {course.level} Level
                      </h2>
                      <p className="text-muted-foreground">
                        {course.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Lessons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {course.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="rounded-xl border border-border bg-gradient-to-br from-card to-card/50 overflow-hidden hover:border-primary/50 transition-all"
                    >
                      {/* Lesson Header - Click to expand */}
                      <button
                        onClick={() =>
                          setExpandedLesson(
                            expandedLesson === lesson.id ? null : lesson.id,
                          )
                        }
                        className="w-full p-6 text-left hover:bg-primary/5 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-foreground mb-2">
                              {lesson.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {lesson.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ⏱ {lesson.duration}
                            </p>
                          </div>
                          <svg
                            className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                              expandedLesson === lesson.id ? "rotate-180" : ""
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
                        </div>
                      </button>

                      {/* Expanded Content */}
                      {expandedLesson === lesson.id && (
                        <div className="px-6 py-6 border-t border-border bg-background/50">
                          {/* Content */}
                          <div className="mb-6 pb-6 border-b border-border">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {lesson.content}
                            </p>
                          </div>

                          {/* Lab Link (if available) */}
                          {lesson.relatedLab && (
                            <div className="flex gap-3">
                              <Link
                                to={lesson.relatedLab}
                                className="flex-1 px-4 py-2 bg-primary/20 text-primary rounded-lg font-semibold hover:bg-primary/30 transition-colors text-center text-sm"
                              >
                                Go to Related Lab →
                              </Link>
                              <button className="flex-1 px-4 py-2 border border-border text-muted-foreground rounded-lg hover:bg-muted transition-colors text-sm font-semibold">
                                Mark Complete
                              </button>
                            </div>
                          )}
                          {!lesson.relatedLab && (
                            <button className="w-full px-4 py-2 border border-border text-muted-foreground rounded-lg hover:bg-muted transition-colors font-semibold">
                              Mark Complete
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Learning Suggestions */}
          <div className="mt-16 p-8 rounded-xl border border-border bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              📚 Learning Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  1. Learn, Then Practice
                </h3>
                <p className="text-sm text-muted-foreground">
                  Read each lesson carefully, then visit the related lab to see
                  concepts in action.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  2. Experiment Freely
                </h3>
                <p className="text-sm text-muted-foreground">
                  In the labs, try different settings and gates. Experimentation
                  builds intuition.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  3. Use AI Mentor
                </h3>
                <p className="text-sm text-muted-foreground">
                  When stuck, ask the AI Mentor for hints and explanations of
                  results.
                </p>
              </div>
            </div>
          </div>

          {/* Progression Path */}
          <div className="mt-12 p-8 rounded-xl border border-border bg-card">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              🎯 Recommended Learning Order
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center font-bold text-green-400">
                  1
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    Beginner Level
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Build foundational understanding (~25 minutes)
                  </p>
                </div>
                <Link
                  to="/labs/qubit"
                  className="ml-auto text-sm text-primary hover:text-primary/80 font-semibold"
                >
                  Start Qubit Lab →
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400">
                  2
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    Intermediate Level
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Master quantum operations (~40 minutes)
                  </p>
                </div>
                <Link
                  to="/labs/gates"
                  className="ml-auto text-sm text-primary hover:text-primary/80 font-semibold"
                >
                  Try Gates Lab →
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center font-bold text-purple-400">
                  3
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    Advanced Level
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Explore advanced topics (~50 minutes)
                  </p>
                </div>
                <Link
                  to="/labs/noise"
                  className="ml-auto text-sm text-primary hover:text-primary/80 font-semibold"
                >
                  Explore Noise Lab →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
