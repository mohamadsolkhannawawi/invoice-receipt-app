"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

export default function ReceiptStyleB() {
    const { data } = useInvoiceStore();
    const result = calculateInvoiceTotal(data);

    return (
        <div className="bg-card-bg rounded-xl p-5 shadow-soft-md border border-border max-w-[380px] w-full">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">KUITANSI</h3>
                <div className="text-sm text-muted">
                    {data.issueDate.toLocaleDateString()}
                </div>
            </div>

            <div className="mt-4 space-y-2">
                {data.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                        <span>{item.description}</span>
                        <span>
                            {formatCurrency(item.quantity * item.unitPrice)}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-6 text-right font-bold text-2xl">
                {formatCurrency(result.total)}
            </div>
        </div>
    );
}
