"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const features = [
    { title: "Affordable Pricing", description: "Get high-quality work at prices that fit your budget.", side: "left", row: 0 },
    { title: "Creative & Modern Designs", description: "We create clean, attractive designs that match your brand and grab attention.", side: "right", row: 0 },
    { title: "Fast Delivery", description: "We complete your work on time without compromising quality.", side: "left", row: 1 },
    { title: "Result-Oriented Approach", description: "We focus on real results — more customers, better reach, and business growth.", side: "right", row: 1 },
];

const WhyChooseUs = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (!sectionRef.current) return;

        const st = {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
        };

        // Animate cards in
        gsap.fromTo(
            ".branch-card-inner",
            { opacity: 0, y: 28, scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.5)", scrollTrigger: st }
        );

        // Animate orb rings
        gsap.to(".orb-ellipse", {
            scaleX: 1.05,
            duration: 2.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            stagger: { each: 0.4, from: "start" },
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden md:!px-10"
            style={{ background: "linear-gradient(170deg, #081214 0%, #0a1a1c 50%, #071010 100%)" }}
        >
            {/* Ambient glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(33,151,161,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(95,204,214,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />

            <div className="max-w-6xl !mx-auto px-6 md:!py-24 !py-10 relative z-10">

                {/* Header */}
                <div className="!text-center !mb-0">
                    <span className="inline-block !px-5 !py-2 !mb-6 !text-[10px] font-bold tracking-[0.25em] uppercase rounded-full"
                        style={{ color: "#5fccd6", background: "rgba(95,204,214,0.08)", border: "1px solid rgba(95,204,214,0.22)" }}>
                        Why Choose Us
                    </span>
                    <h2 className="font-bold !text-white leading-tight max-w-5xl !mx-auto !text-xl md:!text-3xl">
                        We help businesses grow with{" "}
                        <span style={{ color: "#5fccd6" }}>smart design</span>,{" "}
                        strong websites, and{" "}
                        <span style={{ color: "#5fccd6" }}>effective digital marketing</span>{" "}
                        — all in one place.
                    </h2>
                    <div className="w-24 h-1.5 bg-[#E76038]/80 !mx-auto rounded-full"></div>
                </div>

                {/* ─────────── DESKTOP LAYOUT ─────────── */}
                <div className="hidden lg:block">
                    {/* Fixed height canvas for absolute positioning */}
                    <div className="relative w-full top-[-70px]" style={{ height: 640 }}>

                        {/* SVG Layer — 4 individual curves from orb to each card */}
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            viewBox="0 0 1000 640"
                            preserveAspectRatio="none"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ zIndex: 1 }}
                        >
                            <defs>
                                <linearGradient id="gtl" x1="470" y1="510" x2="235" y2="165" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#2197A1" stopOpacity="0.15" />
                                    <stop offset="100%" stopColor="#5fccd6" stopOpacity="0.7" />
                                </linearGradient>
                                <linearGradient id="gbl" x1="440" y1="510" x2="235" y2="385" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#2197A1" stopOpacity="0.15" />
                                    <stop offset="100%" stopColor="#5fccd6" stopOpacity="0.7" />
                                </linearGradient>
                                <linearGradient id="gtr" x1="530" y1="510" x2="765" y2="165" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#2197A1" stopOpacity="0.15" />
                                    <stop offset="100%" stopColor="#5fccd6" stopOpacity="0.7" />
                                </linearGradient>
                                <linearGradient id="gbr" x1="560" y1="510" x2="765" y2="385" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#2197A1" stopOpacity="0.15" />
                                    <stop offset="100%" stopColor="#5fccd6" stopOpacity="0.7" />
                                </linearGradient>
                            </defs>

                            {/* ── Orb emission glow points ── */}
                            <circle cx="470" cy="510" r="4" fill="#5fccd6" opacity="0.3" />
                            <circle cx="440" cy="510" r="4" fill="#5fccd6" opacity="0.3" />
                            <circle cx="530" cy="510" r="4" fill="#5fccd6" opacity="0.3" />
                            <circle cx="560" cy="510" r="4" fill="#5fccd6" opacity="0.3" />

                            {/* ── TOP-LEFT: straight up from orb (inner track), then curves left at card height ── */}
                            <path
                                d="M 470,510 C 470,135 265,165 235,165"
                                stroke="url(#gtl)" strokeWidth="1.5" fill="none" strokeLinecap="round"
                            />

                            {/* ── BOTTOM-LEFT: straight up from orb (outer track), then curves left at card height ── */}
                            <path
                                d="M 440,510 C 440,390 265,385 235,385"
                                stroke="url(#gbl)" strokeWidth="1.5" fill="none" strokeLinecap="round"
                            />

                            {/* ── TOP-RIGHT: straight up from orb (inner track), then curves right at card height ── */}
                            <path
                                d="M 530,510 C 530,135 735,165 765,165"
                                stroke="url(#gtr)" strokeWidth="1.5" fill="none" strokeLinecap="round"
                            />

                            {/* ── BOTTOM-RIGHT: straight up from orb (outer track), then curves right at card height ── */}
                            <path
                                d="M 560,510 C 560,390 735,385 765,385"
                                stroke="url(#gbr)" strokeWidth="1.5" fill="none" strokeLinecap="round"
                            />

                            {/* Card-end dots */}
                            <circle cx="235" cy="165" r="3.5" fill="#5fccd6" opacity="0.6" />
                            <circle cx="235" cy="385" r="3.5" fill="#5fccd6" opacity="0.6" />
                            <circle cx="765" cy="165" r="3.5" fill="#5fccd6" opacity="0.6" />
                            <circle cx="765" cy="385" r="3.5" fill="#5fccd6" opacity="0.6" />
                        </svg>

                        {/* ─── 4 CARDS absolutely positioned ─── */}
                        {/* Top-left */}
                        <div className="branch-card-inner" style={{ position: "absolute", top: 120, left: 0, width: 260, zIndex: 3 }}>
                            <GlassCard feature={features[0]} align="right" />
                        </div>
                        {/* Top-right */}
                        <div className="branch-card-inner" style={{ position: "absolute", top: 120, right: 0, width: 260, zIndex: 3 }}>
                            <GlassCard feature={features[1]} align="left" />
                        </div>
                        {/* Bottom-left */}
                        <div className="branch-card-inner" style={{ position: "absolute", top: 340, left: 0, width: 260, zIndex: 3 }}>
                            <GlassCard feature={features[2]} align="right" />
                        </div>
                        {/* Bottom-right */}
                        <div className="branch-card-inner" style={{ position: "absolute", top: 340, right: 0, width: 260, zIndex: 3 }}>
                            <GlassCard feature={features[3]} align="left" />
                        </div>

                        {/* ─── 3D Orb at bottom center ─── */}
                        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", zIndex: 2, width: 380 }}>
                            <div style={{ position: "relative", height: 180 }}>
                                {/* Concentric ellipse rings stacked top to bottom */}
                                {[5, 4, 3, 2, 1, 0].map((i) => {
                                    const w = 60 + i * 60;
                                    const h = 14 + i * 12;
                                    const bottom = i * 14;
                                    const a = (0.95 - i * 0.06);
                                    return (
                                        <div key={i} className="orb-ellipse"
                                            style={{
                                                position: "absolute",
                                                width: w,
                                                height: h,
                                                bottom,
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                borderRadius: "50%",
                                                background: `radial-gradient(ellipse at 40% 35%, rgba(120,220,220,${a * 0.55}) 0%, rgba(33,151,161,${a * 0.85}) 50%, rgba(10,70,75,${a}) 100%)`,
                                                boxShadow: `0 0 ${12 + i * 8}px rgba(33,151,161,${0.35 - i * 0.03}), inset 0 1px 0 rgba(255,255,255,${0.18 - i * 0.02})`,
                                                border: `1px solid rgba(95,204,214,${0.5 - i * 0.07})`,
                                            }}
                                        />
                                    );
                                })}
                                {/* Core glow */}
                                <div style={{
                                    position: "absolute",
                                    width: 100,
                                    height: 40,
                                    bottom: 60,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    background: "radial-gradient(ellipse at 50% 50%, rgba(150,240,240,0.9) 0%, rgba(33,151,161,0.4) 60%, transparent 100%)",
                                    filter: "blur(12px)",
                                    borderRadius: "50%",
                                }} />
                                {/* Floor glow spread */}
                                <div style={{
                                    position: "absolute",
                                    width: 300,
                                    height: 50,
                                    bottom: 0,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    background: "radial-gradient(ellipse at 50% 100%, rgba(33,151,161,0.22) 0%, transparent 70%)",
                                    filter: "blur(20px)",
                                }} />
                            </div>
                        </div>

                    </div>
                </div>

                {/* ─────────── MOBILE BRANCHING LAYOUT (Staggered & Refined) ─────────── */}
                <div className="lg:hidden relative w-full !pt-0" style={{ height: 720 }}>
                    {/* SVG Branching Lines (Optimized Staggered mapping) */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 375 720"
                        preserveAspectRatio="none"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ zIndex: 1 }}
                    >
                        <defs>
                            <linearGradient id="gm_teal" x1="187" y1="360" x2="187" y2="100" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#2197A1" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="#5fccd6" stopOpacity="0.6" />
                            </linearGradient>
                        </defs>

                        {/* Bottom Left Branch (Higher Depth) - Upward then Outward Wrapping */}
                        <path d="M 175,360 C 175,280 40,280 60,480" stroke="url(#gm_teal)" strokeWidth="1.2" fill="none" />
                        <circle cx="60" cy="480" r="2.5" fill="#5fccd6" opacity="0.6" />

                        {/* Top Left Branch (Lower) */}
                        <path d="M 165,360 C 165,100 60,70 60,40" stroke="url(#gm_teal)" strokeWidth="1.2" fill="none" />
                        <circle cx="60" cy="40" r="2.5" fill="#5fccd6" opacity="0.6" />

                        {/* Bottom Right Branch (Higher Depth) - Upward then Outward Wrapping */}
                        <path d="M 199,360 C 209,280 335,230 315,600" stroke="url(#gm_teal)" strokeWidth="1.2" fill="none" />
                        <circle cx="315" cy="600" r="2.5" fill="#5fccd6" opacity="0.6" />

                        {/* Top Right Branch (Lower) */}
                        <path d="M 209,360 C 200,200 315,200 315,170" stroke="url(#gm_teal)" strokeWidth="1.2" fill="none" />
                        <circle cx="315" cy="170" r="2.5" fill="#5fccd6" opacity="0.6" />
                        
                        {/* Orb emission dots (staggered for depth) */}
                        <circle cx="165" cy="360" r="3" fill="#5fccd6" opacity="0.3" />
                        <circle cx="209" cy="360" r="3" fill="#5fccd6" opacity="0.3" />
                        <circle cx="175" cy="360" r="2" fill="#5fccd6" opacity="0.2" />
                        <circle cx="199" cy="360" r="2" fill="#5fccd6" opacity="0.2" />
                    </svg>

                    {/* Mobile Cards (Staggered Positioning) */}
                    {/* Top Left (Slightly Up) */}
                    <div className="branch-card-inner !p-2" style={{ position: "absolute", top: 30, left: 0, width: "56%", zIndex: 3 }}>
                        <div className="bg-[#0c1f22]/70 backdrop-blur-md border border-[#5fccd6]/25 !p-1 rounded-xl min-h-[115px] flex flex-col items-center justify-center text-center">
                            <h5 className="text-[13px] font-bold mb-2 !text-[#5fccd6] leading-tight">{features[0].title}</h5>
                            <p className="!text-[13px] text-white/60 leading-normal">{features[0].description}</p>
                        </div>
                    </div>
                    {/* Top Right (Lowered) */}
                    <div className="branch-card-inner !p-2" style={{ position: "absolute", top: 150, right: 0, width: "52%", zIndex: 3 }}>
                        <div className="bg-[#0c1f22]/70 backdrop-blur-md border border-[#5fccd6]/25 !p-1 rounded-xl min-h-[115px] flex flex-col items-center justify-center text-center">
                            <h5 className="text-[13px] font-bold mb-2 !text-[#5fccd6] leading-tight">{features[1].title}</h5>
                            <p className="!text-[13px] text-white/60 leading-normal">{features[1].description}</p>
                        </div>
                    </div>

                    {/* Bottom Left (Slightly Down) */}
                    <div className="branch-card-inner !p-2" style={{ position: "absolute", bottom: 160, left: 0, width: "54%", zIndex: 3 }}>
                        <div className="bg-[#0c1f22]/70 backdrop-blur-md border border-[#5fccd6]/25 !p-1 rounded-xl min-h-[115px] flex flex-col items-center justify-center text-center">
                            <h5 className="text-[13px] font-bold mb-2 !text-[#5fccd6] leading-tight">{features[2].title}</h5>
                            <p className="!text-[13px] text-white/60 leading-normal">{features[2].description}</p>
                        </div>
                    </div>
                    {/* Bottom Right (Slightly Up from end) */}
                    <div className="branch-card-inner !p-2" style={{ position: "absolute", bottom: 40, right: 0, width: "56%", zIndex: 3 }}>
                        <div className="bg-[#0c1f22]/70 backdrop-blur-md border border-[#5fccd6]/25 !p-1 rounded-xl min-h-[115px] flex flex-col items-center justify-center text-center">
                            <h5 className="text-[13px] font-bold mb-2 !text-[#5fccd6] leading-tight">{features[3].title}</h5>
                            <p className="!text-[13px] text-white/60 leading-normal">{features[3].description}</p>
                        </div>
                    </div>

                    {/* Mobile Orb (Centered Vertically) */}
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 2, width: 220 }}>
                        <div style={{ position: "relative", height: 110 }}>
                            {[4, 3, 2, 1, 0].map((i) => {
                                const w = 40 + i * 40;
                                const h = 8 + i * 8;
                                const bottom = i * 10;
                                const a = (0.9 - i * 0.1);
                                return (
                                    <div key={i} className="orb-ellipse"
                                        style={{
                                            position: "absolute", width: w, height: h, bottom, left: "50%", transform: "translateX(-50%)",
                                            borderRadius: "50%", background: `radial-gradient(ellipse at 40% 35%, rgba(120,220,220,${a * 0.4}) 0%, rgba(33,151,161,${a * 0.7}) 50%, rgba(10,70,75,${a}) 100%)`,
                                            border: `1px solid rgba(95,204,214,${0.4 - i * 0.05})`,
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <p className="text-center text-lg md:text-xl font-medium italic !mt-1 pt-6"
                    style={{ color: "rgba(255,255,255,0.65)" }}>
                    👉 We don't just create — we help your business succeed online.
                </p>
            </div>
        </section>
    );
};

// ── Individual Glass Card ────────────────────────────────────────────────────
const GlassCard = ({ feature, align }: { feature: typeof features[0]; align: "left" | "right" }) => (
    <div
        className="group relative !p-2 rounded-2xl w-full transition-all duration-400 hover:-translate-y-1"
        style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(33,151,161,0.08) 100%)",
            border: "1px solid rgba(95,204,214,0.22)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
            textAlign: align,
        }}
    >
        {/* Top shine */}
        <div className="absolute top-0 left-6 right-6 h-px opacity-50 rounded-full"
            style={{ background: "linear-gradient(90deg,transparent,rgba(95,204,214,0.9),transparent)" }} />

        <h4 className="font-bold mb-1.5" style={{ color: "#5fccd6" }}>
            {feature.title}
        </h4>
        <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
            {feature.description}
        </p>

        {/* Hover glow border */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
            style={{ boxShadow: "0 0 28px rgba(33,151,161,0.2), inset 0 0 16px rgba(33,151,161,0.05)" }} />
    </div>
);

export default WhyChooseUs;
