"use client";

import React, { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProblemSolutionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const issuesRefs = useRef<HTMLDivElement[]>([]);
  const solutionsRefs = useRef<HTMLDivElement[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const insideStyleDark = "relative z-0 shadow-[inset_0_20px_50px_rgba(0,0,0,0.6)] border-white/5";
  const insideStyleLight = "relative z-0 shadow-[inset_0_20px_50px_rgba(0,0,0,0.15)] border-slate-200 border-l border-t";
  const outsideStyle = "relative z-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border-t border-l border-white/20 transform";
  const baseStyle = "!p-4 aspect-square flex flex-col justify-center transition-all duration-500 overflow-hidden";

  // Mobile swipe scroll tracker
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const idx = Math.round(container.scrollLeft / container.offsetWidth);
      setActiveIndex(idx);
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSlide = (idx: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollTo({ left: idx * container.offsetWidth, behavior: "smooth" });
  };

  // Desktop GSAP animation
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 640px)", () => {
        gsap.set(issuesRefs.current, { xPercent: 100 });
        gsap.set(solutionsRefs.current, { xPercent: -100 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        });

        tl.to(issuesRefs.current, { xPercent: 0, duration: 0.1, ease: "expo.out", stagger: 0.15 }, 0)
          .to(solutionsRefs.current, { xPercent: 0, duration: 0.1, ease: "expo.out", stagger: 0.15 }, 0);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Pair data for mobile carousel
  const pairs = [
    {
      issue: { label: "Managing multiple people for different work", bg: "bg-[#e8f7f8]", textColor: "text-[#2197A1]", issueColor: "text-[#0B1D26]", dividerColor: "bg-[#2197A1]/30" },
      fix: { title: "Everything in one place", desc: "No need to deal with different designers, developers, and marketers separately.", bg: "bg-[#2197A1]", img: "/images/solution1.png", fixColor: "text-white" }
    },
    {
      issue: { label: "No clear growth strategy", bg: "bg-[#e8f7f8]", textColor: "text-[#2197A1]", issueColor: "text-[#0B1D26]", dividerColor: "bg-[#2197A1]/30" },
      fix: { title: "A complete plan for you", desc: "Not just technical work, but what actually helps you grow.", bg: "bg-[#2197A1]", img: "/images/solution3.png", fixColor: "text-white" }
    },
    {
      issue: { label: "Getting work done but no results", bg: "bg-[#e8f7f8]", textColor: "text-[#2197A1]", issueColor: "text-[#0B1D26]", dividerColor: "bg-[#2197A1]/30" },
      fix: { title: "Focused on customers", desc: "We help you get customers, not just deliver work.", bg: "bg-[#2197A1]", img: "/images/solution2.png", fixColor: "text-white" }
    },
    {
      issue: { label: "No support after project", bg: "bg-[#e8f7f8]", textColor: "text-[#2197A1]", issueColor: "text-[#0B1D26]", dividerColor: "bg-[#2197A1]/30" },
      fix: { title: "Growth support stays", desc: "We stay with you, not just finish the project.", bg: "bg-[#2197A1]", img: "/images/solution4.png", fixColor: "text-white" }
    },
  ];

  return (
    <section ref={containerRef} className="relative w-full !py-12 md:!pt-14 md:!pb-34 md:!px-6 overflow-hidden">
      <div className="max-w-[1500px] !mx-auto flex flex-col lg:flex-row gap-12 lg:gap-5 items-center">

        {/* Left Editorial Section */}
        <div className="w-full lg:w-[28%] xl:w-[35%] !px-6 lg:!px-0 xl:!pl-20 flex flex-col justify-center">
          <span className="text-[#2197A1] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Approach</span>
          <h2 className="text-3xl md:text-5xl lg:text-3xl xl:text-5xl font-black text-slate-900 leading-tight mb-8">
            Problems Businesses Face — <span className="text-[#2197A1]">And How We Solve Them</span>
          </h2>
          <p className="text-slate-600 text-lg lg:text-sm xl:text-lg leading-relaxed mb-10">
            Most agencies deliver work but don't understand your business.
            We've flipped the script by combining top-tier technology with
            real-world revenue strategies.
          </p>
          <Link href="/case-studies" className="flex items-center gap-4 group cursor-pointer w-fit text-slate-900 no-underline">
            <div className="w-12 h-12 rounded-full bg-[#2197A1] shadow-[0_10px_20px_-5px_rgba(33,151,161,0.5),inset_0_3px_6px_rgba(255,255,255,0.5),inset_0_-3px_5px_rgba(0,0,0,0.2)] flex items-center justify-center text-white border border-[#2acadd]/20 group-hover:scale-110 transition-all duration-300">
              <ArrowRight size={20} className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]" />
            </div>
            <span className="font-bold text-[#000] hover:text-[#e76038] tracking-tight">View Proof of Success</span>
          </Link>
        </div>

        {/* ── MOBILE: Swipeable Carousel (Issue + Solution per slide) ── */}
        <div className="flex sm:hidden flex-col items-center w-full">
          <div
            ref={scrollContainerRef}
            className="flex flex-row w-full overflow-x-scroll snap-x snap-mandatory scroll-smooth !pb-10"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {pairs.map((pair, idx) => (
              <div key={idx} className="flex-shrink-0 w-full snap-center !px-6">
                {/* Combined Issue + Solution card */}
                <div className="w-full rounded-2xl overflow-hidden  relative flex flex-col min-h-[320px]">

                  {/* TOP: Issue */}
                  <div className={`flex flex-col justify-center !px-6 !pt-7 pb-5 ${pair.issue.bg}`}>
                    <span className={`text-[10px] font-black uppercase tracking-[0.25em] mb-2 opacity-70 ${pair.issue.textColor}`}>Problem</span>
                    <h3 className={`text-2xl font-black leading-none uppercase !mb-1 ${pair.issue.textColor}`}>Issues</h3>
                    <div className={`w-8 h-1 rounded-full !mb-3 ${pair.issue.dividerColor}`} />
                    <p className={`text-sm font-medium leading-snug ${pair.issue.issueColor}`}>{pair.issue.label}</p>
                  </div>

                  {/* BOTTOM: Solution with image */}
                  <div className={`relative flex flex-col justify-center !px-6 !pt-5 pb-7 flex-1 overflow-hidden ${pair.fix.bg}`}>
                    {/* Decorative image — bottom right corner */}
                    {pair.fix.img && (
                      <div className="absolute bottom-0 right-0 w-[45%] h-[80%] overflow-hidden rounded-tl-[60%] pointer-events-none z-0 opacity-40">
                        <img src={pair.fix.img} alt="" className="w-full h-full object-cover mix-blend-overlay" />
                      </div>
                    )}
                    <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.25em] mb-2 text-white/60">Solution</span>
                    <h3 className="relative z-10 text-2xl font-black uppercase tracking-tighter !mb-1 text-white">The Fix</h3>
                    <div className="relative z-10 w-8 h-1 rounded-full !mb-3 bg-white/20" />
                    <h4 className={`relative z-10 font-black leading-tight !mb-2 ${pair.fix.fixColor}`}>{pair.fix.title}</h4>
                    <p className="relative z-10 text-white !text-[14px] font-medium leading-snug pr-[40%]">{pair.fix.desc}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Dot Pagination */}
          <div className="flex gap-2 mt-5">
            {pairs.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSlide(idx)}
                className={`rounded-full transition-all duration-300 ${activeIndex === idx ? "w-6 h-2.5 bg-[#2197A1]" : "w-2.5 h-2.5 bg-slate-300"}`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── DESKTOP / TABLET: Original Bento Grid ── */}
        <div className="hidden sm:grid w-full lg:w-[82%] xl:w-[65%] grid-cols-2 lg:grid-cols-4 shadow-2xl bg-white border border-slate-100">

          {/* PAIR 1 */}
          <div ref={el => { if (el) issuesRefs.current[0] = el; }} className={`${baseStyle} ${insideStyleDark} bg-[#2197A1]`}>
            <h3 className="text-white text-3xl font-black !mb-1 leading-none uppercase">Issues</h3>
            <div className="w-8 h-1 bg-white/20 !mb-4" />
            <p className="text-white !text-sm font-normal leading-tight">Managing multiple people for different work</p>
          </div>
          <div ref={el => { if (el) solutionsRefs.current[0] = el; }} className={`${baseStyle} ${outsideStyle} bg-[#0B1D26] hover:scale-[1.02] active:scale-95 group`}>
            <div className="absolute bottom-0 right-0 w-[60%] h-[60%] rounded-tl-[100%] overflow-hidden opacity-50 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700 pointer-events-none z-0">
              <img src="/images/solution1.png" alt="Decoration" className="w-full h-full object-cover mix-blend-overlay" />
            </div>
            <h3 className="relative z-10 !text-white text-2xl font-black !mb-1 uppercase tracking-tighter">The Fix</h3>
            <div className="relative z-10 w-8 h-1 bg-[#2197A1]/20 !mb-4" />
            <h4 className="relative z-10 !text-[#2197A1] text-xl font-black leading-tight">Everything in one place</h4>
            <p className="relative z-10 !text-white !text-sm font-normal font-black mb-4">No need to deal with different designers, developers, and marketers separately.</p>
          </div>

          {/* PAIR 2 */}
          <div ref={el => { if (el) issuesRefs.current[1] = el; }} className={`${baseStyle} ${insideStyleLight} bg-white`}>
            <h3 className="!text-[#2197A1] text-3xl font-black !mb-1 leading-none uppercase">Issues</h3>
            <div className="w-8 h-1 bg-[#2197a1]/20 !mb-4" />
            <p className="text-[#0B1D26] !text-sm font-normal leading-tight">No clear growth strategy</p>
          </div>
          <div ref={el => { if (el) solutionsRefs.current[1] = el; }} className={`${baseStyle} ${outsideStyle} bg-gradient-to-br from-[#FF7A50] to-[#E76038] hover:scale-[1.02] active:scale-95 group`}>
            <div className="absolute bottom-0 right-0 w-[60%] h-[60%] rounded-tl-[100%] overflow-hidden opacity-50 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700 pointer-events-none z-0">
              <img src="/images/solution3.png" alt="Decoration" className="w-full h-full object-cover mix-blend-overlay" />
            </div>
            <h3 className="relative z-10 !text-white text-2xl font-black !mb-1 uppercase tracking-tighter">The Fix</h3>
            <div className="relative z-10 w-8 h-1 bg-white/20 !mb-4" />
            <h4 className="relative z-10 text-white text-xl font-black leading-tight">A complete plan for you</h4>
            <p className="relative z-10 text-white/90 !text-sm font-normal font-black mb-4 drop-shadow-sm">Not just technical work, but what actually helps you grow.</p>
          </div>

          {/* PAIR 3 */}
          <div ref={el => { if (el) issuesRefs.current[2] = el; }} className={`${baseStyle} ${outsideStyle} bg-[#0B1D26] hover:scale-[1.02] active:scale-95 group`}>
            <div className="absolute bottom-0 right-0 w-[60%] h-[60%] rounded-tl-[100%] overflow-hidden opacity-50 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700 pointer-events-none z-0">
              <img src="/images/solution2.png" alt="Decoration" className="w-full h-full object-cover mix-blend-overlay" />
            </div>
            <h3 className="relative z-10 !text-[#2197A1] text-3xl font-black !mb-1 leading-none uppercase tracking-tighter">Issues</h3>
            <div className="relative z-10 w-8 h-1 bg-[#2197a1]/20 !mb-4" />
            <p className="relative z-10 text-white text-sm !font-normal">Getting work done but no results</p>
          </div>
          <div ref={el => { if (el) solutionsRefs.current[2] = el; }} className={`${baseStyle} ${insideStyleLight} bg-white`}>
            <h3 className="text-[#0B1D26] text-2xl font-black !mb-0 uppercase tracking-tighter">The Fix</h3>
            <div className="w-8 h-1 bg-[#2197a1]/20 !mb-4" />
            <h4 className="!text-[#2197A1] text-xl font-black leading-tight">Focused on customers</h4>
            <p className="!text-[#0B1D26] !text-sm !font-normal font-black mb-4">We help you get customers, not just deliver work</p>
          </div>

          {/* PAIR 4 */}
          <div ref={el => { if (el) issuesRefs.current[3] = el; }} className={`${baseStyle} ${outsideStyle} bg-gradient-to-br from-[#FF7A50] to-[#E76038] hover:scale-[1.02] active:scale-95 group`}>
            <div className="absolute bottom-0 right-0 w-[60%] h-[60%] rounded-tl-[100%] overflow-hidden opacity-50 group-hover:scale-110 group-hover:opacity-25 transition-all duration-700 pointer-events-none z-0">
              <img src="/images/solution4.png" alt="Decoration" className="w-full h-full object-cover mix-blend-overlay" />
            </div>
            <h3 className="relative z-10 text-white text-3xl font-black !mb-1 leading-none uppercase tracking-tighter drop-shadow-sm">Issues</h3>
            <div className="relative z-10 w-8 h-1 bg-white/20 !mb-4" />
            <p className="relative z-10 text-white text-sm !font-normal">No support after project</p>
          </div>
          <div ref={el => { if (el) solutionsRefs.current[3] = el; }} className={`${baseStyle} ${insideStyleDark} bg-[#2197A1]`}>
            <h3 className="text-white text-2xl font-black !mb-1 uppercase tracking-tighter">The Fix</h3>
            <div className="w-8 h-1 !bg-white/20 !mb-4" />
            <h4 className="!text-white text-xl font-black leading-tight">Growth support stays</h4>
            <p className="text-[#0B1D26] opacity-70 !text-sm !font-normal font-black mb-4">We stay with you, not just finish the project.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
