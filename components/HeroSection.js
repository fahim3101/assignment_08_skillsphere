"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Zap } from "lucide-react";

const slides = [
  {
    badge: "🚀 Start Learning Today",
    title: "Upgrade Your\nSkills Today",
    highlight: "Today",
    subtitle:
      "Join 500,000+ learners mastering in-demand skills with world-class instructors",
    cta: "Explore Courses",
    ctaHref: "/courses",
    stat1: { value: "500K+", label: "Learners" },
    stat2: { value: "200+", label: "Courses" },
    stat3: { value: "4.9★", label: "Rating" },
    bg: "from-indigo-900/50 via-purple-900/30 to-transparent",
  },
  {
    badge: "🏆 Expert Instructors",
    title: "Learn from\nIndustry Experts",
    highlight: "Experts",
    subtitle:
      "Real-world curriculum built by professionals working at top tech companies worldwide",
    cta: "Meet Instructors",
    ctaHref: "/courses",
    stat1: { value: "50+", label: "Experts" },
    stat2: { value: "98%", label: "Satisfaction" },
    stat3: { value: "30+", label: "Countries" },
    bg: "from-purple-900/50 via-pink-900/20 to-transparent",
  },
  {
    badge: "💡 Learn at Your Pace",
    title: "Your Career,\nYour Schedule",
    highlight: "Schedule",
    subtitle:
      "Flexible learning paths that fit around your life. Learn anywhere, anytime, on any device.",
    cta: "Get Started Free",
    ctaHref: "/register",
    stat1: { value: "24/7", label: "Access" },
    stat2: { value: "Life", label: "time Access" },
    stat3: { value: "Cert", label: "ificates" },
    bg: "from-cyan-900/40 via-indigo-900/30 to-transparent",
  },
];

export default function HeroSection() {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Dynamically import Swiper to avoid SSR issues
    const initSwiper = async () => {
      const { Swiper } = await import("swiper");
      const { Pagination, Autoplay, EffectFade } = await import(
        "swiper/modules"
      );

      if (swiperRef.current) {
        new Swiper(swiperRef.current, {
          modules: [Pagination, Autoplay, EffectFade],
          effect: "fade",
          loop: true,
          autoplay: { delay: 5000, disableOnInteraction: false },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        });
      }
    };
    initSwiper();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/hero-banner.png"
          alt="Hero Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0c29] via-[#0f0c29]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29] via-transparent to-transparent" />
      </div>

      {/* Decorative orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Swiper */}
      <div ref={swiperRef} className="swiper w-full relative z-10">
        <div className="swiper-wrapper">
          {slides.map((slide, idx) => (
            <div key={idx} className="swiper-slide">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="max-w-3xl">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-8 animate-fade-in">
                    <Zap size={14} className="text-yellow-400" />
                    {slide.badge}
                  </div>

                  {/* Title */}
                  <h1
                    className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6 text-white"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {slide.title.split("\n").map((line, i) => (
                      <span key={i} className="block">
                        {line.includes(slide.highlight) ? (
                          <>
                            {line.split(slide.highlight)[0]}
                            <span className="gradient-text glow-text">
                              {slide.highlight}
                            </span>
                            {line.split(slide.highlight)[1]}
                          </>
                        ) : (
                          line
                        )}
                      </span>
                    ))}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-indigo-200/80 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                    {slide.subtitle}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-4 mb-16">
                    <Link
                      href={slide.ctaHref}
                      className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-2xl btn-glow hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 group"
                    >
                      {slide.cta}
                      <ArrowRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                    <button className="flex items-center gap-3 px-8 py-4 glass-card text-white font-medium text-lg rounded-2xl hover:border-indigo-500/50 transition-all duration-200">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/30 flex items-center justify-center">
                        <Play size={14} className="text-indigo-300 ml-0.5" />
                      </div>
                      Watch Preview
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-8">
                    {[slide.stat1, slide.stat2, slide.stat3].map((stat, i) => (
                      <div key={i} className="text-center">
                        <div
                          className="text-3xl md:text-4xl font-black gradient-text"
                          style={{ fontFamily: "Syne, sans-serif" }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-indigo-400/70 text-sm mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="swiper-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-20" />
      </div>
    </section>
  );
}
