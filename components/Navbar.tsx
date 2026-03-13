"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import "./Navbar.css";
import Button from "./Button";

const solutionsDropdown = [
    { label: "Digital Product & Software Development", href: "/solutions/digital-product-software-development" },
    { label: "Performance Marketing", href: "/solutions/performance-marketing" },
    { label: "Brand Growth & Reputation Management", href: "/solutions/brand-growth-reputation-management" },
    { label: "Data, Analytics & Campaign Intelligence", href: "/solutions/data-analytics-campaign-intelligence" },
    { label: "Creative Media & Brand Production", href: "/solutions/creative-media-brand-production" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const dropdownItemsRef = useRef<HTMLLIElement[]>([]);
    const navRef = useRef<HTMLElement>(null);

    /* ── scroll listener ── */
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* ── GSAP dropdown animation ── */
    useEffect(() => {
        if (!dropdownRef.current) return;
        const items = dropdownItemsRef.current;

        if (dropdownOpen) {
            gsap.set(dropdownRef.current, { display: "flex", autoAlpha: 0, y: -10 });
            gsap.to(dropdownRef.current, {
                autoAlpha: 1,
                y: 0,
                duration: 0.35,
                ease: "power3.out",
            });
            gsap.fromTo(
                items,
                { autoAlpha: 0, y: -8 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.3,
                    stagger: 0.06,
                    ease: "power2.out",
                    delay: 0.1,
                }
            );
        } else {
            gsap.to(dropdownRef.current, {
                autoAlpha: 0,
                y: -10,
                duration: 0.25,
                ease: "power2.in",
                onComplete: () => {
                    gsap.set(dropdownRef.current, { display: "none" });
                },
            });
        }
    }, [dropdownOpen]);

    /* ── close dropdown on outside click ── */
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav
            ref={navRef}
            className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
        >
            <div className="navbar__container">
                {/* logo */}
                <Link href="/" className="navbar__logo">
                    ProdBiz
                </Link>

                {/* hamburger */}
                <button
                    className={`navbar__hamburger ${mobileOpen ? "navbar__hamburger--open" : ""}`}
                    onClick={() => setMobileOpen((p) => !p)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                    <span />
                </button>

                {/* links */}
                <ul className={`navbar__links ${mobileOpen ? "navbar__links--open" : ""}`}>
                    <li>
                        <Link href="/who-we-are" onClick={() => setMobileOpen(false)}>
                            Who We Are
                        </Link>
                    </li>

                    {/* solutions w/ dropdown */}
                    <li
                        className="navbar__dropdown-trigger"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <Link href="/solutions" onClick={() => setMobileOpen(false)}>
                            Solutions
                            <svg
                                className={`navbar__chevron ${dropdownOpen ? "navbar__chevron--open" : ""}`}
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                            >
                                <path
                                    d="M3 4.5L6 7.5L9 4.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>

                        <ul ref={dropdownRef} className="navbar__dropdown">
                            {solutionsDropdown.map((item, i) => (
                                <li
                                    key={item.href}
                                    ref={(el) => {
                                        if (el) dropdownItemsRef.current[i] = el;
                                    }}
                                >
                                    <Link href={item.href} onClick={() => setMobileOpen(false)}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>

                    <li>
                        <Link href="/case-studies" onClick={() => setMobileOpen(false)}>
                            Case Studies
                        </Link>
                    </li>
                    <li>
                        <Link href="/insights" onClick={() => setMobileOpen(false)}>
                            Insights
                        </Link>
                    </li>
                    <li>
                        <Link href="/inside-company" onClick={() => setMobileOpen(false)}>
                            Inside ProdBiz
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" onClick={() => setMobileOpen(false)}>
                            Contact
                        </Link>
                    </li>
                </ul>

                {/* CTA */}
                <Button href="/get-proposal" onClick={() => setMobileOpen(false)}>
                    Get Proposal
                </Button>
            </div>
        </nav>
    );
}
