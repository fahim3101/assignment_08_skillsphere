import Link from "next/link";
import Image from "next/image";
import {
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-indigo-900/30 bg-[rgba(10,8,30,0.8)] backdrop-blur-xl mt-20">
      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10">
                <Image
                  src="/assets/logo-skillsphere.png"
                  alt="SkillSphere"
                  fill
                  className="object-contain"
                />
              </div>
              <span
                className="text-xl font-bold gradient-text"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                SkillSphere
              </span>
            </Link>
            <p className="text-indigo-300/70 text-sm leading-relaxed mb-6">
              Empowering learners worldwide with expert-led courses and
              cutting-edge curriculum.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: FaTwitter, href: "#", label: "Twitter" },
                { Icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
                { Icon: FaGithub, href: "#", label: "GitHub" },
                { Icon: FaYoutube, href: "#", label: "YouTube" },
                { Icon: FaInstagram, href: "#", label: "Instagram" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-indigo-400 hover:text-indigo-200 hover:border-indigo-500/50 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-white font-bold mb-5 text-sm uppercase tracking-widest"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/courses", label: "All Courses" },
                { href: "/my-profile", label: "My Profile" },
                { href: "/login", label: "Login" },
                { href: "/register", label: "Register" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-indigo-300/70 hover:text-indigo-200 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-indigo-500 group-hover:w-3 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3
              className="text-white font-bold mb-5 text-sm uppercase tracking-widest"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Legal
            </h3>
            <ul className="space-y-3">
              {[
                { href: "#", label: "Terms & Conditions" },
                { href: "#", label: "Privacy Policy" },
                { href: "#", label: "Cookie Policy" },
                { href: "#", label: "Refund Policy" },
                { href: "#", label: "Accessibility" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-indigo-300/70 hover:text-indigo-200 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-purple-500 group-hover:w-3 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-white font-bold mb-5 text-sm uppercase tracking-widest"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-indigo-300/70 text-sm">support@skillsphere.io</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-indigo-300/70 text-sm">+1 (800) SKILL-GO</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-indigo-300/70 text-sm">
                    123 Learning Lane,<br />San Francisco, CA 94102
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-indigo-900/20 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-indigo-400/60 text-sm">
            © {currentYear} SkillSphere. All rights reserved.
          </p>
          <p className="text-indigo-400/40 text-xs">
            Built with ❤️ for learners everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
