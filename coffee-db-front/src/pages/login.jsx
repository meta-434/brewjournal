import React, { useState } from "react";

export function Login() {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const endpoint =
        mode === "login"
          ? "http://localhost:5005/users/login"
          : "http://localhost:5005/register";
      const body =
        mode === "login"
          ? {
              email: formData.email,
              password: formData.password,
            }
          : {
              name: formData.name,
              email: formData.email,
              password: formData.password,
            };
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `${mode === "login" ? "Login" : "Registration"} failed`,
        );
      }
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  const handleModeSwitch = () => {
    setMode(mode === "login" ? "register" : "login");
    setError(null);
    setSuccess(false);
  };
  return (
    <main className="w-full min-h-[calc(100vh-200px)] flex items-center justify-center py-16 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif font-bold text-4xl text-[#3E2723] mb-3">
            {mode === "login" ? "Welcome back" : "Join the community"}
          </h1>
          <p className="text-[#3E2723]/60">
            {mode === "login"
              ? "Sign in to continue your coffee journey"
              : "Create an account to get started"}
          </p>
        </div>

        <div className="bg-white border border-[#3E2723]/10 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "register" && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#3E2723] mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  required={mode === "register"}
                  className="w-full px-4 py-2.5 border border-[#3E2723]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8D6E63] focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#3E2723] mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-2.5 border border-[#3E2723]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8D6E63] focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#3E2723] mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-2.5 border border-[#3E2723]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8D6E63] focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                {mode === "login"
                  ? "Login successful!"
                  : "Registration successful!"}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8D6E63] text-white font-medium py-3 rounded-lg hover:bg-[#6D4E43] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Sign in"
                  : "Create account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={handleModeSwitch}
              className="text-sm text-[#8D6E63] hover:text-[#6D4E43] transition-colors"
            >
              {mode === "login"
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
