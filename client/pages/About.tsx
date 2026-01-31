import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-background via-background to-background/80 min-h-screen">
        {/* Header */}
        <div className="border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">About Qubitrix</h1>
            <p className="text-lg text-muted-foreground">
              Empowering students to learn quantum computing through reality-driven experimentation
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Mission Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              Qubitrix is designed to bridge the gap between theoretical quantum computing and practical
              quantum hardware. We provide students with an interactive platform to learn quantum concepts
              and immediately apply them through hands-on experiments with realistic quantum simulators.
            </p>
          </div>

          {/* Features Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Structured Learning Path",
                  description:
                    "Progress from foundational concepts to advanced quantum algorithms through our curated curriculum.",
                },
                {
                  title: "Realistic Simulations",
                  description:
                    "Experiment with quantum circuits that accurately model real quantum hardware behavior and noise.",
                },
                {
                  title: "Interactive Visualizations",
                  description:
                    "Understand quantum states through Bloch sphere visualizations and probability distributions.",
                },
                {
                  title: "Hands-on Labs",
                  description:
                    "Run experiments, analyze results, and learn from quantum behavior in real time.",
                },
              ].map((feature, idx) => (
                <div key={idx} className="border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Built With</h2>
            <div className="bg-muted/30 border border-border rounded-lg p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: "React", icon: "⚛️" },
                  { name: "Tailwind CSS", icon: "🎨" },
                  { name: "Python", icon: "🐍" },
                  { name: "Quantum Sim", icon: "🔬" },
                ].map((tech, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-3xl mb-2">{tech.icon}</div>
                    <p className="text-sm font-medium text-foreground">{tech.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-8">
            <h2 className="text-xl font-bold text-foreground mb-2">Get in Touch</h2>
            <p className="text-muted-foreground mb-4">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <a
              href="mailto:support@qubitrix.example"
              className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
