"use client";
import React, { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
    className?: string;
}>;

export default function Card({ children, className = "" }: CardProps) {
    return (
        <div
            className={`bg-card-bg rounded-xl p-5 shadow-soft-md border border-border ${className}`}
        >
            {children}
        </div>
    );
}
