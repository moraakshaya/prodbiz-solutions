"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Button from "@/components/Button";
import Image from "next/image";
import FinalCTA from "@/components/FinalCTA";

const caseStudies = [
    {
        client: "Ricchhotel Restaurant",
        industry: "Restaurant & Hospitality",
        headline: "From No Online Presence to a Professional Restaurant Website",
        problem: "Ricchhotel identified a critical gap: they had no digital footprint. Without an official website, potential customers couldn't find their menu, location, or even confirm their existence through search engines, leading to lost revenue and zero brand visibility in a digital-first market.",
        challenges: "The business faced a blank slate with zero legacy data. They struggled to showcase their unique ambiance, missed out on local search traffic, and had no way to facilitate online reservation inquiries or digital menu exploration.",
        solution: "We developed their first-ever digital flagship—a modern, mobile-responsive platform. Our solution featured structured menu discovery, integrated contact/location architecture, and a foundational SEO setup to ensure immediate discoverability on launch.",
        results: [
            { label: "Online Presence", value: "First Website" },
            { label: "Visibility", value: "SEO Improved" },
            { label: "Inquiries", value: "Increased" },
            { label: "Brand Equity", value: "Professional" },
            { label: "Accessibility", value: "Easy Find" },
        ],
        accent: "#2197A1",
        polaroidAngle: "-rotate-2",
        polaroidAngle2: "rotate-3",
        images: {
            before: "/case-studies/ricchhotel-before.png",
            after: "/case-studies/ricchhotel-after.png"
        }
    },
    {
        client: "Shriswara Multispeciality Hospital",
        industry: "Healthcare",
        headline: "From an Outdated WordPress Website to a Modern Healthcare Platform",
        problem: "The hospital's existing WordPress site was severely outdated and difficult to manage. It failed to convey the sophisticated level of care provided, creating a digital disconnect between the physical hospital experience and its online representation.",
        challenges: "Limited flexibility in the legacy CMS hindered content updates, while slow loading speeds and poor mobile responsiveness made it difficult for patients to access critical department and doctor information during emergencies.",
        solution: "We performed a complete architectural overhaul, moving away from restrictive templates to a custom-developed, scalable healthcare platform. We prioritized patient-centric navigation, optimized doctor directories, and ensured seamless cross-device performance.",
        results: [
            { label: "Patient UX", value: "Redesigned" },
            { label: "Performance", value: "Significant" },
            { label: "Accessibility", value: "Full Mobile" },
            { label: "Navigation", value: "Intuitive" },
            { label: "Design", value: "Professional" },
        ],
        accent: "#1b7a82",
        polaroidAngle: "rotate-2",
        polaroidAngle2: "-rotate-3",
        images: {
            before: "/case-studies/shriswara-before.png",
            after: "/case-studies/shriswara-after.png"
        }
    },
    {
        client: "GVR Info Systems",
        industry: "IT Services / Technology",
        headline: "From a Self-Developed Website to a Modern Professional Digital Experience",
        problem: "GVR Info Systems relied on an internally developed website that, while functional for basic info, failed to project the professional excellence expected of a leading technology provider.",
        challenges: "The self-built architecture lacked a modern UI/UX hierarchy. Outdated typography and a cluttered layout made it difficult for potential clients to navigate their complex IT service offerings, impacting brand credibility.",
        solution: "We engineered a visually engaging platform with a high-performance visual hierarchy. By restructuring the information architecture, we ensured their service portfolio was the focal point, supported by modern UI elements and optimized performance.",
        results: [
            { label: "Navigation", value: "Reorganized" },
            { label: "Credibility", value: "Enhanced" },
            { label: "Performance", value: "Improved" },
            { label: "Design", value: "Professional" },
            { label: "Engagement", value: "Better" },
        ],
        accent: "#2197A1",
        polaroidAngle: "-rotate-2",
        polaroidAngle2: "rotate-3",
        images: {
            before: "/case-studies/gvr-before.png",
            after: "/case-studies/gvr-after.png"
        }
    },
    {
        client: "Russh Hospital",
        industry: "Healthcare",
        headline: "From an Outdated Website to a Strong Digital Healthcare Presence",
        problem: "Russh Hospital struggled with an outdated digital presence that failed to effectively showcase their medical expertise or reach potential patients in a competitive healthcare landscape.",
        challenges: "The existing platform lacked a modern structure and failed to communicate services clearly. Without a strategic marketing layer or an intuitive patient-centric design, their digital visibility remained stagnant.",
        solution: "We implemented a complete digital transformation, redesigning the website with a modern healthcare interface and integrating a targeted performance marketing strategy to expand their reach and patient engagement.",
        results: [
            { label: "Website", value: "Modernized" },
            { label: "Visibility", value: "Increased" },
            { label: "Engagement", value: "Better" },
            { label: "Brand", value: "Strengthened" },
            { label: "Reach", value: "Strategic" },
        ],
        accent: "#1b7a82",
        polaroidAngle: "rotate-2",
        polaroidAngle2: "-rotate-3",
        images: {
            before: "/case-studies/russh-before.png",
            after: "/case-studies/russh-after.png"
        }
    }
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
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2197A1]/10 border-2 border-[#2197A1] flex items-center justify-center text-[#2197A1] shadow-[0_0_0_4px_rgba(33,151,161,0.1)] group-hover:bg-[#2197A1] group-hover:text-white transition-all duration-300">
                    {icon}
                </div>
                <div className="w-[2px] flex-1 bg-gradient-to-b from-[#2197A1]/30 to-transparent mt-1 min-h-[28px]" />
            </div>

            {/* Content */}
            <div className="pb-8">
                <span className="text-[14px] font-black uppercase tracking-[0.15em] text-[#2197A1]/70 mb-1 block">
                    {label}
                </span>
                <p className="text-gray-800 font-medium leading-relaxed text-sm">
                    {value}
                </p>
            </div>
        </div>
    );
};

