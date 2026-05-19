"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Image as ImageIcon, Calendar, ArrowRight } from "lucide-react";
import FinalCTA from "@/components/FinalCTA";
import Button from "@/components/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import dynamic from "next/dynamic";

const WhoWeAreHero3D = dynamic(() => import("@/components/WhoWeAreHero3D"), { ssr: false });
import GalleryHeroAnimation from "@/components/GalleryHeroAnimation";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}


const galleryImages = [
    {
        url: "/images/gallery/1st-aniversary-img-01.webp",
        title: "1st Anniversary",
        description: "Celebrating 365 days of innovation, growth, and digital excellence."
    },
    {
        url: "/images/gallery/1st-aniversary-img-04.webp",
        title: "1st Anniversary",
        description: "A milestone moment marking a year of transforming visions into reality."
    },
    {
        url: "/images/gallery/1st-aniversary-img-05.webp",
        title: "1st Anniversary",
        description: "Our dedicated team coming together to honor our first year of success."
    },
    {
        url: "/images/gallery/1st-aniversary-img-07.webp",
        title: "1st Anniversary",
        description: "Reflecting on a year of hard work, creativity, and outstanding achievements."
    },
    {
        url: "/images/gallery/1st-aniversary-img-08.webp",
        title: "1st Anniversary",
        description: "Cheers to the first of many successful years as your innovation partner."
    },
    {
        url: "/images/gallery/1st-aniversary-img-02.webp",
        title: "1st Anniversary",
        description: "Capturing the joy and collective energy of our incredible first-year journey."
    },
    {
        url: "/images/gallery/1st-aniversary-img-03.webp",
        title: "1st Anniversary",
        description: "Honoring the dedication that made our first year extraordinary."
    },
    {
        url: "/images/gallery/1st-aniversary-img-06.webp",
        title: "1st Anniversary",
        description: "A night of gratitude and celebration for our partners and patrons."
    },
    {
        url: "/images/gallery/chirstmas-img-01.webp",
        title: "Christmas Celebration",
        description: "Spreading festive cheer and holiday magic across our office space."
    },
    {
        url: "/images/gallery/chirstmas-img-02.webp",
        title: "Christmas Celebration",
        description: "Secret Santa surprises and warm smiles during our holiday gathering."
    },
    {
        url: "/images/gallery/chirstmas-img-03.webp",
        title: "Christmas Celebration",
        description: "Ending the year with gratitude and festive team bonding moments."
    }
];



