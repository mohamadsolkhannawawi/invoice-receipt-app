import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    Svg,
    Path,
} from "@react-pdf/renderer";
import { InvoiceData } from "@/lib/types";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency, formatDate, DEFAULT_BRAND_COLOR } from "@/lib/utils";

const styles = StyleSheet.create({
    page: {
        padding: 36,
        fontSize: 11,
        fontFamily: "Helvetica",
        color: "#111827",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    headerLeft: { flexDirection: "row", alignItems: "center" },
    logo: { width: 52, height: 52, marginRight: 10 },
    brandName: { fontSize: 14, fontWeight: "bold" },
    brandMeta: { fontSize: 9, color: "#374151" },
    docBadge: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
    },
    refId: { fontSize: 9, color: "#6b7280", marginTop: 6 },
    smallText: { fontSize: 9, color: "#374151" },
    dateTop: { fontSize: 10, color: "#374151", marginBottom: 8 },
    badge: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    recipientBox: { padding: 10, borderRadius: 10, marginVertical: 8 },
    recipientTitle: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 6,
    },
    recipientName: { fontSize: 11, color: "#fff" },
    tableHeader: {
        flexDirection: "row",
        borderBottomWidth: 1,
        paddingBottom: 6,
        marginTop: 6,
    },
    tableHeaderBlue: {
        flexDirection: "row",
        backgroundColor: DEFAULT_BRAND_COLOR,
        color: "#fff",
        paddingVertical: 8,
        paddingHorizontal: 6,
        borderRadius: 8,
    },
    tableHeaderText: { color: "#fff", fontSize: 11, fontWeight: "bold" },
    totalBarLarge: {
        marginTop: 10,
        paddingVertical: 12,
        borderRadius: 10,
        textAlign: "right",
    },
    statusBadgeLarge: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 11,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    notesTitle: {
        fontSize: 11,
        color: DEFAULT_BRAND_COLOR,
        fontWeight: "bold",
        marginBottom: 6,
    },
    notesBox: {
        padding: 10,
        backgroundColor: "#f3f4f6",
        borderRadius: 6,
        marginTop: 12,
    },
    tableRow: {
        flexDirection: "row",
        paddingVertical: 6,
        alignItems: "center",
    },
    colDesc: { flex: 4, fontSize: 10 },
    colQty: { flex: 1, textAlign: "right", fontSize: 10 },
    colPrice: { flex: 2, textAlign: "right", fontSize: 10 },
    totals: { marginTop: 8 },
    totalsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 6,
        alignItems: "center",
    },
    totalsLabel: { fontSize: 12, color: "#111827" },
    totalsValue: { fontSize: 12, fontWeight: "bold" },
    discountRed: { color: "#dc2626" },
    totalBar: {
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 6,
        textAlign: "right",
    },
    footerNote: {
        marginTop: 12,
        padding: 10,
        backgroundColor: "#f3f4f6",
        borderRadius: 6,
        fontSize: 9,
        color: "#374151",
    },
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        fontSize: 9,
        color: "#fff",
        fontWeight: "bold",
    },
});

function hexToRgba(hex: string, alpha = 1) {
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
}

