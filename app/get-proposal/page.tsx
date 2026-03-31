"use client";

import React from "react";
import NextImage from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "@/components/Button";

export default function GetProposalPage() {
    const scrollToForm = () => {
        const element = document.getElementById("proposal-form-section");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            {/* Get Proposal Hero Section - Matched to About Page */}
            <section
                className="relative w-full min-h-[75vh] min-[340px]:min-h-[60vh] min-[360px]:min-h-[75vh] min-[380px]:min-h-[60vh] min-[400px]:min-h-[58vh] min-[540px]:min-h-[68vh] min-[760px]:min-h-[66vh] min-[1024px]:min-h-screen flex items-center overflow-hidden"
                style={{ background: "radial-gradient(circle at top, #FFFFFF 0%, #2197A1 100%)" }}
            >
                {/* Content Container */}
                <div className="z-10 w-full max-w-7xl !mx-auto flex md:flex-row flex-col items-center !px-4 md:px-6 !pt-10 md:!pt-10 gap-8 md:gap-1">

                    {/* Hero Content Wrapper */}
                    <div className="w-full md:w-[70%] flex flex-col items-center md:items-start translate-y-[-24px] md:pr-0">
                        {/* Tag: Centered on Mobile */}
                        <div className="w-full flex justify-center md:justify-start">
                            <div className="hidden md:inline-block bg-[#fff]/50 text-[#2197A1] !px-1 md:!px-5 !py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] !mb-4 shadow-sm">
                                Project Inquiries
                            </div>
                        </div>

                        {/* Title: Centered on Mobile */}
                        <h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[#2A2A2A] !mb-2 md:mb-6 leading-tight break-words text-center md:text-left w-full">
                            Start Your Project <span className="text-[#2197A1]">With Confidence</span>
                        </h1>

                        <div className="w-full flex flex-col md:block">
                            {/* Short mobile content: Centered as requested */}
                            <p className="block md:hidden text-base sm:text-base text-[#2A2A2A]/80 font-medium leading-snug text-center mb-8">
                                Share your project details and we&apos;ll craft a customized solution tailored to your goals and budget.
                            </p>

                            {/* Desktop long content */}
                            <div className="hidden md:block">
                                <p className="text-lg md:text-xl text-[#2A2A2A]/80 font-medium leading-relaxed max-w-3xl mb-1 md:mb-8">
                                    At Prodbiz Solutions, we believe every vision deserves a high-performance digital strategy.
                                    By sharing your project details with us, you allow our team of experts to craft a fully
                                    customized solution that aligns specifically with your business goals, timeline, and budget.
                                    From initial concept into final execution, we focus on engineering scalable results that drive
                                    measurable growth, ensuring your digital presence is both innovative and impactful for the long term.
                                </p>
                            </div>
                        </div>

                        {/* Mobile Image: Rendered below content on mobile */}
                        <div className="md:hidden w-full flex justify-center !mt-4 !mb-8 h-[100px] relative">
                            {/* Ambient Glow */}
                            <div className="absolute inset-x-0 bottom-0 top-10 bg-gradient-to-t from-[#2197A1] to-transparent rounded-[4rem] blur-[60px] opacity-20 pointer-events-none"></div>
                            <NextImage
                                src="/images/get-proposal-hero.png"
                                alt="Start Project"
                                fill
                                className="object-contain drop-shadow-xl scale-125"
                                priority
                            />
                        </div>

                        {/* Button: Centered on Mobile */}
                        <div className="w-full flex justify-center md:justify-start">
                            <Button
                                onClick={scrollToForm}
                                className="inline-flex items-center gap-2 md:gap-3 bg-[#e76038] !text-white !px-6 md:!px-6 !py-3 md:!py-3 rounded-xl md:rounded-3xl font-bold text-lg md:text-lg hover:bg-[#e76038]/90 transition-all transform hover:scale-100 active:scale-95 shadow-md md:shadow-2xl relative z-10"
                            >
                                <span>Ready to Start?</span>
                                <ArrowRight size={16} className="md:w-[22px] md:h-[22px]" />
                            </Button>
                        </div>
                    </div>

                    {/* Right Side Image Section - Hidden on Mobile */}
                    <div className="hidden md:flex w-[40%] md:w-[20%] !mb-20 justify-center items-center h-full min-h-[300px] md:min-h-[200px]">
                        <NextImage
                            src="/images/get-proposal-hero.png"
                            alt="Start Project"
                            width={500}
                            height={500}
                            priority
                            className="w-full h-auto object-contain drop-shadow-xl md:scale-125 transition-transform duration-700 hover:scale-130"
                        />
                    </div>
                </div>

                {/* Bottom 3D Drip Border (Standardized) */}
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

            {/* Form Section */}
            <section id="proposal-form-section" className="relative w-full !py-10 !px-6 lg:!px-24 flex justify-center z-20">
                <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                    {/* Left: Proposal Form */}
                    <div className="w-full lg:w-[60%] flex flex-col">
                        <div className="!mb-5">
                            <h2 className="text-3xl font-bold text-[#2A2A2A] mb-2">Tell Us About Your Project</h2>
                            <p className="text-gray-500 font-medium">Please fill in the details below and our team will get back to you with a tailored proposal.</p>
                        </div>

                        <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
                            {/* Section 1: Basic Info */}
                            <div className="space-y-6">
                                <h3 className="!text-md font-black uppercase text-[#2197A1] tracking-widest border-b-1 border-[#2197A1]/20 pb-2">01. Basic Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-[#2A2A2A] ml-1 uppercase tracking-tighter">Full Name</label>
                                        <input type="text" className="w-full bg-[#2197A1]/10 border-2 border-gray-100 rounded-2xl !px-5 !py-3 focus:border-[#2197A1]/30 focus:outline-none transition-all" placeholder="Enter your name" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-[#2A2A2A] ml-1 uppercase tracking-tighter">Email Address</label>
                                        <input type="email" className="w-full bg-[#2197A1]/10 border-2 border-gray-100 rounded-2xl !px-5 !py-3 focus:border-[#2197A1]/30 focus:outline-none transition-all" placeholder="name@company.com" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-[#2A2A2A] ml-1 uppercase tracking-tighter">Phone Number</label>
                                        <input type="tel" className="w-full bg-[#2197A1]/10 border-2 border-gray-100 rounded-2xl !px-5 !py-3 focus:border-[#2197A1]/30 focus:outline-none transition-all" placeholder="+91 XXX XXX XXXX" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-[#2A2A2A] ml-1 uppercase tracking-tighter">Company Name</label>
                                        <input type="text" className="w-full bg-[#2197A1]/10 border-2 border-gray-100 rounded-2xl !px-5 !py-3 focus:border-[#2197A1]/30 focus:outline-none transition-all" placeholder="Your organization" />
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Project Type */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-black uppercase text-[#2197A1] tracking-widest border-b-1 border-[#2197A1]/20 !pb-2">02. Project Type</h3>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-[#2A2A2A] ml-1 uppercase tracking-tighter">What are you looking for?</label>
                                    <select className="w-full bg-[#2197A1]/10 border-2 border-gray-100 rounded-2xl !px-5 !py-3 focus:border-[#2197A1]/30 focus:outline-none appearance-none transition-all text-gray-500 font-medium">
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
                            <div className="space-y-4">
                                <h3 className="text-sm font-black uppercase text-[#2197A1] tracking-widest border-b-1 border-[#2197A1]/20 !pb-2">03. Project Details</h3>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-[#2A2A2A] ml-1 uppercase tracking-tighter">Tell us about your project, goals, and requirements</label>
                                    <textarea rows={5} className="w-full bg-[#2197A1]/10 border-2 border-gray-100 rounded-2xl !px-5 !py-3 focus:border-[#2197A1]/30 focus:outline-none transition-all" placeholder="Describe your vision..."></textarea>
                                </div>
                            </div>

                            {/* Section 4 & 5: Budget & Timeline */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-black uppercase text-[#2197A1] tracking-widest border-b-1 border-[#2197A1]/20 !pb-2">04. Budget</h3>
                                    <div className="flex flex-col gap-2">
                                        <select className="w-full bg-[#2197A1]/10 border-2 border-gray-100 rounded-2xl !px-5 !py-3 focus:border-[#2197A1]/30 focus:outline-none appearance-none transition-all text-gray-500 font-medium">
                                            <option value="">Expected Budget Range</option>
                                            <option value="10k-25k">₹10K – ₹25K</option>
                                            <option value="25k-50k">₹25K – ₹50K</option>
                                            <option value="50k-1l">₹50K – ₹1L</option>
                                            <option value="1l+">₹1L+</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-sm font-black uppercase text-[#2197A1] tracking-widest border-b-1 border-[#2197A1]/20 !pb-2">05. Timeline</h3>
                                    <div className="flex flex-col gap-2">
                                        <select className="w-full bg-[#2197A1]/10 border-2 border-gray-100 rounded-2xl !px-5 !py-3 focus:border-[#2197A1]/30 focus:outline-none appearance-none transition-all text-gray-500 font-medium">
                                            <option value="">Expected Launch</option>
                                            <option value="asap">ASAP</option>
                                            <option value="2-4weeks">2–4 Weeks</option>
                                            <option value="1-2months">1–2 Months</option>
                                            <option value="flexible">Flexible</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full bg-[#2197A1] text-white font-black text-xl !py-3 rounded-3xl shadow-[0_12px_24px_rgba(33,151,161,0.2)] hover:shadow-[0_15px_35px_rgba(33,151,161,0.3)] hover:-translate-y-1 transition-all active:scale-[0.98] !mt-4 tracking-widest">
                                Get Proposal
                            </button>
                        </form>
                    </div>

                    {/* Right: Why Start With Us */}
                    <div className="w-full lg:w-[35%] lg:sticky lg:top-32">
                        <div className="bg-[#fcfcfc] rounded-[3rem] !p-10 border border-gray-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2197A1]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>

                            <h3 className="text-2xl font-bold text-[#2A2A2A] mb-8 relative z-10">Why Start a Project With Us?</h3>

                            <div className="space-y-8 relative z-10">
                                {[
                                    { title: "Tailored Solutions", desc: "Crafted specifically to meet your unique business goals and challenges." },
                                    { title: "Scalable Development", desc: "Future-ready architecture that grows alongside your business expansion." },
                                    { title: "Transparent Process", desc: "Clear communication and regular updates throughout the project lifecycle." },
                                    { title: "Results Driven", desc: "Focused on high-performance outcomes that drive real growth and ROI." }
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

                            <div className="mt-12 !p-6 bg-white rounded-2xl border border-[#2197A1]/10 shadow-inner">
                                <p className="text-sm text-gray-500 italic font-medium">
                                    &quot;Our mission is to empower businesses with innovative digital solutions that drive growth and create lasting value.&quot;
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Final CTA Section */}
            <section className="w-full !py-5 md:!py-10 px-6 bg-[#fcfcfc]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-4">Need help before starting?</h2>
                    <p className="text-lg text-gray-500 font-medium mb-10">Talk to our team and we’ll guide you through the process.</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 bg-white border-2 border-[#e76038] !text-[#e76038] !px-8 !py-2 rounded-3xl font-bold text-lg hover:bg-[#e76038] hover:!text-white transition-all transform hover:scale-105"
                    >
                        Talk to an Expert
                        <ArrowRight size={22} />
                    </Link>
                </div>
            </section>
        </main >
    );
}
