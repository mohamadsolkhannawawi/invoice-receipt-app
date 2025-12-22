"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Receipt, Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useInvoiceStore } from "@/store/useInvoiceStore";

export default function Navbar() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isInvoice = pathname.startsWith("/invoice");
  const isReceipt = pathname.startsWith("/receipt");

  const setDocumentType = useInvoiceStore((s) => s.setDocumentType);

  useEffect(() => {
    if (isInvoice) setDocumentType("INVOICE");
    else if (isReceipt) setDocumentType("RECEIPT");
  }, [isInvoice, isReceipt, setDocumentType]);

  const [open, setOpen] = useState(false);

  return (
    <header className="border-b-2 border-orange-400 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-6 py-2 md:py-3 flex items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-3 text-sm font-semibold">
          {/* HOME */}
          <Link
            href="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all
              ${
                isHome
                  ? "bg-orange-500 text-white shadow-md hover:bg-orange-600"
                  : "text-orange-500 hover:bg-orange-100"
              }
            `}
          >
            {isHome && <Home size={14} />}
            Home
          </Link>

          <Link
            href="/invoice"
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all
              ${
                isInvoice
                  ? "bg-orange-500 text-white shadow-md hover:bg-orange-600"
                  : "text-orange-500 hover:bg-orange-100"
              }
            `}
          >
            {isInvoice && <FileText size={14} />}
            Invoice
          </Link>

          <Link
            href="/receipt"
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all
              ${
                isReceipt
                  ? "bg-orange-500 text-white shadow-md hover:bg-orange-600"
                  : "text-orange-500 hover:bg-orange-100"
              }
            `}
          >
            {isReceipt && <Receipt size={16} />}
            Receipt
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden relative">
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-md text-orange-500 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>

          {open ? (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg ring-1 ring-slate-200">
              <div className="flex flex-col py-2">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className={`px-4 py-2 text-sm flex items-center gap-2 ${
                    isHome
                      ? "bg-orange-500 text-white"
                      : "text-slate-700 hover:bg-orange-50"
                  }`}
                >
                  Home
                </Link>

                <Link
                  href="/invoice"
                  onClick={() => setOpen(false)}
                  className={`px-4 py-2 text-sm flex items-center gap-2 ${
                    isInvoice
                      ? "bg-orange-500 text-white"
                      : "text-slate-700 hover:bg-orange-50"
                  }`}
                >
                  Invoice
                </Link>

                <Link
                  href="/receipt"
                  onClick={() => setOpen(false)}
                  className={`px-4 py-2 text-sm flex items-center gap-2 ${
                    isReceipt
                      ? "bg-orange-500 text-white"
                      : "text-slate-700 hover:bg-orange-50"
                  }`}
                >
                  Receipt
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
