import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import pregnantWomanPortrait from "@/src/assets/home/photos/woman-is-smiling-wearing-yellow-dress-while-she-is-pregnant.png";

type PregnancyPromoCardProps = {
  message: string;
  onBookAppointment?: () => void;
};

/**
 * Presentational promo card. The book-appointment action passes through
 * from the Home screen.
 */
export function PregnancyPromoCard({
  message,
  onBookAppointment,
}: PregnancyPromoCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.textColumn}>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={onBookAppointment}
          activeOpacity={0.8}
        >
          <Text style={styles.bookButtonText}>Book an Appointment</Text>
        </TouchableOpacity>
      </View>
      <Image source={pregnantWomanPortrait} style={styles.photo} resizeMode="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#A5E1AD",
    borderRadius: 14,
    overflow: "hidden",
    height: 118,
  },
  textColumn: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 18,
    paddingRight: 8,
    gap: 12,
  },
  message: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(43, 36, 36, 0.92)",
  },
  bookButton: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 23,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  bookButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(43, 36, 36, 0.92)",
  },
  photo: {
    width: 140,
    height: "100%",
  },
});
