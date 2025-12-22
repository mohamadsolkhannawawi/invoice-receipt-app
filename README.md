# Invoice / Receipt Generator

## Project Description

Invoice / Receipt Generator is a small web app to create, preview, and export professional invoices and receipts as PDF. It includes a form-driven UI to enter brand, client, items, calculations (tax, discount), and multiple printable templates for both invoices and receipts.

The app is built with Next.js (App Router), TypeScript, Tailwind CSS and uses `@react-pdf/renderer` for PDF generation. State is managed with `zustand` and forms are built with `react-hook-form` where appropriate.

## Tech Stack

-   **Framework:** Next.js (App Router)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS
-   **PDF generation:** @react-pdf/renderer
-   **State management:** zustand
-   **Forms & validation:** react-hook-form, zod
-   **Icons:** lucide-react, FontAwesome

## Project Structure

```
invoice-receipt-app/
├── app/                         # Next.js app routes and global layout
│   ├── invoice/                 # Invoice page
│   └── receipt/                 # Receipt page
├── public/                      # Public assets (images, favicon)
│   └── images/
├── src/
│   ├── components/
│   │   ├── invoice-form/        # Forms: Brand, Client, Items, Calculation, etc.
│   │   ├── invoice-preview/     # Live HTML + PDF preview components
│   │   ├── pdf-templates/       # @react-pdf templates (InvoiceTemplate, ReceiptTemplate)
│   │   └── ui/                  # Small UI primitives (Input, Button, Navbar, Footer)
│   ├── hooks/                   # Custom hooks (e.g. useHydration)
│   ├── lib/                     # Utilities: calculation, formatting, types, schema
│   └── store/                   # zustand store: `useInvoiceStore`
├── package.json
└── README.md
```

See the components folder for detailed implementation of forms, previewers, and PDF templates:

-   The `src/components/pdf-templates` folder contains `InvoiceTemplate.tsx` and `ReceiptTemplate.tsx` used to render PDFs via `@react-pdf/renderer`.
-   The `src/components/invoice-preview` directory contains `PdfPreview.tsx`, `HtmlPreview.tsx`, and preview styles for templates A/B/C.

## Features

-   Create invoices and receipts with brand and client info
-   Add multiple line items (quantity, unit price)
-   Calculation section with tax and discount
-   Three printable templates for invoice and receipt styles (A/B/C)
-   Live PDF preview and export (download)
-   Logo upload and template switching

## Installation and Setup

### Prerequisites

-   Node.js (v18+ recommended)
-   npm or yarn

### Install dependencies

```bash
# install dependencies
npm install
# or
yarn
```

### Run development server

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 (Next's default) to view the app.

## Important Files

-   **Layout & global**: [app/layout.tsx](app/layout.tsx#L1) — site layout, navbar, footer, favicon, title.
-   **Invoice page**: [app/invoice/page.tsx](app/invoice/page.tsx#L1) — main invoice editor page.
-   **Receipt page**: [app/receipt/page.tsx](app/receipt/page.tsx#L1) — main receipt editor page.
-   **PDF templates**: [src/components/pdf-templates/InvoiceTemplate.tsx](src/components/pdf-templates/InvoiceTemplate.tsx#L1-L20), [src/components/pdf-templates/ReceiptTemplate.tsx](src/components/pdf-templates/ReceiptTemplate.tsx#L1-L20).
-   **PDF preview/download**: [src/components/invoice-preview/PdfPreview.tsx](src/components/invoice-preview/PdfPreview.tsx#L1-L80).
-   **Store**: [src/store/useInvoiceStore.ts](src/store/useInvoiceStore.ts) — centralized state for document data.

## Notes & Tips

-   Favicon and title are set in `app/layout.tsx`. The project uses `public/images/Logo.svg` and `public/images/Logo.png` as favicon assets.
-   FontAwesome is included; if you get module not found errors, install the packages:

```bash
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-brands-svg-icons @fortawesome/react-fontawesome
```

-   Numeric inputs show a `0` placeholder by design; the UI component is `src/components/ui/NumberInput.tsx`.
-   PDF receipt templates intentionally hide `Jatuh Tempo` (due date) — due date appears only on invoices.

## Scripts

Available npm scripts from `package.json`:

-   `dev` — run Next.js development server
-   `build` — build for production
-   `start` — start production server (after build)
-   `lint` — run ESLint

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes and push
4. Open a pull request describing your work

## License

This project currently does not include a license file. Add one if you plan to open-source.

---
