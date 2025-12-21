"use client";

import { useEffect, useRef, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import InvoiceTemplate from "@/components/pdf-templates/InvoiceTemplate";
import ReceiptTemplate from "@/components/pdf-templates/ReceiptTemplate";
import Button from "@/components/ui/Button";
import { Download, Eye } from "lucide-react";

export default function PdfPreview() {
  const { data } = useInvoiceStore();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const filename =
    data.documentType === "INVOICE" ? "invoice.pdf" : "receipt.pdf";

  const handleDownload = () => {
    if (!previewUrl) return;
    const link = document.createElement("a");
    link.href = previewUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  useEffect(() => {
    let objectUrl: string | null = null;

    const generatePreview = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setPreviewUrl(null);

        const doc =
          data.documentType === "INVOICE" ? (
            <InvoiceTemplate data={data} />
          ) : (
            <ReceiptTemplate data={data} />
          );

        const blob = await pdf(doc).toBlob();
        objectUrl = URL.createObjectURL(blob);
        setPreviewUrl(objectUrl);
      } catch (err) {
        console.error(err);
        setError("Gagal membuat pratinjau PDF.");
      } finally {
        setIsLoading(false);
      }
    };

    generatePreview();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [data]);

  return (
    <div className="bg-card-bg rounded-xl p-5 border border-border">
      <div className="flex items-center gap-3 mb-4">
        <Eye className="w-5 h-5 text-slate-700" />
        <h2 className="text-lg font-bold">Live Preview</h2>

        <div className="ml-auto">
          <Button
            onClick={handleDownload}
            variant="primary"
            className="bg-blue-600 text-white hover:bg-blue-600"
            disabled={!previewUrl}
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* LOADING TANPA CARD */}
      {isLoading && (
        <p className="text-sm text-gray-500 mb-2">Membuat pratinjau PDF...</p>
      )}

      {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

      <div className="border rounded-lg p-4">
        <iframe
          ref={iframeRef}
          src={previewUrl ?? undefined}
          className="w-full border rounded"
          style={{
            height: "760px",
            display: isLoading ? "none" : "block",
          }}
          title="Pratinjau PDF"
        />
      </div>
    </div>
  );
}
