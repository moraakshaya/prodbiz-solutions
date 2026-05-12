"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import FinalCTA from "@/components/FinalCTA";
import Button from "@/components/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import dynamic from "next/dynamic";

const WhoWeAreHero3D = dynamic(() => import("@/components/WhoWeAreHero3D"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function GetProposalPage() {
    const scrollToForm = () => {
        const element = document.getElementById("proposal-form-section");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const [mounted, setMounted] = useState(false);
    
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const paraRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    
    // Form Section Refs
    const formTitleRef = useRef<HTMLHeadingElement>(null);
    const formDescRef = useRef<HTMLParagraphElement>(null);
    const section1Ref = useRef<HTMLDivElement>(null);
    const section2Ref = useRef<HTMLDivElement>(null);
    const section3Ref = useRef<HTMLDivElement>(null);
    const section4Ref = useRef<HTMLDivElement>(null);
    const section5Ref = useRef<HTMLDivElement>(null);
    const formButtonRef = useRef<HTMLDivElement>(null);

    // Right Sidebar Refs
    const rightSideContainerRef = useRef<HTMLDivElement>(null);
    const rightSideH3Ref = useRef<HTMLHeadingElement>(null);
    const rightSideListRef = useRef<HTMLDivElement>(null);
    const rightSideBottomBoxRef = useRef<HTMLDivElement>(null);

    // Final CTA Refs
    const finalCtaH2Ref = useRef<HTMLHeadingElement>(null);
    const finalCtaPRef = useRef<HTMLParagraphElement>(null);
    const finalCtaButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);

        const ctx = gsap.context(() => {
            if (h1Ref.current && spanRef.current && paraRef.current && buttonsRef.current) {
                // Core Entrance Timeline
                const tl = gsap.timeline();

                // Split all P tags within the container into individual lines
                const splitParas = new SplitType(paraRef.current.querySelectorAll("p"), { types: "lines" });

                // 0. Tag Fade In
                if (tagRef.current) {
                    tl.fromTo(
                        tagRef.current,
                        { y: 20, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                        0.1
                    );
                }

                // 1. H1 Slide In
                tl.fromTo(
                    h1Ref.current,
                    { x: -80, opacity: 0 },
                    { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
                    0.2
                );

                // 2. Paragraph (Line-by-line soft fade + slight upward)
                tl.fromTo(
                    splitParas.lines,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" },
                    "-=0.6"
                );

                // 3. Buttons (Subtle fade + stagger)
                tl.fromTo(
                    buttonsRef.current.children,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
                    "-=0.4"
                );

                // Slot-machine roll for "With Confidence"
                const loopTl = gsap.timeline({ repeat: -1, repeatDelay: 1.8, delay: 1.5 });

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

                // --- Form Section Scroll Animations ---
                const formElementsExist = formTitleRef.current && formDescRef.current && 
                                         section1Ref.current && section2Ref.current && 
                                         section3Ref.current && section4Ref.current && 
                                         section5Ref.current && formButtonRef.current;

                if (formElementsExist && rightSideContainerRef.current) {
                    const formHeaderTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: "#proposal-form-section",
                            start: "top 85%",
                            toggleActions: "play none none none"
                        }
                    });

                    formHeaderTl.fromTo(formTitleRef.current!,
                        { x: -60, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
                    ).fromTo(formDescRef.current!,
                        { y: 20, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                        "-=0.4"
                    );

                    formHeaderTl.fromTo(rightSideContainerRef.current!,
                        { scale: 0.95, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
                        "-=0.3"
                    ).fromTo(rightSideH3Ref.current!,
                        { x: 40, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                        "-=0.4"
                    );

                    if (rightSideListRef.current) {
                        formHeaderTl.fromTo(rightSideListRef.current.children,
                            { y: 20, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
                            "-=0.3"
                        );
                    }

                    if (rightSideBottomBoxRef.current) {
                        formHeaderTl.fromTo(rightSideBottomBoxRef.current,
                            { scale: 0.9, opacity: 0 },
                            { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" },
                            "-=0.2"
                        );
                    }

                    // Sections 01 - 05
                    [section1Ref, section2Ref, section3Ref, section4Ref, section5Ref].forEach((ref) => {
                        const tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: ref.current!,
                                start: "top 85%",
                                toggleActions: "play none none none"
                            }
                        });

                        const title = ref.current?.querySelector("h3");
                        const items = ref.current?.querySelectorAll(".grid > div, .flex-col, select, textarea");

                        if (title) {
                            tl.fromTo(title, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
                        }
                        if (items) {
                            tl.fromTo(items, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.3");
                        }
                    });

                    // Submit Button
                    gsap.fromTo(formButtonRef.current!,
                        { y: 20, opacity: 0 },
                        {
                            y: 0, opacity: 1, scrollTrigger: {
                                trigger: formButtonRef.current,
                                start: "top 95%"
                            }
                        }
                    );
                }

                // Final CTA
                if (finalCtaH2Ref.current) {
                    const finalCtaTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: finalCtaH2Ref.current,
                            start: "top 90%"
                        }
                    });
                    finalCtaTl.fromTo(finalCtaH2Ref.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1 });
                    finalCtaTl.fromTo(finalCtaPRef.current!, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.4");
                    finalCtaTl.fromTo(finalCtaButtonRef.current!, { y: 15, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.3");
                }
            }
        });

        return () => ctx.revert();
    }, [mounted]);

    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            {/* Get Proposal Hero Section */}
            <section
                className="hero-section-standard"
            >
                {/* ── 3D Glassmorphism Background ── */}
                <WhoWeAreHero3D showBox={true} stayOpen={true} characterSrc="/images/get-proposal-hero.png" />
                {/* Gradient overlay */}
                <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: "linear-gradient(105deg, rgba(3,14,18,0.72) 0%, rgba(3,14,18,0.45) 50%, transparent 100%)" }} />
                
                {/* Content Container */}
                <div className="relative z-10 w-full max-w-7xl !mx-auto flex md:flex-row flex-col items-center !px-4 md:!px-2 !pt-10 md:!pt-10 gap-8 md:gap-1">
 
                    {/* Hero Content Wrapper */}
                    <div className="w-full md:w-[60%] min-[1150px]:max-[1299px]:w-[35%] flex flex-col items-center md:items-start translate-y-[-20px] !mt-20 md:!mt-0 md:pr-8 md:!pl-8">
                        {/* Tag */}
                        <div ref={tagRef} className="hidden md:inline-flex bg-[#fff]/10 backdrop-blur-md text-[#2197A1] !px-5 !py-1.5 !mt-10 rounded-full text-xs font-bold uppercase tracking-[0.2em] !mb-6 shadow-sm border border-white/5">
                            Project Inquiries
                        </div>

                        {/* Title */}
                        <h1 ref={h1Ref} className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-bold !text-white !mb-2 md:mb-6 leading-tight break-words text-center md:text-left w-full drop-shadow-lg" style={{ perspective: "1000px" }}>
                            Start Your Project <span ref={spanRef} className="text-[#2197A1] inline-block origin-center transform-style-3d" style={{ textShadow: "0 0 30px rgba(33,151,161,0.6)" }}>With Confidence</span>
                        </h1>

                        <div ref={paraRef} className="w-full flex flex-col md:block">
                            <p className="block md:hidden text-base sm:text-base text-white/80 font-medium leading-relaxed text-center mb-8">
                                Share your project details and we&apos;ll craft a customized solution tailored to your goals and budget.
                            </p>

                            <div className="hidden md:block space-y-4 min-[1150px]:max-[1299px]:max-w-xl max-w-2xl mb-1 md:mb-8">
                                <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed">
                                    At Prodbiz Solutions, we believe every vision deserves a high-performance digital strategy. Share your details, and we&apos;ll build a scalable path to your business growth.
                                </p>
                            </div>
                        </div>

                        {/* Button */}
                        <div ref={buttonsRef} className="w-full flex justify-center md:justify-start !mt-2">
                            <Button
                                onClick={scrollToForm}
                                className="hero-btn"
                            >
                                <span>Ready to Start?</span>
                                <ArrowRight size={16} className="md:w-[22px] md:h-[22px]" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section id="proposal-form-section" className="relative w-full !py-20 !px-6 lg:!px-14 flex justify-center z-20 bg-white">
                <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                    {/* Left: Proposal Form */}
                    <div className="w-full lg:w-[60%] flex flex-col">
                        <div className="!mb-10">
                            <h2 ref={formTitleRef} className="text-3xl font-bold text-[#2A2A2A] mb-2">Tell Us About Your Project</h2>
                            <p ref={formDescRef} className="text-gray-500 font-medium">Please fill in the details below and our team will get back to you with a tailored proposal.</p>
                        </div>

                        <form className="flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
                            {/* Section 1: Basic Info */}
                            <div ref={section1Ref} className="space-y-6">
                                <h3 className="text-sm font-black uppercase text-[#2197A1] tracking-widest border-b border-[#2197A1]/20 pb-2">01. Basic Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-[#2A2A2A] ml-1 uppercase tracking-wider">Full Name</label>
                                        <input type="text" suppressHydrationWarning className="w-full bg-[#2197A1]/5 border-2 border-transparent rounded-2xl !px-5 !py-3 focus:border-[#2197A1]/30 focus:bg-white focus:outline-none transition-all" placeholder="Enter your name" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-[#2A2A2A] ml-1 uppercase tracking-wider">Email Address</label>
                                        <input type="email" suppressHydrationWarning className="w-full bg-[#2197A1]/5 border-2 border-transparent rounded-2xl !px-5 !py-3 focus:border-[#2197A1]/30 focus:bg-white focus:outline-none transition-all" placeholder="name@company.com" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-[#2A2A2A] ml-1 uppercase tracking-wider">Phone Number</label>
                                        <input type="tel" suppressHydrationWarning className="w-full bg-[#2197A1]/5 border-2 border-transparent rounded-2xl !px-5 !py-3 focus:border-[#2197A1]/30 focus:bg-white focus:outline-none transition-all" placeholder="+91 XXX XXX XXXX" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-[#2A2A2A] ml-1 uppercase tracking-wider">Company Name</label>
                                        <input type="text" suppressHydrationWarning className="w-full bg-[#2197A1]/5 border-2 border-transparent rounded-2xl !px-5 !py-3 focus:border-[#2197A1]/30 focus:bg-white focus:outline-none transition-all" placeholder="Your organization" />
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Project Type */}
                            <div ref={section2Ref} className="space-y-4">
                                <h3 className="text-sm font-black uppercase text-[#2197A1] tracking-widest border-b border-[#2197A1]/20 pb-2">02. Project Type</h3>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-[#2A2A2A] ml-1 uppercase tracking-wider">What are you looking for?</label>
                                    <select suppressHydrationWarning className="w-full bg-[#2197A1]/5 border-2 border-transparent rounded-2xl !px-5 !py-3 focus:border-[#2197A1]/30 focus:bg-white focus:outline-none appearance-none transition-all text-gray-500 font-medium">
                                        <option value="">Select a service...</option>
                                        <option value="web-design">Website Design & Development</option>
                                        <option value="web-app">Web Application Development</option>
                                        <option value="marketing">Performance Marketing</option>
                                        <option value="branding">Branding & Media</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* Section 3: Project Details */}
                            <div ref={section3Ref} className="space-y-4">
                                <h3 className="text-sm font-black uppercase text-[#2197A1] tracking-widest border-b border-[#2197A1]/20 pb-2">03. Project Details</h3>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-[#2A2A2A] ml-1 uppercase tracking-wider">Tell us about your requirements</label>
                                    <textarea rows={5} suppressHydrationWarning className="w-full bg-[#2197A1]/5 border-2 border-transparent rounded-2xl !px-5 !py-3 focus:border-[#2197A1]/30 focus:bg-white focus:outline-none transition-all" placeholder="Describe your vision..."></textarea>
                                </div>
                            </div>

                            {/* Section 4 & 5 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div ref={section4Ref} className="space-y-4">
                                    <h3 className="text-sm font-black uppercase text-[#2197A1] tracking-widest border-b border-[#2197A1]/20 pb-2">04. Budget</h3>
                                    <select suppressHydrationWarning className="w-full bg-[#2197A1]/5 border-2 border-transparent rounded-2xl !px-5 !py-3 focus:border-[#2197A1]/30 focus:bg-white focus:outline-none appearance-none transition-all text-gray-500 font-medium">
                                        <option value="">Expected Budget Range</option>
                                        <option value="10k-25k">₹10K – ₹25K</option>
                                        <option value="25k-50k">₹25K – ₹50K</option>
                                        <option value="50k-1l">₹50K – ₹1L</option>
                                        <option value="1l+">₹1L+</option>
                                    </select>
                                </div>
                                <div ref={section5Ref} className="space-y-4">
                                    <h3 className="text-sm font-black uppercase text-[#2197A1] tracking-widest border-b border-[#2197A1]/20 pb-2">05. Timeline</h3>
                                    <select suppressHydrationWarning className="w-full bg-[#2197A1]/5 border-2 border-transparent rounded-2xl !px-5 !py-3 focus:border-[#2197A1]/30 focus:bg-white focus:outline-none appearance-none transition-all text-gray-500 font-medium">
                                        <option value="">Expected Launch</option>
                                        <option value="asap">ASAP</option>
                                        <option value="2-4weeks">2–4 Weeks</option>
                                        <option value="1-2months">1–2 Months</option>
                                        <option value="flexible">Flexible</option>
                                    </select>
                                </div>
                            </div>

                            <div ref={formButtonRef}>
                                <Button 
                                    type="submit"
                                    className="contact-submit-btn"
                                >
                                    <span>Get Proposal</span>
                                    <ArrowRight className="arrow-icon" />
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Right: Why Start With Us */}
                    <div className="w-full lg:w-[35%] lg:sticky lg:top-32">
                        <div ref={rightSideContainerRef} className="bg-[#fcfcfc] rounded-[3rem] !p-10 border border-gray-100 shadow-sm relative overflow-hidden group">
                            <h3 ref={rightSideH3Ref} className="text-2xl font-bold text-[#2A2A2A] mb-8 relative z-10">Why Start with Us?</h3>
                            <div ref={rightSideListRef} className="space-y-8 relative z-10">
                                {[
                                    { title: "Tailored Solutions", desc: "Crafted specifically to meet your unique business goals." },
                                    { title: "Scalable Development", desc: "Future-ready architecture that grows with you." },
                                    { title: "Transparent Process", desc: "Clear communication throughout the project." },
                                    { title: "Results Driven", desc: "Focused on high-performance outcomes and ROI." }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4 group/item">
                                        <div className="flex-shrink-0 w-10 h-10 bg-[#2197A1]/10 rounded-xl flex items-center justify-center group-hover/item:bg-[#2197A1] transition-colors">
                                            <CheckCircle2 className="text-[#2197A1] w-6 h-6 group-hover/item:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#2A2A2A] mb-1">{item.title}</h4>
                                            <p className="text-sm text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div ref={rightSideBottomBoxRef} className="mt-12 !p-6 bg-white rounded-2xl border border-[#2197A1]/10 shadow-inner">
                                <p className="text-sm text-gray-500 italic font-medium">
                                    &quot;Our mission is to empower businesses with innovative digital solutions that drive growth.&quot;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="w-full md:!py-20 px-6 bg-[#fcfcfc]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 ref={finalCtaH2Ref} className="text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-4">Need help before starting?</h2>
                    <p ref={finalCtaPRef} className="text-lg text-gray-500 font-medium mb-10">Talk to our team and we’ll guide you through the process.</p>
                    <div ref={finalCtaButtonRef} className="inline-block">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 bg-white border-2 border-[#e76038] !text-[#e76038] !px-8 !py-3 rounded-3xl font-bold text-lg hover:bg-[#e76038] hover:!text-white transition-all transform hover:scale-105"
                        >
                            Talk to an Expert
                            <ArrowRight size={22} />
                        </Link>
                    </div>
                </div>
            </section>

            <FinalCTA />
        </main >
    );
}
