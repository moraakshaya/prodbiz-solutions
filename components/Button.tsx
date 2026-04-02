"use client";

import Link from "next/link";
import React from "react";
import "./Button.css";

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    variant?: "primary" | "secondary";
    size?: "md" | "lg";
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

const Button = ({
    children,
    href,
    variant = "primary",
    size = "md",
    className = "",
    onClick,
    type = "button",
}: ButtonProps) => {
    const baseClasses = `button button--${variant} ${size === "lg" ? "button--lg" : ""} ${className}`;

    if (href) {
        return (
            <Link href={href} className={baseClasses} onClick={onClick} suppressHydrationWarning>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={baseClasses} onClick={onClick} suppressHydrationWarning>
            {children}
        </button>
    );
};

export default Button;
