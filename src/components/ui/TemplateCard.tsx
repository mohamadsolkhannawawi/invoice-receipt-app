"use client";
import React from "react";

type Props = {
    title: string;
    active?: boolean;
    onClick?: () => void;
};

export default function TemplateCard({
    title,
    active = false,
    onClick,
}: Props) {
    return (
        <div
            role="button"
            onClick={onClick}
            className={`cursor-pointer rounded-lg p-3 border bg-white flex flex-col gap-1 items-start justify-center ${
                active
                    ? "border-amber-400 ring-2 ring-amber-200 shadow-sm"
                    : "border-gray-100"
            }`}
        >
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-md bg-gray-50 border border-gray-100">
                    {title === "Modern" ? (
                        <svg
                            width="18"
                            height="12"
                            viewBox="0 0 18 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="0"
                                y="2"
                                width="18"
                                height="8"
                                rx="2"
                                fill="#111827"
                                opacity="0.85"
                            />
                        </svg>
                    ) : title === "Klasik" ? (
                        <svg
                            width="18"
                            height="12"
                            viewBox="0 0 18 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="0"
                                y="1"
                                width="18"
                                height="2"
                                rx="1"
                                fill="#111827"
                            />
                            <rect
                                x="0"
                                y="5"
                                width="18"
                                height="2"
                                rx="1"
                                fill="#111827"
                            />
                            <rect
                                x="0"
                                y="9"
                                width="18"
                                height="2"
                                rx="1"
                                fill="#111827"
                            />
                        </svg>
                    ) : (
                        <svg
                            width="14"
                            height="16"
                            viewBox="0 0 14 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2 1h7l3 3v11a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"
                                fill="#111827"
                            />
                        </svg>
                    )}
                </div>

                <div>
                    <div className="text-sm font-semibold">{title}</div>
                    <div className="text-xs text-muted">
                        Tampilan {title.toLowerCase()}
                    </div>
                </div>
            </div>
        </div>
    );
}
