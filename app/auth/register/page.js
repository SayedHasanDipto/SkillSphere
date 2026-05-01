"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "../../../lib/auth-client";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const { error: err } = await authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        image: form.photoURL || undefined,
        callbackURL: "/auth/login",
      });
      if (err) {
        setError(err.message || "Registration failed. Email may already be in use.");
        toast.error(err.message || "Registration failed");
      } else {
        toast.success("Account created! Please log in. ✨");
        router.push("/auth/login");
      }
    } catch {
      setError("Something went wrong. Please try again.");
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google sign-in failed");
    }
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        position: "relative",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(60px)",
        }}
      />

      <div style={{ width: "100%", maxWidth: 460, position: "relative" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div
              style={{
                width: 48,
                height: 48,
                background: "#f59e0b",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                color: "#1a1a1a",
                fontSize: 22,
                margin: "0 auto 16px",
              }}
            >
              S
            </div>
          </Link>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "#f5f5f5",
              marginBottom: 8,
            }}
          >
            Create Account
          </h1>
          <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
            Join 50,000+ learners on SkillSphere
          </p>
        </div>

        <div className="glass-card" style={{ padding: 36 }}>
          {/* Google */}
          <button
            onClick={handleGoogle}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 10,
              padding: "12px",
              color: "#f5f5f5",
              fontSize: "0.9rem",
              fontWeight: 500,
              cursor: "pointer",
              marginBottom: 24,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.09)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
            <span style={{ color: "#4b5563", fontSize: "0.8rem" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
          </div>

          <form onSubmit={handleRegister}>
            {[
              { label: "Full Name", name: "name", type: "text", placeholder: "John Doe" },
              { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
              {
                label: "Photo URL (optional)",
                name: "photoURL",
                type: "url",
                placeholder: "https://example.com/photo.jpg",
              },
              { label: "Password", name: "password", type: "password", placeholder: "Min. 6 characters" },
            ].map((field) => (
              <div key={field.name} style={{ marginBottom: 16 }}>
                <label
                  style={{
                    display: "block",
                    color: "#9ca3af",
                    fontSize: "0.85rem",
                    marginBottom: 8,
                    fontWeight: 500,
                  }}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.name !== "photoURL"}
                  className="input-dark"
                />
              </div>
            ))}

            {error && (
              <div
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: 8,
                  padding: "10px 14px",
                  marginBottom: 16,
                  color: "#ef4444",
                  fontSize: "0.85rem",
                }}
              >
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: loading ? "rgba(245,158,11,0.5)" : "#f59e0b",
                color: "#1a1a1a",
                fontWeight: 700,
                fontSize: "1rem",
                padding: "13px",
                borderRadius: 10,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 4px 15px rgba(245,158,11,0.25)",
              }}
            >
              {loading ? "Creating Account..." : "Create Account →"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 24, color: "#6b7280", fontSize: "0.88rem" }}>
            Already have an account?{" "}
            <Link
              href="/auth/login"
              style={{ color: "#f59e0b", textDecoration: "none", fontWeight: 600 }}
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
