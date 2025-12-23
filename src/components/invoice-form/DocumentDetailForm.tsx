"use client";

import { useRef } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { Calendar, Hash } from "lucide-react";
import { toInputDateValue, parseDateFromInput } from "@/lib/utils";

export default function DocumentDetailForm() {
    const { data, updateField } = useInvoiceStore();
    const issueRef = useRef<HTMLInputElement | null>(null);
    const dueRef = useRef<HTMLInputElement | null>(null);

    const onInvoiceNumberChange = (v: string) => {
        updateField("invoiceNumber", v);
    };

    const onIssueDateChange = (v: string) => {
        const d = parseDateFromInput(v) ?? new Date();
        updateField("issueDate", d);
    };

    const onDueDateChange = (v: string) => {
        const d = parseDateFromInput(v);
        updateField("dueDate", d);
    };

    const isInvoice = data.documentType === "INVOICE";

    const showInputPicker = (ref: HTMLInputElement | null) => {
        if (!ref) return;
        // some browsers support showPicker() — type-safe check
        const withPicker = ref as HTMLInputElement & {
            showPicker?: () => void;
        };
        if (typeof withPicker.showPicker === "function") {
            withPicker.showPicker();
            return;
        }
        ref.focus();
    };

    return (
        <Card className="rounded-3xl bg-white">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">
                {isInvoice ? "Detail Invoice" : "Detail Receipt"}
            </h3>

            <div className="space-y-4">
                <div className="space-y-1">
                    <label className="text-base font-medium">
                        {isInvoice ? "Nomor Invoice" : "Nomor Receipt"}
                    </label>
                    <div className="relative">
                        <Input
                            value={data.invoiceNumber}
                            onChange={(e) =>
                                onInvoiceNumberChange(e.target.value)
                            }
                            placeholder={isInvoice ? "INV-XXXX" : "RCP-XXXX"}
                        />
                        <Hash className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-base font-medium">
                        {isInvoice ? "Tanggal Invoice" : "Tanggal Pembayaran"}
                    </label>
                    <div className="relative">
                        <Input
                            ref={issueRef}
                            type="date"
                            value={toInputDateValue(data.issueDate)}
                            onChange={(e) => onIssueDateChange(e.target.value)}
                        />
                        <Calendar
                            role="button"
                            aria-label="Buka pemilih tanggal"
                            onClick={() => showInputPicker(issueRef.current)}
                            className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        />
                    </div>
                </div>

                {isInvoice && (
                    <div className="space-y-1">
                        <label className="text-base font-medium">
                            Tanggal Jatuh Tempo
                        </label>
                        <div className="relative">
                            <Input
                                ref={dueRef}
                                type="date"
                                value={toInputDateValue(data.dueDate)}
                                onChange={(e) =>
                                    onDueDateChange(e.target.value)
                                }
                            />
                            <Calendar
                                role="button"
                                aria-label="Buka pemilih tanggal"
                                onClick={() => showInputPicker(dueRef.current)}
                                className="w-5 h-5  absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                            />
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
}
