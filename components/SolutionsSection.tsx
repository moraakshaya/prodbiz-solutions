"use client";

import React from "react";

const solutions = [
    {
        number: "01",
        title: "Digital Product & Software Development",
        items: [
            "Website Design & Development",
            "Web Application Development",
            "API Development & Integrations",
            "HRM Software Solutions",
        ],
    },
    {
        number: "02",
        title: "Performance Marketing",
        items: [
            "Search Engine Optimization (SEO)",
            "Social Media Marketing",
            "Pay-Per-Click (PPC) Campaigns",
            "Content Marketing",
        ],
    },
    {
        number: "03",
        title: "Brand Growth & Reputation Management",
        items: [
            "Influencer Marketing",
            "Online Reputation Management (ORM)",
        ],
    },
    {
        number: "04",
        title: "Data, Analytics & Campaign Intelligence",
        items: [
            "Marketing Analytics",
            "Campaign Performance Tracking",
        ],
    },
    {
        number: "05",
        title: "Creative Media & Brand Production",
        items: [
            "Branding & Design Services",
            "Corporate Reels & Promotional Videos",
            "Videography & Photography",
        ],
    },
];

const SolutionCard = ({ number, title, items }: { number: string; title: string; items: string[] }) => {
    return (
        <div className="group relative flex flex-col items-center pt-10 h-full">
            {/* Number Badge - Precise styling from image */}
            <div className="absolute -top-5 z-30 flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-[#f2f4f7] bg-primary text-3xl font-extrabold text-white shadow-[0_8px_15px_rgba(33,151,161,0.2)] transition-transform duration-300 group-hover:scale-110">
                {number}
            </div>

            {/* Card Container */}
            <div className="flex flex-col flex-1 w-[95%] bg-white rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_35px_70px_rgba(0,0,0,0.1)] hover:-translate-y-2 overflow-hidden">
                {/* Exact Wave Shape Header */}
                <div className="relative h-35 w-full bg-primary overflow-hidden">
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
                <div className="flex flex-col flex-1 px-8 pb-8 pt-4 items-center text-center">
                    {/* Title */}
                    <h4 className="text-xl font-bold text-gray-800 tracking-wide min-h-[4rem] flex items-center justify-center">
                        {title}
                    </h4>

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
    return (
        <section className="!py-18 w-full">
            <div className="container mx-auto px-6 sm:px-12 lg:px-24 xl:px-32 max-w-[1800px]">
                {/* Section Header */}
                <div className="!mb-8 text-center flex flex-col items-center">
                    <h2 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl tracking-tight max-w-5xl">
                        Comprehensive Digital Solutions for Modern Businesses
                    </h2>
                    <p className="max-w-3xl text-lg text-gray-500 font-medium leading-relaxed">
                        We provide cutting-edge technology and creative strategies to help your business thrive in the digital age.
                    </p>
                </div>

                {/* Cards Grid - Uniform spacing */}
                <div className="grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-stretch w-full px-15">
                    {solutions.map((solution, index) => (
                        <SolutionCard key={index} {...solution} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SolutionsSection;
