"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, HeartPulse, UtensilsCrossed, Cpu, Rocket, Store, Users, Target, Briefcase, Globe as GlobeIcon, Check } from "lucide-react";
import gsap from "gsap";
import SplitType from "split-type";
import { DiscoverIcon, StrategizeIcon, BuildIcon, GrowIcon } from "@/components/icons/ProcessIcons";
import Button from "@/components/Button";
import FinalCTA from "@/components/FinalCTA";
import dynamic from "next/dynamic";
const WhoWeAreHero3D = dynamic(() => import("@/components/WhoWeAreHero3D"), { ssr: false });
const DifferenceSection3D = dynamic(() => import("@/components/DifferenceSection3D"), { ssr: false });
const ProblemSolutionSection = dynamic(() => import("@/components/ProblemSolutionSection"), { ssr: false });
const OurApproach = dynamic(() => import("@/components/OurApproach"), { ssr: false });


const teamMembers = [
    { name: "Srikanth Reddy", role: "Managing Director", image: "/images/gallery/employee-011.png" },
    { name: "Praveen Reddy", role: "CEO", image: "/images/gallery/employ-02.png" },
    { name: "Pravanya Reddy", role: "COO", image: "/images/gallery/employe-03.png" },
    { name: "Surya Teja", role: "Business Head", image: "/images/gallery/employe-04.png" },
    { name: "Gopala Krishna", role: "Marketing Strategist", image: "/images/gallery/employ-05.png" }
];


