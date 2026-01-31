import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

export default function Index() {
  return (
    <Layout hideNav={true}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
        {/* Navigation Bar */}
        <nav className="border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/30 transition-all">
                  <span className="text-primary-foreground font-bold text-sm">Q</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Qubitrix</span>
              </Link>

              <div className="hidden md:flex items-center gap-1">
                {[
                  { label: "Learning", path: "/learning" },
                  { label: "Labs", path: "/labs" },
                  { label: "AI Mentor", path: "/mentor" },
                  { label: "About", path: "/about" },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <Link
                to="/login"
                className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                Login
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
                <span className="text-sm font-semibold text-primary">Quantum Computing for Everyone</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Reality-driven quantum labs for{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  students
                </span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Learn quantum computing through interactive visualization and experiments. Understand qubits, 
                gates, entanglement, and real quantum behavior with hands-on labs and AI guidance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/login"
                  className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all text-center"
                >
                  Get Started
                </Link>
                <Link
                  to="/learning"
                  className="px-8 py-3 border border-primary/50 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all text-center"
                >
                  Explore Learning
                </Link>
              </div>
            </div>

            {/* Right - Quantum Illustration */}
            <div className="relative h-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-background rounded-2xl overflow-hidden border border-primary/20">
                {/* Quantum Computing Visualization SVG */}
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full p-8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "rgba(147, 112, 219, 0.8)", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "rgba(32, 201, 201, 0.8)", stopOpacity: 1 }} />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Background circles */}
                  <circle cx="200" cy="200" r="120" fill="none" stroke="url(#grad1)" strokeWidth="0.5" opacity="0.3" />
                  <circle cx="200" cy="200" r="80" fill="none" stroke="url(#grad1)" strokeWidth="0.5" opacity="0.5" />
                  <circle cx="200" cy="200" r="40" fill="none" stroke="url(#grad1)" strokeWidth="1" opacity="0.7" />

                  {/* Qubit nodes */}
                  <g filter="url(#glow)">
                    <circle cx="140" cy="120" r="8" fill="rgba(147, 112, 219, 1)" />
                    <circle cx="260" cy="120" r="8" fill="rgba(147, 112, 219, 1)" />
                    <circle cx="140" cy="280" r="8" fill="rgba(32, 201, 201, 1)" />
                    <circle cx="260" cy="280" r="8" fill="rgba(32, 201, 201, 1)" />
                  </g>

                  {/* Connecting lines */}
                  <line x1="140" y1="120" x2="260" y2="120" stroke="url(#grad1)" strokeWidth="1.5" opacity="0.6" />
                  <line x1="140" y1="120" x2="140" y2="280" stroke="url(#grad1)" strokeWidth="1.5" opacity="0.6" />
                  <line x1="260" y1="120" x2="260" y2="280" stroke="url(#grad1)" strokeWidth="1.5" opacity="0.6" />
                  <line x1="140" y1="280" x2="260" y2="280" stroke="url(#grad1)" strokeWidth="1.5" opacity="0.6" />

                  {/* Central Bloch sphere concept */}
                  <circle cx="200" cy="200" r="30" fill="none" stroke="rgba(147, 112, 219, 0.4)" strokeWidth="1" />
                  <ellipse cx="200" cy="200" rx="25" ry="8" fill="none" stroke="rgba(32, 201, 201, 0.4)" strokeWidth="0.5" />
                  <line x1="200" y1="170" x2="200" y2="230" stroke="rgba(147, 112, 219, 0.3)" strokeWidth="1" />
                  <circle cx="200" cy="200" r="4" fill="rgba(255, 255, 255, 0.6)" />

                  {/* Decorative elements */}
                  <text x="200" y="350" textAnchor="middle" fontSize="12" fill="rgba(255, 255, 255, 0.5)" fontFamily="sans-serif">
                    Quantum Simulation
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Qubitrix?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A comprehensive platform designed to make quantum computing intuitive and accessible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🔬",
                title: "Interactive Labs",
                description: "Hands-on quantum experiments with real-time visualizations and instant feedback",
              },
              {
                icon: "📚",
                title: "Structured Learning",
                description: "Progress from basics to advanced concepts with guided modules and exercises",
              },
              {
                icon: "🤖",
                title: "AI Mentor",
                description: "Get instant help understanding quantum concepts with context-aware explanations",
              },
              {
                icon: "📊",
                title: "Visual Analytics",
                description: "Bloch spheres, probability distributions, and circuit visualizations",
              },
              {
                icon: "🎯",
                title: "Progress Tracking",
                description: "Track your learning journey with detailed progress reports and achievements",
              },
              {
                icon: "🌐",
                title: "Community",
                description: "Learn alongside other students and share your quantum computing insights",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-xl border border-border hover:border-primary/50 bg-card hover:bg-primary/5 transition-all duration-300 cursor-pointer"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-12">
            <h2 className="text-4xl font-bold mb-4">Ready to explore quantum computing?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Start your quantum learning journey today with interactive labs, structured modules, and AI guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                Create Account
              </Link>
              <Link
                to="/learning"
                className="px-8 py-3 border border-primary/50 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
