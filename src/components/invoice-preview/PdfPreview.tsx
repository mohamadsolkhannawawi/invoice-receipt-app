"use client";

import { useEffect, useState, useRef } from "react";
import { pdf } from "@react-pdf/renderer";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import InvoiceTemplate from "@/components/pdf-templates/InvoiceTemplate";
import Button from "@/components/ui/Button";
import { Download, Eye, Loader2, CheckCircle } from "lucide-react";

type PdfRenderTask = {
  promise: Promise<void>;
  cancel?: () => void;
};

export default function PdfPreview() {
  const { data } = useInvoiceStore();

  const [isGenerating, setIsGenerating] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null);
  const [pdfJsError, setPdfJsError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const filename =
    data.documentType === "INVOICE"
      ? `INVOICE-${data.invoiceNumber ?? Date.now()}.pdf`
      : `RECEIPT-${data.invoiceNumber ?? Date.now()}.pdf`;

  const handleDownload = async () => {
    if (!previewUrl || isDownloading) return;

    try {
      setIsDownloading(true);
      setSuccess(false);

      const isMobile =
        typeof navigator !== "undefined" &&
        /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(
          navigator.userAgent
        );

      if (isMobile && "share" in navigator) {
        try {
          const resp = await fetch(previewUrl);
          const blob = await resp.blob();
          const file = new File([blob], filename, {
            type: "application/pdf",
          });

          await (
            navigator as Navigator & {
              share: (data: { files: File[]; title: string }) => Promise<void>;
            }
          ).share({
            files: [file],
            title: filename,
          });

          setSuccess(true);
          setTimeout(() => setSuccess(false), 2500);
          return;
        } catch (err: unknown) {
          console.warn("Share failed, falling back to download", err);
        }
      }

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

  const handleOpenFull = () => {
    if (!previewUrl) return;
    try {
      window.open(previewUrl, "_blank");
    } catch {}
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
              data={{
                ...data,
                documentType: "RECEIPT",
                status: "PAID",
              }}
            />
          );

        const blob = await pdf(doc).toBlob();
        if (cancelled) return;

        objectUrl = URL.createObjectURL(blob);
        setPreviewUrl(objectUrl);
        setPreviewBlob(blob);
      } catch (err: unknown) {
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

  // Render PDF Blob to canvas using pdf.js
  useEffect(() => {
    if (!previewBlob) return;

    let cancelled = false;
    let renderTask: PdfRenderTask | null = null;

    const renderPdf = async () => {
      setPdfJsError(null);
      try {
        const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf");

        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const arrayBuffer = await previewBlob.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdfDoc = await loadingTask.promise;
        if (cancelled) return;

        const page = await pdfDoc.getPage(1);
        if (cancelled) return;

        const viewport = page.getViewport({ scale: 1.2 });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);

        renderTask = page.render({
          canvasContext: context,
          viewport,
        });

        if (renderTask) {
          await renderTask.promise;
        }
      } catch (err: unknown) {
        console.error("pdf.js render error:", err);
        setPdfJsError(
          "Rendering PDF gagal. Gunakan tombol 'Lihat PDF' atau unduh."
        );
      }
    };

    renderPdf();

    return () => {
      cancelled = true;
      renderTask?.cancel?.();
    };
  }, [previewBlob]);

  const isMobile =
    typeof navigator !== "undefined" &&
    /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);

  return (
    <div className="bg-card-bg rounded-xl p-6 border border-border">
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
                        bg-orange-500 text-white hover:bg-orange-600
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

      {isGenerating && (
        <p className="text-sm text-gray-500 mb-2">Membuat pratinjau PDF…</p>
      )}

      {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

      <div className="rounded-lg">
        {/* Frame */}
        <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm flex justify-center">
          <div className="w-full max-w-225">
            {previewBlob && !pdfJsError && (
              <canvas
                ref={canvasRef}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  opacity: isGenerating ? 0.6 : 1,
                }}
              />
            )}

            {pdfJsError && previewUrl && isMobile && (
              <div className="p-4 text-center">
                <Button
                  onClick={handleOpenFull}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                >
                  Lihat Preview
                </Button>
              </div>
            )}

            {!previewBlob && previewUrl && (
              <iframe
                src={previewUrl}
                title="Pratinjau PDF"
                className="w-full transition"
                style={{ height: "780px", opacity: isGenerating ? 0.6 : 1 }}
              />
            )}

            {!previewBlob && !previewUrl && (
              <div className="p-6 text-center text-sm text-slate-700">
                <p>Belum ada pratinjau tersedia.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
