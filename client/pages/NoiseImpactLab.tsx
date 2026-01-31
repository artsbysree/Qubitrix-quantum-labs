import { useState } from "react";
import Layout from "@/components/Layout";

export default function NoiseImpactLab() {
  const [noiseLevel, setNoiseLevel] = useState(30);
  const [numQubits, setNumQubits] = useState(2);
  const [hasRun, setHasRun] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(true);

  const handleRunExperiment = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 1200);
  };

  // Generate mock probability data based on noise level
  const generateProbabilities = () => {
    const baseProbs = [0.25, 0.25, 0.25, 0.25];
    const noiseFactor = noiseLevel / 100;

    return baseProbs.map((prob) => {
      const noiseAdjustment = (Math.random() - 0.5) * noiseFactor;
      return Math.max(0, Math.min(1, prob + noiseAdjustment));
    });
  };

  const probs = generateProbabilities();

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Noise Impact Lab</h1>
            <p className="text-muted-foreground">
              Investigate how quantum noise affects qubit states and measurement outcomes
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Circuit and Controls */}
            <div className="lg:col-span-1">
              {/* Quantum Circuit Visualization */}
              <div className="bg-white border border-border rounded-lg p-6 mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  Quantum Circuit
                </h3>
                <div className="bg-muted/20 rounded-lg p-6 h-40 flex items-center justify-center border border-border border-dashed">
                  <div className="text-center">
                    <div className="flex justify-center gap-8 mb-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/20 rounded-md flex items-center justify-center mx-auto mb-2">
                          <span className="text-sm font-bold text-primary">H</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Hadamard</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-0.5 bg-muted-foreground"></div>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/20 rounded-md flex items-center justify-center mx-auto mb-2">
                          <span className="text-sm font-bold text-primary">⊗</span>
                        </div>
                        <span className="text-xs text-muted-foreground">CNOT</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-0.5 bg-muted-foreground"></div>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/20 rounded-md flex items-center justify-center mx-auto mb-2">
                          <span className="text-sm font-bold text-primary">M</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Measure</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloch Sphere Visualization */}
              <div className="bg-white border border-border rounded-lg p-6 mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  Bloch Sphere
                </h3>
                <div className="bg-muted/20 rounded-lg p-6 h-40 flex items-center justify-center border border-border border-dashed relative overflow-hidden">
                  <svg className="w-32 h-32" viewBox="0 0 100 100">
                    {/* Sphere outline */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-muted-foreground/50"
                    />
                    {/* Axes */}
                    <line
                      x1="50"
                      y1="10"
                      x2="50"
                      y2="90"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-muted-foreground/30"
                    />
                    <line
                      x1="10"
                      y1="50"
                      x2="90"
                      y2="50"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-muted-foreground/30"
                    />
                    {/* State vector - changes with noise */}
                    <line
                      x1="50"
                      y1="50"
                      x2={50 + 30 * Math.cos(noiseLevel * 3.6 * (Math.PI / 180))}
                      y2={50 - 30 * Math.sin(noiseLevel * 3.6 * (Math.PI / 180))}
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-primary transition-all duration-300"
                    />
                    {/* State point */}
                    <circle
                      cx={50 + 30 * Math.cos(noiseLevel * 3.6 * (Math.PI / 180))}
                      cy={50 - 30 * Math.sin(noiseLevel * 3.6 * (Math.PI / 180))}
                      r="3"
                      fill="currentColor"
                      className="text-primary"
                    />
                  </svg>
                  <div
                    className="absolute top-2 left-2 text-xs text-primary font-semibold opacity-0 transition-opacity duration-300"
                    style={{ opacity: noiseLevel > 50 ? 0.7 : 0.3 }}
                  >
                    Noise: {noiseLevel}%
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="bg-white border border-border rounded-lg p-6">
                <h3 className="text-sm font-semibold text-foreground mb-5">
                  Experiment Controls
                </h3>

                {/* Noise Level Slider */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-foreground">
                      Noise Level
                    </label>
                    <span className="text-sm font-semibold text-primary">
                      {noiseLevel}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={noiseLevel}
                    onChange={(e) => setNoiseLevel(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Drag to adjust quantum noise
                  </p>
                </div>

                {/* Number of Qubits */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Number of Qubits
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => setNumQubits(num)}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                          numQubits === num
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Run Button */}
                <button
                  onClick={handleRunExperiment}
                  disabled={isRunning}
                  className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRunning ? "Running Experiment..." : "Run Experiment"}
                </button>
              </div>
            </div>

            {/* Right Panel - Results */}
            <div className="lg:col-span-2">
              {/* Results Section */}
              <div className="bg-white border border-border rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Results
                </h3>

                {!hasRun ? (
                  <div className="bg-muted/20 rounded-lg p-12 text-center border border-border border-dashed">
                    <p className="text-muted-foreground">
                      Run the experiment to see results
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Probability Distribution */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-foreground mb-4">
                        Probability Distribution
                      </h4>
                      <div className="space-y-3">
                        {["00", "01", "10", "11"].map((state, idx) => (
                          <div key={state}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium text-foreground">
                                |{state}⟩
                              </span>
                              <span className="text-sm font-semibold text-primary">
                                {(probs[idx] * 100).toFixed(1)}%
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all duration-500"
                                style={{ width: `${probs[idx] * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Measurement Output */}
                    <div className="border-t border-border pt-6">
                      <h4 className="text-sm font-semibold text-foreground mb-4">
                        Measurement Output
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: "Total Runs", value: "1000" },
                          { label: "Success Rate", value: "94.2%" },
                          { label: "Max Error", value: noiseLevel + "%" },
                          { label: "Avg Fidelity", value: (100 - noiseLevel) + "%" },
                        ].map((metric, idx) => (
                          <div key={idx} className="bg-muted/30 rounded-lg p-4">
                            <p className="text-xs text-muted-foreground mb-1">
                              {metric.label}
                            </p>
                            <p className="text-lg font-bold text-foreground">
                              {metric.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Instructions */}
              <div className="bg-white border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setInstructionsOpen(!instructionsOpen)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/20 transition-colors"
                >
                  <h3 className="font-semibold text-foreground">
                    How to Perform This Lab
                  </h3>
                  <svg
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      instructionsOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>

                {instructionsOpen && (
                  <div className="border-t border-border px-6 py-4 bg-muted/10">
                    <ol className="space-y-3">
                      {[
                        "Select the number of qubits for your experiment",
                        "Adjust the noise level using the slider",
                        "Click 'Run Experiment' to execute the quantum circuit",
                        "Observe results and sphere visualization",
                        "Review the explanation of how noise affected your results",
                      ].map((step, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          <p className="text-sm text-muted-foreground pt-0.5">
                            {step}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              {/* Lab Walkthrough Video */}
              <div className="bg-white border border-border rounded-lg p-6 mt-6">
                <h3 className="font-semibold text-foreground mb-4">Lab Walkthrough</h3>
                <div className="bg-muted/20 rounded-lg overflow-hidden border border-border border-dashed aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-16 h-16 mx-auto mb-3 text-muted-foreground/50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm text-muted-foreground">
                      Watch a short guide on how to perform this experiment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
