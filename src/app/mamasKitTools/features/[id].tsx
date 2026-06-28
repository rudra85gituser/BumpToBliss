"use client";

import { useLocalSearchParams, useRouter } from "expo-router";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import DueDateCalculator from "../../../screens/mamasKitTools/dueDateCalculator/DueDateCalculator";
import Journal from "../../../screens/mamasKitTools/jounral/Journal";
import TravelChecklist from "../../../screens/mamasKitTools/travelCheckList/TravelChecklist";

const featureDetails: Record<string, { title: string; description: string }> = {
  "due-date-calculator": {
    title: "Due Date Calculator",
    description:
      "Calculate your estimated due date based on your last menstrual period.",
  },
  journal: {
    title: "Journal",
    description:
      "Keep track of your pregnancy journey with daily journal entries.",
  },
  "baby-kick-counter": {
    title: "Baby Kick Counter",
    description: "Monitor your baby's movements and track kick counts.",
  },
  "contraction-timer": {
    title: "Contraction Timer",
    description: "Track and time your contractions during labor.",
  },
  "food-tracking": {
    title: "Food Tracking",
    description: "Log your meals and track your nutrition during pregnancy.",
  },
  "water-intake": {
    title: "Water In-take",
    description: "Stay hydrated by tracking your daily water consumption.",
  },
  "daily-activities": {
    title: "Daily Activities",
    description: "Track your daily activities and exercises during pregnancy.",
  },
  "baby-name-list": {
    title: "Baby Name List",
    description: "Create and manage your list of potential baby names.",
  },
  "bumpy-gallery": {
    title: "Bumpy Gallery",
    description: "Capture and store your pregnancy journey photos.",
  },
  "travel-checklist": {
    title: "Travel Checklist",
    description: "Prepare for travel with a comprehensive pregnancy checklist.",
  },
};

export default function FeatureDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const renderFeatureComponent = () => {
    switch (id) {
      case "due-date-calculator":
        return <DueDateCalculator />;
      case "journal":
        return <Journal />;
      case "baby-kick-counter":
        return <BabyKickCounter />;
      case "contraction-timer":
        return <ContractionTimer />;
      case "water-intake":
        return <WaterInTake />;
      case "baby-name-list":
        return <BabyNameList />;
      case "bumpy-gallery":
        return <BumpyGallery />;
      case "travel-checklist":
        return <TravelChecklist />;
      default:
        return (
          <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundText}>Feature not found</Text>
          </View>
        );
    }
  };

  return (
    <Modal
      transparent
      visible
      animationType="fade"
      onRequestClose={() => router.back()}
    >
      <Pressable style={styles.backdrop} onPress={() => router.back()} />

      <View style={styles.modalContainer}>{renderFeatureComponent()}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 16,
    color: "#6b7280",
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});
