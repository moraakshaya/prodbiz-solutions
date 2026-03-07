import React from "react";

const whyChooseUsData = [
    {
        step: "01",
        title: "Data-Driven Strategies",
        description: "We use advanced analytics to fuel every decision and maximize ROI.",
        icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" />
                <path d="M3 10h18" />
                <path d="M15 11l2 2 4-4" />
            </svg>
        ),
        color: "from-cyan-400 to-blue-500",
    },
    {
        step: "02",
        title: "Custom Solutions",
        description: "Tailored IT projects designed specifically for your unique business needs.",
        icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4" />
                <path d="M12 18v4" />
                <path d="M4.93 4.93l2.83 2.83" />
                <path d="M16.24 16.24l2.83 2.83" />
                <path d="M2 12h4" />
                <path d="M18 12h4" />
                <path d="M4.93 19.07l2.83-2.83" />
                <path d="M16.24 7.76l2.83-2.83" />
            </svg>
        ),
        color: "from-blue-500 to-indigo-600",
    },
    {
        step: "03",
        title: "Transparent Reporting",
        description: "Clear, honest communication and real-time performance tracking.",
        icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20V10" />
                <path d="M18 20V4" />
                <path d="M6 20v-4" />
            </svg>
        ),
        color: "from-indigo-600 to-purple-600",
    },
    {
        step: "04",
        title: "Dedicated Team",
        description: "Expert professionals committed to your long-term success.",
        icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        color: "from-purple-600 to-pink-500",
    },
];

const WhyChooseUs = () => {
    return (
        <section className="relative w-full !py-20 px-6 flex items-center justify-center overflow-hidden">
            {/* Background Gradient matching hero */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2197A1] via-[#1b7a82] to-[#125960] -z-20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent -z-10" />

            <div className="max-w-7xl mx-auto text-center">
                {/* Header Text */}
                <div className="mb-20 flex flex-col items-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Why Choose ProdBiz ?
                    </h2>
                    {/* <div className="w-24 h-1.5 bg-white mx-auto mb-6 rounded-full opacity-80"></div> */}
                    <p className="max-w-3xl text-lg text-white/80 font-medium">
                        We empower businesses with cutting-edge technology and strategic vision. Our commitment to excellence drives everything we do.
                    </p>
                </div>

                {/* 3D Circular Infographic Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                    {whyChooseUsData.map((item, idx) => (
                        <div key={idx} className="group relative flex flex-col items-center">
                            {/* Circular Card with 3D effect */}
                            <div className="relative w-64 h-64 !my-3">
                                {/* Outer Rotating Arc Background */}
                                <div className={`absolute inset-0 rounded-full border-[8px] border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]`} />

                                {/* Colored Gradient Arc */}
                                <div className={`absolute inset-0 rounded-full border-[8px] border-transparent border-t-white/40 border-r-white/40 rotate-45 group-hover:rotate-180 transition-transform duration-1000`} />

                                {/* Main Circle - Glassmorphism 3D effect */}
                                <div className="absolute inset-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl flex flex-col items-center justify-center p-6 transition-all duration-300 group-hover:bg-white group-hover:scale-100 group-hover:-translate-y-0">
                                    <div className={`mb-3 transition-colors duration-300 group-hover:text-primary text-white`}>
                                        {item.icon}
                                    </div>
                                    <span className={`text-xs font-black mb-1 transition-colors duration-300 group-hover:text-primary/70 text-white/60 tracking-widest uppercase`}>
                                        Step {item.step}
                                    </span>
                                    <h4 className={`text-lg font-bold transition-colors duration-300 group-hover:text-gray-900 text-white leading-tight`}>
                                        {item.title}
                                    </h4>
                                </div>

                                {/* Animated Arrow for desktop connectors */}
                                {idx < 3 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-8 -translate-y-1/2 z-20">
                                        <svg className="w-8 h-8 text-white/30 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Description below circle */}
                            <p className="text-white/70 text-sm font-medium leading-relaxed max-w-[200px] transition-colors duration-300 group-hover:text-white">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
