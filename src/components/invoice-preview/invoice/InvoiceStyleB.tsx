"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { FileText } from "lucide-react";
import { DEFAULT_BRAND_COLOR } from "@/lib/utils";

export default function InvoiceStyleB() {
  const { data } = useInvoiceStore();
  const result = calculateInvoiceTotal(data);
  const brandColor = data.brand.color || DEFAULT_BRAND_COLOR;

  return (
    <div className="bg-white rounded-[22px] p-6 shadow-soft-md border border-border max-w-md w-full">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <div className="flex flex-col items-center">
          {data.brand.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.brand.logo}
              alt="Logo"
              className="w-14 h-14 object-contain mb-2"
            />
          ) : null}

          <p className="text-2xl font-extrabold" style={{ color: brandColor }}>
            {data.brand.name}
          </p>
        </div>
        {data.brand.location && (
          <div className="text-sm text-muted mt-1">{data.brand.location}</div>
        )}
        {data.brand.contact && (
          <div className="text-sm text-muted mt-1">{data.brand.contact}</div>
        )}
      </div>

      {/* Top divider (brand color) */}
      <div
        style={{
          height: 4,
          backgroundColor: brandColor,
          borderRadius: 2,
          marginTop: 8,
        }}
      />

      {/* Invoice badge */}
      <div className="flex justify-center mt-4">
        <div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-md border"
          style={{ borderColor: brandColor, borderWidth: 2 }}
        >
          <FileText className="w-5 h-5" />
          <span className="text-xl font-bold" style={{ color: brandColor }}>
            INVOICE
          </span>
        </div>
      </div>

      {/* Document details */}
      <div className="mt-4">
        <div
          className="flex justify-between items-center py-3"
          style={{ borderBottom: "1px solid " + brandColor }}
        >
          <div className="text-xs text-muted">Nomor Invoice</div>
          <div className="font-medium text-sm">#{data.invoiceNumber}</div>
        </div>
        <div
          className="flex justify-between items-center py-3"
          style={{ borderBottom: "1px solid " + brandColor }}
        >
          <div className="text-xs text-muted">Tanggal Dibuat</div>
          <div className="text-sm">{formatDate(data.issueDate)}</div>
        </div>
        <div
          className="flex justify-between items-center py-3"
          style={{ borderBottom: "1px solid " + brandColor }}
        >
          <div className="text-xs text-muted">Jatuh Tempo</div>
          <div className="text-sm">
            {data.dueDate ? formatDate(data.dueDate) : "-"}
          </div>
        </div>
      </div>

      {/* Recipient */}
      <div className="flex justify-center mt-4">
        <div
          className="inline-block border rounded-md px-6 py-3"
          style={{ borderColor: brandColor }}
        >
          <div className="text-sm font-bold" style={{ color: brandColor }}>
            Ditujukan Kepada :
          </div>
          <div className="text-sm mt-2" style={{ color: brandColor }}>
            {data.client?.name || "-"}
          </div>
        </div>
      </div>

      {/* Items table */}
      <div className="mt-6">
        <table
          className="w-full text-sm"
          style={{ borderCollapse: "separate" }}
        >
          <thead>
            <tr>
              <th
                className="p-3 text-left"
                style={{
                  width: "55%",
                  backgroundColor: "#f5f5f5",
                  color: "#111827",
                  border: "1px solid #e5e7eb",
                }}
              >
                Deskripsi
              </th>
              <th
                className="p-3 text-center"
                style={{
                  width: "10%",
                  backgroundColor: "#f5f5f5",
                  color: "#111827",
                  borderTop: "1px solid #e5e7eb",
                  borderBottom: "1px solid #e5e7eb",
                  borderLeft: "none",
                  borderRight: "1px solid #e5e7eb",
                }}
              >
                Jumlah
              </th>
              <th
                className="p-3 text-right"
                style={{
                  width: "17%",
                  backgroundColor: "#f5f5f5",
                  color: "#111827",
                  borderTop: "1px solid #e5e7eb",
                  borderBottom: "1px solid #e5e7eb",
                  borderLeft: "none",
                  borderRight: "1px solid #e5e7eb",
                }}
              >
                Harga
              </th>
              <th
                className="p-3 text-right"
                style={{
                  width: "18%",
                  backgroundColor: "#f5f5f5",
                  color: "#111827",
                  border: "1px solid #e5e7eb",
                }}
              >
                Nominal
              </th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, i) => (
              <tr
                key={i}
                style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fbfbfb" }}
              >
                <td className="p-3" style={{ border: "1px solid #e5e7eb" }}>
                  {item.description}
                </td>
                <td
                  className="p-3 text-center"
                  style={{ border: "1px solid #e5e7eb" }}
                >
                  {String(item.quantity)}
                </td>
                <td
                  className="p-3 text-right"
                  style={{ border: "1px solid #e5e7eb" }}
                >
                  {formatCurrency(item.unitPrice)}
                </td>
                <td
                  className="p-3 text-right"
                  style={{ border: "1px solid #e5e7eb" }}
                >
                  {formatCurrency(item.quantity * item.unitPrice)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="mt-3 space-y-1 text-sm text-slate-800">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">Subtotal</div>
            <div className="text-sm font-semibold">
              {formatCurrency(result.subtotal)}
            </div>
          </div>

          {data.discountValue > 0 && (
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium text-red-600">Diskon</div>
              <div className="text-sm font-semibold text-red-600">
                -{formatCurrency(result.discountAmount)}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">Pajak {data.taxRate}%</div>
            <div className="text-sm font-semibold">
              {formatCurrency(result.taxAmount)}
            </div>
          </div>

          <div
            className="border-t mt-3 mb-3"
            style={{ borderColor: brandColor }}
          />

          <div
            className="border rounded-md p-4"
            style={{ borderColor: brandColor }}
          >
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold" style={{ color: brandColor }}>
                Total
              </div>
              <div
                className="text-2xl font-extrabold"
                style={{ color: brandColor }}
              >
                {formatCurrency(result.total)}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <div
              className="inline-block border rounded-md px-8 py-4"
              style={{ borderColor: brandColor, borderWidth: 2 }}
            >
              <div className="text-xl font-bold" style={{ color: brandColor }}>
                {data.status === "PAID" ? "LUNAS" : "Belum Dibayar"}
              </div>
            </div>
          </div>

          {data.notes && (
            <div className="mt-6">
              <div className="text-sm font-bold" style={{ color: brandColor }}>
                CATATAN
              </div>
              <div className="mt-2 bg-gray-100 p-3 rounded-md text-sm text-slate-700">
                {data.notes}
              </div>
            </div>
          )}
        </div>
      </div>

      <hr className="my-6 border-t" style={{ borderColor: brandColor }} />

      <div className="text-center text-muted">
        Terimakasih Atas Kerjasamanya
      </div>
    </div>
  );
}
