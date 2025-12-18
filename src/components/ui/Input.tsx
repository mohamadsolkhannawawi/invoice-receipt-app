"use client";
import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
    return (
        <input
            {...props}
            className={`w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                props.className ?? ""
            }`}
        />
    );
}
