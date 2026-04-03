"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import Image from "next/image";
import Button from "./Button";
import { usePathname } from "next/navigation";

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
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const dropdownItemsRef = useRef<HTMLLIElement[]>([]);
    const navRef = useRef<HTMLElement>(null);
    const pathname = usePathname();

    /* ── scroll listener ── */
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* ── GSAP dropdown animation (Desktop Only) ── */
    useEffect(() => {
        if (!dropdownRef.current || window.innerWidth <= 1024) return;
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

    /* ── Initial Entrance Animation ── */
    useEffect(() => {
        if (!navRef.current) return;

        // Kill any existing tweens to prevent stuttering
        gsap.killTweensOf(navRef.current);

        // Immediate reset hide before animation starts
        gsap.set(navRef.current, { y: -150, opacity: 0 });

        gsap.to(navRef.current, {
            y: 0,
            opacity: 1,
            duration: 1.3,
            ease: "expo.out",
            delay: 0.1,
        });
    }, [pathname]);

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

    const closeMobileMenu = () => {
        setMobileOpen(false);
        setMobileDropdownOpen(false);
    };

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 w-full z-50 transition-[border-radius,padding,background-color,background-image] duration-500 bg-linear-to-r from-[#e0e0e0] to-[#2197A1] shadow-[0_2px_20px_rgba(0,0,0,0.08)]
                ${scrolled ? "rounded-b-[0px] lg:rounded-b-[100px] py-3" : "rounded-full lg:rounded-t-[50px] py-5"}`}
        >
            <div className="container !mx-auto !px-6 lg:!px-12 flex items-center justify-between min-h-[60px]">

                {/* ── Logo ── */}
                <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="flex-shrink-0 font-black text-2xl tracking-tight transition-all duration-300 hover:scale-105 text-[var(--primary-color)] leading-none"
                >
                    <Image src="/logo.png" alt="Logo" width={50} height={50} className="lg:w-[100px] lg:h-[70px]" />
                </Link>

                {/* ── Hamburger (Mobile) ── */}
                <button
                    onClick={() => setMobileOpen((p) => !p)}
                    aria-label="Toggle menu"
                    suppressHydrationWarning
                    className="lg:hidden relative z-50 w-12 h-12 flex items-center justify-center rounded-full border-[2.5px] border-[var(--primary-color)] shadow-[0_4px_10px_rgba(0,0,0,0.1)] bg-white/80 backdrop-blur-md group transition-all duration-300 active:scale-95"
                >
                    <div className="w-6 h-5 relative flex flex-col justify-between items-start">
                        {/* Row 1 */}
                        <div className={`w-full flex items-center gap-1.5 transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[9px] -translate-x-1" : ""}`}>
                            <span className={`block h-[4px] bg-[var(--primary-color)] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-all duration-300 ${mobileOpen ? "w-7" : "w-7"}`} />
                        </div>

                        {/* Row 2 */}
                        <div className={`w-full flex items-center gap-1.5 transition-all duration-300 ${mobileOpen ? "scale-0 opacity-0" : "opacity-100"}`}>
                            <span className="block h-[4px] w-4 bg-[var(--primary-color)] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.2)]" />
                        </div>

                        {/* Row 3 */}
                        <div className={`w-full flex items-center gap-1.5 transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[9px] -translate-x-1" : ""}`}>
                            <span className={`block h-[4px] bg-[var(--primary-color)] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-all duration-300 ${mobileOpen ? "w-7" : "w-7"}`} />
                        </div>
                    </div>
                </button>

                {/* ── Desktop Nav Links ── */}
                <ul className="hidden lg:flex items-stretch justify-center gap-8 list-none !m-0 !p-0 flex-1 h-full">
                    <li className="flex items-center !m-0 !p-0 h-full">
                        <Link
                            href="/who-we-are"
                            className="relative group text-sm font-semibold !text-gray-700 hover:!text-[var(--secondary-color)] transition-colors duration-200 no-underline leading-none"
                        >
                            Who We Are
                            <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[var(--secondary-color)] transition-all duration-300 group-hover:w-full" />
                        </Link>
                    </li>

                    {/* Solutions with Dropdown */}
                    <li
                        className="relative flex items-center !m-0 !p-0 h-full"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <div className="flex items-center gap-1 cursor-pointer group h-full">
                            <Link
                                href="/solutions"
                                className="relative text-sm font-semibold !text-gray-700 hover:!text-[var(--secondary-color)] transition-colors duration-200 no-underline leading-none"
                            >
                                Solutions
                                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[var(--secondary-color)] transition-all duration-300 group-hover:w-full" />
                            </Link>
                            <svg
                                className={`w-5 h-5 !text-gray-700 !pt-1 transition-transform duration-200
                                    ${dropdownOpen ? "rotate-180" : ""}`}
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
                        </div>

                        {/* Dropdown Panel */}
                        <ul
                            ref={dropdownRef}
                            className={`hidden absolute top-full left-1/2 -translate-x-1/2 w-[480px] flex-col gap-1
                                bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-100
                                !p-3 list-none !m-0
                                ${scrolled ? "!mt-5" : "!mt-5"}
                                before:content-[''] before:absolute before:-top-6 before:left-0 before:w-full before:h-6 transition-all duration-300`}
                        >
                            {solutionsDropdown.map((item, i) => (
                                <li
                                    key={item.href}
                                    ref={(el) => { if (el) dropdownItemsRef.current[i] = el; }}
                                    className="!m-0 !p-0"
                                >
                                    <Link
                                        href={item.href}
                                        onClick={closeMobileMenu}
                                        className="block !px-4 !py-2 text-sm font-medium !text-gray-600 rounded-xl
                                            hover:bg-[var(--secondary-color)]/15 hover:!text-[var(--secondary-color)] transition-all duration-200 no-underline"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>

                    <li className="flex items-center !m-0 !p-0 h-full">
                        <Link
                            href="/case-studies"
                            className="relative group text-sm font-semibold !text-gray-700 hover:!text-[var(--secondary-color)] transition-colors duration-200 no-underline leading-none"
                        >
                            Case Studies
                            <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[var(--secondary-color)] transition-all duration-300 group-hover:w-full" />
                        </Link>
                    </li>
                    <li className="flex items-center !m-0 !p-0 h-full">
                        <Link
                            href="/insights"
                            className="relative group text-sm font-semibold !text-gray-700 hover:!text-[var(--secondary-color)] transition-colors duration-200 no-underline leading-none"
                        >
                            Insights
                            <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[var(--secondary-color)] transition-all duration-300 group-hover:w-full" />
                        </Link>
                    </li>
                    <li className="flex items-center !m-0 !p-0 h-full">
                        <Link
                            href="/inside-company"
                            className="relative group text-sm font-semibold !text-gray-700 hover:!text-[var(--secondary-color)] transition-colors duration-200 no-underline leading-none"
                        >
                            Inside ProdBiz
                            <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[var(--secondary-color)] transition-all duration-300 group-hover:w-full" />
                        </Link>
                    </li>
                    <li className="flex items-center !m-0 !p-0 h-full">
                        <Link
                            href="/contact"
                            className="relative group text-sm font-semibold !text-gray-700 hover:!text-[var(--secondary-color)] transition-colors duration-200 no-underline leading-none"
                        >
                            Contact
                            <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[var(--secondary-color)] transition-all duration-300 group-hover:w-full" />
                        </Link>
                    </li>
                </ul>

                {/* ── Desktop CTA ── */}
                <div className="hidden lg:flex items-center flex-shrink-0">
                    <Button href="/get-proposal">Get Proposal</Button>
                </div>
            </div>

            {/* ── Mobile Menu Overlay ── */}
            <div
                className={`lg:hidden absolute top-full left-0 w-full bg-linear-to-r from-[#e0e0e0] to-[var(--primary-color)] z-40 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-b-3xl transition-all duration-500 ease-in-out
                    ${mobileOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}
            >
                {/* Mobile Links */}
                <ul className="flex flex-col !p-2 list-none !m-0 overflow-y-auto max-h-[80vh]">
                    <li className="!my-2 !px-2 !py-1 border border-transparent rounded-md shadow-[20px_20px_20px_rgba(0,0,0,0.15)]">
                        <Link
                            href="/who-we-are"
                            onClick={closeMobileMenu}
                            className="flex items-center justify-between py-4 text-base font-semibold !text-gray-700 no-underline hover:text-[var(--primary-color)] transition-colors group"
                        >
                            Who We Are
                        </Link>
                    </li>

                    {/* Mobile Solutions Accordion */}
                    <li className="!my-2 !px-2 !py-1 border border-transparent rounded-md shadow-[20px_20px_20px_rgba(0,0,0,0.15)]">
                        <button
                            onClick={() => setMobileDropdownOpen((p) => !p)}
                            suppressHydrationWarning
                            className="w-full flex items-center justify-between py-4 text-base font-semibold !text-gray-700 cursor-pointer bg-transparent border-none text-left"
                        >
                            Solutions
                            <svg
                                className={`w-5 h-5 !text-gray-800 transition-transform duration-300
                                    ${mobileDropdownOpen ? "rotate-180" : ""}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                        </button>

                        {/* Mobile Accordion Items */}
                        <div className={`transition-all duration-300 ${mobileDropdownOpen ? "max-h-[148px] overflow-y-auto opacity-100 custom-scrollbar-hide" : "max-h-0 overflow-hidden opacity-0"}`}>
                            <ul className="!pt-4 flex flex-col list-none !m-0">
                                {solutionsDropdown.map((item) => (
                                    <li key={item.href} className="m-0 p-0">
                                        <Link
                                            href={item.href}
                                            onClick={closeMobileMenu}
                                            className="flex items-center justify-between py-3 !text-sm font-medium !text-gray-700 hover:text-[var(--primary-color)] transition-colors no-underline group"
                                        >
                                            {item.label}
                                            <svg className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>

                    <li className="!my-2 !px-2 !py-1 border border-transparent rounded-md shadow-[20px_20px_20px_rgba(0,0,0,0.15)]">
                        <Link
                            href="/case-studies"
                            onClick={closeMobileMenu}
                            className="flex items-center justify-between py-4 text-base font-semibold !text-gray-700 no-underline hover:text-[var(--primary-color)] transition-colors group"
                        >
                            Case Studies
                        </Link>
                    </li>
                    <li className="!my-0 !px-2 !py-1 border border-transparent rounded-md shadow-[20px_20px_20px_rgba(0,0,0,0.15)]">
                        <Link
                            href="/insights"
                            onClick={closeMobileMenu}
                            className="flex items-center justify-between py-4 text-base font-semibold !text-gray-700 no-underline hover:text-[var(--primary-color)] transition-colors group"
                        >
                            Insights
                        </Link>
                    </li>
                    <li className="!my-2 !px-2 !py-1 border border-transparent rounded-md shadow-[20px_20px_20px_rgba(0,0,0,0.15)]">
                        <Link
                            href="/inside-company"
                            onClick={closeMobileMenu}
                            className="flex items-center justify-between py-4 text-base font-semibold !text-gray-700 no-underline hover:text-[var(--primary-color)] transition-colors group"
                        >
                            Inside ProdBiz
                        </Link>
                    </li>
                    <li className="!my-2 !px-2 !py-1 border border-transparent rounded-md shadow-[20px_20px_20px_rgba(0,0,0,0.15)]">
                        <Link
                            href="/contact"
                            onClick={closeMobileMenu}
                            className="flex items-center justify-between py-4 text-base font-semibold !text-gray-700 no-underline hover:text-[var(--primary-color)] transition-colors group"
                        >
                            Contact
                        </Link>
                    </li>
                </ul>

                {/* Mobile CTA */}
                <div className="!px-6 !py-5">
                    <Button href="/get-proposal" onClick={closeMobileMenu} className="w-full text-center py-4">
                        Get Proposal
                    </Button>
                </div>
            </div>
        </nav>
    );
}
