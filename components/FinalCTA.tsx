"use client";

import React from "react";
import Button from "./Button";

const FinalCTA = () => {
    return (
        <section className="relative w-full overflow-hidden">
            {/* Background — same hero gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2197A1] via-[#1b7a82] to-[#125960]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12)_0%,_transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(0,0,0,0.15)_0%,_transparent_60%)]" />

            <div className="relative z-10 max-w-7xl !mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* LEFT — Content */}
                <div className="flex flex-col items-start gap-0">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-white/50">Let's Work Together</span>
                    <h2 className="text-4xl md:text-5x font-bold text-white leading-tight tracking-tight">
                        Ready to Accelerate<br /> Your Growth?
                    </h2>
                    <p className="text-lg !mb-4 text-white/75 font-medium leading-relaxed max-w-lg">
                        Let's build something extraordinary together. Tell us about your project and we'll get back to you within 24 hours.
                    </p>
                    <Button
                        href="/get-proposal"
                        variant="secondary"
                        size="lg"
                        className="shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300"
                    >
                        Get Proposal
                    </Button>
                </div>

                {/* RIGHT — Image placeholder */}
                <div className="flex items-center justify-center">
                    <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.25)]">
                        {/* Placeholder — swap src with your image */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/cta-image.png"
                            alt="Ready to grow your business"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = "none";
                                const fb = e.currentTarget.nextElementSibling as HTMLElement;
                                if (fb) fb.style.display = "flex";
                            }}
                        />
                        {/* Fallback shown when image is missing */}
                        <div className="hidden w-full h-full items-center justify-center bg-white/10 backdrop-blur-sm border-2 border-dashed border-white/20 rounded-3xl flex-col gap-3">
                            <svg className="w-12 h-12 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <path d="M21 15l-5-5L5 21" />
                            </svg>
                            <span className="text-white/30 text-xs font-bold uppercase tracking-widest">Place Image Here</span>
                            <span className="text-white/20 text-[10px] font-medium">/public/cta-image.png</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;
