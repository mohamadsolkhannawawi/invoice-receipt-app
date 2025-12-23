"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function ClientInfoForm() {
    const { data, updateField } = useInvoiceStore();

    return (
        <Card className="rounded-3xl space-y-6 bg-white w-full">
            <h3 className="text-xl md:text-2xl font-semibold text-slate-800">
                Informasi Klien
            </h3>

            <div className="space-y-1">
                <label className="text-base font-medium">Nama Klien</label>
                <Input
                    placeholder="Nama Klien"
                    value={data.client.name}
                    onChange={(e) =>
                        updateField("client", {
                            ...data.client,
                            name: e.target.value,
                        })
                    }
                />
            </div>
        </Card>
    );
}
