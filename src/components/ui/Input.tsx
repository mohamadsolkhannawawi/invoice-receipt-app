"use client";
import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
    props,
    ref
) {
    return (
        <input
            ref={ref}
            {...props}
            className={`w-full rounded-lg border border-gray-200 bg-white px-3 py-3 pr-12 text-base leading-6 focus:outline-none focus:ring-2 focus:ring-primary ${
                props.className ?? ""
            }`}
        />
    );
});

Input.displayName = "Input";

export default Input;
