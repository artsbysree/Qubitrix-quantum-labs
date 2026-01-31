import { useState } from "react";
import Layout from "@/components/Layout";

const gates = ["H", "X", "Y", "Z", "S", "T"];

export default function GatesLab() {
  const [circuitGates, setCircuitGates] = useState<string[]>([]);
  const [hasRun, setHasRun] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<{ state0: number; state1: number }>({ state0: 50, state1: 50 });

  const addGate = (gate: string) => {
    if (circuitGates.length < 5) {
      setCircuitGates([...circuitGates, gate]);
      setHasRun(false);
    }
  };

  const removeGate = (index: number) => {
    setCircuitGates(circuitGates.filter((_, i) => i !== index));
    setHasRun(false);
  };

  const clearCircuit = () => {
    setCircuitGates([]);
    setHasRun(false);
  };

  const runCircuit = () => {
    setIsRunning(true);
    setTimeout(() => {
      // Simulate results based on gates applied
      let prob0 = 50;
      circuitGates.forEach((gate) => {
        if (gate === "H") prob0 = 50;
        else if (gate === "X") prob0 = 100 - prob0;
        else if (gate === "Z") prob0 = prob0; // Phase gate
      });
      setResults({ state0: Math.round(prob0), state1: Math.round(100 - prob0) });
      setHasRun(true);
      setIsRunning(false);
    }, 1000);
  };

  const gateDescriptions: Record<string, string> = {
    H: "Hadamard - Creates superposition",
    X: "Pauli-X - Bit flip",
    Y: "Pauli-Y - Rotate around Y",
    Z: "Pauli-Z - Phase flip",
    S: "S gate - Quarter phase",
    T: "T gate - Eighth phase",
  };

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
            <h1 className="text-4xl font-bold mb-2">🔧 Gates Playground</h1>
            <p className="text-muted-foreground">Build and visualize quantum circuits with drag-and-drop gates</p>
          </div>

          {/* Lab Objective */}
          <div className="mb-8 p-6 rounded-xl bg-primary/10 border border-primary/30">
            <h2 className="text-xl font-bold text-foreground mb-3">🎯 Lab Objective</h2>
            <p className="text-muted-foreground leading-relaxed">
              Learn how quantum gates transform qubit states. In this lab, you'll build quantum circuits by selecting 
              gates and applying them in sequence. Watch how each gate operation affects the measurement probabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left - Gate Selection */}
            <div className="lg:col-span-1 space-y-6">
              {/* Instructions */}
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-4">📋 How to Use</h3>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">1.</span>
                    <span>Click gate buttons to add them to your circuit (max 5)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">2.</span>
                    <span>Gates are applied from left to right</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">3.</span>
                    <span>Click "Run Circuit" to simulate and see results</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">4.</span>
                    <span>Use "Clear" to start over</span>
                  </li>
                </ol>
              </div>

              {/* Gate Palette */}
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-4">Gate Palette</h3>
                <div className="grid grid-cols-2 gap-3">
                  {gates.map((gate) => (
                    <button
                      key={gate}
                      onClick={() => addGate(gate)}
                      disabled={circuitGates.length >= 5}
                      title={gateDescriptions[gate]}
                      className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 text-foreground font-bold hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {gate}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  {circuitGates.length}/5 gates selected
                </p>
              </div>

              {/* Tips */}
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-3">💡 Pro Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• H gate creates 50-50 superposition</li>
                  <li>• X gate flips the state (0→1, 1→0)</li>
                  <li>• Combining gates creates interference</li>
                  <li>• Try H→H to see interference</li>
                </ul>
              </div>
            </div>

            {/* Center - Circuit */}
            <div className="lg:col-span-1">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-4">Circuit Builder</h3>

                {/* Circuit Display */}
                <div className="bg-background/50 rounded-lg p-6 mb-6 min-h-32">
                  {circuitGates.length === 0 ? (
                    <div className="flex items-center justify-center h-32 text-muted-foreground text-center">
                      <p>Click gates on the left to build your circuit</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {circuitGates.map((gate, idx) => (
                          <button
                            key={idx}
                            onClick={() => removeGate(idx)}
                            className="relative group"
                          >
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-primary-foreground">
                              {gate}
                            </div>
                            <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-5 h-5 bg-destructive rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer">
                                ×
                              </div>
                            </div>
                          </button>
                        ))}
                        {circuitGates.length > 0 && (
                          <div className="flex items-center">
                            <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        )}
                        <div className="flex items-center text-sm font-mono text-muted-foreground">
                          M
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground text-center">
                        {circuitGates.length} gate{circuitGates.length !== 1 ? "s" : ""} in circuit
                      </div>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={runCircuit}
                    disabled={circuitGates.length === 0 || isRunning}
                    className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50"
                  >
                    {isRunning ? "Simulating..." : "Run Circuit"}
                  </button>
                  <button
                    onClick={clearCircuit}
                    className="w-full py-2 px-4 border border-border text-muted-foreground rounded-lg hover:bg-muted transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Right - Results */}
            <div className="lg:col-span-1">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-4">Results</h3>

                {!hasRun ? (
                  <div className="flex items-center justify-center h-64 bg-primary/5 rounded-lg border border-primary/30">
                    <div className="text-center">
                      <div className="text-4xl mb-3">⚛️</div>
                      <p className="text-muted-foreground">Build a circuit and run it</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Probability Bars */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-4">Measurement Probabilities</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-xs text-muted-foreground">|0⟩</span>
                            <span className="text-sm font-bold text-primary">{results.state0}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3">
                            <div
                              className="h-3 rounded-full bg-primary transition-all duration-500"
                              style={{ width: `${results.state0}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-xs text-muted-foreground">|1⟩</span>
                            <span className="text-sm font-bold text-secondary">{results.state1}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3">
                            <div
                              className="h-3 rounded-full bg-secondary transition-all duration-500"
                              style={{ width: `${results.state1}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interpretation */}
                    <div className="p-4 bg-background/50 rounded-lg border border-border">
                      <p className="text-xs text-muted-foreground mb-2">Interpretation</p>
                      <p className="text-sm text-foreground leading-relaxed">
                        If you measure this circuit 100 times, you'll get |0⟩ about {results.state0} times 
                        and |1⟩ about {results.state1} times.
                      </p>
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
                <h3 className="font-semibold text-foreground mb-2">✓ Quantum Gates</h3>
                <p className="text-muted-foreground">Understand how each gate transforms qubit states</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">✓ Circuit Building</h3>
                <p className="text-muted-foreground">Learn to compose gates into meaningful circuits</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">✓ Measurement</h3>
                <p className="text-muted-foreground">See how circuit outcomes translate to probabilities</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">✓ Quantum Interference</h3>
                <p className="text-muted-foreground">Observe how gates can amplify or cancel states</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
