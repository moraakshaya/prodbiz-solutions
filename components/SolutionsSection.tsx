"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Stack from "./Stack";

const solutions = [
    {
        number: "01",
        title: "Branding & Designing",
        description: "We design how your business looks so people notice and trust it from the first moment.",
        items: [
            "Logo Design",
            "Business Cards & Brochures",
            "Posters & Flyers",
            "Social Media Creatives",
            "Menu Card Design (Restaurant / Cafe / Hotel)",
        ],
    },
    {
        number: "02",
        title: "Website Development",
        description: "Get a high-performance website that converts visitors into customers. We specialize in building fast, SEO-friendly, and mobile-responsive websites tailored to your business goals.",
        items: [
            "Business Websites",
            "Portfolio Websites",
            "E-commerce Websites",
            "Landing Pages",
            "Website Redesign",
        ],
    },
    {
        number: "03",
        title: "Content Creation & Video Marketing",
        description: "Engage your audience with high-quality visual storytelling. We handle everything from professional video shooting and editing to creating trending reels that build your brand's presence across all social platforms.",
        items: [
            "Video Shooting",
            "Video Editing",
            "Product / Service Videos",
            "Social Media Content Posting",
            "Reels Creation (Instagram / YouTube Shorts)",
        ],
    },
    {
        number: "04",
        title: "Digital Marketing",
        description: "Grow your business with data-driven marketing strategies. We bring your brand to the top of search results and drive high-quality leads through optimized SEO, Google Ads, and targeted Social Media campaigns.",
        items: [
            "Google Ads",
            "Facebook & Instagram Ads",
            "Social Media Marketing",
            "Local Business Promotion",
            "SEO (Search Engine Optimization)",
        ],
    },
    {
        number: "05",
        title: "Complete Business Growth",
        description: "Accelerate your journey from startup to success. We provide end-to-end digital solutions that include branding, lead generation, and comprehensive marketing strategies designed to scale your business.",
        items: [
            "Online Presence Setup",
            "Lead Generation",
            "Full Digital Strategy",
            "Brand Growth Planning",
            "End-to-End Support",
        ],
    },
];