export default function CaseStudiesPage() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 2;

    const totalPages = Math.ceil(caseStudies.length / itemsPerPage);
    const paginatedCaseStudies = caseStudies.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <main className="flex min-h-screen flex-col items-center bg-white">            {/* Case Studies Hero Section */}
            <section
                className="relative w-full min-h-[75vh] min-[340px]:min-h-[60vh] min-[360px]:min-h-[75vh] min-[380px]:min-h-[60vh] min-[400px]:min-h-[58vh] min-[540px]:min-h-[68vh] min-[760px]:min-h-[66vh] min-[1024px]:min-h-screen flex items-center overflow-hidden"
                style={{ background: "radial-gradient(circle at top, #FFFFFF 0%, #2197A1 100%)" }}
            >                {/* Content Container */}
                <div className="z-10 w-full max-w-7xl !mx-auto flex md:flex-row flex-col items-center !px-4 md:!px-2 !pt-10 md:!pt-10 gap-8 md:gap-1">
 
                    {/* Hero Content Wrapper */}
                    <div className="w-full md:w-[70%] flex flex-col items-center md:items-start translate-y-[-20px] md:pr-0">
                        {/* Title: Centered on Mobile */}
                        <h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[#2A2A2A] !mb-2 md:mb-6 leading-tight break-words text-center md:text-left w-full">
                            Case <span className="text-[#2197A1]">Studies</span>
                        </h1>

                        <div className="w-full flex flex-col md:block">
                            {/* Short mobile content: Centered as requested */}
                            <p className="block md:hidden text-base sm:text-base text-[#2A2A2A]/80 font-medium leading-snug text-center mb-8">
                                Discover how Prodbiz Solutions transforms visions into high-impact digital realities through strategic growth and innovation.
                            </p>

                            {/* Desktop long content */}
                            <div className="hidden md:block">
                                <p className="text-lg md:text-xl text-[#2A2A2A]/80 font-medium leading-relaxed max-w-3xl mb-1 md:mb-8">
                                    At Prodbiz Solutions, we specialize in bridging the gap between innovative technology and
                                    impactful marketing. Our expertise lies in engineering custom website architectures
                                    that serve as high-performance digital flagships, integrated with strategic digital
                                    marketing campaigns that drive measurable growth. Whether it’s transforming a legacy
                                    WordPress site or building a brand&apos;s first-ever digital presence, we deliver
                                    tailored solutions that blend creative excellence with technical precision.
                                </p>
                            </div>
                        </div>

                        {/* Mobile Image: Rendered below content on mobile */}
                        <div className="md:hidden w-full flex justify-center !mt-4 !mb-2 h-[150px] relative">
                             {/* Ambient Glow */} 
                            <div className="absolute inset-x-0 bottom-0 top-10 bg-gradient-to-t from-[#2197A1] to-transparent rounded-[4rem] blur-[60px] opacity-20 pointer-events-none"></div>
                            <Image
                                src="/images/casestudies-hero.png"
                                alt="Case Studies"
                                fill
                                className="object-contain drop-shadow-xl scale-125"
                                priority
                            />
                        </div>

                        {/* Button: Centered on Mobile */}
                        <div className="w-full flex justify-center md:justify-start">
                            <Button
                                href="/contact"
                                className="inline-flex items-center gap-2 md:gap-3 bg-[#e76038] !text-white !px-6 md:!px-6 !py-3 md:!py-3 rounded-xl md:rounded-3xl font-bold text-lg md:text-lg hover:bg-[#e76038]/90 transition-all transform hover:scale-100 active:scale-95 shadow-md md:shadow-2xl relative z-10"
                            >
                                <span className="max-sm:hidden">Work With Us</span>
                                <span className="sm:hidden">Get Started</span>
                                <ArrowRight size={16} className="md:w-[22px] md:h-[22px]" />
                            </Button>
                        </div>
                    </div>

                    {/* Desktop Image - Hidden on Mobile */}
                    <div className="hidden md:flex w-[40%] md:w-[40%] !mb-20 justify-center items-center h-full min-h-[300px] md:min-h-[400px]">
                        <Image
                            src="/images/casestudies-hero.png"
                            alt="Case Studies"
                            width={500}
                            height={500}
                            priority
                            className="w-full h-auto object-contain drop-shadow-xl md:scale-125 transition-transform duration-700 hover:scale-130"
                        />
                    </div>
                </div>

                {/* Bottom 3D Drip Border */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px] flex justify-center">
                    <svg
                        className="relative block w-[300%] sm:w-[200%] lg:w-[150%] xl:w-[calc(100%+1.3px)] h-[70px] md:h-[100px] lg:h-[140px] flex-shrink-0"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <filter id="inner-shadow">
                                <feOffset dx="0" dy="5" />
                                <feGaussianBlur stdDeviation="4" result="offset-blur" />
                                <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                                <feFlood floodColor="black" floodOpacity="0.3" result="color" />
                                <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                                <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                            </filter>
                        </defs>
                        <path
                            d="M 0,120 L 0,0 C 10,0 20,10 20,30 C 18,50 32,50 30,30 C 30,10 40,0 50,0 C 60,0 70,40 70,80 C 68,100 82,100 80,80 C 80,40 90,0 100,0 C 110,0 120,20 120,40 C 118,60 132,60 130,40 C 130,20 140,0 150,0 C 160,0 170,50 170,100 C 168,120 182,120 180,100 C 180,50 190,0 200,0 C 210,0 220,10 220,20 C 218,40 232,40 230,20 C 230,10 240,0 250,0 C 260,0 270,30 270,60 C 268,80 282,80 280,60 C 280,30 290,0 300,0 C 310,0 320,45 320,90 C 318,110 332,110 330,90 C 330,45 340,0 350,0 C 360,0 370,10 370,30 C 368,50 382,50 380,30 C 380,10 390,0 400,0 C 410,0 420,35 420,70 C 418,90 432,90 430,70 C 430,35 440,0 450,0 C 460,0 470,25 470,50 C 468,70 482,70 480,50 C 480,25 490,0 500,0 C 510,0 520,50 520,95 C 518,115 532,115 530,95 C 530,50 540,0 550,0 C 560,0 570,20 570,40 C 568,60 582,60 580,40 C 580,20 590,0 600,0 C 610,0 620,40 620,80 C 618,100 632,100 630,80 C 630,40 640,0 650,0 C 660,0 670,10 670,20 C 668,40 682,40 680,20 C 680,10 690,0 700,0 C 710,0 720,35 720,70 C 718,90 732,90 730,70 C 730,35 740,0 750,0 C 760,0 770,45 770,90 C 768,110 782,110 780,90 C 780,45 790,0 800,0 C 810,0 820,20 820,40 C 818,60 832,60 830,40 C 830,20 840,0 850,0 C 860,0 870,50 870,100 C 868,120 882,120 880,100 C 880,50 890,0 900,0 C 910,0 920,10 920,30 C 918,50 932,50 930,30 C 930,10 940,0 950,0 C 960,0 970,40 970,80 C 968,100 982,100 980,80 C 980,40 990,0 1000,0 C 1010,0 1020,25 1020,50 C 1018,70 1032,70 1030,50 C 1030,25 1040,0 1050,0 C 1060,0 1070,10 1070,20 C 1068,40 1082,40 1080,20 C 1080,10 1090,0 1100,0 C 1110,0 1120,35 1120,70 C 1118,90 1132,90 1130,70 C 1130,35 1140,0 1150,0 C 1160,0 1170,45 1170,90 C 1168,110 1182,110 1180,90 C 1180,45 1190,0 1200,0 L 1200,120 Z"
                            fill="#ffffff"
                            filter="url(#inner-shadow)"
                        ></path>
                    </svg>
                </div>
            </section>

            {/* Case Study Rows */}
            <section className="relative w-full !pb-0 md:!py-20 !px-6 md:!px-0 overflow-hidden flex items-center justify-center">
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
                                        <span className="inline-block bg-[#2197A1]/10 text-[#2197A1] text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
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
                                            <span className="text-[14px] font-black uppercase tracking-[0.15em] text-[#2197A1]/70 !mb-1 block">Results</span>
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
                                <div className="relative h-[380px] flex items-center justify-center">
                                    {/* Back polaroid - BEFORE */}
                                    <div
                                        className={`absolute w-56 h-64 bg-white rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-100 p-3 ${cs.polaroidAngle2} top-6 left-1/2 -translate-x-1/2 transition-transform duration-500 hover:scale-105`}
                                    >
                                        <div className="w-full h-44 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
                                            {cs.images?.before ? (
                                                <img src={cs.images.before} alt="Before Design" className="w-full h-full object-cover opacity-60" />
                                            ) : (
                                                <svg className="w-10 h-10 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                                    <path d="M21 15l-5-5L5 21" />
                                                </svg>
                                            )}
                                        </div>
                                        <div className="mt-3 flex flex-col items-center gap-1">
                                            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Before Design</span>
                                        </div>
                                    </div>

                                    {/* Front polaroid - AFTER */}
                                    <div
                                        className={`absolute w-60 h-72 bg-white rounded-xl shadow-[0_30px_80px_rgba(33,151,161,0.18)] border border-gray-100 p-3 ${cs.polaroidAngle} top-4 left-1/2 -translate-x-1/3 transition-transform duration-500 hover:scale-105 hover:rotate-0 z-10`}
                                    >
                                        <div className="w-full h-52 rounded-lg bg-gradient-to-br from-[#2197A1]/5 to-[#2197A1]/10 flex items-center justify-center relative overflow-hidden">
                                            {cs.images?.after ? (
                                                <img src={cs.images.after} alt="After Design" className="w-full h-full object-cover" />
                                            ) : (
                                                <>
                                                    <div className="absolute inset-0 flex items-center justify-center text-[#2197A1]/10 font-black text-6xl select-none">
                                                        {cs.client.split(" ").map(w => w[0]).join("").slice(0, 3)}
                                                    </div>
                                                    <svg className="w-12 h-12 text-[#2197A1]/30 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                                        <path d="M21 15l-5-5L5 21" />
                                                    </svg>
                                                </>
                                            )}
                                        </div>
                                        <div className="mt-3 flex flex-col items-center gap-1">
                                            <span className="text-[10px] font-black uppercase text-[#2197A1] tracking-widest">Premium After</span>
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