export default function InvoiceTemplate({ data }: { data: InvoiceData }) {
    const result = calculateInvoiceTotal(data);

    const brandColor = data.brand?.color || DEFAULT_BRAND_COLOR;

    return (
        <Document>
            <Page
                size="A4"
                style={
                    data.template === "STYLE_B"
                        ? { ...styles.page, padding: 24 }
                        : styles.page
                }
            >
                {data.template === "STYLE_A" ? (
                    <Text style={styles.dateTop}>
                        {data.issueDate ? formatDate(data.issueDate) : "-"}
                    </Text>
                ) : null}

                {data.template === "STYLE_A" ? (
                    <>
                        <View style={styles.header}>
                            <View style={styles.headerLeft}>
                                {data.brand.logo ? (
                                    // eslint-disable-next-line jsx-a11y/alt-text
                                    <Image
                                        src={data.brand.logo}
                                        style={styles.logo}
                                    />
                                ) : null}

                                <View>
                                    <Text
                                        style={[
                                            styles.brandName,
                                            { color: brandColor },
                                        ]}
                                    >
                                        {data.brand.name || "Nama Brand"}
                                    </Text>
                                    <Text style={styles.brandMeta}>
                                        {data.brand.location || "-"}
                                    </Text>
                                    {data.brand.contact && (
                                        <Text style={styles.smallText}>
                                            {data.brand.contact}
                                        </Text>
                                    )}
                                </View>
                            </View>

                            <View style={{ alignItems: "flex-end" }}>
                                <View
                                    style={{
                                        ...styles.badge,
                                        backgroundColor: brandColor,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Svg
                                            width={14}
                                            height={14}
                                            viewBox="0 0 24 24"
                                        >
                                            <Path
                                                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                                                fill="#fff"
                                            />
                                            <Path d="M14 2v6h6" fill="#fff" />
                                        </Svg>
                                        <Text
                                            style={{
                                                color: "#fff",
                                                fontSize: 12,
                                                marginLeft: 6,
                                            }}
                                        >
                                            {data.documentType}
                                        </Text>
                                    </View>
                                </View>

                                <Text
                                    style={{
                                        marginTop: 6,
                                        fontSize: 11,
                                        color: "#111827",
                                    }}
                                >
                                    {data.invoiceNumber
                                        ? `#${data.invoiceNumber}`
                                        : "-"}
                                </Text>
                                {data.documentType === "INVOICE" && (
                                    <Text
                                        style={[
                                            styles.smallText,
                                            { marginTop: 6 },
                                        ]}
                                    >
                                        Jatuh Tempo:{" "}
                                        {data.dueDate
                                            ? formatDate(data.dueDate)
                                            : "-"}
                                    </Text>
                                )}
                            </View>
                        </View>

                        {/* recipient */}
                        <View
                            style={{
                                ...styles.recipientBox,
                                backgroundColor: brandColor,
                                alignSelf: "flex-start",
                                paddingVertical: 8,
                                paddingHorizontal: 12,
                            }}
                        >
                            <Text style={styles.recipientTitle}>
                                Ditujukan Kepada :
                            </Text>
                            <Text style={styles.recipientName}>
                                {data.client?.name || "-"}
                            </Text>
                        </View>

                        <View
                            style={{
                                marginTop: 12,
                                marginBottom: 12,
                                borderRadius: 6,
                            }}
                        >
                            <View
                                style={{
                                    ...styles.tableHeaderBlue,
                                    backgroundColor: brandColor,
                                }}
                            >
                                <View
                                    style={{
                                        flex: 4,
                                        paddingHorizontal: 6,
                                    }}
                                >
                                    <Text style={{ ...styles.tableHeaderText }}>
                                        Deskripsi
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        paddingHorizontal: 6,
                                        alignItems: "flex-end",
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.tableHeaderText,
                                            textAlign: "right",
                                        }}
                                    >
                                        Jumlah
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 2,
                                        paddingHorizontal: 6,
                                        alignItems: "flex-end",
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.tableHeaderText,
                                            textAlign: "right",
                                        }}
                                    >
                                        Harga
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 2,
                                        paddingHorizontal: 6,
                                        alignItems: "flex-end",
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.tableHeaderText,
                                            textAlign: "right",
                                        }}
                                    >
                                        Nominal
                                    </Text>
                                </View>
                            </View>

                            {data.items.map((item, idx) => (
                                <View
                                    key={idx}
                                    style={{
                                        flexDirection: "row",
                                        paddingVertical: 10,
                                        borderBottomWidth: 1,
                                        borderBottomColor: brandColor,
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 4,
                                            paddingHorizontal: 6,
                                        }}
                                    >
                                        <Text>{item.description}</Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            paddingHorizontal: 6,
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text>{String(item.quantity)}</Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 2,
                                            paddingHorizontal: 6,
                                            alignItems: "flex-end",
                                        }}
                                    >
                                        <Text>
                                            {formatCurrency(item.unitPrice)}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 2,
                                            paddingHorizontal: 6,
                                            alignItems: "flex-end",
                                        }}
                                    >
                                        <Text>
                                            {formatCurrency(
                                                item.quantity * item.unitPrice
                                            )}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        <View style={styles.totals}>
                            <View style={styles.totalsRow}>
                                <Text style={styles.totalsLabel}>Subtotal</Text>
                                <Text style={styles.totalsValue}>
                                    {formatCurrency(result.subtotal)}
                                </Text>
                            </View>

                            <View style={styles.totalsRow}>
                                <Text
                                    style={[
                                        styles.totalsLabel,
                                        styles.discountRed,
                                    ]}
                                >
                                    Diskon
                                </Text>
                                <Text
                                    style={[
                                        styles.totalsValue,
                                        styles.discountRed,
                                    ]}
                                >
                                    -{formatCurrency(result.discountAmount)}
                                </Text>
                            </View>

                            <View style={styles.totalsRow}>
                                <Text style={styles.totalsLabel}>
                                    Pajak {data.taxRate}%
                                </Text>
                                <Text style={styles.totalsValue}>
                                    {formatCurrency(result.taxAmount)}
                                </Text>
                            </View>

                            <View
                                style={{
                                    height: 2,
                                    backgroundColor: hexToRgba(
                                        brandColor,
                                        0.16
                                    ),
                                    marginTop: 8,
                                    marginBottom: 8,
                                }}
                            />

                            <View
                                style={{
                                    ...styles.totalBarLarge,
                                    backgroundColor: brandColor,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingHorizontal: 12,
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontSize: 18,
                                        fontWeight: "bold",
                                    }}
                                >
                                    Total
                                </Text>
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontSize: 20,
                                        fontWeight: "bold",
                                    }}
                                >
                                    {formatCurrency(result.total)}
                                </Text>
                            </View>

                            <View
                                style={{ marginTop: 12, alignItems: "center" }}
                            >
                                <View
                                    style={{
                                        ...styles.statusBadgeLarge,
                                        backgroundColor: brandColor,
                                    }}
                                >
                                    <Text
                                        style={{ color: "#fff", fontSize: 12 }}
                                    >
                                        {data.status === "PAID"
                                            ? "LUNAS"
                                            : "Belum Dibayar"}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </>
                ) : data.template === "STYLE_B" ? (
                    // Classic
                    <>
                        <View style={{ alignItems: "center", marginBottom: 6 }}>
                            {data.brand.logo ? (
                                // eslint-disable-next-line jsx-a11y/alt-text
                                <Image
                                    src={data.brand.logo}
                                    style={{
                                        ...styles.logo,
                                        width: 40,
                                        height: 40,
                                    }}
                                />
                            ) : null}

                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    color: brandColor,
                                }}
                            >
                                {data.brand.name || "Nama Brand"}
                            </Text>
                            <Text style={styles.brandMeta}>
                                {data.brand.location}
                            </Text>
                            {data.brand.contact && (
                                <Text style={styles.smallText}>
                                    {data.brand.contact}
                                </Text>
                            )}
                        </View>

                        <View
                            style={{ alignItems: "center", marginBottom: 12 }}
                        >
                            <View
                                style={{
                                    height: 4,
                                    backgroundColor: brandColor,
                                    width: "100%",
                                    borderRadius: 2,
                                    marginBottom: 8,
                                }}
                            />

                            <View
                                style={{
                                    borderColor: brandColor,
                                    borderWidth: 2,
                                    paddingVertical: 8,
                                    paddingHorizontal: 14,
                                    borderRadius: 12,
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Svg width={18} height={18} viewBox="0 0 24 24">
                                    <Path
                                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                                        fill={brandColor}
                                    />
                                    <Path d="M14 2v6h6" fill={brandColor} />
                                </Svg>
                                <Text
                                    style={{
                                        color: brandColor,
                                        fontWeight: "bold",
                                        marginLeft: 8,
                                        fontSize: 16,
                                    }}
                                >
                                    {data.documentType}
                                </Text>
                            </View>
                        </View>

                        <View style={{ marginVertical: 8 }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    borderBottomWidth: 1,
                                    borderBottomColor: brandColor,
                                    paddingVertical: 4,
                                }}
                            >
                                <Text
                                    style={{ fontSize: 10, color: "#374151" }}
                                >
                                    {data.documentType === "INVOICE"
                                        ? "Nomor Invoice"
                                        : "Receipt No"}
                                </Text>
                                <Text
                                    style={{ fontSize: 12, color: "#111827" }}
                                >
                                    {data.invoiceNumber
                                        ? `#${data.invoiceNumber}`
                                        : "-"}
                                </Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    borderBottomWidth: 1,
                                    borderBottomColor: brandColor,
                                    paddingVertical: 4,
                                }}
                            >
                                <Text
                                    style={{ fontSize: 10, color: "#374151" }}
                                >
                                    Tanggal Dibuat
                                </Text>
                                <Text style={{ fontSize: 12 }}>
                                    {data.issueDate
                                        ? formatDate(data.issueDate)
                                        : "-"}
                                </Text>
                            </View>

                            {data.documentType === "INVOICE" && (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        borderBottomWidth: 1,
                                        borderBottomColor: brandColor,
                                        paddingVertical: 4,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            color: "#374151",
                                        }}
                                    >
                                        Jatuh Tempo
                                    </Text>
                                    <Text style={{ fontSize: 12 }}>
                                        {data.dueDate
                                            ? formatDate(data.dueDate)
                                            : "-"}
                                    </Text>
                                </View>
                            )}
                        </View>

                        <View
                            style={{ alignItems: "center", marginVertical: 10 }}
                        >
                            <View
                                style={{
                                    borderColor: brandColor,
                                    borderWidth: 1,
                                    paddingVertical: 8,
                                    paddingHorizontal: 18,
                                    borderRadius: 12,
                                    backgroundColor: "#fff",
                                }}
                            >
                                <Text
                                    style={{
                                        color: brandColor,
                                        fontWeight: "bold",
                                        fontSize: 13,
                                    }}
                                >
                                    Ditujukan Kepada :
                                </Text>
                                <Text
                                    style={{
                                        color: brandColor,
                                        marginTop: 6,
                                        fontSize: 12,
                                    }}
                                >
                                    {data.client?.name || "-"}
                                </Text>
                            </View>
                        </View>

                        <View
                            style={{
                                marginTop: 8,
                                marginBottom: 8,
                                borderRadius: 6,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: brandColor,
                                    paddingVertical: 6,
                                    paddingHorizontal: 6,
                                    borderTopLeftRadius: 6,
                                    borderTopRightRadius: 6,
                                }}
                            >
                                <View
                                    style={{
                                        flex: 4,
                                        paddingHorizontal: 6,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Deskripsi
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        paddingHorizontal: 6,
                                        alignItems: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Jumlah
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 2,
                                        paddingHorizontal: 6,
                                        alignItems: "flex-end",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Harga
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 2,
                                        paddingHorizontal: 6,
                                        alignItems: "flex-end",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Nominal
                                    </Text>
                                </View>
                            </View>

                            {data.items.map((item, idx) => (
                                <View
                                    key={idx}
                                    style={{
                                        flexDirection: "row",
                                        paddingVertical: 6,
                                        borderBottomWidth: 1,
                                        borderBottomColor: brandColor,
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 4,
                                            paddingHorizontal: 6,
                                        }}
                                    >
                                        <Text>{item.description}</Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            paddingHorizontal: 6,
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text>{String(item.quantity)}</Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 2,
                                            paddingHorizontal: 6,
                                            alignItems: "flex-end",
                                        }}
                                    >
                                        <Text>
                                            {formatCurrency(item.unitPrice)}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 2,
                                            paddingHorizontal: 6,
                                            alignItems: "flex-end",
                                        }}
                                    >
                                        <Text>
                                            {formatCurrency(
                                                item.quantity * item.unitPrice
                                            )}
                                        </Text>
                                    </View>
                                </View>
                            ))}

                            <View style={{ marginTop: 12 }}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginVertical: 4,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: "#111827",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Subtotal
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: "#111827",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {formatCurrency(result.subtotal)}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginVertical: 4,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: "#dc2626",
                                        }}
                                    >
                                        Diskon
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: "#dc2626",
                                        }}
                                    >
                                        -{formatCurrency(result.discountAmount)}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginVertical: 4,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: "#111827",
                                        }}
                                    >
                                        Pajak {data.taxRate}%
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: "#111827",
                                        }}
                                    >
                                        {formatCurrency(result.taxAmount)}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        height: 2,
                                        backgroundColor: hexToRgba(
                                            brandColor,
                                            0.16
                                        ),
                                        marginTop: 8,
                                        marginBottom: 8,
                                    }}
                                />

                                <View style={{ marginTop: 8 }}>
                                    <View
                                        style={{
                                            borderColor: brandColor,
                                            borderWidth: 1,
                                            padding: 10,
                                            borderRadius: 10,
                                            backgroundColor: "#fff",
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: brandColor,
                                                    fontSize: 18,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Total
                                            </Text>
                                            <Text
                                                style={{
                                                    color: brandColor,
                                                    fontSize: 20,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {formatCurrency(result.total)}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        marginTop: 10,
                                        alignItems: "center",
                                    }}
                                >
                                    <View
                                        style={{
                                            borderColor: brandColor,
                                            borderWidth: 2,
                                            paddingVertical: 8,
                                            paddingHorizontal: 20,
                                            borderRadius: 12,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: brandColor,
                                                fontSize: 15,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {data.status === "PAID"
                                                ? "LUNAS"
                                                : "Belum Dibayar"}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </>
                ) : (
                    // Minimal
                    <>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 10,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                {data.brand.logo ? (
                                    // eslint-disable-next-line jsx-a11y/alt-text
                                    <Image
                                        src={data.brand.logo}
                                        style={styles.logo}
                                    />
                                ) : null}
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {data.brand.name || "Nama Brand"}
                                    </Text>
                                    <Text style={styles.brandMeta}>
                                        {data.brand.location}
                                    </Text>
                                    <Text style={styles.brandMeta}>
                                        {data.brand.contact}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ alignItems: "flex-end" }}>
                                <Text
                                    style={{
                                        color: brandColor,
                                        fontWeight: "bold",
                                    }}
                                >
                                    {data.documentType}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "bold",
                                        color: "#111827",
                                    }}
                                >
                                    {data.invoiceNumber
                                        ? `#${data.invoiceNumber}`
                                        : "-"}
                                </Text>
                                <Text style={styles.smallText}>
                                    {data.issueDate
                                        ? formatDate(data.issueDate)
                                        : "-"}
                                </Text>
                                {data.documentType === "INVOICE" && (
                                    <Text
                                        style={[
                                            styles.smallText,
                                            { marginTop: 4 },
                                        ]}
                                    >
                                        Jatuh Tempo:{" "}
                                        {data.dueDate
                                            ? formatDate(data.dueDate)
                                            : "-"}
                                    </Text>
                                )}
                            </View>
                        </View>

                        <View style={{ marginTop: 8, marginBottom: 8 }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    color: brandColor,
                                }}
                            >
                                Ditujukan Kepada :
                            </Text>
                            <Text style={{ marginTop: 6 }}>
                                {data.client?.name || "-"}
                            </Text>
                        </View>

                        <View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    paddingVertical: 8,
                                    borderBottomWidth: 1,
                                    borderBottomColor: brandColor,
                                }}
                            >
                                <Text
                                    style={{
                                        flex: 4,
                                        fontWeight: "bold",
                                        color: brandColor,
                                    }}
                                >
                                    Deskripsi
                                </Text>
                                <Text style={{ flex: 1, textAlign: "center" }}>
                                    Jumlah
                                </Text>
                                <Text style={{ flex: 2, textAlign: "right" }}>
                                    Harga
                                </Text>
                                <Text style={{ flex: 2, textAlign: "right" }}>
                                    Nominal
                                </Text>
                            </View>

                            {data.items.map((item, idx) => (
                                <View
                                    key={idx}
                                    style={{
                                        flexDirection: "row",
                                        paddingVertical: 8,
                                        borderBottomWidth: 1,
                                        borderBottomColor: brandColor,
                                    }}
                                >
                                    <Text style={{ flex: 4 }}>
                                        {item.description}
                                    </Text>
                                    <Text
                                        style={{ flex: 1, textAlign: "center" }}
                                    >
                                        {String(item.quantity)}
                                    </Text>
                                    <Text
                                        style={{ flex: 2, textAlign: "right" }}
                                    >
                                        {formatCurrency(item.unitPrice)}
                                    </Text>
                                    <Text
                                        style={{ flex: 2, textAlign: "right" }}
                                    >
                                        {formatCurrency(
                                            item.quantity * item.unitPrice
                                        )}
                                    </Text>
                                </View>
                            ))}

                            <View style={{ marginTop: 12 }}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginVertical: 4,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Subtotal
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {formatCurrency(result.subtotal)}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginVertical: 4,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: "#dc2626",
                                        }}
                                    >
                                        Diskon
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: "#dc2626",
                                        }}
                                    >
                                        -{formatCurrency(result.discountAmount)}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginVertical: 4,
                                    }}
                                >
                                    <Text style={{ fontSize: 12 }}>
                                        Pajak {data.taxRate}%
                                    </Text>
                                    <Text style={{ fontSize: 12 }}>
                                        {formatCurrency(result.taxAmount)}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        height: 2,
                                        backgroundColor: hexToRgba(
                                            brandColor,
                                            0.16
                                        ),
                                        marginTop: 8,
                                        marginBottom: 8,
                                    }}
                                />

                                <View style={{ marginTop: 12 }}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: brandColor,
                                                fontSize: 16,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Total
                                        </Text>
                                        <Text
                                            style={{
                                                color: brandColor,
                                                fontSize: 18,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {formatCurrency(result.total)}
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            marginTop: 8,
                                            alignItems: "flex-end",
                                        }}
                                    >
                                        <View
                                            style={{
                                                paddingVertical: 6,
                                                paddingHorizontal: 14,
                                                borderRadius: 6,
                                                backgroundColor: "#e5e7eb",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: "#111827",
                                                    fontSize: 11,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {data.status === "PAID"
                                                    ? "LUNAS"
                                                    : "Belum Dibayar"}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </>
                )}

                {data.notes ? (
                    <View style={{ marginTop: 20 }}>
                        <Text
                            style={[styles.notesTitle, { color: brandColor }]}
                        >
                            CATATAN
                        </Text>
                        <View style={styles.notesBox}>
                            <Text style={{ fontSize: 10, color: "#111827" }}>
                                {data.notes}
                            </Text>
                        </View>
                    </View>
                ) : null}

                <View style={{ marginTop: 14 }}>
                    <Text
                        style={{
                            fontSize: 10,
                            color: "#6b7280",
                            textAlign: "center",
                        }}
                    >
                        Terimakasih Atas Kerjasamanya
                    </Text>
                </View>
            </Page>
        </Document>
    );
}
