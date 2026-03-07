"use client";

import React from "react";
import "./TrustIndicators.css";

const indicators = [
    {
        value: "150+",
        label: "Projects Delivered",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg>
        )
    },
    {
        value: "98%",
        label: "Client Satisfaction",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
        )
    },
    {
        value: "5+",
        label: "Years Experience",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="m4.93 4.93 14.14 14.14" /><path d="M2 12h20" /><path d="m19.07 4.93-14.14 14.14" /></svg>
        )
    },
    {
        value: "Global",
        label: "Serving Clients",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
        )
    }
];

const TrustIndicators = () => {
    return (
        <section className="trust-strip">
            <div className="trust-strip__container">
                {indicators.map((item, index) => (
                    <div key={index} className="trust-card">
                        <div className="trust-card__icon-wrapper">
                            {item.icon}
                        </div>
                        <div className="trust-card__content">
                            <span className="trust-card__value">{item.value}</span>
                            <span className="trust-card__label">{item.label}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrustIndicators;
