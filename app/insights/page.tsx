"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories, insights } from "./data";

export default function InsightsPage() {
    const [selectedCategory, setSelectedCategory] = React.useState("All");
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 6;

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
                className="relative w-full min-h-[90vh] flex items-center overflow-hidden"
                style={{ background: "radial-gradient(circle at top, #FFFFFF 0%, #2197A1 100%)" }}
            >
                {/* Content Container */}
                <div className="z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 pt-20">

                    {/* Left Side: Heading and Paragraph */}
                    <div className="w-full md:w-[70%] !pl-[14%] flex flex-col items-start translate-y-[-20px]">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2A2A2A] mb-6 leading-tight">
                            Insights & <span className="text-[#2197A1]">Innovation</span>
                        </h1>
                        <p className="text-lg md:text-xl text-[#2A2A2A]/80 font-medium max-w-3xl">
                            Explore expert insights, digital trends, and practical strategies
                            to help your business grow online.
                        </p>
                    </div>

                    <div className="w-full md:w-[20%] flex justify-center items-center h-full min-h-[300px]">
                    </div>
                </div>

                {/* Bottom 3D Drip Border */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px]">
                    <svg
                        className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[140px]"
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
            <div className="w-full max-w-5xl mx-auto !mt-10 !mb-10 !px-12 z-20">
                <div className="bg-[#f0f9fa] rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.18)] flex items-center justify-between px-8 md:px-16 py-4 overflow-x-hidden overflow-y-hidden no-scrollbar">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = selectedCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className="flex flex-col items-center w-full !py-1 !gap-2 transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                <Icon
                                    size={24}
                                    className={`${isActive ? "text-[#e76038]" : "text-gray-400"} transition-colors`}
                                />
                                <span
                                    className={`text-sm font-semibold tracking-wide whitespace-nowrap ${isActive ? "text-[#e76038]" : "text-gray-500"} transition-colors`}
                                >
                                    {cat.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Insights Grid */}
            <section className="w-full max-w-7xl mx-auto px-6 !pt-15 !pb-20">
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
        </main>
    );
}
