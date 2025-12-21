"use client";

import { useEffect } from "react";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useHydration } from "@/hooks/useHydration";
import ItemListForm from "@/components/invoice-form/ItemListForm";
import CalculationForm from "@/components/invoice-form/CalculationForm";
import TemplateSwitcher from "@/components/invoice-form/TemplateSwitcher";
import DocumentDetailForm from "@/components/invoice-form/DocumentDetailForm";
import BrandInfoForm from "@/components/invoice-form/BrandInfoForm";
import ClientInfoForm from "@/components/invoice-form/ClientInfoForm";
import NotesForm from "@/components/invoice-form/NotesForm";
import PaymentStatus from "@/components/invoice-form/PaymentStatus";
import PdfPreview from "@/components/invoice-preview/PdfPreview";
import ResetButton from "@/components/invoice-form/ResetButton";

export default function InvoicePage() {
  const hydrated = useHydration();
  const { hasHydrated } = useInvoiceStore();

  useEffect(() => {
    if (!hydrated) return;
    if (!hasHydrated) return;

    const s = useInvoiceStore.getState().data;

    const isEmpty =
      s.items.length === 0 &&
      (!s.brand || !s.brand.name) &&
      (!s.client || !s.client.name);

    if (isEmpty) {
      useInvoiceStore.getState().initialize("INVOICE", { reset: true });
      return;
    }

    if (s.documentType !== "INVOICE") {
      useInvoiceStore.getState().setDocumentType("INVOICE");
    }
  }, [hydrated, hasHydrated]);

  if (!hydrated || !hasHydrated) return null;

  return (
    <main className="py-8 bg-page-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Buat Invoice</h1>
            <p className="text-sm text-muted">
              Isi detailnya untuk membuat invoice profesional Anda
            </p>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6 space-y-4 pr-2">
            <DocumentDetailForm />
            <BrandInfoForm />
            <ClientInfoForm />
            <ItemListForm />
            <CalculationForm />
            <PaymentStatus />
            <NotesForm />

            <div className="flex gap-3 mt-4">
              <ResetButton />
            </div>
          </div>

          <aside className="lg:col-span-6">
            <div className="sticky top-20">
              <div className="mb-4">
                <TemplateSwitcher />
              </div>

              <div className="mt-4">
                <PdfPreview />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
