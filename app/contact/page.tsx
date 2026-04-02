"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import FinalCTA from "@/components/FinalCTA";
import Button from "@/components/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
    const scrollToContactForm = () => {
        const element = document.getElementById("contact-form-section");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const [mounted, setMounted] = React.useState(false);
    
    const h1Ref = React.useRef<HTMLHeadingElement>(null);
    const spanRef = React.useRef<HTMLSpanElement>(null);
    const paraRef = React.useRef<HTMLDivElement>(null);
    const buttonsRef = React.useRef<HTMLDivElement>(null);
    const heroImageRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
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

            // 4. Hero Image (Slide from right + slight scale)
            tl.fromTo(
                ".hero-image-animate",
                { x: 100, scale: 0.9, opacity: 0 },
                { x: 0, scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
                1.0 // Standard timing
            );

            // 5. Floating Animation loops after the entrance
            gsap.to(".hero-image-animate", {
                y: -15,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                delay: 2.2
            });

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

            return () => {
                splitParas.revert();
            };
        }
    }, [mounted]);

    return (
        <main className="flex min-h-screen flex-col items-center">
            {/* Contact Hero Section */}
            <section
                className="relative w-full min-h-[75vh] min-[340px]:min-h-[60vh] min-[360px]:min-h-[75vh] min-[380px]:min-h-[60vh] min-[400px]:min-h-[58vh] min-[540px]:min-h-[68vh] min-[760px]:min-h-[66vh] min-[1024px]:min-h-screen flex items-center overflow-hidden"
                style={{ background: "radial-gradient(circle at top, #FFFFFF 0%, #2197A1 100%)" }}
            >
                {/* Content Container */}
                <div className="z-10 w-full max-w-7xl !mx-auto flex md:flex-row flex-col items-center !px-4 md:px-2 !pt-10 md:!pt-10 gap-8 md:gap-1">

                    {/* Hero Content Wrapper */}
                    <div className="w-full md:w-[70%] flex flex-col items-center md:items-start translate-y-[-20px] md:pr-0">
                        {/* Title: Centered on Mobile */}
                        <h1 ref={h1Ref} className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[#2A2A2A] !mb-2 md:mb-6 leading-tight break-words text-center md:text-left w-full" style={{ perspective: "1000px" }}>
                            Get In <span ref={spanRef} className="text-[#2197A1] inline-block origin-center transform-style-3d">Touch</span>
                        </h1>

                        <div ref={paraRef} className="w-full flex flex-col md:block">
                            {/* Short mobile content: Centered as requested */}
                            <p className="block md:hidden text-base sm:text-base text-[#2A2A2A]/80 font-medium leading-snug text-center mb-8">
                                At Prodbiz Solutions, we are dedicated to helping your business thrive. Reach out today and let&apos;s build a high-performance digital future together.
                            </p>

                            {/* Desktop long content */}
                            <div className="hidden md:block">
                                <p className="text-lg md:text-xl text-[#2A2A2A]/80 font-medium leading-relaxed max-w-4xl mb-1 md:mb-8">
                                    At Prodbiz Solutions, we are dedicated to helping your business thrive in the digital age.
                                    Whether you have a specific project inquiry, a comprehensive proposal, or simply want to explore
                                    how our technology and marketing expertise can benefit your brand, our team is ready to listen.
                                    Reach out to us today, and together we can build a high-performance digital future that drives
                                    measurable results and lasting success for your organization.
                                </p>
                            </div>
                        </div>

                        {/* Mobile Image: Rendered below content on mobile */}
                        <div className="md:hidden w-full flex justify-center !mt-4 !mb-8 h-[100px] relative hero-image-animate">
                            {/* Ambient Glow */}
                            <div className="absolute inset-x-0 bottom-0 top-10 bg-gradient-to-t from-[#2197A1] to-transparent rounded-[4rem] blur-[60px] opacity-20 pointer-events-none"></div>
                            <Image
                                src="/images/contact-hero.png"
                                alt="Contact Prodbiz"
                                fill
                                className="object-contain drop-shadow-xl scale-125"
                                priority
                            />
                        </div>

                        {/* Button: Centered on Mobile */}
                        <div ref={buttonsRef} className="w-full flex justify-center md:justify-start">
                            <Button
                                onClick={scrollToContactForm}
                                className="inline-flex items-center gap-2 md:gap-3 bg-[#e76038] !text-white !px-6 md:!px-6 !py-3 md:!py-3 rounded-xl md:rounded-3xl font-bold text-lg md:text-lg hover:bg-[#e76038]/90 transition-all transform hover:scale-100 active:scale-95 shadow-md md:shadow-2xl relative z-10"
                            >
                                <span>Ready to talk?</span>
                                <ArrowRight size={16} className="md:w-[22px] md:h-[22px]" />
                            </Button>
                        </div>
                    </div>

                    {/* Right Side Image Placeholder - Hidden on Mobile */}
                    <div className="hidden md:flex w-[40%] md:w-[30%] justify-center items-center h-full min-h-[300px] md:min-h-[400px] relative hero-image-animate">
                        <Image
                            src="/images/contact-hero.png"
                            alt="Contact Prodbiz"
                            width={500}
                            height={500}
                            priority
                            className="w-full h-auto object-contain drop-shadow-xl md:scale-125"
                        />
                    </div>
                </div>

                {/* Bottom 3D Drip Border */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px] flex justify-center">
                    <svg
                        className="relative block w-[300%] sm:w-[200%] lg:w-[150%] xl:w-[calc(100%+1.3px)] h-[70px] md:h-[100px] lg:h-[140px] flex-shrink-0"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <filter id="inner-shadow">
                                <feOffset dx="0" dy="5" />
                                <feGaussianBlur stdDeviation="4" result="offset-blur" />
                                <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                                <feFlood floodColor="black" floodOpacity="0.3" result="color" />
                                <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                                <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                            </filter>
                        </defs>
                        <path
                            d="M 0,120 L 0,0 C 10,0 20,10 20,30 C 18,50 32,50 30,30 C 30,10 40,0 50,0 C 60,0 70,40 70,80 C 68,100 82,100 80,80 C 80,40 90,0 100,0 C 110,0 120,20 120,40 C 118,60 132,60 130,40 C 130,20 140,0 150,0 C 160,0 170,50 170,100 C 168,120 182,120 180,100 C 180,50 190,0 200,0 C 210,0 220,10 220,20 C 218,40 232,40 230,20 C 230,10 240,0 250,0 C 260,0 270,30 270,60 C 268,80 282,80 280,60 C 280,30 290,0 300,0 C 310,0 320,45 320,90 C 318,110 332,110 330,90 C 330,45 340,0 350,0 C 360,0 370,10 370,30 C 368,50 382,50 380,30 C 380,10 390,0 400,0 C 410,0 420,35 420,70 C 418,90 432,90 430,70 C 430,35 440,0 450,0 C 460,0 470,25 470,50 C 468,70 482,70 480,50 C 480,25 490,0 500,0 C 510,0 520,50 520,95 C 518,115 532,115 530,95 C 530,50 540,0 550,0 C 560,0 570,20 570,40 C 568,60 582,60 580,40 C 580,20 590,0 600,0 C 610,0 620,40 620,80 C 618,100 632,100 630,80 C 630,40 640,0 650,0 C 660,0 670,10 670,20 C 668,40 682,40 680,20 C 680,10 690,0 700,0 C 710,0 720,35 720,70 C 718,90 732,90 730,70 C 730,35 740,0 750,0 C 760,0 770,45 770,90 C 768,110 782,110 780,90 C 780,45 790,0 800,0 C 810,0 820,20 820,40 C 818,60 832,60 830,40 C 830,20 840,0 850,0 C 860,0 870,50 870,100 C 868,120 882,120 880,100 C 880,50 890,0 900,0 C 910,0 920,10 920,30 C 918,50 932,50 930,30 C 930,10 940,0 950,0 C 960,0 970,40 970,80 C 968,100 982,100 980,80 C 980,40 990,0 1000,0 C 1010,0 1020,25 1020,50 C 1018,70 1032,70 1030,50 C 1030,25 1040,0 1050,0 C 1060,0 1070,10 1070,20 C 1068,40 1082,40 1080,20 C 1080,10 1090,0 1100,0 C 1110,0 1120,35 1120,70 C 1118,90 1132,90 1130,70 C 1130,35 1140,0 1150,0 C 1160,0 1170,45 1170,90 C 1168,110 1182,110 1180,90 C 1180,45 1190,0 1200,0 L 1200,120 Z"
                            fill="#ffffff"
                            filter="url(#inner-shadow)"
                        ></path>
                    </svg>
                </div>

            </section>

            {/* Split Interaction Section */}
            <section id="contact-form-section" className="relative w-full min-h-[80vh] bg-white py-20 !px-6 lg:px-24 flex justify-center -mt-10 lg:-mt-20 z-20">
                <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">

                    {/* Left: Contact Form (3D Neumorphic / Glassmorphic card) */}
                    <div className="w-full lg:w-1/2 flex flex-col z-10 relative">
                        {/* More pronounced glassmorphism wrapper with Light Teal focus */}
                        <div className="w-full !p-4 md:!p-8">

                            <div className="mb-10 text-center sm:text-left">
                                <h3 className="text-[#2A2A2A] !mb-1 tracking-tight">Send a message</h3>
                                <p className="text-gray-500 font-medium">We&apos;ll get back to you as soon as possible.</p>
                            </div>

                            <form id="contact-form" className="flex flex-col gap-5 sm:gap-6" onSubmit={(e) => e.preventDefault()}>
                                {/* Split row for Name & Phone if desired, or keep stacked. Keeping stacked for simplicity but adjusting spacing */}

                                {/* Name Input */}
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
                                    {/* Email Input */}
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

                                    {/* Phone Input */}
                                    <div className="flex flex-col gap-2 w-full sm:w-1/2">
                                        <label htmlFor="phone" className="text-sm font-bold text-[#2A2A2A] ml-1">Phone Number <span className="text-gray-400 font-normal">(Optional)</span></label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            suppressHydrationWarning
                                            className="w-full bg-[#2197A1]/10 text-[#2A2A2A] rounded-2xl !px-5 !py-2 border-2 border-[#2197A1]/10 focus:border-[#2197A1]/30 focus:bg-[#2197A1]/10 focus:outline-none focus:ring-2 focus:ring-[#2197A1]/10 transition-all shadow-[inset_0_2_4px_rgba(0,0,0,0.01)]"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>

                                {/* Message Textarea */}
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

                                {/* 3D Submit Button */}
                                <div className="mt-4">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="md"
                                        className="w-full group shadow-[0_10px_20px_rgba(231,96,56,0.3)] !rounded-2xl"
                                    >
                                        <span className="relative z-10 flex items-center gap-2 text-md md:text-lg">
                                            Send Message
                                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </span>
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right: Info / Value Proposition Section */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 md:px-12 py-10 lg:py-0">
                        <div className="max-w-md ml-auto mr-auto lg:mr-0 lg:ml-8">
                            <h3 className="text-4xl md:text-5xl font-bold text-[#2A2A2A] mb-4 leading-tight">
                                Let&apos;s talk about<br />
                                <span className="text-[#2197A1]">your project</span>
                            </h3>
                            <p className="text-gray-600 mb-10 text-lg">
                                Whether you have a clear vision or need help defining your strategy, we&apos;re here to guide you to success.
                            </p>

                            <div className="flex flex-col gap-2">
                                {/* Benefit 1 */}
                                <div className="flex items-start gap-5 group">
                                    <div className="flex-shrink-0 w-14 h-14 bg-orange-50 group-hover:bg-[#e76038] transition-colors duration-300 flex items-center justify-center rounded-2xl shadow-sm border border-orange-100">
                                        <span className="text-[#e76038] group-hover:text-white transition-colors duration-300 text-2xl">⚡</span>
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-xl font-bold text-[#2A2A2A] mb-1">Fast Response</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">We aim to respond to all inquiries within 24 hours.</p>
                                    </div>
                                </div>

                                {/* Benefit 2 */}
                                <div className="flex items-start gap-5 group">
                                    <div className="flex-shrink-0 w-14 h-14 bg-teal-50 group-hover:bg-[#2197A1] transition-colors duration-300 flex items-center justify-center rounded-2xl shadow-sm border border-teal-100">
                                        <span className="text-[#2197A1] group-hover:text-white transition-colors duration-300 text-2xl">📩</span>
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-xl font-bold text-[#2A2A2A] mb-1">Dedicated Team</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">Direct access to experts who will personally handle your case.</p>
                                    </div>
                                </div>

                                {/* Benefit 3 */}
                                <div className="flex items-start gap-5 group">
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
            <section className="w-full bg-white !py-5 !px-6 sm:px-12">
                <div className="w-full !mx-auto flex flex-col !gap-1 items-center">

                    {/* LEFT: 3 Redesigned Sticky-Note Cards — 66% */}
                    <div className="w-full  flex flex-col sm:flex-row gap-4 md:gap-8 items-center justify-center flex-wrap !pb-10">

                        {/* Card 1: Our Office — Orange Bottom-Left Accent */}
                        <div className="relative flex-shrink-0 w-[260px] h-[250px] bg-white rounded-[3rem] border border-gray-200 p-8 flex flex-col items-center justify-center text-center group transform transition-all duration-300 hover:-translate-y-2 cursor-default overflow-hidden">
                            {/* Thick Corner Accent */}
                            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[6px] border-l-[6px] border-[#e76038] rounded-bl-[3rem]"></div>

                            {/* Label */}
                            <p className="text-[#2197A1] font-bold text-xs uppercase tracking-widest mb-2">01 OUR OFFICE</p>

                            {/* Heading */}
                            <h4 className="text-[#2A2A2A] font-bold text-lg mb-4">Location</h4>

                            {/* Text */}
                            <p className="text-gray-500 text-xs leading-relaxed">
                                St. Peter&apos;s Tech Park<br />
                                Madhapur, HITEC City<br />
                                Hyderabad, Telangana<br />
                                – 500081
                            </p>
                        </div>

                        {/* Card 2: Working Hours — Orange Top-Left Accent */}
                        <div className="relative flex-shrink-0 w-[260px] h-[250px] bg-white rounded-[3rem] border border-gray-200 p-8 flex flex-col items-center justify-center text-center group transform transition-all duration-300 hover:-translate-y-2 cursor-default overflow-hidden mt-8 sm:mt-12">
                            {/* Thick Corner Accent */}
                            <div className="absolute top-0 left-0 w-16 h-16 border-t-[6px] border-l-[6px] border-[#e76038] rounded-tl-[3rem]"></div>

                            {/* Label */}
                            <p className="text-[#2197A1] font-bold text-xs uppercase tracking-widest mb-2">02 WORKING HOURS</p>

                            {/* Heading */}
                            <h4 className="text-[#2A2A2A] font-bold text-lg mb-4">Schedule</h4>

                            {/* Text */}
                            <p className="text-gray-500 text-xs leading-relaxed">
                                <span className="font-medium text-gray-700">Mon – Fri :</span> 9 AM – 6 PM<br />
                                <span className="font-medium text-gray-700">Saturday :</span> 10 AM – 2 PM<br />
                                <span className="font-medium text-gray-700">Sunday :</span> Closed
                            </p>
                        </div>

                        {/* Card 3: Contact Us — Orange Top-Right Accent */}
                        <div className="relative flex-shrink-0 w-[260px] h-[250px] bg-white rounded-[3rem] border border-gray-200 p-8 flex flex-col items-center justify-center text-center group transform transition-all duration-300 hover:-translate-y-2 cursor-default overflow-hidden">
                            {/* Thick Corner Accent */}
                            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[6px] border-l-[6px] border-[#e76038] rounded-bl-[3rem]"></div>

                            {/* Label */}
                            <p className="text-[#2197A1] font-bold text-xs uppercase tracking-widest mb-2">03 CONTACT US</p>

                            {/* Heading */}
                            <h4 className="text-[#2A2A2A] font-bold text-lg mb-4">Reach Out</h4>

                            {/* Text */}
                            <p className="text-gray-500 text-xs leading-relaxed">
                                <span className="font-medium text-gray-700">Phone No:</span> +91 98765 43210<br />
                                <span className="font-medium text-gray-700">Email:</span> hello@company.com
                            </p>
                        </div>


                    </div>

                    {/* RIGHT: Live Map — 30% */}
                    <div className="w-full lg:w-[88%] min-h-[400px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(33,151,161,0.15)] relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.244504437476!2d78.37615831484326!3d17.447190988034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dbb1d60e71%3A0x3de8b4c0e7f6e12e!2sMadhapur%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                            className="w-full h-full absolute inset-0"
                            style={{ border: 0, minHeight: '400px' }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                        {/* Overlay label */}
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
