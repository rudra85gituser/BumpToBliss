import { Play } from "lucide-react-native";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type ContentVideoItem = {
  id: number;
  title: string;
  thumbnailUrl?: string | null;
  isVideo?: boolean;
};

type ContentVideoRowProps = {
  heading: string;
  items: ContentVideoItem[];
  onViewAll?: () => void;
  onSelectItem?: (id: number) => void;
};

/**
 * Presentational horizontal content row (used for "Activities for Baby
 * Development" and "Daily Read"). Data and navigation pass through from
 * the Bloom screen.
 */
export function ContentVideoRow({
  heading,
  items,
  onViewAll,
  onSelectItem,
}: ContentVideoRowProps) {
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
              <View style={styles.thumbnailWrap}>
                {item.thumbnailUrl && (
                  <Image
                    source={{ uri: item.thumbnailUrl }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                  />
                )}
                {item.isVideo && (
                  <View style={styles.playOverlay}>
                    <View style={styles.playButton}>
                      <Play size={14} color="#FFFFFF" fill="#FFFFFF" />
                    </View>
                  </View>
                )}
              </View>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyCardText}>No content yet</Text>
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
    width: 150,
  },
  thumbnailWrap: {
    width: 150,
    height: 110,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#EEF5F5",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  emptyCard: {
    width: 150,
    height: 110,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyCardText: {
    fontSize: 11,
    color: "#9CA3AF",
    textAlign: "center",
  },
  playOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "500",
    color: "#1F2937",
  },
});
