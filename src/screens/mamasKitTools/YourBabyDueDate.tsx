import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function YourBabyDueDate() {
  const router = useRouter();
  const { weeks, date } = useLocalSearchParams();

  // Ensure date is a single string
  const parsedDate = Array.isArray(date) ? date[0] : date;
  const dueDate = parsedDate ? new Date(parsedDate) : null;

  const isValidDate = dueDate && !isNaN(dueDate.getTime());

  return (
    <SafeAreaProvider style={styles.provider}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Your Babyâ€™s Due Date</Text>

        <View style={styles.headerSpacer} />
      </View>

      {/* Body */}
      <View style={styles.body}>
        {/* Due Date Text */}
        <Text style={styles.dueDateText}>
          {isValidDate ? `Your Due Date is ${dueDate.toDateString()}` : null}
        </Text>

        {/* Weeks Pregnant */}
        <Text style={styles.weeksText}>
          Congratulations! You are {weeks || "some"} weeks pregnant.
        </Text>

        {/* Only show card if date is valid */}
        {isValidDate && (
          <View style={styles.dateCard}>
            <Text style={styles.monthText}>
              {dueDate.toLocaleString("en-US", { month: "long" })}
            </Text>

            <Text style={styles.dayText}>{dueDate.getDate()}</Text>
          </View>
        )}

        {/* Recalculate Button */}
        <TouchableOpacity
          onPress={() => router.push("../due-date-calculator")}
          style={styles.recalculateButton}
        >
          <Text style={styles.recalculateButtonText}>Recalculate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  provider: {
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
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  dueDateText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },
  weeksText: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 40,
    textAlign: "center",
  },
  dateCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 50,
    marginBottom: 40,
    elevation: 2,
  },
  monthText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#20094D",
    textAlign: "center",
  },
  dayText: {
    fontSize: 48,
    fontWeight: "900",
    color: "#20094D",
    textAlign: "center",
  },
  recalculateButton: {
    backgroundColor: "#20094D",
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 60,
  },
  recalculateButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
