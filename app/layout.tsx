import { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-page-bg font-sans">
        {/* NAVBAR */}
        <Navbar />

        {/* Main content — add top padding to avoid overlap with sticky Navbar */}
        <div className="min-h-screen pt-16">{children}</div>

        {/* FOOTER */}
        <Footer />
      </body>
    </html>
  );
}
