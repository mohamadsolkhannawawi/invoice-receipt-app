"use client";

import { useState, useEffect } from "react";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Plus, Trash2 } from "lucide-react";
import NumberInput from "@/components/ui/NumberInput";

type Row = {
  description: string;
  quantity: number;
  unitPrice: number;
  saved?: boolean;
};

export default function ItemListForm() {
  const { addItem, removeItem, updateItem, data, hasHydrated } =
    useInvoiceStore();

  const [rows, setRows] = useState<Row[]>([
    { description: "", quantity: 1, unitPrice: 0, saved: false },
  ]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hasHydrated) return;

    const savedRows: Row[] = data.items.map((it) => ({
      description: it.description,
      quantity: it.quantity,
      unitPrice: it.unitPrice,
      saved: true,
    }));

    const timer = setTimeout(() => {
      if (savedRows.length === 0) {
        setRows([{ description: "", quantity: 1, unitPrice: 0, saved: false }]);
        setError(null);
        return;
      }

      setRows((prevRows) => {
        const currentSavedCount = prevRows.filter((r) => r.saved).length;
        if (currentSavedCount === savedRows.length) return prevRows;
        return [
          ...savedRows,
          { description: "", quantity: 1, unitPrice: 0, saved: false },
        ];
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [data.items, hasHydrated]);

  const updateRow = (
    index: number,
    field: keyof Row,
    value: string | number
  ) => {
    const updated = [...rows];
    updated[index] = { ...updated[index], [field]: value };
    setRows(updated);

    if (field === "description" && typeof value === "string" && value.trim()) {
      setError(null);
    }

    const row = updated[index];
    if (row && row.saved) {
      updateItem(index, {
        description: row.description,
        quantity: row.quantity,
        unitPrice: row.unitPrice,
      });
    }
  };

  const addNewRow = () => {
    const lastRow = rows[rows.length - 1];

    if (!lastRow.description.trim()) {
      setError("Silakan isi deskripsi produk terlebih dahulu.");
      return;
    }

    addItem({
      description: lastRow.description,
      quantity: lastRow.quantity,
      unitPrice: lastRow.unitPrice,
    });

    const updated = [...rows];
    updated[rows.length - 1].saved = true;

    setRows([
      ...updated,
      { description: "", quantity: 1, unitPrice: 0, saved: false },
    ]);

    setError(null);
  };

  const removeRow = (index: number) => {
    const row = rows[index];
    if (rows.length === 1) return;

    if (row.saved) {
      removeItem(index);
    }

    setRows(rows.filter((_, i) => i !== index));
  };

  return (
    <Card className="space-y-6 rounded-2xl p-6 shadow-md bg-white">
      <h3 className="text-xl font-semibold text-slate-800">Barang</h3>

      {error && (
        <div
          role="alert"
          aria-live="polite"
          className="text-sm text-red-600 bg-red-50 border border-red-100 p-3 rounded"
        >
          {error}
        </div>
      )}

      {/* Header (DESKTOP ONLY) */}
      <div className="hidden md:grid grid-cols-12 gap-3 text-sm font-medium text-slate-600">
        <div className="col-span-6">Deskripsi</div>
        <div className="col-span-2 text-center">Jumlah</div>
        <div className="col-span-3 text-center">Harga</div>
        <div className="col-span-1"></div>
      </div>

      {/* FORM ROWS */}
      {rows.map((row, index) => {
        const disableDelete = rows.length === 1 || !row.description.trim();

        return (
          <div
            key={index}
            className="
              grid grid-cols-1 gap-3
              md:grid-cols-12 md:items-center
            "
          >
            {/* Deskripsi */}
            <div className="md:col-span-6">
              <Input
                placeholder="Produk / Layanan"
                value={row.description}
                onChange={(e) =>
                  updateRow(index, "description", e.target.value)
                }
              />
            </div>

            {/* Jumlah */}
            <div className="md:col-span-2">
              <NumberInput
                min={1}
                value={row.quantity}
                onChange={(value) => updateRow(index, "quantity", value)}
              />
            </div>

            {/* Harga */}
            <div className="md:col-span-3">
              <NumberInput
                min={0}
                value={row.unitPrice}
                onChange={(value) => updateRow(index, "unitPrice", value)}
              />
            </div>

            {/* Hapus */}
            <div className="md:col-span-1 flex justify-end md:justify-center">
              <button
                type="button"
                onClick={() => removeRow(index)}
                disabled={disableDelete}
                className={`transition ${
                  disableDelete
                    ? "text-red-300 opacity-40 cursor-not-allowed"
                    : "text-red-500 hover:text-red-600"
                }`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        );
      })}

      <Button
        type="button"
        onClick={addNewRow}
        className="w-fit flex items-center gap-2 rounded-full px-6
                   bg-slate-800 text-white hover:bg-slate-900"
      >
        <Plus size={18} />
        Tambah Data
      </Button>
    </Card>
  );
}
