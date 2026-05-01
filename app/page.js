"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { courses, instructors } from "../data/courses";
import CourseCard from "../components/CourseCard";

// Hero slides
const slides = [
  {
    tag: "Welcome to SkillSphere",
    headline: "Upgrade Your\nSkills Today 🚀",
    sub: "Learn from industry-leading experts and build real-world projects.",
    cta: "Browse Courses",
    ctaHref: "/courses",
    accent: "#f59e0b",
  },
  {
    tag: "500+ Courses Available",
    headline: "Learn from\nIndustry Experts",
    sub: "Curated content designed to fast-track your career and unlock new opportunities.",
    cta: "Start Learning Free",
    ctaHref: "/auth/register",
    accent: "#3b82f6",
  },
  {
    tag: "Join 50,000+ Learners",
    headline: "Skills That\nPay the Bills",
    sub: "From web development to data science — master the skills the market demands.",
    cta: "Explore Now",
    ctaHref: "/courses",
    accent: "#10b981",
  },
];

// Top 3 popular courses by rating
const popularCourses = [...courses]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 3);

// Trending courses
const trendingCourses = courses.filter((c) => c.isTrending).slice(0, 4);

const tips = [
  {
    icon: "🎯",
    title: "Set Clear Goals",
    desc: "Define what you want to achieve before starting a course. Clear goals keep you focused and motivated throughout your learning journey.",
  },
  {
    icon: "⏰",
    title: "Time Blocking",
    desc: "Schedule dedicated study blocks in your calendar. Even 30 minutes of focused practice daily compounds into mastery over time.",
  },
  {
    icon: "📝",
    title: "Active Note-Taking",
    desc: "Don't just watch — write. Summarize concepts in your own words. The act of paraphrasing cements knowledge in long-term memory.",
  },
  {
    icon: "🔄",
    title: "Spaced Repetition",
    desc: "Review material at increasing intervals. Revisit notes after 1 day, 3 days, 1 week. This technique dramatically improves retention.",
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div>
      {/* ─── HERO ─── */}
      <section
        style={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          background: "#0f0f0f",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: 600,
            height: 600,
            background: `radial-gradient(circle, ${slide.accent}18 0%, transparent 70%)`,
            transition: "background 0.8s ease",
            pointerEvents: "none",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: 400,
            height: 400,
            background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
            filter: "blur(80px)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <span
                className="section-label"
                style={{ display: "block", marginBottom: 24 }}
              >
                {slide.tag}
              </span>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: "#f5f5f5",
                  whiteSpace: "pre-line",
                  marginBottom: 24,
                  transition: "all 0.5s ease",
                }}
              >
                {slide.headline}
              </h1>
              <p
                style={{
                  color: "#9ca3af",
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                  marginBottom: 40,
                  maxWidth: 480,
                }}
              >
                {slide.sub}
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Link
                  href={slide.ctaHref}
                  style={{
                    background: "#f59e0b",
                    color: "#1a1a1a",
                    fontWeight: 700,
                    fontSize: "1rem",
                    padding: "14px 32px",
                    borderRadius: 12,
                    textDecoration: "none",
                    transition: "all 0.2s",
                    boxShadow: "0 4px 20px rgba(245,158,11,0.3)",
                  }}
                >
                  {slide.cta} →
                </Link>
                <Link
                  href="/courses"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#f5f5f5",
                    fontWeight: 500,
                    fontSize: "1rem",
                    padding: "14px 32px",
                    borderRadius: 12,
                    textDecoration: "none",
                  }}
                >
                  View All Courses
                </Link>
              </div>

              {/* Stats */}
              <div style={{ display: "flex", gap: 40, marginTop: 56 }}>
                {[
                  { num: "50K+", label: "Learners" },
                  { num: "500+", label: "Courses" },
                  { num: "4.8★", label: "Avg Rating" },
                ].map(({ num, label }) => (
                  <div key={label}>
                    <div
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.8rem",
                        fontWeight: 700,
                        color: "#f59e0b",
                      }}
                    >
                      {num}
                    </div>
                    <div style={{ color: "#6b7280", fontSize: "0.85rem" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Slide Indicators */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {slides.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  style={{
                    background: i === currentSlide ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${i === currentSlide ? "rgba(245,158,11,0.4)" : "rgba(255,255,255,0.07)"}`,
                    borderRadius: 12,
                    padding: "20px 24px",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: i === currentSlide ? "#f59e0b" : "#6b7280",
                      marginBottom: 4,
                    }}
                  >
                    {s.headline.replace("\n", " ")}
                  </div>
                  <div style={{ color: "#4b5563", fontSize: "0.82rem" }}>{s.sub.slice(0, 60)}...</div>
                  {i === currentSlide && (
                    <div
                      style={{
                        marginTop: 12,
                        height: 2,
                        background: "#f59e0b",
                        borderRadius: 1,
                        animation: "slideProgress 5s linear",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── POPULAR COURSES ─── */}
      <section style={{ padding: "100px 0", background: "#0f0f0f" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div style={{ marginBottom: 60, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <div>
              <span className="section-label" style={{ display: "block", marginBottom: 12 }}>
                🔥 Top Rated
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  fontWeight: 700,
                  color: "#f5f5f5",
                }}
              >
                Popular Courses
              </h2>
            </div>
            <Link
              href="/courses"
              style={{ color: "#f59e0b", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}
            >
              View all courses →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRENDING COURSES ─── */}
      <section
        style={{
          padding: "100px 0",
          background: "#0a0a0a",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div style={{ marginBottom: 60 }}>
            <span className="section-label" style={{ display: "block", marginBottom: 12 }}>
              ⚡ Trending Now
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: "#f5f5f5",
              }}
            >
              New Releases & Trending
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── LEARNING TIPS ─── */}
      <section style={{ padding: "100px 0", background: "#0f0f0f" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="section-label" style={{ display: "block", marginBottom: 12 }}>
              💡 Pro Tips
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: "#f5f5f5",
              }}
            >
              Learning Tips for Success
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, i) => (
              <div key={i} className="glass-card" style={{ padding: 28 }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>{tip.icon}</div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "#f5f5f5",
                    marginBottom: 10,
                  }}
                >
                  {tip.title}
                </h3>
                <p style={{ color: "#6b7280", fontSize: "0.88rem", lineHeight: 1.7 }}>
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TOP INSTRUCTORS ─── */}
      <section
        style={{
          padding: "100px 0",
          background: "#0a0a0a",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="section-label" style={{ display: "block", marginBottom: 12 }}>
              🏆 Expert Faculty
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: "#f5f5f5",
              }}
            >
              Top Instructors
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {instructors.map((inst, i) => (
              <div
                key={i}
                className="glass-card"
                style={{
                  padding: 28,
                  textAlign: "center",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <img
                  src={inst.avatar}
                  alt={inst.name}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid rgba(245,158,11,0.3)",
                    margin: "0 auto 16px",
                    display: "block",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#f5f5f5",
                    marginBottom: 4,
                  }}
                >
                  {inst.name}
                </h3>
                <p style={{ color: "#6b7280", fontSize: "0.82rem", marginBottom: 16 }}>
                  {inst.specialty}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 20,
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    paddingTop: 16,
                  }}
                >
                  <div>
                    <div style={{ color: "#f59e0b", fontWeight: 700, fontSize: "0.95rem" }}>
                      {inst.rating}★
                    </div>
                    <div style={{ color: "#4b5563", fontSize: "0.72rem" }}>Rating</div>
                  </div>
                  <div>
                    <div style={{ color: "#f5f5f5", fontWeight: 700, fontSize: "0.95rem" }}>
                      {(inst.students / 1000).toFixed(1)}K
                    </div>
                    <div style={{ color: "#4b5563", fontSize: "0.72rem" }}>Students</div>
                  </div>
                  <div>
                    <div style={{ color: "#f5f5f5", fontWeight: 700, fontSize: "0.95rem" }}>
                      {inst.courses}
                    </div>
                    <div style={{ color: "#4b5563", fontSize: "0.72rem" }}>Courses</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section style={{ padding: "80px 0" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div
            style={{
              background: "linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(245,158,11,0.05) 100%)",
              border: "1px solid rgba(245,158,11,0.3)",
              borderRadius: 24,
              padding: "64px 48px",
            }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: "#f5f5f5",
                marginBottom: 16,
              }}
            >
              Ready to Level Up?
            </h2>
            <p style={{ color: "#9ca3af", fontSize: "1.05rem", marginBottom: 36 }}>
              Join 50,000+ learners already transforming their careers on SkillSphere.
            </p>
            <Link
              href="/auth/register"
              style={{
                background: "#f59e0b",
                color: "#1a1a1a",
                fontWeight: 700,
                fontSize: "1rem",
                padding: "14px 40px",
                borderRadius: 12,
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(245,158,11,0.4)",
              }}
            >
              Get Started Free →
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes slideProgress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </div>
  );
}
