"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, HeartPulse, UtensilsCrossed, Cpu, Rocket, Store, Users, Target, Briefcase, Globe as GlobeIcon, Check } from "lucide-react";
import { DiscoverIcon, StrategizeIcon, BuildIcon, GrowIcon } from "@/components/icons/ProcessIcons";
import Button from "@/components/Button";
import FinalCTA from "@/components/FinalCTA";
import dynamic from "next/dynamic";
const WhoWeAreHero3D = dynamic(() => import("@/components/WhoWeAreHero3D"), { ssr: false });


const teamMembers = [
    { name: "Srikanth Reddy", role: "Managing Director" },
    { name: "Praveen Reddy", role: "CEO" },
    { name: "Pravanya Reddy", role: "CTO" },
    { name: "Surya Teja", role: "Business Head" },
    { name: "Gopala Krishna", role: "SEO" }
];

const principles = [
    {
        title: "Innovation First",
        desc: "We embrace modern technologies to build scalable and future-ready digital solutions."
    },
    {
        title: "Strategy Driven",
        desc: "Every project begins with understanding business goals and building a clear roadmap for success."
    },
    {
        title: "User-Centered Design",
        desc: "We create digital experiences that are intuitive, engaging, and focused on user needs."
    },
    {
        title: "Long-Term Partnerships",
        desc: "We believe in building lasting relationships with our clients by delivering reliable solutions and continuous support."
    }
];

const industries = [
    { id: "A", name: "Healthcare", icon: HeartPulse, color: "#e76038", desc: "Digital systems for patient care and clinical efficiency." },
    { id: "B", name: "Restaurants & Hospitality", icon: UtensilsCrossed, color: "#e76038", desc: "Smart ordering and guest management solutions." },
    { id: "C", name: "Technology & IT Services", icon: Cpu, color: "#e76038", desc: "Scalable infrastructure and product development." },
    { id: "D", name: "Startups & Emerging", icon: Rocket, color: "#e76038", desc: "Rapid prototyping and growth-focused platforms." },
    { id: "E", name: "Local Service Businesses", icon: Store, color: "#e76038", desc: "Local SEO and customer booking ecosystems." },
];

const processSteps = [
    {
        title: "Discover",
        desc: "We understand your business goals, audience, and digital challenges.",
        icon: <DiscoverIcon />
    },
    {
        title: "Strategize",
        desc: "Our team builds a clear roadmap based on research and insights.",
        icon: <StrategizeIcon />
    },
    {
        title: "Build",
        desc: "We design and develop scalable digital solutions tailored to your needs.",
        icon: <BuildIcon />
    },
    {
        title: "Grow",
        desc: "We continuously optimize and support your digital growth through data-driven strategies.",
        icon: <GrowIcon />
    }
];

function IndustryCard({ item }: { item: typeof industries[0] }) {
    const Icon = item.icon;
    return (
        <div
            className="flex flex-col items-center justify-center p-8 rounded-[2.5rem] transition-all duration-500 group w-full max-w-[280px] relative"
            style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
            }}
        >
            {/* 3D Reflection/Flare */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative w-15 h-15 !mb-2 flex items-center justify-center group-hover:translate-z-10 transition-transform duration-500" style={{ transform: 'translateZ(20px)' }}>
                {/* Illustration Background */}
                <div
                    className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-all duration-500 scale-110 group-hover:scale-125 rotate-[-15deg] group-hover:rotate-0"
                    style={{
                        backgroundColor: item.color,
                        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
                    }}
                />
                <div
                    className="absolute inset-2 opacity-10 blur-xl group-hover:blur-2xl transition-all duration-500"
                    style={{
                        backgroundColor: item.color,
                        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
                    }}
                />
                <div className="relative z-10" style={{ color: item.color }}>
                    <Icon size={40} strokeWidth={2} className="group-hover:scale-100 transition-transform duration-500 drop-shadow-lg" />
                </div>
            </div>

            <h3 className="text-xl font-bold text-[#2A2A2A] text-center tracking-tight group-hover:text-[#2197A1] transition-colors line-clamp-2" style={{ transform: 'translateZ(10px)' }}>
                {item.name}
            </h3>
        </div>
    );
}

