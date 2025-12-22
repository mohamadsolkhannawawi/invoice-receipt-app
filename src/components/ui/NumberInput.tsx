"use client";
import { ChevronUp, ChevronDown } from "lucide-react";

type NumberInputProps = {
  value: number;
  min?: number;
  onChange: (value: number) => void;
  className?: string;
};

export default function NumberInput({
  value,
  min = -Infinity,
  onChange,
  className,
}: NumberInputProps) {
  const increase = () => onChange(value + 1);
  const decrease = () => onChange(Math.max(min, value - 1));

  return (
    <div
      className={`relative w-full rounded-lg border border-gray-200 bg-white ${
        className ?? ""
      }`}
    >
      <input
        type="number"
        value={value === 0 ? "" : value}
        placeholder="0"
        onChange={(e) => {
          const raw = e.target.value;
          const parsed = raw === "" ? 0 : Number(raw);
          onChange(Number.isNaN(parsed) ? 0 : parsed);
        }}
        className="w-full appearance-none rounded-lg bg-transparent px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <div className="absolute right-1 top-1 flex flex-col">
        <button
          type="button"
          onClick={increase}
          className="h-4 w-5 flex items-center justify-center text-slate-400 hover:text-slate-700"
        >
          <ChevronUp size={15} />
        </button>
        <button
          type="button"
          onClick={decrease}
          className="h-1 w-5 flex items-center justify-center text-slate-400 hover:text-slate-700"
        >
          <ChevronDown size={15} />
        </button>
      </div>
    </div>
  );
}
