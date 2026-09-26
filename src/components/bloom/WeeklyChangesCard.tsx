import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type WeeklyChangeItem = {
  id: number;
  title: string;
  description?: string | null;
  thumbnailUrl?: string | null;
};

type WeeklyChangesCardProps = {
  heading: string;
  items: WeeklyChangeItem[];
  onSelectItem?: (id: number) => void;
};

/**
 * Presentational card (used for "Major Changes (Current Week)" and
 * "Weekly Symptoms"). Data and navigation pass through from the Bloom
 * screen.
 */
export function WeeklyChangesCard({
  heading,
  items,
  onSelectItem,
}: WeeklyChangesCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>{heading}</Text>

      {items.length > 0 ? (
        items.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.row, index > 0 && styles.rowDivider]}
            activeOpacity={0.75}
            onPress={() => onSelectItem?.(item.id)}
          >
            <View style={styles.thumbnailWrap}>
              {item.thumbnailUrl && (
                <Image
                  source={{ uri: item.thumbnailUrl }}
                  style={styles.thumbnail}
                  resizeMode="cover"
                />
              )}
            </View>
            <View style={styles.textColumn}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              {!!item.description && (
                <Text style={styles.itemDescription} numberOfLines={2}>
                  {item.description}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.row}>
          <View style={styles.emptyThumbnail} />
          <Text style={styles.itemDescription}>No updates yet</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 24,
    backgroundColor: "#EEF5F5",
    borderRadius: 16,
    padding: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
  },
  rowDivider: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.06)",
  },
  thumbnailWrap: {
    width: 56,
    height: 56,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  emptyThumbnail: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
  },
  textColumn: {
    flex: 1,
    gap: 4,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1F2937",
  },
  itemDescription: {
    fontSize: 11,
    fontWeight: "400",
    color: "#777777",
  },
});
