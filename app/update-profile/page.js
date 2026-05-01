"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/auth-context";
import { authClient } from "../../lib/auth-client";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import Link from "next/link";

export default function UpdateProfilePage() {
  const { user, loading, refetch } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login?redirect=/update-profile");
    }
    if (user) {
      setName(user.name || "");
      setImage(user.image || user.photoURL || "");
    }
  }, [user, loading, router]);

  if (loading) return <Loader text="Loading..." />;
  if (!user) return null;

  async function handleUpdate(e) {
    e.preventDefault();
    setSaving(true);
    try {
      // BetterAuth update user — see https://better-auth.com/docs/concepts/users-accounts#update-user
      const { error: err } = await authClient.updateUser({
        name,
        image: image || undefined,
      });
      if (err) {
        toast.error(err.message || "Update failed");
      } else {
        await refetch();
        toast.success("Profile updated successfully! ✨");
        router.push("/my-profile");
      }
    } catch {
      toast.error("Update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        position: "relative",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(60px)",
        }}
      />

      <div style={{ width: "100%", maxWidth: 480, position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2rem",
              fontWeight: 700,
              color: "#f5f5f5",
              marginBottom: 8,
            }}
          >
            Update Profile
          </h1>
          <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
            Change your name and profile photo
          </p>
        </div>

        <div className="glass-card" style={{ padding: 36 }}>
          {/* Current avatar preview */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <img
              src={
                image ||
                user.image ||
                user.photoURL ||
                `https://i.pravatar.cc/100?u=${user.email}`
              }
              alt="Preview"
              style={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid rgba(245,158,11,0.4)",
                margin: "0 auto",
                display: "block",
              }}
              onError={(e) => {
                e.target.src = `https://i.pravatar.cc/100?u=${user.email}`;
              }}
            />
            <p style={{ color: "#4b5563", fontSize: "0.75rem", marginTop: 8 }}>Live preview</p>
          </div>

          <form onSubmit={handleUpdate}>
            <div style={{ marginBottom: 18 }}>
              <label
                style={{
                  display: "block",
                  color: "#9ca3af",
                  fontSize: "0.85rem",
                  marginBottom: 8,
                  fontWeight: 500,
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
                className="input-dark"
              />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label
                style={{
                  display: "block",
                  color: "#9ca3af",
                  fontSize: "0.85rem",
                  marginBottom: 8,
                  fontWeight: 500,
                }}
              >
                Profile Image URL
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="input-dark"
              />
              <p style={{ color: "#4b5563", fontSize: "0.78rem", marginTop: 6 }}>
                Paste a direct link to your profile image.
              </p>
            </div>

            <button
              type="submit"
              disabled={saving}
              style={{
                width: "100%",
                background: saving ? "rgba(245,158,11,0.5)" : "#f59e0b",
                color: "#1a1a1a",
                fontWeight: 700,
                fontSize: "1rem",
                padding: "13px",
                borderRadius: 10,
                border: "none",
                cursor: saving ? "not-allowed" : "pointer",
                boxShadow: "0 4px 15px rgba(245,158,11,0.25)",
                marginBottom: 12,
              }}
            >
              {saving ? "Saving..." : "Update Information →"}
            </button>

            <Link
              href="/my-profile"
              style={{
                display: "block",
                textAlign: "center",
                color: "#6b7280",
                fontSize: "0.88rem",
                textDecoration: "none",
                padding: "10px",
              }}
            >
              ← Back to Profile
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