const SolutionCard = ({ number, title, items }: { number: string; title: string; items: string[] }) => {
    return (
        <div className="group relative flex flex-col items-center h-full solution-card-anim">
            {/* Number Badge - Precise styling from image */}
            <div className="absolute -top-6 lg:-top-5 z-30 flex h-15 w-15 lg:h-20 lg:w-20 items-center justify-center rounded-full border-[6px] border-[#f2f4f7] bg-primary text-3xl font-extrabold text-white shadow-[0_8px_15px_rgba(33,151,161,0.2)] transition-transform duration-300 group-hover:scale-110">
                {number}
            </div>

            {/* Card Container */}
            <div className="flex flex-col flex-1 w-[95%] bg-white rounded-[2.5rem] shadow-[0_10px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_35px_70px_rgba(0,0,0,0.1)] hover:-translate-y-2 overflow-hidden">
                {/* Exact Wave Shape Header */}
                <div className="relative h-30 lg:h-35 w-full bg-primary overflow-hidden">
                    <svg
                        viewBox="0 0 500 150"
                        preserveAspectRatio="none"
                        className="absolute bottom-[-2px] left-[-2px] h-28 w-[calc(100%+4px)] fill-white"
                        style={{ filter: "drop-shadow(0px -1px 0px rgba(33,151,161,0.1))" }}
                    >
                        <path d="M-2,60 C80,20 120,160 250,90 C380,20 420,120 502,50 L502,152 L-2,152 Z" />
                    </svg>
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-1 !px-1 pb-8 !pt-0 items-center text-center">
                    {/* Title */}
                    <h3 className="font-bold text-gray-800 tracking-wide flex items-center justify-center">
                        {title}
                    </h3>

                    {/* List Items */}
                    <ul className="space-y-3 text-left w-full ml-0 mb-0">
                        {items.map((item, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-500 font-medium mb-0">
                                <span className="mr-2 text-primary font-bold">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const SolutionsSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paraRef = useRef<HTMLParagraphElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const stackContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!headingRef.current || !paraRef.current || !sectionRef.current || !stackContainerRef.current) return;

        // Context for GSAP cleaning
        let ctx = gsap.context(() => {
            // Section Header Animations
            const split = new SplitType(paraRef.current!, { types: "lines" });
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });

            tl.fromTo(headingRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
                .fromTo(split.lines, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" }, "-=0.6");

            // --- Scroll Stack Logic (Both Desktop & Mobile) ---
            const mm = gsap.matchMedia();
            mm.add("(min-width: 0px)", () => {
                const desktopCards = gsap.utils.toArray<HTMLElement>(".desktop-stack-card");
                const mobileCards = gsap.utils.toArray<HTMLElement>(".mobile-stack-card");

                // Desktop Anims
                desktopCards.forEach((card, i) => {
                    if (i === desktopCards.length - 1) return;
                    ScrollTrigger.create({
                        trigger: desktopCards[i + 1],
                        start: "top bottom",
                        end: "top top",
                        scrub: true,
                        animation: gsap.fromTo(card,
                            { scale: 1, filter: "brightness(1)", opacity: 1 },
                            { scale: 0.9, filter: "brightness(0.5)", opacity: 0.8, ease: "none" }
                        ),
                    });
                });

                // Mobile Anims
                mobileCards.forEach((card, i) => {
                    if (i === mobileCards.length - 1) return;
                    ScrollTrigger.create({
                        trigger: mobileCards[i + 1],
                        start: "top bottom",
                        end: "top top",
                        scrub: true,
                        animation: gsap.fromTo(card,
                            { scale: 1, filter: "brightness(1)", opacity: 1 },
                            { scale: 0.9, filter: "brightness(0.5)", opacity: 0.8, ease: "none" }
                        ),
                    });
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const scrollPosition = scrollRef.current.scrollLeft;
        const cardWidth = scrollRef.current.offsetWidth;
        if (cardWidth === 0) return;
        const index = Math.round(scrollPosition / cardWidth);
        if (index !== activeIndex && index >= 0 && index < solutions.length) {
            setActiveIndex(index);
        }
    };

    const scrollToCard = (index: number) => {
        if (!scrollRef.current) return;
        const cardWidth = scrollRef.current.offsetWidth;
        scrollRef.current.scrollTo({
            left: cardWidth * index,
            behavior: "smooth"
        });
        setActiveIndex(index);
    };

    return (
        <section ref={sectionRef} className="!pt-18 md:!pt-28 w-full">
            <div className="container !mx-auto flex flex-col max-w-[1800px] overflow-visible !px-0">
                {/* Section Header */}
                <div className="!mb-0 lg:!mb-0 text-center !px-4 sm:px-12 lg:px-24 xl:px-32 flex flex-col items-center">
                    <h2 ref={headingRef} className="mb-6 font-bold text-gray-900 tracking-tight max-w-5xl">
                        Everything Your Business Needs — All in One Place
                    </h2>
                    <p ref={paraRef} className="max-w-3xl text-lg text-gray-500 font-medium leading-relaxed">
                        We take care of your design, website, and marketing so you don’t have to go anywhere else.
                    </p>
                </div>

                {/* Scroll Stack Container (Desktop) */}
                <div ref={stackContainerRef} className="hidden md:flex flex-col relative w-full items-center">

                    {/* Featured 1st Service - Flex layout 40/60 */}
                    <div className="desktop-stack-card sticky top-0 flex h-screen w-full items-center px-6 sm:px-12 lg:px-14 xl:px-32 z-[11]">
                        <div className="solution-card-anim flex flex-col justify-center w-[40%] !pl-18">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-primary font-extrabold text-4xl">01</span>
                                <div className="h-[2px] w-12 bg-primary"></div>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                                {solutions[0].title}
                            </h2>
                            <p className="text-xl text-gray-600 mb-4 font-medium leading-relaxed max-w-xl">
                                {solutions[0].description}
                            </p>
                            <p className="text-primary font-bold text-lg mb-8 flex items-center gap-2">
                                👉 <span className="text-gray-700 italic border-b-2 border-primary/30">We design everything your business needs to look professional — from logos to menus.</span>
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-0 text-left">
                                {solutions[0].items.map((item, idx) => (
                                    <li key={idx} className="flex items-start text-lg text-gray-500 font-medium whitespace-nowrap">
                                        <span className="!mr-3 text-primary font-bold text-xl">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="hidden md:flex items-center justify-center relative min-h-[400px] w-[60%]">
                            <div style={{ width: 450, height: 450 }}>
                                <Stack
                                    randomRotation={true}
                                    sensitivity={180}
                                    sendToBackOnClick={true}
                                    cards={[
                                        <img key={1} src="/images/home-services/post.webp" alt="Branding 1" className="w-full h-full object-cover rounded-2xl" />,
                                        <img key={2} src="/images/home-services/logo.webp" alt="Branding 2" className="w-full h-full object-cover rounded-2xl" />,
                                        <img key={3} src="/images/home-services/menu-card.webp" alt="Branding 3" className="w-full h-full object-cover rounded-2xl" />,
                                        <img key={4} src="/images/home-services/posters.webp" alt="Branding 4" className="w-full h-full object-cover rounded-2xl" />,
                                    ]}
                                    autoplay={true}
                                    autoplayDelay={4500}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Featured 2nd Service - Reverse Flex layout 60/40 */}
                    <div className="desktop-stack-card sticky top-0 flex h-screen w-full items-center bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.1)] border-t border-gray-100 px-6 sm:px-12 lg:px-24 xl:px-32 z-[12]">
                        <div className="hidden md:flex items-center justify-center relative min-h-[400px] w-[60%]">
                            <div style={{ width: 450, height: 450 }}>
                                <Stack
                                    randomRotation={true}
                                    sensitivity={180}
                                    sendToBackOnClick={true}
                                    cards={[
                                        <img key={1} src="/images/home-services/ecommerce-website.webp" alt="Web Dev 1" className="w-full h-full object-cover rounded-2xl" />,
                                        <img key={2} src="/images/home-services/landing-pages.webp" alt="Web Dev 2" className="w-full h-full object-cover rounded-2xl" />,
                                        <img key={3} src="/images/home-services/business-websites.webp" alt="Web Dev 3" className="w-full h-full object-cover rounded-2xl" />,
                                        <img key={4} src="/images/home-services/portfolio-website.webp" alt="Web Dev 4" className="w-full h-full object-cover rounded-2xl" />,
                                    ]}
                                    autoplay={true}
                                    autoplayDelay={4000}
                                />
                            </div>
                        </div>
                        <div className="solution-card-anim flex flex-col justify-center w-[40%] !pr-18">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-primary font-extrabold text-4xl">02</span>
                                <div className="h-[2px] w-12 bg-primary"></div>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                                {solutions[1].title}
                            </h2>
                            <p className="text-xl text-gray-600 mb-4 font-medium leading-relaxed max-w-xl">
                                {solutions[1].description}
                            </p>
                            <p className="text-primary font-bold text-lg mb-8 flex items-center gap-2">
                                👉 <span className="text-gray-700 italic border-b-2 border-primary/30">We create fast, mobile-friendly websites that help turn visitors into customers.</span>
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-0">
                                {[
                                    "Business Websites",
                                    "Landing Pages",
                                    "Portfolio Websites",
                                    "E-commerce Websites"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start text-lg text-gray-500 font-medium whitespace-nowrap">
                                        <span className="!mr-3 text-primary font-bold text-xl">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Featured 3rd Service - Flex layout 40/60 */}
                    <div className="desktop-stack-card sticky top-0 flex h-screen w-full items-center bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.1)] border-t border-gray-100 px-6 sm:px-12 lg:px-24 xl:px-32 z-[13]">
                        <div className="solution-card-anim flex flex-col justify-center w-[40%] !pl-18">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-primary font-extrabold text-4xl">03</span>
                                <div className="h-[2px] w-12 bg-primary"></div>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                                {solutions[2].title}
                            </h2>
                            <p className="text-xl text-gray-600 mb-4 font-medium leading-relaxed max-w-xl">
                                {solutions[2].description}
                            </p>
                            <p className="text-primary font-bold text-lg mb-8 flex items-center gap-2">
                                👉 <span className="text-gray-700 italic border-b-2 border-primary/30">We create engaging videos and content that grab attention and help your business stand out on social media.</span>
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-0 text-left">
                                {solutions[2].items.map((item, idx) => (
                                    <li key={idx} className="flex items-start text-lg text-gray-500 font-medium whitespace-nowrap">
                                        <span className="!mr-3 text-primary font-bold text-xl">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="hidden md:flex items-center justify-center relative min-h-[400px] w-[60%]">
                            <div style={{ width: 450, height: 450 }}>
                                <Stack
                                    randomRotation={true}
                                    sensitivity={180}
                                    sendToBackOnClick={true}
                                    cards={[
                                        <img key={1} src="/images/home-services/video-editing.webp" alt="Content 1" className="w-full h-full object-cover rounded-2xl" />,
                                        // <img key={2} src="/images/home-services/video-shooting.webp" alt="Content 2" className="w-full h-full object-cover rounded-2xl" />,
                                        <img key={3} src="/images/home-services/reels-creation.webp" alt="Content 3" className="w-full h-full object-cover rounded-2xl" />,
                                        <img key={4} src="/images/home-services/social-media-content-posting.webp" alt="Content 4" className="w-full h-full object-cover rounded-2xl" />,
                                    ]}
                                    autoplay={true}
                                    autoplayDelay={5000}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Featured 4th Service - Reverse Flex layout 60/40 */}
                    <div className="desktop-stack-card sticky top-0 flex h-screen w-full items-center bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.1)] border-t border-gray-100 px-6 sm:px-12 lg:px-24 xl:px-32 z-[14]">
                        <div className="hidden md:flex items-center justify-center relative min-h-[400px] w-[60%]">
                            <div style={{ width: 450, height: 450 }}>
                                <Stack
                                    randomRotation={true}
                                    sensitivity={180}
                                    sendToBackOnClick={true}
                                    cards={[
                                        <img key={1} src="/images/home-services/facebook-ads.webp" alt="Marketing 1" className="w-full h-full object-cover rounded-2xl" />,
                                        <img key={2} src="/images/home-services/seo.webp" alt="Marketing 2" className="w-full h-full object-cover rounded-2xl" />,
                                        <img key={3} src="/images/home-services/google-ads.webp" alt="Marketing 3" className="w-full h-full object-cover rounded-2xl" />,
                                        <img key={4} src="/images/home-services/local-business.webp" alt="Marketing 4" className="w-full h-full object-cover rounded-2xl" />,
                                    ]}
                                    autoplay={true}
                                    autoplayDelay={4200}
                                />
                            </div>
                        </div>
                        <div className="solution-card-anim flex flex-col justify-center w-[40%] !pr-18">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-primary font-extrabold text-4xl">04</span>
                                <div className="h-[2px] w-12 bg-primary"></div>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                                {solutions[3].title}
                            </h2>
                            <p className="text-xl text-gray-600 mb-4 font-medium leading-relaxed max-w-xl">
                                {solutions[3].description}
                            </p>
                            <p className="text-primary font-bold text-lg mb-8 flex items-center gap-2">
                                👉 <span className="text-gray-700 italic border-b-2 border-primary/30">We promote your business on Google and social media to reach more people and bring you more customers.</span>
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-0 text-left">
                                {solutions[3].items.map((item, idx) => (
                                    <li key={idx} className="flex items-start text-lg text-gray-500 font-medium whitespace-nowrap">
                                        <span className="!mr-3 text-primary font-bold text-xl">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Featured 5th Service - Flex layout 40/60 */}
                    <div className="desktop-stack-card sticky top-0 flex h-screen w-full items-center bg-white border-t border-gray-100 px-6 sm:px-12 lg:px-24 xl:px-32 z-[15]">
                        <div className="solution-card-anim flex flex-col justify-center w-[40%] !pl-18">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-primary font-extrabold text-4xl">05</span>
                                <div className="h-[2px] w-12 bg-primary"></div>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                                {solutions[4].title}
                            </h2>
                            <p className="text-xl text-gray-600 mb-4 font-medium leading-relaxed max-w-xl">
                                {solutions[4].description}
                            </p>
                            <p className="text-primary font-bold text-lg mb-8 flex items-center gap-2">
                                👉 <span className="text-gray-700 italic border-b-2 border-primary/30">From starting your brand to growing it, we handle everything so you can focus on running your business.</span>
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-0 text-left">
                                {solutions[4].items.map((item, idx) => (
                                    <li key={idx} className="flex items-start text-lg text-gray-500 font-medium whitespace-nowrap">
                                        <span className="!mr-3 text-primary font-bold text-xl">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="hidden md:flex items-center justify-center relative min-h-[400px] w-[60%]">
                            <div style={{ width: 450, height: 450 }}>
                                <Stack
                                    randomRotation={true}
                                    sensitivity={180}
                                    sendToBackOnClick={true}
                                    cards={[
                                        <img key={1} src="/images/home-services/brand-growth-planning.webp" alt="Growth 1" className="w-full h-full object-cover rounded-2xl" />,
                                        <img key={2} src="/images/home-services/lead-generation.webp" alt="Growth 2" className="w-full h-full object-cover rounded-2xl" />,
                                        <img key={3} src="/images/4.webp" alt="Growth 3" className="w-full h-full object-cover rounded-2xl" />,
                                        <img key={4} src="/images/home-services/digital-strategy.webp" alt="Growth 4" className="w-full h-full object-cover rounded-2xl" />,
                                    ]}
                                    autoplay={true}
                                    autoplayDelay={4800}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Scroll Stack (Refactored from Carousel) */}
                <div className="md:hidden flex flex-col w-full relative h-auto">
                    {solutions.map((solution, index) => (
                        <div
                            key={index}
                            className={`mobile-stack-card ${index === solutions.length - 1 ? 'relative' : 'sticky top-0 min-h-[90vh]'} flex flex-col w-full bg-white !pt-10 !px-6 z-10`}
                        >
                            {/* Title & Number */}
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-primary font-extrabold text-3xl">{solution.number}</span>
                                <div className="h-[2px] w-10 bg-primary"></div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
                                {solution.title}
                            </h2>

                            {/* Description */}
                            <p className="text-base text-gray-600 mb-6 font-medium leading-relaxed">
                                {solution.description}
                            </p>

                            {/* Service Names */}
                            <ul className="grid grid-cols-2 gap-x-0 gap-y-0 mb-8">
                                {solution.items.slice(0, 4).map((item, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-gray-500 font-medium leading-tight">
                                        <span className="!mr-2 text-primary font-bold">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Image Stack */}
                            <div className="flex items-center justify-center relative mt-auto !pt-4 pb-12">
                                <div style={{ width: 240, height: 240 }}>
                                    <Stack
                                        randomRotation={true}
                                        sensitivity={180}
                                        sendToBackOnClick={true}
                                        cards={
                                            index === 0 ? [
                                                <img key={1} src="/images/home-services/post.webp" alt="Branding 1" className="w-full h-full object-cover rounded-2xl" />,
                                                <img key={2} src="/images/home-services/logo.webp" alt="Branding 2" className="w-full h-full object-cover rounded-2xl" />,
                                                <img key={3} src="/images/home-services/menu-card.webp" alt="Branding 3" className="w-full h-full object-cover rounded-2xl" />,
                                                <img key={4} src="/images/home-services/posters.webp" alt="Branding 4" className="w-full h-full object-cover rounded-2xl" />,
                                            ] : index === 1 ? [
                                                <img key={1} src="/images/home-services/ecommerce-website.webp" alt="Web Dev 1" className="w-full h-full object-cover rounded-2xl" />,
                                                <img key={2} src="/images/home-services/landing-pages.webp" alt="Web Dev 2" className="w-full h-full object-cover rounded-2xl" />,
                                                <img key={3} src="/images/home-services/business-websites.webp" alt="Web Dev 3" className="w-full h-full object-cover rounded-2xl" />,
                                                <img key={4} src="/images/home-services/portfolio-website.webp" alt="Web Dev 4" className="w-full h-full object-cover rounded-2xl" />,
                                            ] : index === 2 ? [
                                                <img key={1} src="/images/home-services/video-editing.webp" alt="Content 1" className="w-full h-full object-cover rounded-2xl" />,
                                                <img key={2} src="/images/home-services/video-shooting.webp" alt="Content 2" className="w-full h-full object-cover rounded-2xl" />,
                                                <img key={3} src="/images/home-services/reels-creation.webp" alt="Content 3" className="w-full h-full object-cover rounded-2xl" />,
                                                <img key={4} src="/images/home-services/social-media-content-posting.webp" alt="Content 4" className="w-full h-full object-cover rounded-2xl" />,
                                            ] : index === 3 ? [
                                                <img key={1} src="/images/home-services/google-ads.webp" alt="Marketing 1" className="w-full h-full object-cover rounded-2xl" />,
                                                <img key={2} src="/images/home-services/seo.webp" alt="Marketing 2" className="w-full h-full object-cover rounded-2xl" />,
                                                <img key={3} src="/images/home-services/facebook-ads.webp" alt="Marketing 3" className="w-full h-full object-cover rounded-2xl" />,
                                                <img key={4} src="/images/home-services/local-business.webp" alt="Marketing 4" className="w-full h-full object-cover rounded-2xl" />,
                                            ] : [
                                                <img key={1} src="/images/home-services/brand-growth-planning.webp" alt="Growth 1" className="w-full h-full object-cover rounded-2xl" />,
                                                <img key={2} src="/images/home-services/lead-generation.webp" alt="Growth 2" className="w-full h-full object-cover rounded-2xl" />,
                                                <img key={3} src="/images/4.webp" alt="Growth 3" className="w-full h-full object-cover rounded-2xl" />,
                                                <img key={4} src="/images/home-services/digital-strategy.webp" alt="Growth 4" className="w-full h-full object-cover rounded-2xl" />,
                                            ]
                                        }
                                        autoplay={true}
                                        autoplayDelay={4000 + (index * 200)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SolutionsSection;
