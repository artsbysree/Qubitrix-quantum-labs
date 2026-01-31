import { useState } from "react";
import Layout from "@/components/Layout";

interface QubitState {
  theta: number;
  phi: number;
}

export default function QubitLab() {
  const [qubitState, setQubitState] = useState<QubitState>({ theta: 0, phi: 0 });
  const [history, setHistory] = useState<QubitState[]>([{ theta: 0, phi: 0 }]);
  const [instructionsOpen, setInstructionsOpen] = useState(true);

  const applyGate = (gate: string) => {
    let newState = { ...qubitState };

    switch (gate) {
      case "H":
        // Hadamard - rotate around (X+Z)/sqrt(2)
        newState.theta = Math.PI / 2 - qubitState.theta;
        newState.phi = Math.PI / 2;
        break;
      case "X":
        // Pauli X - flip around X axis
        newState.theta = Math.PI - qubitState.theta;
        newState.phi = qubitState.phi + Math.PI;
        break;
      case "Y":
        // Pauli Y - flip around Y axis
        newState.theta = Math.PI - qubitState.theta;
        newState.phi = qubitState.phi;
        break;
      case "Z":
        // Pauli Z - add phase
        newState.phi = qubitState.phi + Math.PI;
        break;
    }

    setQubitState(newState);
    setHistory([...history, newState]);
  };

  const resetState = () => {
    const initial = { theta: 0, phi: 0 };
    setQubitState(initial);
    setHistory([initial]);
  };

  const getBlochCoordinates = (state: QubitState) => {
    const x = Math.sin(state.theta) * Math.cos(state.phi);
    const y = Math.sin(state.theta) * Math.sin(state.phi);
    const z = Math.cos(state.theta);
    return { x, y, z };
  };

  const coords = getBlochCoordinates(qubitState);
  const prob0 = Math.pow(Math.cos(qubitState.theta / 2), 2);
  const prob1 = Math.pow(Math.sin(qubitState.theta / 2), 2);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Qubit Lab</h1>
            <p className="text-muted-foreground">Interactive Bloch Sphere visualization and gate operations</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Controls and Instructions */}
            <div className="lg:col-span-1 space-y-6">
              {/* Gate Controls */}
              <div className="p-6 rounded-xl border border-border bg-gradient-to-br from-card to-card/50">
                <h3 className="text-lg font-bold text-foreground mb-4">Quantum Gates</h3>
                <div className="grid grid-cols-2 gap-3">
                  {["H", "X", "Y", "Z"].map((gate) => (
                    <button
                      key={gate}
                      onClick={() => applyGate(gate)}
                      className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 text-foreground font-bold hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20 transition-all"
                    >
                      {gate} Gate
                    </button>
                  ))}
                </div>
                <button
                  onClick={resetState}
                  className="w-full mt-4 py-2 px-4 rounded-lg bg-muted/50 border border-border hover:bg-muted transition-colors text-foreground font-semibold"
                >
                  Reset State
                </button>
              </div>

              {/* State Display */}
              <div className="p-6 rounded-xl border border-border bg-gradient-to-br from-card to-card/50">
                <h3 className="text-lg font-bold text-foreground mb-4">Qubit State</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">θ (Theta)</p>
                    <p className="text-2xl font-bold text-primary">{(qubitState.theta * 180 / Math.PI).toFixed(1)}°</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">φ (Phi)</p>
                    <p className="text-2xl font-bold text-secondary">{(qubitState.phi * 180 / Math.PI).toFixed(1)}°</p>
                  </div>
                </div>
              </div>

              {/* Measurement Probabilities */}
              <div className="p-6 rounded-xl border border-border bg-gradient-to-br from-card to-card/50">
                <h3 className="text-lg font-bold text-foreground mb-4">Measurement</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-muted-foreground">|0⟩</span>
                      <span className="text-primary font-bold">{(prob0 * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="h-3 rounded-full bg-primary transition-all duration-300"
                        style={{ width: `${prob0 * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-muted-foreground">|1⟩</span>
                      <span className="text-secondary font-bold">{(prob1 * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="h-3 rounded-full bg-secondary transition-all duration-300"
                        style={{ width: `${prob1 * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center - Bloch Sphere */}
            <div className="lg:col-span-1">
              <div className="p-6 rounded-xl border border-border bg-gradient-to-br from-card to-card/50 aspect-square flex items-center justify-center">
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "rgba(147, 112, 219, 0.3)" }} />
                      <stop offset="100%" style={{ stopColor: "rgba(32, 201, 201, 0.3)" }} />
                    </linearGradient>
                    <filter id="glow2">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Sphere outline */}
                  <circle cx="200" cy="200" r="120" fill="none" stroke="url(#grad)" strokeWidth="2" />

                  {/* Axes */}
                  <line x1="200" y1="80" x2="200" y2="320" stroke="rgba(147, 112, 219, 0.3)" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="80" y1="200" x2="320" y2="200" stroke="rgba(147, 112, 219, 0.3)" strokeWidth="1" strokeDasharray="2,2" />

                  {/* Axis labels */}
                  <text x="200" y="70" textAnchor="middle" fontSize="12" fill="rgba(147, 112, 219, 0.6)" fontFamily="sans-serif">Z</text>
                  <text x="330" y="210" textAnchor="middle" fontSize="12" fill="rgba(32, 201, 201, 0.6)" fontFamily="sans-serif">X</text>

                  {/* State vector */}
                  <g filter="url(#glow2)">
                    <line
                      x1="200"
                      y1="200"
                      x2={200 + coords.x * 120}
                      y2={200 - coords.z * 120}
                      stroke="url(#grad)"
                      strokeWidth="3"
                    />
                    <circle
                      cx={200 + coords.x * 120}
                      cy={200 - coords.z * 120}
                      r="8"
                      fill="rgba(147, 112, 219, 1)"
                    />
                  </g>

                  {/* Center point */}
                  <circle cx="200" cy="200" r="3" fill="rgba(255, 255, 255, 0.6)" />
                </svg>
              </div>
            </div>

            {/* Right Panel - Instructions and History */}
            <div className="lg:col-span-1 space-y-6">
              {/* Instructions */}
              <div className="rounded-xl border border-border bg-gradient-to-br from-card to-card/50 overflow-hidden">
                <button
                  onClick={() => setInstructionsOpen(!instructionsOpen)}
                  className="w-full p-6 flex items-center justify-between hover:bg-primary/5 transition-colors"
                >
                  <h3 className="font-bold text-foreground">How to Use</h3>
                  <svg
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      instructionsOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                {instructionsOpen && (
                  <div className="px-6 py-6 border-t border-border bg-background/50 text-sm space-y-3 text-muted-foreground">
                    <ol className="space-y-2 list-decimal list-inside">
                      <li>Click quantum gates (H, X, Y, Z) to apply operations</li>
                      <li>Watch the Bloch sphere update in real-time</li>
                      <li>Observe measurement probabilities for |0⟩ and |1⟩</li>
                      <li>Click Reset to return to the ground state</li>
                    </ol>
                  </div>
                )}
              </div>

              {/* Operation History */}
              <div className="p-6 rounded-xl border border-border bg-gradient-to-br from-card to-card/50">
                <h3 className="text-lg font-bold text-foreground mb-4">History</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {history.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No operations yet</p>
                  ) : (
                    history.map((state, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-xs font-mono text-primary"
                      >
                        Step {idx}: θ={state.theta.toFixed(2)}, φ={state.phi.toFixed(2)}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
