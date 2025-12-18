"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency } from "@/lib/utils";

export default function CalculationForm() {
    const { data, updateField } = useInvoiceStore();

    const result = calculateInvoiceTotal(data);

    return (
        <div className="space-y-2">
            <h3 className="font-bold">Calculation</h3>

            <div className="flex gap-2">
                <input
                    type="number"
                    placeholder="Tax %"
                    value={data.taxRate}
                    onChange={(e) =>
                        updateField("taxRate", Number(e.target.value))
                    }
                    className="border p-2 w-24"
                />

                <select
                    value={data.discountType}
                    onChange={(e) =>
                        updateField(
                            "discountType",
                            e.target.value as "PERCENTAGE" | "NOMINAL"
                        )
                    }
                    className="border p-2"
                >
                    <option value="PERCENTAGE">%</option>
                    <option value="NOMINAL">Rp</option>
                </select>

                <input
                    type="number"
                    placeholder="Discount"
                    value={data.discountValue}
                    onChange={(e) =>
                        updateField("discountValue", Number(e.target.value))
                    }
                    className="border p-2 w-32"
                />
            </div>

            <div className="mt-4 space-y-1 text-sm">
                <p>Subtotal: {formatCurrency(result.subtotal)}</p>
                <p>Discount: -{formatCurrency(result.discountAmount)}</p>
                <p>Tax: {formatCurrency(result.taxAmount)}</p>
                <p className="font-bold">
                    Total: {formatCurrency(result.total)}
                </p>
            </div>
        </div>
    );
}
