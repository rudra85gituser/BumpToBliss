"use client";

import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import DailyActivities from "@/src/screens/mamasKitTools/dailyActivities/DailyActivities";
import FoodTracking from "@/src/screens/mamasKitTools/foodTracking/FoodTracking";
import TravelChecklist from "@/src/screens/mamasKitTools/travelCheckList/TravelChecklist";

export default function FeatureDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  switch (id) {
    case "food-tracking":
      return <FoodTracking />;
    case "daily-activities":
      return <DailyActivities />;
    case "travel-checklist":
      return <TravelChecklist />;
    default:
      return (
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Feature will be implemented later.</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eef8f8",
    padding: 24,
  },
  notFoundText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
});
