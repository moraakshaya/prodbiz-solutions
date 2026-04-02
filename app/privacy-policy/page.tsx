"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/Button";
import FinalCTA from "@/components/FinalCTA";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function PrivacyPolicyPage() {
    const [mounted, setMounted] = React.useState(false);

    const tagRef = React.useRef<HTMLDivElement>(null);
    const titleRef = React.useRef<HTMLHeadingElement>(null);
    const paraRef = React.useRef<HTMLParagraphElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const imageRef = React.useRef<HTMLDivElement>(null);
    const contentSectionRef = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        setMounted(true);

        if (tagRef.current && titleRef.current && paraRef.current && 
            buttonRef.current && imageRef.current && contentSectionRef.current) {
            
            const tl = gsap.timeline();

            // 1. Legal Tag: Fade + Slide Up
            tl.fromTo(tagRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
            );

            // 2. H1 Title: Slide in from left
            tl.fromTo(titleRef.current,
                { x: -60, opacity: 0 },
                { x: 0, opacity: 1, duration: 1.0, ease: "power3.out" },
                "-=0.6" // Starts Before tag finishes
            );

            // 3. Right side Image: Slide in from right
            tl.fromTo(imageRef.current,
                { x: 60, opacity: 0 },
                { 
                    x: 0, 
                    opacity: 1, 
                    duration: 1.2, 
                    ease: "power3.out",
                    onComplete: () => {
                        if (imageRef.current) {
                            gsap.set(imageRef.current, { clearProps: "transform,opacity" });
                        }
                    }
                },
                "-=0.8" // Starts Before title finishes
            );

            // 4. Paragraph: Fade + Slide Up line by line
            const splitPara = new SplitType(paraRef.current, { types: "lines" });
            tl.fromTo(splitPara.lines,
                { y: 15, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
                "-=0.6" // Starts Before title finishes
            );

            // 5. Button: Fade + Slightly Slide Up
            tl.fromTo(buttonRef.current,
                { y: 15, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                "-=0.5" // Starts Before paragraph finishes
            );

            // 6. Content Section: Fade + Slide Up (ScrollTriggered)
            gsap.fromTo(contentSectionRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.0,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: contentSectionRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );

            return () => {
                if (splitPara) splitPara.revert();
            };
        }
    }, [mounted]);

    return (
        <main className="flex min-h-screen flex-col items-center bg-white overflow-hidden">
            {/* Hero Section - Blog Style Refinement */}
            <section
                className="relative w-full min-h-[75vh] min-[340px]:min-h-[85vh] min-[360px]:min-h-[80vh] min-[380px]:min-h-[65vh] min-[400px]:min-h-[58vh] min-[420px]:min-h-[55vh] min-[760px]:min-h-[66vh] min-[1024px]:min-h-screen flex items-center !pt-16 !pb-10 md:!py-32 overflow-hidden"
                style={{ background: "radial-gradient(circle at 30% 20%, #FFFFFF 0%, #2197A1 100%)" }}
            >
                {/* Background Accents */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2197A1] opacity-10 rounded-full -mr-64 -mt-64 blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#e76038] opacity-5 rounded-full -ml-48 -mb-48 blur-[100px] pointer-events-none"></div>

                {/* Floating Dots */}
                <div className="absolute top-1/4 left-10 w-2 h-2 bg-white/20 rounded-full blur-[1px]"></div>
                <div className="absolute top-1/2 left-20 w-1.5 h-1.5 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-white/5 rounded-full blur-[2px]"></div>
                <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/20 rounded-full"></div>

                <div className="z-10 w-full max-w-7xl !mx-auto !px-6 grid grid-cols-2 gap-3 md:gap-16 items-center">
                    {/* Left Column: Text Content */}
                    <div className="flex flex-col items-start">
                        <div ref={tagRef} className="inline-block bg-white/30 text-[#2197A1] !px-1 md:!px-5 !py-1.5 rounded-full !text-[8px] md:!text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-lg shadow-black/10">
                            Legal & Compliance
                        </div>
                        <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-white !my-4 leading-[1.15] tracking-tight">
                            Privacy <span className="text-[#2197A1]">Policy</span>
                        </h1>
                        <p ref={paraRef} className="text-lg md:text-xl text-[#2a2a2a]/80 font-medium mb-10 max-w-xl leading-relaxed">
                            At Prodbiz Solutions, we value your privacy and are committed to protecting your personal information. This policy explains our data practices.
                        </p>
                        <button ref={buttonRef} className="bg-gradient-to-r from-[#e76038] to-[#ff8c6b] text-white !px-2.5 md:!px-8 !py-2.5 md:!py-3.5 rounded-2xl font-bold text-sm md:text-lg hover:shadow-[0_10px_30px_rgba(231,96,56,0.3)] transition-all transform hover:-translate-y-1 active:scale-95 leading-tight">
                            Start Your Growth
                        </button>
                    </div>

                    {/* Right Column: 3D Visual */}
                    <div ref={imageRef} className="relative group">
                        <div className="absolute -inset-4 bg-white/10 rounded-[2.5rem] blur-2xl group-hover:bg-white/15 transition-all"></div>
                        <div className="relative bg-white/10 backdrop-blur-md rounded-[2.5rem] p-4 border-4 border-white/20 shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-all duration-700 overflow-hidden">
                            <img
                                src="/images/privacy-policy-hero.png"
                                alt="Privacy & Security"
                                className="w-full h-[200px] md:h-[400px] object-cover rounded-[1.8rem] shadow-inner"
                            />
                        </div>
                    </div>
                </div>

                {/* Organic Wavy Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px]">
                    <svg
                        className="relative block w-full h-[100px] md:h-[180px]"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0,0 C200,80 400,0 600,60 C800,120 1000,20 1200,80 L1200,120 L0,120 Z"
                            fill="#ffffff"
                        ></path>
                    </svg>
                </div>
            </section>

            {/* Content Section */}
            <section ref={contentSectionRef} className="w-full py-20 !px-6">
                <div className="max-w-7xl !mx-auto relative">
                    {/* Decorative Blob */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#2197A1]/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 !space-y-10">
                        {/* Introduction */}
                        <div>
                            <h2 className="!text-2xl font-bold text-[#2A2A2A] mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-[#2197A1]/10 text-[#2197A1] flex items-center justify-center text-sm font-black">01</span>
                                Introduction
                            </h2>
                            <div className="space-y-4">
                                <p className="text-lg text-[#2A2A2A]/70 leading-relaxed font-medium">
                                    At Prodbiz Solutions, we value your privacy and are committed to protecting your personal information.
                                    This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website.
                                </p>
                            </div>
                        </div>

                        {/* Information We Collect */}
                        <div>
                            <h2 className="!text-2xl font-bold text-[#2A2A2A] mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-[#2197A1]/10 text-[#2197A1] flex items-center justify-center text-sm font-black">02</span>
                                Information We Collect
                            </h2>
                            <p className="text-lg text-[#2A2A2A]/70 leading-relaxed font-medium mb-6">
                                We may collect the following information:
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Name",
                                    "Email address",
                                    "Phone number",
                                    "Business details (if provided)",
                                    "Any information submitted through contact forms"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-[#2A2A2A]/80 font-medium group">
                                        <CheckCircle2 className="text-[#2197A1] group-hover:scale-110 transition-transform" size={18} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-lg text-[#2A2A2A]/70 leading-relaxed font-medium mt-8">
                                We may also collect non-personal data such as browser type, device information, and website usage through analytics tools.
                            </p>
                        </div>

                        {/* How We Use Your Information */}
                        <div>
                            <h2 className="!text-2xl font-bold text-[#2A2A2A] mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-[#2197A1]/10 text-[#2197A1] flex items-center justify-center text-sm font-black">03</span>
                                How We Use Your Information
                            </h2>
                            <p className="text-lg text-[#2A2A2A]/70 leading-relaxed font-medium mb-6">
                                We use the collected information to:
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Respond to your inquiries",
                                    "Provide services and support",
                                    "Improve our website and user experience",
                                    "Communicate updates or relevant information",
                                    "Analyze website performance"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-[#2A2A2A]/80 font-medium group">
                                        <CheckCircle2 className="text-[#2197A1] group-hover:scale-110 transition-transform" size={18} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Cookies & Tracking Technologies */}
                        <div>
                            <h2 className="!text-2xl font-bold text-[#2A2A2A] mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-[#2197A1]/10 text-[#2197A1] flex items-center justify-center text-sm font-black">04</span>
                                Cookies & Tracking Technologies
                            </h2>
                            <div className="space-y-4">
                                <p className="text-lg text-[#2A2A2A]/70 leading-relaxed font-medium">
                                    Our website may use cookies and tracking tools such as analytics services to understand user behavior and improve performance.
                                </p>
                                <p className="text-lg text-[#2A2A2A]/70 leading-relaxed font-medium">
                                    You can disable cookies through your browser settings.
                                </p>
                            </div>
                        </div>

                        {/* Data Protection */}
                        <div>
                            <h2 className="!text-2xl font-bold text-[#2A2A2A] mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-[#2197A1]/10 text-[#2197A1] flex items-center justify-center text-sm font-black">05</span>
                                Data Protection
                            </h2>
                            <p className="text-lg text-[#2A2A2A]/70 leading-relaxed font-medium">
                                We take appropriate security measures to protect your personal information from unauthorized access, misuse, or disclosure.
                            </p>
                        </div>

                        {/* Third-Party Services */}
                        <div>
                            <h2 className="!text-2xl font-bold text-[#2A2A2A] mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-[#2197A1]/10 text-[#2197A1] flex items-center justify-center text-sm font-black">06</span>
                                Third-Party Services
                            </h2>
                            <p className="text-lg text-[#2A2A2A]/70 leading-relaxed font-medium">
                                We may use third-party tools such as analytics or marketing platforms that may collect information in accordance with their own privacy policies.
                            </p>
                        </div>

                        {/* Your Rights */}
                        <div>
                            <h2 className="!text-2xl font-bold text-[#2A2A2A] mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-[#2197A1]/10 text-[#2197A1] flex items-center justify-center text-sm font-black">07</span>
                                Your Rights
                            </h2>
                            <p className="text-lg text-[#2A2A2A]/70 leading-relaxed font-medium mb-6">
                                You have the right to:
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Request access to your data",
                                    "Request correction or deletion of your data",
                                    "Opt out of communications"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-[#2A2A2A]/80 font-medium group">
                                        <CheckCircle2 className="text-[#2197A1] group-hover:scale-110 transition-transform" size={18} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Us */}
                        <div className="!pb-5 border-t border-[#2197A1]/50">
                            <h2 className="!text-2xl font-bold text-[#2A2A2A] !mt-3">Contact Us</h2>
                            <p className="text-lg text-[#2A2A2A]/70 leading-relaxed font-medium mb-8">
                                If you have any questions about this Privacy Policy, you can contact us:
                            </p>
                            <div className="flex flex-col !gap-0 md:!gap-4">
                                <div className="flex flex-row gap-2">
                                    <span className="text-sm font-black uppercase text-[#e76038] tracking-widest">Email:</span>
                                    <a href="mailto:info@prodbizsolutions.com" className="text-xl font-medium !text-gray-700 hover:text-[#2197A1] transition-colors leading-tight">info@prodbizsolutions.com</a>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <span className="text-sm font-black uppercase text-[#e76038] tracking-widest">Phone:</span>
                                    <span className="text-sm font-medium !text-gray-700 leading-tight">+91-8989898989</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
