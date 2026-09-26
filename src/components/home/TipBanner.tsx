import type { LucideIcon } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Defs, FeGaussianBlur, Filter } from "react-native-svg";

type TipBannerProps = {
  message: string;
  tagLabel: string;
  tagColor: string;
  paperShadowColor: string;
  Icon: LucideIcon;
};

/**
 * Presentational tip banner. Copy, colours, and icon pass through from the
 * Home screen so the same shape covers every tip card. The sticky-note tag
 * is built from real measurements/colours taken from Figma (two slightly
 * rotated paper layers + an icon badge) rather than an exported image,
 * since the source illustration is a many-layer hand-drawn graphic that
 * isn't practical to export as a single flattened asset. The glow behind
 * it reproduces the exported Ellipse 7.svg exactly (same circle +
 * feGaussianBlur), since React Native has no built-in blurred-shape
 * primitive.
 */
export function TipBanner({
  message,
  tagLabel,
  tagColor,
  paperShadowColor,
  Icon,
}: TipBannerProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.banner}>
        <Text style={styles.message}>{message}</Text>
      </View>

      <Svg style={styles.glow} width={201} height={258} viewBox="0 0 201 258">
        <Defs>
          <Filter id="glowBlur" x="-100%" y="-100%" width="400%" height="400%">
            <FeGaussianBlur in="SourceGraphic" stdDeviation={46.4} />
          </Filter>
        </Defs>
        <Circle cx={128.8} cy={128.8} r={36} fill="#FFB76E" filter="url(#glowBlur)" />
      </Svg>

      <View style={[styles.paperBack, { backgroundColor: paperShadowColor }]} />
      <View style={styles.paperFront}>
        <View style={[styles.badge, { backgroundColor: tagColor }]}>
          <Icon size={16} color="#FFFFFF" />
        </View>
        <Text style={[styles.tagText, { color: tagColor }]} numberOfLines={2}>
          {tagLabel}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  banner: {
    backgroundColor: "#20094D",
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    paddingRight: 90,
    minHeight: 74,
    justifyContent: "center",
  },
  message: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  glow: {
    position: "absolute",
    top: -91,
    right: -12,
  },
  paperBack: {
    position: "absolute",
    top: -14,
    right: 15,
    width: 70,
    height: 70,
    borderRadius: 8,
    transform: [{ rotate: "-8deg" }],
  },
  paperFront: {
    position: "absolute",
    top: -18,
    right: 12,
    width: 74,
    height: 74,
    borderRadius: 10,
    backgroundColor: "#FFFEFB",
    borderWidth: 1,
    borderColor: "#7B2612",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    transform: [{ rotate: "4deg" }],
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -22,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 12,
  },
});
