"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const blogArticles = [
    { 
        title: "The Future of SEO in 2025", 
        category: "SEO", 
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
        desc: "How AI is shaping search engine rankings..." 
    },
    { 
        title: "Top Web Design Trends in 2025", 
        category: "Web Design", 
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80",
        desc: "Explore visual styles like glassmorphism and bento..." 
    },
    { 
        title: "Social Media Brand Growth", 
        category: "Marketing", 
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80",
        desc: "Building communities through authrentic storytelling..." 
    }
];

const InsightsHeroAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const phoneRef = useRef<HTMLDivElement>(null);
    const articlesRef = useRef<(HTMLDivElement | null)[]>([]);
    const animationCtx = useRef<gsap.Context | null>(null);
    const [isInView, setIsInView] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                } else {
                    setIsInView(false);
                }
            },
            { threshold: 0.3 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (isInView) {
            // Kill any previous context
            if (animationCtx.current) animationCtx.current.revert();

            const ctx = gsap.context(() => {
                const tl = gsap.timeline();
                
                // Reset State
                gsap.set(containerRef.current, { opacity: 1 });
                gsap.set(phoneRef.current, { y: 100, opacity: 0, scale: 0.8 });
                gsap.set(articlesRef.current, { x: 320, opacity: 0 });

                // Entrance Animation
                tl.to(phoneRef.current, { 
                    y: 0, 
                    opacity: 1, 
                    scale: 1, 
                    duration: 1.2, 
                    ease: "back.out(1.5)" 
                });

                // Start Sliding Articles
                const articleTl = gsap.timeline({ repeat: -1 });
                articlesRef.current.forEach((article, i) => {
                    articleTl.set(article, { x: 320, opacity: 0, display: "flex" });
                    
                    articleTl.to(article, {
                        x: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power3.out"
                    });
                    
                    articleTl.to(article, { x: 0, duration: 4 });
                    
                    articleTl.to(article, {
                        x: -320,
                        opacity: 0,
                        duration: 1.2,
                        ease: "power3.in"
                    });
                    
                    articleTl.set(article, { display: "none" });
                });

                tl.add(articleTl, "+=0.2");
            }, containerRef);
            
            animationCtx.current = ctx;
        } else {
            // Clean up and reset when out of view
            if (animationCtx.current) {
                animationCtx.current.revert();
                animationCtx.current = null;
            }
        }

        return () => {
            if (animationCtx.current) animationCtx.current.revert();
        };
    }, [isInView]);

    return (
        <div ref={containerRef} className={`relative w-full ${isMobile ? 'h-full' : 'h-[600px]'} flex items-center justify-center perspective-2000 opacity-0 overflow-visible`}>
            
            {/* Premium iPhone Mockup - Perfectly Centered */}
            <div 
                ref={phoneRef}
                className={`relative ${isMobile ? 'w-[180px] h-[330px]' : 'w-[280px] h-[520px]'} bg-[#000] rounded-[3.5rem] p-[8px] shadow-[0_50px_100px_rgba(0,0,0,0.6),0_0_30px_rgba(33,151,161,0.25)] transform-style-3d border-[2px] border-white/10`}
            >
                <div className="absolute inset-0 rounded-[3.5rem] border-[4px] border-[#2c2c2e] z-0" />
                
                {/* Side Hardware Buttons */}
                <div className="absolute -left-[3px] top-28 w-[3.5px] h-12 bg-[#2c2c2e] rounded-l-md" /> 
                <div className="absolute -left-[3px] top-44 w-[3.5px] h-16 bg-[#2c2c2e] rounded-l-md" />
                <div className="absolute -right-[3px] top-36 w-[3.5px] h-24 bg-[#2c2c2e] rounded-r-md" /> 

                {/* iPhone Internal Screen (Dark Mode) */}
                <div className="relative w-full h-full rounded-[2.8rem] bg-[#030e12] overflow-hidden flex flex-col z-10 border border-white/5 shadow-inner">
                    
                    {/* Status Bar / UI Header (Dark) */}
                    <div className={`shrink-0 w-full ${isMobile ? 'h-12' : 'h-20'} bg-[#0a161a] border-b border-white/10 flex items-center justify-between !px-6 ${isMobile ? '!pt-2' : '!pt-6'} relative z-40`}>
                         <div className={`${isMobile ? 'w-5 h-5' : 'w-8 h-8'} rounded-lg bg-[#2197A1]/20 flex items-center justify-center`}>
                            <div className={`${isMobile ? 'w-2 h-2' : 'w-4 h-4'} rounded-sm bg-[#2197A1]`} />
                         </div>
                         <div className="flex gap-1.5">
                            <div className={`${isMobile ? 'w-4 h-1' : 'w-6 h-1.5'} bg-white/20 rounded-full`} />
                            <div className={`${isMobile ? 'w-3 h-1' : 'w-4 h-1.5'} bg-white/20 rounded-full opacity-50`} />
                         </div>
                    </div>

                    {/* Dynamic Island Overlay */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-end px-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] border border-white/5" />
                    </div>
                    
                    {/* Main Screen Content Area (Dark) */}
                    <div className="relative flex-1 bg-[#030e12] overflow-hidden">
                        
                        {/* Realistic Blog Layouts */}
                        {blogArticles.map((article, i) => (
                            <div
                                key={i}
                                ref={(el) => { articlesRef.current[i] = el; }}
                                className="absolute inset-0 flex flex-col !p-0 hidden"
                            >
                                {/* Blog Image */}
                                <div className={`w-full ${isMobile ? 'h-[120px]' : 'h-[220px]'} overflow-hidden`}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#030e12] to-transparent z-10" />
                                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                                </div>

                                {/* Blog Details */}
                                <div className={`relative ${isMobile ? '!p-4' : '!p-7'} flex flex-col flex-1 z-20`}>
                                    <span className={`${isMobile ? 'text-[9px]' : 'text-[11px]'} font-extrabold uppercase tracking-widest text-[#2197A1] ${isMobile ? '!mb-1' : '!mb-2'}`}>
                                        {article.category}
                                    </span>
                                    <h4 className={`!text-white ${isMobile ? '!text-[11px]' : '!text-[14px]'} font-black leading-tight ${isMobile ? 'mb-2' : 'mb-4'} drop-shadow-sm`}>
                                        {article.title}
                                    </h4>
                                    <p className={`!text-white/50 ${isMobile ? '!text-[10px]' : '!text-[12px]'} leading-relaxed ${isMobile ? 'mb-4' : 'mb-8'} font-medium line-clamp-3`}>
                                        {article.desc}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="!px-3 !py-1 rounded-full bg-[#2197A1] border border-[#2197A1] shadow-[0_0_15px_rgba(33,151,161,0.4)] flex items-center justify-center cursor-pointer">
                                            <span className="!text-[8px] font-bold text-white uppercase tracking-wider">Read More</span>
                                        </div>
                                        <div className="flex -space-x-2">
                                            <div className="w-3 h-3 rounded-full border-2 border-[#030e12] bg-[#1a2529]" />
                                            <div className="w-3 h-3 rounded-full border-2 border-[#030e12] bg-[#2197A1] opacity-60" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Home Indicator */}
                    <div className="shrink-0 w-full h-8 flex items-center justify-center bg-[#030e12]">
                        <div className="w-32 h-1.5 bg-white/10 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Radiant Background Glows */}
            <div className="absolute w-[400px] h-[600px] bg-[#2197A1]/10 blur-[130px] -z-20 rounded-full" />
            
            <style jsx>{`
                .transform-style-3d {
                    transform-style: preserve-3d;
                }
            `}</style>
        </div>
    );
};

export default InsightsHeroAnimation;
