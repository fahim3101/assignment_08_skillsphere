"use client";

import { useState, useEffect } from "react";
import { useSession, updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import toast from "react-hot-toast";
import { User, Image as ImageIcon, ArrowLeft, Save, CheckCircle2 } from "lucide-react";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", image: "" });
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
    if (session?.user) {
      setForm({
        name: session.user.name || "",
        image: session.user.image || "",
      });
      setPreview(session.user.image || "");
    }
  }, [isPending, session, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "image") setPreview(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setSaving(true);
    try {
      await updateUser({ name: form.name, image: form.image || undefined });
      toast.success("Profile updated successfully! 🎉");
      router.push("/my-profile");
    } catch {
      toast.error("Failed to update profile. Try again.");
    } finally {
      setSaving(false);
    }
  };

  if (isPending) return <LoadingSpinner text="Loading..." />;
  if (!session) return <LoadingSpinner text="Redirecting..." />;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/my-profile"
          className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-200 transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} /> Back to Profile
        </Link>

        <div className="glass-card p-8">
          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-3xl font-black text-white mb-2"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Update <span className="gradient-text">Information</span>
            </h1>
            <p className="text-indigo-300/70">
              Update your display name and profile picture
            </p>
          </div>

          {/* Avatar Preview */}
          <div className="flex items-center gap-6 mb-8 p-5 bg-indigo-900/20 rounded-2xl border border-indigo-900/30">
            <div className="relative w-20 h-20 flex-shrink-0">
              {preview ? (
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover rounded-full ring-4 ring-indigo-500/30"
                  onError={() => setPreview("")}
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-3xl font-black text-white ring-4 ring-indigo-500/30">
                  {form.name?.[0]?.toUpperCase() || "?"}
                </div>
              )}
            </div>
            <div>
              <p className="text-white font-bold text-lg" style={{ fontFamily: "Syne, sans-serif" }}>
                {form.name || "Your Name"}
              </p>
              <p className="text-indigo-400 text-sm">{session.user.email}</p>
              <p className="text-indigo-500/60 text-xs mt-1">Preview updates in real-time</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-indigo-200 text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full pl-10 pr-4 py-3.5 bg-indigo-900/30 border border-indigo-800/40 rounded-xl text-indigo-100 placeholder-indigo-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-indigo-200 text-sm font-medium mb-2">
                Profile Photo URL
              </label>
              <div className="relative">
                <ImageIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://example.com/your-photo.jpg"
                  className="w-full pl-10 pr-4 py-3.5 bg-indigo-900/30 border border-indigo-800/40 rounded-xl text-indigo-100 placeholder-indigo-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                />
              </div>
              <p className="text-indigo-500/60 text-xs mt-2">
                Paste a direct link to your image (JPG, PNG, WebP supported)
              </p>
            </div>

            {/* Notes */}
            <div className="p-4 bg-indigo-900/20 rounded-xl border border-indigo-800/30">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="text-indigo-300/70 text-xs leading-relaxed">
                  Only your name and profile photo can be updated here. To change your email
                  or password, please contact support.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-2">
              <Link
                href="/my-profile"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 glass-card text-indigo-200 font-medium rounded-xl hover:border-indigo-500/40 transition-all duration-200"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl btn-glow hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 disabled:opacity-60"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save size={16} /> Update Information
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
