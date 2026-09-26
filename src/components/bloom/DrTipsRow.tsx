import { Heart, Send } from "lucide-react-native";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type DrTipItem = {
  id: number;
  title: string;
  thumbnailUrl?: string | null;
};

type DrTipsRowProps = {
  heading: string;
  items: DrTipItem[];
  accentColor: string;
  onViewAll?: () => void;
  onLike?: (id: number) => void;
  onShare?: (id: number) => void;
};

/**
 * Presentational horizontal content row for "Dr. Tips". Data and
 * navigation pass through from the Bloom screen; accentColor mirrors the
 * Baby (teal) / Mom (purple) accent already used across this screen.
 */
export function DrTipsRow({
  heading,
  items,
  accentColor,
  onViewAll,
  onLike,
  onShare,
}: DrTipsRowProps) {
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
            <View key={item.id} style={styles.card}>
              <View style={styles.thumbnailWrap}>
                {item.thumbnailUrl && (
                  <Image
                    source={{ uri: item.thumbnailUrl }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                  />
                )}
              </View>

              <View style={styles.iconRow}>
                <TouchableOpacity
                  onPress={() => onLike?.(item.id)}
                  hitSlop={8}
                  activeOpacity={0.7}
                >
                  <Heart size={16} color={accentColor} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onShare?.(item.id)}
                  hitSlop={8}
                  activeOpacity={0.7}
                >
                  <Send size={16} color="#292D32" />
                </TouchableOpacity>
              </View>

              <Text style={styles.cardTitle} numberOfLines={2}>
                {item.title}
              </Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyCardText}>No tips yet</Text>
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
  },
  thumbnailWrap: {
    width: 170,
    height: 140,
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
    width: 170,
    height: 140,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyCardText: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 2,
  },
  cardTitle: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "400",
    color: "#1F2937",
  },
});
