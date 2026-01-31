import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const labs = [
  {
    id: 1,
    title: "Qubit Lab",
    description: "Interactive Bloch Sphere visualization. Apply quantum gates (H, X, Y, Z) and observe state evolution.",
    difficulty: "Beginner",
    icon: "⚛️",
    path: "/labs/qubit",
    features: ["Bloch Sphere", "Gate Application", "Measurement", "State Vector"],
  },
  {
    id: 2,
    title: "Gates Playground",
    description: "Drag-and-drop quantum circuit builder. Create multi-qubit circuits and visualize results.",
    difficulty: "Beginner",
    icon: "🔧",
    path: "/labs/gates",
    features: ["Circuit Builder", "Multi-qubit", "Visualization", "Probability"],
  },
  {
    id: 3,
    title: "Entanglement Lab",
    description: "Create Bell states and explore quantum correlations between entangled qubits.",
    difficulty: "Intermediate",
    icon: "🔗",
    path: "/labs/entanglement",
    features: ["Bell States", "Correlations", "Non-locality", "Visualization"],
  },
  {
    id: 4,
    title: "Noise Simulation",
    description: "Study decoherence effects and observe how noise impacts quantum states.",
    difficulty: "Advanced",
    icon: "📊",
    path: "/labs/noise",
    features: ["Decoherence", "Error Sources", "Real Hardware", "Analysis"],
  },
];

export default function Labs() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Quantum Labs</h1>
            <p className="text-muted-foreground">Hands-on experiments with interactive visualizations</p>
          </div>

          {/* Labs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {labs.map((lab) => (
              <Link
                key={lab.id}
                to={lab.path}
                className="group p-8 rounded-xl border border-border bg-gradient-to-br from-card to-card/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="text-5xl">{lab.icon}</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    lab.difficulty === "Beginner"
                      ? "bg-green-500/20 text-green-300 border border-green-500/30"
                      : lab.difficulty === "Intermediate"
                      ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                      : "bg-red-500/20 text-red-300 border border-red-500/30"
                  }`}>
                    {lab.difficulty}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {lab.title}
                </h3>
                <p className="text-muted-foreground mb-6">{lab.description}</p>

                {/* Features */}
                <div className="mb-6">
                  <p className="text-xs text-muted-foreground font-semibold mb-2 uppercase">Key Features</p>
                  <div className="flex flex-wrap gap-2">
                    {lab.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs bg-primary/20 text-primary border border-primary/30"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <span className="font-semibold text-primary group-hover:translate-x-1 transition-transform">
                    Enter Lab →
                  </span>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Lab Tips */}
          <div className="mt-12 p-8 rounded-xl border border-border bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
            <h3 className="text-xl font-bold text-foreground mb-4">Tips for Success</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-semibold text-primary mb-2">📚 Learn First</p>
                <p className="text-sm text-muted-foreground">
                  Complete the learning modules before attempting labs to build foundational knowledge.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-secondary mb-2">🔄 Experiment</p>
                <p className="text-sm text-muted-foreground">
                  Don't be afraid to try different approaches. Quantum systems are meant to be explored.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-accent mb-2">🤖 Get Help</p>
                <p className="text-sm text-muted-foreground">
                  Use the AI Mentor to understand confusing concepts and interpret results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
