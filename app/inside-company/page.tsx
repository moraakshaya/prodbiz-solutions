"use client";

import React, { useState, useRef } from "react";
import { PlayCircle, X, Image as ImageIcon, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import FinalCTA from "@/components/FinalCTA";
import Button from "@/components/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const tabs = [
    { id: "Photo Gallery", label: "Photo Gallery", icon: ImageIcon },
    { id: "Events & Activities", label: "Events & Activities", icon: Calendar },
    { id: "Video Section", label: "Video Section", icon: PlayCircle },
];

const galleryImages = [
    {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
        title: "Office Workspace",
        description: "Our modern, high-tech office workspace.",
    },
    {
        url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
        title: "Team Meeting",
        description: "Brainstorming and collaborative decision making.",
    },
    {
        url: "https://images.unsplash.com/photo-1522071823991-b99772a6998c?auto=format&fit=crop&q=80",
        title: "Collaboration Session",
        description: "Developers working together on innovative solutions.",
    },
    {
        url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
        title: "Project Discussion",
        description: "Deep diving into project requirements and UI/UX.",
    },
    {
        url: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80",
        title: "Work Environment",
        description: "A look into our vibrant, open-plan office.",
    },
    {
        url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
        title: "Tech Culture",
        description: "Our team sharing ideas over coffee.",
    },
    {
        url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80",
        title: "Design Studio",
        description: "Where creative concepts come to life.",
    },
    {
        url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80",
        title: "Team Spirit",
        description: "Stronger together, aiming for excellence.",
    }
];

const eventImages = [
    {
        url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80",
        title: "Team Outings",
        description: "Building bonds beyond the office walls."
    },
    {
        url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80",
        title: "Company Celebrations",
        description: "Celebrating our wins and milestones together."
    },
    {
        url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80",
        title: "Workshops",
        description: "Interactive sessions to sharpen our creative skills."
    },
    {
        url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80",
        title: "Training Sessions",
        description: "Continuous learning and professional growth."
    },
    {
        url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80",
        title: "Festivals",
        description: "Bringing cultural vibrancy to our workspace."
    },
    {
        url: "https://images.unsplash.com/photo-1528605248644-14dd04cb11c7?auto=format&fit=crop&q=80",
        title: "Team Lunch",
        description: "Sharing moments and flavors as one team."
    }
];

const videoData = [
    {
        url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80",
        title: "Office Walkthrough",
        description: "A quick tour of our creative workspace."
    },
    {
        url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80",
        title: "Team Event Highlights",
        description: "Capturing the energy of our latest team outing."
    },
    {
        url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80",
        title: "Workshop Recordings",
        description: "Knowledge sharing and brainstorming sessions."
    },
    {
        url: "https://images.unsplash.com/photo-1504384308090-c89e124d6d5b?auto=format&fit=crop&q=80",
        title: "Project Launch Moments",
        description: "The excitement behind our latest releases."
    },
    {
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
        title: "Internal Tech Talks",
        description: "Diving deep into our development stack."
    },
    {
        url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80",
        title: "Behind the Screens",
        description: "The real magic happening at every desk."
    }
];

