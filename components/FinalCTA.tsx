"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

interface FinalCTAProps {
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    buttonText?: string;
    buttonHref?: string;
}

const FinalCTA = ({
    title = "Ready to Start Your Project?",
    description = "Tell us about your goals and we’ll help you build the right digital solution for your business.",
    buttonText = "Start Your Project",
    buttonHref = "/contact",
}: FinalCTAProps) => {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paraRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!headingRef.current || !paraRef.current || !buttonRef.current) return;

        // Split paragraph into lines
        const split = new SplitType(paraRef.current, { types: "lines" });
        const lines = split.lines;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: headingRef.current,
                start: "top 85%", // Trigger when top of heading is 85% down the viewport
                toggleActions: "play none none none", // Only play once
            },
        });

        // Step 1: Heading slide up + fade
        tl.fromTo(
            headingRef.current,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
            }
        );

        // Step 2: Line-by-line paragraph animation
        tl.fromTo(
            lines,
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
            },
            "-=0.6" // Start paragraph slightly before heading finishes
        );

        // Step 3: Button slide up + fade
        tl.fromTo(
            buttonRef.current,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
            },
            "-=0.6" // Start slightly before paragraph ends
        );

        return () => {
            split.revert();
        };
    }, []);

    return (
        <section className="w-full !pt-30 lg:!pt-55 pb-0 px-6">
            <div className="!mx-auto relative">
                {/* Splash Top Border (Organic Waves) */}
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform -translate-y-full pointer-events-none flex justify-center">
                    <svg
                        viewBox="0 0 1200 160"
                        className="w-[300%] sm:w-[200%] lg:w-[150%] xl:w-[calc(100%+1.3px)] h-24 sm:h-32 md:h-48 lg:h-64 flex-shrink-0"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient id="waveGradientBack" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#2197A1" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#2197A1" stopOpacity="0.25" />
                            </linearGradient>
                            <linearGradient id="waveGradientFront" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#2197A1" stopOpacity="0.05" />
                                <stop offset="100%" stopColor="#2197A1" stopOpacity="0.1" />
                            </linearGradient>
                        </defs>
                        {/* Layer 1: Back Lighter Wave */}
                        <path
                            d="M0,160 C150,160 200,100 350,120 C500,140 550,60 650,40 C750,20 850,100 1000,80 C1150,60 1200,160 1200,160 L0,160 Z"
                            fill="url(#waveGradientBack)"
                        />

                        {/* Organic Blobs/Spots between layers */}
                        <ellipse cx="250" cy="110" rx="20" ry="12" fill="url(#waveGradientBack)" opacity="0.5" transform="rotate(-15, 250, 110)" />
                        <ellipse cx="600" cy="60" rx="15" ry="10" fill="url(#waveGradientBack)" opacity="0.6" transform="rotate(20, 600, 60)" />
                        <ellipse cx="900" cy="90" rx="18" ry="11" fill="url(#waveGradientBack)" opacity="0.5" transform="rotate(-10, 900, 90)" />

                        {/* Layer 2: Main Front Wave */}
                        <path
                            d="M0,160 C100,160 180,120 300,140 C420,160 500,80 600,100 C700,120 780,40 900,60 C1020,80 1100,160 1200,160 L0,160 Z"
                            fill="url(#waveGradientFront)"
                        />

                        {/* Additional droplets on top */}
                        <circle cx="450" cy="115" r="8" fill="url(#waveGradientBack)" opacity="0.4" />
                        <circle cx="750" cy="70" r="6" fill="url(#waveGradientBack)" opacity="0.3" />
                        <circle cx="1050" cy="110" r="5" fill="url(#waveGradientBack)" opacity="0.2" />
                    </svg>
                </div>

                <div className="bg-[#2197A1]/28 !p-10 md:p-20 text-center relative overflow-hidden">
                    <h2 ref={headingRef} className=" text-4xl md:text-5xl font-bold text-white mb-6 relative z-10 leading-tight">
                        {title}
                    </h2>
                    <p ref={paraRef} className="text-lg md:text-xl text-gray-600 font-medium mb-10 max-w-2xl !mx-auto relative z-10 leading-relaxed">
                        {description}
                    </p>
                    <Link
                        ref={buttonRef}
                        href={buttonHref}
                        className="inline-flex items-center gap-3 bg-[#e76038] !text-white !px-6 !py-3 lg:!px-10 lg:!py-4 rounded-3xl font-bold text-lg hover:bg-[#e76038]/90 transition-all transform hover:scale-105 active:scale-95 shadow-2xl relative z-10"
                    >
                        {buttonText}
                        <ArrowRight size={22} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;
