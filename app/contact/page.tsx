"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    return (
        <main className="flex min-h-screen flex-col items-center">
            {/* Contact Hero Section */}
            <section
                className="relative w-full min-h-[90vh] flex items-center overflow-hidden"
                style={{ background: "radial-gradient(circle at top, #FFFFFF 0%, #2197A1 100%)" }}
            >
                {/* Content Container */}
                <div className="z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6">

                    {/* Left Side: Heading and Paragraph (80% Area) */}
                    <div className="w-full md:w-[70%] !pl-[14%] flex flex-col items-start">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2A2A2A] mb-6">
                            Get In Touch
                        </h1>
                        <p className="text-lg md:text-xl text-[#2A2A2A]/80 font-medium max-w-3xl">
                            We're here to help you grow your business. Reach out to our team
                            for inquiries, project proposals, or just to say hello. Let's build
                            something amazing together.
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

            {/* Split Interaction Section */}
            <section className="relative w-full min-h-[80vh] bg-white py-20 px-6 sm:px-12 lg:px-24 flex justify-center -mt-10 lg:-mt-20 z-20">
                <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">

                    {/* Left: Contact Form (3D Neumorphic / Glassmorphic card) */}
                    <div className="w-full lg:w-1/2 flex flex-col z-10 relative">
                        {/* More pronounced glassmorphism wrapper with Light Teal focus */}
                        <div className="w-full !p-8 sm:p-12">

                            <div className="mb-10 text-center sm:text-left">
                                <h3 className="text-[#2A2A2A] !mb-1 tracking-tight">Send a message</h3>
                                <p className="text-gray-500 font-medium">We'll get back to you as soon as possible.</p>
                            </div>

                            <form id="contact-form" className="flex flex-col gap-5 sm:gap-6" onSubmit={(e) => e.preventDefault()}>
                                {/* Split row for Name & Phone if desired, or keep stacked. Keeping stacked for simplicity but adjusting spacing */}

                                {/* Name Input */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="text-sm font-bold text-[#2A2A2A] ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        suppressHydrationWarning
                                        className="w-full bg-[#2197A1]/10 text-[#2A2A2A] rounded-2xl !px-5 !py-2 border-2 border-[#2197A1]/10 focus:border-[#2197A1]/30 focus:bg-[#2197A1]/10 focus:outline-none focus:ring-2 focus:ring-[#2197A1]/10 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
                                    {/* Email Input */}
                                    <div className="flex flex-col gap-2 w-full sm:w-1/2">
                                        <label htmlFor="email" className="text-sm font-bold text-[#2A2A2A] ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            suppressHydrationWarning
                                            className="w-full bg-[#2197A1]/10 text-[#2A2A2A] rounded-2xl !px-5 !py-2 border-2 border-[#2197A1]/10 focus:border-[#2197A1]/30 focus:bg-[#2197A1]/10 focus:outline-none focus:ring-2 focus:ring-[#2197A1]/10 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    {/* Phone Input */}
                                    <div className="flex flex-col gap-2 w-full sm:w-1/2">
                                        <label htmlFor="phone" className="text-sm font-bold text-[#2A2A2A] ml-1">Phone Number <span className="text-gray-400 font-normal">(Optional)</span></label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            suppressHydrationWarning
                                            className="w-full bg-[#2197A1]/10 text-[#2A2A2A] rounded-2xl !px-5 !py-2 border-2 border-[#2197A1]/10 focus:border-[#2197A1]/30 focus:bg-[#2197A1]/10 focus:outline-none focus:ring-2 focus:ring-[#2197A1]/10 transition-all shadow-[inset_0_2_4px_rgba(0,0,0,0.01)]"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>

                                {/* Message Textarea */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="message" className="text-sm font-bold text-[#2A2A2A] ml-1">How can we help you?</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        suppressHydrationWarning
                                        className="w-full bg-[#2197A1]/10 text-[#2A2A2A] rounded-2xl !px-5 !py-2 border-2 border-[#2197A1]/10 focus:border-[#2197A1]/30 focus:bg-[#2197A1]/10 focus:outline-none focus:ring-2 focus:ring-[#2197A1]/10 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
                                        placeholder="Tell us about your project..."
                                    ></textarea>
                                </div>

                                {/* 3D Submit Button */}
                                <div className="mt-4">
                                    <button
                                        suppressHydrationWarning
                                        className="w-full group relative inline-flex items-center justify-center bg-[#2197A1] text-white font-bold text-lg py-4 rounded-2xl shadow-[0_8px_0_#125960,0_15px_30px_rgba(33,151,161,0.3)] active:shadow-[0_0px_0_#125960,0_0px_0_rgba(33,151,161,0.4)] active:translate-y-2 transform transition-all duration-150 overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            Send Message
                                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </span>
                                        {/* Subtle shine effect on hover */}
                                        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right: Info / Value Proposition Section */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 md:px-12 py-10 lg:py-0">
                        <div className="max-w-md ml-auto mr-auto lg:mr-0 lg:ml-8">
                            <h3 className="text-4xl md:text-5xl font-bold text-[#2A2A2A] mb-4 leading-tight">
                                Let's talk about<br />
                                <span className="text-[#2197A1]">your project</span>
                            </h3>
                            <p className="text-gray-600 mb-10 text-lg">
                                Whether you have a clear vision or need help defining your strategy, we're here to guide you to success.
                            </p>

                            <div className="flex flex-col gap-2">
                                {/* Benefit 1 */}
                                <div className="flex items-start gap-5 group">
                                    <div className="flex-shrink-0 w-14 h-14 bg-orange-50 group-hover:bg-[#e76038] transition-colors duration-300 flex items-center justify-center rounded-2xl shadow-sm border border-orange-100">
                                        <span className="text-[#e76038] group-hover:text-white transition-colors duration-300 text-2xl">⚡</span>
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-xl font-bold text-[#2A2A2A] mb-1">Fast Response</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">We aim to respond to all inquiries within 24 hours.</p>
                                    </div>
                                </div>

                                {/* Benefit 2 */}
                                <div className="flex items-start gap-5 group">
                                    <div className="flex-shrink-0 w-14 h-14 bg-teal-50 group-hover:bg-[#2197A1] transition-colors duration-300 flex items-center justify-center rounded-2xl shadow-sm border border-teal-100">
                                        <span className="text-[#2197A1] group-hover:text-white transition-colors duration-300 text-2xl">📩</span>
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-xl font-bold text-[#2A2A2A] mb-1">Dedicated Team</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">Direct access to experts who will personally handle your case.</p>
                                    </div>
                                </div>

                                {/* Benefit 3 */}
                                <div className="flex items-start gap-5 group">
                                    <div className="flex-shrink-0 w-14 h-14 bg-gray-50 group-hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center rounded-2xl shadow-sm border border-gray-200">
                                        <span className="text-gray-600 group-hover:text-white transition-colors duration-300 text-2xl">🔒</span>
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-xl font-bold text-[#2A2A2A] mb-1">Secure Form</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">Your information is strictly confidential and protected.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>


            {/* Contact Info & Map Section */}
            <section className="w-full bg-white !py-5 !px-6 sm:px-12">
                <div className="w-full !mx-auto flex flex-col !gap-1 items-center">

                    {/* LEFT: 3 Redesigned Sticky-Note Cards — 66% */}
                    <div className="w-full  flex flex-col sm:flex-row gap-8 items-center justify-center flex-wrap !pb-10">

                        {/* Card 1: Our Office — Orange Bottom-Left Accent */}
                        <div className="relative flex-shrink-0 w-[260px] h-[250px] bg-white rounded-[3rem] border border-gray-200 p-8 flex flex-col items-center justify-center text-center group transform transition-all duration-300 hover:-translate-y-2 cursor-default overflow-hidden">
                            {/* Thick Corner Accent */}
                            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[6px] border-l-[6px] border-[#e76038] rounded-bl-[3rem]"></div>

                            {/* Label */}
                            <p className="text-[#2197A1] font-bold text-xs uppercase tracking-widest mb-2">01 OUR OFFICE</p>

                            {/* Heading */}
                            <h4 className="text-[#2A2A2A] font-bold text-lg mb-4">Location</h4>

                            {/* Text */}
                            <p className="text-gray-500 text-xs leading-relaxed">
                                St. Peter's Tech Park<br />
                                Madhapur, HITEC City<br />
                                Hyderabad, Telangana<br />
                                – 500081
                            </p>
                        </div>

                        {/* Card 2: Working Hours — Orange Top-Left Accent */}
                        <div className="relative flex-shrink-0 w-[260px] h-[250px] bg-white rounded-[3rem] border border-gray-200 p-8 flex flex-col items-center justify-center text-center group transform transition-all duration-300 hover:-translate-y-2 cursor-default overflow-hidden mt-8 sm:mt-12">
                            {/* Thick Corner Accent */}
                            <div className="absolute top-0 left-0 w-16 h-16 border-t-[6px] border-l-[6px] border-[#e76038] rounded-tl-[3rem]"></div>

                            {/* Label */}
                            <p className="text-[#2197A1] font-bold text-xs uppercase tracking-widest mb-2">02 WORKING HOURS</p>

                            {/* Heading */}
                            <h4 className="text-[#2A2A2A] font-bold text-lg mb-4">Schedule</h4>

                            {/* Text */}
                            <p className="text-gray-500 text-xs leading-relaxed">
                                <span className="font-medium text-gray-700">Mon – Fri :</span> 9 AM – 6 PM<br />
                                <span className="font-medium text-gray-700">Saturday :</span> 10 AM – 2 PM<br />
                                <span className="font-medium text-gray-700">Sunday :</span> Closed
                            </p>
                        </div>

                        {/* Card 3: Contact Us — Orange Top-Right Accent */}
                        <div className="relative flex-shrink-0 w-[260px] h-[250px] bg-white rounded-[3rem] border border-gray-200 p-8 flex flex-col items-center justify-center text-center group transform transition-all duration-300 hover:-translate-y-2 cursor-default overflow-hidden">
                            {/* Thick Corner Accent */}
                            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[6px] border-l-[6px] border-[#e76038] rounded-bl-[3rem]"></div>

                            {/* Label */}
                            <p className="text-[#2197A1] font-bold text-xs uppercase tracking-widest mb-2">03 CONTACT US</p>

                            {/* Heading */}
                            <h4 className="text-[#2A2A2A] font-bold text-lg mb-4">Reach Out</h4>

                            {/* Text */}
                            <p className="text-gray-500 text-xs leading-relaxed">
                                <span className="font-medium text-gray-700">Phone No:</span> +91 98765 43210<br />
                                <span className="font-medium text-gray-700">Email:</span> hello@company.com
                            </p>
                        </div>


                    </div>

                    {/* RIGHT: Live Map — 30% */}
                    <div className="w-full lg:w-[88%] min-h-[400px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(33,151,161,0.15)] relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.244504437476!2d78.37615831484326!3d17.447190988034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dbb1d60e71%3A0x3de8b4c0e7f6e12e!2sMadhapur%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                            className="w-full h-full absolute inset-0"
                            style={{ border: 0, minHeight: '400px' }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                        {/* Overlay label */}
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-md z-10 flex items-center gap-2 pointer-events-none">
                            <span className="text-[#e76038] text-lg">📍</span>
                            <div>
                                <p className="text-[#2A2A2A] font-bold text-xs">HITEC City</p>
                                <p className="text-gray-500 text-[10px]">Hyderabad, Telangana</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Final CTA Section */}
            <section className="w-full !pt-55 pb-0 px-6">
                <div className="!mx-auto relative">
                    {/* Splash Top Border */}
                    <div className="absolute top-0 left-0 w-full overflow-visible leading-[0] transform -translate-y-full pointer-events-none">
                        <svg
                            viewBox="0 0 1200 160"
                            className="w-full h-40 md:h-64 overflow-visible"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <linearGradient id="waveGradientBack" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#2197A1" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#2197A1" stopOpacity="0.25" />
                                </linearGradient>
                                <linearGradient id="waveGradientFront" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#2197A1" stopOpacity="0.05" />
                                    <stop offset="100%" stopColor="#2197A1" stopOpacity="0.1" />
                                </linearGradient>
                            </defs>
                            {/* Layer 1: Back Lighter Wave */}
                            <path
                                d="M0,160 C150,160 200,100 350,120 C500,140 550,60 650,40 C750,20 850,100 1000,80 C1150,60 1200,160 1200,160 L0,160 Z"
                                fill="url(#waveGradientBack)"
                            />

                            {/* Organic Blobs/Spots between layers */}
                            <ellipse cx="250" cy="110" rx="20" ry="12" fill="url(#waveGradientBack)" opacity="0.5" transform="rotate(-15, 250, 110)" />
                            <ellipse cx="600" cy="60" rx="15" ry="10" fill="url(#waveGradientBack)" opacity="0.6" transform="rotate(20, 600, 60)" />
                            <ellipse cx="900" cy="90" rx="18" ry="11" fill="url(#waveGradientBack)" opacity="0.5" transform="rotate(-10, 900, 90)" />

                            {/* Layer 2: Main Front Wave */}
                            <path
                                d="M0,160 C100,160 180,120 300,140 C420,160 500,80 600,100 C700,120 780,40 900,60 C1020,80 1100,160 1200,160 L0,160 Z"
                                fill="url(#waveGradientFront)"
                            />

                            {/* Additional droplets on top */}
                            <circle cx="450" cy="115" r="8" fill="url(#waveGradientBack)" opacity="0.4" />
                            <circle cx="750" cy="70" r="6" fill="url(#waveGradientBack)" opacity="0.3" />
                            <circle cx="1050" cy="110" r="5" fill="url(#waveGradientBack)" opacity="0.2" />
                        </svg>
                    </div>

                    <div className="bg-[#2197A1]/28 !p-12 md:p-20 text-center relative overflow-hidden">
                        {/* Background Accents */}
                        {/* <div className="absolute top-0 right-0 w-64 h-64 bg-[#2197A1] opacity-10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#e76038] opacity-10 rounded-full -ml-32 -mb-32 blur-3xl"></div> */}

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10 leading-tight">
                            Ready to Start Your Project?
                        </h2>
                        <p className="text-lg md:text-xl text-gray-500 font-medium mb-10 max-w-2xl !mx-auto relative z-10">
                            Tell us about your goals and we’ll help you build the right digital solution for your business.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 bg-[#e76038] !text-white !px-6 !py-3 rounded-3xl font-bold text-lg hover:bg-[#e76038]/90 transition-all transform hover:scale-105 active:scale-95 shadow-2xl relative z-10"
                        >
                            Start Your Project
                            <ArrowRight size={22} />
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}
