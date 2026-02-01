import { useState } from "react";
import Layout from "@/components/Layout";

interface GateOperation {
  gate: string;
  qubit: number;
}

export default function GatesLab() {
  const [gates, setGates] = useState<GateOperation[]>([]);
  const [measurements, setMeasurements] = useState<number[]>([0, 0]);
  const [totalMeasurements, setTotalMeasurements] = useState(1000);

  const gateOptions = [
    { name: "H", label: "Hadamard", description: "Creates superposition" },
    { name: "X", label: "Pauli-X", description: "Bit flip" },
    { name: "Y", label: "Pauli-Y", description: "Flip about Y-axis" },
    { name: "Z", label: "Pauli-Z", description: "Phase flip" },
    { name: "S", label: "S Gate", description: "Phase gate" },
    { name: "T", label: "T Gate", description: "π/8 gate" },
  ];

  const addGate = (gate: string) => {
    setGates([...gates, { gate, qubit: 0 }]);
    simulateCircuit([...gates, { gate, qubit: 0 }]);
  };

  const simulateCircuit = (circuit: GateOperation[]) => {
    // Simple simulation: count how many H gates (creates 50/50 distribution)
    const hCount = circuit.filter((g) => g.gate === "H").length;
    const xCount = circuit.filter((g) => g.gate === "X").length;

    // H gate creates 50/50 superposition
    if (hCount > 0 && xCount === 0) {
      setMeasurements([
        Math.floor(totalMeasurements / 2),
        Math.floor(totalMeasurements / 2),
      ]);
    }
    // X gate flips to |1⟩
    else if (xCount > 0 && hCount === 0) {
      setMeasurements([0, totalMeasurements]);
    }
    // H then X creates |1⟩ superposition
    else if (hCount > 0 && xCount > 0) {
      setMeasurements([
        Math.floor(totalMeasurements / 2),
        Math.floor(totalMeasurements / 2),
      ]);
    }
    // No gates: starts in |0⟩
    else {
      setMeasurements([totalMeasurements, 0]);
    }
  };

  const clearCircuit = () => {
    setGates([]);
    setMeasurements([totalMeasurements, 0]);
  };

  const removeLastGate = () => {
    const newGates = gates.slice(0, -1);
    setGates(newGates);
    simulateCircuit(newGates);
  };

  const results = [
    {
      state: "|0⟩",
      count: measurements[0],
      probability: ((measurements[0] / totalMeasurements) * 100).toFixed(1),
    },
    {
      state: "|1⟩",
      count: measurements[1],
      probability: ((measurements[1] / totalMeasurements) * 100).toFixed(1),
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Quantum Gates Playground
            </h1>
            <p className="text-muted-foreground text-lg">
              Build quantum circuits by applying gates to your qubit
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Instructions & Gate Palette */}
            <div className="lg:col-span-1 space-y-6">
              {/* Objective */}
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-bold text-foreground mb-3">Objective</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Construct a quantum circuit by applying quantum gates. Observe
                  how different gate combinations affect measurement outcomes.
                </p>
              </div>

              {/* Instructions */}
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-bold text-foreground mb-3">How to Use</h3>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Click gates below to add them to your circuit</li>
                  <li>Watch the circuit update in real-time</li>
                  <li>See measurement results change instantly</li>
                  <li>Use "Clear Circuit" to reset and start over</li>
                </ol>
              </div>

              {/* Gate Palette */}
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-bold text-foreground mb-4">Gate Palette</h3>
                <div className="space-y-3">
                  {gateOptions.map((gate) => (
                    <button
                      key={gate.name}
                      onClick={() => addGate(gate.name)}
                      className="w-full text-left p-3 rounded-lg bg-primary/20 hover:bg-primary/30 transition-colors border border-primary/30"
                    >
                      <div className="font-semibold text-primary text-sm">
                        {gate.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {gate.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="p-6 rounded-xl border border-border/50 bg-secondary/10">
                <h4 className="font-semibold text-secondary text-sm mb-2">
                  💡 Pro Tip
                </h4>
                <p className="text-xs text-muted-foreground">
                  The Hadamard gate (H) creates superposition. Try applying H
                  first, then other gates!
                </p>
              </div>
            </div>

            {/* Right: Circuit & Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Circuit Visualization */}
              <div className="p-8 rounded-xl border border-border bg-gradient-to-br from-card to-card/50">
                <h3 className="font-bold text-foreground mb-6">Circuit</h3>

                <div className="bg-background/50 rounded-lg p-6 mb-6 min-h-32">
                  {gates.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground text-sm">
                        Start by adding gates from the palette →
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Qubit line */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 font-mono text-sm text-muted-foreground">
                          q₀
                        </div>
                        <div className="flex-1 flex items-center gap-2">
                          <div className="h-1 flex-1 bg-border"></div>

                          {gates.map((op, idx) => (
                            <div
                              key={idx}
                              className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center rounded font-bold text-sm border border-primary"
                            >
                              {op.gate}
                            </div>
                          ))}

                          <div className="h-1 flex-1 bg-border"></div>
                          <div className="w-12 h-8 border border-muted-foreground flex items-center justify-center text-xs font-semibold text-muted-foreground rounded">
                            M
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Circuit Controls */}
                <div className="flex gap-3">
                  {gates.length > 0 && (
                    <button
                      onClick={removeLastGate}
                      className="px-4 py-2 rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors text-sm font-semibold"
                    >
                      ← Undo Last
                    </button>
                  )}
                  <button
                    onClick={clearCircuit}
                    className="px-4 py-2 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors text-sm font-semibold"
                  >
                    Clear Circuit
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className="p-8 rounded-xl border border-border bg-gradient-to-br from-card to-card/50">
                <h3 className="font-bold text-foreground mb-6">
                  Measurement Results ({totalMeasurements} shots)
                </h3>

                <div className="space-y-6">
                  {results.map((result) => (
                    <div key={result.state}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-sm font-semibold">
                          {result.state}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {result.probability}% ({result.count} times)
                        </span>
                      </div>
                      <div className="w-full bg-background/50 rounded h-6 overflow-hidden">
                        <div
                          className="h-full bg-primary rounded transition-all duration-300"
                          style={{
                            width: `${result.probability}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold">Interpretation:</span> The
                    bars show the probability of measuring each state. The more
                    times you run the circuit, the closer these match the true
                    probabilities.
                  </p>
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="p-6 rounded-xl border border-border/50 bg-gradient-to-r from-primary/10 to-secondary/10">
                <h4 className="font-bold text-foreground mb-3">
                  What You'll Learn
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>How quantum gates transform qubit states</li>
                  <li>
                    The difference between deterministic and probabilistic
                    outputs
                  </li>
                  <li>How to build multi-gate quantum circuits</li>
                  <li>
                    The relationship between gates and measurement outcomes
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
