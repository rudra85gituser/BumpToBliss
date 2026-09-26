import { Play } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type YoutubeVideoCardProps = {
  caption: string;
  onPress?: () => void;
};

/**
 * Presentational video teaser card. No thumbnail asset exists yet, so the
 * background is a solid placeholder instead of the Figma photo.
 */
export function YoutubeVideoCard({ caption, onPress }: YoutubeVideoCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={styles.playButton}>
        <Play size={22} color="#FFFFFF" fill="#FFFFFF" />
      </View>
      <Text style={styles.caption}>{caption}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 179,
    borderRadius: 16,
    backgroundColor: "#4A4A4A",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EB3434",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  caption: {
    position: "absolute",
    left: 16,
    bottom: 16,
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
  },
});
