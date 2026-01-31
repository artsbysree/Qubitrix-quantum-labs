import { useState } from "react";
import Layout from "@/components/Layout";
import LabInstructions from "@/components/LabInstructions";

export default function MeasurementLab() {
  const [numMeasurements, setNumMeasurements] = useState(100);
  const [hasRun, setHasRun] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<{ state0: number; state1: number }>({ state0: 0, state1: 0 });

  const handleRunExperiment = () => {
    setIsRunning(true);
    setTimeout(() => {
      // Simulate measurement results
      const state0Count = Math.floor(numMeasurements * (0.4 + Math.random() * 0.2));
      const state1Count = numMeasurements - state0Count;
      setResults({ state0: state0Count, state1: state1Count });
      setHasRun(true);
      setIsRunning(false);
    }, 1000);
  };

  const prob0 = hasRun ? (results.state0 / numMeasurements * 100).toFixed(1) : 0;
  const prob1 = hasRun ? (results.state1 / numMeasurements * 100).toFixed(1) : 0;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <a href="/labs" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Labs
            </a>
            <h1 className="text-4xl font-bold mb-2">Measurement & State Collapse</h1>
            <p className="text-muted-foreground">
              Understand how quantum measurement collapses superposition states
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Controls */}
            <div className="lg:col-span-1 space-y-6">
              {/* Setup */}
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-4">Experiment Setup</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Number of Measurements
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="1000"
                      step="10"
                      value={numMeasurements}
                      onChange={(e) => setNumMeasurements(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-2">{numMeasurements} measurements</p>
                  </div>

                  <button
                    onClick={handleRunExperiment}
                    disabled={isRunning}
                    className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50"
                  >
                    {isRunning ? "Running..." : "Run Experiment"}
                  </button>
                </div>
              </div>

              {/* Key Concept */}
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-3">🔑 Key Concept</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Quantum measurement causes the superposition to collapse into a definite state. Each measurement
                  gives a random outcome, but repeated measurements show the probability distribution.
                </p>
              </div>
            </div>

            {/* Center - Visualization */}
            <div className="lg:col-span-1">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-6">State Visualization</h3>

                {!hasRun ? (
                  <div className="flex items-center justify-center h-64 bg-primary/5 rounded-lg border border-primary/30">
                    <div className="text-center">
                      <div className="text-5xl mb-3">🔄</div>
                      <p className="text-muted-foreground">Run experiment to see results</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Measurement Distribution */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Measurement Distribution</h4>
                      <svg viewBox="0 0 300 200" className="w-full">
                        <defs>
                          <linearGradient id="bar0" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: "rgba(147, 112, 219, 1)" }} />
                            <stop offset="100%" style={{ stopColor: "rgba(147, 112, 219, 0.3)" }} />
                          </linearGradient>
                          <linearGradient id="bar1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: "rgba(32, 201, 201, 1)" }} />
                            <stop offset="100%" style={{ stopColor: "rgba(32, 201, 201, 0.3)" }} />
                          </linearGradient>
                        </defs>

                        {/* Y axis */}
                        <line x1="40" y1="20" x2="40" y2="170" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

                        {/* X axis */}
                        <line x1="40" y1="170" x2="280" y2="170" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

                        {/* Bars */}
                        <rect x="70" y={170 - (Number(prob0) * 1.5)} width="50" height={Number(prob0) * 1.5} fill="url(#bar0)" />
                        <rect x="180" y={170 - (Number(prob1) * 1.5)} width="50" height={Number(prob1) * 1.5} fill="url(#bar1)" />

                        {/* Labels */}
                        <text x="95" y="190" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.6)">
                          |0⟩
                        </text>
                        <text x="205" y="190" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.6)">
                          |1⟩
                        </text>

                        {/* Percentages */}
                        <text x="95" y={160 - (Number(prob0) * 1.5)} textAnchor="middle" fontSize="14" fill="rgba(255,255,255,0.8)" fontWeight="bold">
                          {prob0}%
                        </text>
                        <text x="205" y={160 - (Number(prob1) * 1.5)} textAnchor="middle" fontSize="14" fill="rgba(255,255,255,0.8)" fontWeight="bold">
                          {prob1}%
                        </text>
                      </svg>
                    </div>

                    {/* Statistics */}
                    <div className="bg-background/50 p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-3">Measurement Results</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">|0⟩ Counts:</span>
                          <span className="font-bold text-primary">{results.state0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">|1⟩ Counts:</span>
                          <span className="font-bold text-secondary">{results.state1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Instructions */}
            <div className="lg:col-span-1">
              <LabInstructions
                objective="Observe how quantum measurement collapses a superposition state into a definite outcome, and measure the probability distribution across multiple measurements."
                steps={[
                  "Set the number of measurements you want to perform (10-1000)",
                  "Click 'Run Experiment' to prepare qubits in superposition and measure them",
                  "The system will count how many times each state is measured",
                  "Compare the measurement counts to the theoretical 50-50 distribution",
                  "Repeat with different measurement counts to verify statistical behavior",
                ]}
                observations={[
                  "Each individual measurement returns either |0⟩ or |1⟩ (never both)",
                  "The distribution approaches 50-50 as you increase measurement count",
                  "This demonstrates the probabilistic nature of quantum mechanics",
                  "State collapse occurs instantaneously upon measurement",
                ]}
                tips={[
                  "With few measurements, results may deviate significantly from 50%",
                  "Larger sample sizes give more reliable probability estimates",
                  "This mirrors real quantum hardware behavior and statistical noise",
                  "Measurement destroys the superposition - subsequent measurements may differ",
                ]}
                videoCaption="Watch how quantum state collapse occurs during measurement"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
