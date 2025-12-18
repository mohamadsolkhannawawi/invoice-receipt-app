import { z } from "zod";
import { InvoiceSchema, InvoiceItemSchema } from "./schema";

export type InvoiceData = z.infer<typeof InvoiceSchema>;
export type InvoiceItem = z.infer<typeof InvoiceItemSchema>;
