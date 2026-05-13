"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Palette, Code2, Video, TrendingUp, Rocket, CheckCircle2 } from "lucide-react";
import Button from "@/components/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const LiquidEther = dynamic(() => import("@/components/LiquidEther"), { ssr: false });
import FinalCTA from "@/components/FinalCTA";

const services = [
    {
        title: "Branding & Designing",
        desc: "We create professional designs that make your business look attractive, trustworthy, and stand out from the first moment.",
        icon: <Palette size={40} />,
        href: "/solutions/branding-designing",
        color: "#2197A1",
        features: ["Logo Design", "Social Media Creatives", "Business Identity", "Marketing Collateral"]
    },
    {
        title: "Website Development",
        desc: "Get a high-performance website that converts visitors into customers. Fast, SEO-friendly, and mobile-responsive.",
        icon: <Code2 size={40} />,
        href: "/solutions/website-development",
        color: "#e76038",
        features: ["Business Websites", "E-commerce Stores", "Portfolio Sites", "Landing Pages"]
    },
    {
        title: "Video Marketing",
        desc: "Engage your audience with high-quality visual storytelling, professional editing, and trending reels.",
        icon: <Video size={40} />,
        href: "/solutions/content-creation-video-marketing",
        color: "#2197A1",
        features: ["Professional Shooting", "Video Editing", "Reels & Shorts", "Product Videos"]
    },
    {
        title: "Digital Marketing",
        desc: "Grow your business with data-driven marketing. We bring your brand to the top and drive high-quality leads.",
        icon: <TrendingUp size={40} />,
        href: "/solutions/digital-marketing",
        color: "#e76038",
        features: ["Google & Facebook Ads", "SEO Optimization", "Social Media Growth", "Local SEO"]
    },
    {
        title: "Complete Business Growth",
        desc: "End-to-end digital solutions designed to scale your business from startup to market leader.",
        icon: <Rocket size={40} />,
        href: "/solutions/complete-business-growth",
        color: "#2197A1",
        features: ["Full Digital Strategy", "Lead Generation", "Brand Scaling", "End-to-End Support"]
    }
];

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SolutionsPage() {
    const [mounted, setMounted] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        
        if (mounted) {
            const tl = gsap.timeline();
            
            tl.fromTo(".service-hero-content > *", 
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
            );

            gsap.fromTo(".service-card", 
                { y: 60, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 1, 
                    stagger: 0.15, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".services-grid",
                        start: "top 80%",
                    }
                }
            );
        }
    }, [mounted]);

    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            {/* Hero Section */}
            <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
                <div className="absolute inset-0 -z-20 bg-black">
                    <LiquidEther
                        colors={[ '#2197a1', '#e76038', '#2197a1' ]}
                        mouseForce={20}
                        cursorSize={100}
                        autoDemo
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
                
                <div className="service-hero-content z-10 text-center !px-4 max-w-4xl mx-auto">
                    <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#2197A1] text-xs font-bold uppercase tracking-widest">
                        What We Do
                    </span>
                    <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight">
                        Our <span className="text-[#2197A1]">Premium</span> Services
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium leading-relaxed">
                        We provide end-to-end digital solutions to help your business look professional, build trust, and scale with confidence.
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
            </section>

            {/* Services Grid Section */}
            <section className="w-full !py-24 !px-6 lg:!px-12 bg-white relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        {services.map((service, index) => (
                            <Link 
                                key={index} 
                                href={service.href}
                                className="group service-card relative flex flex-col bg-white rounded-[3rem] p-10 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(33,151,161,0.15)] transition-all duration-500 hover:-translate-y-4"
                            >
                                {/* Decorative Icon Background */}
                                <div className="absolute top-8 right-8 text-gray-50 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500 transform group-hover:scale-150 group-hover:rotate-12">
                                    {React.cloneElement(service.icon, { size: 140 })}
                                </div>

                                <div 
                                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-white"
                                    style={{ backgroundColor: `${service.color}15`, color: service.color }}
                                >
                                    {service.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-[#1E293B] mb-4 group-hover:text-[#2197A1] transition-colors duration-300">
                                    {service.title}
                                </h3>

                                <p className="text-[#64748B] font-medium leading-relaxed mb-8 flex-grow">
                                    {service.desc}
                                </p>

                                <div className="space-y-3 mb-10">
                                    {service.features.map((feature, fIndex) => (
                                        <div key={fIndex} className="flex items-center gap-3 text-sm font-bold text-[#1E293B]/70">
                                            <CheckCircle2 size={16} className="text-[#2197A1]" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2 text-[#2197A1] font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all duration-300">
                                    Explore Details <ArrowRight size={18} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <FinalCTA />
        </main>
    );
}
