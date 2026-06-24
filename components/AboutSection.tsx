"use client";

import React, { useEffect, useRef } from "react";
import Button from "./Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AboutSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current || !contentRef.current || !imageContainerRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
            }
        });

        tl.fromTo(
            imageContainerRef.current.querySelectorAll(".block-3d"),
            { opacity: 0, scale: 0.5, rotateY: 45, y: 100 },
            { opacity: 1, scale: 1, rotateY: 0, y: 0, duration: 1.2, stagger: 0.1, ease: "back.out(1.7)" }
        ).fromTo(
            contentRef.current.children,
            { opacity: 0, x: 40 },
            { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
            "-=0.6"
        );
    }, []);

    return (
        <section ref={sectionRef} className="!pt-20 !pb-20 md:!py-12 w-full bg-white overflow-hidden">
            <div className="container !mx-auto !px-6  min-[1150px]:max-[1299px]:!px-0 flex flex-col md:flex-row items-center gap-16 lg:gap-10">

                {/* Visual Section - Left Side (3D Staggered Grid) - HIDDEN ON MOBILE */}
                <div ref={imageContainerRef} className="hidden md:block w-full md:w-[45%] relative h-[500px] lg:h-[600px] mb-12 md:mb-0">
                    <div className="absolute inset-0 flex items-center justify-center scale-[0.65] sm:scale-[0.85] md:scale-100">
                        <div className="relative w-full h-full max-w-[500px] mx-auto">
                            {[
                                { color: "bg-[#0096da]", img: "/images/video-shooting.webp", top: "5%", left: "20%", size: "w-32 h-32 md:w-36 md:h-36", z: 30, anim: "animate-float" },
                                { color: "bg-[#7db7de]", img: "/images/gallery/chirstmas-img-03.webp", top: "-5%", left: "55%", size: "w-28 h-28 md:w-32 md:h-32", z: 20, anim: "animate-float-delayed" },
                                { color: "bg-[#005c93]", img: "/images/home-services/logo.webp", top: "15%", left: "75%", size: "w-32 h-32 md:w-36 md:h-36", z: 10, anim: "animate-float-slow" },
                                { color: "bg-[#e5352c]", img: "/images/website.jpg", top: "35%", left: "5%", size: "w-24 h-24 md:w-28 md:h-28", z: 40, anim: "animate-float" },
                                { color: "bg-[#ffcc00]", img: "/images/gallery/chirstmas-img-01.webp", top: "30%", left: "40%", size: "w-40 h-40 md:w-44 md:h-44", z: 50, anim: "animate-float-slow" },
                                { color: "bg-[#a6ce39]", img: "/images/branding-images/img-2.png", top: "45%", left: "70%", size: "w-32 h-32 md:w-36 md:h-36", z: 15, anim: "animate-float-delayed" },
                                { color: "bg-[#0b5c91]", img: "/services/photography.png", top: "65%", left: "10%", size: "w-28 h-28 md:w-32 md:h-32", z: 25, anim: "animate-float" },
                                { color: "bg-[#80b152]", img: "/services/videograpghy.jpg", top: "55%", left: "30%", size: "w-36 h-36 md:w-40 md:h-40", z: 35, anim: "animate-float-slow" },
                                { color: "bg-[#f19598]", img: "/images/branding-images/img-09.png", top: "70%", left: "60%", size: "w-28 h-28 md:w-32 md:h-32", z: 5, anim: "animate-float-delayed" },
                                { color: "bg-[#f5811c]", img: "/images/branding-images/img-4.png", top: "80%", left: "35%", size: "w-32 h-32 md:w-36 md:h-36", z: 45, anim: "animate-float" },
                            ].map((block, i) => (
                                <div
                                    key={i}
                                    className={`absolute block-3d ${block.color} ${block.size} ${block.anim} rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center group transform transition-all duration-500 hover:scale-110 hover:-translate-y-4`}
                                    style={{
                                        top: block.top,
                                        left: block.left,
                                        zIndex: block.z,
                                    }}
                                >
                                    <div className="w-[90%] h-[90%] rounded-xl overflow-hidden bg-white/20 backdrop-blur-md relative">
                                        <img
                                            src={block.img}
                                            alt="Service"
                                            className="w-full h-full object-cover mix-blend-normal opacity-90 group-hover:opacity-100 transition-opacity"
                                        />
                                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                                    </div>

                                    {/* 3D Extrusion Effect */}
                                    <div className="absolute right-[-8px] bottom-[-8px] w-full h-full bg-black/15 -z-10 rounded-2xl"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Section - Right Side */}
                <div ref={contentRef} className="w-full md:w-[60%] flex flex-col items-start text-left relative z-20 !px-0 md:!pl-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-[3px] w-14 bg-primary rounded-full"></div>
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">Digital Growth</span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-8 leading-[1.05] tracking-tight">
                        Transforming Vision into <span className="text-primary">Digital Reality</span>
                    </h2>

                    {/* MOBILE ONLY IMAGE SECTION */}
                    <div className="md:hidden w-full relative h-[280px] scale-[0.65]">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-full h-full max-w-[500px] mx-auto">
                                {[
                                    { color: "bg-[#0096da]", img: "/images/video-shooting.webp", top: "5%", left: "20%", size: "w-20 h-20", z: 30, anim: "animate-float" },
                                    { color: "bg-[#7db7de]", img: "/images/gallery/chirstmas-img-03.webp", top: "-5%", left: "55%", size: "w-16 h-16", z: 20, anim: "animate-float-delayed" },
                                    { color: "bg-[#005c93]", img: "/images/home-services/logo.webp", top: "15%", left: "75%", size: "w-20 h-20", z: 10, anim: "animate-float-slow" },
                                    { color: "bg-[#e5352c]", img: "/images/website.jpg", top: "35%", left: "5%", size: "w-14 h-14", z: 40, anim: "animate-float" },
                                    { color: "bg-[#ffcc00]", img: "/images/gallery/chirstmas-img-01.webp", top: "30%", left: "40%", size: "w-24 h-24", z: 50, anim: "animate-float-slow" },
                                    { color: "bg-[#a6ce39]", img: "/images/branding-images/img-2.png", top: "45%", left: "70%", size: "w-20 h-20", z: 15, anim: "animate-float-delayed" },
                                    { color: "bg-[#0b5c91]", img: "/services/photography.png", top: "65%", left: "10%", size: "w-16 h-16", z: 25, anim: "animate-float" },
                                    { color: "bg-[#80b152]", img: "/services/videograpghy.jpg", top: "55%", left: "30%", size: "w-24 h-24", z: 35, anim: "animate-float-slow" },
                                    { color: "bg-[#f19598]", img: "/images/branding-images/img-09.png", top: "70%", left: "60%", size: "w-16 h-16", z: 5, anim: "animate-float-delayed" },
                                    { color: "bg-[#f5811c]", img: "/images/branding-images/img-4.png", top: "80%", left: "35%", size: "w-20 h-20", z: 45, anim: "animate-float" },
                                ].map((block, i) => (
                                    <div
                                        key={i}
                                        className={`absolute block-3d ${block.color} ${block.size} ${block.anim} rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center transform`}
                                        style={{ top: block.top, left: block.left, zIndex: block.z }}
                                    >
                                        <div className="w-[90%] h-[90%] rounded-xl overflow-hidden bg-white/20 backdrop-blur-md relative">
                                            <img src={block.img} alt="Service" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="absolute right-[-6px] bottom-[-6px] w-full h-full bg-black/15 -z-10 rounded-2xl"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 md:!mb-6 text-lg lg:text-xl text-gray-600 font-medium leading-relaxed max-w-xl">
                        <p className="border-l-4 border-primary/20 !pl-2">
                            <span className="font-semibold text-gray-800">Prodbiz Solutions</span> is a
                            <span className="font-semibold text-primary"> Digital marketing</span> and
                            <span className="font-semibold text-primary"> IT solutions</span> company that helps businesses
                            <span className="font-semibold text-gray-800"> grow online</span>.
                            We create your <span className="font-semibold">brand</span>, design your
                            <span className="font-semibold"> logo</span>, build your
                            <span className="font-semibold"> website</span>, and promote your business on
                            <span className="font-semibold"> Google</span> and
                            <span className="font-semibold"> Social Media</span>.
                        </p>

                        <p className="!pl-2">
                            From <span className="font-semibold">video creation</span> and
                            <span className="font-semibold"> content posting</span> to
                            <span className="font-semibold text-primary"> SEO Services</span> and
                            <span className="font-semibold text-primary"> Online Advertising</span>,
                            we handle <span className="font-semibold text-gray-800">everything in one place</span>.
                            Our goal is simple — help you
                            <span className="font-semibold text-gray-800"> attract more customers</span>,
                            <span className="font-semibold text-gray-800"> increase your visibility</span>, and
                            <span className="font-semibold text-gray-800"> grow your business</span>.
                        </p>
                    </div>

                    <Button href="/about-us" className="about-section-btn !py-2 !px-6">
                        <span>Learn More</span>
                        <span className="arrow-icon">→</span>
                    </Button>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(1deg); }
                }
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(15px) rotate(-1deg); }
                }
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-30px) translateX(10px); }
                }
                .animate-float {
                    animation: float 5s ease-in-out infinite;
                }
                .animate-float-delayed {
                    animation: float-delayed 7s ease-in-out infinite;
                    animation-delay: 1s;
                }
                .animate-float-slow {
                    animation: float-slow 10s ease-in-out infinite;
                }
                .perspective-1000 {
                    perspective: 1000px;
                }
                .block-3d {
                    transform-style: preserve-3d;
                    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .block-3d::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: inherit;
                    filter: brightness(0.7);
                    transform: translateZ(-10px) translateX(5px) translateY(5px);
                    border-radius: inherit;
                    z-index: -1;
                }
                .block-3d:hover {
                    z-index: 100 !important;
                }
            `}</style>
        </section>
    );
};

export default AboutSection;
