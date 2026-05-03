"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signIn.email({
        email: form.email,
        password: form.password,
      });
      if (error) {
        toast.error(error.message || "Invalid credentials. Please try again.");
      } else {
        toast.success("Welcome back! 🎉");
        router.push(redirect);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signIn.social({ provider: "google", callbackURL: redirect });
    } catch {
      toast.error("Google sign-in failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Auth Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <Image
          src="/assets/auth-background.png"
          alt="Auth Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0c29]/80 to-[#302b63]/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
          <div className="relative w-20 h-20 mb-6">
            <Image src="/assets/logo-skillsphere.png" alt="SkillSphere" fill className="object-contain" />
          </div>
          <h2
            className="text-4xl font-black text-white mb-4"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Welcome Back to <br />
            <span className="gradient-text">SkillSphere</span>
          </h2>
          <p className="text-indigo-300/80 text-lg max-w-md leading-relaxed">
            Continue your learning journey. Your courses, your progress, all waiting for you.
          </p>

          {/* Floating stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 w-full max-w-sm">
            {[
              { val: "500K+", label: "Learners" },
              { val: "200+", label: "Courses" },
              { val: "4.9★", label: "Rating" },
            ].map((s, i) => (
              <div key={i} className="glass-card p-4 text-center">
                <div className="text-2xl font-black gradient-text" style={{ fontFamily: "Syne, sans-serif" }}>{s.val}</div>
                <div className="text-indigo-400/70 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link href="/" className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="relative w-10 h-10">
              <Image src="/assets/logo-skillsphere.png" alt="SkillSphere" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold gradient-text" style={{ fontFamily: "Syne, sans-serif" }}>
              SkillSphere
            </span>
          </Link>

          <div className="mb-8">
            <h1
              className="text-4xl font-black text-white mb-2"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Sign In
            </h1>
            <p className="text-indigo-300/70">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-indigo-400 hover:text-indigo-200 font-medium transition-colors">
                Register free
              </Link>
            </p>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 glass-card hover:border-indigo-500/40 transition-all duration-200 rounded-xl mb-6 text-indigo-100 font-medium disabled:opacity-50"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-indigo-900/60" />
            <span className="text-indigo-500 text-sm">or</span>
            <div className="flex-1 h-px bg-indigo-900/60" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-indigo-200 text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3.5 bg-indigo-900/30 border border-indigo-800/40 rounded-xl text-indigo-100 placeholder-indigo-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-indigo-200 text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-12 py-3.5 bg-indigo-900/30 border border-indigo-800/40 rounded-xl text-indigo-100 placeholder-indigo-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-500 hover:text-indigo-300 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl btn-glow hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-lg"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Login
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-indigo-500/60 text-xs mt-8">
            By signing in, you agree to our{" "}
            <a href="#" className="text-indigo-400 hover:text-indigo-200 transition-colors">
              Terms of Service
            </a>{" "}
            &amp;{" "}
            <a href="#" className="text-indigo-400 hover:text-indigo-200 transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="loader" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
