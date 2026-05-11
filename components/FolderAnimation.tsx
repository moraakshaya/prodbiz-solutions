"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const FolderAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const folderRef = useRef<SVGSVGElement>(null);
    const frontFlapRef = useRef<SVGPathElement>(null);
    const file1Ref = useRef<SVGRectElement>(null);
    const file2Ref = useRef<SVGRectElement>(null);
    const file3Ref = useRef<SVGRectElement>(null);
    const particlesRef = useRef<SVGGElement>(null);

    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;

        // Use IntersectionObserver for reliable scroll detection
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    playAnimation();
                } else {
                    // Reset animation when out of view so it plays again when scrolling back
                    resetAnimation();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(containerRef.current);

        const resetAnimation = () => {
            gsap.set(containerRef.current, { y: 100, opacity: 0, rotate: -3 });
            gsap.set([file1Ref.current, file2Ref.current, file3Ref.current], { opacity: 0, y: 30, scale: 0.9 });
            gsap.set(frontFlapRef.current, { rotationX: 0 });
            gsap.set(particlesRef.current?.children || [], { opacity: 0, scale: 0 });
        };

        const playAnimation = () => {
            const tl = gsap.timeline();

            tl.to(containerRef.current, {
                y: 0,
                opacity: 1,
                rotate: 0,
                duration: 1.2,
                ease: "power3.out"
            });

            tl.to(frontFlapRef.current, {
                rotationX: -40,
                duration: 0.6,
                ease: "power2.inOut",
                transformOrigin: "bottom"
            }, "+=0.2");

            const files = [file1Ref.current, file2Ref.current, file3Ref.current];
            tl.to(files, {
                y: (i) => -60 - (i * 20),
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.7)"
            }, "-=0.3");

            tl.to(files, {
                y: "+=10",
                duration: 1,
                yoyo: true,
                ease: "power1.inOut",
                stagger: 0.1
            }, "-=0.2");

            const particles = particlesRef.current?.children;
            if (particles) {
                tl.fromTo(particles, 
                    { opacity: 0, scale: 0, x: 0, y: 0 },
                    {
                        opacity: 1,
                        scale: 1,
                        x: () => (Math.random() - 0.5) * 160,
                        y: () => -(Math.random() * 120 + 40),
                        duration: 1,
                        stagger: 0.02,
                        ease: "power2.out"
                    }, 
                    "-=1.5"
                );
                
                tl.to(particles, {
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.in"
                }, "-=0.2");
            }
        };

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full max-w-[400px] h-[400px] flex items-center justify-center perspective-1000 opacity-0">
            <svg
                ref={folderRef}
                viewBox="0 0 400 400"
                className="w-full h-full drop-shadow-2xl"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g ref={particlesRef}>
                    {[...Array(20)].map((_, i) => (
                        <circle
                            key={i}
                            cx="200"
                            cy="220"
                            r={Math.random() * 3 + 1}
                            fill={i % 2 === 0 ? "#e76038" : "#ffffff"}
                        />
                    ))}
                </g>

                <rect ref={file3Ref} x="130" y="160" width="140" height="180" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1" />
                <rect ref={file2Ref} x="120" y="170" width="140" height="180" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1" />
                <rect ref={file1Ref} x="110" y="180" width="140" height="180" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1" />

                <path
                    d="M60 200C60 188.954 68.9543 180 80 180H160.414C165.719 180 170.806 177.893 174.557 174.142L185.443 163.257C189.194 159.507 194.281 157.4 199.586 157.4H320C331.046 157.4 340 166.354 340 177.4V340C340 351.046 331.046 360 320 360H80C68.9543 360 60 351.046 60 340V200Z"
                    fill="#2197A1"
                    fillOpacity="0.9"
                />

                <path
                    ref={frontFlapRef}
                    d="M60 210C60 198.954 68.9543 190 80 190H320C331.046 190 340 198.954 340 210V340C340 351.046 331.046 360 320 360H80C68.9543 360 60 351.046 60 340V210Z"
                    fill="#2197A1"
                    className="drop-shadow-lg"
                />
                
                <rect x="260" y="310" width="50" height="10" rx="5" fill="white" fillOpacity="0.2" />
                <rect x="280" y="330" width="30" height="6" rx="3" fill="white" fillOpacity="0.1" />
            </svg>
        </div>
    );
};

export default FolderAnimation;
