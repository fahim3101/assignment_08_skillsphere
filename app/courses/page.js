"use client";

import { useState, useMemo } from "react";
import { courses } from "@/data/courses";
import CourseCard from "@/components/CourseCard";
import { Search, Filter, BookOpen } from "lucide-react";

const CATEGORIES = ["All", "Development", "Design", "Marketing", "Data Science", "Security"];
const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || c.category === category;
      const matchLevel = level === "All" || c.level === level;
      return matchSearch && matchCat && matchLevel;
    });
  }, [search, category, level]);

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-6">
            <BookOpen size={14} />
            {courses.length} Courses Available
          </div>
          <h1
            className="text-5xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            All <span className="gradient-text">Courses</span>
          </h1>
          <p className="text-indigo-300/70 text-lg max-w-xl mx-auto">
            Explore our full library of expert-crafted courses across all disciplines
          </p>
        </div>

        {/* Search & Filters */}
        <div className="glass-card p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses by title..."
                className="w-full pl-11 pr-4 py-3 bg-indigo-900/30 border border-indigo-800/40 rounded-xl text-indigo-100 placeholder-indigo-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-indigo-400 flex-shrink-0" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-3 bg-indigo-900/30 border border-indigo-800/40 rounded-xl text-indigo-200 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#1e1b4b]">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="px-4 py-3 bg-indigo-900/30 border border-indigo-800/40 rounded-xl text-indigo-200 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
            >
              {LEVELS.map((l) => (
                <option key={l} value={l} className="bg-[#1e1b4b]">
                  {l}
                </option>
              ))}
            </select>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  category === cat
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : "bg-indigo-900/30 text-indigo-400 hover:bg-indigo-800/40 hover:text-indigo-200 border border-indigo-800/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-indigo-400 text-sm">
            Showing{" "}
            <span className="text-indigo-200 font-bold">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "course" : "courses"}
            {search && (
              <span>
                {" "}
                for &ldquo;<span className="text-indigo-300">{search}</span>&rdquo;
              </span>
            )}
          </p>
          {(search || category !== "All" || level !== "All") && (
            <button
              onClick={() => { setSearch(""); setCategory("All"); setLevel("All"); }}
              className="text-xs text-indigo-400 hover:text-indigo-200 transition-colors border border-indigo-800/30 px-3 py-1 rounded-lg hover:border-indigo-500/40"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Courses Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              No courses found
            </h3>
            <p className="text-indigo-400 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => { setSearch(""); setCategory("All"); setLevel("All"); }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
