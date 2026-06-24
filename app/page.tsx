"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import Link from "next/link";
import Button from "@/components/Button";
import TrustIndicators from "@/components/TrustIndicators";
import SolutionsSection from "@/components/SolutionsSection";
import AboutSection from "@/components/AboutSection";
import HowWeWork from "@/components/HowWeWork";
import WhyChooseUs from "@/components/WhyChooseUs";
import CaseStudiesPreview from "@/components/CaseStudiesPreview";
import ClientsSection from "@/components/ClientsSection";
import FinalCTA from "@/components/FinalCTA";
import dynamic from "next/dynamic";
import NextImage from "next/image";
import { useState } from "react";
import { ArrowRight, Layout, TrendingUp, Share2, Briefcase, Handshake } from "lucide-react";
import { FaGlobe, FaChartBar, FaLaptopCode, FaBullhorn, FaPhone } from "react-icons/fa";

const LiquidEther = dynamic(() => import("@/components/LiquidEther"), { ssr: false });

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const rollingData = [
    { text: "Website Development", icon: <Layout className="w-4 h-4 md:w-6 md:h-6 !mr-2" /> },
    { text: "SEO Optimization", icon: <TrendingUp className="w-4 h-4 md:w-6 md:h-6 !mr-2" /> },
    { text: "Social Media Handling", icon: <Share2 className="w-4 h-4 md:w-6 md:h-6 !mr-2" /> },
    { text: "Digital Projects", icon: <Briefcase className="w-4 h-4 md:w-6 md:h-6 !mr-2" /> },
    { text: "Partners (Trusted collaborations and clients)", icon: <Handshake className="w-4 h-4 md:w-6 md:h-6 !mr-2" /> }
  ];

  const paraText = "At Prodbiz Solutions, we provide complete digital marketing services including branding, website development, video creation, SEO services, and online advertising to help your business attract more customers and grow online.";

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rollingData.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [rollingData.length]);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!mounted || !titleRef.current || !buttonsRef.current) return;

    const elTitle = titleRef.current;
    const elButtons = buttonsRef.current;

    const ctx = gsap.context(() => {
      const titleChars = elTitle.querySelectorAll(".char");
      const buttons = elButtons.children;
      const sphere = document.getElementById("home-half-sphere");
      const subtitle = document.getElementById("home-hero-subtitle");
      const rollingTextContainer = document.getElementById("rolling-text-container");

      const tl = gsap.timeline({ delay: 0.3 });

      // 1. Sphere Fades in Smoothly & Above Content Slides in from Left
      tl.fromTo(sphere,
        { opacity: 0, scale: 0.96, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.8, ease: "power2.out" }
      );

      tl.fromTo(subtitle,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" },
        "<"
      );

      if (rollingTextContainer) {
        tl.fromTo(rollingTextContainer,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" },
          "<0.5"
        );
      }

      tl.fromTo(titleChars,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.02,
          ease: "power4.out",
        },
        "<0.2"
      );


      if (paraRef.current) {
        tl.fromTo(
          paraRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
          "-=0.6"
        );
      }

      // 4. Buttons Animation (Along with mobile)
      tl.fromTo(
        buttons,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.9"
      );
    });

    return () => ctx.revert();
  }, [mounted]);



  return (
    <main className="flex min-h-screen flex-col md:items-center justify-between">
      {/* Redesigned Hero Section */}
      <section className="relative w-full min-h-[45vh] md:min-h-[100vh] lg:min-h-[100vh] !pt-5 md:!pt-5 !mb-10 md:!mb-28 flex flex-col items-center overflow-hidden bg-black">
        {/* LiquidEther Background Overlay */}
        <div className="absolute inset-0 -z-20">
          {!isMobile ? (
            /* Desktop Version */
            <LiquidEther
              colors={['#2197a1', '#2197A1', '#2197a1']}
              mouseForce={20}
              cursorSize={100}
              isViscous
              viscous={30}
              iterationsViscous={32}
              iterationsPoisson={32}
              resolution={0.5}
              isBounce={false}
              autoDemo
              autoSpeed={0.5}
              autoIntensity={2.2}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
              style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            />
          ) : (
            /* Optimized Mobile Version */
            <LiquidEther
              colors={['#2197a1', '#2197A1', '#2197a1']}
              mouseForce={15}
              cursorSize={80}
              isViscous
              viscous={40}
              iterationsViscous={16}
              iterationsPoisson={16}
              resolution={0.4}
              isBounce={false}
              autoDemo
              autoSpeed={0.4}
              autoIntensity={2.5}
              takeoverDuration={0.2}
              autoResumeDelay={2000}
              autoRampDuration={0.4}
              style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            />
          )}
        </div>

        {/* Animated Grid Background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-100"
          style={{
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)'
          }}
        >
          <div
            className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              animation: 'grid-move 4s linear infinite'
            }}
          />
        </div>

        {/* 3D Icons Background */}
        <div className="absolute inset-0 pointer-events-none">
          <FaGlobe className="absolute left-5 md:left-10 top-16 md:top-30 text-[#5eead4] opacity-30" size={30} style={{ animation: 'floatIcon 6s ease-in-out infinite, iconFade 5s ease-in-out infinite' }} />
          <FaChartBar className="absolute right-16 top-40 text-[#5eead4] opacity-30" size={30} style={{ animation: 'floatIcon 7s ease-in-out infinite 1s, iconFade 5s ease-in-out infinite' }} />
          <FaLaptopCode className="absolute left-5 md:left-50 bottom-58 md:bottom-70 text-[#5eead4] opacity-30" size={30} style={{ animation: 'floatIcon 5s ease-in-out infinite 0.5s, iconFade 5s ease-in-out infinite' }} />
          <FaBullhorn className="absolute right-10 md:right-15 bottom-50 text-[#5eead4] opacity-30" size={30} style={{ animation: 'floatIcon 8s ease-in-out infinite 2s, iconFade 5s ease-in-out infinite' }} />
        </div>

        {/* ── TOP AREA: Title & Subtitle ── */}
        <div
          className="relative z-20 w-full max-w-7xl flex flex-col items-center text-center !px-4 md:!px-6"
          style={{ paddingTop: "clamp(5rem, 8vw, 8rem)", paddingBottom: "1rem" }}
        >

          {isMobile ? (
            <h2
              ref={titleRef}
              className="font-black !text-white leading-[1.1] max-w-7xl md:!mb-0 perspective-1000"
              style={{
                fontSize: "clamp(1rem, 3.5vw, 4rem)",
                textShadow: "0 4px 24px rgba(0,0,0,0.55)"
              }}
            >
              {"Grow Your Business Online with ".split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="word inline-block whitespace-nowrap">
                  {word.split("").map((char, charIndex) => (
                    <span key={charIndex} className="char inline-block">{char}</span>
                  ))}
                  {word !== "" && <span className="inline-block">&nbsp;</span>}
                </span>
              ))}
              <span className="word inline-block whitespace-nowrap text-[#e76038]" style={{ textShadow: "0 0 30px rgba(255,140,0,0.4)" }}>
                {"Prodbiz".split("").map((char, charIndex) => (
                  <span key={charIndex} className="char inline-block">{char}</span>
                ))} &nbsp;
              </span>
              <span className="word inline-block whitespace-nowrap text-[#e76038]" style={{ textShadow: "0 0 30px rgba(255,140,0,0.4)" }}>
                {"Solutions".split("").map((char, charIndex) => (
                  <span key={charIndex} className="char inline-block">{char}</span>
                ))}
              </span>
            </h2>
          ) : (
            <h1
              ref={titleRef}
              className="font-black !text-white leading-[1.1] max-w-7xl md:!mb-0 perspective-1000"
              style={{
                fontSize: "clamp(1rem, 3.5vw, 4rem)",
                textShadow: "0 4px 24px rgba(0,0,0,0.55)"
              }}
            >
              {"Grow Your Business Online with ".split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="word inline-block whitespace-nowrap">
                  {word.split("").map((char, charIndex) => (
                    <span key={charIndex} className="char inline-block">{char}</span>
                  ))}
                  {word !== "" && <span className="inline-block">&nbsp;</span>}
                </span>
              ))}
              <span className="word inline-block whitespace-nowrap text-[#e76038]" style={{ textShadow: "0 0 30px rgba(255,140,0,0.4)" }}>
                {"Prodbiz".split("").map((char, charIndex) => (
                  <span key={charIndex} className="char inline-block">{char}</span>
                ))} &nbsp;
              </span>
              <span className="word inline-block whitespace-nowrap text-[#e76038]" style={{ textShadow: "0 0 30px rgba(255,140,0,0.4)" }}>
                {"Solutions".split("").map((char, charIndex) => (
                  <span key={charIndex} className="char inline-block">{char}</span>
                ))}
              </span>
            </h1>
          )}
        </div>

        {/* ── SPHERE WRAP: Dome & Mobile Visual ── */}
        <div
          className="relative z-10 w-full flex justify-center"
          style={{ marginTop: "auto", paddingTop: "clamp(44px, 6vw,40px)" }}
        >

          {/* Animated Arrow & Rolling Text */}
          <div id="rolling-text-container" className="absolute left-0 right-0 md:left-[0px] top-[0px] md:top-[-30px] z-50 flex items-center justify-center opacity-0">
            <div className="!pl-0 md:!pl-8 md:!mt-6 h-[60px] md:h-[60px] !text-center overflow-hidden relative w-[320px] md:w-[600px]">
              {rollingData.map((item, i) => (
                <div
                  key={i}
                  className={`absolute left-0 top-0 w-full transition-all duration-500 ease-in-out font-bold text-[#5eead4] text-[13px] md:text-xl flex items-center justify-center
                    ${i === textIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  `}
                  style={{ textShadow: "0 0 12px rgba(94,234,212,0.6)" }}
                >
                  {item.icon} <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Glass Dome */}
          <div
            id="home-half-sphere"
            style={{
              width: "100%",
              height: isMobile ? "240px" : "clamp(380px, 60vh, 700px)",
              borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
              background: "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(26,133,149,0.42) 45%, rgba(7,27,36,0.85) 100%)",
              backdropFilter: "blur(28px) saturate(180%)",
              WebkitBackdropFilter: "blur(28px) saturate(180%)",
              border: "1.5px solid rgba(255,255,255,0.35)",
              borderBottom: "none",
              boxShadow: "0 -24px 100px rgba(26,133,149,0.7), inset 0 28px 80px rgba(255,255,255,0.15)",
              position: "relative",
              overflow: "hidden",
              opacity: 0
            }}
          >
            {/* Specular highlights & Glow dots (same as website-dev) */}
            <div className="absolute pointer-events-none" style={{ top: "3%", left: "15%", right: "15%", height: "40%", borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%)" }} />
            <div className="absolute w-3 h-3 rounded-full animate-pulse" style={{ top: "75%", left: "10%", background: "#ffffff", boxShadow: "0 0 20px #5eead4" }} />
            <div className="absolute w-2 h-2 rounded-full animate-pulse" style={{ top: "35%", right: "12%", background: "#ffffff", boxShadow: "0 0 15px #fff", animationDelay: "0.5s" }} />
            <div className="absolute w-1.5 h-1.5 rounded-full animate-pulse" style={{ top: "30%", left: "18%", background: "#ffffff", boxShadow: "0 0 10px #5eead4", animationDelay: "0.8s" }} />
            <div className="absolute w-2.5 h-2.5 rounded-full animate-pulse" style={{ top: "12%", right: "28%", background: "#ffffff", boxShadow: "0 0 15px #fff", animationDelay: "1.5s" }} />
            <div className="absolute w-1.5 h-1.5 rounded-full animate-pulse" style={{ top: "72%", right: "29%", background: "#ffffff", boxShadow: "0 0 10px #e76038", animationDelay: "0.3s" }} />

            {/* Dome Content: Paragraph & Two Buttons */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 md:gap-8 px-6 md:px-12 text-center pt-12 pb-12 md:pb-20">
              <p ref={paraRef} className="w-[60%] text-[#e2e8f0] !text-[14px] md:!text-[22px] leading-relaxed md:leading-loose">
                We help your business get <strong className="text-[#fefefe]">more customers online</strong>. From designing <strong className="text-[#fefefe]">professional websites</strong> to running <strong className="text-[#fefefe]">effective ads</strong>, we are your trusted partner for <strong className="text-[#fefefe]">digital growth</strong>.
              </p>
              <div ref={buttonsRef} className="flex flex-row flex-wrap gap-0 md:gap-4 lg:gap-6 justify-center mt-4">
                <Button
                  href="/get-proposal"
                  className="home-hero-btn-primary !bg-transparent md:!bg-[#e67038] md:hover:!bg-transparent !px-3 !py-2 sm:!px-5 sm:!py-3 !border-1 !border-transparent md:!border-2 md:hover:!border-2 md:hover:!border-[#FEFEFE] !shadow-none"
                >
                  <span className="hidden md:inline">Get Free Consultation</span>
                  <ArrowRight size={16} className="hidden md:inline md:w-[24px] md:h-[24px]" />
                  <div className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[#ff6600] shadow-lg transform hover:scale-110"><FaPhone className="text-white" /></div>
                </Button>
                <Button
                  href="/our-work"
                  className="home-hero-btn-secondary !px-3 !py-2 sm:!px-5 sm:!py-3 !text-[#fefefe]"
                >
                  <span>Explore Our Work</span>
                  <ArrowRight size={16} className="md:w-[24px] md:h-[24px]" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Keyframes ── */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes grid-move {
            0% { transform: translate(0, 0); }
            100% { transform: translate(60px, 60px); }
          }
          @keyframes pulse-glow {
            0% { text-shadow: 0 0 10px rgba(94,234,212,0.3); }
            100% { text-shadow: 0 0 20px rgba(94,234,212,1), 0 0 30px rgba(94,234,212,0.6); }
          }
          @keyframes wd-bob {
            0%,100% { transform: translateX(-50%) translateY(-45%); }
            50%     { transform: translateX(-50%) translateY(calc(-45% - 20px)); }
          }
          .wd-bob { animation: wd-bob 4.5s ease-in-out infinite; }
@keyframes iconFade { 0%,100% { opacity:0.2; } 50% { opacity:0.6; } }
        `}} />
      </section>

      <TrustIndicators />
      <SolutionsSection />
      <AboutSection />
      <HowWeWork />
      <WhyChooseUs />
      <CaseStudiesPreview />
      <ClientsSection />
      <FinalCTA />
    </main>
  );
}
