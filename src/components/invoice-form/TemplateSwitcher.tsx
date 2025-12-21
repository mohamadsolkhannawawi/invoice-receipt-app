"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import TemplateCard from "@/components/ui/TemplateCard";

const templates = [
  { key: "STYLE_A", label: "Modern" },
  { key: "STYLE_B", label: "Klasik" },
  { key: "STYLE_C", label: "Minimal" },
] as const;

export default function TemplateSwitcher() {
  const { data, updateField } = useInvoiceStore();

  return (
    <div className="w-full rounded-3xl bg-white p-6 shadow-md space-y-6">
      <h3 className="text-2xl font-bold text-slate-800">Pilih Template</h3>

      <div className="grid grid-cols-3 gap-6">
        {templates.map((tpl) => (
          <TemplateCard
            key={tpl.key}
            title={tpl.label}
            active={data.template === tpl.key}
            onClick={() => updateField("template", tpl.key)}
          />
        ))}
      </div>
    </div>
  );
}
