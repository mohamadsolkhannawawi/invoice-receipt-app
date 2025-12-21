"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { calculateInvoiceTotal } from "@/lib/calculation";
import {
  formatCurrency,
  formatDate,
  hexToRgba,
  DEFAULT_BRAND_COLOR,
} from "@/lib/utils";
import { FileText } from "lucide-react";

export default function InvoiceStyleA() {
  const { data } = useInvoiceStore();
  const result = calculateInvoiceTotal(data);

  return (
    <div className="bg-white rounded-[22px] p-6 shadow-soft-md border border-border max-w-md w-full">
      {/* Small date top-left */}
      <div className="flex items-start justify-between">
        <div>
          {data.issueDate ? (
            <div className="text-sm text-muted mb-2">
              {formatDate(data.issueDate)}
            </div>
          ) : (
            <div className="h-4 mb-2" />
          )}

          <p
            className="text-2xl font-extrabold leading-tight"
            style={{ color: data.brand.color || undefined }}
          >
            {data.brand.name || ""}
          </p>

          <div className="text-sm text-muted mt-1">
            {data.brand.location && <div>{data.brand.location}</div>}
            {data.brand.contact && <div>{data.brand.contact}</div>}
          </div>
        </div>

        <div className="text-right">
          <div
            className="inline-flex items-center gap-3 text-white px-4 py-2 rounded-lg text-lg font-bold"
            style={{ backgroundColor: data.brand.color || DEFAULT_BRAND_COLOR }}
          >
            <FileText className="w-5 h-5 text-white" />
            <span>INVOICE</span>
          </div>

          <div className="mt-3 text-sm text-muted">
            {data.invoiceNumber ? `#${data.invoiceNumber}` : ""}
          </div>

          {data.dueDate ? (
            <div className="mt-3 text-sm text-muted">
              Jatuh Tempo:{formatDate(data.dueDate)}
            </div>
          ) : null}
        </div>
      </div>

      {/* Recipient */}
      <div className="mt-6">
        <div
          className="inline-block text-white px-4 py-3 rounded-lg text-sm font-bold"
          style={{ backgroundColor: data.brand.color || DEFAULT_BRAND_COLOR }}
        >
          Ditujukan Kepada :
        </div>
        <div
          className="mt-3 rounded-lg px-4 py-3 text-sm inline-block"
          style={{
            backgroundColor: hexToRgba(
              data.brand.color || DEFAULT_BRAND_COLOR,
              0.08
            ),
            border: `1px solid ${data.brand.color || DEFAULT_BRAND_COLOR}`,
            color: data.brand.color || DEFAULT_BRAND_COLOR,
          }}
        >
          {data.client.name || ""}
        </div>

        <div
          className="border-t mt-4 mb-4"
          style={{ borderColor: data.brand.color }}
        />
      </div>

      {/* Items table */}
      <table
        className="w-full mt-6 text-sm"
        style={{ borderCollapse: "separate" }}
      >
        <thead>
          <tr>
            <th
              className="p-3 font-semibold text-left"
              style={{
                backgroundColor: "#f5f5f5",
                color: "#111827",
                border: "1px solid #e5e7eb",
              }}
            >
              Deskripsi
            </th>
            <th
              className="p-3 font-semibold text-center"
              style={{
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
              className="p-3 font-semibold text-center"
              style={{
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
              className="p-3 font-semibold text-right"
              style={{
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
              <td
                className="p-3"
                style={{
                  border: "1px solid #e5e7eb",
                  borderLeft: "1px solid #e5e7eb",
                }}
              >
                {item.description}
              </td>
              <td
                className="p-3 text-center"
                style={{ border: "1px solid #e5e7eb" }}
              >
                {item.quantity}
              </td>
              <td
                className="p-3 text-center"
                style={{ border: "1px solid #e5e7eb" }}
              >
                {formatCurrency(item.unitPrice)}
              </td>
              <td
                className="p-3 text-right"
                style={{
                  border: "1px solid #e5e7eb",
                  borderRight: "1px solid #e5e7eb",
                }}
              >
                {formatCurrency(item.quantity * item.unitPrice)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      {data.items.length > 0 ? (
        <div className="mt-6">
          <div className="flex justify-between items-center text-sm py-1">
            <div className="text-sm font-medium">Subtotal</div>
            <div className="text-sm font-semibold">
              {formatCurrency(result.subtotal)}
            </div>
          </div>
          {data.discountValue > 0 ? (
            <div className="flex justify-between items-center text-sm py-1">
              <div className="text-sm font-medium">Diskon</div>
              <div className="text-sm font-semibold text-red-600">
                -{formatCurrency(result.discountAmount)}
              </div>
            </div>
          ) : null}
          <div className="flex justify-between items-center text-sm py-1">
            <div className="text-sm font-medium">Pajak {data.taxRate}%</div>
            <div className="text-sm font-semibold">
              {formatCurrency(result.taxAmount)}
            </div>
          </div>

          <div
            className="border-t mt-3 mb-3"
            style={{
              borderColor: data.brand.color,
            }}
          />

          <div
            className="mt-4 text-white px-6 py-4 rounded-lg flex items-center justify-between text-xl font-bold"
            style={{ backgroundColor: data.brand.color || DEFAULT_BRAND_COLOR }}
          >
            <div>Total</div>
            <div>{formatCurrency(result.total)}</div>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <div
            className="mt-4 text-white px-6 py-4 rounded-lg flex items-center justify-between text-xl font-bold"
            style={{ backgroundColor: data.brand.color || DEFAULT_BRAND_COLOR }}
          >
            <div>Total</div>
            <div>{""}</div>
          </div>
        </div>
      )}

      {/* Status */}
      {data.status && data.status !== "DRAFT" ? (
        <div className="mt-6 flex justify-center">
          <div
            className="text-white px-6 py-3 rounded-full font-bold text-lg"
            style={{ backgroundColor: data.brand.color || DEFAULT_BRAND_COLOR }}
          >
            {data.status === "PAID" ? "LUNAS" : "Belum Dibayar"}
          </div>
        </div>
      ) : null}

      {/* Notes */}
      {data.notes ? (
        <div className="mt-16">
          <div
            className="font-semibold"
            style={{ color: data.brand.color || undefined }}
          >
            Catatan :
          </div>
          <div className="mt-6 bg-gray-100 rounded-lg p-4 min-h-32">
            {data.notes}
          </div>
        </div>
      ) : null}

      <hr className="my-6 border-t" style={{ borderColor: data.brand.color }} />

      <div className="text-center text-muted">
        Terimakasih Atas Kerjasamanya
      </div>
    </div>
  );
}
