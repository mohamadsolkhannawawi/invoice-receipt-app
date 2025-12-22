"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import InvoiceStyleA from "./InvoiceStyleA";
import InvoiceStyleB from "./InvoiceStyleB";
import InvoiceStyleC from "./InvoiceStyleC";

export default function InvoicePreviewSwitcher({
  overrideData,
}: {
  overrideData?: import("@/lib/types").InvoiceData;
}) {
  const { data } = useInvoiceStore();
  const usedData = overrideData ?? data;

  switch (usedData.template) {
    case "STYLE_B":
      return <InvoiceStyleB overrideData={usedData} />;
    case "STYLE_C":
      return <InvoiceStyleC overrideData={usedData} />;
    default:
      return <InvoiceStyleA overrideData={usedData} />;
  }
}
