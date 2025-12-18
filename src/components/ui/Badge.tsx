"use client";
import React from "react";

type BadgeProps = {
    children: React.ReactNode;
    color?: "info" | "success" | "muted";
    className?: string;
};

export default function Badge({
    children,
    color = "info",
    className = "",
}: BadgeProps) {
    const map: Record<string, string> = {
        info: "bg-primary text-white",
        success: "bg-success text-white",
        muted: "bg-gray-200 text-gray-700",
    };
    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${map[color]} ${className}`}
        >
            {children}
        </span>
    );
}
