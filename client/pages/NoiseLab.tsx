import { useState } from "react";
import Layout from "@/components/Layout";

export default function NoiseLab() {
  const [noiseLevel, setNoiseLevel] = useState(20);
  const [numMeasurements, setNumMeasurements] = useState(100);
  const [hasRun, setHasRun] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<{ ideal: number; actual: number }>({
    ideal: 50,
    actual: 50,
  });

  const handleRunExperiment = () => {
    setIsRunning(true);
    setTimeout(() => {
      // Ideal is 50%, but noise distorts it
      const noiseFactor = noiseLevel / 100;
      const distortion = (Math.random() - 0.5) * noiseFactor * 100;
      const actual = Math.max(0, Math.min(100, 50 + distortion));

      setResults({ ideal: 50, actual: Math.round(actual) });
      setHasRun(true);
      setIsRunning(false);
    }, 1000);
  };

  const fidelity = 100 - Math.abs(results.ideal - results.actual);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <a
              href="/labs"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Labs
            </a>
            <h1 className="text-4xl font-bold mb-2">📊 Noise Simulation Lab</h1>
            <p className="text-muted-foreground">
              Understand quantum decoherence and real-world quantum errors
            </p>
          </div>

          {/* Lab Objective */}
          <div className="mb-8 p-6 rounded-xl bg-primary/10 border border-primary/30">
            <h2 className="text-xl font-bold text-foreground mb-3">
              🎯 Lab Objective
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Real quantum computers experience noise and decoherence - unwanted
              interactions that corrupt quantum states. In this lab, you'll see
              how environmental noise affects quantum operations and why error
              correction is essential for building practical quantum computers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left - Controls */}
            <div className="lg:col-span-1 space-y-6">
              {/* Instructions */}
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  📋 Steps
                </h3>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">1.</span>
                    <span>Adjust the noise level slider (0-100%)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">2.</span>
                    <span>Set number of measurements to perform</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">3.</span>
                    <span>Click "Run Experiment" to simulate measurements</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">4.</span>
                    <span>Compare ideal vs actual results</span>
                  </li>
                </ol>
              </div>

              {/* Controls */}
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Experiment Settings
                </h3>
                <div className="space-y-5">
                  {/* Noise Level */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold text-foreground">
                        Noise Level
                      </label>
                      <span className="text-sm text-primary font-bold">
                        {noiseLevel}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={noiseLevel}
                      onChange={(e) => setNoiseLevel(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      {noiseLevel === 0 && "Perfect quantum environment"}
                      {noiseLevel > 0 &&
                        noiseLevel < 30 &&
                        "Low noise - good quantum gate fidelity"}
                      {noiseLevel >= 30 &&
                        noiseLevel < 70 &&
                        "Moderate noise - significant errors"}
                      {noiseLevel >= 70 &&
                        "High noise - quantum advantage unlikely"}
                    </p>
                  </div>

                  {/* Measurements */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold text-foreground">
                        Measurements
                      </label>
                      <span className="text-sm font-bold text-secondary">
                        {numMeasurements}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="1000"
                      step="10"
                      value={numMeasurements}
                      onChange={(e) =>
                        setNumMeasurements(Number(e.target.value))
                      }
                      className="w-full accent-secondary"
                    />
                  </div>

                  <button
                    onClick={handleRunExperiment}
                    disabled={isRunning}
                    className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50"
                  >
                    {isRunning ? "Simulating..." : "Run Experiment"}
                  </button>
                </div>
              </div>

              {/* Noise Sources */}
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  🌍 Real Noise Sources
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Temperature fluctuations</li>
                  <li>• Electromagnetic radiation</li>
                  <li>• Physical vibrations</li>
                  <li>• Material imperfections</li>
                  <li>• Gate operation errors</li>
                </ul>
              </div>
            </div>

            {/* Center - Bloch Sphere */}
            <div className="lg:col-span-1">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-6">
                  State Degradation
                </h3>

                {!hasRun ? (
                  <div className="flex items-center justify-center h-64 bg-background/50 rounded-lg border border-border">
                    <p className="text-muted-foreground text-center">
                      Run experiment to visualize noise effects
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Bloch Sphere Visual */}
                    <svg viewBox="0 0 300 300" className="w-full">
                      <defs>
                        <radialGradient id="noiseSphere">
                          <stop
                            offset="0%"
                            style={{ stopColor: "rgba(147, 112, 219, 0.1)" }}
                          />
                          <stop
                            offset="100%"
                            style={{ stopColor: "rgba(32, 201, 201, 0.05)" }}
                          />
                        </radialGradient>
                      </defs>

                      {/* Sphere */}
                      <circle
                        cx="150"
                        cy="150"
                        r="100"
                        fill="url(#noiseSphere)"
                        stroke="rgba(147, 112, 219, 0.3)"
                        strokeWidth="2"
                      />

                      {/* Ideal state */}
                      <line
                        x1="150"
                        y1="150"
                        x2="150"
                        y2="50"
                        stroke="rgba(147, 112, 219, 0.6)"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                      <circle
                        cx="150"
                        cy="50"
                        r="5"
                        fill="rgba(147, 112, 219, 0.8)"
                      />

                      {/* Noise cloud */}
                      <circle
                        cx="150"
                        cy={70 + (noiseLevel / 100) * 30}
                        r={10 + (noiseLevel / 100) * 20}
                        fill="none"
                        stroke="rgba(255, 0, 0, 0.3)"
                        strokeWidth="2"
                        strokeDasharray="3,3"
                      />

                      {/* Actual measurement */}
                      <circle
                        cx="150"
                        cy={70 + (noiseLevel / 100) * 30}
                        r="6"
                        fill="rgba(255, 100, 100, 0.9)"
                      />

                      {/* Labels */}
                      <text
                        x="150"
                        y="280"
                        textAnchor="middle"
                        fontSize="12"
                        fill="rgba(255,255,255,0.6)"
                      >
                        Noise Effect Visualization
                      </text>
                    </svg>

                    {/* Comparison */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <p className="text-xs text-muted-foreground mb-1">
                          Ideal Result
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          {results.ideal}%
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          |0⟩ probability
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                        <p className="text-xs text-muted-foreground mb-1">
                          With Noise
                        </p>
                        <p className="text-2xl font-bold text-destructive">
                          {results.actual}%
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Measured probability
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right - Analysis */}
            <div className="lg:col-span-1">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Analysis & Metrics
                </h3>

                {!hasRun ? (
                  <div className="flex items-center justify-center h-64 bg-background/50 rounded-lg border border-border">
                    <p className="text-muted-foreground text-center">
                      Metrics will appear after running experiment
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Fidelity */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-foreground">
                          Gate Fidelity
                        </span>
                        <span className="text-sm font-bold text-primary">
                          {fidelity.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div
                          className="h-3 rounded-full bg-gradient-to-r from-primary to-secondary transition-all"
                          style={{ width: `${fidelity}%` }}
                        />
                      </div>
                    </div>

                    {/* Error Info */}
                    <div className="p-4 bg-background/50 rounded-lg border border-border">
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        Error Impact
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Difference from ideal:{" "}
                        {Math.abs(results.ideal - results.actual)}%
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {noiseLevel < 1 &&
                          "✓ Excellent - ideal quantum computer"}
                        {noiseLevel >= 1 &&
                          noiseLevel < 10 &&
                          "✓ Very good - research quantum computers"}
                        {noiseLevel >= 10 &&
                          noiseLevel < 30 &&
                          "⚠ Good - practical systems"}
                        {noiseLevel >= 30 && "✗ Poor - error correction needed"}
                      </p>
                    </div>

                    {/* Recommendations */}
                    <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        Recommendations
                      </h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {noiseLevel > 30 && (
                          <li>• Consider error correction codes</li>
                        )}
                        {noiseLevel > 50 && (
                          <li>• Multiple redundant qubits needed</li>
                        )}
                        {noiseLevel < 10 && (
                          <li>• Good for practical algorithms</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Learning Section */}
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-xl border border-primary/30 p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              📚 What You'll Learn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  ✓ Decoherence
                </h3>
                <p className="text-muted-foreground">
                  How quantum states lose their quantum properties
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  ✓ Noise Sources
                </h3>
                <p className="text-muted-foreground">
                  Real-world sources of quantum errors
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  ✓ Gate Fidelity
                </h3>
                <p className="text-muted-foreground">
                  Measure how accurately quantum gates work
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  ✓ Error Correction
                </h3>
                <p className="text-muted-foreground">
                  Why quantum error correction is crucial
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
