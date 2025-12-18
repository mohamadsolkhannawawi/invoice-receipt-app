"use client";

import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import InvoiceTemplate from "@/components/pdf-templates/InvoiceTemplate";
import ReceiptTemplate from "@/components/pdf-templates/ReceiptTemplate";
import Button from "@/components/ui/Button";

export default function DownloadButton() {
    const { data } = useInvoiceStore();

    const handleDownload = async () => {
        const doc =
            data.documentType === "INVOICE" ? (
                <InvoiceTemplate data={data} />
            ) : (
                <ReceiptTemplate data={data} />
            );

        const blob = await pdf(doc).toBlob();

        saveAs(
            blob,
            `${data.documentType.toLowerCase()}-${data.invoiceNumber}.pdf`
        );
    };

    return (
        <Button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700"
        >
            Unduh PDF
        </Button>
    );
}
