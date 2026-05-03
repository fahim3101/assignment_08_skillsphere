"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  User,
  Mail,
  Edit3,
  BookOpen,
  Trophy,
  Clock,
  ArrowRight,
  Shield,
  Calendar,
} from "lucide-react";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  if (isPending) return <LoadingSpinner text="Loading your profile..." />;
  if (!session) return <LoadingSpinner text="Redirecting..." />;

  const user = session.user;
  const joinDate = new Date(user.createdAt || Date.now()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-4xl font-black text-white"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            My <span className="gradient-text">Profile</span>
          </h1>
          <p className="text-indigo-300/70 mt-2">
            Manage your account and track your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Profile Card */}
          <div className="lg:col-span-1">
            <div className="glass-card p-8 text-center">
              {/* Avatar */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 blur-lg opacity-50" />
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    fill
                    className="object-cover rounded-full relative z-10 ring-4 ring-indigo-500/30"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-5xl font-black text-white relative z-10 ring-4 ring-indigo-500/30">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>

              <h2
                className="text-2xl font-black text-white mb-1"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {user.name}
              </h2>
              <p className="text-indigo-400 text-sm mb-2">{user.email}</p>

              {/* Verified badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-medium mb-6">
                <Shield size={12} />
                Verified Account
              </div>

              {/* Join date */}
              <div className="flex items-center justify-center gap-2 text-indigo-400/60 text-xs mb-6">
                <Calendar size={12} />
                Joined {joinDate}
              </div>

              {/* Edit Button */}
              <Link
                href="/my-profile/update"
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl btn-glow hover:from-indigo-500 hover:to-purple-500 transition-all duration-200"
              >
                <Edit3 size={16} />
                Edit Profile
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="glass-card p-6 mt-6">
              <h3
                className="text-white font-bold mb-4"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Learning Stats
              </h3>
              <div className="space-y-4">
                {[
                  { icon: <BookOpen size={16} />, label: "Courses Enrolled", val: "0" },
                  { icon: <Trophy size={16} />, label: "Certificates Earned", val: "0" },
                  { icon: <Clock size={16} />, label: "Hours Learned", val: "0h" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-indigo-400 text-sm">
                      {s.icon}
                      {s.label}
                    </div>
                    <span className="text-white font-bold text-sm">{s.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Info */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  Account Information
                </h3>
                <Link
                  href="/my-profile/update"
                  className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-200 transition-colors text-sm"
                >
                  <Edit3 size={14} /> Edit
                </Link>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-indigo-900/20 rounded-xl border border-indigo-900/30">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="text-indigo-400/60 text-xs mb-0.5">Full Name</p>
                    <p className="text-white font-medium">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-indigo-900/20 rounded-xl border border-indigo-900/30">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-indigo-400/60 text-xs mb-0.5">Email Address</p>
                    <p className="text-white font-medium">{user.email}</p>
                  </div>
                </div>

                {user.image && (
                  <div className="flex items-center gap-4 p-4 bg-indigo-900/20 rounded-xl border border-indigo-900/30">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
                      <User size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-indigo-400/60 text-xs mb-0.5">Profile Photo URL</p>
                      <p className="text-white font-medium truncate text-sm">{user.image}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* My Courses (placeholder) */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  My Courses
                </h3>
                <Link
                  href="/courses"
                  className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-200 transition-colors text-sm"
                >
                  Browse courses <ArrowRight size={14} />
                </Link>
              </div>

              <div className="text-center py-12">
                <div className="text-5xl mb-4">📚</div>
                <h4 className="text-white font-bold mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
                  No courses yet
                </h4>
                <p className="text-indigo-400/70 text-sm mb-6">
                  Start your learning journey today
                </p>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl btn-glow hover:from-indigo-500 hover:to-purple-500 transition-all duration-200"
                >
                  Browse Courses <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
