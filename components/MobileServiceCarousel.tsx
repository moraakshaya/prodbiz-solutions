"use client";

import React, { useState, useEffect, useRef } from "react";

interface ServiceItem {
    title: string;
    desc: string;
    icon: React.ReactNode;
}

export default function MobileServiceCarousel({ items }: { items: ServiceItem[] }) {
    const [activeIdx, setActiveIdx] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const isSteppingRef = useRef(false);

    // We append the first item to the end to create a seamless loop
    const displayItems = [...items, items[0]];

    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current && !isSteppingRef.current && !isPaused) {
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
    }, [activeIdx, items.length, isPaused]);

    // Resume when clicking anywhere
    useEffect(() => {
        if (!isPaused) return;

        const handleGlobalClick = () => {
            setIsPaused(false);
        };

        // Delay to prevent the click that paused it from immediately resuming it
        const timeout = setTimeout(() => {
            window.addEventListener('click', handleGlobalClick);
            window.addEventListener('touchstart', handleGlobalClick);
        }, 50);

        return () => {
            window.removeEventListener('click', handleGlobalClick);
            window.removeEventListener('touchstart', handleGlobalClick);
            clearTimeout(timeout);
        };
    }, [isPaused]);

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
                {displayItems.map((service, index) => (
                    <div 
                        key={index} 
                        className="w-full flex-shrink-0 flex flex-col items-center !py-12 snap-center"
                    > 
                         <div 
                            className="relative w-full flex flex-col items-center group cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsPaused(true);
                            }}
                         >
                            {/* Floating Icon Sphere */}
                            <div className="relative z-20 !mb-[-35px] animate-float" style={{ animationDelay: `${(index % items.length) * 0.5}s` }}>
                                <div className="w-24 h-24 rounded-full bg-[#2197A1]/5 backdrop-blur-md border-[1.5px] border-[#2197A1] flex items-center justify-center text-[#2197A1] shadow-[0_0_30px_rgba(33,151,161,0.2)] transition-all duration-700">
                                    <div className="absolute inset-[4px] rounded-full border border-[#2197A1]/30"></div>
                                    <div className="transform transition-transform duration-700">
                                        {service.icon}
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#2197A1]/20 blur-lg rounded-full"></div>
                            </div>

                            {/* 3D Podium/Pedestal */}
                            <div className="relative w-48 h-20 !mb-10 transition-transform duration-700">
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
                                <h3 className="text-xl font-bold !text-[#1E293B] uppercase tracking-wider transition-all">{service.title}</h3>
                                <p className="text-[#64748B] text-[13px] font-medium leading-relaxed max-w-[180px] !mx-auto transition-colors italic">
                                    {service.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dots Pagination */}
            <div className="flex items-center justify-center gap-2 !mt-4 !mb-10">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (carouselRef.current) {
                                carouselRef.current.scrollTo({
                                    left: i * carouselRef.current.clientWidth,
                                    behavior: 'smooth'
                                });
                                setActiveIdx(i);
                                setIsPaused(false);
                            }
                        }}
                        className={`rounded-full transition-all duration-300 ${i === (activeIdx % items.length) ? 'bg-[#2197A1] w-8 h-2' : 'bg-[#2197A1]/25 w-2 h-2'
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
