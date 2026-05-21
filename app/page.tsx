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
import { ArrowRight } from "lucide-react";

const LiquidEther = dynamic(() => import("@/components/LiquidEther"), { ssr: false });

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const paraText = "At Prodbiz Solutions, we provide complete digital marketing services including branding, website development, video creation, SEO services, and online advertising to help your business attract more customers and grow online.";

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
      const mobileImg = document.getElementById("home-mobile-img");
      const subtitle = document.getElementById("home-hero-subtitle");

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

      // 2. Mobile (Phone) Slides in from Bottom
      tl.fromTo(mobileImg, 
        { y: 150, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "expo.out" }, 
        "-=0.8"
      );

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
      <section className="relative w-full min-h-[65vh] md:min-h-[100vh] lg:min-h-[100vh] !pt-5 md:!pt-5 !mb-10 md:!mb-28 flex flex-col items-center overflow-hidden bg-black">
        {/* LiquidEther Background Overlay */}
        <div className="absolute inset-0 -z-20">
          {!isMobile ? (
            /* Desktop Version */
            <LiquidEther
              colors={[ '#2197a1', '#2197A1', '#2197a1' ]}
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
              colors={[ '#2197a1', '#2197A1', '#2197a1' ]}
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

        {/* ── TOP AREA: Title & Subtitle ── */}
        <div 
          className="relative z-20 w-full max-w-7xl flex flex-col items-center text-center !px-4 md:!px-6"
          style={{ paddingTop: "clamp(5rem, 8vw, 8rem)", paddingBottom: "1rem" }}
        >
          <span 
            id="home-hero-subtitle"
            className="inline-block font-bold text-xs md:text-sm uppercase tracking-[0.25em] !mb-4"
            style={{ color: "#5eead4", textShadow: "0 0 18px rgba(94,234,212,0.7)", opacity: 0 }}
          >
            Award-Winning Digital Growth Agency
          </span>

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
              <span className="word inline-block whitespace-nowrap text-[#ff8c00]" style={{ textShadow: "0 0 30px rgba(255,140,0,0.4)" }}>
                {"Prodbiz".split("").map((char, charIndex) => (
                  <span key={charIndex} className="char inline-block">{char}</span>
                ))} &nbsp;
              </span>
              <span className="word inline-block whitespace-nowrap text-[#ff8c00]" style={{ textShadow: "0 0 30px rgba(255,140,0,0.4)" }}>
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
              <span className="word inline-block whitespace-nowrap text-[#ff8c00]" style={{ textShadow: "0 0 30px rgba(255,140,0,0.4)" }}>
                {"Prodbiz".split("").map((char, charIndex) => (
                  <span key={charIndex} className="char inline-block">{char}</span>
                ))} &nbsp;
              </span>
              <span className="word inline-block whitespace-nowrap text-[#ff8c00]" style={{ textShadow: "0 0 30px rgba(255,140,0,0.4)" }}>
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
          {/* Floating Phone Visual */}
          <div 
            id="home-mobile-img"
            className="absolute z-30 wd-bob"
            style={{ 
              top: isMobile ? "clamp(10px, 4vw, 30px)" : "clamp(100px, 18vw, 100px)",
              left: "50%",
              width: isMobile ? "clamp(180px, 45vw, 240px)" : "clamp(480px, 32vw, 560px)",
              filter: "drop-shadow(0 0 50px rgba(26,133,149,1)) drop-shadow(0 25px 60px rgba(0,0,0,0.9))",
              borderRadius: "32px",
              opacity: 0
            }}
          >
            <NextImage 
              src="/images/website-dev-hero-img.png" 
              alt="Digital Growth Solutions"
              width={500}
              height={900}
              className="w-full h-auto"
            />
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
            <div className="absolute w-3 h-3 rounded-full animate-pulse" style={{ top: "15%", left: "10%", background: "#5eead4", boxShadow: "0 0 20px #5eead4" }} />
            <div className="absolute w-2 h-2 rounded-full animate-pulse" style={{ top: "35%", right: "12%", background: "#ffffff", boxShadow: "0 0 15px #fff", animationDelay: "0.5s" }} />

            {/* Dome Content: Paragraph & Two Buttons */}
            <div className="absolute bottom-15 left-0 right-0 z-40 flex flex-col items-center px-4 text-center">

              
              <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-2 md:gap-4 lg:gap-6">
                <Button
                  href="/get-proposal"
                  className="home-hero-btn-primary"
                >
                  <span>Get Free Consultation</span>
                  <ArrowRight size={16} className="md:w-[24px] md:h-[24px]" />
                </Button>
                <Button
                  href="/case-studies"
                  className="home-hero-btn-secondary"
                >
                  <span>Explore CaseStudies</span>
                  <ArrowRight size={16} className="md:w-[24px] md:h-[24px]" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Keyframes ── */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes wd-bob {
            0%,100% { transform: translateX(-50%) translateY(-45%); }
            50%     { transform: translateX(-50%) translateY(calc(-45% - 20px)); }
          }
          .wd-bob { animation: wd-bob 4.5s ease-in-out infinite; }
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
