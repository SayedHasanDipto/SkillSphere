"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        marginTop: "auto",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "#f59e0b",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  color: "#1a1a1a",
                  fontSize: 16,
                }}
              >
                S
              </div>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#f5f5f5",
                }}
              >
                SkillSphere
              </span>
            </div>
            <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.7 }}>
              Empowering learners worldwide with expert-led courses and real-world skills.
            </p>
            {/* Social links */}
            <div className="flex gap-4 mt-6">
              {["twitter", "github", "linkedin", "youtube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  style={{
                    width: 36,
                    height: 36,
                    background: "#1a1a1a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6b7280",
                    textDecoration: "none",
                    fontSize: "0.8rem",
                    transition: "all 0.2s",
                    textTransform: "capitalize",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(245,158,11,0.4)";
                    e.currentTarget.style.color = "#f59e0b";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "#6b7280";
                  }}
                >
                  {social[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#f59e0b",
                marginBottom: 16,
              }}
            >
              Platform
            </h4>
            {["Home", "All Courses", "Instructors", "Pricing"].map((item) => (
              <div key={item} style={{ marginBottom: 10 }}>
                <Link
                  href="/"
                  style={{ color: "#6b7280", fontSize: "0.9rem", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.target.style.color = "#f5f5f5")}
                  onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
                >
                  {item}
                </Link>
              </div>
            ))}
          </div>

          <div>
            <h4
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#f59e0b",
                marginBottom: 16,
              }}
            >
              Company
            </h4>
            {["About Us", "Blog", "Careers", "Press"].map((item) => (
              <div key={item} style={{ marginBottom: 10 }}>
                <Link
                  href="/"
                  style={{ color: "#6b7280", fontSize: "0.9rem", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.target.style.color = "#f5f5f5")}
                  onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
                >
                  {item}
                </Link>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#f59e0b",
                marginBottom: 16,
              }}
            >
              Contact
            </h4>
            <p style={{ color: "#6b7280", fontSize: "0.85rem", marginBottom: 8 }}>
              📧 dev.sayedhasan@gmail.com
            </p>
            <p style={{ color: "#6b7280", fontSize: "0.85rem", marginBottom: 8 }}>
              📞 +880 1940 863413
            </p>
            <p style={{ color: "#6b7280", fontSize: "0.85rem" }}>
              🌍 Dhaka, Bangladesh
            </p>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            marginTop: 48,
            paddingTop: 24,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <p style={{ color: "#4b5563", fontSize: "0.85rem" }}>
            © 2025 SkillSphere. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Terms & Conditions", "Privacy Policy", "Cookie Policy"].map((item) => (
              <Link
                key={item}
                href="/"
                style={{
                  color: "#4b5563",
                  fontSize: "0.8rem",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#f59e0b")}
                onMouseLeave={(e) => (e.target.style.color = "#4b5563")}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