export default function InsideCompanyPage() {
    const scrollToContent = () => {
        const element = document.getElementById("inside-content-section");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const [selectedImage, setSelectedImage] = useState<null | { url: string, title: string }>(null);
    const [mounted, setMounted] = React.useState(false);

    const h1Ref = React.useRef<HTMLHeadingElement>(null);
    const spanRef = React.useRef<HTMLSpanElement>(null);
    const paraRef = React.useRef<HTMLDivElement>(null);
    const buttonsRef = React.useRef<HTMLDivElement>(null);
    const heroImageRef = React.useRef<HTMLDivElement>(null);

    const galleryRef = useRef<HTMLDivElement>(null);
    const eventRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Header Animations
    const galleryTitleRef = useRef<HTMLHeadingElement>(null);
    const galleryParaRef = useRef<HTMLParagraphElement>(null);
    const eventTitleRef = useRef<HTMLHeadingElement>(null);
    const eventParaRef = useRef<HTMLParagraphElement>(null);
    const videoTitleRef = useRef<HTMLHeadingElement>(null);
    const videoParaRef = useRef<HTMLParagraphElement>(null);

    React.useEffect(() => {
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
                0.2 // Starts at 0.2s absolute
            );

            // 2. Paragraph (Line-by-line soft fade + slight upward)
            tl.fromTo(
                splitParas.lines,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
                "-=0.6" // Starts 0.6s before H1 completes
            );

            // 3. Buttons (Subtle fade + stagger)
            tl.fromTo(
                buttonsRef.current.children,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
                "-=0.4" // Starts 0.4s before paragraph completes
            );

            // 4. Hero Image (Slide from right + slight scale)
            tl.fromTo(
                ".hero-image-animate",
                { x: 100, scale: 0.9, opacity: 0 },
                { x: 0, scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
                1.0 // Standard timing
            );

            // 5. Floating Animation loops after the entrance
            gsap.to(".hero-image-animate", {
                y: -15,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                delay: 2.2
            });

            // Slot-machine roll for "Prodbiz"
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

    useGSAP(() => {
        if (contentRef.current) {
            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            );
        }

        if (activeTab === "Photo Gallery" && galleryRef.current) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: galleryRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });

            if (galleryTitleRef.current && galleryParaRef.current) {
                tl.fromTo(galleryTitleRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
                ).fromTo(galleryParaRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                    "-=0.4"
                );
            }

            const items = galleryRef.current.querySelectorAll(".gallery-item");
            tl.fromTo(items,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out"
                },
                "-=0.2"
            );
        }

        if (activeTab === "Events & Activities" && eventRef.current) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: eventRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });

            if (eventTitleRef.current && eventParaRef.current) {
                tl.fromTo(eventTitleRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
                ).fromTo(eventParaRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                    "-=0.4"
                );
            }

            const items = eventRef.current.querySelectorAll(".event-item");
            tl.fromTo(items,
                {
                    opacity: 0,
                    scale: 0.5,
                    y: -40,
                    transformOrigin: "top center"
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.2,
                    ease: "back.out(1.2)",
                },
                "-=0.2"
            );
        }

        if (activeTab === "Video Section" && videoRef.current) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: videoRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });

            if (videoTitleRef.current && videoParaRef.current) {
                tl.fromTo(videoTitleRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
                ).fromTo(videoParaRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                    "-=0.4"
                );
            }

            const items = videoRef.current.querySelectorAll(".video-item");
            tl.fromTo(items,
                {
                    opacity: 0,
                    scale: 0.5,
                    y: -40,
                    transformOrigin: "top center"
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.2,
                    ease: "back.out(1.2)",
                },
                "-=0.2"
            );
        }
    }, [activeTab]);

    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            {/* Inside Prodbiz Hero Section */}
            <section
                className="relative w-full min-h-[75vh] min-[340px]:min-h-[60vh] min-[360px]:min-h-[75vh] min-[380px]:min-h-[60vh] min-[400px]:min-h-[58vh] min-[540px]:min-h-[68vh] min-[760px]:min-h-[66vh] min-[1024px]:min-h-screen flex items-center overflow-hidden"
                style={{ background: "radial-gradient(circle at top, #FFFFFF 0%, #2197A1 100%)" }}
            >
                {/* Content Container */}
                <div className="z-10 w-full max-w-7xl !mx-auto flex md:flex-row flex-col items-center !px-4 md:!px-2 !pt-10 md:!pt-10 gap-1 md:gap-1">
 
                    {/* Hero Content Wrapper */}
                    <div className="w-full md:w-[70%] flex flex-col items-center md:items-start translate-y-[-20px] md:pr-0">
                        {/* Title: Centered on Mobile */}
                        <h1 ref={h1Ref} className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[#2A2A2A] !mb-2 md:mb-6 leading-tight break-words text-center md:text-left w-full" style={{ perspective: "1000px" }}>
                            Inside <span ref={spanRef} className="text-[#2197A1] inline-block origin-center transform-style-3d">Prodbiz</span>
                        </h1>

                        <div ref={paraRef} className="w-full flex flex-col md:block">
                            {/* Short mobile content: Centered as requested */}
                            <p className="block md:hidden text-base sm:text-base text-[#2A2A2A]/80 font-medium leading-snug text-center !mb-0">
                                Explore the moments that define Prodbiz — from team collaborations to project milestones.
                            </p>

                            {/* Desktop long content */}
                            <div className="hidden md:block">
                                <p className="text-lg md:text-xl text-[#2A2A2A]/80 font-medium leading-relaxed max-w-3xl mb-1 md:mb-8">
                                    At Prodbiz, we believe in transparency and the power of team culture.
                                    Explore the moments that truly define us — from intense team collaborations and
                                    major project milestones to our vibrant internal events and celebrations.
                                    This is a small glimpse into the dedicated people, the collaborative
                                    culture, and the unique, shared experiences that form the foundation
                                    behind every single piece of work we deliver to our clients worldwide.
                                </p>
                            </div>
                        </div>

                        {/* Mobile Image: Rendered below content on mobile */}
                        <div className="md:hidden w-full flex justify-center !mt-4 !mb-0 h-[180px] relative hero-image-animate">
                             {/* Ambient Glow */} 
                             <div className="absolute inset-x-0 bottom-0 top-10 bg-gradient-to-t from-[#2197A1] to-transparent rounded-[4rem] blur-[60px] opacity-20 pointer-events-none"></div>
                            <Image
                                src="/images/inside-pb-hero.png"
                                alt="Inside Prodbiz"
                                fill
                                className="object-contain drop-shadow-xl scale-150 transition-transform duration-700 !mt-2"
                                priority
                            />
                        </div>
                        {/* Button: Centered on Mobile */}
                        <div ref={buttonsRef} className="w-full flex justify-center md:justify-start">
                            <Button
                                onClick={scrollToContent}
                                className="inline-flex items-center gap-2 md:gap-3 bg-[#e76038] !text-white !px-6 md:!px-6 !py-3 md:!py-3 rounded-xl md:rounded-3xl font-bold text-lg md:text-lg hover:bg-[#e76038]/90 transition-all transform hover:scale-100 active:scale-95 shadow-md md:shadow-2xl relative z-10"
                            >
                                <span>See Our Culture</span>
                                <ArrowRight size={16} className="md:w-[22px] md:h-[22px]" />
                            </Button>
                        </div>
                    </div>

                    {/* Desktop Image Section - Hidden on Mobile */}
                    <div className="hidden md:flex w-[100%] md:w-[40%] justify-center items-center h-full min-h-[300px] md:min-h-[400px] relative hero-image-animate">
                        <Image
                            src="/images/inside-pb-hero.png"
                            alt="Inside Prodbiz"
                            width={500}
                            height={500}
                            priority
                            className="w-full h-auto object-contain drop-shadow-xl md:scale-125"
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

            {/* Tab Section - Redesigned like image */}
            <div className="w-full md:max-w-5xl mx-auto !mt-5 md:!mt-10 !mb-10 md:!px-12 !px-4 z-20">
                <div className="bg-[#f0f9fa] rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.18)] flex items-center justify-between px-8 md:px-16 py-4 overflow-x-hidden overflow-y-hidden no-scrollbar">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className="flex flex-col items-center  w-full !py-1 !gap-2 transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                <Icon
                                    size={24}
                                    className={`${isActive ? "text-[#e76038]" : "text-gray-400"} transition-colors`}
                                />
                                <span
                                    className={`text-[10px] md:text-sm font-semibold tracking-wide whitespace-nowrap ${isActive ? "text-[#e76038]" : "text-gray-500"} transition-colors`}
                                >
                                    {tab.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content Section */}
            <section id="inside-content-section" className="w-full max-w-7xl mx-auto px-6 !pb-0 flex flex-col items-center overflow-hidden">
                <div ref={contentRef} className="w-full">
                    {activeTab === "Photo Gallery" ? (
                        <div className="w-full flex flex-col items-center gap-12 !px-4 !py-6">
                            {/* 10% Text Section (Refactored to Header) */}
                            <div className="w-full text-center flex flex-col items-center">
                                <h2 ref={galleryTitleRef} className="text-4xl font-bold text-[#2A2A2A] leading-tight">
                                    Life at <span className="text-[#2197A1]">Prodbiz</span>
                                </h2>
                                <p ref={galleryParaRef} className="text-gray-500 text-base font-medium leading-relaxed max-w-2xl mt-4">
                                    A look into our everyday workspace, team collaborations, and the environment where ideas turn into innovative digital solutions.
                                </p>
                            </div>

                            {/* 90% Image Grid (Masonry) */}
                            <div
                                ref={galleryRef}
                                className="w-full columns-1 md:columns-2 lg:columns-3 gap-6 !space-y-6"
                            >
                                {galleryImages.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="gallery-item relative overflow-hidden rounded-3xl cursor-pointer group break-inside-avoid shadow-lg transition-transform duration-300 hover:shadow-2xl"
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-10" />
                                        <img
                                            src={img.url}
                                            alt={img.title}
                                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute w-full bg-black/30 !p-2 bottom-0 left-0 right-0 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                            <p className="text-white font-bold !mb-1 text-lg text-center">{img.title}</p>
                                            <p className="text-white/80 font-medium text-sm text-center">{img.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="w-full min-h-[400px]">
                            {activeTab === "Events & Activities" && (
                                <div className="w-full flex flex-col items-center gap-12 !px-4 !py-6">
                                    {/* Centered Header Section */}
                                    <div className="w-full text-center flex flex-col items-center">
                                        <h2 ref={eventTitleRef} className="text-4xl font-bold text-[#2A2A2A] leading-tight">
                                            Events & <span className="text-[#2197A1]">Celebrations</span>
                                        </h2>
                                        <p ref={eventParaRef} className="text-gray-500 font-medium text-base leading-relaxed max-w-2xl mt-4">
                                            At Prodbiz, we celebrate achievements, milestones, and moments that bring our team together. These events strengthen our team spirit and create memorable experiences.
                                        </p>
                                    </div>

                                    {/* 3-Column Image Grid */}
                                    <div
                                        ref={eventRef}
                                        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                    >
                                        {eventImages.map((img, idx) => (
                                            <div
                                                key={idx}
                                                className="event-item relative overflow-hidden rounded-[2.5rem] cursor-pointer group shadow-lg transition-all duration-300 hover:shadow-2xl aspect-[4/3]"
                                                onClick={() => setSelectedImage(img)}
                                            >
                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10" />
                                                <img
                                                    src={img.url}
                                                    alt={img.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                    <p className="text-white font-bold text-2xl mb-2 text-center">{img.title}</p>
                                                    <p className="text-white/90 font-medium text-sm text-center">{img.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {activeTab === "Video Section" && (
                                <div className="w-full flex flex-col items-center gap-12 !px-4 !py-6">
                                    {/* Centered Header Section */}
                                    <div className="w-full text-center flex flex-col items-center">
                                        <h2 ref={videoTitleRef} className="text-4xl font-bold text-[#2A2A2A] leading-tight">
                                            Prodbiz in <span className="text-[#2197A1]">Action</span>
                                        </h2>
                                        <p ref={videoParaRef} className="text-gray-500 text-base font-medium leading-relaxed max-w-2xl mt-4">
                                            Short clips capturing team activities, office culture, and highlights from events. Experience the energy and innovation of Prodbiz in motion.
                                        </p>
                                    </div>

                                    {/* 3-Column Video Grid */}
                                    <div
                                        ref={videoRef}
                                        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                    >
                                        {videoData.map((vid, idx) => (
                                            <div
                                                key={idx}
                                                className="video-item relative overflow-hidden rounded-[2.5rem] cursor-pointer group shadow-lg transition-all duration-300 hover:shadow-2xl aspect-video"
                                                onClick={() => setSelectedImage(vid)}
                                            >
                                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 z-10" />
                                                <img
                                                    src={vid.url}
                                                    alt={vid.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />

                                                {/* Play Icon Overlay */}
                                                <div className="absolute inset-0 z-20 flex items-center justify-center">
                                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transform transition-transform duration-500 group-hover:scale-125">
                                                        <PlayCircle className="text-white w-10 h-10 fill-white/20" />
                                                    </div>
                                                </div>

                                                <div className="absolute inset-x-0 bottom-0 z-30 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                    <p className="text-white font-bold text-xl !mb-1 text-center">{vid.title}</p>
                                                    <p className="text-white/80 font-medium text-xs text-center">{vid.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox Overlay */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl transition-all duration-300 p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X size={40} />
                    </button>
                    <div
                        className="absolute -top-[10%] md:top-[0%] left-[0%] max-w-6xl w-fit max-h-[85vh] relative flex flex-col items-center !px-4 md:!px-0"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage.url}
                            alt={selectedImage.title}
                            className="max-w-full max-h-[50vh] object-contain rounded-2xl shadow-2xl transition-all duration-500"
                            style={{ animation: "lightbox-in 0.5s ease-out" }}
                        />
                        <div className="text-center !text-white">
                            <h4 className="text-2xl font-bold !mt-6 !text-[#fff]">{selectedImage.title}</h4>
                        </div>
                    </div>
                </div>
            )}
            <style jsx global>{`
                @keyframes lightbox-in {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>

            {/* Final CTA Section */}
            <FinalCTA />
        </main>
    );
}
