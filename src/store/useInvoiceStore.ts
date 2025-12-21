import { create } from "zustand";
import { persist } from "zustand/middleware";
import { InvoiceData, InvoiceItem } from "@/lib/types";

/**
 * State Shape
 */
interface InvoiceStore {
  data: InvoiceData;

  // hydration flag — true after persist rehydrates
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;

  // actions
  initialize: (type: "INVOICE" | "RECEIPT", opts?: { reset?: boolean }) => void;
  setDocumentType: (type: "INVOICE" | "RECEIPT") => void;
  updateField: <K extends keyof InvoiceData>(
    key: K,
    value: InvoiceData[K]
  ) => void;

  addItem: (item: InvoiceItem) => void;
  updateItem: (index: number, item: InvoiceItem) => void;
  removeItem: (index: number) => void;

  reset: () => void;
}

/**
 * Default Factory
 */
import { DEFAULT_BRAND_COLOR } from "@/lib/utils";

const createDefaultInvoice = (type: "INVOICE" | "RECEIPT"): InvoiceData => ({
  documentType: type,

  invoiceNumber: "",
  issueDate: undefined,
  dueDate: undefined,

  brand: {
    name: "",
    location: "",
    contact: "",
    logo: "",
    color: DEFAULT_BRAND_COLOR,
  },

  client: {
    name: "",
  },

  items: [],

  // selected template style
  template: "STYLE_A",

  taxRate: 0,
  discountType: "PERCENTAGE",
  discountValue: 0,

  status: "DRAFT",
  notes: "",
});

/**
 * Zustand Store
 */
export const useInvoiceStore = create<InvoiceStore>()(
  persist<InvoiceStore>(
    (set) => ({
      data: createDefaultInvoice("INVOICE"),

      hasHydrated: false,
      setHasHydrated: (v: boolean) => set({ hasHydrated: v }),

      initialize: (type, opts = { reset: false }) => {
        if (opts.reset) {
          set({ data: createDefaultInvoice(type) });
        } else {
          set((state) => ({
            data: { ...state.data, documentType: type },
          }));
        }
      },

      setDocumentType: (type) =>
        set((state) => {
          // When converting document type, update invoiceNumber prefix accordingly:
          // - When switching to RECEIPT: if invoiceNumber starts with INV, replace with RCP
          // - When switching to INVOICE: if invoiceNumber starts with RCP, replace with INV
          const current = state.data.invoiceNumber || "";
          let updatedInvoiceNumber = current;

          if (type === "RECEIPT") {
            updatedInvoiceNumber = current.replace(/^[iI][nN][vV]/, "RCP");
          } else if (type === "INVOICE") {
            updatedInvoiceNumber = current.replace(/^[rR][cC][pP]/, "INV");
          }

          return {
            data: {
              ...state.data,
              documentType: type,
              invoiceNumber: updatedInvoiceNumber,
            },
          };
        }),

      updateField: (key, value) =>
        set((state) => ({ data: { ...state.data, [key]: value } })),

      addItem: (item) =>
        set((state) => ({
          data: { ...state.data, items: [...state.data.items, item] },
        })),

      updateItem: (index, item) =>
        set((state) => ({
          data: {
            ...state.data,
            items: state.data.items.map((i, idx) => (idx === index ? item : i)),
          },
        })),

      removeItem: (index) =>
        set((state) => ({
          data: {
            ...state.data,
            items: state.data.items.filter((_, idx) => idx !== index),
          },
        })),

      reset: () => set(() => ({ data: createDefaultInvoice("INVOICE") })),
    }),
    {
      name: "invoice-storage",
      onRehydrateStorage: () => (persistedState?: unknown) => {
        try {
          // If there is persisted state, revive Date fields so components can use Date methods
          const ps = persistedState as
            | { data?: { issueDate?: string | Date; dueDate?: string | Date } }
            | undefined;
          if (ps?.data) {
            const d = ps.data;
            if (d.issueDate && typeof d.issueDate === "string") {
              d.issueDate = new Date(d.issueDate);
            }
            if (d.dueDate && typeof d.dueDate === "string") {
              d.dueDate = new Date(d.dueDate);
            }
          }

          // mark hydrated after rehydrate completes
          Promise.resolve().then(() => {
            const s = useInvoiceStore.getState();
            s.setHasHydrated(true);
          });
        } catch (e) {
          console.error("onRehydrateStorage error", e);
        }
      },
    }
  )
);
