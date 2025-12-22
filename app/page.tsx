import Link from "next/link";
import Image from "next/image";
import { Calculator, LayoutTemplate, Download, CreditCard } from "lucide-react";

export default function HomePage() {
  return (
    <main className="bg-page-bg overflow-hidden">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
            Buat Invoice & Receipt Profesional{" "}
            <span className="text-orange-500 block">dalam Hitungan Menit</span>
          </h1>

          <p className="text-gray-600 mb-3 max-w-xl">
            Cepat, mudah, dan profesional untuk UMKM, freelancer, dan bisnis
            kecil.
          </p>
          <p className="text-gray-600 mb-10">
            Mulai buat invoice dan receipt kurang dari 5 menit.
          </p>

          <Link
            href="/invoice"
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-7 py-3 rounded-xl shadow-md hover:bg-orange-600 hover:scale-105 transition"
          >
            Get Started
          </Link>
        </div>

        <div className="relative flex justify-center">
          <div className="absolute -inset-4 bg-orange-100 rounded-3xl blur-3xl opacity-60" />
          <Image
            src="/images/hero-invoice.png"
            alt="Invoice preview"
            width={520}
            height={420}
            className="relative rounded-2xl shadow-2xl"
            priority
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-white">
        <h2 className="text-center text-2xl font-bold mb-14">
          Semua Yang Anda Butuhkan Untuk Membuat Dokumen
        </h2>

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          {[
            {
              icon: Calculator,
              title: "Auto Calculation",
              desc: "Perhitungan subtotal, pajak, dan diskon otomatis",
            },
            {
              icon: LayoutTemplate,
              title: "Professional Template",
              desc: "Template siap pakai dengan tampilan profesional",
            },
            {
              icon: Download,
              title: "PDF Export",
              desc: "Ekspor dokumen PDF siap dikirim ke klien",
            },
            {
              icon: CreditCard,
              title: "Payment Status",
              desc: "Lacak dan kelola status pembayaran",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-card-bg rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition text-center"
            >
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-xl bg-orange-100 group-hover:bg-orange-500 transition">
                <item.icon
                  size={28}
                  className="text-orange-500 group-hover:text-white transition"
                />
              </div>

              <h4 className="font-semibold mb-2">{item.title}</h4>
              <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
