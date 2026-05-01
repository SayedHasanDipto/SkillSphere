import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        textAlign: "center",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(6rem, 15vw, 10rem)",
            fontWeight: 700,
            background: "linear-gradient(135deg, rgba(245,158,11,0.3), rgba(245,158,11,0.05))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          404
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.8rem",
            fontWeight: 600,
            color: "#f5f5f5",
            marginBottom: 12,
          }}
        >
          Page Not Found
        </h2>
        <p
          style={{
            color: "#6b7280",
            fontSize: "1rem",
            marginBottom: 40,
            maxWidth: 360,
            margin: "0 auto 40px",
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/"
            style={{
              background: "#f59e0b",
              color: "#1a1a1a",
              fontWeight: 700,
              padding: "12px 28px",
              borderRadius: 10,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(245,158,11,0.3)",
            }}
          >
            Go Home
          </Link>
          <Link
            href="/courses"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#f5f5f5",
              fontWeight: 500,
              padding: "12px 28px",
              borderRadius: 10,
              textDecoration: "none",
            }}
          >
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
