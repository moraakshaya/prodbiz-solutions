"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    ArrowRight,
    TrendingUp,
    Zap,
    Target,
    Search
} from "lucide-react";
import NextImage from "next/image";
import FinalCTA from "@/components/FinalCTA";
import Button from "@/components/Button";
import WhyChooseUs from "@/components/WhyChooseUs";
import HeroVisual3D from "@/components/HeroVisual3D";
import { Megaphone, ShieldCheck, Handshake, MessageSquare, Heart } from "lucide-react";

const services = [
    {
        image: "/services/influencermarketing.webp",
        title: "Influencer Marketing",
        description: "Influencer marketing helps brands reach new audiences through trusted voices on social media platforms. By collaborating with relevant influencers, businesses can promote their products and services in a more authentic and engaging way.",
        highlights: [
            "Influencer identification and outreach",
            "Campaign strategy and planning",
            "Product promotions and collaborations",
            "Social media engagement campaigns",
            "Campaign performance tracking"
        ]
    },
    {
        image: "/services/onlinereputation.png",
        title: "Online Reputation Management (ORM)",
        description: "Online Reputation Management ensures that your brand maintains a positive and trustworthy image across digital platforms. We monitor brand mentions, manage customer feedback, and respond to reviews to protect and strengthen your brand's online reputation.",
        highlights: [
            "Monitoring brand mentions and reviews",
            "Managing customer feedback and responses",
            "Addressing negative reviews professionally",
            "Encouraging positive customer reviews",
            "Improving overall brand perception online"
        ]
    }
];

const processSteps = [
    {
        number: "01",
        title: "Brand & Reputation Analysis",
        description: "We analyze your current online presence, customer feedback, and brand perception.",
        icon: <Search size={24} />
    },
    {
        number: "02",
        title: "Strategy Development",
        description: "Our team creates a customized strategy focused on influencer collaborations and reputation management.",
        icon: <Target size={24} />
    },
    {
        number: "03",
        title: "Campaign Execution",
        description: "We implement influencer marketing campaigns and manage your brand’s online reputation.",
        icon: <Zap size={24} />
    },
    {
        number: "04",
        title: "Monitoring & Optimization",
        description: "We continuously monitor brand sentiment and optimize strategies to strengthen your reputation.",
        icon: <TrendingUp size={24} />
    }
];

const technologies = [
    { name: "Instagram", image: "/tools/instagram.png" },
    { name: "Youtube", image: "/tools/youtube.png" },
    { name: "Google Alerts", image: "/tools/google-alerts.png" },
    { name: "Google Reviews", image: "/tools/google-reviews.png" },
    { name: "Mention", image: "/tools/mention.png" }
];

const brandIcons = [
    { icon: Megaphone, color: "#e76038", label: "Influencer" },
    { icon: ShieldCheck, color: "#2197A1", label: "Reputation" },
    { icon: Handshake, color: "#e76038", label: "Partners" },
    { icon: MessageSquare, color: "#2197A1", label: "Feedback" },
    { icon: Heart, color: "#e76038", label: "Engagement" },
];

