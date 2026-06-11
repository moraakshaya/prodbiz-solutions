"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/Button";
import FinalCTA from "@/components/FinalCTA";
import gsap from "gsap";
import SplitType from "split-type";
import dynamic from "next/dynamic";

const WhoWeAreHero3D = dynamic(() => import("@/components/WhoWeAreHero3D"), { ssr: false });
import FolderAnimation from "@/components/FolderAnimation";

const workCategories = [
    {
        id: "hoardings",
        title: "Hoardings",
        description: "Large-format outdoor media and billboard campaigns designed for high impact and visibility.",
        works: [
            { id: "h1", image: "/images/home-services/hoarding-img-1.png", title: "Commercial Billboard", client: "Metro Transit" },
            { id: "h2", image: "/images/home-services/hoarding-img-2.png", title: "Retail Launch Hoarding", client: "Fashion Hub" },
            { id: "h3", image: "/images/home-services/hoarding-img-3.png", title: "Corporate Branding Wall", client: "Alpha Tech" },
            { id: "h3", image: "/images/home-services/posters-img-2.png", title: "Corporate Branding Wall", client: "Alpha Tech" },
        ]
    },
    {
        id: "logos",
        title: "Logos",
        description: "Unique and memorable brand identities designed to establish trust and presence.",
        works: [
            { id: "l1", image: "/clients/ricchlogo.png", title: "Nexus Technology Identity", client: "Nexus Corp" },
            { id: "l2", image: "/clients/padmavatilogo.png", title: "Earth Organic Identity", client: "Earth Organic" },
            { id: "l3", image: "/clients/trinilogo.png", title: "Volt Energy Style Identity", client: "Volt Energy" },
            { id: "l4", image: "/clients/terracepondlogo.png", title: "Minimalist Icon Concept", client: "Modern Tech" },
            { id: "l5", image: "/clients/curryleaveslogo.png", title: "Corporate Logo Design", client: "ProdBiz" },
            { id: "l6", image: "/clients/firetunslogo.png", title: "Corporate Logo Design", client: "ProdBiz" },
            { id: "l7", image: "/clients/ricchsportslogo.png", title: "Corporate Logo Design", client: "ProdBiz" },
            { id: "l8", image: "/clients/tvvlogo.png", title: "Corporate Logo Design", client: "ProdBiz" },
            { id: "l9", image: "/clients/praanalogo.png", title: "Corporate Logo Design", client: "ProdBiz" },
            { id: "l10", image: "/clients/ricchcafelogo.png", title: "Corporate Logo Design", client: "ProdBiz" },
        ]
    },
    {
        id: "videos",
        title: "Videos",
        description: "Premium commercial shoots, reels, and video productions capturing brand stories.",
        works: [
            { id: "v1", image: "/images/video-shooting.webp", title: "Professional Video Shoot", client: "Media Studio" },
            { id: "v2", image: "/images/video.jpg", title: "Commercial Editing Production", client: "Ad Agency" },
            { id: "v3", image: "/images/insights-img-01.webp", title: "Brand Story Shoot", client: "EcoDrive" },
            { id: "v4", image: "/images/office-team.png", title: "Corporate Interview Production", client: "Alpha Tech" },
        ]
    },
    {
        id: "posters",
        title: "Posters",
        description: "Creative promotional posters, menu cards, and social media offer graphics.",
        works: [
            { id: "p1", image: "/images/home-services/posters-img-1.png", title: "Campaign Launch Poster", client: "Fashion Hub" },
            { id: "p2", image: "/images/home-services/posters-img-4.png", title: "Seasonal Sale Offer", client: "SuperMart" },
            { id: "p3", image: "/images/home-services/posters-img-3.png", title: "Digital Product Poster", client: "Nexus Corp" },
        ]
    },
    {
        id: "auto-ads",
        title: "Auto Ads",
        description: "High-reach transit advertisements and vehicle branding designs.",
        works: [
            { id: "a1", image: "/images/home-services/autoads-img-1.png", title: "Transit Ad Poster", client: "Metro Ads" },
            { id: "a2", image: "/images/home-services/autoads-img-2.png", title: "Mobile Branding Design", client: "Quick Delivery" },
            { id: "a3", image: "/images/home-services/autoads-img-3.png", title: "Vehicle Wrap Ad", client: "Local Transport" },
            { id: "a4", image: "/images/home-services/autoads-img-4.png", title: "Auto Carrier Banner", client: "Prime Auto" },
        ]
    },
    {
        id: "websites",
        title: "Websites",
        description: "State-of-the-art websites, interactive web applications, and fast landing pages.",
        works: [
            { id: "w1", image: "/images/website-img-01.png", title: "Corporate Flagship Platform", client: "Global Industries" },
            { id: "w2", image: "/images/website-img-02.png", title: "E-Commerce Experience Portal", client: "Luxe Retail" },
            { id: "w3", image: "/images/website-img-03.png", title: "Interactive SaaS Dashboard", client: "CloudSync" },
            { id: "w4", image: "/images/website-img-04.png", title: "Healthcare Services Portal", client: "CarePlus" },
            { id: "w5", image: "/images/website-img-05.png", title: "Creative Agency Showcase", client: "Creatives Inc" },
        ]
    }
];

