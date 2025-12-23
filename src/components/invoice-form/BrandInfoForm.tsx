"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import LogoUpload from "./LogoUpload";

export default function BrandInfoForm() {
    const { data, updateField } = useInvoiceStore();

    return (
        <Card className="rounded-3xl space-y-6 bg-white w-full">
            <h3 className="text-xl md:text-2xl font-semibold text-slate-800">
                Informasi Brand
            </h3>

            {/* Logo Brand */}
            <div className="space-y-1">
                <label className="text-base font-medium">Logo Brand</label>
                <LogoUpload />
            </div>

            {/* Nama Brand */}
            <div className="space-y-1">
                <label className="text-base font-medium">Nama Brand</label>
                <Input
                    placeholder="Nama Brand"
                    value={data.brand.name}
                    onChange={(e) =>
                        updateField("brand", {
                            ...data.brand,
                            name: e.target.value,
                        })
                    }
                />
            </div>

            {/* Lokasi */}
            <div className="space-y-1">
                <label className="text-base font-medium">Lokasi</label>
                <Input
                    placeholder="Lokasi"
                    value={data.brand.location}
                    onChange={(e) =>
                        updateField("brand", {
                            ...data.brand,
                            location: e.target.value,
                        })
                    }
                />
            </div>

            {/* Sosial Media / Kontak */}
            <div className="space-y-1">
                <label className="text-base font-medium">
                    Sosial Media / Kontak
                </label>
                <Input
                    placeholder="Kontak atau media sosial"
                    value={data.brand.contact}
                    onChange={(e) =>
                        updateField("brand", {
                            ...data.brand,
                            contact: e.target.value,
                        })
                    }
                />
            </div>

            {/* Warna Brand */}
            <div className="space-y-1">
                <label className="text-base font-medium">Warna Brand</label>
                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        value={data.brand.color}
                        onChange={(e) =>
                            updateField("brand", {
                                ...data.brand,
                                color: e.target.value,
                            })
                        }
                        className="h-9 w-12 rounded border cursor-pointer"
                    />
                    <Input
                        value={data.brand.color}
                        onChange={(e) =>
                            updateField("brand", {
                                ...data.brand,
                                color: e.target.value,
                            })
                        }
                        placeholder="#000000"
                    />
                </div>
            </div>
        </Card>
    );
}
