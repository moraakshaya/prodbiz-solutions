"use client";

import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Button from "@/components/Button";
import FinalCTA from "@/components/FinalCTA";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import dynamic from "next/dynamic";

const WhoWeAreHero3D = dynamic(() => import("@/components/WhoWeAreHero3D"), { ssr: false });
const Lanyard = dynamic(() => import("@/components/Lanyard"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function PrivacyPolicyPage() {
    const [mounted, setMounted] = useState(false);

    const tagRef = useRef<HTMLDivElement>(null);
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const paraRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const contentSectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setMounted(true);

        if (h1Ref.current && spanRef.current && paraRef.current && buttonsRef.current) {
            const tl = gsap.timeline();
            const splitParas = new SplitType(paraRef.current.querySelectorAll("p"), { types: "lines" });

            if (tagRef.current) {
                tl.fromTo(tagRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.1);
            }

            tl.fromTo(h1Ref.current, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, 0.2);
            tl.fromTo(splitParas.lines, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }, "-=0.6");
            tl.fromTo(buttonsRef.current.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" }, "-=0.4");

            const loopTl = gsap.timeline({ repeat: -1, repeatDelay: 1.5, delay: 1.0 });
            loopTl.to(spanRef.current, { y: -25, opacity: 0, rotationX: 90, duration: 0.6, ease: "power2.in" })
                .set(spanRef.current, { y: 25, rotationX: -90 })
                .to(spanRef.current, { y: 0, opacity: 1, rotationX: 0, duration: 0.8, ease: "power2.out" });

            if (contentSectionRef.current) {
                gsap.fromTo(contentSectionRef.current, { y: 40, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 1.0, ease: "power3.out",
                    scrollTrigger: { trigger: contentSectionRef.current, start: "top 85%" }
                });
            }

            return () => splitParas.revert();
        }
    }, [mounted]);

    const scrollToContent = () => {
        contentSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main className="flex min-h-screen flex-col items-center bg-white overflow-hidden">
            {/* Privacy Hero Section */}
            <section className="hero-section-standard">
                <WhoWeAreHero3D />
                
                {/* Mobile Lanyard (Centered Background) */}
                <div className="block md:hidden absolute inset-0 z-0 opacity-60">
                    <Lanyard name="DATA OFFICER" role="PRIVACY & COMPLIANCE" />
                </div>

                <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: "linear-gradient(105deg, rgba(3,14,18,0.72) 0%, rgba(3,14,18,0.45) 50%, transparent 100%)" }} />
                
                <div className="relative z-10 w-full max-w-7xl !mx-auto flex md:flex-row flex-col items-center !px-4 md:!px-2 !pt-10 md:!pt-10 gap-8 md:gap-1">
                    <div className="w-full md:w-[60%] flex flex-col items-center md:items-start translate-y-[-20px] !mt-20 md:pr-8 md:!pl-8">
                        <div ref={tagRef} className="hidden md:inline-flex bg-white/10 backdrop-blur-md text-[#2197A1] !px-5 !py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] !mb-6 shadow-sm border border-white/5">
                            Legal & Compliance
                        </div>
                        <h1 ref={h1Ref} className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-bold !text-white !mb-2 md:mb-6 leading-tight break-words text-center md:text-left w-full drop-shadow-lg" style={{ perspective: "1000px" }}>
                            Privacy <span ref={spanRef} className="text-[#2197A1] inline-block origin-center transform-style-3d" style={{ textShadow: "0 0 30px rgba(33,151,161,0.6)" }}>Policy</span>
                        </h1>
                        <div ref={paraRef} className="w-full flex flex-col md:block">
                            <p className="block md:hidden text-base sm:text-base text-white/80 font-medium leading-relaxed text-center mb-8">
                                At Prodbiz Solutions, we value your privacy and are committed to protecting your personal information.
                            </p>
                            <div className="hidden md:block space-y-4 max-w-3xl mb-1 md:mb-8">
                                <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed">
                                    At Prodbiz Solutions, we value your privacy and are committed to protecting your personal information. This policy explains our data practices and how we safeguard your information.
                                </p>
                            </div>
                        </div>
                        <div ref={buttonsRef} className="w-full flex justify-center md:justify-start !mt-2">
                            <Button onClick={scrollToContent} className="hero-btn">
                                View Full Policy
                                <ArrowRight size={16} className="md:w-[22px] md:h-[22px]" />
                            </Button>
                        </div>
                    </div>

                    {/* Desktop Right Side: Interactive Lanyard */}
                    <div className="hidden md:flex w-full md:w-[40%] justify-center items-center" style={{ height: '520px' }}>
                        <Lanyard name="DATA OFFICER" role="PRIVACY & COMPLIANCE" position={[0, 0, 14]} fov={22} />
                    </div>
                </div>
            </section>


            {/* Content Section */}
            <section ref={contentSectionRef} className="w-full !py-20 !px-6">
                <div className="max-w-7xl !mx-auto relative">
                    <div className="relative z-10 !space-y-10">
                        {/* 01 Introduction */}
                        <div>
                            <h2 className="!text-2xl font-bold text-[#2A2A2A] mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-[#2197A1]/10 text-[#2197A1] flex items-center justify-center text-sm font-black">01</span>
                                Introduction
                            </h2>
                            <p className="text-lg text-[#2A2A2A]/70 leading-relaxed font-medium">
                                At Prodbiz Solutions, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website.
                            </p>
                        </div>

                        {/* 02 Information We Collect */}
                        <div>
                            <h2 className="!text-2xl font-bold text-[#2A2A2A] mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-[#2197A1]/10 text-[#2197A1] flex items-center justify-center text-sm font-black">02</span>
                                Information We Collect
                            </h2>
                            <p className="text-lg text-[#2A2A2A]/70 leading-relaxed font-medium mb-6">We may collect the following information:</p>
                            <ul className="space-y-4">
                                {["Name", "Email address", "Phone number", "Business details", "Information through contact forms"].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-[#2A2A2A]/80 font-medium group">
                                        <CheckCircle2 className="text-[#2197A1] group-hover:scale-110 transition-transform" size={18} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 03 How We Use Your Information */}
                        <div>
                            <h2 className="!text-2xl font-bold text-[#2A2A2A] mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-[#2197A1]/10 text-[#2197A1] flex items-center justify-center text-sm font-black">03</span>
                                How We Use Your Information
                            </h2>
                            <ul className="space-y-4">
                                {["Respond to inquiries", "Provide services and support", "Improve our website", "Communicate updates", "Analyze performance"].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-[#2A2A2A]/80 font-medium group">
                                        <CheckCircle2 className="text-[#2197A1] group-hover:scale-110 transition-transform" size={18} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 07 Your Rights */}
                        <div>
                            <h2 className="!text-2xl font-bold text-[#2A2A2A] mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-[#2197A1]/10 text-[#2197A1] flex items-center justify-center text-sm font-black">07</span>
                                Your Rights
                            </h2>
                            <ul className="space-y-4">
                                {["Request access to your data", "Request correction or deletion", "Opt out of communications"].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-[#2A2A2A]/80 font-medium group">
                                        <CheckCircle2 className="text-[#2197A1] group-hover:scale-110 transition-transform" size={18} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Us */}
                        <div className="!pb-5 border-t border-[#2197A1]/50 !pt-10">
                            <h2 className="!text-2xl font-bold text-[#2A2A2A] !mt-3">Contact Us</h2>
                            <p className="text-lg text-[#2A2A2A]/70 leading-relaxed font-medium mb-8">If you have any questions about this Privacy Policy, you can contact us:</p>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-black uppercase text-[#e76038] tracking-widest">Email:</span>
                                    <a href="mailto:info@prodbizsolutions.com" className="text-xl font-medium !text-gray-700 hover:text-[#2197A1] transition-colors leading-tight">info@prodbizsolutions.com</a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-black uppercase text-[#e76038] tracking-widest">Phone:</span>
                                    <span className="text-sm font-medium !text-gray-700 leading-tight">+91-8989898989</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FinalCTA />
        </main>
    );
}
