 "use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const steps = [
    {
        num: "01",
        title: "Understand Your Business",
        desc: "We listen to your needs and understand what your business does and what you want to achieve.",
        color: "#2197A1",
        position: "top",
        img: "/images/office-team.png"
    },
    {
        num: "02",
        title: "Create Design & Website",
        desc: "We design your brand and build a simple, professional website for your business.",
        color: "#e76038",
        position: "bottom",
        img: "/images/website.jpg"
    },
    {
        num: "03",
        title: "Promote Your Business",
        desc: "We promote your business on Google and social media so more people can see it.",
        color: "#2197A1",
        position: "top",
        img: "/images/digital.jpg"
    },
    {
        num: "04",
        title: "Get Customers & Grow",
        desc: "We help you get more customers and grow your business step by step.",
        color: "#e76038",
        position: "bottom",
        img: "/images/solution4.png"
    }
];

export default function OurApproach() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Track active dot on scroll
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const cardWidth = container.offsetWidth;
            const idx = Math.round(scrollLeft / cardWidth);
            setActiveIndex(idx);
        };

        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToCard = (idx: number) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        container.scrollTo({ left: idx * container.offsetWidth, behavior: "smooth" });
    };

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(titleRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
                }
            );

            // Only animate desktop cards
            const desktopCards = cardsRef.current.filter(Boolean);
            if (desktopCards.length) {
                gsap.fromTo(desktopCards,
                    { x: 50, opacity: 0 },
                    {
                        x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out",
                        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full !py-20 overflow-hidden flex flex-col items-center">
            <div className="max-w-7xl mx-auto !px-6 w-full flex flex-col items-center">
                {/* Header */}
                <div ref={titleRef} className="text-center !mb-6 md:!mb-16 max-w-2xl">
                    <span className="text-[#2197A1] font-black uppercase tracking-widest text-xs mb-3 block">
                        How We Work
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-[#1E293B] !mb-4">
                        Our Approach
                    </h2>
                    <p className="text-lg text-slate-600 font-medium">
                        We follow a simple and result-focused process.
                    </p>
                </div>

                {/* ── MOBILE: Horizontal Swipeable Carousel ── */}
                <div className="flex md:hidden flex-col items-center w-full">
                    <div
                        ref={scrollContainerRef}
                        className="flex flex-row w-full overflow-x-scroll snap-x snap-mandatory scroll-smooth !pb-10"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {steps.map((step, idx) => {
                            const isTop = step.position === "top";
                            return (
                                <div
                                    key={idx}
                                    className="flex-shrink-0 w-full snap-center !px-2"
                                >
                                    <div className="w-full min-h-[320px] bg-white border border-slate-200 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col overflow-hidden">
                                        {isTop && (
                                            <div className="w-full h-4 rounded-t-xl" style={{ backgroundColor: step.color }} />
                                        )}
                                        <div className={`!px-6 !py-8 flex-1 flex flex-col relative ${isTop ? "pt-6 pb-10" : "pt-10 pb-6"}`}>
                                            {/* Corner image */}
                                            <div className={`absolute w-28 h-28 rounded-full overflow-hidden border-4 border-white/50 shadow-2xl z-10 ${isTop ? "-top-10 -right-4" : "-bottom-10 -right-4"}`}>
                                                <Image src={step.img} alt={step.title} fill className="object-cover" />
                                            </div>
                                            <div className="text-3xl font-light text-slate-400/80 mb-6 tracking-tighter">{step.num}</div>
                                            <h3 className="text-[16px] font-black leading-snug !mb-1 opacity-90 pr-14" style={{ color: step.color }}>
                                                {step.title}
                                            </h3>
                                            <div className="w-8 h-0.5 bg-slate-300 !mb-2" />
                                            <p className="text-slate-500 font-medium leading-relaxed text-sm pr-4">{step.desc}</p>
                                        </div>
                                        {!isTop && (
                                            <div className="w-full h-4 rounded-b-xl" style={{ backgroundColor: step.color }} />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Dot Indicators */}
                    <div className="flex gap-2 mt-6">
                        {steps.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => scrollToCard(idx)}
                                className={`rounded-full transition-all duration-300 ${activeIndex === idx ? "w-6 h-2.5 bg-[#2197A1]" : "w-2.5 h-2.5 bg-slate-300"}`}
                                aria-label={`Go to step ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* ── DESKTOP: Overlapping Cards ── */}
                <div className="hidden md:flex flex-row justify-center items-center md:items-stretch lg:pt-4 w-full">
                    {steps.map((step, idx) => {
                        const isTop = step.position === "top";
                        const ml = idx === 0 ? "ml-0" : "md:-ml-3 lg:-ml-4";
                        const zIndex = 40 - idx * 10;

                        return (
                            <div
                                key={idx}
                                ref={(el) => { cardsRef.current[idx] = el; }}
                                className={`relative w-full md:w-[220px] lg:w-[240px] min-h-[330px] lg:min-h-[350px] flex flex-col items-center ${ml}`}
                                style={{ zIndex }}
                            >
                                <div className="w-full h-full bg-white rounded-xl shadow-[15px_0_20px_-10px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-2 group">
                                    {isTop && (
                                        <div className="w-full h-4 rounded-t-xl" style={{ backgroundColor: step.color }} />
                                    )}
                                    <div className={`!px-2 !py-8 md:!px-4 flex-1 flex flex-col relative ${isTop ? "pt-6 pb-10" : "pt-10 pb-6"}`}>
                                        <div className={`absolute !w-28 !h-28 md:!w-32 md:!h-32 rounded-full overflow-hidden border-4 border-white/50 shadow-2xl z-10 transition-transform duration-700 group-hover:scale-110 ${idx === 0 || idx === 2 ? "-top-12 -right-12" : "-bottom-12 -right-12"}`}>
                                            <Image src={step.img} alt={step.title} fill className="object-cover" />
                                        </div>
                                        <div className="!text-xl md:!text-3xl font-light text-slate-400/80 !mb-6 group-hover:text-slate-600 transition-colors tracking-tighter">
                                            {step.num}
                                        </div>
                                        <h3 className="text-[15px] font-black leading-snug !mb-0 opacity-90 pr-12" style={{ color: step.color }}>
                                            {step.title}
                                        </h3>
                                        <div className="w-8 h-0.5 bg-slate-300 !mb-4" />
                                        <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-base pr-4">{step.desc}</p>
                                    </div>
                                    {!isTop && (
                                        <div className="w-full h-4 rounded-b-xl" style={{ backgroundColor: step.color }} />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
