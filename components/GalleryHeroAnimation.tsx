"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const images = [
    "/images/gallery/chirstmas-img-01.webp",
    "/images/gallery/chirstmas-img-02.webp",
    "/images/gallery/chirstmas-img-03.webp"
];

const GalleryHeroAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const platformRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
    const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);

        if (!containerRef.current) return;

        const ctx = gsap.context(() => {});

        const reset = () => {
            if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
            ctx.add(() => {
                gsap.killTweensOf([platformRef.current, containerRef.current, ...imagesRef.current]);
                gsap.set(containerRef.current, { opacity: 0 });
                gsap.set(platformRef.current, { scale: 0, opacity: 0 });
                gsap.set(imagesRef.current, { opacity: 0, scale: 0, y: 100, x: 0, z: 0, rotationY: 0 });
            });
        };

        const startRotationLoop = () => {
            let currentIndex = 0;
            
            const rotate = () => {
                const nextIndex = (currentIndex + 1) % 3;
                const prevIndex = (currentIndex + 2) % 3;

                ctx.add(() => {
                    const tl = gsap.timeline();
                    tl.to(imagesRef.current[currentIndex], {
                        x: -140,
                        z: -150,
                        scale: 0.75,
                        opacity: 0.5,
                        zIndex: 5,
                        duration: 1.5,
                        ease: "power2.inOut"
                    }, 0);

                    tl.to(imagesRef.current[nextIndex], {
                        x: 0,
                        z: 50,
                        scale: 1.1,
                        opacity: 1,
                        zIndex: 20,
                        duration: 1.5,
                        ease: "power2.inOut"
                    }, 0);

                    tl.to(imagesRef.current[prevIndex], {
                        x: 140,
                        z: -150,
                        scale: 0.75,
                        opacity: 0.5,
                        zIndex: 5,
                        duration: 1.5,
                        ease: "power2.inOut"
                    }, 0);
                });

                currentIndex = nextIndex;
                loopTimeoutRef.current = setTimeout(rotate, 4500);
            };

            rotate();
        };

        const playEntrance = () => {
            reset(); // Ensure clean state before entrance
            ctx.add(() => {
                const tl = gsap.timeline();
                tl.to(containerRef.current, { opacity: 1, duration: 0.5 });
                tl.to(platformRef.current, { 
                    scale: 1, 
                    opacity: 1, 
                    duration: 1.2, 
                    ease: "back.out(1.2)" 
                }, "-=0.2");

                tl.to(imagesRef.current, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out"
                }, "-=0.8");

                tl.add(() => startRotationLoop(), "+=0.2");
            });
        };

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                playEntrance();
            } else {
                reset();
            }
        }, { threshold: 0.1 });

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
            if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
            ctx.revert();
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div ref={containerRef} className={`relative w-full ${isMobile ? 'h-full' : 'h-[400px]'} flex items-center justify-center perspective-2000 opacity-0 mb-0 overflow-visible`}>
            
            {/* 3D Cylindrical Pedestal */}
            <div 
                ref={platformRef}
                className={`absolute ${isMobile ? '-bottom-[15%]' : '-bottom-[30%]'} ${isMobile ? 'w-[280px] h-[280px]' : 'w-[360px] h-[360px]'} transform-style-3d z-0`}
                style={{ transform: "rotateX(75deg)" }}
            >
                {/* Structural Layers for Thickness */}
                <div className="absolute inset-0 rounded-full bg-[#0a3a3d]" style={{ transform: "translateZ(-30px)" }} />
                <div className="absolute inset-0 rounded-full bg-[#0d4a4d]" style={{ transform: "translateZ(-20px)" }} />
                <div className="absolute inset-0 rounded-full bg-[#115a5d]" style={{ transform: "translateZ(-10px)" }} />
                
                {/* Main Face Shadow Gradient */}
                <div 
                    className="absolute inset-0 rounded-full bg-gradient-to-b from-[#1a7a82] to-[#041a1c]" 
                    style={{ transform: "translateZ(-35px)", height: isMobile ? "280px" : "360px" }}
                />
                
                {/* Top Surface */}
                <div 
                    className="absolute inset-0 rounded-full bg-[#2197A1] border-[1px] border-white/20"
                    style={{ transform: "translateZ(0px)", boxShadow: "inset 0 0 40px rgba(0,0,0,0.2)" }}
                >
                    <div className="absolute inset-[-1px] rounded-full border-[1.5px] border-cyan-200/40 shadow-[0_0_10px_rgba(33,151,161,0.5)]" />
                    <div className="absolute inset-[10%] rounded-full bg-cyan-300/10 blur-xl" />
                </div>

                {/* Floor Glow */}
                <div className="absolute inset-[-30px] rounded-full bg-cyan-500/20 blur-3xl -z-10" style={{ transform: "translateZ(-60px)" }} />
            </div>

            {/* Images Container */}
            <div className={`relative ${isMobile ? 'top-10' : 'top-20'} w-full h-full flex items-center justify-center transform-style-3d overflow-visible ${isMobile ? '-translate-y-16' : '-translate-y-28'}`}>
                {images.map((url, i) => (
                    <div
                        key={i}
                        ref={(el) => { imagesRef.current[i] = el; }}
                        className={`absolute ${isMobile ? 'w-32 h-44' : 'w-48 h-64 md:w-56 md:h-76'} rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] border-2 border-white/20 transform-style-3d`}
                    >
                        <img 
                            src={url} 
                            alt={`Gallery ${i}`} 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                ))}
            </div>

            <style jsx>{`
                .transform-style-3d {
                    transform-style: preserve-3d;
                }
            `}</style>
        </div>
    );
};

export default GalleryHeroAnimation;
