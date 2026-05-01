"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../lib/auth-context";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    ...(user ? [{ href: "/my-profile", label: "My Profile" }] : []),
  ];

  return (
    <nav
      style={{
        background: "rgba(15,15,15,0.9)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
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
              transition: "box-shadow 0.2s",
            }}
            className="group-hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]"
          >
            S
          </div>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "1.2rem",
              background: "linear-gradient(135deg, #f5f5f5 40%, #f59e0b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SkillSphere
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{
                color: pathname === link.href ? "#f59e0b" : "#9ca3af",
                fontSize: "0.9rem",
                fontWeight: 500,
                transition: "color 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#f5f5f5")}
              onMouseLeave={(e) =>
              (e.target.style.color =
                pathname === link.href ? "#f59e0b" : "#9ca3af")
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/my-profile" className="flex items-center gap-2 group">
                <img
                  src={user.image || user.photoURL || `https://i.pravatar.cc/40?u=${user.email}`}
                  alt={user.name}
                  width={36}
                  height={36}
                  style={{
                    borderRadius: "50%",
                    border: "2px solid rgba(245,158,11,0.5)",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.src = `https://i.pravatar.cc/40?u=${user.email}`;
                  }}
                />
                <span style={{ color: "#f5f5f5", fontSize: "0.9rem", fontWeight: 500 }}>
                  {user.name?.split(" ")[0]}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#ef4444",
                  borderRadius: 8,
                  padding: "6px 14px",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(239,68,68,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(239,68,68,0.1)";
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                style={{
                  color: "#9ca3af",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "all 0.2s",
                }}
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                style={{
                  background: "#f59e0b",
                  color: "#1a1a1a",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  padding: "6px 16px",
                  borderRadius: 8,
                  transition: "all 0.2s",
                }}
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: "#f5f5f5", background: "none", border: "none", cursor: "pointer" }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "#1a1a1a",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            padding: "16px 24px",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                color: pathname === link.href ? "#f59e0b" : "#9ca3af",
                padding: "10px 0",
                fontSize: "0.95rem",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
            {user ? (
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#ef4444",
                  borderRadius: 8,
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: "#9ca3af",
                    textDecoration: "none",
                    padding: "8px 16px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                  }}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    background: "#f59e0b",
                    color: "#1a1a1a",
                    fontWeight: 600,
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: 8,
                  }}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
