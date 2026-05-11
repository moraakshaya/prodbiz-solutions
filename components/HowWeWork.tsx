"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
    {
        id: "01",
        title: "Requirement Gathering",
        description: "You tell us your requirement. We listen carefully to understand your business goals, target audience, and specific needs.",
        color: "#5fccd6", // Teal Light
        textColor: "text-[#2197a1]"
    },
    {
        id: "02",
        title: "Design & Build",
        description: "We design & build everything. From high-performing websites to premium digital assets, we handle the entire creation process.",
        color: "#1e293b", // Navy/Slate Dark
        textColor: "text-slate-800"
    },
    {
        id: "03",
        title: "Content & Promotion",
        description: "We create content & promote your business. We manage your presence on Google and social media to reach the right people.",
        color: "#14b8a6", // Teal Medium
        textColor: "text-teal-700"
    },
    {
        id: "04",
        title: "Customer Growth",
        description: "You get customers and grow. Watch your business scale as our marketing strategies drive consistent traffic and sales.",
        color: "#2197a1", // Brand Primary Teal
        textColor: "text-[#2197a1]"
    }
];

const HowWeWork = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!triggerRef.current) return;

        const items = triggerRef.current.querySelectorAll(".step-item");
        
        items.forEach((item, index) => {
            const isEven = (index + 1) % 2 === 0;
            
            gsap.fromTo(
                item,
                { 
                    opacity: 0, 
                    x: isEven ? 50 : -50,
                    y: 20
                },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }, []);

    return (
        <section ref={sectionRef} className="md:!pt-32 !pt-10 !pb-32 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center md:!mb-20 !mb-10 !px-2">
                    <span className="inline-block !px-4 !py-1.5 !mb-3 text-xs font-bold tracking-[0.2em] text-primary uppercase bg-primary/10 rounded-full">
                        HOW WE WORK
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-6">
                        Simple Process. <span className="text-primary">Powerful Results.</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-secondary/80 !mx-auto rounded-full"></div>
                </div>

                {/* DESKTOP VERSION (Hidden on Mobile) */}
                <div ref={triggerRef} className="relative max-w-7xl mx-auto hidden md:block">
                    {/* Central Vertical Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 hidden md:block -translate-x-1/2"></div>

                    <div className="flex flex-col">
                        {steps.map((step, index) => {
                            const isEven = (index + 1) % 2 === 0;
                            return (
                                <div 
                                    key={step.id} 
                                    className={`step-item flex flex-col md:flex-row items-center w-full relative z-[${index + 1}] ${index !== 0 ? 'md:-mt-16' : ''}`}
                                >
                                    {/* Left Content Column */}
                                    <div className="w-full md:w-1/2 flex justify-end px-0 md:!pr-24">
                                        {!isEven ? (
                                            <div className="text-left md:text-right max-w-4xl py-8">
                                                <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${step.textColor}`}>{step.title}</h3>
                                                <p className="text-gray-500 text-lg leading-relaxed">{step.description}</p>
                                            </div>
                                        ) : (
                                            <div className="hidden md:block w-full"></div>
                                        )}
                                    </div>

                                    {/* Middle 3D Box Column */}
                                    <div className="flex justify-center items-center w-32 h-32 relative md:absolute md:left-1/2 md:-translate-x-1/2 my-6 md:!my-0">
                                        <div 
                                            className={`w-32 h-32 flex flex-col items-center justify-center text-white shadow-[8px_16px_32px_rgba(0,0,0,0.15)] transform transition-all duration-500 hover:scale-105 hover:shadow-[12px_24px_48px_rgba(0,0,0,0.2)] ${!isEven ? 'md:translate-x-[-20px]' : 'md:translate-x-[20px]'} relative overflow-hidden group/box`}
                                            style={{ borderRadius: '16px', backgroundColor: step.color, backgroundImage: `linear-gradient(135deg, ${step.color} 0%, #00000033 100%)`, boxShadow: `8px 16px 32px rgba(0,0,0,0.15), inset -4px -4px 8px rgba(0,0,0,0.2), inset 4px 4px 8px rgba(255,255,255,0.2)` }}
                                        >
                                            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent"></div>
                                            <span className="text-4xl font-black mb-1 drop-shadow-lg">{step.id}</span>
                                            <span className="text-xs font-bold tracking-widest uppercase opacity-80">STEP</span>
                                        </div>
                                    </div>

                                    {/* Right Content Column */}
                                    <div className="w-full md:w-1/2 flex justify-start px-0 md:!pl-24">
                                        {isEven ? (
                                            <div className="text-left max-w-5xl py-8">
                                                <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${step.textColor}`}>{step.title}</h3>
                                                <p className="text-gray-500 text-lg leading-relaxed">{step.description}</p>
                                            </div>
                                        ) : (
                                            <div className="hidden md:block w-full"></div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* MOBILE VERSION (Staggered Like Desktop) */}
                <div className="md:hidden relative w-full pt-10">
                    {/* Central Vertical Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-100 -translate-x-1/2"></div>

                    <div className="flex flex-col gap-0">
                        {steps.map((step, index) => {
                            const isEven = (index + 1) % 2 === 0;
                            return (
                                <div key={step.id} className="flex items-center w-full relative min-h-[100px]">
                                    {/* Left Content Column (Mobile) */}
                                    <div className="w-1/2 !pr-10 text-right">
                                        {!isEven && (
                                            <div className="flex flex-col">
                                                <h4 className={`text-[15px] font-bold leading-tight ${step.textColor}`}>{step.title}</h4>
                                                <p className="!text-[12px] text-gray-500 leading-tight mt-1 line-clamp-3">{step.description}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Middle Box (Mobile) */}
                                    <div className="absolute left-1/2 -translate-x-1/2 z-10">
                                        <div 
                                            className="w-16 h-16 flex flex-col items-center justify-center text-white shadow-md relative overflow-hidden rounded-xl"
                                            style={{ backgroundColor: step.color, backgroundImage: `linear-gradient(135deg, ${step.color} 0%, #00000033 100%)` }}
                                        >
                                            <span className="text-xl font-black">{step.id}</span>
                                            <span className="text-[6px] font-bold uppercase opacity-80">STEP</span>
                                        </div>
                                    </div>

                                    {/* Right Content Column (Mobile) */}
                                    <div className="w-1/2 !pl-10 text-left">
                                        {isEven && (
                                            <div className="flex flex-col">
                                                <h4 className={`text-[15px] font-bold leading-tight ${step.textColor}`}>{step.title}</h4>
                                                <p className="!text-[12px] text-gray-500 leading-tight mt-1 line-clamp-3">{step.description}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                .pers-{
                    perspective: 1000px;
                }
            `}</style>
        </section>
    );
};

export default HowWeWork;
