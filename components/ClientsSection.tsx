"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Add your client logo files to /public/clients/
// Replace the `src` value with the actual file path when available.
const clients = [
    { name: "Blue Elan", src: "/clients/gvr.png" },
    { name: "Client 02", src: "/clients/ricch.png" },
    { name: "Client 03", src: "/clients/shriswara.png" },
    { name: "Client 04", src: "/clients/russh.png" },
    { name: "Client 05", src: "/clients/pranaa.png" },
    { name: "Client 06", src: "/clients/goverment.png" },
    { name: "Client 07", src: "/clients/bluelan.png" },
    { name: "Client 08", src: "/clients/lalitha.png" },
    { name: "Client 09", src: "/clients/trcr.png" },
    { name: "Client 10", src: "/clients/tvv.png" },
];

const LogoTile = ({ client }: { client: (typeof clients)[0] }) => (
    <div
        className="group flex-shrink-0 flex items-center justify-center rounded-full !my-3 shadow-[0_6px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 cursor-default select-none min-w-[140px] md:min-w-[220px] h-[140px] md:h-[220px]"
        title={client.name}
    >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
            src={client.src}
            alt={client.name}
            className="max-h-full max-w-full object-contain !p-2 transition-all duration-300 drop-shadow-[0_4px_8px_rgba(0,0,0,0.1)] group-hover:drop-shadow-[0_6px_14px_rgba(0,0,0,0.15)]"
            onError={(e) => {
                // Fallback: show placeholder box when image is missing
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = "none";
                const placeholder = target.nextElementSibling as HTMLElement;
                if (placeholder) placeholder.style.display = "flex";
            }}
        />
        {/* Placeholder shown when image is missing */}
        {/* <div
            className="hidden items-center justify-center w-[120px] h-10 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50"
        >
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{client.name}</span>
        </div> */}
    </div>
);

const ClientsSection = () => {
    const doubled = [...clients, ...clients];
    const [isMobilePaused, setIsMobilePaused] = useState(false);

    const handleMobileClick = (e: React.MouseEvent) => {
        if (typeof window !== "undefined" && window.innerWidth < 1024) {
            e.stopPropagation();
            setIsMobilePaused(true);
        }
    };

    const kickerRef = useRef<HTMLParagraphElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paraRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!kickerRef.current || !headingRef.current || !paraRef.current) return;

        // Select the individual word spans
        const words = paraRef.current.querySelectorAll(".client-word");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: kickerRef.current,
                start: "top 85%", // Trigger when top of kicker is 85% down the viewport
                toggleActions: "play none none none", // Only play once
            },
        });

        // Step 1: Kicker string slide up + fade
        tl.fromTo(
            kickerRef.current,
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
            }
        );

        // Step 2: Heading slide up + fade
        tl.fromTo(
            headingRef.current,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
            },
            "-=0.5" // Start heading slightly before kicker animation finishes
        );

        // Step 3: Word-by-word paragraph animation
        tl.fromTo(
            words,
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.05,
                ease: "power2.out",
            },
            "-=0.6" // Start paragraph slightly before heading finishes
        );

        return () => {
            // Note: Since we removed SplitType, we no longer need split.revert();
            // GSAP handles its own tween cleanup natively when unmounted.
        };
    }, []);

    const clientsText = "We've partnered with forward-thinking businesses across industries to deliver measurable results and lasting growth.";

    useEffect(() => {
        if (!isMobilePaused) return;

        const handleGlobalClick = () => {
            setIsMobilePaused(false);
        };

        document.addEventListener('click', handleGlobalClick);
        document.addEventListener('touchstart', handleGlobalClick, { passive: true });

        return () => {
            document.removeEventListener('click', handleGlobalClick);
            document.removeEventListener('touchstart', handleGlobalClick);
        };
    }, [isMobilePaused]);

    return (
        <section className="relative w-full !pt-5 lg:!pt-10 !pb-0 lg:!pb-20 overflow-hidden bg-white">
            {/* Subtle dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(33,151,161,0.05)_1px,_transparent_0)] [background-size:28px_28px] pointer-events-none" />

            <div className="relative">
                {/* Heading */}
                <div className="text-center px-6 flex flex-col items-center mb-14">
                    <p ref={kickerRef} className="text-xs font-black uppercase tracking-[0.2em] text-primary/50 mb-3">Our Clients</p>
                    <h2 ref={headingRef} className="font-bold text-gray-900 mb-4 tracking-tight">
                        Trusted By Growing Brands
                    </h2>
                    <p ref={paraRef} className="max-w-xl text-base text-gray-500 font-medium leading-relaxed">
                        {clientsText.split(" ").map((word, wordIndex) => (
                            <span key={wordIndex} className="client-word inline-block">
                                {word}{wordIndex < clientsText.split(" ").length - 1 ? "\u00A0" : ""}
                            </span>
                        ))}
                    </p>
                </div>

                {/* Carousel — full bleed edge-to-edge */}
                <div className="relative !mt-2 md:!mt-5">
                    {/* Left fade */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                    {/* Right fade */}
                    <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

                    {/* Scrolling track */}
                    <div className="flex overflow-hidden !pb-4">
                        <div
                            onClick={handleMobileClick}
                            className="flex animate-[marquee_35s_linear_infinite] lg:hover:[animation-play-state:paused] gap-4"
                            style={{
                                width: "max-content",
                                animationPlayState: isMobilePaused ? "paused" : undefined
                            }}
                        >
                            {doubled.map((client, idx) => (
                                <LogoTile key={idx} client={client} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClientsSection;
