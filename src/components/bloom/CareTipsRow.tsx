import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type CareTipItem = {
  id: number;
  title: string;
  thumbnailUrl?: string | null;
};

type CareTipsRowProps = {
  heading: string;
  items: CareTipItem[];
  onViewAll?: () => void;
  onSelectItem?: (id: number) => void;
};

/**
 * Presentational horizontal content row for "Extra Care Tips" / "Mom's
 * Fitness" / "Healthy Meals" — image card with a translucent caption pill
 * overlaid at the bottom. Data and navigation pass through from the Bloom
 * screen.
 */
export function CareTipsRow({
  heading,
  items,
  onViewAll,
  onSelectItem,
}: CareTipsRowProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headingRow}>
        <Text style={styles.heading}>{heading}</Text>
        <TouchableOpacity onPress={onViewAll} activeOpacity={0.7}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {items.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}
        >
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => onSelectItem?.(item.id)}
            >
              {item.thumbnailUrl && (
                <Image
                  source={{ uri: item.thumbnailUrl }}
                  style={styles.thumbnail}
                  resizeMode="cover"
                />
              )}
              <View style={styles.captionPill}>
                <Text style={styles.captionText} numberOfLines={2}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={[styles.card, styles.emptyCard]}>
          <Text style={styles.emptyCardText}>Coming soon</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  headingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  viewAll: {
    fontSize: 12,
    fontWeight: "400",
    color: "#777777",
    textDecorationLine: "underline",
  },
  row: {
    gap: 12,
  },
  card: {
    width: 170,
    height: 128,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#EEF5F5",
    borderWidth: 1,
    borderColor: "rgba(71, 61, 61, 0.12)",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  emptyCard: {
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyCardText: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
  },
  captionPill: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(203, 231, 232, 0.85)",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  captionText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1F2937",
  },
});
