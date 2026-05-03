"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, User, Image as ImageIcon, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const { error } = await signUp.email({
        email: form.email,
        password: form.password,
        name: form.name,
        image: form.photoURL || undefined,
      });
      if (error) {
        toast.error(error.message || "Registration failed. Try again.");
      } else {
        toast.success("Account created! Welcome to SkillSphere 🎉");
        router.push("/login");
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
      await signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      toast.error("Google sign-in failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Form */}
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
              Create Account
            </h1>
            <p className="text-indigo-300/70">
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-400 hover:text-indigo-200 font-medium transition-colors">
                Sign in here
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

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-indigo-900/60" />
            <span className="text-indigo-500 text-sm">or</span>
            <div className="flex-1 h-px bg-indigo-900/60" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-indigo-200 text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full pl-10 pr-4 py-3.5 bg-indigo-900/30 border border-indigo-800/40 rounded-xl text-indigo-100 placeholder-indigo-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                />
              </div>
            </div>

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

            {/* Photo URL */}
            <div>
              <label className="block text-indigo-200 text-sm font-medium mb-2">
                Photo URL{" "}
                <span className="text-indigo-500/60 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <ImageIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                <input
                  type="url"
                  name="photoURL"
                  value={form.photoURL}
                  onChange={handleChange}
                  placeholder="https://example.com/photo.jpg"
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
                  placeholder="Min. 6 characters"
                  required
                  minLength={6}
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
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl btn-glow hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 disabled:opacity-60 text-lg mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Register
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-indigo-500/60 text-xs mt-6">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-indigo-400 hover:text-indigo-200 transition-colors">Terms of Service</a>{" "}
            &amp;{" "}
            <a href="#" className="text-indigo-400 hover:text-indigo-200 transition-colors">Privacy Policy</a>
          </p>
        </div>
      </div>

      {/* Right: Decorative Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <Image
          src="/assets/auth-background.png"
          alt="Auth Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#0f0c29]/80 to-[#302b63]/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
          <div className="relative w-20 h-20 mb-6">
            <Image src="/assets/logo-skillsphere.png" alt="SkillSphere" fill className="object-contain" />
          </div>
          <h2
            className="text-4xl font-black text-white mb-4"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Join <span className="gradient-text">SkillSphere</span> <br />Today
          </h2>
          <p className="text-indigo-300/80 text-lg max-w-md leading-relaxed mb-10">
            Start learning from world-class instructors and transform your career with in-demand skills.
          </p>

          {/* Benefits */}
          <div className="space-y-3 text-left w-full max-w-xs">
            {[
              "✅ Access 200+ premium courses",
              "✅ Learn at your own pace",
              "✅ Get certified & recognized",
              "✅ Join 500K+ learners worldwide",
              "✅ Lifetime access to materials",
            ].map((b, i) => (
              <p key={i} className="text-indigo-200/80 text-sm">{b}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
