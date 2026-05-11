"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Rocket, TrendingUp, Star } from "lucide-react";
import { useState } from "react";
import "./TrustIndicators.css";

const indicators = [
    {
        target: 50,
        decimals: 0,
        prefix: "",
        suffix: "+",
        staticText: null,
        label: "Happy Clients",
        icon: Users,
    },
    {
        target: 100,
        decimals: 0,
        prefix: "",
        suffix: "+",
        staticText: null,
        label: "Projects Completed",
        icon: Rocket,
    },
    {
        target: 4.8,
        decimals: 1,
        prefix: "",
        suffix: "/5",
        staticText: null,
        label: "Client Rating",
        icon: Star,
    }
];

const TrustIndicators = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current) return;

        const cards = sectionRef.current.querySelectorAll(".trust-card");
        const counters = sectionRef.current.querySelectorAll(".counter-val");

        // 3D Card Intro Animation
        gsap.fromTo(
            cards,
            { y: 60, opacity: 0, rotateX: 15, transformPerspective: 1000 },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            }
        );

        // Counter Animation
        counters.forEach((counter) => {
            const target = parseFloat(counter.getAttribute("data-target") || "0");
            const decimals = parseInt(counter.getAttribute("data-decimals") || "0");
            const obj = { val: 0 };
            
            gsap.to(obj, {
                val: target,
                duration: 2.5,
                ease: "power2.out",
                onUpdate: () => {
                    if (counter) {
                        counter.innerHTML = obj.val.toFixed(decimals);
                    }
                },
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                }
            });
        });

        // 3D Mouse Move Effect on Desktop
        const handleMouseMove = (e: MouseEvent, card: Element) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            gsap.to(card, {
                rotateX,
                rotateY,
                transformPerspective: 1000,
                duration: 0.4,
                ease: "power1.out"
            });
        };

        const handleMouseLeave = (card: Element) => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.7,
                ease: "power3.out"
            });
        };

        const isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            cards.forEach(card => {
                const onMove = (e: Event) => handleMouseMove(e as MouseEvent, card);
                const onLeave = () => handleMouseLeave(card);
                
                card.addEventListener("mousemove", onMove);
                card.addEventListener("mouseleave", onLeave);
                
                // Cleanup attached to DOM element
                (card as any)._cleanup = () => {
                    card.removeEventListener("mousemove", onMove);
                    card.removeEventListener("mouseleave", onLeave);
                };
            });
        }

        return () => {
            cards.forEach(card => {
                if ((card as any)._cleanup) {
                    (card as any)._cleanup();
                }
            });
        };
    }, []);

    return (
        <section ref={sectionRef} className="trust-strip">
            <div className="trust-strip__container">
                {indicators.map((item, index) => (
                    <div key={index} className="trust-card" style={{ transformStyle: 'preserve-3d' }}>
                        <div className="trust-card__icon-wrapper" style={{ transform: 'translateZ(30px)' }}>
                            <item.icon size={isMobile ? 22 : 32} strokeWidth={2.5} {...(item.label === "Client Rating" ? { fill: "currentColor" } : {})} />
                        </div>
                        <div className="trust-card__content" style={{ transform: 'translateZ(20px)' }}>
                            {item.staticText ? (
                                <span className="trust-card__value" style={{ fontSize: '1.1rem' }}>{item.staticText}</span>
                            ) : (
                                <>
                                    <span className="trust-card__value">
                                        {item.prefix}
                                        <span 
                                            className="counter-val" 
                                            data-target={item.target} 
                                            data-decimals={item.decimals}
                                        >
                                            0
                                        </span>
                                        {item.suffix}
                                    </span>
                                    <span className="trust-card__label">{item.label}</span>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrustIndicators;
