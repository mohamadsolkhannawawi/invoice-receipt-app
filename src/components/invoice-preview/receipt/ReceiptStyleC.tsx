"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Hash, Calendar } from "lucide-react";
import Badge from "@/components/ui/Badge";

export default function ReceiptStyleC() {
  const { data } = useInvoiceStore();
  const result = calculateInvoiceTotal(data);

  return (
    <div className="bg-card-bg rounded-xl p-5 shadow-soft-md border border-border max-w-md w-full">
      <div className="flex items-center justify-between mb-3">
        <Badge color="success">Lunas</Badge>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
        <div
          className="rounded-lg p-2 bg-white border shadow-sm flex items-center gap-2"
          style={{ borderColor: data.brand.color }}
        >
          <Hash className="w-5 h-5 text-slate-500" />
          <div>{data.invoiceNumber}</div>
        </div>
        <div
          className="rounded-lg p-2 bg-white border shadow-sm flex items-center gap-2"
          style={{ borderColor: data.brand.color }}
        >
          <Calendar className="w-5 h-5 text-slate-500" />
          <div>{formatDate(data.issueDate)}</div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm">Terbayar: {formatCurrency(result.total)}</p>
      </div>
    </div>
  );
}