export default function BrandGrowthReputationManagementPage() {
    const [mounted, setMounted] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleScroll = () => {
        if (scrollRef.current) {
            const scrollLeft = scrollRef.current.scrollLeft;
            const cardWidth = scrollRef.current.offsetWidth;
            const newIndex = Math.round(scrollLeft / cardWidth);
            if (newIndex !== activeIndex) {
                setActiveIndex(newIndex);
            }
        }
    };

    const scrollToCard = (index: number) => {
        if (scrollRef.current) {
            const cardWidth = scrollRef.current.offsetWidth;
            scrollRef.current.scrollTo({
                left: index * cardWidth,
                behavior: "smooth"
            });
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center">
            {/* Brand Growth Hero Section - Matched to About Page */}
            <section
                className="relative w-full min-h-[75vh] min-[340px]:min-h-[60vh] min-[360px]:min-h-[80vh] min-[380px]:min-h-[62vh] min-[400px]:min-h-[58vh] min-[540px]:min-h-[68vh] min-[760px]:min-h-[66vh] min-[1024px]:min-h-screen flex items-center overflow-hidden"
                style={{ background: "radial-gradient(circle at top, #FFFFFF 0%, #2197A1 100%)" }}
            >
                {/* Content Container */}
                <div className="z-10 w-full max-w-7xl !mx-auto flex flex-col lg:flex-row items-center !px-4 md:px-6 !pt-3 sm:!pt-15 lg:!pt-10 gap-1 sm:gap-10 lg:gap-5">

                    {/* Left Side: Heading and Paragraph */}
                    <div className="w-full lg:w-[60%] flex flex-col items-center lg:items-start text-center lg:text-left lg:translate-y-[-20px] pr-0">
                        <span className="hidden md:block text-[#e76038]/80 font-bold text-sm uppercase tracking-widest md:!mb-4">Authority & Scale</span>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[#2A2A2A] !mb-2 md:mb-6 leading-tight break-words">
                            Brand Growth & <br />
                            <span className="text-[#2197A1]">Reputation Management</span>
                        </h1>
                        <div className="space-y-4 max-w-3xl !mb-0 md:!mb-8">
                            <p className="block md:hidden text-sm sm:text-base text-[#2A2A2A]/80 font-medium leading-snug">
                                We build brands that people trust and competitors admire. Our strategic approach combines reputation defense with growth tactics.
                            </p>
                            <div className="hidden md:block">
                                <p className="text-lg md:text-xl text-[#2A2A2A]/80 font-medium leading-relaxed">
                                    We build brands that people trust and competitors admire. Our strategic approach
                                    combines proactive reputation defense with high-velocity growth tactics to win
                                    the hearts and minds of your audience.
                                </p>
                            </div>
                        </div>

                        {/* Mobile 3D Visual - Visible only on mobile */}
                        <div className="lg:hidden w-full flex justify-center items-center !my-0 relative">
                            <HeroVisual3D icons={brandIcons} />
                        </div>

                        <Button
                            href="/contact"
                            className="inline-flex items-center gap-2 md:gap-3 bg-[#e76038] !text-white !px-2.5 md:!px-6 !py-2 md:!py-3 rounded-xl md:rounded-3xl font-bold !text-sm md:text-lg hover:bg-[#e76038]/90 transition-all transform hover:scale-100 active:scale-95 shadow-md md:shadow-2xl relative z-10"
                        >
                            <span>Elevate Your Brand</span>
                            <ArrowRight size={16} className="md:w-[22px] md:h-[22px]" />
                        </Button>
                    </div>

                    {/* Right Side: 3D Visual - Visible only on Desktop */}
                    <div className="hidden lg:flex lg:w-[40%] justify-center items-center h-full lg:min-h-[600px] relative">
                        <HeroVisual3D icons={brandIcons} />
                    </div>
                </div>

                {/* Bottom 3D Drip Border (Standardized) */}
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

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes dash {
                    to {
                        stroke-dashoffset: -1000;
                    }
                }
            `}} />

            {/* Services Section */}
            <section className="relative w-full bg-white !pt-10 md:!py-20 !px-3 md:px-12 lg:px-24 overflow-hidden">
                <div className="relative z-10 max-w-7xl !mx-auto">
                    <div className="text-center !mb-5">
                        <span className="text-[#2197A1] font-bold text-sm uppercase tracking-widest mb-4 block">Strategic Management</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-[#2A2A2A] mb-8">Our Growth Services</h2>
                    </div>

                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex flex-nowrap md:flex-wrap justify-start md:justify-center md:!pt-10 gap-5 md:gap-10 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory no-scrollbar pb-8 md:pb-0"
                    >
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="group relative w-[85vw] flex-shrink-0 md:flex-shrink md:w-[calc(50%-20px)] lg:w-[calc(33.333%-27px)] snap-center"
                                style={{ perspective: "1000px" }}
                            >
                                <div className="h-full bg-[#2197A1]/20 border border-gray-100 !px-4 !py-5 md:!p-5 rounded-[3.5rem] transition-all duration-500 transform-gpu group-hover:[transform:rotateX(2deg)rotateY(2deg)] group-hover:bg-[#2197A1]/10 group-hover:border-[#2197A1]/10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] flex flex-col items-start overflow-hidden">
                                    <div className="!mb-2 md:!mb-6 relative w-full aspect-video overflow-hidden rounded-[2rem] border border-gray-100 shadow-sm bg-white">
                                        <NextImage
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-[#2A2A2A] !mb-2 leading-tight group-hover:text-[#2197A1] transition-colors">{service.title}</h3>
                                    <p className="text-gray-500 leading-relaxed text-base md:text-lg mb-6 md:mb-10 font-medium">
                                        {service.description}
                                    </p>

                                    <div className="mt-auto w-full">
                                        <div className="flex flex-col gap-3 md:gap-4">
                                            {service.highlights.map((highlight, hIndex) => (
                                                <div key={hIndex} className="flex items-center gap-3">
                                                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#e76038] shadow-[0_0_10px_rgba(231,96,56,0.3)]"></div>
                                                    <span className="text-[#2A2A2A] font-bold text-xs md:text-sm tracking-wide">{highlight}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Dots (Mobile Only) */}
                    <div className="flex md:hidden justify-center items-center gap-2 !mt-5">
                        {services.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToCard(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeIndex === index
                                    ? "bg-[#2197A1] w-6"
                                    : "bg-gray-300"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Serpentine Milestone Timeline */}
            <section className="relative w-full bg-white !py-20 !px-10 md:px-12 lg:px-24 overflow-hidden">
                <div className="max-w-7xl !mx-auto">
                    <div className="text-center !mb-10">
                        <h2 className="text-4xl md:text-6xl font-black text-[#2A2A2A] mb-4 tracking-tight uppercase">Strategy TIMELINE</h2>
                        <p className="text-gray-400 text-lg max-w-2xl !mx-auto font-medium">
                            Our roadmap to establishing and scaling your market authority.
                        </p>
                    </div>

                    <div className="relative max-w-5xl !mx-auto pt-20 pb-40">
                        {/* Desktop Serpentine Timeline (SVG) */}
                        <div className="hidden md:block">
                            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 1000 600" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#2197A1" />
                                        <stop offset="50%" stopColor="#2197A1" />
                                        <stop offset="100%" stopColor="#e76038" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M 50 100 L 900 100 Q 950 100 950 150 L 950 250 Q 950 300 900 300 L 100 300 Q 50 300 50 350 L 50 450 Q 50 500 100 500 L 950 500"
                                    fill="none"
                                    stroke="url(#pathGradient)"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    className="opacity-20"
                                />
                                <path
                                    d="M 50 100 L 900 100 Q 950 100 950 150 L 950 250 Q 950 300 900 300 L 100 300 Q 50 300 50 350 L 50 450 Q 50 500 100 500 L 950 500"
                                    fill="none"
                                    stroke="url(#pathGradient)"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    strokeDasharray="20 15"
                                    className="animate-[dash_60s_linear_infinite]"
                                />
                            </svg>

                            <div className="relative z-10 w-full h-[600px]">
                                {/* Step 1 */}
                                <div className="absolute top-[125px] left-[25%] -translate-x-1/2 -translate-y-1/2 group">
                                    <div className="flex flex-col items-center">
                                        <div className="text-[#2197A1] font-bold text-sm !mb-4">Phase 01</div>
                                        <div className="w-6 h-6 rounded-full border-4 border-[#2197A1] bg-white shadow-md transition-transform duration-500 group-hover:scale-100 relative">
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-10 bg-gray-500 group-hover:bg-[#2197A1] transition-colors" />
                                        </div>
                                        <div className="!mt-14 text-center w-64 lg:w-80 group-hover:-translate-y-2 transition-transform duration-500">
                                            <h3 className="text-2xl font-black text-[#2197A1] mb-2 uppercase italic">{processSteps[0].title}</h3>
                                            <p className="text-gray-400 text-xs font-semibold leading-relaxed px-4">{processSteps[0].description}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="absolute top-[125px] left-[75%] -translate-x-1/2 -translate-y-1/2 group">
                                    <div className="flex flex-col items-center">
                                        <div className="text-[#2197A1] font-bold text-sm !mb-4">Phase 02</div>
                                        <div className="w-6 h-6 rounded-full border-4 border-[#2197A1] bg-white shadow-md transition-transform duration-500 group-hover:scale-100 relative">
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-10 bg-gray-500 group-hover:bg-[#2197A1] transition-colors" />
                                        </div>
                                        <div className="!mt-14 text-center w-64 lg:w-80 group-hover:-translate-y-2 transition-transform duration-500">
                                            <h3 className="text-2xl font-black text-[#2197A1] mb-2 uppercase italic">{processSteps[1].title}</h3>
                                            <p className="text-gray-400 text-xs font-semibold leading-relaxed px-4">{processSteps[1].description}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="absolute top-[315px] left-[50%] -translate-x-1/2 -translate-y-1/2 group">
                                    <div className="flex flex-col items-center">
                                        <div className="text-[#2197A1] font-bold text-sm !mb-4">Phase 03</div>
                                        <div className="w-6 h-6 rounded-full border-4 border-[#2197A1] bg-white shadow-md transition-transform duration-500 group-hover:scale-100 relative">
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-10 bg-gray-500 group-hover:bg-[#2197A1] transition-colors" />
                                        </div>
                                        <div className="!mt-14 text-center w-64 lg:w-96 group-hover:-translate-y-2 transition-transform duration-500">
                                            <h3 className="text-2xl font-black text-[#e76038] mb-2 uppercase italic">{processSteps[2].title}</h3>
                                            <p className="text-gray-400 text-xs font-semibold leading-relaxed px-4">{processSteps[2].description}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 4 */}
                                <div className="absolute top-[540px] left-[80%] -translate-x-1/2 -translate-y-1/2 group">
                                    <div className="flex flex-col items-center">
                                        <div className="text-[#2197A1] font-bold text-sm !mb-4">Phase 04</div>
                                        <div className="w-6 h-6 rounded-full border-4 border-[#2197A1] bg-white shadow-md transition-transform duration-500 group-hover:scale-100 relative">
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-10 bg-gray-500 group-hover:bg-[#2197A1] transition-colors" />
                                        </div>
                                        <div className="!mt-14 text-center w-64 lg:w-80 group-hover:-translate-y-2 transition-transform duration-500">
                                            <h3 className="text-2xl font-black text-gray-300 mb-2 uppercase italic group-hover:text-[#e76038] transition-colors">{processSteps[3].title.replace('Continuous Support', 'Support')}</h3>
                                            <p className="text-gray-400 text-xs font-semibold leading-relaxed px-4">{processSteps[3].description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Vertical Timeline */}
                        <div className="md:hidden relative mt-10 !ml-1 border-l-2 border-dashed border-[#2197A1]/30 !pl-8 space-y-12">
                            {processSteps.map((step, index) => (
                                <div key={index} className="relative">
                                    {/* Dot on the line */}
                                    <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 border-[#2197A1] bg-white shadow-sm z-10" />

                                    <div className="flex flex-col items-start translate-y-[-4px] !mb-5">
                                        <span className="text-[#2197A1] font-bold text-xs mb-1 uppercase tracking-wider">Phase {step.number}</span>
                                        <h4 className="text-xl font-bold text-[#2A2A2A] !mb-3 uppercase italic">{step.title}</h4>
                                        <p className="text-gray-500 text-sm font-medium leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Technologies Infographic Hub */}
            <section className="relative w-full bg-gradient-to-br from-[#2197A1] via-[#1b7a82] to-[#125960] !pt-20 !pb-10 md:!py-20 !px-6 md:px-12 lg:px-24 overflow-hidden">
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20">
                    <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[120px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0 C480,100 720,0 1200,80 L1200,0 L0,0 Z" fill="#ffffff" opacity="0.3"></path>
                        <path d="M0,0 C600,120 900,20 1200,60 L1200,0 L0,0 Z" fill="#ffffff" opacity="0.2"></path>
                        <path d="M0,0 C300,80 900,40 1200,20 L1200,0 L0,0 Z" fill="#ffffff"></path>
                    </svg>
                </div>
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 transform rotate-180">
                    <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[120px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0 C480,100 720,0 1200,80 L1200,0 L0,0 Z" fill="#2a2a2a" opacity="0.3"></path>
                        <path d="M0,0 C600,120 900,20 1200,60 L1200,0 L0,0 Z" fill="#2a2a2a" opacity="0.2"></path>
                        <path d="M0,0 C300,80 900,40 1200,20 L1200,0 L0,0 Z" fill="#2a2a2a"></path>
                    </svg>
                </div>

                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15)_0%,_transparent_50%)]"></div>

                <div className="relative z-10 max-w-7xl !mx-auto flex flex-col lg:flex-row items-center gap-0 md:gap-20">
                    <div className="w-full lg:w-[40%] text-left">
                        <span className="text-white/80 font-bold text-sm uppercase tracking-widest mb-6 block drop-shadow-sm">Tech Stack</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-tight drop-shadow-lg">
                            Powerful <br />
                            <span className="text-[#e76038]">Strategic Stack</span>
                        </h2>
                        <p className="text-lg text-white/90 font-medium leading-relaxed mb-10 max-w-lg drop-shadow-md">
                            We use industry-leading tools for monitoring, automation, and analytics to ensure your brand&apos;s growth is data-driven and scalable.
                        </p>
                        <div className="flex flex-col gap-5">
                            {["Global Media Monitoring", "Growth Automation Hub", "Social Sentiment Radar"].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 group">
                                    <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-[#e76038] group-hover:border-[#e76038] transition-all duration-300 shadow-lg">
                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                    </div>
                                    <span className="text-white font-bold tracking-wide drop-shadow-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Bloom / Flower layout — single responsive component ── */}
                    <div className="w-full lg:w-[60%] flex items-center justify-center !mt-10 lg:!mt-0">
                        {/* Designed at 500×500 — scale down on smaller screens via CSS transform */}
                        <div
                            className="h-[350px] lg:h-[500px] scale-[0.62] xs:scale-[0.68] sm:scale-75 md:scale-90 lg:scale-100 origin-top"
                            style={{ width: 500, flexShrink: 0 }}
                        >
                            <div className="relative" style={{ width: 500, height: 500 }}>
                                {(() => {
                                    const CONTAINER = 250;
                                    const RADIUS = 155;
                                    const PETAL = 190;
                                    const INNER = 86;
                                    const PETAL_COLOR = "#2197A1";

                                    return technologies.map((tech_item, index) => {
                                        const angleDeg = index * (360 / technologies.length) - 90;
                                        const angleRad = (angleDeg * Math.PI) / 180;
                                        const cx = CONTAINER + Math.cos(angleRad) * RADIUS;
                                        const cy = CONTAINER + Math.sin(angleRad) * RADIUS;

                                        return (
                                            <div
                                                key={index}
                                                style={{
                                                    position: "absolute",
                                                    left: cx - PETAL / 2,
                                                    top: cy - PETAL / 2,
                                                    width: PETAL,
                                                    height: PETAL,
                                                    borderRadius: "50%",
                                                    background: PETAL_COLOR,
                                                    boxShadow: "0 8px 28px rgba(0,0,0,0.28)",
                                                    border: "5px solid rgba(255,255,255,0.35)",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    gap: 8,
                                                    zIndex: 5,
                                                    cursor: "pointer",
                                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                                }}
                                                onMouseEnter={e => {
                                                    (e.currentTarget as HTMLElement).style.transform = "scale(1.06)";
                                                    (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 50px rgba(0,0,0,0.35)";
                                                    (e.currentTarget as HTMLElement).style.zIndex = "15";
                                                }}
                                                onMouseLeave={e => {
                                                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                                                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.28)";
                                                    (e.currentTarget as HTMLElement).style.zIndex = "5";
                                                }}
                                            >
                                                {/* White inner circle with image */}
                                                <div
                                                    style={{
                                                        width: INNER,
                                                        height: INNER,
                                                        borderRadius: "50%",
                                                        background: "rgba(255,255,255,0.22)",
                                                        border: "2.5px solid rgba(255,255,255,0.55)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        overflow: "hidden",
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <NextImage
                                                        src={tech_item.image}
                                                        alt={tech_item.name}
                                                        width={60}
                                                        height={60}
                                                        style={{ objectFit: "contain", width: 120, height: 120 }}
                                                    />
                                                </div>
                                                {/* Tool name inside petal */}
                                                <span
                                                    style={{
                                                        color: "rgba(255,255,255,0.97)",
                                                        fontSize: 10,
                                                        fontWeight: 900,
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.07em",
                                                        textAlign: "center",
                                                        lineHeight: 1.2,
                                                        maxWidth: PETAL - 20,
                                                    }}
                                                >
                                                    {tech_item.name}
                                                </span>
                                            </div>
                                        );
                                    });
                                })()}

                                {/* Center Hub — z-index 20, always on top */}
                                <div
                                    style={{
                                        position: "absolute",
                                        left: 250 - 90,
                                        top: 250 - 90,
                                        width: 180,
                                        height: 180,
                                        borderRadius: "50%",
                                        background: "white",
                                        zIndex: 20,
                                        boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
                                        border: "5px solid rgba(255,255,255,0.85)",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: "0 14px",
                                        textAlign: "center",
                                    }}
                                >
                                    <span style={{ color: "#2197A1", fontWeight: 900, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.09em", lineHeight: 1.4 }}>
                                        Growth Ecosystem
                                    </span>
                                    <div style={{ width: 40, height: 3, background: "#e76038", borderRadius: 9999, marginTop: 8, boxShadow: "0 0 10px rgba(231,96,56,0.6)" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
