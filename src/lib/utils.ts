export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
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
