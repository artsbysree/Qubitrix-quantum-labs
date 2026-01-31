import { useState } from "react";

interface LabInstructionsProps {
  objective: string;
  steps: string[];
  observations: string[];
  tips: string[];
  videoCaption?: string;
}

export default function LabInstructions({
  objective,
  steps,
  observations,
  tips,
  videoCaption = "Watch a short guide on how to perform this experiment",
}: LabInstructionsProps) {
  const [activeTab, setActiveTab] = useState<"instructions" | "video">("instructions");

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-border">
        {[
          { id: "instructions", label: "Instructions" },
          { id: "video", label: "Lab Walkthrough" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Instructions Tab */}
      {activeTab === "instructions" && (
        <div className="space-y-6">
          {/* Objective */}
          <div className="p-6 rounded-xl bg-primary/10 border border-primary/30">
            <h3 className="text-lg font-bold text-foreground mb-2">🎯 Objective</h3>
            <p className="text-muted-foreground leading-relaxed">{objective}</p>
          </div>

          {/* Steps */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-lg font-bold text-foreground mb-4">📋 Steps</h3>
            <ol className="space-y-3">
              {steps.map((step, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {idx + 1}
                  </span>
                  <p className="text-muted-foreground leading-relaxed pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Observations */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-lg font-bold text-foreground mb-4">👁️ What to Observe</h3>
            <ul className="space-y-3">
              {observations.map((obs, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="flex-shrink-0 text-secondary mt-1">✓</span>
                  <p className="text-muted-foreground leading-relaxed">{obs}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Tips */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-lg font-bold text-foreground mb-4">💡 Pro Tips</h3>
            <ul className="space-y-3">
              {tips.map((tip, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="flex-shrink-0 text-accent mt-1">→</span>
                  <p className="text-muted-foreground leading-relaxed">{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Video Tab */}
      {activeTab === "video" && (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-20 h-20 mx-auto mb-4 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-muted-foreground mb-2">{videoCaption}</p>
              <p className="text-xs text-muted-foreground/60">Video placeholder - ~5 minutes</p>
            </div>
          </div>
          <div className="p-4 bg-background/50 border-t border-border">
            <p className="text-sm text-muted-foreground">
              This video demonstrates the complete lab workflow and explains the quantum concepts being explored.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
