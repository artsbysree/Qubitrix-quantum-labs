import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const labs = [
  {
    id: 1,
    title: "Qubit Lab",
    description: "Interactive Bloch Sphere visualization. Apply quantum gates and observe state evolution.",
    difficulty: "Beginner",
    completed: 2,
    total: 5,
    path: "/labs/qubit",
    icon: "⚛️",
  },
  {
    id: 2,
    title: "Gates Playground",
    description: "Build quantum circuits with drag-and-drop gates. Visualize multi-qubit systems.",
    difficulty: "Beginner",
    completed: 0,
    total: 4,
    path: "/labs/gates",
    icon: "🔧",
  },
  {
    id: 3,
    title: "Entanglement Lab",
    description: "Create Bell states and explore quantum correlations. Understand entanglement.",
    difficulty: "Intermediate",
    completed: 0,
    total: 3,
    path: "/labs/entanglement",
    icon: "🔗",
  },
  {
    id: 4,
    title: "Noise Simulation",
    description: "Study decoherence effects. See how noise impacts quantum states in real hardware.",
    difficulty: "Advanced",
    completed: 0,
    total: 6,
    path: "/labs/noise",
    icon: "📊",
  },
];

export default function Dashboard() {
  const totalProgress = labs.reduce((sum, lab) => sum + lab.completed, 0);
  const totalExercises = labs.reduce((sum, lab) => sum + lab.total, 0);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Welcome back, Student</h1>
            <p className="text-muted-foreground">Continue your quantum computing journey</p>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-xl border border-border bg-gradient-to-br from-card to-card/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground">Overall Progress</h3>
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H3a1 1 0 00-1 1v10a1 1 0 001 1h14a1 1 0 001-1V6a1 1 0 00-1-1h-3a1 1 0 000-2h2a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{totalProgress}/{totalExercises}</div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                  style={{ width: `${(totalProgress / totalExercises) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {Math.round((totalProgress / totalExercises) * 100)}% Complete
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-gradient-to-br from-card to-card/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground">Streak</h3>
                <span className="text-2xl">🔥</span>
              </div>
              <div className="text-3xl font-bold text-secondary mb-2">7 days</div>
              <p className="text-xs text-muted-foreground">Keep up the great work!</p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-gradient-to-br from-card to-card/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground">Learning Time</h3>
                <span className="text-2xl">⏱️</span>
              </div>
              <div className="text-3xl font-bold text-accent mb-2">12.5h</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </div>
          </div>

          {/* Labs Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Your Labs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {labs.map((lab) => (
                <Link
                  key={lab.id}
                  to={lab.path}
                  className="group p-6 rounded-xl border border-border bg-gradient-to-br from-card to-card/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{lab.icon}</div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors mb-2">
                    {lab.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{lab.description}</p>

                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-primary">
                        {lab.completed}/{lab.total}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                        style={{ width: `${(lab.completed / lab.total) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-semibold">
                      {lab.difficulty}
                    </span>
                    <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/learning"
              className="p-6 rounded-xl border border-border bg-gradient-to-br from-card to-card/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-2">Continue Learning</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Complete the quantum gates module to unlock new labs.
              </p>
              <span className="text-primary font-semibold">Go to Learning →</span>
            </Link>

            <Link
              to="/mentor"
              className="p-6 rounded-xl border border-border bg-gradient-to-br from-card to-card/50 hover:border-secondary/50 hover:shadow-lg hover:shadow-secondary/10 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-2">Ask AI Mentor</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get help understanding quantum concepts with our AI guide.
              </p>
              <span className="text-secondary font-semibold">Chat Now →</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
