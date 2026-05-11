"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Button from "./Button";

const solutionCategories = [
    {
        title: "Branding & Design",
        desc: "We helped them create a professional look for their business.",
        points: [
            "We designed a logo so people can recognize their brand",
            "We created posters to promote offers and attract customers",
            "We designed menu cards so customers can easily see their items",
            "We made social media posts (carousels) to post regularly and engage people",
            "We kept the same design style everywhere so the brand looks clean and professional"
        ],
        short: "BRAND"
    },
    {
        title: "Website",
        desc: "We built a simple and easy-to-use website for their restaurant.",
        points: [
            "Customers can see the menu and details",
            "Website works well on mobile phones",
            "Easy for customers to contact or place orders"
        ],
        short: "WEB"
    },
    {
        title: "Marketing",
        desc: "We helped them grow on social media and reach more people.",
        points: [
            "Created and managed their Instagram, Facebook, YouTube, Twitter pages",
            "Posted regular content and designs",
            "Ran ads to bring more customers",
            "Used WhatsApp to send updates and offers directly"
        ],
        short: "SOCIAL"
    }
];

import FlyingPosters from "./FlyingPosters";

const caseImages = [
    "/images/flyers-1.webp",
    "/images/logo-1.webp",
    "/images/poster-1.avif"
];

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
            { threshold: 0.1 }
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
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary shadow-[0_0_0_4px_rgba(33,151,161,0.1)] group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {icon}
                </div>
                <div className="w-[2px] flex-1 bg-gradient-to-b from-primary/30 to-transparent mt-1 min-h-[28px]" />
            </div>

            {/* Content */}
            <div className="pb-8 w-full pr-4 !pt-2">
                <span className="text-[14px] font-black uppercase font-semibold tracking-[0.15em] text-primary/70 !mb-2 block" style={{ fontFamily: 'var(--font-garamond)' }}>
                    {label}
                </span>
                {value && (
                    <p className="text-gray-500 leading-relaxed text-sm">
                        {value}
                    </p>
                )}
                {children && <div className="!mt-4">{children}</div>}
            </div>
        </div>
    );
};

const CaseStudiesPreview = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paraRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!headingRef.current || !paraRef.current || !buttonRef.current || !sectionRef.current) return;

        const split = new SplitType(paraRef.current, { types: "lines" });
        const lines = split.lines;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: headingRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
            },
        });

        tl.fromTo(headingRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
        tl.fromTo(lines, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" }, "-=0.6");
        tl.fromTo(buttonRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.1");

        return () => { split.revert(); };
    }, []);

    const [planeSize, setPlaneSize] = React.useState(340);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setPlaneSize(250);
            } else {
                setPlaneSize(340);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full !py-24 !px-6 overflow-hidden flex items-center justify-center">
            {/* Decorative blob */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl -mr-48 -mt-48 pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full">
                {/* Section Header */}
                <div className="mb-16 text-center flex flex-col items-center">
                    <h2 ref={headingRef} className="font-bold text-gray-900 !mb-3 tracking-tight">
                        Our Work Speaks for Itself
                    </h2>
                    <p ref={paraRef} className="max-w-3xl text-lg text-gray-500 font-medium leading-relaxed">
                       Real projects. Real results. Real business growth.
                    </p>
                </div>

                {/* Case Study Entry */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch !mt-10">
                    
                    {/* Left: Content Timeline */}
                    <div className="relative z-10 w-full max-w-[500px] mx-auto lg:mx-0">
                        {/* Client Name Header */}
                        <div className="!mb-8 pl-2">
                            <span className="inline-block bg-primary/10 text-primary text-xs font-black uppercase tracking-widest !px-4 !py-1.5 rounded-full mb-3" style={{ fontFamily: 'var(--font-garamond)' }}>
                                Case Study 01
                            </span>
                            <h3 className="!mt-4 !ml-2 font-bold text-gray-900 text-3xl">
                                Ricchhotel Restaurant
                            </h3>
                        </div>

                        {/* Timeline */}
                        <div className="pl-2">
                            <TimelineItem
                                delay={200}
                                label="Client Problem :"
                                value="The client wanted to grow their restaurant business, attract more customers, and build a strong online presence."
                                icon={
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 8v4M12 16h.01" />
                                    </svg>
                                }
                            />
                            
                            <TimelineItem
                                delay={400}
                                label="What we did:"
                                icon={
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                }
                            >
                                {/* Static Categories List */}
                                <div className="space-y-4 w-full">
                                    {solutionCategories.map((cat, idx) => (
                                        <div 
                                            key={idx}
                                            className="rounded-xl overflow-hidden shadow-[0_10px_10px_2px_rgba(0,0,0,0.05)] !p-4 !my-4"
                                        >
                                            {/* Header */}
                                            <div className="px-4 py-3 flex flex-col items-start bg-gray-50/40">
                                                <h5 className="text-[15px] font-bold text-gray-800">
                                                    {cat.title}
                                                </h5>
                                                {cat.desc && (
                                                    <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">
                                                        {cat.desc}
                                                    </p>
                                                )}
                                            </div>
                                            
                                            {/* Content (always visible) */}
                                            <div className="px-5 pb-5 pt-3 border-t border-gray-50">
                                                <ul className="!space-y-1 ">
                                                    {cat.points.map((pt, pIdx) => (
                                                        <li key={pIdx} className="flex items-start leading-relaxed">
                                                            <svg className="w-3.5 h-3.5 text-primary !mt-1.5 !mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                                                            <p className="text-[14px] md:text-[17px] text-gray-700 leading-relaxed !mb-0">{pt}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TimelineItem>

                            <TimelineItem
                                delay={600}
                                label="Results:"
                                value="Because of this work:"
                                icon={
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                }
                            >
                                <div className="!space-y-1 md:!space-y-2 !mt-3">
                                    {[
                                        "More people started knowing about the restaurant",
                                        "Their social media engagement increased",
                                        "They started getting more customer inquiries and orders"
                                    ].map((res, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary !mt-[10px] shrink-0" />
                                            <span className="text-gray-700 text-[13px] md:!text-[15px] leading-relaxed">{res}</span>
                                        </div>
                                    ))}
                                </div>
                            </TimelineItem>
                        </div>
                    </div>

                    {/* Right: Flying Posters WebGL */}
                    <div className="relative w-full flex items-start justify-center lg:mt-0 mt-8 overflow-hidden min-h-[350px] lg:min-h-[500px]">
                        <FlyingPosters 
                            items={caseImages}
                            planeWidth={planeSize}
                            planeHeight={planeSize}
                            distortion={3}
                            scrollEase={0.01}
                            cameraFov={45}
                            cameraZ={20}
                        />
                    </div>

                </div>

                {/* CTA */}
                <div ref={buttonRef} className="flex justify-center lg:!mt-45 !mt-8">
                    <Button href="/case-studies" variant="primary" size="lg">
                        View All Case Studies
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CaseStudiesPreview;













 