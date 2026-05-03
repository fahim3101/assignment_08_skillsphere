import Link from "next/link";
import Image from "next/image";
import { courses, instructors } from "@/data/courses";
import CourseCard from "@/components/CourseCard";
import HeroSection from "@/components/HeroSection";
import StarRating from "@/components/StarRating";
import {
  Lightbulb,
  Clock,
  Target,
  BookOpen,
  Trophy,
  Flame,
  Sparkles,
  ArrowRight,
  Users,
  GraduationCap,
  Globe,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  // Top 3 highest rated
  const popularCourses = [...courses]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const trendingCourses = courses.filter((c) => c.trending).slice(0, 3);
  const newCourses = courses.filter((c) => c.isNew).slice(0, 3);

  const learningTips = [
    {
      icon: <Clock size={24} />,
      title: "Consistency Over Intensity",
      desc: "Study 30 minutes daily rather than cramming for hours. Your brain retains more with spaced repetition.",
      color: "from-indigo-500 to-blue-600",
    },
    {
      icon: <Target size={24} />,
      title: "Set Clear Goals",
      desc: "Define what you want to achieve before each session. Clear objectives keep you focused and motivated.",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Active Learning",
      desc: "Don't just watch — pause and practice. Build something with every new concept you learn.",
      color: "from-yellow-500 to-orange-600",
    },
    {
      icon: <BookOpen size={24} />,
      title: "Take Structured Notes",
      desc: "Use the Cornell method or mind maps to organize your notes for better recall later.",
      color: "from-emerald-500 to-cyan-600",
    },
  ];

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Popular Courses */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium mb-3">
                <Flame size={16} className="text-orange-400" />
                Most Popular
              </div>
              <h2
                className="text-4xl md:text-5xl font-black text-white"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                🔥 Popular Courses
              </h2>
              <p className="text-indigo-300/70 mt-3 max-w-md">
                Handpicked top-rated courses loved by thousands of learners
              </p>
            </div>
            <Link
              href="/courses"
              className="flex items-center gap-2 text-indigo-400 hover:text-indigo-200 transition-colors text-sm font-medium group"
            >
              View all courses
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Learning Tips */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 text-indigo-400 text-sm font-medium mb-3">
              <Lightbulb size={16} className="text-yellow-400" />
              Study Smarter
            </div>
            <h2
              className="text-4xl md:text-5xl font-black text-white mb-4"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              📌 Learning Tips
            </h2>
            <p className="text-indigo-300/70 max-w-xl mx-auto">
              Scientifically proven techniques to help you learn faster and
              retain more
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningTips.map((tip, i) => (
              <div
                key={i}
                className="glass-card p-6 hover:border-indigo-500/30 transition-all duration-300 group cursor-default"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tip.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform`}
                >
                  {tip.icon}
                </div>
                <h3
                  className="text-white font-bold text-lg mb-3"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {tip.title}
                </h3>
                <p className="text-indigo-300/70 text-sm leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Time Management Sub-section */}
          <div className="mt-12 glass-card p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h3
                  className="text-3xl font-black text-white mb-4"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  Master Your{" "}
                  <span className="gradient-text">Time Management</span>
                </h3>
                <p className="text-indigo-300/70 mb-6 leading-relaxed">
                  The most successful learners aren&apos;t the smartest — they&apos;re the
                  most consistent. Here&apos;s a proven daily schedule that works.
                </p>
                <ul className="space-y-3">
                  {[
                    "Block 30–60 min of focused study time daily",
                    "Use the Pomodoro technique (25 min on, 5 min off)",
                    "Review yesterday's notes before new content",
                    "Build projects every weekend to solidify learning",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2
                        size={18}
                        className="text-emerald-400 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-indigo-200 text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: "21", unit: "Days", desc: "to build a habit" },
                  { val: "10K", unit: "Hours", desc: "to mastery" },
                  { val: "30", unit: "Min/day", desc: "minimum study time" },
                  { val: "3x", unit: "Faster", desc: "with active recall" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-indigo-900/30 rounded-2xl p-5 text-center border border-indigo-800/30"
                  >
                    <div
                      className="text-3xl font-black gradient-text"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {stat.val}
                    </div>
                    <div className="text-indigo-200 text-sm font-medium mt-1">
                      {stat.unit}
                    </div>
                    <div className="text-indigo-400/60 text-xs mt-1">
                      {stat.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Instructors */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 text-indigo-400 text-sm font-medium mb-3">
              <Trophy size={16} className="text-yellow-400" />
              World-Class Faculty
            </div>
            <h2
              className="text-4xl md:text-5xl font-black text-white mb-4"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              🏆 Top Instructors
            </h2>
            <p className="text-indigo-300/70 max-w-xl mx-auto">
              Learn from industry veterans who&apos;ve shaped the tech world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((inst) => (
              <div
                key={inst.id}
                className="glass-card p-8 text-center group hover:border-indigo-500/30 transition-all duration-300"
              >
                {/* Avatar */}
                <div className="relative w-28 h-28 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 animate-pulse blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
                  <Image
                    src={inst.image}
                    alt={inst.name}
                    fill
                    className="object-cover rounded-full relative z-10 ring-4 ring-indigo-500/30 group-hover:ring-indigo-500/60 transition-all"
                  />
                </div>

                <h3
                  className="text-white font-bold text-xl mb-1"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {inst.name}
                </h3>
                <p className="text-indigo-400 text-sm mb-5">{inst.specialty}</p>

                <StarRating rating={inst.rating} />

                <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-indigo-900/30">
                  <div>
                    <div
                      className="text-2xl font-black text-white"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {inst.courses}
                    </div>
                    <div className="text-indigo-400/60 text-xs">Courses</div>
                  </div>
                  <div>
                    <div
                      className="text-2xl font-black text-white"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {(inst.students / 1000).toFixed(0)}K
                    </div>
                    <div className="text-indigo-400/60 text-xs">Students</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Courses */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium mb-3">
                <Sparkles size={16} className="text-yellow-400" />
                Hot Right Now
              </div>
              <h2
                className="text-4xl md:text-5xl font-black text-white"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                ✨ Trending Courses
              </h2>
              <p className="text-indigo-300/70 mt-3 max-w-md">
                See what the community is learning this month
              </p>
            </div>
            <Link
              href="/courses"
              className="flex items-center gap-2 text-indigo-400 hover:text-indigo-200 transition-colors text-sm font-medium group"
            >
              Browse all
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-10 md:p-16 text-center overflow-hidden relative">
            {/* BG decoration */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10">
              <h2
                className="text-4xl md:text-6xl font-black text-white mb-4"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Join the{" "}
                <span className="gradient-text">SkillSphere</span> Community
              </h2>
              <p className="text-indigo-300/70 text-xl mb-10 max-w-2xl mx-auto">
                Thousands of learners are already transforming their careers. Your
                journey starts with a single click.
              </p>
              <div className="flex flex-wrap justify-center gap-12 mb-12">
                {[
                  { icon: <Users size={24} />, val: "500K+", label: "Active Learners" },
                  { icon: <GraduationCap size={24} />, val: "200+", label: "Expert Courses" },
                  { icon: <Globe size={24} />, val: "30+", label: "Countries" },
                  { icon: <Trophy size={24} />, val: "95%", label: "Success Rate" },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="text-indigo-400">{s.icon}</div>
                    <div
                      className="text-4xl font-black gradient-text"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {s.val}
                    </div>
                    <div className="text-indigo-400/70 text-sm">{s.label}</div>
                  </div>
                ))}
              </div>
              <Link
                href="/register"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-2xl btn-glow hover:from-indigo-500 hover:to-purple-500 transition-all duration-200"
              >
                Start Learning for Free
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
