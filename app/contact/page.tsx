"use client";

import React, { useState } from "react";
import Link from "next/link";

// ─── Icons ────────────────────────────────────────────────────────────────────
const MapPinIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);
const PhoneIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.39 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);
const MailIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);
const ClockIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const contactInfo = [
    {
        icon: <MapPinIcon />,
        label: "Address",
        value: "123 Business Street, City, Country",
    },
    {
        icon: <PhoneIcon />,
        label: "Phone",
        value: "+91 98765 43210",
        href: "tel:+919876543210",
    },
    {
        icon: <MailIcon />,
        label: "Email",
        value: "info@prodbiz.com",
        href: "mailto:info@prodbiz.com",
    },
    {
        icon: <ClockIcon />,
        label: "Working Hours",
        value: "Mon – Fri : 9:00 AM – 6:00 PM",
    },
];

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "", email: "", phone: "", subject: "", message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-white">

            {/* ── 1. HERO BANNER ─────────────────────────────────────────────────── */}
            <section className="relative w-full min-h-[360px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2197A1] via-[#1b7a82] to-[#125960]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(0,0,0,0.15)_0%,_transparent_60%)]" />
                {/* Ring decorations */}
                <div className="absolute w-[500px] h-[500px] rounded-full border border-white/10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute w-[300px] h-[300px] rounded-full border border-white/10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

                <div className="relative z-10 text-center px-6 py-20">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50 mb-4">Get In Touch</p>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight">Contact Us</h1>
                    <p className="text-lg text-white/75 font-medium max-w-xl mx-auto leading-relaxed">
                        Have a project in mind? We'd love to hear from you.<br />
                        Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                {/* Wavy bottom edge */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-[1px]">
                    <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" viewBox="0 0 1200 60" preserveAspectRatio="none">
                        <path d="M0,60V22c47,11,100,16,158,14,70-3,136-17,207-19,74-2,148,8,218,18,69,9,138,12,209,7,36-3,70-9,104-15C989,12,1113,0,1200,26V60H0Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* ── 2. CONTACT INFO CARDS ──────────────────────────────────────────── */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-primary/50 mb-3">Reach Us</p>
                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Contact Information</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((item, idx) => (
                            <div
                                key={idx}
                                className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(33,151,161,0.14)] hover:-translate-y-2 transition-all duration-300"
                            >
                                {/* Top accent line */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2197A1] to-[#125960] rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white shadow-[0_8px_20px_rgba(33,151,161,0.1)] group-hover:shadow-[0_12px_30px_rgba(33,151,161,0.25)] transition-all duration-300">
                                    {item.icon}
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary/50 mb-2">{item.label}</p>
                                {item.href ? (
                                    <a href={item.href} className="font-semibold text-gray-700 hover:text-primary transition-colors duration-200 text-sm leading-relaxed">
                                        {item.value}
                                    </a>
                                ) : (
                                    <p className="font-semibold text-gray-700 text-sm leading-relaxed">{item.value}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3. CONTACT FORM ────────────────────────────────────────────────── */}
            <section className="py-20 px-6 bg-[#f2f4f7]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-primary/50 mb-3">Send a Message</p>
                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Get In Touch</h2>
                    </div>

                    <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-100 p-10 md:p-14">
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center py-16 gap-5">
                                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Message Sent!</h3>
                                <p className="text-gray-500 font-medium text-center max-w-sm">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                                <button onClick={() => setSubmitted(false)} className="mt-2 text-primary font-semibold text-sm underline underline-offset-4 hover:opacity-70 transition-opacity">Send another message</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Row 1: Name + Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Name <span className="text-primary">*</span></label>
                                        <input
                                            name="name" value={form.name} onChange={handleChange} required
                                            placeholder="Your full name"
                                            className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-gray-800 text-sm font-medium placeholder:text-gray-300 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Email <span className="text-primary">*</span></label>
                                        <input
                                            name="email" type="email" value={form.email} onChange={handleChange} required
                                            placeholder="your@email.com"
                                            className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-gray-800 text-sm font-medium placeholder:text-gray-300 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Phone + Subject */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Phone</label>
                                        <input
                                            name="phone" type="tel" value={form.phone} onChange={handleChange}
                                            placeholder="+91 XXXXX XXXXX"
                                            className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-gray-800 text-sm font-medium placeholder:text-gray-300 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Subject</label>
                                        <input
                                            name="subject" value={form.subject} onChange={handleChange}
                                            placeholder="How can we help?"
                                            className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-gray-800 text-sm font-medium placeholder:text-gray-300 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Message <span className="text-primary">*</span></label>
                                    <textarea
                                        name="message" value={form.message} onChange={handleChange} required rows={5}
                                        placeholder="Tell us about your project or inquiry..."
                                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-gray-800 text-sm font-medium placeholder:text-gray-300 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all duration-200 resize-none"
                                    />
                                </div>

                                {/* Submit */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="px-10 py-4 rounded-2xl bg-primary text-white font-bold text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(33,151,161,0.3)] hover:shadow-[0_20px_50px_rgba(33,151,161,0.4)] hover:bg-[#1b7a82] hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* ── 4. GOOGLE MAP ──────────────────────────────────────────────────── */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-primary/50 mb-3">Find Us</p>
                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Our Location</h2>
                    </div>
                    <div className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 h-[420px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnNDAuNiJF!5e0!3m2!1sen!2sin!4v1609459200000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Our Office Location"
                            allowFullScreen
                        />
                    </div>
                </div>
            </section>

            {/* ── 5. QUICK CTA ───────────────────────────────────────────────────── */}
            <section className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2197A1] via-[#1b7a82] to-[#125960]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12)_0%,_transparent_60%)]" />
                <div className="absolute w-[500px] h-[500px] rounded-full border border-white/10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50">Work With Us</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                        Let's Work Together
                    </h2>
                    <p className="text-lg text-white/75 font-medium leading-relaxed">
                        Have an idea or project? Contact us today and let's build something amazing.
                    </p>
                    <Link
                        href="/get-proposal"
                        className="mt-2 px-10 py-4 rounded-2xl bg-white text-primary font-bold text-sm uppercase tracking-widest shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300"
                    >
                        Get In Touch
                    </Link>
                </div>
            </section>

        </main>
    );
}
