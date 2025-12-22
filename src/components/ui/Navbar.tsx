"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Receipt } from "lucide-react";
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

    return (
        /* h-14 mengunci tinggi navbar agar ramping */
        <header className="border-b-2 border-orange-400 bg-white sticky top-0 z-50 h-14 flex items-center">
            <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between">
                <Logo />

                <nav className="hidden md:flex items-center gap-3 text-sm font-semibold">
                    <Link
                        href="/"
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all
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
                        {isReceipt && <Receipt size={14} />}
                        Receipt
                    </Link>
                </nav>
            </div>
        </header>
    );
}
