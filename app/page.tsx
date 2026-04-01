"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import Link from "next/link";
import Button from "@/components/Button";
import TrustIndicators from "@/components/TrustIndicators";
import SolutionsSection from "@/components/SolutionsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import CaseStudiesPreview from "@/components/CaseStudiesPreview";
import ClientsSection from "@/components/ClientsSection";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const paraText = "We deliver scalable IT solutions and data-driven digital marketing strategies to help your business grow and thrive online.";

  useEffect(() => {
    if (!titleRef.current || !paraRef.current || !buttonsRef.current) return;

    const words = paraRef.current.querySelectorAll(".para-word");
    const chars = titleRef.current.querySelectorAll(".char");
    const buttons = buttonsRef.current.children;
    
    const tl = gsap.timeline({ delay: 0.5 });

    // H1 Animation
    tl.fromTo(
      chars,
      { y: -100, opacity: 0, rotateX: -45 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.03,
        ease: "expo.out",
      }
    );

    // Paragraph Animation (Manual Word-by-Word)
    tl.fromTo(
      words,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
      },
      "-=1.0" // Overlap H1's ending 
    );

    // Buttons Animation (Fade + Slight Up + Stagger)
    tl.fromTo(
      buttons,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.5" // Overlap Paragraph's ending 
    );
  }, []);

  const titleText = "Empower Your Business With ProdBiz";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="relative w-full min-h-[75vh] min-[340px]:min-h-[70vh] min-[400px]:min-h-[55vh] min-[760px]:min-h-[75vh] min-[1024px]:min-h-screen flex items-center justify-center overflow-hidden pt-16 min-[760px]:pt-0">
        {/* Teal Gradient Background via Tailwind */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2197A1] via-[#1b7a82] to-[#125960] -z-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent -z-10" />
        <div className="absolute inset-0 bg-[radial-gra dient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-black/20 via-transparent to-transparent -z-10" />

        {/* Content */}
        <div className="z-10 text-center !px-4 md:!px-6 max-w-5xl mx-auto flex flex-col items-center">
          <h1 ref={titleRef} className="font-bold text-white md:!mb-6 drop-shadow-md text-4xl lg:text-5xl perspective-1000">
            {titleText.split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="word inline-block whitespace-nowrap">
                {word.split("").map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className="char inline-block"
                  >
                    {char}
                  </span>
                ))}
                {wordIndex < titleText.split(" ").length - 1 && (
                  <span className="inline-block">&nbsp;</span>
                )}
              </span>
            ))}
          </h1>
          <p ref={paraRef} className="text-white/90 md:!mb-8 max-w-2xl drop-shadow">
            {paraText.split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="para-word inline-block">
                {word}{wordIndex < paraText.split(" ").length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </p>
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-0 lg:gap-4">
            <Button
              href="/get-proposal"
              variant="primary"
              size="md"
            >
              Get Started
            </Button>
            <Button
              href="/solutions"
              variant="secondary"
              size="md"
            >
              Explore Services
            </Button>
          </div>
        </div>

        {/* Wavy/Dripping Bottom Border */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px]">
          {/* Desktop Wavy Border */}
          <svg
            className="hidden md:block relative block w-[calc(100%+1.3px)] h-[120px]"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,120V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.4,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"
              className="fill-white/10"
              opacity="0.3"
            ></path>
            <path
              d="M0,120V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.94,9.42,105.9,20.44,59.26,18.68,113.55,43.37,172.55,59.22,44,11.82,102.62,14.07,131.73-24.57s11.53-73.69,11.53-73.69V120H0Z"
              className="fill-white/20"
              opacity="0.5"
            ></path>
            <path
              d="M0,120V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V120H0Z"
              className="fill-white"
            ></path>
          </svg>

          {/* Mobile Wavy Border - Aspect Ratio Preserved */}
          <svg
            className="block md:hidden relative block w-[calc(100%+1.3px)] h-[80px]"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="xMidYMax slice"
          >
            <path
              d="M0,120V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.4,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"
              className="fill-white/10"
              opacity="0.3"
            ></path>
            <path
              d="M0,120V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.94,9.42,105.9,20.44,59.26,18.68,113.55,43.37,172.55,59.22,44,11.82,102.62,14.07,131.73-24.57s11.53-73.69,11.53-73.69V120H0Z"
              className="fill-white/20"
              opacity="0.5"
            ></path>
            <path
              d="M0,120V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V120H0Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </section>

      <TrustIndicators />
      <SolutionsSection />
      <WhyChooseUs />
      <CaseStudiesPreview />
      <ClientsSection />
      <FinalCTA />
    </main>
  );
}
