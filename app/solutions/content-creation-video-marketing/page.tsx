"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    ArrowRight,
    Video,
    Scissors,
    Instagram,
    Layout,
    Globe,
    Sparkles,
    Calendar,
    Target,
    TrendingUp
} from "lucide-react";
import NextImage from "next/image";
import Button from "@/components/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import CircularGallery from "@/components/CircularGallery";
import DomeGallery from "@/components/DomeGallery";
import MobileServiceCarousel from "@/components/MobileServiceCarousel";
import MobileInfographicCarousel from "@/components/MobileInfographicCarousel";
import FinalCTA from "@/components/FinalCTA";

const LiquidEther = dynamic(() => import("@/components/LiquidEther"), { ssr: false });

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const contentServicesData = [
    {
        title: "Video Shooting",
        desc: "We shoot professional videos for your business.",
        icon: <Video size={42} strokeWidth={1.5} />
    },
    {
        title: "Video Editing",
        desc: "We edit videos to make them attractive and engaging.",
        icon: <Scissors size={42} strokeWidth={1.5} />
    },
    {
        title: "Social Media Content",
        desc: "We create posts, reels, and content for platforms like Instagram.",
        icon: <Instagram size={42} strokeWidth={1.5} />
    },
    {
        title: "Content Planning",
        desc: "We plan what content to post to grow your audience.",
        icon: <Layout size={42} strokeWidth={1.5} />
    },
    {
        title: "Posting & Management",
        desc: "We post and manage your social media regularly.",
        icon: <Globe size={42} strokeWidth={1.5} />
    }
];

const portfolioItems = [
    { title: "Brand Storyfilm", category: "Video", image: "/services/videograpghy.jpg" },
    { title: "Product Promo", category: "Video", image: "/services/motiongraphic.webp" },
    { title: "Influencer Reel", category: "Social Media", image: "/services/influencermarketing.webp" },
    { title: "Social Campaign", category: "Content", image: "/services/socialmediamarketing.jpg" },
    { title: "Corporate Event", category: "Video", image: "/services/content-creation-video-making.jpg" },
    { title: "Creative Series", category: "Social Media", image: "/services/digital-marketing.jpg" },
];

const whyChooseUsData = [
    {
        title: "Creative and engaging content",
        desc: "We create simple and attractive social media content that helps your business get more attention and engagement.",
        icon: <Sparkles size={32} />
    },
    {
        title: "Regular posting & management",
        desc: "We handle your social media posting regularly so your page stays active and reaches more people.",
        icon: <Calendar size={32} />
    },
    {
        title: "Customized content for your business",
        desc: "We create content based on your business and services to connect with the right audience.",
        icon: <Target size={32} />
    },
    {
        title: "Audience growth & visibility",
        desc: "We help increase your followers, reach, and online visibility to bring more customers to your business.",
        icon: <TrendingUp size={32} />
    }
];

