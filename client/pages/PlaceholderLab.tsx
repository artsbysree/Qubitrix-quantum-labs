import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

interface PlaceholderLabProps {
  title: string;
  description: string;
  icon: string;
  features: string[];
  backLink: string;
}

export default function PlaceholderLab({ title, description, icon, features, backLink }: PlaceholderLabProps) {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link to={backLink} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Labs
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{icon}</span>
              <div>
                <h1 className="text-4xl font-bold">{title}</h1>
                <p className="text-muted-foreground mt-2">{description}</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-12 p-8 rounded-xl border border-border bg-gradient-to-br from-card to-card/50">
            <h2 className="text-2xl font-bold text-foreground mb-6">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">
                    ✓
                  </span>
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coming Soon Message */}
          <div className="p-12 rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 text-center">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Coming Soon</h2>
            <p className="text-muted-foreground mb-6">
              This lab is currently under development. We're building an amazing interactive experience for you!
            </p>
            <Link
              to="/labs"
              className="inline-block px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all"
            >
              Explore Other Labs
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
