import { useState } from "react";
import Layout from "@/components/Layout";
import LabInstructions from "@/components/LabInstructions";

export default function SuperpositionLab() {
  const [amplitude0, setAmplitude0] = useState(0.7);
  const [amplitude1, setAmplitude1] = useState(0.3);
  const [phase, setPhase] = useState(0);

  const prob0 = Math.pow(amplitude0, 2);
  const prob1 = Math.pow(amplitude1, 2);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <a href="/labs" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Labs
            </a>
            <h1 className="text-4xl font-bold mb-2">Superposition Control</h1>
            <p className="text-muted-foreground">
              Create and manipulate quantum superposition states with precise amplitude control
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Controls */}
            <div className="lg:col-span-1 space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-4">Superposition Controls</h3>
                <div className="space-y-5">
                  {/* Amplitude 0 */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold text-foreground">Amplitude |0⟩</label>
                      <span className="text-sm text-primary font-bold">{amplitude0.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={amplitude0}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setAmplitude0(val);
                        setAmplitude1(Math.sqrt(Math.max(0, 1 - val * val)));
                      }}
                      className="w-full accent-primary"
                    />
                  </div>

                  {/* Amplitude 1 */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold text-foreground">Amplitude |1⟩</label>
                      <span className="text-sm text-secondary font-bold">{amplitude1.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={amplitude1}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setAmplitude1(val);
                        setAmplitude0(Math.sqrt(Math.max(0, 1 - val * val)));
                      }}
                      className="w-full accent-secondary"
                    />
                  </div>

                  {/* Phase */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold text-foreground">Phase</label>
                      <span className="text-sm text-accent font-bold">{(phase * 180 / Math.PI).toFixed(0)}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={Math.PI * 2}
                      step="0.1"
                      value={phase}
                      onChange={(e) => setPhase(Number(e.target.value))}
                      className="w-full accent-accent"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-3">State Probabilities</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">|0⟩</span>
                      <span className="font-bold text-primary">{(prob0 * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-primary transition-all"
                        style={{ width: `${prob0 * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">|1⟩</span>
                      <span className="font-bold text-secondary">{(prob1 * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-secondary transition-all"
                        style={{ width: `${prob1 * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center - Visualization */}
            <div className="lg:col-span-1">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-6">State Vector</h3>
                <svg viewBox="0 0 300 300" className="w-full">
                  <defs>
                    <linearGradient id="circle" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "rgba(147, 112, 219, 0.3)" }} />
                      <stop offset="100%" style={{ stopColor: "rgba(32, 201, 201, 0.3)" }} />
                    </linearGradient>
                  </defs>

                  {/* Unit circle */}
                  <circle cx="150" cy="150" r="100" fill="none" stroke="url(#circle)" strokeWidth="2" />

                  {/* Axes */}
                  <line x1="150" y1="50" x2="150" y2="250" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <line x1="50" y1="150" x2="250" y2="150" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                  {/* State vector */}
                  <line
                    x1="150"
                    y1="150"
                    x2={150 + amplitude0 * 100 * Math.cos(phase)}
                    y2={150 - amplitude0 * 100 * Math.sin(phase)}
                    stroke="rgba(147, 112, 219, 0.8)"
                    strokeWidth="2"
                  />
                  <circle
                    cx={150 + amplitude0 * 100 * Math.cos(phase)}
                    cy={150 - amplitude0 * 100 * Math.sin(phase)}
                    r="6"
                    fill="rgba(147, 112, 219, 1)"
                  />

                  {/* Labels */}
                  <text x="150" y="40" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.6)">
                    |0⟩
                  </text>
                  <text x="260" y="155" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.6)">
                    Phase
                  </text>
                </svg>

                <div className="mt-6 p-4 bg-background/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">Quantum State</p>
                  <p className="text-sm font-mono text-primary">
                    |ψ⟩ = {amplitude0.toFixed(2)}|0⟩ + {amplitude1.toFixed(2)}e^(i{(phase * 180 / Math.PI).toFixed(0)}°)|1⟩
                  </p>
                </div>
              </div>
            </div>

            {/* Right Panel - Instructions */}
            <div className="lg:col-span-1">
              <LabInstructions
                objective="Learn how to create and control quantum superposition states by adjusting amplitude coefficients and relative phases."
                steps={[
                  "Use the amplitude sliders to set the strength of |0⟩ and |1⟩ states",
                  "Notice how amplitudes are normalized (their squares sum to 1)",
                  "Adjust the phase angle to add quantum phase to the state",
                  "Observe how the state vector rotates on the complex plane",
                  "Try creating specific superpositions like 50-50 or 70-30 distributions",
                ]}
                observations={[
                  "Amplitude squared gives the measurement probability for that state",
                  "Phase changes don't affect measurement probabilities directly",
                  "The total amplitude is always normalized to 1",
                  "Different phase relationships create different interference patterns",
                ]}
                tips={[
                  "Try setting equal amplitudes (0.707, 0.707) for 50-50 superposition",
                  "Phase becomes important when combining multiple qubits (interference)",
                  "This is the foundation for quantum algorithms like Grover's search",
                  "Experiment with extreme values to see probability limits",
                ]}
                videoCaption="Learn how quantum superposition works with interactive controls"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
