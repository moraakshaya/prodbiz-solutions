"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const differences = [
  {
    title: "Branding & Design",
    desc: "We create your logo, posters, menus, and other designs to make your business look professional.",
    img: "/images/logo.jpg",
    position: "pos-1",
    color: "#F59E0B",
    subServices: [
      { name: "Logo Design", icon: "✏️" },
      { name: "Poster Design", icon: "🖼️" },
      { name: "Menu Design", icon: "📋" },
    ],
  },
  {
    title: "Website Development",
    desc: "We build a clean, fast, and mobile-friendly website for your business.",
    img: "/images/website.jpg",
    position: "pos-2",
    color: "#2197A1",
    subServices: [
      { name: "Landing Page", icon: "🌐" },
      { name: "E-commerce", icon: "🛒" },
      { name: "SEO Setup", icon: "🔍" },
    ],
  },
  {
    title: "Video & Content",
    desc: "We create, shoot, and edit videos and content for your social media to help you reach more people.",
    img: "/images/video.jpg",
    position: "pos-3",
    color: "#8B5CF6",
    subServices: [
      { name: "Reels / Videos", icon: "🎬" },
      { name: "Photography", icon: "📸" },
      { name: "Social Posts", icon: "📱" },
    ],
  },
  {
    title: "Digital Marketing",
    desc: "We promote your business using SEO, Google Ads, and social media to get more customers.",
    img: "/images/digital.jpg",
    position: "pos-4",
    color: "#EF4444",
    subServices: [
      { name: "Google Ads", icon: "📢" },
      { name: "SEO", icon: "📈" },
      { name: "Social Media", icon: "👥" },
    ],
  },
];

// ── Fixed mobile canvas ──────────────────────────────────────
// Container: 340 × 480 px (centred on screen)
// Circle: cx=170 cy=240 r=120
// Cardinal nodes (image centre ON the circle):
//   TOP    idx=0  (170, 120)
//   RIGHT  idx=1  (290, 240)
//   BOTTOM idx=2  (170, 360)
//   LEFT   idx=3  (50,  240)
// half-image size = 22 px  →  image 44 × 44

const CX = 170, CY = 240, R = 120;
const IMG_HALF = 22; // half of 44px
const mobileNodes = [
  { idx: 0, cx: CX,      cy: CY - R, subDir: "above" },
  { idx: 1, cx: CX + R,  cy: CY,     subDir: "below" },
  { idx: 2, cx: CX,      cy: CY + R, subDir: "below" },
  { idx: 3, cx: CX - R,  cy: CY,     subDir: "below" },
];