const WorkCarouselRow = ({ category }: { category: typeof workCategories[0] }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        const el = scrollRef.current;
        if (el) {
            setCanScrollLeft(el.scrollLeft > 5);
            setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
        }
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            el.addEventListener("scroll", checkScroll);
            checkScroll();
            window.addEventListener("resize", checkScroll);
            return () => {
                el.removeEventListener("scroll", checkScroll);
                window.removeEventListener("resize", checkScroll);
            };
        }
    }, []);

    const scroll = (direction: "left" | "right") => {
        const el = scrollRef.current;
        if (el) {
            const scrollAmount = el.clientWidth * 0.75;
            el.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="w-full !mb-5 md:!mb-10 relative gap-5">
            {/* Header row */}
            <div className="flex items-end !mb-4 md:!mb-6 px-4 md:px-0">
                <div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                        {category.title}
                    </h3>
                    <p className="text-gray-500 text-sm md:text-base !mt-0 max-w-2xl font-medium">
                        {category.description}
                    </p>
                </div>
            </div>

            {/* Images Carousel Container with Side Arrows */}
            <div className="relative">
                {/* Left Arrow — always visible */}
                <button
                    onClick={() => scroll("left")}
                    className={`absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border-2 border-[#2197A1] flex items-center justify-center bg-[#2197A1] text-white shadow-lg transition-all duration-300 active:scale-95 hover:bg-white hover:text-[#2197A1] ${canScrollLeft ? "opacity-100 cursor-pointer" : "opacity-40 cursor-default"
                        }`}
                    aria-label="Scroll Left"
                >
                    <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                </button>

                {/* Right Arrow — always visible */}
                <button
                    onClick={() => scroll("right")}
                    className={`absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border-2 border-[#2197A1] flex items-center justify-center bg-[#2197A1] text-white shadow-lg transition-all duration-300 active:scale-95 hover:bg-white hover:text-[#2197A1] ${canScrollRight ? "opacity-100 cursor-pointer" : "opacity-40 cursor-default"
                        }`}
                    aria-label="Scroll Right"
                >
                    <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>

                <div
                    ref={scrollRef}
                    className="w-full overflow-x-auto flex gap-6 pb-6 px-4 md:px-0 scrollbar-none snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {category.works.map((work) => (
                        <div
                            key={work.id}
                            className="flex-shrink-0 w-[290px] sm:w-[360px] md:w-[440px] snap-start group relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 bg-white hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
                        >
                            {/* Image Frame */}
                            <div className="w-full h-[190px] sm:h-[240px] md:h-[290px] overflow-hidden bg-gray-50">
                                <img
                                    src={work.image}
                                    alt={work.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            {/* Text Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                {/* <span className="text-[11px] font-black uppercase text-[#2197A1] tracking-wider mb-1 block">
                                    {work.client}
                                </span>
                                <h4 className="text-white font-bold text-lg leading-tight">
                                    {work.title}
                                </h4> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default function OurWorkPage() {
    const [mounted, setMounted] = useState(false);

    const h1Ref = useRef<HTMLHeadingElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const paraRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

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
                0.2
            );

            // 2. Paragraph (Line-by-line soft fade + slight upward)
            tl.fromTo(
                splitParas.lines,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
                "-=0.6"
            );

            // 3. Buttons (Subtle fade + stagger)
            tl.fromTo(
                buttonsRef.current.children,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
                "-=0.4"
            );

            // Slot-machine roll for "Work"
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
            {/* Our Work Hero Section */}
            <section className="hero-section-standard">
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
                            Our <span ref={spanRef} className="text-[#2197A1] inline-block origin-center transform-style-3d" style={{ textShadow: "0 0 30px rgba(33,151,161,0.6)" }}>Work</span>
                        </h1>

                        <div ref={paraRef} className="w-full flex flex-col md:block">
                            {/* Short mobile content */}
                            <p className="block md:hidden text-base sm:text-base text-white/80 font-medium leading-relaxed text-center mb-8">
                                Discover how Prodbiz Solutions transforms visions into high-impact digital realities through strategic growth and innovation.
                            </p>

                            {/* Desktop content */}
                            <div className="hidden md:block space-y-4 max-w-3xl mb-1 md:mb-8">
                                <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed">
                                    Explore how Prodbiz Solutions delivers state-of-the-art websites, branding, and digital marketing. We build custom-engineered digital products that drive real business growth and digital transformation.
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

            {/* Categories Carousel Rows Showcase */}
            <section className="w-full max-w-7xl mx-auto !py-14 !px-6 md:px-8">
                {workCategories.map((category) => (
                    <WorkCarouselRow key={category.id} category={category} />
                ))}
            </section>

            {/* Final CTA Section */}
            <FinalCTA />
        </main>
    );
}