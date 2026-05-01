import Link from "next/link";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={star <= Math.round(rating) ? "#f59e0b" : "none"}
            stroke="#f59e0b"
            strokeWidth="1.5"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
      <span style={{ color: "#f59e0b", fontSize: "0.82rem", fontWeight: 600 }}>{rating}</span>
    </div>
  );
}

export default function CourseCard({ course }) {
  const levelClass =
    course.level === "Beginner"
      ? "badge-beginner"
      : course.level === "Intermediate"
      ? "badge-intermediate"
      : "badge-advanced";

  return (
    <div className="course-card group">
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", height: 200 }}>
        <img
          src={course.image}
          alt={course.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
          }}
          className="group-hover:scale-105"
        />
        {/* Overlay gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(15,15,15,0.8) 0%, transparent 60%)",
          }}
        />
        {/* Badges */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            display: "flex",
            gap: 8,
          }}
        >
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
                background: "rgba(59,130,246,0.15)",
                color: "#3b82f6",
                border: "1px solid rgba(59,130,246,0.3)",
              }}
            >
              New
            </span>
          )}
          {course.isTrending && (
            <span
              style={{
                fontSize: "0.65rem",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "2px 8px",
                borderRadius: 4,
                background: "rgba(245,158,11,0.15)",
                color: "#f59e0b",
                border: "1px solid rgba(245,158,11,0.3)",
              }}
            >
              🔥 Hot
            </span>
          )}
        </div>
        {/* Category bottom */}
        <span
          style={{
            position: "absolute",
            bottom: 12,
            right: 12,
            fontSize: "0.7rem",
            color: "#9ca3af",
            background: "rgba(0,0,0,0.6)",
            padding: "2px 8px",
            borderRadius: 4,
          }}
        >
          {course.category}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "20px" }}>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.05rem",
            fontWeight: 600,
            color: "#f5f5f5",
            marginBottom: 8,
            lineHeight: 1.4,
          }}
        >
          {course.title}
        </h3>

        <p style={{ color: "#6b7280", fontSize: "0.85rem", marginBottom: 12 }}>
          by{" "}
          <span style={{ color: "#9ca3af", fontWeight: 500 }}>{course.instructor}</span>
        </p>

        <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
          <StarRating rating={course.rating} />
          <span style={{ color: "#6b7280", fontSize: "0.82rem" }}>
            ⏱ {course.duration}
          </span>
        </div>

        <div
          className="flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#f59e0b",
            }}
          >
            ${course.price}
          </span>
          <Link
            href={`/courses/${course.id}`}
            style={{
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.3)",
              color: "#f59e0b",
              borderRadius: 8,
              padding: "7px 16px",
              fontSize: "0.85rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f59e0b";
              e.currentTarget.style.color = "#1a1a1a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(245,158,11,0.1)";
              e.currentTarget.style.color = "#f59e0b";
            }}
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
