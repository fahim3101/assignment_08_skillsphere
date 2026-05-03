"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Menu, X, BookOpen, LogOut, User, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully!");
    router.push("/");
    setDropdownOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(15,12,41,0.95)] backdrop-blur-xl shadow-lg shadow-indigo-900/20 border-b border-indigo-900/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <Image
                src="/assets/logo-skillsphere.png"
                alt="SkillSphere"
                fill
                className="object-contain"
              />
            </div>
            <span
              className="text-xl font-display font-800 gradient-text"
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
            >
              SkillSphere
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-indigo-200 hover:text-white transition-colors duration-200 font-medium text-sm tracking-wide relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            ))}

            {session && (
              <Link
                href="/my-profile"
                className="text-indigo-200 hover:text-white transition-colors duration-200 font-medium text-sm tracking-wide relative group"
              >
                My Profile
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            )}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-indigo-800 animate-pulse" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl glass-card hover:border-indigo-500/40 transition-all duration-200"
                >
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name}
                      width={32}
                      height={32}
                      className="rounded-full ring-2 ring-indigo-500"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                      {session.user?.name?.[0]?.toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm text-indigo-100 font-medium max-w-24 truncate">
                    {session.user?.name}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-indigo-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 glass-card border border-indigo-800/40 rounded-xl overflow-hidden shadow-2xl shadow-indigo-900/50 z-50">
                    <Link
                      href="/my-profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-indigo-200 hover:bg-indigo-800/30 hover:text-white transition-colors"
                    >
                      <User size={14} /> My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-rose-400 hover:bg-rose-900/20 hover:text-rose-300 transition-colors"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2 text-sm font-medium text-indigo-200 hover:text-white transition-colors border border-indigo-700/40 rounded-xl hover:border-indigo-500/60 neon-border"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl btn-glow hover:from-indigo-500 hover:to-purple-500 transition-all duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-indigo-200 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[rgba(15,12,41,0.98)] backdrop-blur-xl border-t border-indigo-900/30 px-4 pb-6 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 text-indigo-200 hover:text-white transition-colors font-medium border-b border-indigo-900/20"
            >
              {link.label}
            </Link>
          ))}
          {session && (
            <Link
              href="/my-profile"
              onClick={() => setIsOpen(false)}
              className="block py-3 text-indigo-200 hover:text-white transition-colors font-medium border-b border-indigo-900/20"
            >
              My Profile
            </Link>
          )}
          <div className="mt-4 flex flex-col gap-3">
            {session ? (
              <>
                <div className="flex items-center gap-3 pb-3 border-b border-indigo-900/20">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name}
                      width={40}
                      height={40}
                      className="rounded-full ring-2 ring-indigo-500"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {session.user?.name?.[0]?.toUpperCase()}
                    </div>
                  )}
                  <span className="text-indigo-100 font-medium">
                    {session.user?.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-rose-400 hover:text-rose-300 transition-colors py-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-3 border border-indigo-700/40 rounded-xl text-indigo-200 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white font-bold"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
