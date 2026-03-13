"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import FinalCTA from "@/components/FinalCTA";

export default function DigitalProductSoftwareDevelopmentPage() {
    return (
        <main className="flex min-h-screen flex-col items-center">
            {/* Hero Section */}
            <section
                className="relative w-full min-h-[90vh] flex items-center overflow-hidden"
                style={{ background: "radial-gradient(circle at top, #FFFFFF 0%, #2197A1 100%)" }}
            >
                {/* Content Container */}
                <div className="z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6">

                    {/* Left Side: Heading and Paragraph (70% Area) */}
                    <div className="w-full md:w-[70%] !pl-[14%] flex flex-col items-start">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2A2A2A] mb-6">
                            Digital Product & <br />
                            <span className="text-[#2197A1]">Software Development</span>
                        </h1>
                        <p className="text-lg md:text-xl text-[#2A2A2A]/80 font-medium max-w-3xl">
                            We build scalable, high-performance software solutions tailored to your business needs.
                            From concept to deployment, our team ensures your digital products are built with
                            precision, efficiency, and future-proof technology.
                        </p>
                    </div>

                    {/* Right Side: Empty space for image (20% Area) */}
                    <div className="w-full md:w-[20%] flex justify-center items-center h-full min-h-[300px]">
                        {/* Empty space left for future image */}
                    </div>

                </div>

                {/* Bottom 3D Drip Border */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px]">
                    <svg
                        className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[140px]"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
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

            {/* Content Section Placeholder */}
            <section className="w-full bg-white py-20 px-6 sm:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-8">Elevate Your Digital Presence</h2>
                    <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                        In today's competitive landscape, having a robust digital product is not just an advantage—it's
                        a necessity. We combine cutting-edge technology with user-centric design to create software
                        that drives results.
                    </p>
                </div>
            </section>

            <FinalCTA />
        </main>
    );
}
