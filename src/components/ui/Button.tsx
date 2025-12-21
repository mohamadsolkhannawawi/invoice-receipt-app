"use client";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition";
  const variants: Record<string, string> = {
    primary: `bg-primary text-white shadow hover:bg-[#0077e6]`,
    secondary: `bg-white border border-gray-200 text-gray-800 hover:bg-gray-50`,
    ghost: `bg-transparent text-gray-700 hover:bg-gray-100`,
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
