"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import InvoiceStyleA from "@/components/invoice-preview/invoice/InvoiceStyleA";
import InvoiceStyleB from "@/components/invoice-preview/invoice/InvoiceStyleB";
import InvoiceStyleC from "@/components/invoice-preview/invoice/InvoiceStyleC";
import { InvoiceData } from "@/lib/types";

export default function ReceiptPreviewSwitcher() {
  const { data } = useInvoiceStore();

  // force RECEIPT semantics for preview: documentType -> RECEIPT, status -> PAID
  const overrideData: InvoiceData = {
    ...data,
    documentType: "RECEIPT",
    status: "PAID",
  } as InvoiceData;

  switch (overrideData.template) {
    case "STYLE_B":
      return <InvoiceStyleB overrideData={overrideData} />;
    case "STYLE_C":
      return <InvoiceStyleC overrideData={overrideData} />;
    default:
      return <InvoiceStyleA overrideData={overrideData} />;
  }
}