export default function DifferenceSection3D() {
  const containerRef    = useRef<HTMLDivElement>(null);
  const silhouetteRef   = useRef<HTMLDivElement>(null);
  const cardsRef        = useRef<HTMLDivElement[]>([]);
  const mobileImgRef    = useRef<HTMLDivElement[]>([]);
  const mobileSubRef    = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(silhouetteRef.current, {
        scale: 0.5, opacity: 0, duration: 1.2, ease: "back.out(1.7)",
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
      });
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 40, opacity: 0, duration: 0.6, delay: i * 0.1, ease: "power2.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 60%" },
        });
      });
      mobileImgRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          scale: 0.5, opacity: 0, duration: 0.55, delay: i * 0.12, ease: "back.out(1.5)",
          scrollTrigger: { trigger: containerRef.current, start: "top 65%" },
        });
      });
      mobileSubRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          y: 8, opacity: 0, duration: 0.4, delay: 0.4 + i * 0.1, ease: "power2.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 65%" },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden !py-10 md:!pt-24 md:!pb-0 flex flex-col items-center"
    >
      {/* ── Header ── */}
      <div className="text-center z-20 w-full !px-6 md:!px-0 flex flex-col items-center mb-10">
        <span className="text-[#2197A1] font-black uppercase tracking-[0.3em] text-xs !mb-3 md:!mb-0 block">
          Complete Solutions
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-[#1E293B] leading-tight mb-4">
          Everything You Need to{" "}
          <span className="text-[#2197A1]">Grow Your Business Online</span>
        </h2>
        <p className="text-slate-600 text-lg max-w-3xl text-center leading-relaxed font-medium">
          We help you create your brand, build your website, and promote your
          business online so more people can see it and you can get more customers.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════
          MOBILE  –  circular orbit layout
          Fixed 340 × 480 canvas, centred on screen
      ══════════════════════════════════════════════════════ */}
      <div className="flex md:hidden w-full justify-center items-start">
        {/* Fixed-size canvas so pixel maths stays exact */}
        <div className="relative" style={{ width: 340, height: 480 }}>

          {/* ── Dashed orbit circle + coloured dot accents ── */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width={340}
            height={480}
            viewBox="0 0 340 480"
          >
            {/* Main dashed ring */}
            <circle
              cx={CX} cy={CY} r={R}
              fill="none"
              stroke="#2197A1"
              strokeWidth="1.8"
              strokeDasharray="6 10"
              opacity="0.45"
            />
            {/* Coloured accent dots at cardinal node positions */}
            {mobileNodes.map(({ cx, cy, idx }) => (
              <circle key={idx} cx={cx} cy={cy} r={5} fill={differences[idx].color} opacity={0.85} />
            ))}
            {/* Tiny connector tick from dot outward (visual polish) */}
            {mobileNodes.map(({ cx, cy, idx }) => {
              const dx = cx - CX, dy = cy - CY;
              const len = Math.sqrt(dx * dx + dy * dy);
              const nx = dx / len, ny = dy / len;
              return (
                <line
                  key={`tick-${idx}`}
                  x1={cx + nx * 6} y1={cy + ny * 6}
                  x2={cx + nx * 16} y2={cy + ny * 16}
                  stroke={differences[idx].color}
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  opacity="0.5"
                />
              );
            })}
          </svg>

          {/* ── Central person avatar ── */}
          <div
            className="absolute z-20"
            style={{
              left: CX,
              top: CY,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative w-16 h-16 rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] border-[4px] border-[#EEF2F6] overflow-hidden">
              <Image
                src="/images/difference_central_person.png"
                alt="Business Representative"
                fill
                className="object-cover scale-110 translate-y-1"
              />
            </div>
          </div>

          {/* ── Service nodes on the circle ── */}
          {mobileNodes.map(({ idx, cx, cy, subDir }) => {
            const svc = differences[idx];
            const imgTop  = cy - IMG_HALF; // pixel: top edge of image
            const imgBot  = cy + IMG_HALF; // pixel: bottom edge of image

            return (
              <React.Fragment key={idx}>
                {/* Service image – centred exactly on the circle dot */}
                <div
                  ref={el => { if (el) mobileImgRef.current[idx] = el; }}
                  className="absolute z-10"
                  style={{ left: cx, top: cy, transform: "translate(-50%, -50%)" }}
                >
                  <div
                    className="relative rounded-2xl overflow-hidden shadow-[0_6px_18px_rgba(0,0,0,0.12)] border-[3px] border-white"
                    style={{
                      width: IMG_HALF * 2,
                      height: IMG_HALF * 2,
                      borderColor: svc.color,
                    }}
                  >
                    <Image src={svc.img} alt={svc.title} fill className="object-cover" />
                  </div>
                </div>

                {/* Sub-services group */}
                <div
                  ref={el => { if (el) mobileSubRef.current[idx] = el; }}
                  className={`absolute z-10 flex items-center gap-[0px] ${subDir === "above" ? "flex-col-reverse" : "flex-col"}`}
                  style={
                    subDir === "above"
                      ? {
                          left: cx,
                          top: imgTop - 14,
                          transform: "translate(-50%, -100%)",
                        }
                      : {
                          left: cx,
                          top: imgBot + 3,
                          transform: "translateX(-50%)",
                        }
                  }
                >
                  {/* Service title chip */}
                  <div
                    className="flex items-center gap-1 !px-2 !py-0.5 rounded-lg bg-white shadow-sm border"
                    style={{ borderColor: svc.color + "55" }}
                  >
                    <span
                      className="text-[7px] font-extrabold uppercase tracking-wider leading-tight"
                      style={{ color: svc.color }}
                    >
                      {svc.title}
                    </span>
                  </div>
                  {/* Sub-service badges */}
                  {svc.subServices.map((sub, si) => (
                    <div
                      key={si}
                      className="flex items-center gap-1 !px-1.5 !py-[2px] !mb-1"
                    >
                      <span className="text-[9px] leading-none">{sub.icon}</span>
                      <span className="text-[7px] font-semibold text-[#475569] whitespace-nowrap">
                        {sub.name}
                      </span>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          DESKTOP  –  original arc layout (unchanged)
      ══════════════════════════════════════════════════════ */}
      <div className="hidden md:block max-w-[1400px] mx-auto w-full relative h-[1000px]">
        {/* Central person */}
        <div ref={silhouetteRef} className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          <div className="relative !w-64 !h-64 md:!w-80 md:!h-80 rounded-full bg-white shadow-[0_40px_80px_rgba(0,0,0,0.08)] border-[12px] border-[#EEF2F6] flex items-center justify-center overflow-hidden">
            <div className="relative !-top-4 w-full h-full">
              <Image
                src="/images/difference_central_person.png"
                alt="Business Representative"
                fill
                className="object-cover scale-110 translate-y-4"
              />
            </div>
            <div className="absolute inset-[-30px] border-2 border-dashed border-[#2197A1]/15 rounded-full" />
          </div>
        </div>

        {/* Arc SVG */}
        <svg className="absolute top-[230px] left-1/2 -translate-x-1/2 w-[1100px] h-[400px] pointer-events-none overflow-visible z-0">
          <path d="M 50,20 Q 550,450 1050,20" fill="none" stroke="#2197A1" strokeWidth="2.5" strokeDasharray="8 12" opacity="0.3" />
          <circle cx="150" cy="85"  r="5" fill="#2197A1" />
          <circle cx="410" cy="215" r="5" fill="#2197A1" />
          <circle cx="690" cy="215" r="5" fill="#2197A1" />
          <circle cx="950" cy="85"  r="5" fill="#2197A1" />
        </svg>

        {/* Arc cards */}
        <div className="absolute inset-0">
          {differences.map((item, idx) => {
            const mapping: Record<string, { left: string; top: string }> = {
              "pos-1": { left: "calc(50% - 400px)", top: "390px" },
              "pos-2": { left: "calc(50% - 140px)", top: "520px" },
              "pos-3": { left: "calc(50% + 140px)", top: "520px" },
              "pos-4": { left: "calc(50% + 400px)", top: "390px" },
            };
            const conf = mapping[item.position];
            return (
              <div
                key={idx}
                ref={el => { if (el) cardsRef.current[idx] = el; }}
                style={{ left: conf.left, top: conf.top }}
                className="absolute -translate-x-1/2 flex flex-col items-center text-center group z-20"
              >
                <div className="relative mb-6">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[2px] h-12 bg-[#EEF2F6]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-300 rounded-full" />
                  </div>
                  <div className="relative w-28 h-28 md:w-36 md:h-36 bg-white p-5 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.03)] border-[5px] border-[#EEF2F6] transform group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image src={item.img} alt={item.title} fill className="object-cover" />
                    </div>
                  </div>
                </div>
                <div className="max-w-[240px] px-2">
                  <h3 className="text-lg md:text-xl font-bold text-[#1E293B] mb-2 group-hover:text-[#2197A1] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[#64748B] text-xs md:text-sm leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