function MobileLeadersCarousel({ items }: { items: typeof teamMembers }) {
    const [activeIdx, setActiveIdx] = React.useState(0);
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const isSteppingRef = React.useRef(false);

    // We append the first item to the end to create a seamless loop
    const displayItems = [...items, items[0]];

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current && !isSteppingRef.current) {
                const { clientWidth } = carouselRef.current;
                const nextIdx = activeIdx + 1;

                carouselRef.current.scrollTo({
                    left: nextIdx * clientWidth,
                    behavior: 'smooth'
                });

                setActiveIdx(nextIdx);

                // If we just scrolled to the clone (last item in displayItems)
                if (nextIdx === items.length) {
                    isSteppingRef.current = true;
                    // Wait for smooth scroll to finish, then jump back to start
                    setTimeout(() => {
                        if (carouselRef.current) {
                            carouselRef.current.scrollTo({ left: 0, behavior: 'auto' });
                            setActiveIdx(0);
                            isSteppingRef.current = false;
                        }
                    }, 600); // Slightly more than the smooth scroll duration
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [activeIdx, items.length]);

    const handleScroll = () => {
        if (carouselRef.current && !isSteppingRef.current) {
            const { scrollLeft, clientWidth } = carouselRef.current;
            const newIdx = Math.round(scrollLeft / clientWidth);
            // Only update if it's within the original items range
            if (newIdx < items.length && newIdx !== activeIdx) {
                setActiveIdx(newIdx);
            }
        }
    };

    return (
        <div className="md:hidden w-full overflow-hidden">
            <div
                ref={carouselRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory w-full"
            >
                {displayItems.map((member, idx) => (
                    <div
                        key={idx}
                        className="w-full flex-shrink-0 flex flex-col items-center snap-center !py-4"
                    >
                        {/* Image Container with Organic Blob */}
                        <div className="relative w-52 h-52 !mb-5">
                            <div
                                className="absolute inset-0 bg-[#e76038] opacity-90 shadow-xl"
                                style={{
                                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                                    transform: 'rotate(-8deg) scale(1.01)'
                                }}
                            />
                            <div
                                className="absolute inset-2 bg-[#f97316] opacity-40 blur-lg"
                                style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
                            />

                            <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-10"
                                style={{ borderRadius: '40% 60% 70% 30% / 40% 40% 60% 60%' }}>
                                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-[#2197A1]/20 font-black text-5xl select-none">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="text-center pb-10">
                            <h3 className="text-2xl font-bold text-[#2A2A2A] mb-3 transition-colors tracking-tight">
                                {member.name}
                            </h3>
                            <div className="flex flex-col items-center space-y-2">
                                <p className="text-[#2197A1] font-black text-sm uppercase tracking-widest">{member.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dot Indicators */}
            <div className="flex items-center justify-center gap-2 !mt-4">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            if (carouselRef.current) {
                                carouselRef.current.scrollTo({
                                    left: i * carouselRef.current.clientWidth,
                                    behavior: 'smooth'
                                });
                                setActiveIdx(i);
                            }
                        }}
                        className={`rounded-full transition-all duration-300 ${i === (activeIdx % items.length) ? 'bg-[#2197A1] w-6 h-2.5' : 'bg-[#2197A1]/25 w-2.5 h-2.5'
                            }`}
                        aria-label={`Go to leader ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

function MobileProcessCarousel({ items }: { items: any[] }) {
    const [activeIdx, setActiveIdx] = React.useState(1); // Start at index 1 (the first real item)
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const isJumpingRef = React.useRef(false);

    // [lastItem, item1, item2, ..., itemN, firstItem]
    const displayItems = [items[items.length - 1], ...items, items[0]];

    // Set initial scroll position to the first real item
    React.useEffect(() => {
        if (carouselRef.current) {
            const { clientWidth } = carouselRef.current;
            carouselRef.current.scrollLeft = clientWidth;
        }
    }, []);

    const handleScroll = () => {
        if (carouselRef.current && !isJumpingRef.current) {
            const { scrollLeft, clientWidth } = carouselRef.current;
            const newIdx = Math.round(scrollLeft / clientWidth);

            // Handle seamless jump at boundaries
            if (scrollLeft <= 0) {
                // Jump to last real item
                isJumpingRef.current = true;
                carouselRef.current.scrollLeft = items.length * clientWidth;
                setActiveIdx(items.length);
                setTimeout(() => { isJumpingRef.current = false; }, 50);
            } else if (scrollLeft >= (displayItems.length - 1) * clientWidth) {
                // Jump to first real item
                isJumpingRef.current = true;
                carouselRef.current.scrollLeft = clientWidth;
                setActiveIdx(1);
                setTimeout(() => { isJumpingRef.current = false; }, 50);
            } else {
                if (newIdx !== activeIdx) {
                    setActiveIdx(newIdx);
                }
            }
        }
    };

    // Map display index to real dot index (0 to items.length-1)
    const dotIdx = (activeIdx - 1 + items.length) % items.length;

    return (
        <div className="lg:hidden w-full overflow-hidden !mt-10">
            <div
                ref={carouselRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory w-full"
            >
                {displayItems.map((step, idx) => (
                    <div
                        key={idx}
                        className="w-full flex-shrink-0 flex flex-col items-center snap-center !py-4 !px-4"
                    >
                        <div className="relative z-10 flex flex-col items-center text-center p-8 bg-white border border-[#2197A1]/5 rounded-[2.5rem] shadow-sm h-full w-full max-w-[320px]">
                            {/* Step Number Badge */}
                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#2197A1] text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg rotate-[-10deg]">
                                {/* Correct number even for clones */}
                                {((idx - 1 + items.length) % items.length) + 1}
                            </div>

                            {/* Icon */}
                            <div className="w-16 h-16 bg-[#2197A1]/5 rounded-2xl flex items-center justify-center text-3xl !mb-6">
                                {step.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-[#2A2A2A] !mb-4 tracking-tight">
                                {step.title}
                            </h3>
                            <p className="text-lg text-[#2A2A2A]/70 leading-relaxed font-medium">
                                {step.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dot Indicators */}
            <div className="flex items-center justify-center gap-2 !mt-10">
                {items.map((_, i) => (
                    <div
                        key={i}
                        className={`transition-all duration-300 rounded-full ${i === dotIdx ? 'bg-[#2197A1] w-6 h-2.5' : 'bg-[#2197A1]/20 w-2.5 h-2.5'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default function WhoWeArePage() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            {/* Who We Are Hero Section */}
            <section
                className="relative w-full min-h-[75vh] min-[340px]:min-h-[60vh] min-[360px]:min-h-[75vh] min-[380px]:min-h-[60vh] min-[400px]:min-h-[58vh] min-[540px]:min-h-[68vh] min-[760px]:min-h-[66vh] min-[1024px]:min-h-screen flex items-center overflow-hidden"
                style={{ background: "radial-gradient(circle at top, #FFFFFF 0%, #2197A1 100%)" }}
            >
                {/* Content Container */}
                <div className="z-10 w-full max-w-7xl !mx-auto flex md:flex-row flex-col items-center !px-4 md:!px-2 !pt-10 md:!pt-10 gap-8 md:gap-1">
 
                    {/* Hero Content Wrapper */}
                    <div className="w-full md:w-[70%] flex flex-col items-center md:items-start translate-y-[-20px] md:pr-0">
                        {/* Title: Centered on Mobile */}
                        <h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[#2A2A2A] !mb-2 md:mb-6 leading-tight break-words text-center md:text-left w-full">
                            About <span className="text-[#2197A1]">Prodbiz Solutions</span>
                        </h1>

                        <div className="w-full flex flex-col md:block">
                            {/* Short mobile content: Left-aligned as requested */}
                            <p className="block md:hidden text-base sm:text-base text-[#2A2A2A]/80 font-medium leading-snug text-center mb-8">
                                Prodbiz Solutions delivers modern digital scalable products, intelligent marketing, and creative branding for exponential growth.
                            </p>

                            {/* Desktop long content */}
                            <div className="hidden md:block space-y-4 max-w-3xl mb-1 md:mb-8">
                                <p className="text-lg md:text-xl text-[#2A2A2A]/80 font-medium">
                                    Prodbiz Solutions is a modern digital solutions company dedicated to helping
                                    businesses build powerful digital experiences. We combine technology, marketing
                                    strategy, and creative media to deliver solutions that help organizations grow,
                                    innovate, and succeed in the digital landscape.
                                </p>
                                <p className="text-lg md:text-xl text-[#2A2A2A]/80 font-medium">
                                    Our team works with startups and growing businesses to design scalable
                                    digital products, create high-performing marketing strategies, and build
                                    strong brand identities.
                                </p>
                            </div>
                        </div>

                        {/* Mobile Image: Rendered below content on mobile */}
                        <div className="md:hidden w-full flex justify-center !mt-4 !mb-2 h-[150px] relative">
                             {/* Ambient Glow */} 
                            <div className="absolute inset-x-0 bottom-0 top-10 bg-gradient-to-t from-[#2197A1] to-transparent rounded-[4rem] blur-[60px] opacity-20 pointer-events-none"></div>
                            <Image
                                src="/images/hero-abt-img.png"
                                alt="About Prodbiz Solutions"
                                fill
                                className="object-contain drop-shadow-2xl scale-125"
                                priority
                            />
                        </div>

                        {/* Button: Centered on Mobile */}
                        <div className="w-full flex justify-center md:justify-start">
                            <Button
                                href="/contact"
                                className="inline-flex items-center gap-2 md:gap-3 bg-[#e76038] !text-white !px-6 md:!px-6 !py-3 md:!py-3 rounded-xl md:rounded-3xl font-bold text-lg md:text-lg hover:bg-[#e76038]/90 transition-all transform hover:scale-100 active:scale-95 shadow-md md:shadow-2xl relative z-10"
                            >
                                <span className="max-sm:hidden">Start Your Project</span>
                                <span className="sm:hidden">Get Started</span>
                                <ArrowRight size={16} className="md:w-[22px] md:h-[22px]" />
                            </Button>
                        </div>
                    </div>

                    {/* Desktop Hero Image - Hidden on Mobile */}
                    <div className="hidden md:flex w-[100%] lg:w-[45%] md:bottom-10 justify-center items-center relative h-[380px] sm:h-[650px] lg:h-[450px]">
                        {/* Ambient Glow */} 
                        <div className="absolute inset-x-0 bottom-0 top-10 bg-gradient-to-t from-[#2197A1] to-transparent rounded-[4rem] blur-[80px] opacity-20 pointer-events-none"></div>
                        
                        {/* Floating Image Container */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            <Image
                                src="/images/hero-abt-img.png"
                                alt="About Prodbiz Solutions"
                                fill
                                className="object-contain drop-shadow-2xl scale-110"
                                priority
                            />
                        </div>
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

            {/* Our Story Section */}
            <section className="w-full !pt-10 !pb-10 md:!pb-20 !px-6">
                <div className="max-w-7xl !mx-auto flex flex-col md:flex-row items-center md:gap-16 gap-10">
                    <div className="w-full md:w-1/2 flex justify-center items-center relative h-[400px] sm:h-[450px] lg:h-[500px]">
                        {/* Ambient Glow */}
                        <div className="absolute inset-x-0 bottom-0 top-10 bg-gradient-to-t from-[#2197A1] to-transparent rounded-[4rem] blur-[80px] opacity-20 pointer-events-none"></div>

                        {/* Floating 3D Image Container */}
                        <div className="relative w-full h-full flex items-center justify-center [animation:float_6s_ease-in-out_infinite]">
                            <Image
                                src="/images/ourstory-img.png"
                                alt="Our Story 3D Avatar"
                                fill
                                className="object-contain drop-shadow-2xl mix-blend-multiply scale-110"
                                priority
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <span className="text-[#2197A1] font-black uppercase tracking-widest text-xs !mb-1 block">Our Story</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#2A2A2A] !mb-8 leading-tight">
                            A Vision to <span className="text-[#2197A1]">Empower</span> Businesses Through Technology
                        </h2>
                        <div className="space-y-6 text-lg text-[#2A2A2A]/70 leading-relaxed font-medium">
                            <p>
                                Founded with a vision to merge technology and creative marketing,
                                Prodbiz Solutions started as a response to the growing need for integrated
                                digital services. We saw that many businesses were struggling to find a
                                single partner who could handle both their technical development and their
                                market presence.
                            </p>
                            <p>
                                Since then, we have focused on building a multi-disciplinary team of
                                software engineers, marketing strategists, and creative designers who work
                                in sync to deliver comprehensive solutions that drive real business results
                                and connect effectively with their audiences.
                            </p>
                            <p>
                                Our goal is not just to deliver services but to become a trusted digital
                                partner that supports long-term business growth.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Team Section */}
            <section className="relative w-full overflow-hidden">
                {/* Main Content Area with Grid */}
                <div className="relative bg-white md:!pt-10 !pb-10 md:!pb-20">
                    <div
                        className="absolute inset-0 z-0 opacity-20"
                    />

                    <div className="max-w-7xl !mx-auto w-full px-6 relative z-10">
                        <div className="text-center !mb-10 md:!mb-24">
                            <span className="text-[#2197A1] font-black uppercase tracking-widest text-xs !mb-1 block">Expert Leadership</span>
                            <h2 className="text-4xl md:!text-5xl font-bold text-[#2A2A2A] !mb-4">
                                Our Leaders
                            </h2>
                        </div>

                        {/* Leader Cards (Desktop Grid) */}
                        <div className="hidden md:flex flex-wrap justify-center gap-y-10 md:gap-y-18 gap-x-12">
                            {teamMembers.map((member, idx) => (
                                <div key={idx} className="w-full sm:w-[calc(50%-24px)] lg:w-[calc(25%-36px)] min-w-[260px] flex flex-col items-center group">
                                    {/* Image Container with Organic Blob */}
                                    <div className="relative w-52 h-52 !mb-5">
                                        {/* Organic Blob Background (Floating) */}
                                        <div
                                            className="absolute inset-0 bg-[#e76038] opacity-90 transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 shadow-xl"
                                            style={{
                                                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                                                transform: 'rotate(-8deg) scale(1.01)'
                                            }}
                                        />
                                        <div
                                            className="absolute inset-2 bg-[#f97316] opacity-40 blur-lg transition-transform duration-700 group-hover:scale-125"
                                            style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
                                        />

                                        {/* Initial/Headshot Mask */}
                                        <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-10"
                                            style={{ borderRadius: '40% 60% 70% 30% / 40% 40% 60% 60%' }}>
                                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-[#2197A1]/20 font-black text-5xl select-none group-hover:scale-110 transition-transform duration-500">
                                                {member.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold text-[#2A2A2A] mb-3 group-hover:text-[#2197A1] transition-colors tracking-tight">
                                            {member.name}
                                        </h3>
                                        <div className="flex flex-col items-center space-y-2">
                                            <p className="text-[#2197A1] font-black text-sm uppercase tracking-widest">{member.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Leader Carousel (Mobile) */}
                        <MobileLeadersCarousel items={teamMembers} />
                    </div>
                </div>
            </section>

            {/* Core Principles Section */}
            <section className="relative w-full !py-10 md:!py-24 !px-6 overflow-hidden bg-[#f0f9fa]">
                <div className="max-w-7xl !mx-auto w-full relative z-10">
                    <div className="flex flex-col lg:flex-row gap-4 md:gap-16 lg:gap-8">
                        {/* Left Side: Title & Intro (1/3) */}
                        <div className="w-full lg:w-[33.33%] lg:pr-12">
                            <span className="text-[#2197A1] font-black uppercase tracking-widest text-[11px] !mb-3 block">Company Core</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#2A2A2A] mb-8 leading-tight">
                                Our Philosophy
                            </h2>
                            <p className="text-xl text-[#2A2A2A]/80 leading-relaxed font-medium mb-12">
                                At Prodbiz Solutions, we believe that successful digital solutions are
                                built at the intersection of technology, strategy, and creativity.
                            </p>
                        </div>

                        {/* Right Side: Principles (2/3) */}
                        <div className="w-full lg:w-[66.66%]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
                                {principles.map((p, idx) => (
                                    <div key={idx} className="group">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center text-[#e76038] group-hover:bg-[#e76038] group-hover:text-white transition-all duration-300">
                                                <span className="font-bold text-lg">{idx + 1}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-[#2A2A2A] tracking-tight group-hover:text-[#2197A1] transition-colors">
                                                {p.title}
                                            </h3>
                                        </div>
                                        <p className="text-[#2A2A2A]/70 text-lg leading-relaxed font-medium">
                                            {p.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section (Infographic) */}
            <section className="relative w-full !py-15 md:!pt-12 md:!pb-2 !px-6 bg-white overflow-hidden">
                <div className="max-w-7xl !mx-auto w-full relative z-10 flex flex-col items-center">

                    {/* Main Infographic Container */}
                    <div className="relative w-full max-w-5xl aspect-[16/9] flex items-center justify-center hidden lg:flex">

                        {/* Central Circle */}
                        <div className="relative w-64 h-64 rounded-full bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-center z-30 group overflow-hidden">
                            <div className="absolute inset-2 border-2 border-dashed border-[#2197A1]/20 rounded-full animate-spin-slow" />
                            <div className="text-center p-8">
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#2197A1] mb-2">Our Foundation</p>
                                <h3 className="text-2xl font-bold bg-gradient-to-br from-[#2197A1] to-[#e76038] bg-clip-text text-transparent leading-tight">
                                    CORE<br />PURPOSE
                                </h3>
                            </div>
                        </div>

                        {/* Top Left: Mission Branch */}
                        <div className="absolute top-10 -left-25 w-1/2 h-1/2 flex flex-col items-end justify-start pr-10 pt-10 group">
                            {/* Mission Pill Header */}
                            <div className="flex items-center gap-0 mb-6 bg-[#2197A1] rounded-full !mt-10 !mr-25 pl-6 pr-2 py-2 shadow-lg shadow-[#2197A1]/20 group-hover:scale-105 transition-transform duration-500">
                                <span className="text-white font-black uppercase tracking-[0.2em] text-sm !pl-2 !mr-1">Our Mission</span>
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                                    <HeartPulse size={20} strokeWidth={2.5} />
                                </div>
                            </div>
                            <div className="text-right max-w-md !mr-28 !mt-4">
                                <h4 className="text-4xl font-black text-[#2A2A2A] mb-4 tracking-tight">IDEA</h4>
                                <p className="text-lg text-[#2A2A2A]/70 leading-relaxed font-medium">
                                    To empower businesses with innovative digital solutions that enhance their
                                    online presence and drive sustainable growth.
                                </p>
                            </div>
                            {/* SVG Connection Arc (Mission) */}
                            <svg className="absolute -bottom-8 -right-8 w-64 h-64 pointer-events-none z-10 overflow-visible">
                                <path
                                    d="M 256,128 A 128,128 0 0 0 128,0"
                                    fill="none"
                                    stroke="#2197A1"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    className="opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                                />
                                <circle cx="128" cy="0" r="4" fill="#2197A1" />
                            </svg>
                        </div>

                        {/* Bottom Right: Vision Branch */}
                        <div className="absolute bottom-10 -right-30 w-1/2 h-1/2 flex flex-col items-start justify-end pl-10 pb-10 group">
                            {/* SVG Connection Arc (Vision) */}
                            <svg className="absolute -top-8 -left-8 w-64 h-64 pointer-events-none z-10 overflow-visible">
                                <path
                                    d="M 0,128 A 128,128 0 0 0 128,256"
                                    fill="none"
                                    stroke="#e76038"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    className="opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                                />
                                <circle cx="128" cy="256" r="4" fill="#e76038" />
                            </svg>
                            <div className="text-left max-w-md !ml-25 !mb-0">
                                <h4 className="text-4xl font-black text-[#e76038] mb-4 tracking-tight">GOAL</h4>
                                <p className="text-lg text-[#2A2A2A]/70 leading-relaxed font-medium mb-6">
                                    To become a trusted digital partner by delivering scalable
                                    technology, strategic marketing, and creative brand experiences.
                                </p>
                            </div>
                            {/* Vision Pill Header */}
                            <div className="flex items-center gap-1 bg-[#e76038] rounded-full !ml-25 !mb-12 py-2 shadow-lg shadow-[#e76038]/20 group-hover:scale-105 transition-transform duration-500">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm !mr-1">
                                    <Rocket size={20} strokeWidth={2.5} />
                                </div>
                                <span className="text-white font-black uppercase tracking-[0.2em] !pr-2 text-sm">Our Vision</span>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Version (Vertical) */}
                    <div className="lg:hidden w-full flex flex-col gap-12">
                        {/* Mission */}
                        <div className="flex flex-col items-center text-center p-8 bg-[#fcfcfc] border border-[#2197A1]/10 rounded-[2.5rem] shadow-sm">
                            <div className="flex items-center gap-4 mb-6 bg-[#2197A1] rounded-full !px-2 !py-2 !-mt-5 shadow-lg shadow-[#2197A1]/20">
                                <HeartPulse size={20} strokeWidth={2.5} className="text-white" />
                                <span className="text-white font-black uppercase tracking-widest text-xs">Our Mission</span>
                            </div>
                            <h4 className="text-3xl font-black text-[#2A2A2A] !mt-4">IDEA</h4>
                            <p className="text-[#2A2A2A]/70 leading-relaxed font-medium !mt-0">To empower businesses with innovative digital solutions that enhance their online presence.</p>
                        </div>

                        {/* Vision */}
                        <div className="flex flex-col items-center text-center p-8 bg-[#fcfcfc] border border-[#e76038]/10 rounded-[2.5rem] shadow-sm">
                            <div className="flex items-center gap-4 mb-6 bg-[#e76038] rounded-full !px-2 !py-2 !-mt-5 shadow-lg shadow-[#e76038]/20">
                                <Rocket size={20} strokeWidth={2.5} className="text-white" />
                                <span className="text-white font-black uppercase tracking-widest text-xs">Our Vision</span>
                            </div>
                            <h4 className="text-3xl font-black text-[#e76038] !mt-4">GOAL</h4>
                            <p className="text-[#2A2A2A]/70 leading-relaxed font-medium !mt-0">To become a trusted digital partner by delivering scalable technology and creative brand experiences.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Process Section */}
            <section className="relative w-full md:!pt-14 md:!pb-15 !px-6 overflow-hidden">
                <div className="max-w-7xl !mx-auto w-full relative z-10">
                    <div className="text-center !mb-10 md:!mb-20">
                        <span className="text-[#2197A1] font-black uppercase tracking-widest text-[11px] !mb-3 block">Our Workflow</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#2A2A2A] leading-tight">
                            How We Work
                        </h2>
                    </div>

                    {/* Desktop/Tablet Grid */}
                    <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step, idx) => (
                            <div key={idx} className="relative group">
                                {/* Connection Line (Desktop) */}
                                {/* {idx < processSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-[#2197A1] to-transparent z-0" />
                                )} */}

                                <div className="relative z-10 flex flex-col items-center text-center !p-2 bg-white border border-[#2197A1]/5 rounded-[2.5rem] shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500 hover:border-[#2197A1]/20 h-full">
                                    {/* Step Number Badge */}
                                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#2197A1] text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg rotate-[-10deg] group-hover:rotate-0 transition-transform duration-300">
                                        {idx + 1}
                                    </div>

                                    {/* Icon */}
                                    <div className="w-16 h-16 bg-[#2197A1]/5 rounded-2xl flex items-center justify-center text-3xl !mb-6 group-hover:scale-110 transition-transform duration-300">
                                        {step.icon}
                                    </div>

                                    <h3 className="text-2xl font-bold text-[#2A2A2A] !mb-4 tracking-tight group-hover:text-[#2197A1] transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-lg text-[#2A2A2A]/70 leading-relaxed font-medium">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Carousel */}
                    <MobileProcessCarousel items={processSteps} />
                </div>
            </section>

            {/* Industries We Serve Section (Infographic Bloom) */}
            <section className="relative w-full !pt-20 md:!pb-4 md:!pt-14 !px-6 bg-[#fcfcfc] overflow-hidden">
                <div className="max-w-7xl !mx-auto w-full relative z-10 flex flex-col items-center">

                    <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-0">
                        {/* Left Side: Organic Infographic Bloom */}
                        <div className="w-full lg:w-[55%] relative flex items-center justify-center min-h-[500px] md:min-h-[600px] hidden md:flex">

                            {/* SVG for Organic Shapes & Connections */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 600">
                                <defs>
                                    <linearGradient id="bloomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#2197A1" />
                                        <stop offset="50%" stopColor="#e76038" />
                                        <stop offset="100%" stopColor="#f97316" />
                                    </linearGradient>
                                    <filter id="bloomShadow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
                                        <feOffset dx="5" dy="10" result="offsetblur" />
                                        <feComponentTransfer>
                                            <feFuncA type="linear" slope="0.2" />
                                        </feComponentTransfer>
                                        <feMerge>
                                            <feMergeNode />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {/* Background White Blob */}
                                <path
                                    d="M 100,100 C 50,150 50,450 100,500 C 150,550 350,550 400,500 C 450,450 450,150 400,100 C 350,50 150,50 100,100 Z"
                                    fill="white"
                                    filter="url(#bloomShadow)"
                                />

                                {/* Foreground Gradient Shape */}
                                <path
                                    d="M 350,100 C 450,50 650,150 700,300 C 750,450 550,550 450,550 C 350,550 300,450 300,300 C 300,150 300,100 350,100 Z"
                                    fill="url(#bloomGradient)"
                                    className="opacity-90"
                                />

                                {/* Connection Lines (SVG) */}
                                {industries.map((_, i) => {
                                    const yCoords = [120, 205, 300, 395, 480];
                                    const xStart = [450, 520, 550, 520, 450];
                                    return (
                                        <line
                                            key={i}
                                            x1={xStart[i] + 20}
                                            y1={yCoords[i]}
                                            x2="780"
                                            y2={yCoords[i]}
                                            stroke="#CBD5E1"
                                            strokeWidth="2"
                                            strokeDasharray="4 4"
                                        />
                                    );
                                })}
                            </svg>

                            {/* Title Content (Inside White Blob) */}
                            <div className="absolute left-[8%] md:left-[12%] text-left max-w-[180px] z-20">
                                <h3 className="text-4xl font-black text-[#2A2A2A] mb-6 leading-tight uppercase tracking-tight">
                                    Industries <span className="text-[#2197A1]">We Serve</span>
                                </h3>
                                {/* <div className="w-16 h-1 bg-[#2197A1] mb-6" /> */}
                                <p className="text-lg text-[#2A2A2A]/70 leading-relaxed font-medium">
                                    Tailored digital excellence for diverse sectors worldwide.
                                </p>
                            </div>

                            {/* Icon Markers (Inside Gradient Shape) */}
                            {industries.map((item, idx) => {
                                const yCoords = [150, 225, 300, 375, 450];
                                const xStart = [450, 520, 550, 520, 450];
                                return (
                                    <div
                                        key={idx}
                                        className="absolute w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center z-30 group transition-all duration-300 hover:scale-125 hover:rotate-6 cursor-pointer"
                                        style={{ top: `${(yCoords[idx] / 600) * 100}%`, left: `${(xStart[idx] / 800) * 100}%`, transform: 'translate(-50%, -50%)' }}
                                    >
                                        <item.icon size={28} className="text-[#2197A1] group-hover:text-[#e76038] transition-colors" strokeWidth={2} />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Right Side: Content Cards */}
                        <div className="w-full lg:w-[45%] flex flex-col gap-2 lg:pl-10 relative z-20 !mt-0">
                            {/* Mobile Title (Only Visible on Mobile) */}
                            <div className="text-center mb-12 lg:hidden">
                                <span className="text-[#2197A1] font-black uppercase tracking-widest text-[11px] mb-3 block">Expertise Areas</span>
                                <h2 className="text-4xl font-bold text-[#2A2A2A] leading-tight">
                                    Industries <span className="text-[#2197A1]">We Serve</span>
                                </h2>
                            </div>

                            {industries.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-4 border border-gray-300 rounded-[2.5rem] transition-all duration-500 group"
                                >
                                    {/* Desktop badge (Tick in Circle) */}
                                    <div
                                        className="hidden md:flex w-10 h-10 md:!ml-5 rounded-full items-center justify-center text-white shadow-lg shrink-0 -rotate-6 group-hover:rotate-0 transition-transform"
                                        style={{ backgroundColor: item.color }}
                                    >
                                        <Check size={24} strokeWidth={3} />
                                    </div>

                                    {/* Mobile Icon (Only Visible on Mobile) */}
                                    <div className="md:hidden w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                                        <item.icon size={24} style={{ color: item.color }} strokeWidth={2.5} />
                                    </div>

                                    <div className="flex-1">
                                        <h5 className="text-xl font-bold text-[#2A2A2A] group-hover:text-[#2197A1] transition-colors">{item.name}</h5>
                                        <p className="text-base text-[#2A2A2A]/60 leading-snug">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <FinalCTA />
        </main>
    );
}
