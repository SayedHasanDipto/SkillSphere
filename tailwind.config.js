import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        amber: {
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
        },
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse at 20% 50%, rgba(251,191,36,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(251,191,36,0.08) 0%, transparent 50%)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        skillsphere: {
          primary: "#F59E0B",
          "primary-content": "#1a1a1a",
          secondary: "#374151",
          "base-100": "#0f0f0f",
          "base-200": "#1a1a1a",
          "base-300": "#252525",
          "base-content": "#f5f5f5",
          neutral: "#2a2a2a",
          "neutral-content": "#d1d5db",
          accent: "#FBBF24",
          info: "#3B82F6",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
    ],
    darkTheme: "skillsphere",
  },
};

export default config;
