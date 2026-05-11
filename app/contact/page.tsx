"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import FinalCTA from "@/components/FinalCTA";
import Button from "@/components/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import dynamic from "next/dynamic";

const WhoWeAreHero3D = dynamic(() => import("@/components/WhoWeAreHero3D"), { ssr: false });
import SocialIconsRoll from "@/components/SocialIconsRoll";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
    const scrollToContactForm = () => {
        const element = document.getElementById("contact-form-section");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const [mounted, setMounted] = useState(false);
    
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const paraRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    // Form Section Refs (Left)
    const contactFormTitleRef = useRef<HTMLHeadingElement>(null);
    const contactFormParaRef = useRef<HTMLParagraphElement>(null);
    const contactFormRef = useRef<HTMLFormElement>(null);
    const contactSubmitBtnRef = useRef<HTMLDivElement>(null);

    // Info Section Refs (Right)
    const infoTitleRef = useRef<HTMLHeadingElement>(null);
    const infoParaRef = useRef<HTMLParagraphElement>(null);
    const benefitsListRef = useRef<HTMLDivElement>(null);
    const contactCardsRef = useRef<HTMLDivElement>(null);
    const contactMapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);

        if (h1Ref.current && spanRef.current && paraRef.current && buttonsRef.current) {
            // Core Entrance Timeline
            const tl = gsap.timeline();

            // Split all P tags within the container into individual lines
            const splitParas = new SplitType(paraRef.current.querySelectorAll("p"), { types: "lines" });

            // 1. H1 Slide In
            tl.fromTo(
                h1Ref.current,
                { x: -80, opacity: 0 },
                { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
                0.2 // Starts at 0.2s absolute
            );

            // 2. Paragraph (Line-by-line soft fade + slight upward)
            tl.fromTo(
                splitParas.lines,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
                "-=0.6" // Starts 0.6s before H1 completes
            );

            // 3. Buttons (Subtle fade + stagger)
            tl.fromTo(
                buttonsRef.current.children,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
                "-=0.4" // Starts 0.4s before paragraph completes
            );

            // Slot-machine roll for "Touch"
            const loopTl = gsap.timeline({ repeat: -1, repeatDelay: 1.5, delay: 1.0 });

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

            // --- Contact Section Scroll Animations ---
            const contactElementsExist = contactFormTitleRef.current && contactFormParaRef.current && 
                                       contactFormRef.current && contactSubmitBtnRef.current &&
                                       infoTitleRef.current && infoParaRef.current && 
                                       benefitsListRef.current;

            if (contactElementsExist) {
                // Main Section Timeline
                const sectionTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: "#contact-form-section",
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });

                // LEFT SIDE SEQUENCE
                sectionTl.fromTo(contactFormTitleRef.current!,
                    { x: -50, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
                ).fromTo(contactFormParaRef.current!,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                    "-=0.4"
                );

                // Form Fields (Pop-up staggered)
                const formFields = contactFormRef.current?.querySelectorAll(".flex-col");
                if (formFields) {
                    sectionTl.fromTo(formFields,
                        { scale: 0.95, y: 15, opacity: 0 },
                        { scale: 1, y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
                        "-=0.3"
                    );
                }

                sectionTl.fromTo(contactSubmitBtnRef.current!,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" },
                    "-=0.2"
                );

                // RIGHT SIDE SEQUENCE (Starts in parallel with left)
                const rightTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: "#contact-form-section",
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });

                rightTl.fromTo(infoTitleRef.current!,
                    { x: 50, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
                );

                rightTl.fromTo(infoParaRef.current!,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                    "-=0.4"
                );

                if (benefitsListRef.current) {
                    rightTl.fromTo(benefitsListRef.current.children,
                        { y: 20, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" },
                        "-=0.3"
                    );
                }

                // 3. Contact Info Cards & Map (Pop-up staggered + Fade reveal)
                if (contactCardsRef.current && contactMapRef.current) {
                    const cardsMapTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: "#contact-info-map-section",
                            start: "top 85%",
                            toggleActions: "play none none none"
                        }
                    });

                    cardsMapTl.fromTo(contactCardsRef.current.children,
                        { scale: 0.85, y: 30, opacity: 0 },
                        {
                            scale: 1,
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            stagger: 0.2,
                            ease: "back.out(1.7)",
                            onComplete: function() {
                                // Clear props to let Tailwind hover work
                                gsap.set(this.targets(), { clearProps: "transform" });
                            }
                        }
                    ).fromTo(contactMapRef.current,
                        { y: 40, opacity: 0 },
                        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                        "-=0.4" // Starts just before the 3rd card finishes
                    );
                }
            }

            return () => {
                splitParas.revert();
            };
        }
    }, [mounted]);

    return (
        <main className="flex min-h-screen flex-col items-center">
            {/* Contact Hero Section */}
            <section
                className="hero-section-standard"
            >
                {/* ── 3D Glassmorphism Background ── */}
                <WhoWeAreHero3D />
                
                {/* Mobile Social Icons Roll (Centered Background) */}
                <div className="block md:hidden absolute inset-0 z-0 opacity-40 flex items-center justify-center h-full">
                    <SocialIconsRoll />
                </div>

                {/* Gradient overlay: ensures left-side text stays readable */}
                <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: "linear-gradient(105deg, rgba(3,14,18,0.72) 0%, rgba(3,14,18,0.45) 50%, transparent 100%)" }} />
                
                {/* Content Container */}
                <div className="relative z-10 w-full max-w-7xl !mx-auto flex md:flex-row flex-col items-center !px-4 md:!px-2 !pt-10 md:!pt-10 gap-8 md:gap-1">
  
                    {/* Hero Content Wrapper */}
                    <div className="w-full md:w-[60%] min-[1150px]:max-[1299px]:w-[45%] flex flex-col items-center md:items-start translate-y-[-20px] !mt-20 md:pr-8 md:!pl-8">
                        {/* Title: Centered on Mobile */}
                        <h1 ref={h1Ref} className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-bold !text-white !mb-2 md:mb-6 leading-tight break-words text-center md:text-left w-full drop-shadow-lg" style={{ perspective: "1000px" }}>
                            Get In <span ref={spanRef} className="text-[#2197A1] inline-block origin-center transform-style-3d" style={{ textShadow: "0 0 30px rgba(33,151,161,0.6)" }}>Touch</span>
                        </h1>
 
                        <div ref={paraRef} className="w-full flex flex-col md:block">
                            {/* Short mobile content */}
                            <p className="block md:hidden text-base sm:text-base text-white/80 font-medium leading-relaxed text-center mb-8">
                                At Prodbiz Solutions, we are dedicated to helping your business thrive. Reach out today and let&apos;s build the future together.
                            </p>
 
                            {/* Desktop content */}
                            <div className="hidden md:block space-y-4 max-w-3xl mb-1 md:mb-8">
                                <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed">
                                    At Prodbiz Solutions, we are dedicated to helping your business thrive. Whether you have an inquiry or want to explore our marketing expertise, our team is ready to listen.
                                </p>
                            </div>
                        </div>
 
                        {/* Button: Centered on Mobile */}
                        <div ref={buttonsRef} className="w-full flex justify-center md:justify-start !mt-2">
                            <Button
                                onClick={scrollToContactForm}
                                className="inline-flex items-center gap-2 md:gap-3 bg-[#e76038] !text-white !px-3 md:!px-6 !py-1.5 md:!py-3 rounded-xl md:rounded-3xl font-bold !text-[12px] md:!text-[16px] hover:bg-[#e76038]/90 transition-all transform hover:scale-100 active:scale-95 shadow-md md:shadow-2xl relative z-10"
                            >
                                <span>Ready to talk?</span>
                                <ArrowRight size={16} className="md:w-[22px] md:h-[22px]" />
                            </Button>
                        </div>
                    </div>
 
                    {/* Desktop Right Side: Social Icons Roll Animation */}
                    <div className="hidden md:flex w-[40%] min-[1150px]:max-[1299px]:w-[55%] justify-center items-center h-full">
                        <SocialIconsRoll />
                    </div>
                </div>
            </section>

            {/* Split Interaction Section */}
            <section id="contact-form-section" className="relative w-full min-h-[80vh] bg-white py-20 !px-6 lg:px-24 flex justify-center -mt-10 lg:-mt-20 z-20">
                <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">

                    {/* Left: Contact Form */}
                    <div className="w-full lg:w-1/2 flex flex-col z-10 relative">
                        <div className="w-full !p-4 md:!p-8">
                            <div className="mb-10 text-center sm:text-left">
                                <h3 ref={contactFormTitleRef} className="text-[#2A2A2A] !mb-1 tracking-tight">Send a message</h3>
                                <p ref={contactFormParaRef} className="text-gray-500 font-medium">We&apos;ll get back to you as soon as possible.</p>
                            </div>

                            <form id="contact-form" ref={contactFormRef} className="flex flex-col gap-5 sm:gap-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="text-sm font-bold text-[#2A2A2A] ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        suppressHydrationWarning
                                        className="w-full bg-[#2197A1]/10 text-[#2A2A2A] rounded-2xl !px-5 !py-2 border-2 border-[#2197A1]/10 focus:border-[#2197A1]/30 focus:bg-[#2197A1]/10 focus:outline-none focus:ring-2 focus:ring-[#2197A1]/10 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
                                    <div className="flex flex-col gap-2 w-full sm:w-1/2">
                                        <label htmlFor="email" className="text-sm font-bold text-[#2A2A2A] ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            suppressHydrationWarning
                                            className="w-full bg-[#2197A1]/10 text-[#2A2A2A] rounded-2xl !px-5 !py-2 border-2 border-[#2197A1]/10 focus:border-[#2197A1]/30 focus:bg-[#2197A1]/10 focus:outline-none focus:ring-2 focus:ring-[#2197A1]/10 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full sm:w-1/2">
                                        <label htmlFor="phone" className="text-sm font-bold text-[#2A2A2A] ml-1">Phone Number <span className="text-gray-400 font-normal">(Optional)</span></label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            suppressHydrationWarning
                                            className="w-full bg-[#2197A1]/10 text-[#2A2A2A] rounded-2xl !px-5 !py-2 border-2 border-[#2197A1]/10 focus:border-[#2197A1]/30 focus:bg-[#2197A1]/10 focus:outline-none focus:ring-2 focus:ring-[#2197A1]/10 transition-all"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="message" className="text-sm font-bold text-[#2A2A2A] ml-1">How can we help you?</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        suppressHydrationWarning
                                        className="w-full bg-[#2197A1]/10 text-[#2A2A2A] rounded-2xl !px-5 !py-2 border-2 border-[#2197A1]/10 focus:border-[#2197A1]/30 focus:bg-[#2197A1]/10 focus:outline-none focus:ring-2 focus:ring-[#2197A1]/10 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
                                        placeholder="Tell us about your project..."
                                    ></textarea>
                                </div>

                                <div ref={contactSubmitBtnRef} className="mt-4">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="md"
                                        className="w-full group shadow-[0_10px_20px_rgba(231,96,56,0.3)] !rounded-2xl"
                                    >
                                        <span className="relative z-10 flex items-center gap-2 text-md md:text-lg">
                                            Send Message
                                            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right: Info Section */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 md:px-12 py-10 lg:py-0">
                        <div className="max-w-md ml-auto mr-auto lg:mr-0 lg:ml-8">
                            <h3 ref={infoTitleRef} className="text-4xl md:text-5xl font-bold text-[#2A2A2A] mb-4 leading-tight">
                                Let&apos;s talk about<br />
                                <span className="text-[#2197A1]">your project</span>
                            </h3>
                            <p ref={infoParaRef} className="text-gray-600 mb-10 text-lg">
                                Whether you have a clear vision or need help defining your strategy, we&apos;re here to guide you to success.
                            </p>

                            <div ref={benefitsListRef} className="flex flex-col gap-2">
                                <div className="flex items-start gap-5 group cursor-default p-4 rounded-3xl transition-all duration-300 hover:bg-orange-50/50 hover:-translate-y-1">
                                    <div className="flex-shrink-0 w-14 h-14 bg-orange-50 group-hover:bg-[#e76038] transition-colors duration-300 flex items-center justify-center rounded-2xl shadow-sm border border-orange-100">
                                        <span className="text-[#e76038] group-hover:text-white transition-colors duration-300 text-2xl">⚡</span>
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-xl font-bold text-[#2A2A2A] mb-1">Fast Response</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">We aim to respond to all inquiries within 24 hours.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5 group cursor-default p-4 rounded-3xl transition-all duration-300 hover:bg-teal-50/50 hover:-translate-y-1">
                                    <div className="flex-shrink-0 w-14 h-14 bg-teal-50 group-hover:bg-[#2197A1] transition-colors duration-300 flex items-center justify-center rounded-2xl shadow-sm border border-teal-100">
                                        <span className="text-[#2197A1] group-hover:text-white transition-colors duration-300 text-2xl">📩</span>
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-xl font-bold text-[#2A2A2A] mb-1">Dedicated Team</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">Direct access to experts who will personally handle your case.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5 group cursor-default p-4 rounded-3xl transition-all duration-300 hover:bg-gray-50/50 hover:-translate-y-1">
                                    <div className="flex-shrink-0 w-14 h-14 bg-gray-50 group-hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center rounded-2xl shadow-sm border border-gray-200">
                                        <span className="text-gray-600 group-hover:text-white transition-colors duration-300 text-2xl">🔒</span>
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-xl font-bold text-[#2A2A2A] mb-1">Secure Form</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">Your information is strictly confidential and protected.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Info & Map Section */}
            <section id="contact-info-map-section" className="w-full bg-white !py-5 !px-6 sm:px-12">
                <div className="w-full !mx-auto flex flex-col !gap-1 items-center">
                    <div ref={contactCardsRef} className="w-full  flex flex-col sm:flex-row gap-4 md:gap-8 items-center justify-center flex-wrap !pb-10">
                        <div className="relative flex-shrink-0 w-[260px] h-[250px] bg-white rounded-[3rem] border border-gray-200 p-8 flex flex-col items-center justify-center text-center group transform transition-all duration-300 hover:-translate-y-2 cursor-default overflow-hidden">
                            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[6px] border-l-[6px] border-[#e76038] rounded-bl-[3rem]"></div>
                            <p className="text-[#2197A1] font-bold text-xs uppercase tracking-widest mb-2">01 OUR OFFICE</p>
                            <h4 className="text-[#2A2A2A] font-bold text-lg mb-4">Location</h4>
                            <p className="text-gray-500 text-xs leading-relaxed">
                                St. Peter&apos;s Tech Park<br />
                                Madhapur, HITEC City<br />
                                Hyderabad, Telangana<br />
                                – 500081
                            </p>
                        </div>
                        <div className="relative flex-shrink-0 w-[260px] h-[250px] bg-white rounded-[3rem] border border-gray-200 p-8 flex flex-col items-center justify-center text-center group transform transition-all duration-300 hover:-translate-y-2 cursor-default overflow-hidden mt-8 sm:mt-12">
                            <div className="absolute top-0 left-0 w-16 h-16 border-t-[6px] border-l-[6px] border-[#e76038] rounded-tl-[3rem]"></div>
                            <p className="text-[#2197A1] font-bold text-xs uppercase tracking-widest mb-2">02 WORKING HOURS</p>
                            <h4 className="text-[#2A2A2A] font-bold text-lg mb-4">Schedule</h4>
                            <p className="text-gray-500 text-xs leading-relaxed">
                                <span className="font-medium text-gray-700">Mon – Fri :</span> 9 AM – 6 PM<br />
                                <span className="font-medium text-gray-700">Saturday :</span> 10 AM – 2 PM<br />
                                <span className="font-medium text-gray-700">Sunday :</span> Closed
                            </p>
                        </div>
                        <div className="relative flex-shrink-0 w-[260px] h-[250px] bg-white rounded-[3rem] border border-gray-200 p-8 flex flex-col items-center justify-center text-center group transform transition-all duration-300 hover:-translate-y-2 cursor-default overflow-hidden">
                            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[6px] border-l-[6px] border-[#e76038] rounded-bl-[3rem]"></div>
                            <p className="text-[#2197A1] font-bold text-xs uppercase tracking-widest mb-2">03 CONTACT US</p>
                            <h4 className="text-[#2A2A2A] font-bold text-lg mb-4">Reach Out</h4>
                            <p className="text-gray-500 text-xs leading-relaxed">
                                <span className="font-medium text-gray-700">Phone No:</span> +91 98765 43210<br />
                                <span className="font-medium text-gray-700">Email:</span> hello@company.com
                            </p>
                        </div>
                    </div>

                    <div ref={contactMapRef} className="w-full lg:w-[88%] min-h-[400px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(33,151,161,0.15)] relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.244504437476!2d78.37615831484326!3d17.447190988034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dbb1d60e71%3A0x3de8b4c0e7f6e12e!2sMadhapur%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                            className="w-full h-full absolute inset-0"
                            style={{ border: 0, minHeight: '400px' }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-md z-10 flex items-center gap-2 pointer-events-none">
                            <span className="text-[#e76038] text-lg">📍</span>
                            <div>
                                <p className="text-[#2A2A2A] font-bold text-xs">HITEC City</p>
                                <p className="text-gray-500 text-[10px]">Hyderabad, Telangana</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <FinalCTA />
        </main>
    );
}
