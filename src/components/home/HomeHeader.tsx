import { LinearGradient } from "expo-linear-gradient";
import { Bot } from "lucide-react-native";
import { Image, StyleSheet, Text, View } from "react-native";

import avatarPhoto from "@/src/assets/profile/home-profile-image.png";
import handWaveIcon from "@/src/assets/home/icons/hand-wave.png";

type HomeHeaderProps = {
  name: string;
  dueInWeeks: number | null;
};

/**
 * Presentational greeting row. Name and due-week count pass through from
 * the Home screen, keeping profile/pregnancy data fetching out of the UI.
 */
export function HomeHeader({ name, dueInWeeks }: HomeHeaderProps) {
  return (
    <View style={styles.row}>
      <View>
        <View style={styles.greetingRow}>
          <Image source={handWaveIcon} style={styles.handIcon} />
          <Text style={styles.greeting}>{`Hello, ${name}`}</Text>
        </View>
        <Text style={styles.dueText}>
          {dueInWeeks !== null ? `Due in ${dueInWeeks} Weeks` : "Set your due date"}
        </Text>
      </View>

      <View style={styles.rightGroup}>
        <View style={styles.assistantWrapper}>
          <LinearGradient
            colors={["#F5EFFF", "#EFE7D3", "#F8C0C8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0.4 }}
            style={styles.assistantChip}
          >
            <Bot size={20} color="#BC94DB" />
            <Text style={styles.assistantText}>Mom&apos;s Assistant</Text>
          </LinearGradient>
          <View style={styles.aiBadge}>
            <Text style={styles.aiBadgeText}>AI</Text>
          </View>
        </View>

        <Image source={avatarPhoto} style={styles.avatar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  handIcon: {
    width: 18,
    height: 18,
  },
  greeting: {
    fontSize: 14,
    fontWeight: "500",
    color: "#292D32",
  },
  dueText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#292D32",
    marginTop: 3,
  },
  rightGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  assistantWrapper: {
    position: "relative",
  },
  assistantChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#CDC1FF",
  },
  assistantText: {
    fontSize: 10,
    fontWeight: "400",
    color: "#000000",
  },
  aiBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#E5D9F2",
    borderWidth: 1,
    borderColor: "#CDC1FF",
    alignItems: "center",
    justifyContent: "center",
  },
  aiBadgeText: {
    fontSize: 8,
    color: "#2B2B2B",
  },
});
