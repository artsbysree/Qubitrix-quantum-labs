import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

export default function Layout({ children, hideNav = false }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { label: "Learning", path: "/learning" },
    { label: "Labs", path: "/labs" },
    { label: "Guidance", path: "/guidance" },
    { label: "Settings", path: "/settings" },
    { label: "About", path: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navigation */}
      {!hideNav && (
        <nav className="border-b border-border bg-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">Q</span>
                </div>
                <span className="text-xl font-bold text-foreground">Qubitrix</span>
              </Link>

              <div className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-sm transition-colors ${
                      isActive(item.path)
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Mobile menu toggle placeholder */}
              <div className="md:hidden flex items-center gap-2">
                <button className="p-2 hover:bg-muted rounded-md transition-colors">
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
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">Q</span>
              </div>
              <span className="text-sm font-semibold text-foreground">Qubitrix</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2024 Qubitrix. Reality-driven quantum learning platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
