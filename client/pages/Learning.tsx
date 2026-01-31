import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const courses = [
  {
    id: 1,
    title: "Introduction to Quantum Computing",
    description:
      "Learn the fundamentals of quantum computing, qubits, superposition, and entanglement.",
    progress: 75,
    status: "in_progress",
  },
  {
    id: 2,
    title: "Quantum Noise & Decoherence",
    description:
      "Understand noise sources in quantum systems and how decoherence affects quantum states.",
    progress: 40,
    status: "in_progress",
  },
  {
    id: 3,
    title: "Real vs Ideal Quantum Systems",
    description:
      "Compare theoretical quantum systems with real-world quantum hardware limitations.",
    progress: 0,
    status: "locked",
  },
];

export default function Learning() {
  const [completedCourses, setCompletedCourses] = useState<number[]>([]);

  const handleComplete = (courseId: number) => {
    if (!completedCourses.includes(courseId)) {
      setCompletedCourses([...completedCourses, courseId]);
    }
  };

  const canProceedToLabs =
    courses.filter((c) => c.status === "in_progress").length === completedCourses.length &&
    completedCourses.length > 0;

  return (
    <Layout>
      <div className="bg-white">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">Learning</h1>
          <p className="text-lg text-muted-foreground">
            Start with concepts before performing experiments
          </p>
        </div>

        {/* Course Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className={`rounded-lg border p-6 transition-all ${
                  course.status === "locked"
                    ? "bg-muted/30 border-border opacity-60"
                    : "bg-white border-border hover:shadow-md hover:border-primary/30"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground pr-4">
                    {course.title}
                  </h3>
                  {course.status === "locked" && (
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded whitespace-nowrap">
                      Coming Soon
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-5">
                  {course.description}
                </p>

                {/* Progress Indicator */}
                {course.status !== "locked" && (
                  <div className="mb-5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        Progress
                      </span>
                      <span className="text-xs font-semibold text-foreground">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Button */}
                {course.status === "locked" ? (
                  <button
                    disabled
                    className="w-full py-2 px-4 border border-border text-muted-foreground rounded-md font-medium cursor-not-allowed opacity-50"
                  >
                    Locked
                  </button>
                ) : (
                  <button
                    onClick={() => handleComplete(course.id)}
                    className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                      completedCourses.includes(course.id)
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-primary text-primary-foreground hover:bg-primary/90 border border-primary"
                    }`}
                  >
                    {completedCourses.includes(course.id) ? "✓ Completed" : "Continue"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Proceed to Labs Section */}
        <div className="bg-muted/30 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-lg border border-border p-8 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Ready for hands-on experiments?
                </h3>
                <p className="text-muted-foreground">
                  {canProceedToLabs
                    ? "You've completed all beginner courses. Move on to quantum labs!"
                    : `Complete ${courses.filter((c) => c.status === "in_progress").length - completedCourses.length} more courses to unlock labs.`}
                </p>
              </div>
              <Link
                to="/labs"
                className={`px-6 py-2 rounded-md font-semibold transition-colors whitespace-nowrap ml-4 ${
                  canProceedToLabs
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                }`}
                onClick={(e) => !canProceedToLabs && e.preventDefault()}
              >
                Proceed to Labs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
