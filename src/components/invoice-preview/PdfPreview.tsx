"use client";

import { useEffect, useState, useRef } from "react";
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

            // On mobile-capable browsers try native share first
            const isMobile =
                typeof navigator !== "undefined" &&
                /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(
                    navigator.userAgent
                );

            if (isMobile && (navigator as any).share) {
                try {
                    const resp = await fetch(previewUrl);
                    const blob = await resp.blob();
                    const file = new File([blob], filename, {
                        type: "application/pdf",
                    });
                    // @ts-ignore - Web Share files may not exist in all TS DOM libs
                    await (navigator as any).share({
                        files: [file],
                        title: filename,
                    });
                    setSuccess(true);
                    setTimeout(() => setSuccess(false), 2500);
                    return;
                } catch (err) {
                    // fallthrough to download link fallback
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
        } catch (err) {
            // ignore
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

    // Render PDF Blob to canvas using pdf.js (dynamic import)
    useEffect(() => {
        if (!previewBlob) return;

        let cancelled = false;
        let renderTask: any = null;

        const renderPdf = async () => {
            setPdfJsError(null);
            try {
                // dynamic import of pdf.js (legacy build for browser)
                // @ts-ignore - runtime-only import; types provided in src/types/pdfjs.d.ts
                const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf");

                // Use local worker served from /public for same-origin fetch
                // prefer .mjs worker provided by pdfjs-dist package
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

                const arrayBuffer = await previewBlob.arrayBuffer();
                const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
                const pdfDoc = await loadingTask.promise;
                if (cancelled) return;

                const page = await pdfDoc.getPage(1);
                if (cancelled) return;

                const scale = 1.2;
                const viewport = page.getViewport({ scale });

                const canvas = canvasRef.current;
                if (!canvas) return;

                const context = canvas.getContext("2d");
                canvas.width = Math.floor(viewport.width);
                canvas.height = Math.floor(viewport.height);

                const renderContext = {
                    canvasContext: context,
                    viewport,
                };

                renderTask = page.render(renderContext);
                await renderTask.promise;
            } catch (err: any) {
                console.error("pdf.js render error:", err);
                setPdfJsError(
                    "Rendering PDF gagal. Gunakan tombol 'Lihat PDF' atau unduh."
                );
            }
        };

        renderPdf();

        return () => {
            cancelled = true;
            if (renderTask && renderTask.cancel) renderTask.cancel();
        };
    }, [previewBlob]);

    const isMobile =
        typeof navigator !== "undefined" &&
        /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(
            navigator.userAgent
        );

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
                    {/* header 'Lihat PDF' removed for cleaner UI on mobile */}

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
                <p className="text-sm text-gray-500 mb-2">
                    Membuat pratinjau PDF…
                </p>
            )}

            {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

            {/* Preview */}
            <div className="rounded-lg overflow-hidden">
                {previewBlob && !pdfJsError && (
                    <div
                        className="w-full transition"
                        style={{ opacity: isGenerating ? 0.6 : 1 }}
                    >
                        <canvas
                            ref={canvasRef}
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                            }}
                        />
                    </div>
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
                    // fallback: iframe when blob is not available (should be rare)
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

                {!previewBlob && !previewUrl && (
                    <div className="p-6 text-center text-sm text-slate-700">
                        <p>Belum ada pratinjau tersedia.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