export default function InsideCompanyPage() {
    const scrollToContent = () => {
        const element = document.getElementById("inside-content-section");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
    const [selectedImage, setSelectedImage] = useState<null | { url: string, title: string }>(null);
    const [mounted, setMounted] = useState(false);
    const allImages = [...galleryImages];

    const h1Ref = useRef<HTMLHeadingElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const paraRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    const galleryRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Header Animations
    const galleryTitleRef = useRef<HTMLHeadingElement>(null);
    const galleryParaRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
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
        if (!mounted) return;

        if (contentRef.current) {
            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: contentRef.current, start: "top 90%" } }
            );
        }

        if (galleryRef.current) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: galleryRef.current,
                    start: "top 80%",
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
                    stagger: 0.05,
                    ease: "power2.out"
                },
                "-=0.2"
            );
        }
    }, [mounted]);

    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            {/* Gallery Hero Section */}
            <section
                className="hero-section-standard"
            >
                {/* ── 3D Glassmorphism Background ── */}
                <WhoWeAreHero3D />
                
                {/* Mobile Gallery Animation (Centered Background) */}
                <div className="block md:hidden absolute inset-0 z-0 opacity-40 flex items-center justify-center h-full">
                    <GalleryHeroAnimation />
                </div>

                {/* Gradient overlay: ensures left-side text stays readable */}
                <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: "linear-gradient(105deg, rgba(3,14,18,0.72) 0%, rgba(3,14,18,0.45) 50%, transparent 100%)" }} />
                
                {/* Content Container */}
                <div className="relative z-10 w-full max-w-7xl !mx-auto flex md:flex-row flex-col items-center !px-4 md:!px-2 !pt-10 md:!pt-10 gap-8 md:gap-1">
  
                    {/* Hero Content Wrapper */}
                    <div className="w-full md:w-[60%] flex flex-col items-center md:items-start translate-y-[-20px] !mt-20 md:pr-8 md:!pl-8">
                        {/* Title: Centered on Mobile */}
                        <h1 ref={h1Ref} className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-bold !text-white !mb-2 md:mb-6 leading-tight break-words text-center md:text-left w-full drop-shadow-lg" style={{ perspective: "1000px" }}>
                            Inside <span ref={spanRef} className="text-[#2197A1] inline-block origin-center transform-style-3d" style={{ textShadow: "0 0 30px rgba(33,151,161,0.6)" }}>Prodbiz</span>
                        </h1>
 
                        <div ref={paraRef} className="w-full flex flex-col md:block">
                            {/* Short mobile content */}
                            <p className="block md:hidden text-base sm:text-base text-white/80 font-medium leading-relaxed text-center mb-8">
                                Explore the moments that define Prodbiz — from team collaborations to project milestones.
                            </p>
 
                            {/* Desktop content */}
                            <div className="hidden md:block space-y-4 max-w-3xl mb-1 md:mb-8">
                                <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed">
                                    At Prodbiz, we believe in transparency and the power of team culture. Explore the moments that define us — from intense collaborations to vibrant internal celebrations.
                                </p>
                            </div>
                        </div>
 
                        {/* Button: Centered on Mobile */}
                        <div ref={buttonsRef} className="w-full flex justify-center md:justify-start !mt-2">
                            <Button
                                onClick={scrollToContent}
                                className="hero-btn"
                            >
                                <span>See Our Culture</span>
                                <ArrowRight size={16} className="md:w-[22px] md:h-[22px]" />
                            </Button>
                        </div>
                    </div>
 
                    {/* Desktop Right Side: Rotating Gallery Hero Animation */}
                    <div className="hidden md:flex w-[40%] justify-center items-center h-full">
                        <GalleryHeroAnimation />
                    </div>
                </div>
            </section>


            {/* Content Section */}
            <section id="inside-content-section" className="w-full max-w-7xl mx-auto px-6 !pb-24 flex flex-col items-center overflow-hidden !mt-16 md:!mt-24">
                <div ref={contentRef} className="w-full">
                    
                    {/* Unified Gallery Section */}
                    <div className="w-full flex flex-col items-center gap-12 !px-4 !py-6">
                        {/* Header Section */}
                        <div className="w-full text-center flex flex-col items-center">
                            <h2 ref={galleryTitleRef} className="text-4xl md:text-5xl font-bold text-[#2A2A2A] leading-tight">
                                Our <span className="text-[#2197A1]">Culture & Moments</span>
                            </h2>
                            <p ref={galleryParaRef} className="text-gray-500 text-base md:text-lg font-medium leading-relaxed max-w-3xl mt-4">
                                Take a look into the vibrant life at Prodbiz. From daily team collaborations and workspace highlights to our major milestones and festive celebrations, these moments define our spirit and dedication.
                            </p>
                        </div>

                        {/* Mixed Image Grid - Masonry style columns */}
                        <div
                            ref={galleryRef}
                            className="w-full columns-1 md:columns-2 lg:columns-3 gap-6 !space-y-6"
                        >
                            {allImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    className="gallery-item relative overflow-hidden rounded-3xl cursor-pointer group break-inside-avoid shadow-lg transition-transform duration-300 hover:shadow-2xl"
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-center justify-center p-6 text-center" />
                                    
                                    <img
                                        src={img.url}
                                        alt={img.title}
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    
                                    {/* Overlay Content */}
                                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-end !p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                                        <p className="text-white font-bold text-lg mb-1">{img.title}</p>
                                        <p className="text-white/80 font-medium text-sm line-clamp-2 text-center">{img.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
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
