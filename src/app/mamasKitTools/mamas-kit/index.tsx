import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FeatureCard from "../../../screens/mamasKitTools/FeatureCard";
// Update the import path to match the actual location and casing of the tools file
// Update the import path to match the actual location and casing of the tools file
import { tools } from "../../../constants/tools";

const features = [
  {
    id: "due-date-calculator",
    title: "Due Date Calculator",
    image: tools.dueDateCalculator,
    badge: false,
  },
  {
    id: "journal",
    title: "Journal",
    image: tools.journal,
    badge: false,
  },
  {
    id: "baby-kick-counter",
    title: "Baby Kick Counter",
    image: tools.babyKickCounter,
    badge: false,
  },
  {
    id: "food-tracking",
    title: "Food Tracking",
    image: tools.foodTracking,
    badge: true,
  },
  {
    id: "water-intake",
    title: "Water In-take",
    image: tools.waterIntake,
    badge: false,
  },
  {
    id: "daily-activities",
    title: "Daily Activities",
    image: tools.dailyActivities,
    badge: true,
  },
  {
    id: "baby-name-list",
    title: "Baby Name List",
    image: tools.babyNameList,
    badge: true,
  },
  {
    id: "travel-checklist",
    title: "Travel Checklist",
    image: tools.travelChecklist,
    badge: true,
  },
];

export default function MamasKitScreen() {
  const router = useRouter();

  const handleCardPress = (featureId: string) => {
    if (featureId === "due-date-calculator") {
      router.push("/tools/due-date-calculator");
    } else if (featureId === "journal") {
      router.push("/tools/journal");
    } else {
      router.push(`/tools/features/${featureId}`);
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mama's Kit</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {features.map((feature) => (
            <View key={feature.id} style={styles.gridItem}>
              <FeatureCard
                {...({
                  title: feature.title,
                  image: feature.image,
                  badge: feature.badge,
                  onPress: () => handleCardPress(feature.id),
                } as any)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
  },
  backButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  headerSpacer: {
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    marginBottom: 16,
  },
});
