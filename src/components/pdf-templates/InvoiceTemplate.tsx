import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { InvoiceData } from "@/lib/types";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency } from "@/lib/utils";

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 12,
        fontFamily: "Helvetica",
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    section: {
        marginBottom: 12,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bold: {
        fontWeight: "bold",
    },
});

export default function InvoiceTemplate({ data }: { data: InvoiceData }) {
    const result = calculateInvoiceTotal(data);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>INVOICE</Text>

                <View style={styles.section}>
                    <Text style={styles.bold}>{data.brand.name}</Text>
                    <Text>{data.brand.location}</Text>
                    <Text>{data.brand.contact}</Text>
                </View>

                <View style={styles.section}>
                    <Text>Invoice No: {data.invoiceNumber}</Text>
                    <Text>Date: {data.issueDate.toLocaleDateString()}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.bold}>Bill To:</Text>
                    <Text>{data.client.name}</Text>
                </View>

                <View style={styles.section}>
                    {data.items.map((item, idx) => (
                        <View key={idx} style={styles.row}>
                            <Text>
                                {item.description} ({item.quantity} ×{" "}
                                {formatCurrency(item.unitPrice)})
                            </Text>
                            <Text>
                                {formatCurrency(item.quantity * item.unitPrice)}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text>Subtotal</Text>
                        <Text>{formatCurrency(result.subtotal)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Discount</Text>
                        <Text>-{formatCurrency(result.discountAmount)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Tax</Text>
                        <Text>{formatCurrency(result.taxAmount)}</Text>
                    </View>
                    <View style={[styles.row, styles.bold]}>
                        <Text>Total</Text>
                        <Text>{formatCurrency(result.total)}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}
