import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "SkillSphere – Online Learning Platform",
  description:
    "Upgrade your skills with expert-led courses in Web Development, Design, Marketing, Data Science, and more.",
  keywords: "online learning, courses, web development, design, data science",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="skillsphere">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </head>
      <body className="animated-bg min-h-screen">
        {/* Background stars */}
        <div className="stars" aria-hidden="true">
          <svg width="100%" height="100%">
            <defs>
              <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </radialGradient>
            </defs>
            {Array.from({ length: 80 }).map((_, i) => (
              <circle
                key={i}
                cx={`${Math.random() * 100}%`}
                cy={`${Math.random() * 100}%`}
                r={Math.random() * 1.5 + 0.5}
                fill="white"
                opacity={Math.random() * 0.6 + 0.1}
              />
            ))}
          </svg>
        </div>

        <div className="relative z-10">
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(30, 27, 75, 0.95)",
              color: "#e0eaff",
              border: "1px solid rgba(99,102,241,0.3)",
              backdropFilter: "blur(20px)",
              fontFamily: "'DM Sans', sans-serif",
            },
            success: {
              iconTheme: { primary: "#06D6A0", secondary: "#0f0c29" },
            },
            error: {
              iconTheme: { primary: "#FF6B9D", secondary: "#0f0c29" },
            },
          }}
        />
      </body>
    </html>
  );
}
