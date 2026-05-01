"use client";

import { useState, useMemo } from "react";
import { courses } from "../../data/courses";
import CourseCard from "../../components/CourseCard";

const categories = ["All", ...new Set(courses.map((c) => c.category))];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || c.category === category;
      const matchLevel = level === "All" || c.level === level;
      return matchSearch && matchCat && matchLevel;
    });
  }, [search, category, level]);

  return (
    <div style={{ minHeight: "80vh", padding: "60px 0" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <span className="section-label" style={{ display: "block", marginBottom: 12 }}>
            📚 All Courses
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#f5f5f5",
              marginBottom: 8,
            }}
          >
            Explore Our Library
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1rem" }}>
            {courses.length} courses across {categories.length - 1} categories
          </p>
        </div>

        {/* Filters */}
        <div
          className="glass-card"
          style={{
            padding: "24px",
            marginBottom: 48,
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "center",
          }}
        >
          {/* Search */}
          <div style={{ flex: "1 1 260px", position: "relative" }}>
            <svg
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#6b7280",
              }}
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search courses by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-dark"
              style={{ paddingLeft: 40 }}
            />
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-dark"
            style={{ flex: "0 1 180px" }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} style={{ background: "#1a1a1a" }}>
                {cat}
              </option>
            ))}
          </select>

          {/* Level */}
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="input-dark"
            style={{ flex: "0 1 180px" }}
          >
            {levels.map((lv) => (
              <option key={lv} value={lv} style={{ background: "#1a1a1a" }}>
                {lv}
              </option>
            ))}
          </select>

          {/* Reset */}
          {(search || category !== "All" || level !== "All") && (
            <button
              onClick={() => { setSearch(""); setCategory("All"); setLevel("All"); }}
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#ef4444",
                borderRadius: 8,
                padding: "10px 16px",
                cursor: "pointer",
                fontSize: "0.85rem",
                whiteSpace: "nowrap",
              }}
            >
              ✕ Reset
            </button>
          )}
        </div>

        {/* Results count */}
        <p style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: 32 }}>
          Showing{" "}
          <span style={{ color: "#f59e0b", fontWeight: 600 }}>{filtered.length}</span>{" "}
          course{filtered.length !== 1 ? "s" : ""}
          {search && ` for "${search}"`}
        </p>

        {/* Course Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: "4rem", marginBottom: 16 }}>🔍</div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                color: "#f5f5f5",
                marginBottom: 8,
              }}
            >
              No courses found
            </h3>
            <p style={{ color: "#6b7280" }}>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
