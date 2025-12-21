"use client";

import { useState, useRef, useEffect } from "react";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency } from "@/lib/utils";
import Card from "@/components/ui/Card";
import { ChevronDown } from "lucide-react";
import NumberInput from "@/components/ui/NumberInput";

export default function CalculationForm() {
  const { data, updateField } = useInvoiceStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const result = calculateInvoiceTotal(data);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <Card className="rounded-3xl p-6 space-y-6 bg-white">
      <h3 className="text-2xl font-semibold text-slate-800">Perhitungan</h3>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          {/* Pajak */}
          <div className="space-y-1">
            <label className="text-slate-700 font-medium text-sm">
              Tarif Pajak (%)
            </label>
            <NumberInput
              min={0}
              value={data.taxRate}
              onChange={(value) => updateField("taxRate", value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-700 font-medium text-sm">
              Jenis Diskon
            </label>

            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-200
                  bg-gray-50
                  px-3
                  py-2
                  text-sm
                  text-left
                  text-slate-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary
                  flex
                  items-center
                  justify-between
                "
              >
                {data.discountType === "PERCENTAGE"
                  ? "Persentase (%)"
                  : "Nominal (Rp)"}

                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute z-20 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-md overflow-hidden">
                  <button
                    type="button"
                    onClick={() => {
                      updateField("discountType", "PERCENTAGE");
                      setOpen(false);
                    }}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100"
                  >
                    Persentase (%)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      updateField("discountType", "NOMINAL");
                      setOpen(false);
                    }}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100"
                  >
                    Nominal (Rp)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Nilai Diskon */}
        <div className="space-y-1">
          <label className="text-slate-700 font-medium text-sm">
            Nilai Diskon {data.discountType === "PERCENTAGE" ? "(%)" : "(Rp)"}
          </label>
          <NumberInput
            min={0}
            value={data.discountValue}
            onChange={(value) => updateField("discountValue", value)}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-300" />

      {/* Result */}
      <div className="space-y-2 text-sm text-slate-800">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Subtotal</span>
          <span className="text-sm font-semibold">
            {formatCurrency(result.subtotal)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Diskon</span>
          <span className="text-sm font-semibold text-red-600">
            -{formatCurrency(result.discountAmount)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Pajak ({data.taxRate}%)</span>
          <span className="text-sm font-semibold">
            {formatCurrency(result.taxAmount)}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-300" />

      {/* Total */}
      <div className="flex justify-between items-center">
        <span className="text-xl font-semibold text-slate-800">Total :</span>
        <span className="text-2xl font-bold text-blue-600">
          {formatCurrency(result.total)}
        </span>
      </div>
    </Card>
  );
}
