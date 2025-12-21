"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { fileToDataUrl } from "@/lib/utils";
import { Upload, Trash2 } from "lucide-react";

const MAX_SIZE = 1 * 1024 * 1024;

export default function LogoUpload() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { data, updateField } = useInvoiceStore();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onFile = async (file?: File | null) => {
    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      setError("Gunakan PNG atau JPG");
      return;
    }

    if (file.size > MAX_SIZE) {
      setError("Maksimal 1MB");
      return;
    }

    setError("");
    setLoading(true);
    const dataUrl = await fileToDataUrl(file);
    updateField("brand", { ...data.brand, logo: dataUrl });
    setLoading(false);
  };

  const removeLogo = () => {
    updateField("brand", { ...data.brand, logo: "" });
  };

  const hasLogo = Boolean(data.brand.logo);

  return (
    <div className={hasLogo ? "flex items-center gap-3" : "space-y-2"}>
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0])}
      />

      {/* Upload Button */}
      <Button
        variant="secondary"
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2 text-sm px-3 py-1.5"
      >
        <Upload className="w-3 h-3" />
        {loading ? "Uploading..." : "Upload Logo"}
      </Button>

      {/* Logo Preview + Remove */}
      {hasLogo && (
        <div className="relative">
          <Image
            src={data.brand.logo!}
            alt="Logo"
            width={48}
            height={48}
            unoptimized
            className="rounded border object-contain"
          />

          <button
            type="button"
            onClick={removeLogo}
            className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
            title="Hapus logo"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
