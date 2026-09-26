import { Star } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

const REASONS = [
  "24/7 ready for the call",
  "Personalized Content",
  "Personalized Content",
  "Personalized Content",
  "Personalized Content",
  "Personalized Content",
];

/**
 * Presentational checklist card. Copy is static for now — swap REASONS
 * for real content once it's available.
 */
export function WhyBumpToBlissCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Why BUMP TO BLISS</Text>
      <Text style={styles.subtitle}>
        Learn about awesome and personalized experience we are providing in
        this app
      </Text>

      <View style={styles.list}>
        {REASONS.map((reason, index) => (
          <View key={`${reason}-${index}`} style={styles.row}>
            <Star size={20} color="#000000" strokeWidth={1.5} />
            <Text style={styles.reasonText}>{reason}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F5EFFF",
    borderRadius: 20,
    padding: 24,
  },
  heading: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000000",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "400",
    color: "#777777",
    marginTop: 8,
    marginBottom: 20,
  },
  list: {
    gap: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  reasonText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#000000",
  },
});
