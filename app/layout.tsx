import { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="id">
            <head>
                <title>Invoice Gen</title>
                <link
                    rel="icon"
                    href="/images/Logo.svg"
                    type="image/svg+xml"
                    sizes="any"
                />
                <link rel="icon" href="/images/Logo.png" sizes="32x32" />
                <link rel="icon" href="/images/Logo.png" sizes="64x64" />
                <link rel="apple-touch-icon" href="/images/Logo.png" />
            </head>
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
