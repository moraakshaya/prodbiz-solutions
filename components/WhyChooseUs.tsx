"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

const whyChooseUsData = [
    {
        step: "01",
        title: "Data-Driven Strategies",
        description: "We use advanced analytics to fuel every decision and maximize ROI.",
        icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" />
                <path d="M3 10h18" />
                <path d="M15 11l2 2 4-4" />
            </svg>
        ),
        color: "from-cyan-400 to-blue-500",
    },
    {
        step: "02",
        title: "Custom Solutions",
        description: "Tailored IT projects designed specifically for your unique business needs.",
        icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4" />
                <path d="M12 18v4" />
                <path d="M4.93 4.93l2.83 2.83" />
                <path d="M16.24 16.24l2.83 2.83" />
                <path d="M2 12h4" />
                <path d="M18 12h4" />
                <path d="M4.93 19.07l2.83-2.83" />
                <path d="M16.24 7.76l2.83-2.83" />
            </svg>
        ),
        color: "from-blue-500 to-indigo-600",
    },
    {
        step: "03",
        title: "Transparent Reporting",
        description: "Clear, honest communication and real-time performance tracking.",
        icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20V10" />
                <path d="M18 20V4" />
                <path d="M6 20v-4" />
            </svg>
        ),
        color: "from-indigo-600 to-purple-600",
    },
    {
        step: "04",
        title: "Dedicated Team",
        description: "Expert professionals committed to your long-term success.",
        icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        color: "from-purple-600 to-pink-500",
    },
];

interface WhyChooseUsItem {
    step: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

const WhyChooseUsCard = ({ item, idx, isDesktop }: { item: WhyChooseUsItem; idx: number; isDesktop?: boolean }) => {
    return (
        <div className={`group relative flex flex-col items-center why-card-anim ${isDesktop ? "" : "min-w-full w-full flex-shrink-0 snap-center pb-2 px-4"}`}>
            {/* Circular Card with 3D effect */}
            <div className="relative w-48 md:w-64 h-48 md:h-64 !my-3">
                {/* Outer Rotating Arc Background */}
                <div className={`absolute inset-0 rounded-full border-[8px] border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]`} />

                {/* Colored Gradient Arc */}
                <div className={`absolute inset-0 rounded-full border-[8px] border-transparent border-t-white/40 border-r-white/40 rotate-45 group-hover:rotate-180 transition-transform duration-1000`} />

                {/* Main Circle - Glassmorphism 3D effect */}
                <div className="absolute inset-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl flex flex-col items-center justify-center p-6 transition-all duration-300 group-hover:bg-white group-hover:scale-100 group-hover:-translate-y-0 text-center">
                    <div className={`mb-3 transition-colors duration-300 group-hover:text-primary text-white`}>
                        {item.icon}
                    </div>
                    <span className={`text-xs font-black !mb-1 transition-colors duration-300 group-hover:text-primary/70 text-white/60 tracking-widest uppercase`}>
                        Step {item.step}
                    </span>
                    <h4 className={`font-bold transition-colors duration-300 group-hover:text-gray-900 text-white leading-tight text-balance break-words w-full`}>
                        {item.title}
                    </h4>
                </div>

                {/* Animated Arrow for desktop connectors */}
                {isDesktop && idx < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-8 -translate-y-1/2 z-20">
                        <svg className="w-8 h-8 text-white/30 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Description below circle */}
            <p className="text-white/70 font-medium leading-relaxed max-w-[200px] transition-colors duration-300 group-hover:text-white mt-4 text-center">
                {item.description}
            </p>
        </div>
    );
};

const WhyChooseUs = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paraRef = useRef<HTMLParagraphElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!headingRef.current || !paraRef.current || !sectionRef.current) return;

        // Split paragraph into lines
        const split = new SplitType(paraRef.current, { types: "lines" });
        const lines = split.lines;

        // Find cards
        const cards = sectionRef.current.querySelectorAll(".why-card-anim");

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

        // Step 3: Card stagger animation
        tl.fromTo(
            cards,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.5,
                ease: "power2.out",
            },
            "-=0.8" // Start cards slightly before paragraph finishes
        );

        return () => {
            split.revert();
        };
    }, []);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const scrollPosition = scrollRef.current.scrollLeft;
        const cardWidth = scrollRef.current.offsetWidth;
        if (cardWidth === 0) return;
        const index = Math.round(scrollPosition / cardWidth);
        if (index !== activeIndex && index >= 0 && index < whyChooseUsData.length) {
            setActiveIndex(index);
        }
    };

    const scrollToCard = (index: number) => {
        if (!scrollRef.current) return;
        const cardWidth = scrollRef.current.offsetWidth;
        scrollRef.current.scrollTo({
            left: cardWidth * index,
            behavior: "smooth"
        });
        setActiveIndex(index);
    };

    return (
        <section ref={sectionRef} className="relative w-full !py-10 lg:!py-20 px-6 flex items-center justify-center overflow-hidden">
            {/* Background Gradient matching hero */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2197A1] via-[#1b7a82] to-[#125960] -z-20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent -z-10" />

            <div className="max-w-7xl !mx-auto w-full text-center">
                {/* Header Text */}
                <div className="mb-20 flex flex-col items-center">
                    <h2 ref={headingRef} className="font-bold text-white mb-6 tracking-tight">
                        Why Choose ProdBiz ?
                    </h2>
                    {/* <div className="w-24 h-1.5 bg-white mx-auto mb-6 rounded-full opacity-80"></div> */}
                    <p ref={paraRef} className="max-w-3xl text-lg text-white/80 font-medium">
                        We empower businesses with cutting-edge technology and strategic vision. Our commitment to excellence drives everything we do.
                    </p>
                </div>

                {/* Desktop 3D Circular Infographic Grid */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-12 relative w-full items-start justify-items-center">
                    {whyChooseUsData.map((item, idx) => (
                        <WhyChooseUsCard key={idx} item={item} idx={idx} isDesktop={true} />
                    ))}
                </div>

                {/* Mobile Carousel */}
                <div className="md:hidden flex flex-col w-full relative">
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .no-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                    `}} />
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex overflow-x-auto snap-x snap-mandatory flex-nowrap !pb-4 pt-4 px-2 no-scrollbar"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {whyChooseUsData.map((item, idx) => (
                            <WhyChooseUsCard key={idx} item={item} idx={idx} isDesktop={false} />
                        ))}
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-2">
                        {whyChooseUsData.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => scrollToCard(idx)}
                                className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-8 bg-white' : 'w-2.5 bg-white/30'}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
