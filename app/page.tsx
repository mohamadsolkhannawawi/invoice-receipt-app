import Link from "next/link";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6">
            <h1 className="text-2xl font-bold">Invoice & Receipt Generator</h1>

            <div className="flex gap-4">
                <Link
                    href="/invoice"
                    className="bg-blue-600 text-white px-6 py-3 rounded"
                >
                    Create Invoice
                </Link>

                <Link
                    href="/receipt"
                    className="bg-green-600 text-white px-6 py-3 rounded"
                >
                    Create Receipt
                </Link>
            </div>
        </div>
    );
}
