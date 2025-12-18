import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { InvoiceData } from "@/lib/types";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency } from "@/lib/utils";

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 12,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bold: {
        fontWeight: "bold",
    },
});

export default function ReceiptTemplate({ data }: { data: InvoiceData }) {
    const result = calculateInvoiceTotal(data);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>RECEIPT</Text>

                <Text>Status: PAID</Text>
                <Text>Receipt No: {data.invoiceNumber}</Text>

                <View style={{ marginVertical: 20 }}>
                    {data.items.map((item, idx) => (
                        <View key={idx} style={styles.row}>
                            <Text>{item.description}</Text>
                            <Text>
                                {formatCurrency(item.quantity * item.unitPrice)}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={[styles.row, styles.bold]}>
                    <Text>Total Paid</Text>
                    <Text>{formatCurrency(result.total)}</Text>
                </View>
            </Page>
        </Document>
    );
}
