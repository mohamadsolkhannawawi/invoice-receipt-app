"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Calendar, FileText } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { hexToRgba, DEFAULT_BRAND_COLOR } from "@/lib/utils";

import { InvoiceData } from "@/lib/types";

export default function InvoiceStyleC({
  overrideData,
}: {
  overrideData?: InvoiceData;
}) {
  const { data: storeData } = useInvoiceStore();
  const data = overrideData ?? storeData;
  const result = calculateInvoiceTotal(data);

  return (
    <div className="bg-card-bg rounded-xl p-5 shadow-soft-md border border-border max-w-md w-full">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            {data.brand.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.brand.logo}
                alt="Logo"
                className="w-12 h-12 object-contain"
              />
            ) : null}

            <div>
              <p
                className="text-blue-600 font-bold text-lg"
                style={{ color: data.brand.color || undefined }}
              >
                {data.brand.name || "-"}
              </p>
              <div className="text-sm text-muted">
                {data.documentType} ·{" "}
                <span className="font-mono">
                  {data.invoiceNumber ? `#${data.invoiceNumber}` : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm text-muted flex items-center justify-end gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{data.issueDate ? formatDate(data.issueDate) : "-"}</span>
          </div>

          <div className="mt-1 text-sm text-muted">
            Jatuh Tempo: {data.dueDate ? formatDate(data.dueDate) : "-"}
          </div>

          <div className="mt-2 inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            <FileText className="w-4 h-4" />
            <span className="uppercase">{data.documentType}</span>
          </div>
        </div>
      </div>

      <div
        className="mt-4 rounded-lg px-3 py-3 text-sm inline-block"
        style={{
          backgroundColor: hexToRgba(
            data.brand.color || DEFAULT_BRAND_COLOR,
            0.08
          ),
          border: `1px solid ${data.brand.color || DEFAULT_BRAND_COLOR}`,
          color: data.brand.color || DEFAULT_BRAND_COLOR,
        }}
      >
        <div className="font-semibold">{data.client?.name || "-"}</div>
      </div>

      <div
        className="border-t mt-3 mb-3"
        style={{ borderColor: data.brand.color }}
      />

      <p className="text-sm mt-3">Jumlah item: {data.items.length}</p>

      <div className="mt-3 space-y-1 text-sm text-slate-800">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">Subtotal</div>
          <div className="text-sm font-semibold">
            {formatCurrency(result.subtotal)}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">Diskon</div>
          <div className="text-sm font-semibold text-red-600">
            -{formatCurrency(result.discountAmount)}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">Pajak {data.taxRate}%</div>
          <div className="text-sm font-semibold">
            {formatCurrency(result.taxAmount)}
          </div>
        </div>
      </div>

      <div
        className="border-t-2 mt-3 mb-3"
        style={{ borderColor: data.brand.color }}
      />

      <div className="mt-4 flex flex-col items-end">
        <div className="text-2xl font-bold">{formatCurrency(result.total)}</div>
        <div className="mt-2">
          <Badge color={data.status === "PAID" ? "success" : "muted"}>
            {data.status === "PAID" ? "LUNAS" : "Belum Dibayar"}
          </Badge>
        </div>
      </div>
    </div>
  );
}
