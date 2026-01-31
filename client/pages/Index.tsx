import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

export default function Index() {
  return (
    <Layout hideNav={true}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background to-muted min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">Q</span>
                </div>
                <span className="text-2xl font-bold text-foreground">Qubitrix</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Reality-driven quantum labs for students
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Learn quantum computing through realistic experimentation. Master concepts, run experiments on simulated quantum systems, and understand real-world quantum behavior.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-colors text-center"
                >
                  Get Started
                </Link>
                <Link
                  to="/learning"
                  className="px-8 py-3 border border-border text-foreground rounded-md font-semibold hover:bg-muted transition-colors text-center"
                >
                  Explore Learning
                </Link>
              </div>
            </div>

            {/* Visualization placeholder */}
            <div className="bg-white rounded-lg shadow-md p-8 h-96 flex items-center justify-center border border-border">
              <div className="text-center">
                <svg
                  className="w-24 h-24 mx-auto mb-4 text-primary/20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <p className="text-muted-foreground">Quantum Simulation Visualization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How Qubitrix Works
            </h2>
            <p className="text-lg text-muted-foreground">
              A complete learning journey from theory to experimentation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Learn Concepts",
                description:
                  "Start with foundational quantum computing concepts. Progress through structured courses at your own pace.",
                icon: "📚",
              },
              {
                title: "Run Experiments",
                description:
                  "Execute quantum experiments on realistic simulators. Observe real quantum behavior including noise and decoherence.",
                icon: "⚗️",
              },
              {
                title: "Understand Results",
                description:
                  "Analyze experimental outcomes with visualizations. Learn how quantum systems behave in the real world.",
                icon: "📊",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-muted/30 rounded-lg p-8 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Ready to explore quantum computing?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Start your quantum learning journey today with hands-on labs and interactive experiments.
          </p>
          <Link
            to="/login"
            className="inline-block px-8 py-3 bg-white text-primary rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            Create Your Account
          </Link>
        </div>
      </section>
    </Layout>
  );
}
