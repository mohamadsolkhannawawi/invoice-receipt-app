"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency, formatDate, DEFAULT_BRAND_COLOR } from "@/lib/utils";
import { FileText } from "lucide-react";

export default function HtmlPreview() {
  const { data } = useInvoiceStore();
  const result = calculateInvoiceTotal(data);

  const title = data.documentType === "INVOICE" ? "FAKTUR" : "KUITANSI";

  console.debug(
    "HtmlPreview - issueDate:",
    data.issueDate,
    "dueDate:",
    data.dueDate,
    "issueDateType:",
    typeof data.issueDate,
    "isDate:",
    data.issueDate instanceof Date
  );

  return (
    <div className="bg-card-bg rounded-xl p-5 shadow-soft-md border border-border max-w-md w-full">
      <h2 className="text-lg font-bold mb-3">{title}</h2>

      {data.template === "STYLE_A" ? (
        <div className="text-sm text-muted mb-3">
          {data.issueDate ? formatDate(data.issueDate) : ""}
        </div>
      ) : null}

      <div className="mb-3 flex items-start justify-between gap-3">
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
              className="text-xl font-extrabold"
              style={{ color: data.brand.color || undefined }}
            >
              {data.brand.name || ""}
            </p>
            <p className="text-sm text-muted">{data.brand.location}</p>
            {data.brand.contact && (
              <p className="text-sm text-muted">{data.brand.contact}</p>
            )}
          </div>
        </div>

        <div className="text-right">
          <div
            style={{
              backgroundColor: data.brand.color || DEFAULT_BRAND_COLOR,
              color: "#fff",
              borderRadius: 12,
              padding: "8px 14px",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <FileText className="w-4 h-4" />
            <strong>{data.documentType}</strong>
          </div>

          <div className="mt-3 text-sm">
            {data.invoiceNumber ? `#${data.invoiceNumber}` : ""}
          </div>
          {data.dueDate ? (
            <div className="mt-2 text-sm">
              Jatuh Tempo :{formatDate(data.dueDate)}
            </div>
          ) : null}
        </div>
      </div>

      {/* recipient */}
      <div
        className="rounded-lg px-4 py-3 text-sm inline-block"
        style={{ backgroundColor: data.brand.color, color: "#fff" }}
      >
        <p className="font-bold">Ditujukan Kepada :</p>
        <p className="mt-2">{data.client.name || ""}</p>
      </div>

      <div
        className="border-t mt-4 mb-4"
        style={{ borderColor: data.brand.color }}
      />

      <table
        className="w-full text-sm mb-3"
        style={{ borderCollapse: "separate" }}
      >
        <thead>
          <tr>
            <th
              className="text-left p-2"
              style={{
                backgroundColor: "#f5f5f5",
                color: "#111827",
                padding: "10px",
                border: "1px solid #e5e7eb",
              }}
            >
              Deskripsi
            </th>
            <th
              className="p-2"
              style={{
                backgroundColor: "#f5f5f5",
                color: "#111827",
                padding: "10px",
                borderTop: "1px solid #e5e7eb",
                borderBottom: "1px solid #e5e7eb",
                borderLeft: "none",
                borderRight: "1px solid #e5e7eb",
              }}
            >
              Jumlah
            </th>
            <th
              className="p-2"
              style={{
                backgroundColor: "#f5f5f5",
                color: "#111827",
                padding: "10px",
                borderTop: "1px solid #e5e7eb",
                borderBottom: "1px solid #e5e7eb",
                borderLeft: "none",
                borderRight: "1px solid #e5e7eb",
              }}
            >
              Harga
            </th>
            <th
              className="p-2"
              style={{
                backgroundColor: "#f5f5f5",
                color: "#111827",
                padding: "10px",
                border: "1px solid #e5e7eb",
              }}
            >
              Nominal
            </th>
          </tr>
        </thead>
        <tbody>
          {data.items.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4 text-gray-400">
                Belum ada item
              </td>
            </tr>
          ) : (
            data.items.map((item, i) => (
              <tr
                key={i}
                style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fbfbfb" }}
              >
                <td className="p-2" style={{ border: "1px solid #e5e7eb" }}>
                  {item.description}
                </td>
                <td
                  className="p-2 text-center"
                  style={{ border: "1px solid #e5e7eb" }}
                >
                  {item.quantity}
                </td>
                <td
                  className="p-2 text-right"
                  style={{ border: "1px solid #e5e7eb" }}
                >
                  {formatCurrency(item.unitPrice)}
                </td>
                <td
                  className="p-2 text-right"
                  style={{ border: "1px solid #e5e7eb" }}
                >
                  {formatCurrency(item.quantity * item.unitPrice)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="mt-3">
        <div
          className="rounded-lg p-3"
          style={{
            backgroundColor: data.brand.color,
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 800 }}>Total</div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>
            {data.items.length > 0 ? formatCurrency(result.total) : ""}
          </div>
        </div>

        {data.status && data.status !== "DRAFT" ? (
          <div className="mt-6 flex justify-center">
            <div
              className="rounded-lg px-8 py-3"
              style={{
                backgroundColor: data.brand.color,
                color: "#fff",
                fontWeight: 700,
              }}
            >
              {data.status === "PAID" ? "Lunas" : "Belum Dibayar"}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
