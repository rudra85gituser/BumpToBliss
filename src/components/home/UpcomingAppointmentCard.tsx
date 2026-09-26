import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View } from "react-native";

import stethoscopeIcon from "@/src/assets/home/icons/stethoscope.png";

type UpcomingAppointmentCardProps = {
  date: string;
};

/**
 * Presentational card. Appointment date passes through from the Home screen
 * so this stays free of scheduling logic.
 */
export function UpcomingAppointmentCard({ date }: UpcomingAppointmentCardProps) {
  return (
    <LinearGradient
      colors={["#4CA2A3", "#A5E1AD"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Upcoming Appointment</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <Image source={stethoscopeIcon} style={styles.icon} resizeMode="contain" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 74,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(71, 61, 61, 0.12)",
    paddingHorizontal: 18,
    justifyContent: "center",
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  date: {
    fontSize: 12,
    fontWeight: "400",
    color: "#FFFFFF",
    marginTop: 6,
  },
  icon: {
    width: 49,
    height: 49,
  },
});
