"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { categories, insights } from "./data";
import FinalCTA from "@/components/FinalCTA";
import Button from "@/components/Button";

export default function InsightsPage() {
    const scrollToInsights = () => {
        const element = document.getElementById("insights-grid-section");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
    const [selectedCategory, setSelectedCategory] = React.useState("All");
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 6;
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [scrollInfo, setScrollInfo] = React.useState({ scrollLeft: 0, scrollWidth: 1, clientWidth: 1 });

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setScrollInfo({ scrollLeft, scrollWidth, clientWidth });
        }
    };

    React.useEffect(() => {
        handleScroll();
        // Use a small timeout to ensure layout is ready
        const timer = setTimeout(handleScroll, 100);
        window.addEventListener('resize', handleScroll);
        return () => {
            window.removeEventListener('resize', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    // Reset to first page when category changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

    const filteredInsights = insights.filter(i => {
        const matchesCategory = selectedCategory === "All" || i.category === selectedCategory;
        return matchesCategory;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredInsights.length / itemsPerPage);
    const paginatedInsights = filteredInsights.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            {/* Insights Hero Section */}
            <section
                className="relative w-full min-h-[75vh] min-[340px]:min-h-[60vh] min-[360px]:min-h-[75vh] min-[380px]:min-h-[60vh] min-[400px]:min-h-[58vh] min-[540px]:min-h-[68vh] min-[760px]:min-h-[66vh] min-[1024px]:min-h-screen flex items-center overflow-hidden"
                style={{ background: "radial-gradient(circle at top, #FFFFFF 0%, #2197A1 100%)" }}
            >
                {/* Content Container */}
                <div className="z-10 w-full max-w-7xl !mx-auto flex md:flex-row flex-col items-center !px-4 md:!px-2 !pt-10 md:!pt-10 gap-8 md:gap-1">
 
                    {/* Hero Content Wrapper */}
                    <div className="w-full md:w-[70%] flex flex-col items-center md:items-start translate-y-[-20px] md:pr-0">
                        {/* Title: Centered on Mobile */}
                        <h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[#2A2A2A] !mb-2 md:mb-6 leading-tight break-words text-center md:text-left w-full">
                            Insights & <span className="text-[#2197A1]">Innovation</span>
                        </h1>

                        <div className="w-full flex flex-col md:block">
                            {/* Short mobile content: Centered as requested */}
                            <p className="block md:hidden text-base sm:text-base text-[#2A2A2A]/80 font-medium leading-snug text-center mb-8">
                                Stay ahead in the digital landscape with expert insights, performance marketing trends, and actionable growth strategies.
                            </p>

                            {/* Desktop long content */}
                            <div className="hidden md:block">
                                <p className="text-lg md:text-xl text-[#2A2A2A]/80 font-medium leading-relaxed max-w-3xl mb-1 md:mb-8">
                                    Welcome to the Prodbiz Insights portal, your dedicated destination for staying ahead in the
                                    rapidly evolving digital landscape. We believe that knowledge sharing is the cornerstone
                                    of innovation, which is why we curate the latest industry trends, performance marketing
                                    breakthroughs, and technical deep-dives for ambitious businesses. Our expert team regularly
                                    publishes actionable strategies, from mastering search engine algorithms to optimizing
                                    high-conversion user interfaces, helping you navigate technology with a competitive edge.
                                </p>
                            </div>
                        </div>

                        {/* Mobile Image: Rendered below content on mobile */}
                        <div className="md:hidden w-full flex justify-center !mt-4 !mb-2 h-[150px] relative">
                             {/* Ambient Glow */} 
                            <div className="absolute inset-x-0 bottom-0 top-10 bg-gradient-to-t from-[#2197A1] to-transparent rounded-[4rem] blur-[60px] opacity-20 pointer-events-none"></div>
                            <Image
                                src="/images/hero-insights.png"
                                alt="Insights & Innovation"
                                fill
                                className="object-contain drop-shadow-xl scale-125"
                                priority
                            />
                        </div>
                        {/* Button: Centered on Mobile */}
                        <div className="w-full flex justify-center md:justify-start">
                            <Button
                                onClick={scrollToInsights}
                                className="inline-flex items-center gap-2 md:gap-3 bg-[#e76038] !text-white !px-6 md:!px-6 !py-3 md:!py-3 rounded-xl md:rounded-3xl font-bold text-lg md:text-lg hover:bg-[#e76038]/90 transition-all transform hover:scale-100 active:scale-95 shadow-md md:shadow-2xl relative z-10"
                            >
                                <span>Explore Our Insights</span>
                                <ArrowRight size={16} className="md:w-[22px] md:h-[22px]" />
                            </Button>
                        </div>
                    </div>

                    {/* Desktop Image - Hidden on Mobile */}
                    <div className="hidden md:flex w-[40%] md:w-[40%] md:!mb-20 justify-center items-center h-full min-h-[300px] md:min-h-[400px]">
                        <Image
                            src="/images/hero-insights.png"
                            alt="Insights & Innovation"
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


            {/* Tab Filter Section - Redesigned like Inside Prodbiz */}
            <div className="w-full max-w-5xl !mx-auto !mt-10 md:!mb-10 !px-2 md:!px-12 z-20">
                <style jsx>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        height: 4px;
                        display: block;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: rgba(33, 151, 161, 0.1);
                        border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #2197A1;
                        border-radius: 10px;
                    }
                    .custom-scrollbar {
                        scrollbar-width: thin;
                        scrollbar-color: #2197A1 rgba(33, 151, 161, 0.1);
                        -webkit-overflow-scrolling: touch;
                    }
                `}</style>
                <div className="bg-[#f0f9fa] rounded-3xl md:rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.18)] !pt-1 overflow-hidden relative">
                    <div
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="flex items-center md:justify-between justify-start px-4 md:px-16 !pb-1 md:!py-2 overflow-x-auto md:overflow-x-hidden no-scrollbar scroll-smooth"
                    >
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className="flex flex-col items-center flex-shrink-0 w-[28%] md:w-[20%] !py-1 md:!gap-2 transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    <Icon
                                        size={24}
                                        className={`${isActive ? "text-[#e76038]" : "text-gray-400"} transition-colors`}
                                    />
                                    <span
                                        className={`text-[10px] md:text-sm font-semibold tracking-wide whitespace-nowrap ${isActive ? "text-[#e76038]" : "text-gray-500"} transition-colors`}
                                    >
                                        {cat.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Border-style Scroll Indicator for Mobile */}
                    <div className="md:hidden absolute bottom-0 left-0 w-full h-[4px] bg-[#2197A1]/10 overflow-hidden">
                        <div
                            className="h-full bg-[#2197A1] transition-all duration-150"
                            style={{
                                width: `${(scrollInfo.clientWidth / scrollInfo.scrollWidth) * 100}%`,
                                transform: `translateX(${(scrollInfo.scrollLeft / scrollInfo.clientWidth) * 100}%)`
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Insights Grid */}
            <section id="insights-grid-section" className="w-full max-w-7xl mx-auto !px-6 md:!px-0 !pt-15 md:!pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {paginatedInsights.map((insight) => (
                        <div
                            key={insight.id}
                            className="group flex flex-col gap-4 bg-[#f0f9fa] rounded-[2rem] overflow-hidden !p-2 border-2 border-gray-100 hover:border-[#2197A1]/20 transition-all hover:shadow-2xl hover:-translate-y-2"
                        >
                            {/* Card Image */}
                            <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem]">
                                <img
                                    src={insight.image}
                                    alt={insight.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-white/80  backdrop-blur-md !px-4 !py-1.5 rounded-full text-xs font-bold text-[#e76038] shadow-sm">
                                    {insight.category}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="!p-2 flex flex-col flex-1">
                                <span className="text-gray-400 text-xs !mb-2 font-medium uppercase tracking-widest">{insight.date}</span>
                                <h3 className="text-2xl !mb-2 font-bold text-[#2A2A2A] group-hover:text-[#2197A1] transition-colors line-clamp-2">
                                    {insight.title}
                                </h3>
                                <p className="text-gray-500 !mb-0 text-sm leading-relaxed line-clamp-3">
                                    {insight.description}
                                </p>
                                <div className="mt-auto !pt-4">
                                    <Link
                                        href={`/insights/${insight.slug}`}
                                        className="inline-flex items-center gap-2 text-[#2197A1] font-bold text-sm uppercase tracking-wider group/btn2"
                                    >
                                        Read More
                                        <ArrowRight size={16} className="transform group-hover/btn2:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredInsights.length === 0 ? (
                    <div className="w-full text-center py-20">
                        <h3 className="text-2xl font-bold text-gray-400">No articles found matching your criteria.</h3>
                    </div>
                ) : (
                    /* Pagination Controls */
                    totalPages > 1 && (
                        <div className="!mt-20 flex items-center justify-center gap-4">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className={`!px-6 !py-3 rounded-2xl font-bold transition-all ${currentPage === 1
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-[#2197A1] border border-[#2197A1]/20 hover:bg-[#2197A1] hover:text-white shadow-lg"
                                    }`}
                            >
                                Previous
                            </button>

                            <div className="flex items-center gap-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-12 h-12 rounded-2xl font-bold transition-all ${currentPage === i + 1
                                            ? "bg-[#2197A1] text-white shadow-lg shadow-[#2197A1]/20"
                                            : "bg-white text-gray-500 border border-gray-100 hover:bg-gray-50"
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className={`!px-6 !py-3 rounded-2xl font-bold transition-all ${currentPage === totalPages
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-[#2197A1] border border-[#2197A1]/20 hover:bg-[#2197A1] hover:text-white shadow-lg"
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    )
                )}
            </section>

            {/* Final CTA Section */}
            <FinalCTA />
        </main>
    );
}
