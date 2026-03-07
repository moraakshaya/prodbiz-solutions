"use client";

import React, { useEffect, useRef } from "react";
import Button from "./Button";

const caseStudies = [
    {
        client: "Global Retail Brand",
        problem: "Outdated legacy platform with slow load times and critically declining mobile conversion rates.",
        solution: "End-to-end migration to a headless commerce architecture powered by Next.js and high-performance APIs.",
        results: [
            { label: "Organic Growth", value: "+240%" },
            { label: "Conversion Rate", value: "3× Higher" },
        ],
        accent: "#2197A1",
        polaroidAngle: "-rotate-2",
        polaroidAngle2: "rotate-3",
    },
    {
        client: "FinTech Innovation Lab",
        problem: "Complex data silos making it impossible for users to track real-time portfolio metrics consistently.",
        solution: "Unified SaaS dashboard with interactive visualizations and an automated reporting engine.",
        results: [
            { label: "User Engagement", value: "+180%" },
            { label: "Reporting Speed", value: "85% Faster" },
        ],
        accent: "#1b7a82",
        polaroidAngle: "rotate-2",
        polaroidAngle2: "-rotate-3",
    },
];

const TimelineItem = ({
    label,
    value,
    icon,
    delay = 0,
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
    delay?: number;
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
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary shadow-[0_0_0_4px_rgba(33,151,161,0.1)] group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {icon}
                </div>
                <div className="w-[2px] flex-1 bg-gradient-to-b from-primary/30 to-transparent mt-1 min-h-[28px]" />
            </div>

            {/* Content */}
            <div className="pb-8">
                <span className="text-[14px] font-black uppercase font-semibold tracking-[0.15em] text-primary/70 mb-1 block">
                    {label}
                </span>
                <p className="text-gray-800 font-medium leading-relaxed text-sm">
                    {value}
                </p>
            </div>
        </div>
    );
};



const CaseStudiesPreview = () => {
    return (
        <section className="relative w-full !py-20 px-6 overflow-hidden flex items-center justify-center">
            {/* Decorative blob */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl -mr-48 -mt-48 pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="mb-20 text-center flex flex-col items-center">
                    <h2 className="font-bold text-gray-900 mb-6 tracking-tight">
                        Case Studies
                    </h2>
                    <p className="max-w-3xl text-lg text-gray-500 font-medium leading-relaxed">
                        Real problems solved with innovative digital strategies — turning complex challenges into measurable success.
                    </p>
                </div>

                {/* Case Study Rows */}
                <div className="!space-y-14 !mt-10 ">
                    {caseStudies.map((cs, idx) => {
                        const isReversed = idx % 2 !== 0;

                        const timeline = (
                            <div className="relative">
                                {/* Client Name Header */}
                                <div className="!mb-8">
                                    <span className="inline-block bg-primary/10 text-primary text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
                                        Case Study {String(idx + 1).padStart(2, "0")}
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
                                        delay={idx * 200 + 250}
                                        label="Solution"
                                        value={cs.solution}
                                        icon={
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                                            </svg>
                                        }
                                    />

                                    {/* Results */}
                                    <div className="!mt-6 pl-2">
                                        <span className="text-[14px] font-black uppercase font-semibold tracking-[0.15em] text-primary/70 !mb-1 block">Results</span>
                                        <ul className="space-y-2 ml-0 mb-0">
                                            {cs.results.map((r, rIdx) => (
                                                <li key={rIdx} className="flex items-start text-sm font-medium mb-0">
                                                    <span className="mr-2 text-primary font-bold">•&nbsp;</span>
                                                    <span className="text-gray-600"><span className="font-semibold text-gray-600">{r.value}</span> {r.label}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );

                        const polaroid = (
                            <div className="relative h-[380px] flex items-center justify-center">
                                {/* Back polaroid */}
                                <div
                                    className={`absolute w-56 h-64 bg-white rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-100 p-3 ${cs.polaroidAngle2} top-6 left-1/2 -translate-x-1/2 transition-transform duration-500 hover:scale-105`}
                                >
                                    <div className="w-full h-44 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <rect x="3" y="3" width="18" height="18" rx="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <path d="M21 15l-5-5L5 21" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 flex flex-col items-center gap-1">
                                        <div className="h-2 w-24 bg-gray-100 rounded-full" />
                                        <div className="h-2 w-16 bg-gray-100 rounded-full" />
                                    </div>
                                </div>

                                {/* Front polaroid */}
                                <div
                                    className={`absolute w-60 h-72 bg-white rounded-xl shadow-[0_30px_80px_rgba(33,151,161,0.18)] border border-gray-100 p-3 ${cs.polaroidAngle} top-4 left-1/2 -translate-x-1/3 transition-transform duration-500 hover:scale-105 hover:rotate-0 z-10`}
                                >
                                    <div className="w-full h-52 rounded-lg bg-gradient-to-br from-[#2197A1]/10 to-[#125960]/20 flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-primary/20 font-black text-6xl select-none">
                                                {cs.client.split(" ").map(w => w[0]).join("").slice(0, 3)}
                                            </div>
                                        </div>
                                        <svg className="w-12 h-12 text-primary/30 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <rect x="3" y="3" width="18" height="18" rx="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <path d="M21 15l-5-5L5 21" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 px-1">
                                        <div className="h-2 w-28 bg-gray-100 rounded-full mb-1.5" />
                                        <div className="h-2 w-20 bg-gray-100 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        );

                        return (
                            <div
                                key={idx}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                            >
                                {isReversed ? (
                                    <>
                                        {polaroid}
                                        {timeline}
                                    </>
                                ) : (
                                    <>
                                        {timeline}
                                        {polaroid}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="flex justify-center !mt-20">
                    <Button href="/case-studies" variant="primary" size="lg">
                        View All Case Studies
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CaseStudiesPreview;
