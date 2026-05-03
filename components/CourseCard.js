import Link from "next/link";
import Image from "next/image";
import { Star, Clock, Users, BookOpen, ArrowRight } from "lucide-react";

export default function CourseCard({ course }) {
  const levelColors = {
    Beginner: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    Intermediate: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    Advanced: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  };

  const categoryColors = {
    Development: "bg-indigo-500/20 text-indigo-400",
    Design: "bg-pink-500/20 text-pink-400",
    Marketing: "bg-orange-500/20 text-orange-400",
    "Data Science": "bg-cyan-500/20 text-cyan-400",
    Security: "bg-red-500/20 text-red-400",
  };

  return (
    <div className="course-card glass-card overflow-hidden group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29] via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`text-xs px-2 py-1 rounded-lg font-medium border ${levelColors[course.level] || "bg-indigo-500/20 text-indigo-400"}`}
          >
            {course.level}
          </span>
          {course.trending && (
            <span className="text-xs px-2 py-1 rounded-lg font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
              🔥 Trending
            </span>
          )}
          {course.isNew && (
            <span className="text-xs px-2 py-1 rounded-lg font-medium bg-green-500/20 text-green-400 border border-green-500/30">
              ✨ New
            </span>
          )}
        </div>

        {/* Category */}
        <div className="absolute bottom-3 right-3">
          <span
            className={`text-xs px-2 py-1 rounded-lg font-medium ${categoryColors[course.category] || "bg-indigo-500/20 text-indigo-400"}`}
          >
            {course.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-300 transition-colors"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {course.title}
        </h3>

        <p className="text-indigo-300/70 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            {course.instructor[0]}
          </div>
          <span className="text-indigo-400 text-sm">{course.instructor}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-indigo-400/70 mb-5">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} />
            {course.students?.toLocaleString() || "N/A"}
          </span>
          <span className="flex items-center gap-1">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400 font-medium">{course.rating}</span>
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-indigo-900/30">
          <span className="text-2xl font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>
            ${course.price}
          </span>
          <Link
            href={`/courses/${course.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg btn-glow hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 group/btn"
          >
            View Details
            <ArrowRight
              size={14}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
