import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../lib/auth-context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "SkillSphere — Learn Without Limits",
  description:
    "Master in-demand skills with expert-led courses. Web dev, AI, design, marketing and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="skillsphere" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 relative z-10">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                color: "#f5f5f5",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                fontFamily: "'DM Sans', sans-serif",
              },
              success: {
                iconTheme: { primary: "#10B981", secondary: "#fff" },
              },
              error: {
                iconTheme: { primary: "#EF4444", secondary: "#fff" },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
