"use client";

import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../../lib/auth-context";
import { courses } from "../../../data/courses";
import { useEffect } from "react";
import Link from "next/link";
import Loader from "../../../components/Loader";
import toast from "react-hot-toast";

export default function CourseDetailPage() {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const router = useRouter();

  const course = courses.find((c) => c.id === parseInt(id));

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please login to view course details");
      router.push(`/auth/login?redirect=/courses/${id}`);
    }
  }, [user, loading, id, router]);

  if (loading) return <Loader text="Checking access..." />;

  if (!user) return null;

  if (!course) {
    return (
      <div style={{ textAlign: "center", padding: "120px 24px" }}>
        <div style={{ fontSize: "4rem", marginBottom: 16 }}>📭</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#f5f5f5" }}>
          Course not found
        </h2>
        <Link
          href="/courses"
          style={{ color: "#f59e0b", textDecoration: "none", marginTop: 16, display: "inline-block" }}
        >
          ← Back to courses
        </Link>
      </div>
    );
  }

  const levelClass =
    course.level === "Beginner"
      ? "badge-beginner"
      : course.level === "Intermediate"
        ? "badge-intermediate"
        : "badge-advanced";

  return (
    <div style={{ padding: "60px 0 100px" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div style={{ marginBottom: 32, display: "flex", gap: 8, alignItems: "center" }}>
          <Link href="/courses" style={{ color: "#6b7280", textDecoration: "none", fontSize: "0.85rem" }}>
            Courses
          </Link>
          <span style={{ color: "#4b5563" }}>/</span>
          <span style={{ color: "#f59e0b", fontSize: "0.85rem" }}>{course.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero */}
            <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", marginBottom: 40 }}>
              <img
                src={course.image}
                alt={course.title}
                style={{ width: "100%", height: 360, objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(15,15,15,0.9) 0%, transparent 50%)",
                }}
              />
              <div style={{ position: "absolute", bottom: 28, left: 28, right: 28 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                  <span className={`badge-level ${levelClass}`}>{course.level}</span>
                  {course.isNew && (
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "2px 8px",
                        borderRadius: 4,
                        background: "rgba(59,130,246,0.2)",
                        color: "#3b82f6",
                        border: "1px solid rgba(59,130,246,0.4)",
                      }}
                    >
                      New
                    </span>
                  )}
                </div>
                <h1
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                    fontWeight: 700,
                    color: "#f5f5f5",
                  }}
                >
                  {course.title}
                </h1>
              </div>
            </div>

            {/* Description */}
            <div className="glass-card" style={{ padding: 32, marginBottom: 32 }}>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.3rem",
                  color: "#f5f5f5",
                  marginBottom: 16,
                }}
              >
                About This Course
              </h2>
              <p style={{ color: "#9ca3af", lineHeight: 1.8, fontSize: "0.95rem" }}>
                {course.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#9ca3af",
                      padding: "4px 12px",
                      borderRadius: 6,
                      fontSize: "0.8rem",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div className="glass-card" style={{ padding: 32 }}>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.3rem",
                  color: "#f5f5f5",
                  marginBottom: 24,
                }}
              >
                Course Curriculum
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {course.curriculum.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "14px 16px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        background: "rgba(245,158,11,0.1)",
                        border: "1px solid rgba(245,158,11,0.3)",
                        borderRadius: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.75rem",
                        color: "#f59e0b",
                        flexShrink: 0,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span style={{ color: "#d1d5db", fontSize: "0.95rem" }}>{item}</span>
                    <svg
                      style={{ marginLeft: "auto", color: "#4b5563", flexShrink: 0 }}
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div
              style={{
                position: "sticky",
                top: 90,
                background: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))",
                  padding: "28px 28px 24px",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2.2rem",
                    fontWeight: 700,
                    color: "#f59e0b",
                    marginBottom: 4,
                  }}
                >
                  ${course.price}
                </div>
                <p style={{ color: "#6b7280", fontSize: "0.85rem" }}>Lifetime access</p>
              </div>

              <div style={{ padding: 28 }}>
                <button
                  style={{
                    width: "100%",
                    background: "#f59e0b",
                    color: "#1a1a1a",
                    fontWeight: 700,
                    fontSize: "1rem",
                    padding: "14px",
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    marginBottom: 12,
                    boxShadow: "0 4px 20px rgba(245,158,11,0.3)",
                  }}
                  onClick={() => toast.success("Enrolled successfully! 🎉")}
                >
                  Enroll Now
                </button>
                <button
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#f5f5f5",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    padding: "12px",
                    borderRadius: 10,
                    cursor: "pointer",
                  }}
                  onClick={() => toast.success("Added to wishlist ❤️")}
                >
                  Add to Wishlist
                </button>

                {/* Details */}
                <div
                  style={{
                    marginTop: 24,
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  }}
                >
                  {[
                    { label: "Instructor", val: course.instructor },
                    { label: "Duration", val: course.duration },
                    { label: "Level", val: course.level },
                    { label: "Category", val: course.category },
                    { label: "Students", val: course.students.toLocaleString() },
                    { label: "Rating", val: `${course.rating} ★` },
                  ].map(({ label, val }) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        paddingBottom: 12,
                      }}
                    >
                      <span style={{ color: "#6b7280", fontSize: "0.85rem" }}>{label}</span>
                      <span style={{ color: "#f5f5f5", fontSize: "0.85rem", fontWeight: 500 }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
