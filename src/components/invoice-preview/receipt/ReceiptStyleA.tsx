"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency, formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import { Hash, Calendar } from "lucide-react";

export default function ReceiptStyleA() {
  const { data } = useInvoiceStore();
  const result = calculateInvoiceTotal(data);

  return (
    <div className="bg-card-bg rounded-xl p-5 shadow-soft-md border border-border max-w-md w-full">
      <div className="flex items-center justify-between">
        <Badge color="success">Lunas</Badge>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
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

      <div className="mt-4 space-y-2">
        {data.items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span>{item.description}</span>
            <span>{formatCurrency(item.quantity * item.unitPrice)}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 font-bold text-right text-2xl">
        {formatCurrency(result.total)}
      </div>
    </div>
  );
}
