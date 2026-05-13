"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Button from "@/components/Button";
import Image from "next/image";
import FinalCTA from "@/components/FinalCTA";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import dynamic from "next/dynamic";

const WhoWeAreHero3D = dynamic(() => import("@/components/WhoWeAreHero3D"), { ssr: false });
import FolderAnimation from "@/components/FolderAnimation";
import Stack from "@/components/Stack";
import { caseStudies } from "./data";
 
gsap.registerPlugin(ScrollTrigger);

const TimelineItem = ({
    label,
    value,
    icon,
    delay = 0,
    children
}: {
    label: string;
    value?: string;
    icon: React.ReactNode;
    delay?: number;
    children?: React.ReactNode;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        el.style.opacity = "1";
                        el.style.transform = "translateY(0) scale(1)";
                    }, delay);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <div
            ref={ref}
            style={{
                opacity: 0,
                transform: "translateY(30px) scale(0.97)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
            className="relative flex gap-5 group"
        >
            {/* Timeline dot & line */}
            <div className="flex flex-col items-center">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2197A1]/10 border-2 border-[#2197A1] flex items-center justify-center text-[#2197A1] shadow-[0_0_0_4px_rgba(33,151,161,0.1)] group-hover:bg-[#2197A1] group-hover:text-white transition-all duration-300">
                    {icon}
                </div>
                <div className="w-[2px] flex-1 bg-gradient-to-b from-[#2197A1]/30 to-transparent mt-1 min-h-[28px]" />
            </div>

            {/* Content */}
            <div className="pb-8 w-full pr-4">
                <span className="text-[14px] font-black uppercase tracking-[0.15em] text-[#2197A1]/70 mb-1 block">
                    {label}
                </span>
                {value && (
                    <p className="text-gray-800 font-medium leading-relaxed text-sm">
                        {value}
                    </p>
                )}
                {children && <div className="mt-4">{children}</div>}
            </div>
        </div>
    );
};

