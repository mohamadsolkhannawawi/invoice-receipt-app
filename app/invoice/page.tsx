"use client";

import { useEffect } from "react";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useHydration } from "@/hooks/useHydration";
import ItemListForm from "@/components/invoice-form/ItemListForm";
import CalculationForm from "@/components/invoice-form/CalculationForm";
import PreviewWrapper from "@/components/invoice-preview/PreviewWrapper";
import DownloadButton from "@/components/invoice-preview/DownloadButton";
import ResetButton from "@/components/invoice-form/ResetButton";

export default function InvoicePage() {
    const hydrated = useHydration();
    const { data, initialize } = useInvoiceStore();

    useEffect(() => {
        initialize("INVOICE");
    }, [initialize]);

    if (!hydrated) return null;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">Invoice Page</h1>
            <pre className="mt-4 bg-slate-100 p-4 rounded">
                {JSON.stringify(data, null, 2)}
            </pre>
            <div className="mt-6 space-y-6">
                <ItemListForm />
                <CalculationForm />
            </div>
            <div className="mt-8">
                <PreviewWrapper />
            </div>
        </div>
    );
}
