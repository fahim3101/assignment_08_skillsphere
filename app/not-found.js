import Link from "next/link";
import { Home, BookOpen, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* 404 */}
        <div className="relative mb-6">
          <div
            className="text-[10rem] font-black leading-none select-none"
            style={{
              fontFamily: "Syne, sans-serif",
              background: "linear-gradient(135deg, #6366f1, #a855f7, #FFD93D)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: 0.15,
            }}
          >
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-8xl">🌌</div>
          </div>
        </div>

        <h1
          className="text-4xl md:text-5xl font-black text-white mb-4"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          Lost in <span className="gradient-text">Space</span>
        </h1>

        <p className="text-indigo-300/70 text-lg mb-10 leading-relaxed">
          Oops! This page doesn&apos;t exist or may have been moved. Let&apos;s get you back on
          your learning journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl btn-glow hover:from-indigo-500 hover:to-purple-500 transition-all duration-200"
          >
            <Home size={18} /> Go Home
          </Link>
          <Link
            href="/courses"
            className="flex items-center justify-center gap-2 px-8 py-4 glass-card text-indigo-200 font-medium rounded-2xl hover:border-indigo-500/40 transition-all duration-200"
          >
            <BookOpen size={18} /> Browse Courses
          </Link>
        </div>

        {/* Decorative orbs */}
        <div className="fixed top-1/4 left-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}
