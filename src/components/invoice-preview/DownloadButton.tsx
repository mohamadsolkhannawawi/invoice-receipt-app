"use client";

import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import InvoiceTemplate from "@/components/pdf-templates/InvoiceTemplate";
import ReceiptTemplate from "@/components/pdf-templates/ReceiptTemplate";

export default function DownloadButton() {
    const { data } = useInvoiceStore();

    const handleDownload = async () => {
        const document =
            data.documentType === "INVOICE" ? (
                <InvoiceTemplate data={data} />
            ) : (
                <ReceiptTemplate data={data} />
            );

        const blob = await pdf(document).toBlob();

        const filename = `${data.documentType.toLowerCase()}-${
            data.invoiceNumber
        }.pdf`;

        saveAs(blob, filename);
    };

    return (
        <button
            onClick={handleDownload}
            className="bg-green-600 text-white px-4 py-2 rounded"
        >
            Download PDF
        </button>
    );
}
