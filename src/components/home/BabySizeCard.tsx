import { LinearGradient } from "expo-linear-gradient";
import { Sparkle } from "lucide-react-native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import babyInWombIllustration from "@/src/assets/home/photos/baby-in-womb.png";

type BabySizeCardProps = {
  babyName: string;
  sizeLabel?: string;
  onKnowMore?: () => void;
};

/**
 * Presentational weekly baby-size card. Copy passes through from the Home
 * screen; the size comparison is static for now (a full week-by-week
 * fruit comparison would need its own dataset and illustration per fruit).
 * The illustration sits in a circular masked container (same #D3CAFF
 * bordered-circle treatment as the Bloom screen's baby illustration) rather
 * than a raw rectangular image, and both it and the card share the
 * gradient's overflow: hidden so nothing bleeds past the rounded card edge.
 */
export function BabySizeCard({
  babyName,
  sizeLabel = "a mango",
  onKnowMore,
}: BabySizeCardProps) {
  return (
    <LinearGradient
      colors={["#A5E1AD", "#4CA2A3", "#20094D"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.textColumn}>
        <Text style={styles.message}>{`${babyName} is the size of ${sizeLabel}`}</Text>
        <TouchableOpacity
          style={styles.knowMoreButton}
          onPress={onKnowMore}
          activeOpacity={0.8}
        >
          <Text style={styles.knowMoreText}>Know More</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.illustrationMask}>
        <Image
          source={babyInWombIllustration}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>

      <Sparkle style={styles.star1} size={12} color="#FFDC7C" fill="#FFDC7C" />
      <Sparkle style={styles.star2} size={16} color="#FFDC7C" fill="#FFDC7C" />
      <Sparkle style={styles.star3} size={6} color="#FFDC7C" fill="#FFDC7C" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    paddingLeft: 18,
    paddingRight: 130,
    paddingVertical: 18,
    height: 108,
    justifyContent: "center",
    overflow: "hidden",
  },
  textColumn: {
    gap: 12,
  },
  message: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  knowMoreButton: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  knowMoreText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2B2424",
  },
  illustrationMask: {
    position: "absolute",
    width: 156,
    height: 156,
    borderRadius: 78,
    top: -24,
    right: -22,
    borderWidth: 1,
    borderColor: "#D3CAFF",
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  illustration: {
    width: "100%",
    height: "100%",
  },
  star1: {
    position: "absolute",
    top: 88,
    right: 119,
  },
  star2: {
    position: "absolute",
    top: 2,
    right: 109,
  },
  star3: {
    position: "absolute",
    top: 16,
    right: 128,
  },
});
