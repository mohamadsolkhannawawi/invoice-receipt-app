"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function PaymentStatus() {
  const { data, updateField, setDocumentType } = useInvoiceStore();

  const isPaid = data.status === "PAID";

  const handleSetPaid = () => {
    updateField("status", "PAID");
    setDocumentType("RECEIPT");
  };

  const handleSetUnpaid = () => {
    updateField("status", "PENDING");
    setDocumentType("INVOICE");
  };

  return (
    <Card className="rounded-3xl p-6 space-y-6 bg-white">
      <h3 className="text-2xl font-semibold text-slate-800">
        Status Pembayaran
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleSetUnpaid}
          className={`
            rounded-2xl
            border
            px-6
            py-4
            text-lg
            font-semibold
            transition
            ${
              !isPaid
                ? "border-orange-400 bg-orange-100 text-orange-600"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            }
          `}
        >
          Belum Dibayar
        </button>

        <button
          onClick={handleSetPaid}
          className={`
            rounded-2xl
            border
            px-6
            py-4
            text-lg
            font-semibold
            transition
            ${
              isPaid
                ? "border-green-400 bg-green-100 text-green-600"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            }
          `}
        >
          Lunas
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-200" />

      {/* Convert Btn */}
      <div className="space-y-2">
        <Button
          disabled={!isPaid}
          onClick={() => setDocumentType("RECEIPT")}
          className={`
            w-full
            rounded-2xl
            py-4
            text-lg
            font-semibold
            ${
              isPaid
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }
          `}
        >
          Konversi Ke Receipt
        </Button>

        <p className="text-center text-sm text-slate-500">
          Generate Receipt Dari Data Invoice Ini
        </p>
      </div>
    </Card>
  );
}
