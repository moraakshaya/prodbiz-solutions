"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

const solutions = [
    {
        number: "01",
        title: "Digital Product & Software Development",
        items: [
            "Website Design & Development",
            "Web Application Development",
            "API Development & Integrations",
            "HRM Software Solutions",
        ],
    },
    {
        number: "02",
        title: "Performance Marketing",
        items: [
            "Search Engine Optimization (SEO)",
            "Social Media Marketing",
            "Pay-Per-Click (PPC) Campaigns",
            "Content Marketing",
        ],
    },
    {
        number: "03",
        title: "Brand Growth & Reputation Management",
        items: [
            "Influencer Marketing",
            "Online Reputation Management (ORM)",
        ],
    },
    {
        number: "04",
        title: "Data, Analytics & Campaign Intelligence",
        items: [
            "Marketing Analytics",
            "Campaign Performance Tracking",
        ],
    },
    {
        number: "05",
        title: "Creative Media & Brand Production",
        items: [
            "Branding & Design Services",
            "Corporate Reels & Promotional Videos",
            "Videography & Photography",
        ],
    },
];

const SolutionCard = ({ number, title, items }: { number: string; title: string; items: string[] }) => {
    return (
        <div className="group relative flex flex-col items-center h-full solution-card-anim">
            {/* Number Badge - Precise styling from image */}
            <div className="absolute -top-6 lg:-top-5 z-30 flex h-15 w-15 lg:h-20 lg:w-20 items-center justify-center rounded-full border-[6px] border-[#f2f4f7] bg-primary text-3xl font-extrabold text-white shadow-[0_8px_15px_rgba(33,151,161,0.2)] transition-transform duration-300 group-hover:scale-110">
                {number}
            </div>

            {/* Card Container */}
            <div className="flex flex-col flex-1 w-[95%] bg-white rounded-[2.5rem] shadow-[0_10px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_35px_70px_rgba(0,0,0,0.1)] hover:-translate-y-2 overflow-hidden">
                {/* Exact Wave Shape Header */}
                <div className="relative h-30 lg:h-35 w-full bg-primary overflow-hidden">
                    <svg
                        viewBox="0 0 500 150"
                        preserveAspectRatio="none"
                        className="absolute bottom-[-2px] left-[-2px] h-28 w-[calc(100%+4px)] fill-white"
                        style={{ filter: "drop-shadow(0px -1px 0px rgba(33,151,161,0.1))" }}
                    >
                        <path d="M-2,60 C80,20 120,160 250,90 C380,20 420,120 502,50 L502,152 L-2,152 Z" />
                    </svg>
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-1 !px-1 pb-8 !pt-0 items-center text-center">
                    {/* Title */}
                    <h3 className="font-bold text-gray-800 tracking-wide flex items-center justify-center">
                        {title}
                    </h3>

                    {/* List Items */}
                    <ul className="space-y-3 text-left w-full ml-0 mb-0">
                        {items.map((item, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-500 font-medium mb-0">
                                <span className="mr-2 text-primary font-bold">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const SolutionsSection = () => {
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
        const cards = sectionRef.current.querySelectorAll(".solution-card-anim");

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
                stagger: 0.1,
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
        if (index !== activeIndex && index >= 0 && index < solutions.length) {
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
        <section ref={sectionRef} className="!py-18 w-full overflow-hidden">
            <div className="container !mx-auto !px-2 flex flex-col max-w-[1800px]">
                {/* Section Header */}
                <div className="!mb-0 lg:!mb-8 text-center px-6 sm:px-12 lg:px-24 xl:px-32 flex flex-col items-center">
                    <h2 ref={headingRef} className="mb-6 font-bold text-gray-900 tracking-tight max-w-5xl">
                        Comprehensive Digital Solutions for Modern Businesses
                    </h2>
                    <p ref={paraRef} className="max-w-3xl text-lg text-gray-500 font-medium leading-relaxed">
                        We provide cutting-edge technology and creative strategies to help your business thrive in the digital age.
                    </p>
                </div>

                {/* Desktop Grid - Uniform spacing */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-stretch w-full px-6 sm:px-12 lg:px-24 xl:px-32">
                    {solutions.map((solution, index) => (
                        <SolutionCard key={index} {...solution} />
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
                        className="flex overflow-x-auto snap-x snap-mandatory flex-nowrap !pb-6 !pt-6 !px-2 no-scrollbar"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {solutions.map((solution, index) => (
                            <div key={index} className="min-w-full w-full flex-shrink-0 snap-center pb-2 !px-0">
                                <SolutionCard {...solution} />
                            </div>
                        ))}
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-0">
                        {solutions.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => scrollToCard(idx)}
                                className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-8 bg-primary' : 'w-2.5 bg-gray-300'}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SolutionsSection;
