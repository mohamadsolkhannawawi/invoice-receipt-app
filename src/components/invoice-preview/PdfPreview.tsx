"use client";

import { useEffect, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import InvoiceTemplate from "@/components/pdf-templates/InvoiceTemplate";
import Button from "@/components/ui/Button";
import { Download, Eye, Loader2, CheckCircle } from "lucide-react";

export default function PdfPreview() {
  const { data } = useInvoiceStore();

  const [isGenerating, setIsGenerating] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const filename =
    data.documentType === "INVOICE"
      ? `INVOICE-${data.invoiceNumber ?? Date.now()}.pdf`
      : `RECEIPT-${data.invoiceNumber ?? Date.now()}.pdf`;

  const handleDownload = async () => {
    if (!previewUrl || isDownloading) return;

    try {
      setIsDownloading(true);
      setSuccess(false);

      const link = document.createElement("a");
      link.href = previewUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();

      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    let objectUrl: string | null = null;
    let cancelled = false;

    const generatePreview = async () => {
      try {
        setIsGenerating(true);
        setError(null);
        setSuccess(false);

        const doc =
          data.documentType === "INVOICE" ? (
            <InvoiceTemplate data={data} />
          ) : (
            <InvoiceTemplate
              data={{ ...data, documentType: "RECEIPT", status: "PAID" }}
            />
          );

        const blob = await pdf(doc).toBlob();
        if (cancelled) return;

        objectUrl = URL.createObjectURL(blob);
        setPreviewUrl(objectUrl);
      } catch (err) {
        console.error("PDF generation error:", err);
        setError("Tidak dapat membuat pratinjau PDF.");
      } finally {
        if (!cancelled) setIsGenerating(false);
      }
    };

    const timeout = setTimeout(generatePreview, 300);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [data]);

  return (
    <div className="bg-card-bg rounded-xl p-5 border border-border">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Eye className="w-5 h-5 text-slate-700" />
        <h2 className="text-lg font-bold">Live Preview</h2>

        <div className="ml-auto flex items-center gap-3">
          {success && (
            <span className="flex items-center gap-1 text-sm text-green-600">
              <CheckCircle className="w-4 h-4" />
              PDF berhasil diunduh
            </span>
          )}

          <Button
            onClick={handleDownload}
            disabled={!previewUrl || isGenerating || isDownloading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl
              bg-orange-500 text-white
              hover:bg-orange-600
              shadow-sm hover:shadow-md hover:-translate-y-0.5
              transition-all disabled:opacity-60"
          >
            {isDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span className="text-sm font-semibold tracking-wide">
              Export PDF
            </span>
          </Button>
        </div>
      </div>

      {/* Status */}
      {isGenerating && (
        <p className="text-sm text-gray-500 mb-2">Membuat pratinjau PDF…</p>
      )}

      {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

      {/* Preview */}
      <div className="rounded-lg overflow-hidden">
        {previewUrl && (
          <iframe
            src={previewUrl}
            title="Pratinjau PDF"
            className="w-full transition"
            style={{
              height: "780px",
              opacity: isGenerating ? 0.6 : 1,
            }}
          />
        )}
      </div>
    </div>
  );
}