export default function ContentCreationVideoMarketingPage() {
    const [mounted, setMounted] = useState(false);

    const titleRef = useRef<HTMLHeadingElement>(null);
    const paraRef = useRef<HTMLParagraphElement>(null);
    const smallLineRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    const introSectionRef = useRef<HTMLElement>(null);
    const introVisualRef = useRef<HTMLDivElement>(null);
    const introContentRef = useRef<HTMLDivElement>(null);

    const offerSectionRef = useRef<HTMLElement>(null);
    const offerHeaderRef = useRef<HTMLDivElement>(null);
    const offerCardsRef = useRef<HTMLDivElement>(null);

    const portfolioSectionRef = useRef<HTMLElement>(null);
    const portfolioHeaderRef = useRef<HTMLDivElement>(null);

    const whyChooseUsSectionRef = useRef<HTMLElement>(null);
    const whyChooseUsHeaderRef = useRef<HTMLDivElement>(null);
    const whyChooseUsCardsRef = useRef<HTMLDivElement>(null);
    const mobileWhyChooseUsRef = useRef<HTMLDivElement>(null);

    const mobileOfferCardsRef = useRef<HTMLDivElement>(null);

    const titleText = "Video & Content Creation Services";
    const paraText = "We create videos and content that help your business get noticed and attract more customers.";
    const smallLineText = "From planning to posting, we handle everything for your social media.";

    useEffect(() => {
        setMounted(true);

        // --- Hero Entrance Sequence ---
        if (titleRef.current && paraRef.current && smallLineRef.current && buttonsRef.current) {
            const words = paraRef.current.querySelectorAll(".para-word");
            const smallWords = smallLineRef.current.querySelectorAll(".para-word");
            const chars = titleRef.current.querySelectorAll(".char");
            const buttons = buttonsRef.current.children;

            const tl = gsap.timeline({ delay: 0.5 });

            tl.fromTo(
                chars,
                { x: -40, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.0,
                    stagger: 0.02,
                    ease: "power3.out",
                }
            );

            tl.fromTo(
                words,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "power2.out",
                },
                "-=0.7"
            );

            tl.fromTo(
                smallWords,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.04,
                    ease: "power2.out",
                },
                "-=0.5"
            );

            tl.fromTo(
                buttons,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                },
                "-=0.4"
            );
        }

        // --- Intro Section Animation ---
        if (introSectionRef.current && introVisualRef.current && introContentRef.current) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: introSectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });

            tl.fromTo(introVisualRef.current,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
            );

            tl.fromTo(introContentRef.current.children,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" },
                "-=0.8"
            );
        }

        // --- What We Do Section Animation ---
        if (offerSectionRef.current && offerHeaderRef.current && offerCardsRef.current && mobileOfferCardsRef.current) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: offerSectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            });

            tl.fromTo(offerHeaderRef.current.children,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" }
            );

            tl.fromTo(offerCardsRef.current.children,
                { y: 60, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" },
                "-=0.6"
            );

            tl.fromTo(mobileOfferCardsRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                "<"
            );
        }

        // --- Portfolio Section Animation ---
        if (portfolioSectionRef.current && portfolioHeaderRef.current) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: portfolioSectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });

            tl.fromTo(portfolioHeaderRef.current,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
            );
        }

        // --- Why Choose Us Section Animation ---
        if (whyChooseUsSectionRef.current && whyChooseUsHeaderRef.current && whyChooseUsCardsRef.current && mobileWhyChooseUsRef.current) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: whyChooseUsSectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });

            tl.fromTo(whyChooseUsHeaderRef.current.children,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" }
            );

            tl.fromTo(whyChooseUsCardsRef.current.children,
                { y: 40, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.5)" },
                "-=0.6"
            );

            tl.fromTo(mobileWhyChooseUsRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                "<"
            );
        }

    }, [mounted]);


    return (
        <main className="flex min-h-screen flex-col items-center">
            {/* Hero Section */}
            <section className="relative w-full min-h-[75vh] min-[340px]:min-h-[60vh] min-[360px]:min-h-[75vh] min-[380px]:min-h-[60vh] min-[400px]:min-h-[58vh] min-[540px]:min-h-[68vh] min-[760px]:min-h-[66vh] min-[1024px]:min-h-[80vh] min-[1150px]:min-h-[100vh] flex items-center justify-center overflow-hidden pt-16 min-[760px]:pt-0">
                {/* LiquidEther Background Overlay */}
                <div className="absolute inset-0 -z-20 bg-black">
                    <LiquidEther
                        colors={['#2197a1', '#2197A1', '#2197a1']}
                        mouseForce={20}
                        cursorSize={100}
                        isViscous
                        viscous={30}
                        iterationsViscous={32}
                        iterationsPoisson={32}
                        resolution={0.5}
                        isBounce={false}
                        autoDemo
                        autoSpeed={0.5}
                        autoIntensity={2.2}
                        takeoverDuration={0.25}
                        autoResumeDelay={3000}
                        autoRampDuration={0.6}
                        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                    />
                </div>

                <div className="z-10 text-center !px-4 md:!px-6 max-w-5xl mx-auto flex flex-col items-center">
                    <h1 ref={titleRef} className="font-bold !text-[#2197a1] md:!mb-6 drop-shadow-md text-4xl lg:text-5xl perspective-1000">
                        {titleText.split(" ").map((word, wordIndex) => (
                            <span key={wordIndex} className="word inline-block whitespace-nowrap">
                                {word.split("").map((char, charIndex) => (
                                    <span
                                        key={charIndex}
                                        className="char inline-block"
                                    >
                                        {char}
                                    </span>
                                ))}
                                {wordIndex < titleText.split(" ").length - 1 && (
                                    <span className="inline-block">&nbsp;</span>
                                )}
                            </span>
                        ))}
                    </h1>
                    <p ref={paraRef} className="text-white/80 md:!mb-4 max-w-2xl drop-shadow text-lg md:text-xl font-medium">
                        {paraText.split(" ").map((word, wordIndex) => (
                            <span key={wordIndex} className="para-word inline-block">
                                {word}{wordIndex < paraText.split(" ").length - 1 ? "\u00A0" : ""}
                            </span>
                        ))}
                    </p>
                    <p ref={smallLineRef} className="text-white/60 md:!mb-8 max-w-xl drop-shadow text-sm md:text-base italic">
                        {smallLineText.split(" ").map((word, wordIndex) => (
                            <span key={wordIndex} className="para-word inline-block">
                                {word}{wordIndex < smallLineText.split(" ").length - 1 ? "\u00A0" : ""}
                            </span>
                        ))}
                    </p>
                    <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-0 lg:gap-4">
                        <Button
                            href="/contact"
                            className="hero-btn"
                        >
                            <span>Get Content Consultation</span>
                            <ArrowRight size={16} className="md:w-[22px] md:h-[22px]" />
                        </Button>
                    </div>
                </div>

                {/* Wavy/Dripping Bottom Border */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px]">
                    {/* Desktop Wavy Border */}
                    <svg
                        className="hidden md:block relative block w-[calc(100%+1.3px)] h-[120px]"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0,120V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.4,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"
                            className="fill-white/10"
                            opacity="0.3"
                        ></path>
                        <path
                            d="M0,120V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.94,9.42,105.9,20.44,59.26,18.68,113.55,43.37,172.55,59.22,44,11.82,102.62,14.07,131.73-24.57s11.53-73.69,11.53-73.69V120H0Z"
                            className="fill-white/20"
                            opacity="0.5"
                        ></path>
                        <path
                            d="M0,120V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V120H0Z"
                            className="fill-white"
                        ></path>
                    </svg>

                    {/* Mobile Wavy Border - Aspect Ratio Preserved */}
                    <svg
                        className="block md:hidden relative block w-[calc(100%+1.3px)] h-[80px]"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="xMidYMax slice"
                    >
                        <path
                            d="M0,120V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.4,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"
                            className="fill-white/10"
                            opacity="0.3"
                        ></path>
                        <path
                            d="M0,120V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.94,9.42,105.9,20.44,59.26,18.68,113.55,43.37,172.55,59.22,44,11.82,102.62,14.07,131.73-24.57s11.53-73.69,11.53-73.69V120H0Z"
                            className="fill-white/20"
                            opacity="0.5"
                        ></path>
                        <path
                            d="M0,120V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V120H0Z"
                            className="fill-white"
                        ></path>
                    </svg>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `@keyframes dash { to { stroke-dashoffset: -1000; } }`
            }} />

            {/* Why Video & Content Matter Section */}
            <section ref={introSectionRef} className="w-full bg-white !py-4 md:!py-24 !px-6 overflow-hidden">
                <div className="max-w-7xl !mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
                    {/* Left Side: Visual */}
                    <div ref={introVisualRef} className="hidden md:block w-full md:w-1/2 relative h-[300px] md:h-[450px]">
                        <div className="absolute inset-x-0 bottom-0 top-10 bg-gradient-to-t from-[#e76038] to-transparent rounded-[4rem] blur-[80px] opacity-10 pointer-events-none"></div>
                        <NextImage
                            src="/brain/47a2892c-4fc3-4a46-8966-688ff5c9cd1e/content_creation_intro_visual_1777539835623.png"
                            alt="Why Video & Content Matter"
                            fill
                            className="object-cover rounded-[3rem] shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    {/* Right Side: Content */}
                    <div ref={introContentRef} className="w-full md:w-1/2 space-y-6 text-left">
                        <span className="text-[#2197A1] font-black uppercase tracking-widest text-xs !mb-3 block">Engagement First</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#2A2A2A] !mb-3 leading-tight">
                            Why Video & <br /><span className="text-[#2197A1]">Content Matter</span>
                        </h2>
                        <div className="w-12 h-1.5 bg-[#e76038] !mb-8 rounded-full shadow-sm shadow-[#e76038]/30"></div>

                        {/* Mobile Image - Only shown on mobile between Title and Description */}
                        <div className="block md:hidden w-full relative h-[250px] !mb-8">
                            <div className="absolute inset-x-0 bottom-0 top-10 bg-gradient-to-t from-[#e76038] to-transparent rounded-[2rem] blur-[60px] opacity-10 pointer-events-none"></div>
                            <NextImage
                                src="/brain/47a2892c-4fc3-4a46-8966-688ff5c9cd1e/content_creation_intro_visual_1777539835623.png"
                                alt="Why Video & Content Matter"
                                fill
                                className="object-cover rounded-[2rem] shadow-xl border-2 border-white"
                            />
                        </div>
                        <div className="space-y-6 text-lg md:text-xl text-[#2A2A2A]/70 leading-relaxed font-medium">
                            <p>
                                Today, people spend more time on platforms like <span className="font-bold">Instagram and YouTube</span>, which is why <span className="font-bold">video marketing and engaging content</span> are very important for any business. Good content helps your business <span className="font-bold">get more attention online</span>, <span className="font-bold">connect with your target audience</span>, and <span className="font-bold">build trust and brand awareness</span>.
                            </p>
                            <p>
                                At <span className="font-bold">Prodbiz Solutions</span>, we create <span className="font-bold">simple, creative, and engaging videos and content</span> that help your business grow. Our content is designed to <span className="font-bold">increase your online visibility</span>, <span className="font-bold">reach more potential customers</span>, <span className="font-bold">improve your social media presence</span>, and <span className="font-bold">support your business growth</span> through effective content marketing strategies.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Do for Your Content - Premium 3D Pedestal Version */}
            <section ref={offerSectionRef} className="relative w-full bg-white !pt-15 md:!pt-20 !px-0 overflow-hidden">
                {/* Background Glassmorphism Blobs */}
                {/* <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-[#2197A1]/20 rounded-full blur-[140px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-[#2197A1]/10 rounded-full blur-[140px] pointer-events-none"></div> */}

                {/* Decorative Grid Overlay */}
                <div className="absolute inset-0 md:bg-[url('/grid.svg')] md:bg-center md:[mask-image:radial-gradient(black,transparent_85%)] opacity-[0.03] invert pointer-events-none"></div>

                <div className="relative z-10 !mx-auto">
                    <div ref={offerHeaderRef} className="text-center !mb-1 md:!mb-24">
                        <span className="text-[#2197A1] font-black uppercase tracking-widest text-xs !mb-1 md:!mb-3 block">Creative Production</span>
                        <h2 className="text-4xl md:text-5xl font-black !text-[#1E293B] !mb-2 md:!mb-4 leading-tight tracking-tighter">
                            What We Do for <span className="text-[#2197A1]">Your Content</span>
                        </h2>
                        <div className="w-24 h-1.5 bg-[#e76038] !mx-auto rounded-full shadow-[0_0_20px_rgba(33,151,161,0.5)]"></div>
                    </div>

                    <div ref={offerCardsRef} className="hidden md:flex flex-wrap justify-center items-start gap-x-12 gap-y-24">
                        {contentServicesData.map((service, index) => (
                            <div
                                key={index}
                                className="relative w-full sm:w-[300px] lg:w-[calc(30%-1rem)] flex flex-col items-center group"
                            >
                                {/* Floating Icon Sphere */}
                                <div className="relative z-20 !mb-[-35px] animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#2197A1]/5 backdrop-blur-md border-[1.5px] border-[#2197A1] flex items-center justify-center text-[#2197A1] shadow-[0_0_30px_rgba(33,151,161,0.2)] transition-all duration-700 group-hover:scale-105">
                                        <div className="absolute inset-[4px] rounded-full border border-[#2197A1]/30"></div>
                                        <div className="transform transition-transform duration-700 group-hover:scale-110">
                                            {service.icon}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#e76038]/20 blur-lg rounded-full"></div>
                                </div>

                                {/* 3D Podium/Pedestal */}
                                <div className="relative w-48 md:w-56 h-20 !mb-10 transition-transform duration-700 group-hover:scale-105">
                                    {/* Side Body */}
                                    <div className="absolute top-5 left-0 w-full h-12 bg-gradient-to-r from-[#EEF2F6] via-[#2197A1]/20 to-[#EEF2F6] rounded-b-[40%] z-0 border-x border-b border-[#2197A1]/20 shadow-[0_20px_40px_rgba(33,151,161,0.15)]"></div>
                                    {/* Top Surface */}
                                    <div className="absolute top-0 left-0 w-full h-9 bg-gradient-to-b from-[#2a9da6] to-[#2197A1] rounded-[100%] z-10 border border-white/40">
                                        <div className="absolute top-1 left-6 w-[calc(100%-48px)] h-2 bg-white/40 rounded-full blur-sm"></div>
                                    </div>
                                    {/* Shadow for Sphere */}
                                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#1E293B]/20 rounded-full z-10 blur-md"></div>
                                </div>

                                {/* Content Details */}
                                <div className="text-center space-y-4 px-2 relative z-20">
                                    <h3 className="text-xl md:text-2xl font-bold !text-[#1E293B] uppercase tracking-wider transition-all group-hover:text-[#2197A1]">{service.title}</h3>
                                    <p className="text-[#64748B] text-[13px] font-medium leading-relaxed max-w-[180px] !mx-auto group-hover:text-[#475569] transition-colors italic">
                                        {service.desc}
                                    </p>
                                </div>

                                {/* Row-Based Connection Lines */}
                                {index !== 2 && index !== 4 && (
                                    <div className="hidden lg:block absolute top-[40%] left-[80%] w-[40%] h-[1px] bg-gradient-to-r from-[#2197A1]/30 to-transparent pointer-events-none z-0"></div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div ref={mobileOfferCardsRef}>
                        <MobileServiceCarousel items={contentServicesData} />
                    </div>
                </div>

                <style jsx>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-15px); }
                    }
                    .animate-float {
                        animation: float 4s ease-in-out infinite;
                    }
                `}</style>
            </section>

            {/* Our Creative Work Section - Circular Gallery Version */}
            <section ref={portfolioSectionRef} className="w-full bg-[#fff] overflow-hidden !py-24 md:!pt-48">
                <div className="max-w-7xl !mx-auto !px-6">
                    <div ref={portfolioHeaderRef} className="text-center !mb-16 md:!mb-0">
                        <span className="text-[#2197A1] font-black uppercase tracking-widest text-xs !mb-3 block">Portfolio</span>
                        <h2 className="text-4xl md:text-6xl font-black text-[#2A2A2A] !mb-2 md:!mb-6 leading-tight">
                            Our <span className="text-[#2197A1]">Creative Work</span>
                        </h2>
                        <div className="w-24 h-1.5 bg-[#e76038] !mx-auto rounded-full shadow-[0_0_15px_rgba(231,96,56,0.4)]"></div>
                    </div>
                </div>

                {/* Circular Gallery Container */}
                <div className="hidden md:block relative top-[-100px] w-full h-[750px] cursor-grab active:cursor-grabbing">
                    <CircularGallery
                        items={portfolioItems.map(item => ({ image: item.image, text: item.title }))}
                        bend={3}
                        textColor="#ffffff"
                        borderRadius={0.05}
                        scrollEase={0.02}
                        scrollSpeed={2}
                    />

                    {/* Floating Glows for Depth */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-[#2197A1]/10 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] bg-[#2197A1]/10 rounded-full blur-[100px] pointer-events-none"></div>
                </div>

                <div className="md:hidden block relative w-full h-[600px] top-[-30px]">
                    <DomeGallery
                        images={portfolioItems}
                        fit={0.8}
                        minRadius={600}
                        maxVerticalRotationDeg={0}
                        segments={34}
                        dragDampening={2}
                        grayscale={false}
                    />
                </div>
            </section>

            {/* Why Choose Us Infographic Section */}
            <section ref={whyChooseUsSectionRef} className="relative bg-[#fff] w-full md:!pt-0 md:!pb-32 !px-4 md:!px-6 min-[1150px]:max-[1299px]:!px-2 overflow-hidden">
                {/* Subtle Background Glows
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2197A1]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2197A1]/3 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div> */}

                <div className="md:max-w-7xl !mx-auto relative z-10">
                    <div ref={whyChooseUsHeaderRef} className="text-center md:!mb-16">
                        <span className="text-[#2197A1] font-black uppercase tracking-widest text-xs !mb-3 block">Why Choose Us</span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#2A2A2A] !mb-2 md:!mb-4 leading-tight">
                            Why Choose Prodbiz for <br /><span className="text-[#2197A1]">Content & Video</span>
                        </h2>
                        <div className="w-24 h-1 bg-[#e76038] !mx-auto !mb-0 md:!mb-4 rounded-full shadow-[0_0_15px_rgba(33,151,161,0.3)]"></div>
                        <p className="text-[#2A2A2A]/70 max-w-4xl !mx-auto text-lg leading-relaxed !mt-4 md:!mt-10 font-medium">
                            We create creative and high-quality content that helps your brand stand out and grow engagement.
                        </p>
                    </div>

                    <div ref={whyChooseUsCardsRef} className="hidden md:grid grid-cols-1 md:grid-cols-2 min-[1150px]:!grid-cols-4 xl:!grid-cols-4 gap-12 gap-y-16 min-[1150px]:max-[1299px]:!gap-4 lg:gap-8 justify-items-center" style={{ perspective: "1500px" }}>
                        {whyChooseUsData.map((item, index) => (
                            <div key={index} className="group relative w-full max-w-[310px] aspect-square rounded-full flex flex-col items-center justify-center text-center cursor-default transition-all duration-700 transform-gpu hover:[transform:rotateX(10deg)rotateY(10deg)translateZ(30px)] shadow-lg hover:shadow-2xl">

                                {/* Inner Clipped Container for Background and Right Shape */}
                                <div className="absolute inset-0 rounded-full overflow-hidden z-0 bg-white border border-[#2197A1]/10 shadow-inner">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#2197A1]/5 via-transparent to-transparent opacity-100"></div>

                                    {/* The Badge perfectly clipped on the right */}
                                    <div className="absolute top-1/2 right-0 translate-x-[35%] -translate-y-1/2 w-[110px] h-[110px] bg-[#2197A1] transition-all duration-500 rounded-full flex items-center justify-start pl-6 shadow-lg">
                                        <span className="text-white font-black !pl-5 !text-xl transform -translate-y-[2px]">0{index + 1}</span>
                                    </div>

                                </div>

                                {/* The outer SVG arc and dots perfectly wrapping the right side */}
                                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none drop-shadow-[0_0_4px_rgba(33,151,161,0.2)] text-[#2197A1]" viewBox="-2 -2 104 104">
                                    {/* Sweeps from top-center (50,0) down the right side to bottom-center (50,100) */}
                                    <path
                                        d="M 50 0 A 50 50 0 0 1 50 100"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        className="transition-colors duration-500"
                                    />
                                    {/* Top Dot */}
                                    <circle cx="50" cy="0" r="2.5" fill="currentColor" />
                                    {/* Bottom Dot */}
                                    <circle cx="50" cy="100" r="2.5" fill="currentColor" />
                                </svg>

                                {/* Main Content */}
                                <div className="relative !left-[-25px] !w-[200px] z-20 flex flex-col items-center pt-2 pl-1 pr-14 text-center">
                                    <div className="text-[#2197A1] transition-colors duration-500 !mb-4 transform group-hover:scale-110 drop-shadow-sm">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-[#2A2A2A] font-bold !text-[14px] md:text-xs uppercase tracking-widest mb-3 leading-snug">
                                        {item.title}
                                    </h3>
                                    <p className="text-[#2A2A2A]/60 !text-[13px] leading-[1.6] line-clamp-4 font-medium">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div ref={mobileWhyChooseUsRef}>
                        <MobileInfographicCarousel items={whyChooseUsData} />
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <FinalCTA />
        </main>
    );
}
