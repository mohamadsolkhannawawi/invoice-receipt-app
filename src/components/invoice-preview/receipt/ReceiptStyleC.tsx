"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency } from "@/lib/utils";

export default function ReceiptStyleC() {
    const { data } = useInvoiceStore();
    const result = calculateInvoiceTotal(data);

    return (
        <div className="bg-card-bg rounded-xl p-5 shadow-soft-md border border-border max-w-[380px] w-full">
            <h4 className="uppercase tracking-wide">KUITANSI</h4>
            <div className="mt-4">
                <p className="text-sm">
                    Terbayar: {formatCurrency(result.total)}
                </p>
            </div>
        </div>
    );
}
