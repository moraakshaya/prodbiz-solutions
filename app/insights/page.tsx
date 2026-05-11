"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories, insights } from "./data";
import FinalCTA from "@/components/FinalCTA";
import Button from "@/components/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import dynamic from "next/dynamic";

const WhoWeAreHero3D = dynamic(() => import("@/components/WhoWeAreHero3D"), { ssr: false });
import InsightsHeroAnimation from "@/components/InsightsHeroAnimation";

gsap.registerPlugin(ScrollTrigger);

export default function InsightsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [mounted, setMounted] = useState(false);
    
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const paraRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    const scrollToInsights = () => {
        const element = document.getElementById("insights-grid-section");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const itemsPerPage = 6;
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollInfo, setScrollInfo] = useState({ scrollLeft: 0, scrollWidth: 1, clientWidth: 1 });

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

            // Slot-machine roll for "Innovation"
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

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setScrollInfo({ scrollLeft, scrollWidth, clientWidth });
        }
    };

    useEffect(() => {
        handleScroll();
        const timer = setTimeout(handleScroll, 100);
        window.addEventListener('resize', handleScroll);
        return () => {
            window.removeEventListener('resize', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

    const filteredInsights = insights.filter(i => {
        const matchesCategory = selectedCategory === "All" || i.category === selectedCategory;
        return matchesCategory;
    });

    const totalPages = Math.ceil(filteredInsights.length / itemsPerPage);
    const paginatedInsights = filteredInsights.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            {/* Insights Hero Section */}
            <section
                className="hero-section-standard"
            >
                {/* ── 3D Glassmorphism Background ── */}
                <WhoWeAreHero3D />
                
                {/* Mobile Insights Animation (Centered Background) */}
                <div className="block md:hidden absolute inset-0 z-0 opacity-40 flex items-center justify-center h-full overflow-hidden">
                    <InsightsHeroAnimation />
                </div>

                {/* Gradient overlay: ensures left-side text stays readable */}
                <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: "linear-gradient(105deg, rgba(3,14,18,0.72) 0%, rgba(3,14,18,0.45) 50%, transparent 100%)" }} />
                
                {/* Content Container - Ensure full height flex */}
                <div className="relative z-10 w-full max-w-7xl !mx-auto flex md:flex-row flex-col items-center justify-center !px-4 md:!px-2 !pt-10 md:!pt-10 gap-8 md:gap-1">
  
                    {/* Hero Content Wrapper */}
                    <div className="w-full md:w-[60%] flex flex-col items-center md:items-start !mt-20 md:pr-8 md:!pl-8">
                        {/* Title: Centered on Mobile */}
                        <h1 ref={h1Ref} className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-bold !text-white !mb-2 md:mb-6 leading-tight break-words text-center md:text-left w-full drop-shadow-lg" style={{ perspective: "1000px" }}>
                            Insights & <span ref={spanRef} className="text-[#2197A1] inline-block origin-center transform-style-3d" style={{ textShadow: "0 0 30px rgba(33,151,161,0.6)" }}>Innovation</span>
                        </h1>
 
                        <div ref={paraRef} className="w-full flex flex-col md:block">
                            {/* Short mobile content */}
                            <p className="block md:hidden text-base sm:text-base text-white/80 font-medium leading-relaxed text-center mb-8">
                                Stay ahead in the digital landscape with expert insights, performance marketing trends, and actionable growth strategies.
                            </p>
 
                            {/* Desktop content */}
                            <div className="hidden md:block space-y-4 max-w-3xl mb-1 md:mb-8">
                                <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed">
                                    Welcome to the Prodbiz Insights portal. We believe that knowledge sharing is the cornerstone of innovation, which is why we curate the latest industry trends and actionable growth strategies.
                                </p>
                            </div>
                        </div>
 
                        {/* Button: Centered on Mobile */}
                        <div ref={buttonsRef} className="w-full flex justify-center md:justify-start !mt-2">
                            <Button
                                onClick={scrollToInsights}
                                className="inline-flex items-center gap-2 md:gap-3 bg-[#e76038] !text-white !px-3 md:!px-6 !py-1.5 md:!py-3 rounded-xl md:rounded-3xl font-bold !text-[12px] md:!text-[16px] hover:bg-[#e76038]/90 transition-all transform hover:scale-100 active:scale-95 shadow-md md:shadow-2xl relative z-10"
                            >
                                <span>Explore Our Insights</span>
                                <ArrowRight size={16} className="md:w-[22px] md:h-[22px]" />
                            </Button>
                        </div>
                    </div>
 
                    {/* Desktop Right Side: Insights Hero Animation */}
                    <div className="hidden md:flex w-[40%] h-full justify-center items-center">
                        <InsightsHeroAnimation />
                    </div>
                </div>
            </section>

            {/* Tab Filter Section */}
            <div className="w-full max-w-5xl !mx-auto !mt-10 md:!mb-10 !px-2 md:!px-12 z-20">
                <style jsx>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        height: 4px;
                        display: block;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: rgba(33, 151, 161, 0.1);
                        border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #2197A1;
                        border-radius: 10px;
                    }
                    .custom-scrollbar {
                        scrollbar-width: thin;
                        scrollbar-color: #2197A1 rgba(33, 151, 161, 0.1);
                        -webkit-overflow-scrolling: touch;
                    }
                `}</style>
                <div className="bg-[#f0f9fa] rounded-3xl md:rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.18)] !pt-1 overflow-hidden relative">
                    <div
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="flex items-center md:justify-between justify-start px-4 md:px-16 !pb-1 md:!py-2 overflow-x-auto md:overflow-x-hidden no-scrollbar scroll-smooth"
                    >
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className="flex flex-col items-center flex-shrink-0 w-[28%] md:w-[20%] !py-1 md:!gap-2 transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    <Icon
                                        size={24}
                                        className={`${isActive ? "text-[#e76038]" : "text-gray-400"} transition-colors`}
                                    />
                                    <span
                                        className={`text-[10px] md:text-sm font-semibold tracking-wide whitespace-nowrap ${isActive ? "text-[#e76038]" : "text-gray-500"} transition-colors`}
                                    >
                                        {cat.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Border-style Scroll Indicator for Mobile */}
                    <div className="md:hidden absolute bottom-0 left-0 w-full h-[4px] bg-[#2197A1]/10 overflow-hidden">
                        <div
                            className="h-full bg-[#2197A1] transition-all duration-150"
                            style={{
                                width: `${(scrollInfo.clientWidth / scrollInfo.scrollWidth) * 100}%`,
                                transform: `translateX(${(scrollInfo.scrollLeft / scrollInfo.clientWidth) * 100}%)`
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Insights Grid */}
            <section id="insights-grid-section" className="w-full max-w-7xl mx-auto !px-6 md:!px-0 !pt-15 md:!pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {paginatedInsights.map((insight) => (
                        <div
                            key={insight.id}
                            className="group flex flex-col gap-4 bg-[#f0f9fa] rounded-[2rem] overflow-hidden !p-2 border-2 border-gray-100 hover:border-[#2197A1]/20 transition-all hover:shadow-2xl hover:-translate-y-2"
                        >
                            {/* Card Image */}
                            <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem]">
                                <img
                                    src={insight.image}
                                    alt={insight.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-white/80  backdrop-blur-md !px-4 !py-1.5 rounded-full text-xs font-bold text-[#e76038] shadow-sm">
                                    {insight.category}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="!p-2 flex flex-col flex-1">
                                <span className="text-gray-400 text-xs !mb-2 font-medium uppercase tracking-widest">{insight.date}</span>
                                <h3 className="text-2xl !mb-2 font-bold text-[#2A2A2A] group-hover:text-[#2197A1] transition-colors line-clamp-2">
                                    {insight.title}
                                </h3>
                                <p className="text-gray-500 !mb-0 text-sm leading-relaxed line-clamp-3">
                                    {insight.description}
                                </p>
                                <div className="mt-auto !pt-4">
                                    <Link
                                        href={`/insights/${insight.slug}`}
                                        className="inline-flex items-center gap-2 text-[#2197A1] font-bold text-sm uppercase tracking-wider group/btn2"
                                    >
                                        Read More
                                        <ArrowRight size={16} className="transform group-hover/btn2:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredInsights.length === 0 ? (
                    <div className="w-full text-center py-20">
                        <h3 className="text-2xl font-bold text-gray-400">No articles found matching your criteria.</h3>
                    </div>
                ) : (
                    /* Pagination Controls */
                    totalPages > 1 && (
                        <div className="!mt-20 flex items-center justify-center gap-4">
                            <button
                                onClick={() => {
                                    setCurrentPage(prev => Math.max(1, prev - 1));
                                    scrollToInsights();
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
                                            scrollToInsights();
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
                                    scrollToInsights();
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
                    )
                )}
            </section>

            {/* Final CTA Section */}
            <FinalCTA />
        </main>
    );
}
