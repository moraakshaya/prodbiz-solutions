"use client";

import React, { useState, useEffect, useRef } from "react";

interface InfographicItem {
    title: string;
    desc: string;
    icon: React.ReactNode;
}

export default function MobileInfographicCarousel({ items }: { items: InfographicItem[] }) {
    const [activeIdx, setActiveIdx] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const isSteppingRef = useRef(false);

    // We append the first item to the end to create a seamless loop
    const displayItems = [...items, items[0]];

    const handleScroll = () => {
        if (carouselRef.current && !isSteppingRef.current) {
            const { scrollLeft, clientWidth } = carouselRef.current;
            const newIdx = Math.round(scrollLeft / clientWidth);
            
            if (newIdx === items.length) {
                isSteppingRef.current = true;
                setTimeout(() => {
                    if (carouselRef.current) {
                        carouselRef.current.scrollTo({ left: 0, behavior: 'auto' });
                        setActiveIdx(0);
                        isSteppingRef.current = false;
                    }
                }, 500);
            } else if (newIdx < items.length && newIdx !== activeIdx) {
                setActiveIdx(newIdx);
            }
        }
    };

    return (
        <div className="md:hidden w-full overflow-hidden !py-12">
            <div
                ref={carouselRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory w-full"
            >
                {displayItems.map((item, index) => (
                    <div 
                        key={index} 
                        className="w-full flex-shrink-0 flex justify-center snap-center !pb-4 px-4"
                    >
                         <div className="group relative w-full max-w-[280px] aspect-square rounded-full flex flex-col items-center justify-center text-center cursor-default bg-white border border-[#2197A1]/10 shadow-lg">
                            {/* Inner Clipped Container for Background and Right Shape */}
                            <div className="absolute inset-0 rounded-full overflow-hidden z-0">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#2197A1]/5 via-transparent to-transparent opacity-100"></div>
                                
                                {/* The Badge perfectly clipped on the right */}
                                <div className="absolute top-1/2 right-0 translate-x-[35%] -translate-y-1/2 w-[100px] h-[100px] bg-[#2197A1] rounded-full flex items-center justify-start pl-6 shadow-lg">
                                    <span className="text-white font-black !pl-5 !text-xl transform -translate-y-[2px]">0{(index % items.length) + 1}</span>
                                </div>
                            </div>
                            
                            {/* The outer SVG arc and dots perfectly wrapping the right side */}
                            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none drop-shadow-[0_0_4px_rgba(33,151,161,0.2)] text-[#2197A1]" viewBox="-2 -2 104 104">
                                <path 
                                    d="M 50 0 A 50 50 0 0 1 50 100" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="1.5" 
                                />
                                <circle cx="50" cy="0" r="2.5" fill="currentColor" />
                                <circle cx="50" cy="100" r="2.5" fill="currentColor" />
                            </svg>

                            {/* Main Content */}
                            <div className="relative !left-[-20px] !w-[180px] z-20 flex flex-col items-center pt-2 pl-1 pr-12 text-center">
                                <div className="text-[#2197A1] !mb-4 transform scale-90">
                                    {item.icon}
                                </div>
                                <h3 className="text-[#2A2A2A] font-bold !text-[13px] uppercase tracking-widest mb-3 leading-snug">
                                    {item.title}
                                </h3>
                                <p className="text-[#2A2A2A]/60 !text-[13px] leading-[1.6] line-clamp-4 font-medium">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dots Pagination */}
            <div className="flex items-center justify-center gap-2 !mt-10">
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
                        className={`rounded-full transition-all duration-300 ${i === (activeIdx % items.length) ? 'bg-[#2197A1] w-8 h-2' : 'bg-[#2197A1]/25 w-2 h-2'
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
