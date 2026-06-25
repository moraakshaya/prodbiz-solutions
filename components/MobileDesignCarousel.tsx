"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import NextImage from "next/image";

interface PortfolioItem {
  title: string;
  category: string;
  image: string;
}

interface MobileDesignCarouselProps {
  items: PortfolioItem[];
}

// We maintain a circular deck. index 0 = front card shown to user.
export default function MobileDesignCarousel({ items }: MobileDesignCarouselProps) {
  const total = items.length;

  // deck[0] = frontmost card index into `items`
  const [deck, setDeck] = useState<number[]>(items.map((_, i) => i));
  // Which deck slot is currently falling (-1 = none)
  const [fallingSlot, setFallingSlot] = useState<number>(-1);
  // Which slot is entering from top
  const [enteringSlot, setEnteringSlot] = useState<number>(-1);
  const busy = useRef(false);

  const advance = useCallback(() => {
    if (busy.current) return;
    busy.current = true;

    // Slot 0 is the front card — start its fall
    setFallingSlot(0);

    setTimeout(() => {
      // Rotate deck: move front to back
      setDeck(prev => {
        const next = [...prev];
        const top = next.shift()!;
        next.push(top);
        return next;
      });
      setFallingSlot(-1);
      setEnteringSlot(0); // new slot 0 (previously slot 1) enters from top

      setTimeout(() => {
        setEnteringSlot(-1);
        busy.current = false;
      }, 480);
    }, 480);
  }, []);

  // Removed auto-loop so it only advances on click

  // We always show up to 3 cards (front + 2 peeks behind)
  const visibleSlots = Math.min(3, total);

  return (
    <div className="mdc-root">
      {/* Header */}
      <div className="mdc-head">
        <span className="mdc-eyebrow">Portfolio</span>
        <h2 className="mdc-h2">Our <span className="mdc-accent">Design Work</span></h2>
        <div className="mdc-rule" />
      </div>

      {/* Stage */}
      <div className="mdc-stage">

        {/* Card stack */}
        <div className="mdc-stack">
          {/*
            We render back→front so higher z-index = front.
            visibleSlots=3 → render slots [2, 1, 0].
            slot 0 = front (z=30), slot 1 = middle (z=20), slot 2 = back (z=10)
          */}
          {Array.from({ length: visibleSlots }, (_, i) => visibleSlots - 1 - i).map((slot) => {
            const itemIdx = deck[slot] ?? 0;
            const item = items[itemIdx];
            const isFront = slot === 0;

            // Stack visual: deeper cards scale down and peek BELOW the front
            // slot 0 = front: scale(1), translateY(0)
            // slot 1 = mid:   scale(0.94), translateY(16px)  ← peeks below
            // slot 2 = back:  scale(0.88), translateY(32px)  ← peeks more below
            const scale = 1 - slot * 0.06;
            const ty = slot * 18; // px downward — makes back cards peek below front

            const isFalling = fallingSlot === slot;
            const isEntering = enteringSlot === slot;

            return (
              <div
                key={slot}
                className={[
                  "mdc-card",
                  isFalling ? "mdc-fall" : "",
                  isEntering ? "mdc-enter" : "",
                ].join(" ").trim()}
                style={{
                  zIndex: 30 - slot * 10,
                  // Only apply static stack transform when NOT animating
                  // (animation keyframes handle transform for falling/entering)
                  transform: (isFalling || isEntering)
                    ? ""
                    : `scale(${scale}) translateY(${ty}px)`,
                  opacity: 1 - slot * 0.10,
                  // Smooth transition for the middle/back cards shifting forward
                  transition: !isFalling && !isEntering
                    ? "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.45s ease"
                    : "none",
                }}
              >
                {/* Full-bleed image */}
                <div className="mdc-img-wrap">
                  <NextImage
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="500px"
                    className="mdc-img"
                    priority={isFront}
                  />
                  {/* Top + bottom vignette */}
                  <div className="mdc-vignette" />
                  {/* Glass shine on front card */}
                  {isFront && <div className="mdc-shine" />}
                </div>

                {/* Badge — only on the front card */}
                {isFront && (
                  <div className="mdc-badge">
                    <span className="mdc-badge-cat">{item.category}</span>
                    {/* <span className="mdc-badge-name">{item.title}</span> */}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 3-D arrow button */}
        <button
          className={`mdc-btn ${busy.current ? "mdc-btn--active" : ""}`}
          onClick={advance}
          aria-label="Next design"
        >
          <span className="mdc-btn-face">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"
              width="28" height="28">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
          <span className="mdc-btn-edge" />
          <span className="mdc-btn-glow" />
        </button>


      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        /* ── Root ── */
        .mdc-root {
          width: 100%;
          padding: 36px 20px 52px;
          box-sizing: border-box;
        }

        /* ── Header ── */
        .mdc-head { text-align: center; margin-bottom: 36px; }
        .mdc-eyebrow {
          display: block;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: #2197A1;
          margin-bottom: 8px;
        }
        .mdc-h2 {
          font-size: 30px;
          font-weight: 900;
          color: #1E293B;
          line-height: 1.15;
          margin: 0 0 14px;
        }
        .mdc-accent { color: #2197A1; }
        .mdc-rule {
          width: 56px; height: 4px;
          background: #e76038;
          border-radius: 99px;
          margin: 0 auto;
          box-shadow: 0 0 14px rgba(231,96,56,.5);
        }

        /* ── Stage ── */
        .mdc-stage {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
        }

        /* ── Stack ── */
        .mdc-stack {
          position: relative;
          width: 100%;
          max-width: 500px;
          /* Extra bottom space so back cards peeking below are visible */
          aspect-ratio: 1 / 1.15;
          /* Must NOT clip so falling card can exit the container */
          overflow: visible;
        }

        /* ── Card base ── */
        .mdc-card {
          position: absolute;
          top: 0; left: 0; right: 0;
          /* 1:1 aspect ratio to ensure square images are not cropped */
          aspect-ratio: 1 / 1;
          height: auto;
          border-radius: 22px;
          overflow: hidden;
          transform-origin: center bottom;
          border: 1.5px solid rgba(255,255,255,.32);
          box-shadow:
            0 6px 28px rgba(0,0,0,.2),
            0 2px 6px rgba(0,0,0,.1),
            inset 0 1px 0 rgba(255,255,255,.28);
          /* No transition by default — animations handle it */
        }

        /* ── Fall ── */
        @keyframes mdc-fall {
          0%   { transform: scale(1)    translateY(0px)   rotate(0deg);    opacity: 1; }
          25%  { transform: scale(.97)  translateY(30px)  rotate(1.5deg);  opacity: .85; }
          70%  { transform: scale(.88)  translateY(130px) rotate(4deg);    opacity: .3; }
          100% { transform: scale(.82)  translateY(220px) rotate(6deg);    opacity: 0; }
        }
        .mdc-fall {
          animation: mdc-fall 0.48s cubic-bezier(.6,.05,.8,.35) forwards !important;
        }

        /* ── Enter from top ── */
        @keyframes mdc-enter {
          0%   { transform: scale(.88) translateY(-140px) rotate(-3deg);  opacity: 0; }
          50%  { transform: scale(.99) translateY(10px)   rotate(.5deg);  opacity: .9; }
          100% { transform: scale(1)   translateY(0px)    rotate(0deg);   opacity: 1; }
        }
        .mdc-enter {
          animation: mdc-enter 0.48s cubic-bezier(.2,.85,.3,1.1) forwards !important;
        }

        /* ── Image ── */
        .mdc-img-wrap {
          position: absolute;
          inset: 0;
        }
        .mdc-img {
          object-fit: cover;
          object-position: center;
        }
        .mdc-vignette {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to bottom, rgba(0,0,0,.38) 0%, transparent 38%),
            linear-gradient(to top,    rgba(0,0,0,.22) 0%, transparent 28%);
          pointer-events: none;
          z-index: 1;
        }
        .mdc-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            155deg,
            rgba(255,255,255,.14) 0%,
            rgba(255,255,255,.04) 40%,
            transparent 65%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* ── Badge ── */
        .mdc-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          z-index: 10;
        }
        .mdc-badge-cat {
          display: inline-block;
          width: fit-content;
          font-size: 9px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .12em;
          color: #fff;
          background: rgba(33,151,161,.82);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 3px 10px;
          border-radius: 99px;
          border: 1px solid rgba(255,255,255,.3);
        }
        .mdc-badge-name {
          font-size: 16px;
          font-weight: 800;
          color: #fff;
          text-shadow: 0 1px 6px rgba(0,0,0,.55);
          line-height: 1.2;
          max-width: 210px;
          display: block;
        }

        /* ── 3-D Spherical Button ── */
        .mdc-btn {
          position: relative;
          width: 55px; height: 55px;
          border: none;
          background: transparent;
          cursor: pointer;
          padding: 0;
          -webkit-tap-highlight-color: transparent;
          outline: none;
          flex-shrink: 0;
          margin-top: -10px;
        }
        .mdc-btn-face {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 55px; height: 55px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #4ac7d1 0%, #2bbac6 30%, #1a8793 70%, #0e5b62 100%);
          color: #fff;
          box-shadow:
            0 10px 20px rgba(33,151,161,.5),
            inset -4px -4px 10px rgba(0,0,0,.2),
            inset 4px 4px 10px rgba(255,255,255,.4);
          transition: transform .12s ease, box-shadow .12s ease;
          transform: translateY(0) scale(1);
          z-index: 1;
        }
        .mdc-btn-edge {
          display: none;
        }
        .mdc-btn-glow {
          position: absolute;
          bottom: -10px; left: 50%;
          transform: translateX(-50%);
          width: 50px; height: 16px;
          background: rgba(33,151,161,.4);
          border-radius: 50%;
          filter: blur(6px);
          z-index: 0;
          transition: width .12s ease, opacity .12s ease;
        }
        .mdc-btn:active .mdc-btn-face,
        .mdc-btn--active .mdc-btn-face {
          transform: translateY(4px) scale(0.96);
          box-shadow:
            0 4px 10px rgba(33,151,161,.4),
            inset -2px -2px 5px rgba(0,0,0,.2),
            inset 2px 2px 5px rgba(255,255,255,.4);
        }
        .mdc-btn:active .mdc-btn-glow,
        .mdc-btn--active .mdc-btn-glow { width: 34px; opacity: .35; }

        /* Pulse ring */
        @keyframes mdc-pulse {
          0%   { transform: translate(-50%,-50%) scale(1);    opacity: .55; }
          100% { transform: translate(-50%,-50%) scale(1.7);  opacity: 0; }
        }
        .mdc-btn::before {
          content: '';
          position: absolute;
          top: 32px; left: 50%;
          width: 64px; height: 64px;
          border-radius: 50%;
          border: 2px solid rgba(33,151,161,.4);
          animation: mdc-pulse 2.4s ease-out infinite;
          pointer-events: none;
        }


ects       `}} />
    </div>
  );
}
