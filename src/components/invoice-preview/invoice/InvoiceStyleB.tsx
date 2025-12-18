"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

export default function InvoiceStyleB() {
    const { data } = useInvoiceStore();
    const result = calculateInvoiceTotal(data);

    return (
        <div className="bg-card-bg rounded-xl p-5 shadow-soft-md border border-border max-w-[380px] w-full">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-lg font-semibold">FAKTUR</h2>
                    <div className="text-sm text-muted">
                        {data.invoiceNumber}
                    </div>
                </div>
                <Badge color={data.status === "PAID" ? "success" : "info"}>
                    {data.status === "PAID" ? "Lunas" : "Belum Dibayar"}
                </Badge>
            </div>

            <div className="space-y-2">
                {data.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                        <span>{item.description}</span>
                        <span>
                            {formatCurrency(item.quantity * item.unitPrice)}
                        </span>
                    </div>
                ))}
            </div>

            <p className="text-right text-2xl font-bold mt-6">
                {formatCurrency(result.total)}
            </p>
        </div>
    );
}