function MobileLeadersCarousel({ items }: { items: typeof teamMembers }) {
    const [activeIdx, setActiveIdx] = React.useState(0);
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const isSteppingRef = React.useRef(false);

    // We append the first item to the end to create a seamless loop
    const displayItems = [...items, items[0]];

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current && !isSteppingRef.current) {
                const { clientWidth } = carouselRef.current;
                const nextIdx = activeIdx + 1;

                carouselRef.current.scrollTo({
                    left: nextIdx * clientWidth,
                    behavior: 'smooth'
                });

                setActiveIdx(nextIdx);

                // If we just scrolled to the clone (last item in displayItems)
                if (nextIdx === items.length) {
                    isSteppingRef.current = true;
                    // Wait for smooth scroll to finish, then jump back to start
                    setTimeout(() => {
                        if (carouselRef.current) {
                            carouselRef.current.scrollTo({ left: 0, behavior: 'auto' });
                            setActiveIdx(0);
                            isSteppingRef.current = false;
                        }
                    }, 600); // Slightly more than the smooth scroll duration
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [activeIdx, items.length]);

    const handleScroll = () => {
        if (carouselRef.current && !isSteppingRef.current) {
            const { scrollLeft, clientWidth } = carouselRef.current;
            const newIdx = Math.round(scrollLeft / clientWidth);
            // Only update if it's within the original items range
            if (newIdx < items.length && newIdx !== activeIdx) {
                setActiveIdx(newIdx);
            }
        }
    };

    return (
        <div className="md:hidden w-full overflow-hidden">
            <div
                ref={carouselRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory w-full"
            >
                {displayItems.map((member, idx) => (
                    <div
                        key={idx}
                        className="w-full flex-shrink-0 flex flex-col items-center snap-center !py-4"
                    >
                        {/* Profile Card */}
                        <div className="relative w-[230px] h-[310px] rounded-[2rem] overflow-hidden shadow-2xl bg-slate-100 !mb-5">
                            {/* Full photo */}
                            {member.image ? (
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    quality={100}
                                    className="object-cover object-top"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-[#2197A1]/30 font-black text-5xl select-none">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                            )}
                        </div>
                        {/* Name & Role below card */}
                        <div className="text-center !mt-4">
                            <h3 className="text-[#2A2A2A] font-bold text-base leading-tight">{member.name}</h3>
                            <p className="text-[#2A2A2A]/60 text-xs font-semibold tracking-widest uppercase mt-1">{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dot Indicators */}
            <div className="flex items-center justify-center gap-2 !mt-4">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            if (carouselRef.current) {
                                carouselRef.current.scrollTo({
                                    left: i * carouselRef.current.clientWidth,
                                    behavior: 'smooth'
                                });
                                setActiveIdx(i);
                            }
                        }}
                        className={`rounded-full transition-all duration-300 ${i === (activeIdx % items.length) ? 'bg-[#2197A1] w-6 h-2.5' : 'bg-[#2197A1]/25 w-2.5 h-2.5'
                            }`}
                        aria-label={`Go to leader ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default function WhoWeArePage() {
    const [mounted, setMounted] = React.useState(false);
    const h1Ref = React.useRef<HTMLHeadingElement>(null);
    const spanRef = React.useRef<HTMLSpanElement>(null);
    const paraRef = React.useRef<HTMLDivElement>(null);
    const buttonsRef = React.useRef<HTMLDivElement>(null);
    const heroImageRef = React.useRef<HTMLDivElement>(null);

    const storySpanRef = React.useRef<HTMLSpanElement>(null);
    const storyH2Ref = React.useRef<HTMLHeadingElement>(null);
    const storyParaRef = React.useRef<HTMLDivElement>(null);
    const storyImageRef = React.useRef<HTMLDivElement>(null);

    const teamSpanRef = React.useRef<HTMLSpanElement>(null);
    const teamH2Ref = React.useRef<HTMLHeadingElement>(null);
    const teamCardsRef = React.useRef<HTMLDivElement>(null);
    const mobileCardsRef = React.useRef<HTMLDivElement>(null);

    const coreSpanRef = React.useRef<HTMLSpanElement>(null);
    const coreH2Ref = React.useRef<HTMLHeadingElement>(null);
    const coreParaRef = React.useRef<HTMLParagraphElement>(null);
    const corePrinciplesRef = React.useRef<HTMLDivElement>(null);

    const centerCircleRef = React.useRef<HTMLDivElement>(null);
    const missionLeftRef = React.useRef<HTMLDivElement>(null);
    const visionRightRef = React.useRef<HTMLDivElement>(null);
    const mvMobileRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setMounted(true);

        if (h1Ref.current && spanRef.current && paraRef.current && buttonsRef.current) {

            // Core Entrance Timeline
            const tl = gsap.timeline();

            // Split all P tags within the container into individual lines
            const splitParas = new SplitType(paraRef.current.querySelectorAll("p"), { types: "lines" });

            // 1. H1 Slide In
            tl.fromTo(
                h1Ref.current,
                { x: -80, opacity: 0 },
                { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
                0.2 // Starts at 0.2s absolute
            );

            // 2. Paragraph (Line-by-line soft fade + slight upward)
            // Start just before H1 animation completion
            tl.fromTo(
                splitParas.lines,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
                "-=0.6" // Starts 0.6s before H1 completes
            );

            // 3. Buttons (Subtle fade + stagger)
            tl.fromTo(
                buttonsRef.current.children,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
                "-=0.4" // Starts 0.4s before paragraph completes
            );

            // 4. Hero Image (Slide from right + slight scale)
            // Start slightly before h1 completes
            tl.fromTo(
                ".hero-image-animate",
                { x: 100, scale: 0.9, opacity: 0 },
                { x: 0, scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
                1.0 // Starts at an absolute timeline position (1.2 duration - 0.2 overlap = 1.0) just before H1 completes
            );

            // 5. Floating Animation loops after the entrance
            gsap.to(".hero-image-animate", {
                y: -15, // Floating upward
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                delay: 2.2 // Wait securely until entrance slide has completely finished
            });

            // Span continuous "roll in and roll out" slot-machine loop
            const loopTl = gsap.timeline({ repeat: -1, repeatDelay: 1.5, delay: 1.0 }); // Starts exactly when H1 finishes

            // 1) Roll out to the top
            loopTl.to(spanRef.current, {
                y: -25,
                opacity: 0,
                rotationX: 90,
                duration: 0.6,
                ease: "power2.in"
            })

                // 2) Instantly reset to the bottom (invisible)
                .set(spanRef.current, { y: 25, rotationX: -90 })

                // 3) Roll in from the bottom
                .to(spanRef.current, {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 0.8,
                    ease: "power2.out"
                });

            // Clean up split on unmount
            return () => {
                splitParas.revert();
            };
        }
    }, []);

    // Our Story Section Animation Effect
    React.useEffect(() => {
        if (!mounted || !storySpanRef.current || !storyH2Ref.current || !storyParaRef.current || !storyImageRef.current) return;

        const splitStoryParas = new SplitType(storyParaRef.current.querySelectorAll("p"), { types: "lines" });

        const storyTl = gsap.timeline({
            scrollTrigger: {
                trigger: storySpanRef.current,
                start: "top 85%", // Trigger right as it comes into view
                toggleActions: "play none none none"
            }
        });

        // 1. Span Fade Up
        storyTl.fromTo(storySpanRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        );

        // 2. Both H2 and Image Start just before the span finishes
        storyTl.add("spanEnd", "-=0.2");

        // H2 Slide from right side
        storyTl.fromTo(storyH2Ref.current,
            { x: 60, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
            "spanEnd"
        );

        // Image Slide from left + Slight Scale
        storyTl.fromTo(storyImageRef.current,
            { x: -60, scale: 0.9, opacity: 0 },
            { x: 0, scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
            "spanEnd"
        );

        // 3. Paragraph fade + slide up line by line (Start just before H2 completes)
        storyTl.fromTo(splitStoryParas.lines,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
            "-=0.4"
        );

        // Add loop animation after initial load sequence
        gsap.to(storyImageRef.current, {
            y: -15, // float motion
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: 1.5 // Start floating securely after entrance
        });

        return () => {
            splitStoryParas.revert();
        };
    }, [mounted]);

    // Leadership Team Animation Effect
    React.useEffect(() => {
        if (!mounted || !teamSpanRef.current || !teamH2Ref.current || !teamCardsRef.current || !mobileCardsRef.current) return;

        const teamTl = gsap.timeline({
            scrollTrigger: {
                trigger: teamSpanRef.current,
                start: "top 85%", // Trigger right as it comes into view
                toggleActions: "play none none none"
            }
        });

        // 1. Span Fade + Slide Up
        teamTl.fromTo(teamSpanRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        );

        // 2. H2 Slide Up (start just before span ends)
        teamTl.fromTo(teamH2Ref.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
            "-=0.4"
        );

        // 3. Desktop Cards Stagger (start before H2 ends)
        teamTl.fromTo(teamCardsRef.current.children,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
            "-=0.6"
        );

        // 4. Mobile Cards Carousel Wrapper (synced with desktop entrance)
        teamTl.fromTo(mobileCardsRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
            "<"
        );
    }, [mounted]);

    // Core Principles Animation Effect
    React.useEffect(() => {
        if (!mounted || !coreSpanRef.current || !coreH2Ref.current || !coreParaRef.current || !corePrinciplesRef.current) return;

        const splitCorePara = new SplitType(coreParaRef.current, { types: "lines" });

        const coreTl = gsap.timeline({
            scrollTrigger: {
                trigger: coreSpanRef.current,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });

        // 1. Span (Fade + Slide Up)
        coreTl.fromTo(coreSpanRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        );

        // 2. H2 Slide in from left (Start just before Span finishes)
        coreTl.fromTo(coreH2Ref.current,
            { x: -60, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.0, ease: "power3.out" },
            "-=0.4"
        );

        // 3. Paragraph (Line-by-line stagger, Start just before H2 finishes)
        coreTl.fromTo(splitCorePara.lines,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
            "-=0.6"
        );

        // 4. Principles Grid (Fade + Slide up + Stagger) (Start same time as paragraph / before H2 finishes)
        coreTl.fromTo(corePrinciplesRef.current.children,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
            "<" // Locks it to the exact start time of the previously added animation (the paragraph)
        );

        return () => {
            splitCorePara.revert();
        };
    }, [mounted]);

    // Mission & Vision Infographic Animation
    React.useEffect(() => {
        if (!mounted || !centerCircleRef.current || !missionLeftRef.current || !visionRightRef.current) return;

        const mvTl = gsap.timeline({
            scrollTrigger: {
                trigger: centerCircleRef.current,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });

        // 1. Center Circle Scale + Fade in
        mvTl.fromTo(centerCircleRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.0, ease: "back.out(1.5)" }
        );

        // 2. Mission (Left) Slide from left + fade + stagger children
        mvTl.fromTo(missionLeftRef.current.children,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
            "-=0.5" // Start while circle is finishing its pop
        );

        // 3. Vision (Right) Slide from right + fade + stagger children
        mvTl.fromTo(visionRightRef.current.children,
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
            "<+0.2" // Start shortly after Mission entrance begins
        );

    }, [mounted]);

    // Mission & Vision Mobile Animation
    React.useEffect(() => {
        if (!mounted || !mvMobileRef.current) return;

        const mvMobileTl = gsap.timeline({
            scrollTrigger: {
                trigger: mvMobileRef.current,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });

        mvMobileTl.fromTo(mvMobileRef.current.children,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.3, ease: "power2.out" }
        );
    }, [mounted]);


    return (
        <main className="flex min-h-screen flex-col items-center">
            {/* Who We Are Hero Section */}
            <section
                className="hero-section-standard"
            >
                {/* ── 3D Glassmorphism Background ── */}
                <WhoWeAreHero3D showBox={true} />
                {/* Gradient overlay: ensures left-side text stays readable */}
                <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: "linear-gradient(105deg, rgba(3,14,18,0.72) 0%, rgba(3,14,18,0.45) 50%, transparent 100%)" }} />
                {/* Content Container */}
                <div className="relative z-10 w-full max-w-7xl !mx-auto flex md:flex-row flex-col items-center !px-4 md:!px-2 !pt-10 md:!pt-10 gap-8 md:gap-1">

                    {/* Hero Content Wrapper */}
                    <div className="w-full md:w-[55%] min-[1150px]:max-[1299px]:w-[45%] flex flex-col items-center md:items-start translate-y-[-20px] !mt-20 md:pr-8 md:!pl-8">
                        {/* Title: Centered on Mobile */}
                        <h1 ref={h1Ref} className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-bold !text-white !mb-2 md:mb-6 leading-tight break-words text-center md:text-left w-full drop-shadow-lg" style={{ perspective: "1000px" }}>
                            About <span ref={spanRef} className="text-[#2197A1] inline-block origin-center transform-style-3d" style={{ textShadow: "0 0 30px rgba(33,151,161,0.6)" }}>Prodbiz Solutions</span>
                        </h1>

                        <div ref={paraRef} className="w-full flex flex-col md:block">
                            {/* Mobile content */}
                            <p className="block md:hidden text-base sm:text-base text-white/80 font-medium leading-relaxed text-center mb-8">
                                We help businesses build their brand, create websites, and promote their services online to reach more customers.
                            </p>

                            {/* Desktop content */}
                            <div className="hidden md:block space-y-4 max-w-3xl mb-1 md:mb-8">
                                <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed">
                                    We help businesses build their brand, create websites, and promote their services online to reach more customers.
                                </p>
                            </div>
                        </div>



                        {/* Button: Centered on Mobile */}
                        <div ref={buttonsRef} className="w-full flex justify-center md:justify-start !mt-2">
                            <Button
                                href="/contact"
                                className="hero-btn"
                            >
                                <span className="max-sm:hidden">Start Your Project</span>
                                <span className="sm:hidden">Get Started</span>
                                <ArrowRight size={16} className="md:w-[22px] md:h-[22px]" />
                            </Button>
                        </div>
                    </div>


                </div>
            </section>

            {/* Our Story Section */}
            <section className="w-full !pt-24 md:!pt-30 !pb-10 md:!pb-30 !px-6 overflow-x-hidden">
                <div className="max-w-7xl !mx-auto flex flex-col items-center md:grid md:grid-cols-2 md:gap-x-16 gap-5">

                    {/* Header: Title & Badge - Comes first on Mobile */}
                    <div className="w-full order-1 md:col-start-2 md:self-end">
                        <span ref={storySpanRef} className="text-[#2197A1] font-black uppercase tracking-widest text-xs !mb-1 block">About Us</span>
                        <h2 ref={storyH2Ref} className="text-4xl md:text-5xl font-bold text-[#2A2A2A] md:!mb-0 leading-tight">
                            Helping Businesses <span className="text-[#2197A1]">Build, Grow, and Succeed</span> Online
                        </h2>
                    </div>

                    {/* Visual: Image Container - Comes second on Mobile */}
                    <div className="w-full md:w-full order-2 md:col-start-1 md:row-start-1 md:row-span-2 flex justify-center items-center relative h-[400px] sm:h-[450px] lg:h-[500px]">
                        {/* Ambient Glow */}
                        <div className="absolute inset-x-0 bottom-0 top-10 bg-gradient-to-t from-[#2197A1] to-transparent rounded-[4rem] blur-[80px] opacity-20 pointer-events-none"></div>

                        {/* Floating 3D Image Container */}
                        <div ref={storyImageRef} className="relative w-full h-full flex items-center justify-center">
                            <Image
                                src="/images/ourstory-img.png"
                                alt="Our Story 3D Avatar"
                                fill
                                className="object-contain drop-shadow-2xl mix-blend-multiply scale-110"
                                priority
                            />
                        </div>
                    </div>

                    {/* Content: Description - Comes third on Mobile */}
                    <div className="w-full order-3 md:col-start-2 md:self-start">
                        <div ref={storyParaRef} className="space-y-6 text-lg text-[#2A2A2A]/70 leading-relaxed font-medium">
                            <p>
                                Prodbiz Solutions is a digital marketing and website development company focused on helping businesses grow online. We work with different types of businesses — from small startups to established brands — and provide simple, effective solutions to build a strong online presence. From creating your brand identity and designing your logo to building professional websites and promoting your business on Google and social media, we handle everything your business needs to succeed in the digital world.
                            </p>
                            <p>
                                Our team includes experienced designers, developers, and digital marketing professionals who understand both business goals and online strategies. We don’t just focus on design or development — we focus on results. Our approach is to create solutions that not only look good but also help you reach more people, attract customers, and grow your business.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What Makes Prodbiz Solutions Different Section (3D Animated) */}
            <DifferenceSection3D />

            {/* Problem vs Solution Section (Glassmorphism) */}
            <ProblemSolutionSection />

            {/* How We Work (Short Version) */}
            <OurApproach />


            {/* Mission & Vision Section (Infographic) */}
            <section className="relative w-full !py-15 md:!pt-12 md:!pb-2 !px-6 bg-white overflow-hidden">
                <div className="max-w-7xl !mx-auto w-full relative z-10 flex flex-col items-center">

                    {/* Desktop Infographic Wrapper */}
                    <div className="hidden lg:flex w-full items-center justify-center overflow-hidden py-10">
                        {/* Main Infographic Container (Fixed Size, Scaled Down for Tablets) */}
                        <div className="relative w-[1024px] h-[576px] flex-none flex items-center justify-center scale-[0.7] min-[1150px]:scale-[0.85] xl:scale-100 origin-center transition-transform">

                            {/* Central Circle */}
                            <div ref={centerCircleRef} className="relative w-64 h-64 rounded-full bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-center z-30 group overflow-hidden">
                                <div className="absolute inset-2 border-2 border-dashed border-[#2197A1]/20 rounded-full animate-spin-slow" />
                                <div className="text-center p-8">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#2197A1] mb-2">Our Foundation</p>
                                    <h3 className="text-2xl font-bold bg-gradient-to-br from-[#2197A1] to-[#e76038] bg-clip-text text-transparent leading-tight">
                                        CORE<br />PURPOSE
                                    </h3>
                                </div>
                            </div>

                            {/* Top Left: Mission Branch */}
                            <div ref={missionLeftRef} className="absolute top-10 -left-25 w-1/2 h-1/2 flex flex-col items-end justify-start pr-10 pt-10 group">
                                {/* Mission Pill Header */}
                                <div className="flex items-center gap-0 mb-6 bg-[#2197A1] rounded-full !mt-10 !mr-12 pl-6 pr-2 py-2 shadow-lg shadow-[#2197A1]/20 group-hover:scale-105 transition-transform duration-500">
                                    <span className="text-white font-black uppercase tracking-[0.2em] text-sm !pl-2 !mr-1">Our Mission</span>
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                                        <HeartPulse size={20} strokeWidth={2.5} />
                                    </div>
                                </div>
                                <div className="text-right max-w-[340px] !mr-16 !mt-4">
                                    <h4 className="text-4xl font-black text-[#2A2A2A] mb-4 tracking-tight">IDEA</h4>
                                    <p className="text-lg text-[#2A2A2A]/70 leading-relaxed font-medium">
                                        To help businesses grow online through digital marketing, website development, and effective strategies that bring real customers.
                                    </p>
                                </div>
                                {/* SVG Connection Arc (Mission) */}
                                <svg className="absolute -bottom-8 -right-8 w-64 h-64 pointer-events-none z-10 overflow-visible">
                                    <path
                                        d="M 256,128 A 128,128 0 0 0 128,0"
                                        fill="none"
                                        stroke="#2197A1"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        className="opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                    <circle cx="128" cy="0" r="4" fill="#2197A1" />
                                </svg>
                            </div>

                            {/* Bottom Right: Vision Branch */}
                            <div ref={visionRightRef} className="absolute bottom-10 -right-30 w-1/2 h-1/2 flex flex-col items-start justify-end pl-10 pb-10 group">
                                {/* SVG Connection Arc (Vision) */}
                                <svg className="absolute -top-8 -left-8 w-64 h-64 pointer-events-none z-10 overflow-visible">
                                    <path
                                        d="M 0,128 A 128,128 0 0 0 128,256"
                                        fill="none"
                                        stroke="#e76038"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        className="opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                    <circle cx="128" cy="256" r="4" fill="#e76038" />
                                </svg>
                                <div className="text-left max-w-[340px] !ml-12 !mb-0">
                                    <h4 className="text-4xl font-black text-[#e76038] mb-4 tracking-tight">GOAL</h4>
                                    <p className="text-lg text-[#2A2A2A]/70 leading-relaxed font-medium mb-6">
                                        To become a trusted digital partner for businesses by delivering complete solutions and long-term growth.
                                    </p>
                                </div>
                                {/* Vision Pill Header */}
                                <div className="flex items-center gap-1 bg-[#e76038] rounded-full !ml-12 !mb-12 py-2 shadow-lg shadow-[#e76038]/20 group-hover:scale-105 transition-transform duration-500 z-10">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm !mr-1">
                                        <Rocket size={20} strokeWidth={2.5} />
                                    </div>
                                    <span className="text-white font-black uppercase tracking-[0.2em] !pr-2 text-sm">Our Vision</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Version (Vertical) */}
                    <div ref={mvMobileRef} className="lg:hidden w-full flex flex-col gap-12">
                        {/* Mission */}
                        <div className="flex flex-col items-center text-center !p-2 bg-[#fcfcfc] border border-[#2197A1]/10 rounded-[2.5rem] shadow-sm">
                            <div className="flex items-center gap-4 mb-6 bg-[#2197A1] rounded-full !px-2 !py-2 !-mt-5 shadow-lg shadow-[#2197A1]/20">
                                <HeartPulse size={20} strokeWidth={2.5} className="text-white" />
                                <span className="text-white font-black uppercase tracking-widest text-xs">Our Mission</span>
                            </div>
                            <h4 className="text-3xl font-black text-[#2A2A2A] !mt-4">IDEA</h4>
                            <p className="text-[#2A2A2A]/70 leading-relaxed font-medium !mt-0"> To help businesses grow online through digital marketing, website development, and effective strategies that bring real customers.</p>
                        </div>

                        {/* Vision */}
                        <div className="flex flex-col items-center text-center !p-2 bg-[#fcfcfc] border border-[#e76038]/10 rounded-[2.5rem] shadow-sm">
                            <div className="flex items-center gap-4 mb-6 bg-[#e76038] rounded-full !px-2 !py-2 !-mt-5 shadow-lg shadow-[#e76038]/20">
                                <Rocket size={20} strokeWidth={2.5} className="text-white" />
                                <span className="text-white font-black uppercase tracking-widest text-xs">Our Vision</span>
                            </div>
                            <h4 className="text-3xl font-black text-[#e76038] !mt-4">GOAL</h4>
                            <p className="text-[#2A2A2A]/70 leading-relaxed font-medium !mt-0">To become a trusted digital partner for businesses by delivering complete solutions and long-term growth.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Team Section */}
            <section className="relative w-full overflow-hidden">
                {/* Main Content Area with Grid */}
                <div className="relative bg-white md:!pt-10 !pb-10 md:!pb-20">
                    <div
                        className="absolute inset-0 z-0 opacity-20"
                    />

                    <div className="max-w-7xl !mx-auto w-full px-6 relative z-10">
                        <div className="text-center !mt-10 !mb-10 md:!mb-20">
                            <span ref={teamSpanRef} className="text-[#2197A1] font-black uppercase tracking-widest text-xs !mb-1 block">Expert Leadership</span>
                            <h2 ref={teamH2Ref} className="text-4xl md:!text-5xl font-bold text-[#2A2A2A] !mb-4">
                                Our Leaders
                            </h2>
                        </div>

                        {/* Leader Cards (Desktop Grid) */}
                        <div ref={teamCardsRef} className="hidden md:flex flex-wrap justify-center gap-y-12 md:gap-y-10 gap-x-10">
                            {teamMembers.map((member, idx) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <div
                                        className="group relative w-[250px] h-[350px] rounded-[2rem] overflow-hidden shadow-xl bg-slate-100 cursor-pointer"
                                        style={{ transition: 'transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s' }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-8px) scale(1.03)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0px 10px #2197A1'; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
                                    >
                                        {/* Full-bleed photo */}
                                        {member.image ? (
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                quality={100}
                                                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-[#2197A1]/30 font-black text-5xl select-none">
                                                {member.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                        )}
                                    </div>
                                    {/* Name & Role below card */}
                                    <div className="text-center !mt-4">
                                        <h3 className="text-[#2A2A2A] font-bold text-base leading-tight">{member.name}</h3>
                                        <p className="text-[#2A2A2A]/60 text-xs font-semibold tracking-widest uppercase mt-1">{member.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Leader Carousel (Mobile) */}
                        <div ref={mobileCardsRef} className="md:hidden">
                            <MobileLeadersCarousel items={teamMembers} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <FinalCTA />
        </main>
    );
}
