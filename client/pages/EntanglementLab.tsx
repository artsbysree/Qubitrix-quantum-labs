import { useState } from "react";
import Layout from "@/components/Layout";

const bellStates = [
  { name: "Bell State |Φ+⟩", desc: "Maximally entangled - both 0 or both 1", formula: "(|00⟩ + |11⟩)/√2" },
  { name: "Bell State |Φ-⟩", desc: "Maximally entangled with phase", formula: "(|00⟩ - |11⟩)/√2" },
  { name: "Bell State |Ψ+⟩", desc: "Maximally entangled - opposite states", formula: "(|01⟩ + |10⟩)/√2" },
  { name: "Bell State |Ψ-⟩", desc: "Maximally entangled with phase", formula: "(|01⟩ - |10⟩)/√2" },
];

export default function EntanglementLab() {
  const [selectedState, setSelectedState] = useState(0);
  const [hasMeasured, setHasMeasured] = useState(false);
  const [results, setResults] = useState<{ qubit1: string; qubit2: string }>({ qubit1: "", qubit2: "" });
  const [measurements, setMeasurements] = useState<string[]>([]);

  const measureState = () => {
    const state = selectedState;
    let qubit1: string, qubit2: string;

    if (state === 0) {
      const r = Math.random();
      qubit1 = r < 0.5 ? "0" : "1";
      qubit2 = qubit1; // Always same as first
    } else if (state === 1) {
      const r = Math.random();
      qubit1 = r < 0.5 ? "0" : "1";
      qubit2 = qubit1; // Always same as first
    } else if (state === 2) {
      const r = Math.random();
      qubit1 = r < 0.5 ? "0" : "1";
      qubit2 = qubit1 === "0" ? "1" : "0"; // Always opposite
    } else {
      const r = Math.random();
      qubit1 = r < 0.5 ? "0" : "1";
      qubit2 = qubit1 === "0" ? "1" : "0"; // Always opposite
    }

    setResults({ qubit1, qubit2 });
    setMeasurements([...measurements, `${qubit1}${qubit2}`]);
    setHasMeasured(true);
  };

  const reset = () => {
    setHasMeasured(false);
    setResults({ qubit1: "", qubit2: "" });
    setMeasurements([]);
  };

  const state0Prob = measurements.filter((m) => m[0] === "0").length;
  const state1Prob = measurements.filter((m) => m[0] === "1").length;

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
            <h1 className="text-4xl font-bold mb-2">🔗 Entanglement Lab</h1>
            <p className="text-muted-foreground">Explore quantum entanglement and Bell states</p>
          </div>

          {/* Lab Objective */}
          <div className="mb-8 p-6 rounded-xl bg-primary/10 border border-primary/30">
            <h2 className="text-xl font-bold text-foreground mb-3">🎯 Lab Objective</h2>
            <p className="text-muted-foreground leading-relaxed">
              Learn about quantum entanglement - a phenomenon where two qubits become correlated such that measuring 
              one instantly affects the other. You'll create Bell states (maximally entangled states) and observe 
              the quantum correlations that make entanglement so powerful.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left - State Selection */}
            <div className="lg:col-span-1 space-y-6">
              {/* Instructions */}
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-4">📋 Steps</h3>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">1.</span>
                    <span>Select a Bell state from the options below</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">2.</span>
                    <span>Click "Measure" to perform quantum measurement</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">3.</span>
                    <span>Notice that Qubit 2 is always correlated with Qubit 1</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">4.</span>
                    <span>Repeat measurements to observe the pattern</span>
                  </li>
                </ol>
              </div>

              {/* State Selection */}
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-4">Select Bell State</h3>
                <div className="space-y-2">
                  {bellStates.map((state, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedState(idx);
                        reset();
                      }}
                      className={`w-full p-4 rounded-lg border transition-all text-left ${
                        selectedState === idx
                          ? "bg-primary/20 border-primary/60"
                          : "bg-background/50 border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="font-semibold text-foreground mb-1">{state.name}</div>
                      <div className="text-xs text-muted-foreground">{state.desc}</div>
                      <div className="text-xs text-primary mt-2 font-mono">{state.formula}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Key Concept */}
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-3">🔑 Key Concept</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  In an entangled state, measuring one qubit instantaneously determines the outcome for the other, 
                  regardless of distance. This "spooky action at a distance" is what Einstein famously questioned!
                </p>
              </div>
            </div>

            {/* Center - Visualization */}
            <div className="lg:col-span-1">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-6">Entanglement Visualization</h3>

                {/* Qubits */}
                <div className="space-y-6">
                  {/* Qubit 1 */}
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-3">Qubit 1</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-20 bg-primary/10 rounded-lg border border-primary/30 flex items-center justify-center">
                        {hasMeasured ? (
                          <span className="text-4xl font-bold text-primary">{results.qubit1}</span>
                        ) : (
                          <span className="text-muted-foreground">|?⟩</span>
                        )}
                      </div>
                      {hasMeasured && (
                        <svg className="w-6 h-6 text-secondary animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Connection */}
                  <div className="flex justify-center">
                    <div className="h-8 border-l-2 border-r-2 border-b-2 border-secondary w-32 rounded-b-lg flex items-center justify-center">
                      <span className="text-xs text-secondary font-semibold">Entangled</span>
                    </div>
                  </div>

                  {/* Qubit 2 */}
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-3">Qubit 2</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-20 bg-secondary/10 rounded-lg border border-secondary/30 flex items-center justify-center">
                        {hasMeasured ? (
                          <span className="text-4xl font-bold text-secondary">{results.qubit2}</span>
                        ) : (
                          <span className="text-muted-foreground">|?⟩</span>
                        )}
                      </div>
                      {hasMeasured && (
                        <svg className="w-6 h-6 text-primary animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-2 mt-6">
                  <button
                    onClick={measureState}
                    className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all"
                  >
                    Measure Entangled State
                  </button>
                  <button
                    onClick={reset}
                    className="w-full py-2 px-4 border border-border text-muted-foreground rounded-lg hover:bg-muted transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Right - Statistics */}
            <div className="lg:col-span-1">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-4">Measurement History</h3>

                {measurements.length === 0 ? (
                  <div className="flex items-center justify-center h-64 bg-background/50 rounded-lg border border-border">
                    <p className="text-muted-foreground text-center">Perform measurements to see results</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Recent Measurements */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Recent Measurements</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {measurements.slice(-10).map((m, idx) => (
                          <div key={idx} className="p-2 rounded bg-background/50 text-center font-mono text-sm text-primary">
                            Qubit1: {m[0]} → Qubit2: {m[1]}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Correlation Analysis */}
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <h4 className="text-sm font-semibold text-foreground mb-2">Correlation</h4>
                      <p className="text-xs text-muted-foreground mb-3">
                        Perfect correlation - measuring one qubit determines the other!
                      </p>
                      <div className="text-xs text-center text-primary font-bold">
                        {measurements.length} measurements performed
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Learning Section */}
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-xl border border-primary/30 p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">📚 What You'll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">✓ Bell States</h3>
                <p className="text-muted-foreground">Understand the four maximally entangled two-qubit states</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">✓ Quantum Correlation</h3>
                <p className="text-muted-foreground">See how measurements are perfectly correlated</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">✓ Non-locality</h3>
                <p className="text-muted-foreground">Explore the mysterious nature of quantum entanglement</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">✓ Quantum Power</h3>
                <p className="text-muted-foreground">Learn why entanglement is a key quantum resource</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
