"use client";

import dynamic from "next/dynamic";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import InvoiceTemplate from "@/components/pdf-templates/InvoiceTemplate";
import ReceiptTemplate from "@/components/pdf-templates/ReceiptTemplate";

const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    { ssr: false }
);

export default function PreviewWrapper() {
    const { data } = useInvoiceStore();

    return (
        <div className="h-[600px] border">
            <PDFViewer width="100%" height="100%">
                {data.documentType === "INVOICE" ? (
                    <InvoiceTemplate data={data} />
                ) : (
                    <ReceiptTemplate data={data} />
                )}
            </PDFViewer>
        </div>
    );
}
