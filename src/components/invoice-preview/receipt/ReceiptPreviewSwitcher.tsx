"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import ReceiptStyleA from "@/components/invoice-preview/receipt/ReceiptStyleA";
import ReceiptStyleB from "@/components/invoice-preview/receipt/ReceiptStyleB";
import ReceiptStyleC from "@/components/invoice-preview/receipt/ReceiptStyleC";
import { InvoiceData } from "@/lib/types";

export default function ReceiptPreviewSwitcher() {
    const { data } = useInvoiceStore();

    // force RECEIPT semantics for preview: documentType -> RECEIPT, status -> PAID
    const overrideData: InvoiceData = {
        ...data,
        documentType: "RECEIPT",
        status: "PAID",
    } as InvoiceData;

    switch (overrideData.template) {
        case "STYLE_B":
            return <ReceiptStyleB />;
        case "STYLE_C":
            return <ReceiptStyleC />;
        default:
            return <ReceiptStyleA />;
    }
}
