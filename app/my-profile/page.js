"use client";

import { useAuth } from "../../lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Loader from "../../components/Loader";
import { courses } from "../../data/courses";

export default function MyProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login?redirect=/my-profile");
    }
  }, [user, loading, router]);

  if (loading) return <Loader text="Loading profile..." />;
  if (!user) return null;

  const enrolledCourses = courses.slice(0, 3); // Demo enrolled courses

  return (
    <div style={{ padding: "60px 0 100px", minHeight: "80vh" }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <span className="section-label" style={{ display: "block", marginBottom: 12 }}>
            👤 Account
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.2rem",
              fontWeight: 700,
              color: "#f5f5f5",
            }}
          >
            My Profile
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Profile Card */}
          <div className="lg:col-span-1">
            <div
              style={{
                background: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: 32,
                textAlign: "center",
              }}
            >
              <div style={{ position: "relative", display: "inline-block", marginBottom: 20 }}>
                <img
                  src={
                    user.image ||
                    user.photoURL ||
                    `https://i.pravatar.cc/120?u=${user.email}`
                  }
                  alt={user.name}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid rgba(245,158,11,0.4)",
                  }}
                  onError={(e) => {
                    e.target.src = `https://i.pravatar.cc/120?u=${user.email}`;
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 28,
                    height: 28,
                    background: "#10b981",
                    borderRadius: "50%",
                    border: "3px solid #1a1a1a",
                  }}
                />
              </div>

              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  color: "#f5f5f5",
                  marginBottom: 4,
                }}
              >
                {user.name}
              </h2>
              <p style={{ color: "#6b7280", fontSize: "0.88rem", marginBottom: 24 }}>
                {user.email}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  padding: "16px 0",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  marginBottom: 24,
                }}
              >
                {[
                  { num: 3, label: "Enrolled" },
                  { num: 1, label: "Completed" },
                  { num: "4.8", label: "Avg Score" },
                ].map(({ num, label }) => (
                  <div key={label}>
                    <div
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.4rem",
                        fontWeight: 700,
                        color: "#f59e0b",
                      }}
                    >
                      {num}
                    </div>
                    <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>{label}</div>
                  </div>
                ))}
              </div>

              <Link
                href="/update-profile"
                style={{
                  display: "block",
                  background: "#f59e0b",
                  color: "#1a1a1a",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  padding: "11px",
                  borderRadius: 10,
                  textDecoration: "none",
                  marginBottom: 10,
                  transition: "all 0.2s",
                }}
              >
                ✏️ Update Profile
              </Link>
              <button
                onClick={logout}
                style={{
                  width: "100%",
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  color: "#ef4444",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  padding: "11px",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-2">
            {/* Account Info */}
            <div
              className="glass-card"
              style={{ padding: 28, marginBottom: 24 }}
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  color: "#f5f5f5",
                  marginBottom: 20,
                }}
              >
                Account Information
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "Full Name", val: user.name },
                  { label: "Email Address", val: user.email },
                  {
                    label: "Member Since",
                    val: user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                      : "N/A",
                  },
                  { label: "Account Status", val: "Active ✅" },
                ].map(({ label, val }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <span style={{ color: "#6b7280", fontSize: "0.88rem" }}>{label}</span>
                    <span style={{ color: "#f5f5f5", fontSize: "0.88rem", fontWeight: 500 }}>
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enrolled Courses */}
            <div className="glass-card" style={{ padding: 28 }}>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  color: "#f5f5f5",
                  marginBottom: 20,
                }}
              >
                My Enrolled Courses
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {enrolledCourses.map((course) => (
                  <div
                    key={course.id}
                    style={{
                      display: "flex",
                      gap: 16,
                      alignItems: "center",
                      padding: "14px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 12,
                    }}
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 8,
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          color: "#f5f5f5",
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          marginBottom: 2,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {course.title}
                      </p>
                      <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>
                        {course.instructor} · {course.duration}
                      </p>
                    </div>
                    <Link
                      href={`/courses/${course.id}`}
                      style={{
                        background: "rgba(245,158,11,0.1)",
                        border: "1px solid rgba(245,158,11,0.3)",
                        color: "#f59e0b",
                        borderRadius: 8,
                        padding: "6px 12px",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Continue →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
