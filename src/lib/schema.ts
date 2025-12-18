import { z } from "zod";

/**
 * Item / Produk / Jasa
 */
export const InvoiceItemSchema = z.object({
    description: z.string().min(1, "Description is required"),

    quantity: z.number().min(1, "Quantity must be at least 1"),

    unitPrice: z.number().min(0, "Price cannot be negative"),
});

/**
 * Main Invoice / Receipt Schema
 */
export const InvoiceSchema = z.object({
    /**
     * Menentukan mode halaman:
     * - INVOICE → /invoice
     * - RECEIPT → /receipt
     */
    documentType: z.enum(["INVOICE", "RECEIPT"]),

    /**
     * Nomor Dokumen
     */
    invoiceNumber: z.string().min(1, "Invoice number is required"),

    /**
     * Tanggal
     */
    issueDate: z.date(),
    dueDate: z.date().optional(),

    /**
     * Informasi Brand / Pengirim
     */
    brand: z.object({
        name: z.string().min(1, "Brand name is required"),
        location: z.string().optional(),
        contact: z.string().optional(),
        logo: z.string().optional(), // base64 image
        color: z.string().optional(), // hex color
    }),

    /**
     * Informasi Klien
     */
    client: z.object({
        name: z.string().min(1, "Client name is required"),
    }),

    /**
     * Daftar Item
     */
    items: z.array(InvoiceItemSchema).min(1, "At least one item is required"),

    /**
     * Perhitungan
     */
    taxRate: z.number().min(0).max(100),

    discountType: z.enum(["PERCENTAGE", "NOMINAL"]),
    discountValue: z.number().min(0),

    /**
     * Status Pembayaran
     */
    status: z.enum(["DRAFT", "PENDING", "PAID"]),

    /**
     * Catatan tambahan
     */
    notes: z.string().optional(),
});
