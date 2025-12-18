"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

export default function InvoiceStyleA() {
    const { data } = useInvoiceStore();
    const result = calculateInvoiceTotal(data);

    return (
        <div className="bg-card-bg rounded-xl p-5 shadow-soft-md border border-border max-w-[380px] w-full">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold">FAKTUR</h2>
                    <p className="font-semibold text-sm">{data.brand.name}</p>
                </div>
                <div>
                    <Badge color={data.status === "PAID" ? "success" : "info"}>
                        {data.status === "PAID" ? "Lunas" : "Belum Dibayar"}
                    </Badge>
                </div>
            </div>

            <table className="w-full mt-4 text-sm">
                <tbody>
                    {data.items.map((item, i) => (
                        <tr key={i} className="border-b border-gray-100">
                            <td className="p-2">{item.description}</td>
                            <td className="p-2 text-right">
                                {formatCurrency(item.quantity * item.unitPrice)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p className="text-right font-bold mt-4 text-2xl">
                {formatCurrency(result.total)}
            </p>
        </div>
    );
}