export default function CaseStudiesPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [mounted, setMounted] = useState(false);
    
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const paraRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    const itemsPerPage = 2;

    const totalPages = Math.ceil(caseStudies.length / itemsPerPage);
    const paginatedCaseStudies = caseStudies.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
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

            // Slot-machine roll for "Studies"
            const loopTl = gsap.timeline({ repeat: -1, repeatDelay: 1.5, delay: 1.0 });

            loopTl.to(spanRef.current, {
                y: -25,
                opacity: 0,
                rotationX: 90,
                duration: 0.6,
                ease: "power2.in"
            })
            .set(spanRef.current, { y: 25, rotationX: -90 })
            .to(spanRef.current, {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 0.8,
                ease: "power2.out"
            });

            return () => {
                splitParas.revert();
            };
        }
    }, [mounted]);

    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            {/* Case Studies Hero Section */}
            <section
                className="hero-section-standard"
            >
                {/* ── 3D Glassmorphism Background ── */}
                <WhoWeAreHero3D />
                
                {/* Mobile Folder Animation (Centered Background) */}
                <div className="block md:hidden absolute inset-0 z-0 opacity-40 flex items-center justify-center">
                    <div className="w-[300px] h-[300px]">
                        <FolderAnimation />
                    </div>
                </div>

                {/* Gradient overlay: ensures left-side text stays readable */}
                <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: "linear-gradient(105deg, rgba(3,14,18,0.72) 0%, rgba(3,14,18,0.45) 50%, transparent 100%)" }} />
                
                {/* Content Container */}
                <div className="relative z-10 w-full max-w-7xl !mx-auto flex md:flex-row flex-col items-center !px-4 md:!px-2 !pt-10 md:!pt-10 gap-8 md:gap-1">
  
                    {/* Hero Content Wrapper */}
                    <div className="w-full md:w-[60%] flex flex-col items-center md:items-start translate-y-[-20px] !mt-20 md:pr-8 md:!pl-8">
                        {/* Title: Centered on Mobile */}
                        <h1 ref={h1Ref} className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-bold !text-white !mb-2 md:mb-6 leading-tight break-words text-center md:text-left w-full drop-shadow-lg" style={{ perspective: "1000px" }}>
                            Case <span ref={spanRef} className="text-[#2197A1] inline-block origin-center transform-style-3d" style={{ textShadow: "0 0 30px rgba(33,151,161,0.6)" }}>Studies</span>
                        </h1>
 
                        <div ref={paraRef} className="w-full flex flex-col md:block">
                            {/* Short mobile content */}
                            <p className="block md:hidden text-base sm:text-base text-white/80 font-medium leading-relaxed text-center mb-8">
                                Discover how Prodbiz Solutions transforms visions into high-impact digital realities through strategic growth and innovation.
                            </p>
 
                            {/* Desktop content */}
                            <div className="hidden md:block space-y-4 max-w-3xl mb-1 md:mb-8">
                                <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed">
                                    Discover how Prodbiz Solutions transforms visions into high-impact digital realities. We bridging the gap between innovative technology and impactful marketing with strategic growth and innovation.
                                </p>
                            </div>
                        </div>
 
                        {/* Button: Centered on Mobile */}
                        <div ref={buttonsRef} className="w-full flex justify-center md:justify-start !mt-2">
                            <Button
                                href="/contact"
                                className="hero-btn"
                            >
                                <span className="max-sm:hidden">Work With Us</span>
                                <span className="sm:hidden">Get Started</span>
                                <ArrowRight size={16} className="md:w-[22px] md:h-[22px]" />
                            </Button>
                        </div>
                    </div>
 
                    {/* Desktop Right Side: Folder Animation */}
                    <div className="hidden md:flex w-[40%] justify-center items-center h-full">
                        <FolderAnimation />
                    </div>
                </div>
            </section>

            {/* Case Study Rows */}
            <section className="relative w-full !pb-0 md:!py-20 !px-6 md:!px-8 overflow-hidden flex items-center justify-center">
                {/* Decorative blob */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#2197A1]/5 blur-3xl -mr-48 -mt-48 pointer-events-none" />
 
                <div className="max-w-7xl mx-auto w-full">
                    <div className="!space-y-14 !mt-10 ">
                        {paginatedCaseStudies.map((cs, idx) => {
                            const isReversed = idx % 2 !== 0;
                                 const timeline = (
                                <div className="relative">
                                    {/* Client Name Header */}
                                    <div className="!mb-8">
                                        <h4 className="text-[#2197A1] font-bold text-lg mb-2 italic">
                                            &quot;{cs.headline}&quot;
                                        </h4>
                                        <span className="inline-block bg-[#2197A1]/10 text-[#2197A1] text-xs font-black uppercase tracking-widest !px-4 !py-1.5 rounded-full mb-3">
                                            Case Study {String((currentPage - 1) * itemsPerPage + idx + 1).padStart(2, "0")}
                                        </span>
                                        <h3 className="text-3xl !mt-2 font-bold text-gray-900">
                                            {cs.client}
                                        </h3>
                                    </div>

                                    {/* Timeline */}
                                    <div className="pl-2">
                                        <TimelineItem
                                            delay={idx * 200 + 100}
                                            label="Problem"
                                            value={cs.problem}
                                            icon={
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <path d="M12 8v4M12 16h.01" />
                                                </svg>
                                            }
                                        />
                                        <TimelineItem
                                            delay={idx * 200 + 200}
                                            label="Challenges"
                                            value={cs.challenges}
                                            icon={
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                            }
                                        />
                                        <TimelineItem
                                            delay={idx * 200 + 300}
                                            label="What we did:"
                                            icon={
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                                                </svg>
                                            }
                                        >
                                            {cs.categories ? (
                                                <div className="space-y-4 w-full">
                                                    {cs.categories.map((cat, cIdx) => (
                                                        <div 
                                                            key={cIdx}
                                                            className="rounded-xl overflow-hidden shadow-[0_10px_10px_2px_rgba(0,0,0,0.05)] !p-4 !my-2 border border-gray-50 bg-white"
                                                        >
                                                            <div className="px-3 py-2 flex flex-col items-start bg-gray-50/40">
                                                                <h5 className="text-[14px] font-bold text-gray-800">
                                                                    {cat.title}
                                                                </h5>
                                                                <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">
                                                                    {cat.desc}
                                                                </p>
                                                            </div>
                                                            <div className="px-3 pb-2 pt-2 border-t border-gray-50/50">
                                                                <ul className="space-y-1">
                                                                    {cat.points.map((pt, pIdx) => (
                                                                        <li key={pIdx} className="flex items-start">
                                                                            <svg className="w-3 h-3 text-[#2197A1] !mt-1 !mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                                                                            <p className="text-[13px] text-gray-700 leading-relaxed !mb-0">{pt}</p>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-800 font-medium leading-relaxed text-sm">
                                                    {cs.solution}
                                                </p>
                                            )}
                                        </TimelineItem>
 
                                        {/* Results */}
                                        <div className="!mt-6 pl-2">
                                            <span className="text-[14px] font-black uppercase tracking-[0.15em] text-[#2197A1]/70 !mb-4 block">Results</span>
                                            <ul className="space-y-2 ml-0 mb-0">
                                                {cs.results.map((r, rIdx) => (
                                                    <li key={rIdx} className="flex items-start text-sm font-medium mb-0">
                                                        <span className="mr-2 text-[#2197A1] font-bold">•&nbsp;</span>
                                                        <span className="text-gray-600"><span className="font-semibold text-gray-600">{r.value}</span> {r.label}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );

                             const polaroid = (
                                <div className="relative h-[480px] w-full flex items-center justify-center">
                                    <div className="w-[300px] h-[400px] md:w-[340px] md:h-[440px]">
                                        <Stack
                                            randomRotation={true}
                                            sensitivity={180}
                                            sendToBackOnClick={true}
                                            autoplay={true}
                                            autoplayDelay={3500 + idx * 400}
                                            cards={[
                                                // Primary Result Card (Desktop/Final)
                                                <div key="after" className="w-full h-full bg-white p-3 rounded-2xl shadow-xl flex flex-col border border-gray-100 group">
                                                    <div className="flex-1 w-full rounded-xl overflow-hidden bg-gray-50 border border-gray-50">
                                                        <img 
                                                            src={cs.images.after} 
                                                            alt={`${cs.client} After`} 
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                                        />
                                                    </div>
                                                    <div className="mt-4 pb-2 text-center">
                                                        <span className="text-[11px] font-black uppercase text-[#2197A1] tracking-widest italic flex items-center justify-center gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[#2197A1]" /> 
                                                            {cs.images.before ? "Premium Result" : "Desktop Platform"}
                                                        </span>
                                                    </div>
                                                </div>,
                                                
                                                // Secondary Card: Either 'Before' or 'Mobile View'
                                                <div key="secondary" className="w-full h-full bg-white p-3 rounded-2xl shadow-xl flex flex-col border border-gray-100 group">
                                                    <div className="flex-1 w-full rounded-xl overflow-hidden bg-gray-50 border border-gray-50 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                                                        <img 
                                                            src={cs.images.before || cs.images.mobile || cs.images.after} 
                                                            alt={`${cs.client} ${cs.images.before ? "Before" : "Mobile View"}`} 
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                                        />
                                                    </div>
                                                    <div className="mt-4 pb-2 text-center">
                                                        <span className="text-[11px] font-black uppercase text-gray-400 tracking-widest flex items-center justify-center gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" /> 
                                                            {cs.images.before ? "Initial Design" : "Mobile Experience"}
                                                        </span>
                                                    </div>
                                                </div>
                                            ]}
                                        />
                                    </div>
                                </div>
                            );

                            return (
                                <div
                                    key={idx}
                                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                                >
                                    {/* Content Column */}
                                    <div className={`${isReversed ? "lg:order-2" : "lg:order-1"} order-1`}>
                                        {timeline}
                                    </div>

                                    {/* Image Column */}
                                    <div className={`${isReversed ? "lg:order-1" : "lg:order-2"} order-2`}>
                                        {polaroid}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="!mt-20 flex items-center justify-center gap-4">
                            <button
                                onClick={() => {
                                    setCurrentPage(prev => Math.max(1, prev - 1));
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                disabled={currentPage === 1}
                                className={`!px-6 !py-3 rounded-2xl font-bold transition-all ${currentPage === 1
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-[#2197A1] border border-[#2197A1]/20 hover:bg-[#2197A1] hover:text-white shadow-lg"
                                    }`}
                            >
                                Previous
                            </button>

                            <div className="flex items-center gap-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => {
                                            setCurrentPage(i + 1);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className={`w-12 h-12 rounded-2xl font-bold transition-all ${currentPage === i + 1
                                            ? "bg-[#2197A1] text-white shadow-lg shadow-[#2197A1]/20"
                                            : "bg-white text-gray-500 border border-gray-100 hover:bg-gray-50"
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => {
                                    setCurrentPage(prev => Math.min(totalPages, prev + 1));
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                disabled={currentPage === totalPages}
                                className={`!px-6 !py-3 rounded-2xl font-bold transition-all ${currentPage === totalPages
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-[#2197A1] border border-[#2197A1]/20 hover:bg-[#2197A1] hover:text-white shadow-lg"
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Final CTA Section */}
            <FinalCTA />
        </main>
    );
}
