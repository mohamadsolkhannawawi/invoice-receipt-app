import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { InvoiceData } from "@/lib/types";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency, formatDate } from "@/lib/utils";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  logo: { width: 48, height: 48, marginRight: 8 },
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
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {data.brand.logo && (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={data.brand.logo} style={styles.logo} />
            )}
            <View>
              <Text style={styles.bold}>{data.brand.name}</Text>
              <Text>{data.brand.location}</Text>
            </View>
          </View>
        </View>
        {data.template === "STYLE_B" ? (
          <>
            <Text style={styles.title}>RECEIPT</Text>
            <Text>Receipt No: {data.invoiceNumber}</Text>
            <Text style={{ fontSize: 10, marginTop: 6 }}>
              Tanggal Pembayaran: {formatDate(data.issueDate)}
            </Text>
            <View style={{ marginVertical: 12 }}>
              {data.items.map((item, idx) => (
                <View key={idx} style={styles.row}>
                  <Text>{item.description}</Text>
                  <Text>{formatCurrency(item.quantity * item.unitPrice)}</Text>
                </View>
              ))}
            </View>
          </>
        ) : data.template === "STYLE_C" ? (
          <>
            {data.status && (
              <Text style={{ marginBottom: 8 }}>
                Status: {data.status === "PAID" ? "PAID" : data.status}
              </Text>
            )}
            <Text style={{ fontSize: 16 }}>RECEIPT</Text>
            <Text>Paid: {formatCurrency(result.total)}</Text>
          </>
        ) : (
          <>
            <Text style={styles.title}>RECEIPT</Text>

            <Text>Status: PAID</Text>
            <Text>Receipt No: {data.invoiceNumber}</Text>

            <View style={{ marginVertical: 20 }}>
              {data.items.map((item, idx) => (
                <View key={idx} style={styles.row}>
                  <Text>{item.description}</Text>
                  <Text>{formatCurrency(item.quantity * item.unitPrice)}</Text>
                </View>
              ))}
            </View>

            <View style={[styles.row, styles.bold]}>
              <Text>Total Paid</Text>
              <Text>{formatCurrency(result.total)}</Text>
            </View>
          </>
        )}
      </Page>
    </Document>
  );
}
