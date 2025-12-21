export const formatCurrency = (value: number) => {
  // If value has no cents (rounded to 2 decimals), don't show decimals
  const rounded = Math.round(value * 100);
  const hasCents = rounded % 100 !== 0;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  }).format(value);
};

export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => {
      reader.abort();
      reject(new Error("Gagal membaca file"));
    };
    reader.onload = () => {
      const result = reader.result as string | ArrayBuffer | null;
      if (!result) return reject(new Error("File kosong"));
      // result will be a data URL (base64)
      resolve(result as string);
    };
    reader.readAsDataURL(file);
  });
};

// Default brand color used across previews and form
export const DEFAULT_BRAND_COLOR = "#A435F0";

/**
 * Date helpers
 */

export const formatDate = (d?: Date | string | null) => {
  if (!d) return "";
  const date = d instanceof Date ? d : new Date(d);
  return new Intl.DateTimeFormat("id-ID").format(date);
};

export const toInputDateValue = (d?: Date | string | null) => {
  if (!d) return "";
  const date = d instanceof Date ? d : new Date(d);
  return date.toISOString().slice(0, 10);
};

export const parseDateFromInput = (v: string) => {
  if (!v) return undefined;
  const d = new Date(v);
  return isNaN(d.getTime()) ? undefined : d;
};

/**
 * Convert hex color to rgba string with alpha
 */
export const hexToRgba = (hex: string, alpha = 1) => {
  if (!hex) hex = DEFAULT_BRAND_COLOR; // use default when not provided
  const h = hex.replace("#", "");
  const bigint = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
