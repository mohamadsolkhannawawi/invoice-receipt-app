"use client";

import React, { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { fileToDataUrl } from "@/lib/utils";

const MAX_SIZE = 1 * 1024 * 1024; // 1MB

export default function LogoUpload() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { data, updateField } = useInvoiceStore();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setError("");
        inputRef.current?.click();
    };

    const onFile = async (file?: File | null) => {
        setError("");
        if (!file) return;
        // validate type
        if (!["image/png", "image/jpeg"].includes(file.type)) {
            setError("File tidak valid. Gunakan PNG atau JPG.");
            return;
        }
        if (file.size > MAX_SIZE) {
            setError("Ukuran file melebihi 1MB. Pilih file lebih kecil.");
            return;
        }

        try {
            setLoading(true);
            const dataUrl = await fileToDataUrl(file);
            // Save only the data URL (base64) into state
            updateField("brand", { ...data.brand, logo: dataUrl });
        } catch (e) {
            console.error(e);
            setError("Terjadi kesalahan saat membaca file.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">Logo Brand</label>

            <div className="flex items-center gap-3">
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                />

                <Button onClick={handleClick} variant="secondary">
                    {loading ? "Memproses..." : "Unggah Logo"}
                </Button>

                {data.brand.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={data.brand.logo}
                        alt="Logo"
                        className="w-12 h-12 object-contain"
                    />
                ) : (
                    <div className="text-sm text-muted">Tidak ada logo</div>
                )}
            </div>

            <p className="text-xs text-muted">
                Format PNG atau JPG, maksimal 1MB
            </p>

            {error && (
                <p className="text-sm text-red-600" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
