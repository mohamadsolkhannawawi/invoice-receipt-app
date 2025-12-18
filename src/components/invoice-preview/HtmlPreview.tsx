"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency } from "@/lib/utils";

export default function HtmlPreview() {
    const { data } = useInvoiceStore();
    const result = calculateInvoiceTotal(data);

    const title = data.documentType === "INVOICE" ? "FAKTUR" : "KUITANSI";

    return (
        <div className="bg-card-bg rounded-xl p-5 shadow-soft-md border border-border max-w-[380px] w-full">
            <h2 className="text-lg font-bold mb-3">{title}</h2>

            <div className="mb-3 flex items-center gap-3">
                {data.brand.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={data.brand.logo}
                        alt="Logo"
                        className="w-12 h-12 object-contain"
                    />
                ) : (
                    <div className="w-12 h-12" />
                )}

                <div>
                    <p className="font-semibold">
                        {data.brand.name || "Nama Brand"}
                    </p>
                    <p className="text-sm text-muted">{data.brand.location}</p>
                </div>
            </div>

            <div className="mb-3">
                <p className="font-semibold">Ditujukan Kepada</p>
                <p>{data.client.name || "Nama Klien"}</p>
            </div>

            <table className="w-full text-sm mb-3">
                <thead>
                    <tr className="border-b bg-gray-50">
                        <th className="text-left p-2">Deskripsi</th>
                        <th className="p-2">Jumlah</th>
                        <th className="p-2">Harga</th>
                        <th className="p-2">Nominal</th>
                    </tr>
                </thead>
                <tbody>
                    {data.items.length === 0 ? (
                        <tr>
                            <td
                                colSpan={4}
                                className="text-center p-4 text-gray-400"
                            >
                                Belum ada item
                            </td>
                        </tr>
                    ) : (
                        data.items.map((item, i) => (
                            <tr key={i} className="border-b">
                                <td className="p-2">{item.description}</td>
                                <td className="p-2 text-center">
                                    {item.quantity}
                                </td>
                                <td className="p-2 text-right">
                                    {formatCurrency(item.unitPrice)}
                                </td>
                                <td className="p-2 text-right">
                                    {formatCurrency(
                                        item.quantity * item.unitPrice
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="text-right space-y-1">
                <p>Subtotal: {formatCurrency(result.subtotal)}</p>
                <p>Diskon: -{formatCurrency(result.discountAmount)}</p>
                <p>Pajak: {formatCurrency(result.taxAmount)}</p>
                <p className="font-bold text-lg">
                    Total: {formatCurrency(result.total)}
                </p>
            </div>
        </div>
    );
}
