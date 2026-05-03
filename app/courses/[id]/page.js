"use client";

import { use } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { courses } from "@/data/courses";
import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/StarRating";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Clock,
  Users,
  BookOpen,
  CheckCircle2,
  Lock,
  ArrowLeft,
  PlayCircle,
  Award,
  Globe,
} from "lucide-react";
import toast from "react-hot-toast";

export default function CourseDetailPage({ params }) {
  const { id } = use(params);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const course = courses.find((c) => c.id === parseInt(id));

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please login to view course details");
      router.push(`/login?redirect=/courses/${id}`);
    }
  }, [isPending, session, router, id]);

  if (isPending) return <LoadingSpinner text="Checking access..." />;
  if (!session) return <LoadingSpinner text="Redirecting to login..." />;

  if (!course) {
    return (
      <div className="min-h-screen pt-28 flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Syne, sans-serif" }}>
          Course Not Found
        </h2>
        <Link
          href="/courses"
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Courses
        </Link>
      </div>
    );
  }

  const levelColors = {
    Beginner: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    Intermediate: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    Advanced: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-200 transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} /> Back to Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Details */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29] via-[#0f0c29]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 flex gap-2">
                <span className={`text-xs px-3 py-1.5 rounded-lg font-medium border ${levelColors[course.level]}`}>
                  {course.level}
                </span>
                <span className="text-xs px-3 py-1.5 rounded-lg font-medium bg-indigo-500/20 text-indigo-400">
                  {course.category}
                </span>
              </div>
            </div>

            {/* Title & Rating */}
            <h1
              className="text-3xl md:text-4xl font-black text-white mb-4"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {course.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-6">
              <StarRating rating={course.rating} size={18} />
              <span className="flex items-center gap-1.5 text-indigo-400 text-sm">
                <Users size={15} /> {course.students?.toLocaleString()} students
              </span>
              <span className="flex items-center gap-1.5 text-indigo-400 text-sm">
                <Clock size={15} /> {course.duration}
              </span>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                {course.instructor[0]}
              </div>
              <div>
                <p className="text-xs text-indigo-400">Instructor</p>
                <p className="text-white font-medium">{course.instructor}</p>
              </div>
            </div>

            {/* Description */}
            <div className="glass-card p-6 mb-8">
              <h2
                className="text-xl font-bold text-white mb-4"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                About This Course
              </h2>
              <p className="text-indigo-300/80 leading-relaxed">{course.description}</p>

              {/* What you'll learn */}
              <div className="mt-6 pt-6 border-t border-indigo-900/30">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Award size={18} className="text-yellow-400" />
                  What You&apos;ll Learn
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Build real-world projects",
                    "Industry best practices",
                    "Hands-on coding experience",
                    "Certificate of completion",
                    "Lifetime access to materials",
                    "Community support",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-indigo-200 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Curriculum */}
            <div className="glass-card p-6">
              <h2
                className="text-xl font-bold text-white mb-6"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                📋 Course Curriculum
              </h2>
              <div className="space-y-3">
                {course.curriculum.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 bg-indigo-900/20 rounded-xl border border-indigo-900/30 hover:border-indigo-700/40 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <PlayCircle size={16} className="text-indigo-400 flex-shrink-0" />
                    <span className="text-indigo-200 text-sm">{item}</span>
                    <div className="ml-auto">
                      <Globe size={14} className="text-indigo-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Enrollment Card */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-28">
              {/* Price */}
              <div className="text-center mb-6 pb-6 border-b border-indigo-900/30">
                <div
                  className="text-4xl font-black gradient-text mb-2"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  ${course.price}
                </div>
                <p className="text-indigo-400/60 text-sm line-through">
                  ${(course.price * 2).toFixed(2)}
                </p>
                <p className="text-emerald-400 text-xs font-medium mt-1">
                  50% OFF — Limited Time!
                </p>
              </div>

              {/* Enroll Button */}
              <button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl btn-glow hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 mb-3 text-lg">
                Enroll Now
              </button>
              <p className="text-indigo-400/60 text-xs text-center mb-6">
                30-day money-back guarantee
              </p>

              {/* Course Info */}
              <div className="space-y-4">
                <h3 className="text-white font-bold text-sm">This course includes:</h3>
                {[
                  { icon: <Clock size={15} />, text: `${course.duration} of video content` },
                  { icon: <BookOpen size={15} />, text: `${course.curriculum.length} comprehensive lessons` },
                  { icon: <Globe size={15} />, text: "Lifetime access" },
                  { icon: <Award size={15} />, text: "Certificate of completion" },
                  { icon: <Users size={15} />, text: "Community access" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-indigo-300 text-sm">
                    <span className="text-indigo-400">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>

              {/* Enrolled As */}
              <div className="mt-6 pt-6 border-t border-indigo-900/30">
                <div className="flex items-center gap-3 p-3 bg-emerald-900/20 rounded-xl border border-emerald-700/30">
                  <Lock size={16} className="text-emerald-400" />
                  <div>
                    <p className="text-emerald-300 text-xs font-medium">
                      Logged in as
                    </p>
                    <p className="text-white text-sm font-bold truncate">
                      {session.user?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
