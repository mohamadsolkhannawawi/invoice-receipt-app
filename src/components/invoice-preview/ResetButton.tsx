"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";

export default function ResetButton() {
    const { reset } = useInvoiceStore();

    return (
        <button
            onClick={reset}
            className="bg-red-500 text-white px-4 py-2 rounded"
        >
            Reset Form
        </button>
    );
}
