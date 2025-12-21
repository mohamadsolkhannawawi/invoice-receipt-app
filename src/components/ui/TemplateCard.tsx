"use client";

import { Glasses, Shapes, FileText } from "lucide-react";

type Props = {
  title: string;
  active?: boolean;
  onClick?: () => void;
};

export default function TemplateCard({
  title,
  active = false,
  onClick,
}: Props) {
  const iconProps = {
    size: 28,
    strokeWidth: 1.8,
    className: "text-orange-500 group-hover:text-white transition",
  };

  const renderIcon = () => {
    if (title === "Modern") return <Glasses {...iconProps} />;
    if (title === "Klasik") return <Shapes {...iconProps} />;
    return <FileText {...iconProps} />;
  };

  return (
    <div
      role="button"
      onClick={onClick}
      className={`group bg-card-bg rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition text-center cursor-pointer ${
        active ? "ring-2 ring-orange-400" : ""
      }`}
    >
      <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-xl bg-orange-100 group-hover:bg-orange-500 transition">
        {renderIcon()}
      </div>

      <div className="text-slate-900 text-base font-semibold tracking-wide">
        {title}
      </div>
    </div>
  );
}
