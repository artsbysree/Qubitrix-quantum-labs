import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const labs = [
  {
    id: 1,
    title: "Noise Impact Lab",
    description:
      "Investigate how quantum noise affects qubit states and measurement outcomes in real quantum systems.",
    status: "active",
    difficulty: "Beginner",
    estimatedTime: "20 mins",
  },
  {
    id: 2,
    title: "Hardware Constraint Lab",
    description:
      "Explore the limitations of real quantum hardware and how connectivity constraints affect circuit design.",
    status: "locked",
    difficulty: "Intermediate",
    estimatedTime: "30 mins",
  },
  {
    id: 3,
    title: "Error Mitigation Lab",
    description:
      "Learn techniques to mitigate quantum errors and improve the reliability of quantum algorithms.",
    status: "locked",
    difficulty: "Advanced",
    estimatedTime: "40 mins",
  },
];

export default function Labs() {
  return (
    <Layout>
      <div className="bg-white">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">Quantum Labs</h1>
          <p className="text-lg text-muted-foreground">
            Hands-on experiments with real-world quantum behavior
          </p>
        </div>

        {/* Lab Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {labs.map((lab) => (
              <div
                key={lab.id}
                className={`rounded-lg border overflow-hidden transition-all ${
                  lab.status === "locked"
                    ? "bg-muted/30 border-border opacity-60"
                    : "bg-white border-border hover:shadow-md hover:border-primary/30"
                }`}
              >
                {/* Card Header with Badge */}
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 border-b border-border relative">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {lab.title}
                    </h3>
                    {lab.status === "active" && (
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                        Active
                      </span>
                    )}
                    {lab.status === "locked" && (
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-muted text-muted-foreground rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-sm text-muted-foreground mb-6">
                    {lab.description}
                  </p>

                  {/* Lab Details */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Difficulty</span>
                      <span className="font-medium text-foreground">
                        {lab.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-medium text-foreground">
                        {lab.estimatedTime}
                      </span>
                    </div>
                  </div>

                  {/* Button */}
                  {lab.status === "active" ? (
                    <Link
                      to={`/labs/noise-impact`}
                      className="block w-full py-2 px-4 bg-primary text-primary-foreground rounded-md font-medium text-center hover:bg-primary/90 transition-colors"
                    >
                      Start Lab
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full py-2 px-4 border border-border text-muted-foreground rounded-md font-medium cursor-not-allowed opacity-50"
                    >
                      Locked
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
