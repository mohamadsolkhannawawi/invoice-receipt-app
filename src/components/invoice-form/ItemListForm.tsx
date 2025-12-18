"use client";

import { useState } from "react";
import { useInvoiceStore } from "@/store/useInvoiceStore";

export default function ItemListForm() {
    const { data, addItem, removeItem } = useInvoiceStore();

    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [unitPrice, setUnitPrice] = useState(0);

    const handleAdd = () => {
        if (!description) return;

        addItem({
            description,
            quantity,
            unitPrice,
        });

        setDescription("");
        setQuantity(1);
        setUnitPrice(0);
    };

    return (
        <div className="space-y-4">
            <h3 className="font-bold">Items</h3>

            <div className="flex gap-2">
                <input
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 w-full"
                />

                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border p-2 w-20"
                />

                <input
                    type="number"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(Number(e.target.value))}
                    className="border p-2 w-32"
                />

                <button
                    onClick={handleAdd}
                    className="bg-blue-500 text-white px-4"
                >
                    Add
                </button>
            </div>

            <ul className="space-y-2">
                {data.items.map((item, index) => (
                    <li key={index} className="flex justify-between border p-2">
                        <span>
                            {item.description} — {item.quantity} ×{" "}
                            {item.unitPrice}
                        </span>
                        <button
                            onClick={() => removeItem(index)}
                            className="text-red-500"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
