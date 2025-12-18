"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

export default function InvoiceStyleC() {
    const { data } = useInvoiceStore();
    const result = calculateInvoiceTotal(data);

    return (
        <div className="bg-card-bg rounded-xl p-5 shadow-soft-md border border-border max-w-[380px] w-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="uppercase tracking-widest">FAKTUR</h2>
                <Badge color={data.status === "PAID" ? "success" : "info"}>
                    {data.status === "PAID" ? "Lunas" : "Belum Dibayar"}
                </Badge>
            </div>

            <p className="text-sm">Jumlah item: {data.items.length}</p>

            <p className="mt-6 text-2xl font-bold">
                {formatCurrency(result.total)}
            </p>
        </div>
    );
}
