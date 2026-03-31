"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, Clock, Calendar, CheckCircle2 } from "lucide-react";
import { insights } from "../data";
import Button from "@/components/Button";
import FinalCTA from "@/components/FinalCTA";

const renderContent = (content: string) => {
    return content.split("\n\n").map((block, blockIdx) => {
        const trimmedBlock = block.trim();
        if (!trimmedBlock) return null;

        // Handle Headings
        if (trimmedBlock.startsWith("###")) {
            return (
                <h3 key={blockIdx} className="text-3xl font-bold text-[#2A2A2A] mt-16 mb-8">
                    {trimmedBlock.replace("### ", "").trim()}
                </h3>
            );
        }

        // Handle Lists within a block
        const lines = trimmedBlock.split("\n");
        const containsList = lines.some(line => line.trim().startsWith("- "));

        if (containsList) {
            const elements: React.ReactNode[] = [];
            let currentList: string[] = [];

            lines.forEach((line, lineIdx) => {
                const trimmedLine = line.trim();
                if (trimmedLine.startsWith("- ")) {
                    currentList.push(trimmedLine.substring(2));
                } else {
                    // If we were building a list, push it now
                    if (currentList.length > 0) {
                        elements.push(
                            <ul key={`list-${lineIdx}`} className="space-y-4 my-6 list-none pl-2">
                                {currentList.map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="mt-1.5 shrink-0">
                                            <CheckCircle2 className="text-[#2197A1]" size={18} />
                                        </div>
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        );
                        currentList = [];
                    }
                    if (trimmedLine) {
                        elements.push(<p key={`p-${lineIdx}`} className="mb-4">{trimmedLine}</p>);
                    }
                }
            });

            // Final list if block ends with a list
            if (currentList.length > 0) {
                elements.push(
                    <ul key={`list-final`} className="space-y-4 my-6 list-none pl-2">
                        {currentList.map((item, i) => (
                            <li key={i} className="flex items-start gap-4">
                                <div className="mt-1.5 shrink-0">
                                    <CheckCircle2 className="text-[#2197A1]" size={18} />
                                </div>
                                <span className="text-gray-700 font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                );
            }

            return <div key={blockIdx}>{elements}</div>;
        }

        // Default Paragraph
        return (
            <p key={blockIdx} className="mb-6">
                {trimmedBlock}
            </p>
        );
    });
};

type InsightItem = typeof import("../data").insights[number];

function MobileRelatedCarousel({ items }: { items: InsightItem[] }) {
    const [activeIdx, setActiveIdx] = React.useState(0);
    const carouselRef = React.useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (carouselRef.current) {
            const { scrollLeft, clientWidth } = carouselRef.current;
            setActiveIdx(Math.round(scrollLeft / clientWidth));
        }
    };

    return (
        <div className="md:hidden">
            <div
                ref={carouselRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-4 !pb-4"
            >
                {items.map((related) => (
                    <div
                        key={related.id}
                        className="group bg-[#2197A1]/10 rounded-[2rem] overflow-hidden border border-gray-100 !p-2 flex flex-col flex-shrink-0 w-[85%] snap-center"
                    >
                        <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden !mb-4">
                            <img src={related.image} alt={related.title} className="w-full h-full object-cover" />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md !px-4 !py-1.5 rounded-full text-[10px] font-bold text-[#e76038] uppercase tracking-wider shadow-sm">
                                {related.category}
                            </div>
                        </div>
                        <div className="!p-2 flex flex-col flex-1">
                            <h3 className="text-xl font-bold text-[#2A2A2A] line-clamp-2 leading-tight mb-4">{related.title}</h3>
                            <a href={`/insights/${related.slug}`} className="mt-auto flex items-center gap-2 text-[#2197A1] font-semibold tracking-wider text-xs">
                                Read Article <ArrowRight size={14} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 !mt-4">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            carouselRef.current?.scrollTo({ left: i * (carouselRef.current.clientWidth), behavior: 'smooth' });
                            setActiveIdx(i);
                        }}
                        className={`rounded-full transition-all duration-300 ${i === activeIdx ? 'bg-[#2197A1] w-6 h-2.5' : 'bg-[#2197A1]/25 w-2.5 h-2.5'}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default function BlogDetails() {
    const { slug } = useParams();
    const blog = insights.find((i) => i.slug === slug);

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
                <p className="text-gray-600 mb-8 text-center max-w-md">
                    Sorry, the article you are looking for doesn&apos;t exist or has been moved.
                </p>
                <Link
                    href="/insights"
                    className="flex items-center gap-2 bg-[#2197A1] text-white px-8 py-3 rounded-full font-bold hover:bg-[#1a7a82] transition-colors"
                >
                    Back to Insights
                </Link>
            </div>
        );
    }

    const relatedInsights = insights
        .filter((i) => i.id !== blog.id)
        .slice(0, 3);

    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            {/* Redesigned Blog Hero Section - Dark Premium Theme */}
            <section
                className="relative w-full min-h-[75vh] min-[340px]:min-h-[85vh] min-[360px]:min-h-[85vh] min-[380px]:min-h-[65vh] min-[400px]:min-h-[58vh] min-[420px]:min-h-[55vh] min-[760px]:min-h-[66vh] min-[1024px]:min-h-screen flex items-center !pt-16 !pb-20 md:!py-32 overflow-hidden"
                style={{ background: "radial-gradient(circle at 30% 20%, #fff 0%, #2197A1 100%)" }}
            >
                {/* Background Accents */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2197A1] opacity-10 rounded-full -mr-64 -mt-64 blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#e76038] opacity-5 rounded-full -ml-48 -mb-48 blur-[100px] pointer-events-none"></div>

                {/* Floating Decorative Elements (Dots) as seen in design */}
                <div className="absolute top-1/4 left-10 w-2 h-2 bg-white/20 rounded-full blur-[1px]"></div>
                <div className="absolute top-1/2 left-20 w-1.5 h-1.5 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-white/5 rounded-full blur-[2px]"></div>
                <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/20 rounded-full"></div>
                <div className="absolute bottom-1/2 right-10 w-1.5 h-1.5 bg-white/15 rounded-full blur-[1px]"></div>
                <div className="absolute top-40 right-20 w-2.5 h-2.5 bg-white/10 rounded-full"></div>

                <div className="z-10 w-full max-w-7xl !mx-auto !px-2 md:!px-6 grid grid-cols-2 gap-1 md:gap-16 items-center !mb-2">
                    {/* Left Column: Text Content */}
                    <div className="flex flex-col items-start">
                        <div className="inline-block bg-white/30 text-[#2197A1] !px-5 !py-1.5 rounded-full !text-[8px] md:text-xs font-bold uppercase tracking-[0.2em] mb-8 shadow-lg shadow-black/10">
                            {blog.category}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white !my-2 md:!my-4 leading-[1.15] tracking-tight">
                            {blog.title}
                        </h1>
                        <p className="text-lg md:text-xl text-[#2a2a2a]/80 font-medium mb-10 max-w-xl leading-relaxed">
                            {blog.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 md:gap-8 !text-[#2a2a2a]/60 text-sm font-semibold !mb-3 md:!mb-8">
                            <div className="flex items-center gap-2.5">
                                <Calendar size={18} className="text-[#e76038]" />
                                {blog.date}
                            </div>
                            <div className="hidden md:flex items-center gap-2.5">
                                <Clock size={18} className="text-[#e76038]" />
                                {blog.readingTime}
                            </div>
                        </div>

                        <Button
                            href="/contact"
                            className="inline-flex items-center gap-2 md:gap-3 bg-[#e76038] !text-white !px-3 md:!px-8 !py-2 md:!py-3.5 rounded-xl md:rounded-3xl font-bold text-lg md:text-lg hover:shadow-[0_10px_30px_rgba(231,96,56,0.3)] transition-all transform hover:-translate-y-1 active:scale-95 leading-tight relative z-10"
                        >
                            <span>Start Your Growth</span>
                            <ArrowRight size={16} className="md:w-[22px] md:h-[22px]" />
                        </Button>
                    </div>

                    {/* Right Column: Visual Component */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-white/10 rounded-[2.5rem] blur-2xl group-hover:bg-white/15 transition-all"></div>
                        <div className="relative bg-white/10 backdrop-blur-md rounded-[2.5rem] p-4 border-4 border-white/20 shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-all duration-700 overflow-hidden">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-[200px] md:h-[400px] object-cover rounded-[1.8rem] shadow-inner"
                            />
                        </div>
                    </div>
                </div>

                {/* Refined Wavy Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-[1px]">
                    <svg
                        className="relative block w-[calc(100%+1.3px)] h-[140px] md:h-[180px]"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0,0 C200,80 400,0 600,60 C800,120 1000,20 1200,80 L1200,120 L0,120 Z"
                            fill="#ffffff"
                        ></path>
                    </svg>
                </div>
            </section>

            {/* Article Content Section */}
            <section className="w-full max-w-7xl mx-auto !px-6 !pb-14">
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-10">
                    {renderContent(blog.content)}
                </div>
            </section>

            {/* Key Takeaways Section - Separate Section with 40/60 split */}
            <section className="w-full max-w-7xl mx-auto !px-2 !pb-15">
                <div className="!p-6 !bg-[#f0f9fa] !rounded-[3.5rem] relative overflow-hidden group/takeaways">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#2197A1]/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
                        {/* Left Side: Shape Image (40%) */}
                        <div className="lg:col-span-5 relative">
                            <div className="relative aspect-square overflow-hidden transform group-hover/takeaways:scale-105 transition-all duration-700 shadow-5xl bg-white/50"
                                style={{ borderRadius: "50px 450px 450px 50px" }}>
                                <img
                                    src={blog.image}
                                    alt="Key takeaways visual"
                                    className="w-full h-full object-cover scale-100 group-hover/takeaways:scale-100 transition-transform duration-1000"
                                />
                            </div>
                        </div>

                        {/* Right Side: Points (60%) */}
                        <div className="lg:col-span-7">
                            <h3 className="text-4xl font-extrabold text-[#2A2A2A] mb-10 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#2197A1] flex items-center justify-center shrink-0 shadow-xl shadow-[#2197A1]/20">
                                    <span className="text-white text-2xl font-bold italic">!</span>
                                </div>
                                <span>Key <span className="text-[#2197A1]">Takeaways</span></span>
                            </h3>

                            <div className="grid grid-cols-1 gap-6">
                                {blog.takeaways?.map((takeaway, idx) => (
                                    <div key={idx} className="flex items-start gap-2 md:gap-5 p-6 bg-white rounded-3xl border border-[#2197A1]/10 hover:border-[#2197A1]/40 transition-all hover:shadow-lg hover:-translate-y-1">
                                        <div className="w-15 h-15 md:w-10 md:h-10 rounded-full bg-[#f0f9fa] flex items-center justify-center shrink-0 border border-[#2197A1]/20 shadow-inner">
                                            <CheckCircle2 className="text-[#e76038]" size={22} />
                                        </div>
                                        <p className="font-bold text-[#2A2A2A]/80 leading-relaxed !pt-1.5">{takeaway}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Insights Section */}
            <section className="w-full !pb-0 md:!py-24">
                <div className="max-w-7xl !mx-auto !px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between !mb-8 gap-6">
                        <div>
                            <h2 className="text-4xl font-bold text-[#2A2A2A] mb-4">Related <span className="text-[#2197A1]">Insights</span></h2>
                            <p className="text-gray-500 font-medium">Continue reading about {blog.category} and digital innovation.</p>
                        </div>
                        <Link href="/insights" className="text-[#2197A1] font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                            View All <ArrowRight size={20} />
                        </Link>
                    </div>

                    {/* Desktop Grid */}
                    <div className="hidden md:grid grid-cols-3 gap-10">
                        {relatedInsights.map((related) => (
                            <div
                                key={related.id}
                                className="group bg-[#2197A1]/10 rounded-[2rem] overflow-hidden border border-gray-100 hover:border-[#2197A1]/20 transition-all hover:shadow-xl !p-2 flex flex-col"
                            >
                                <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden !mb-4">
                                    <img
                                        src={related.image}
                                        alt={related.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md !px-4 !py-1.5 rounded-full text-[10px] font-bold text-[#e76038] uppercase tracking-wider shadow-sm">
                                        {related.category}
                                    </div>
                                </div>
                                <div className="!p-2 flex flex-col flex-1">
                                    <h3 className="text-xl font-bold text-[#2A2A2A] line-clamp-2 leading-tight group-hover:text-[#2197A1] transition-colors mb-4">
                                        {related.title}
                                    </h3>
                                    <Link
                                        href={`/insights/${related.slug}`}
                                        className="mt-auto flex items-center gap-2 text-[#2197A1] hover:text-[#e76038] font-semibold tracking-wider text-xs transition-all group/link"
                                    >
                                        Read Article <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Carousel */}
                    <MobileRelatedCarousel items={relatedInsights} />
                </div>
            </section>

            {/* Final CTA Section */}
            <FinalCTA
                title={
                    <>
                        Ready to Grow Your <br />
                        <span className="text-[#2197A1]">Business Online?</span>
                    </>
                }
                description="Let our experts help you build powerful digital experiences that drive results and engage your audience."
                buttonText="Start Your Project"
                buttonHref="/contact"
            />
        </main>
    );
}
