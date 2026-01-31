import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

export default function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    name: "John Doe",
    email: "john@example.com",
    learningLevel: "beginner",
    theme: "light",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Manage your profile and learning preferences
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Section */}
          <div className="bg-white border border-border rounded-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-6">Profile Details</h2>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={settings.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Learning Preferences Section */}
          <div className="bg-white border border-border rounded-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-6">Learning Preferences</h2>

            <div className="space-y-6">
              {/* Learning Level */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Learning Level
                </label>
                <div className="space-y-3">
                  {[
                    {
                      value: "beginner",
                      label: "Beginner",
                      description: "Starting my quantum journey",
                    },
                    {
                      value: "intermediate",
                      label: "Intermediate",
                      description: "Have some quantum knowledge",
                    },
                  ].map((level) => (
                    <label key={level.value} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="learningLevel"
                        value={level.value}
                        checked={settings.learningLevel === level.value}
                        onChange={(e) =>
                          handleSelectChange("learningLevel", e.target.value)
                        }
                        className="mt-1 w-4 h-4 accent-primary"
                      />
                      <div>
                        <p className="font-medium text-foreground">{level.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {level.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Theme Section */}
          <div className="bg-white border border-border rounded-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-6">Display</h2>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground mb-3">
                Theme
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { value: "light", label: "Light", icon: "☀️" },
                  { value: "dark", label: "Dark", icon: "🌙" },
                ].map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => handleSelectChange("theme", theme.value)}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      settings.theme === theme.value
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="text-xl mb-2">{theme.icon}</div>
                    <p className="font-medium text-foreground">{theme.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Account Section */}
          <div className="bg-white border border-border rounded-lg p-8">
            <h2 className="text-xl font-bold text-foreground mb-6">Account</h2>

            <div className="space-y-4">
              <div className="pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground mb-2">
                  Member since January 2024
                </p>
                <p className="text-sm text-muted-foreground">
                  Account Status: Active
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-3 px-4 border border-destructive text-destructive rounded-lg font-semibold hover:bg-destructive/5 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Save Changes Note */}
          <div className="mt-8 bg-primary/10 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-primary font-medium">
              ✓ Changes are automatically saved
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
