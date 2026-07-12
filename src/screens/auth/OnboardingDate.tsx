"use client";

import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export default function OnboardingDate() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(16);
  const [babyName, setBabyName] = useState("");

  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  const handleNext = () => {
    if (babyName) {
      router.push("/auth/choose-month");
    }
  };

  return (
    <SafeAreaProvider>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Heading */}
          <Text style={styles.heading}>Let's Make this more personalized</Text>
          <Text style={styles.subHeading}>Select the day of conceive</Text>

          {/* Calendar Header */}
          <Text style={styles.calendarTitle}>July 2025</Text>

          {/* Days of Week Header */}
          <View style={styles.weekHeader}>
            {WEEK_DAYS.map((day, index) => (
              <Text key={`${day}-${index}`} style={styles.weekDay}>
                {day}
              </Text>
            ))}
          </View>

          {/* Calendar Grid */}
          <View style={styles.calendarGrid}>
            {days.map((day) => (
              <TouchableOpacity
                key={day}
                onPress={() => setSelectedDate(day)}
                activeOpacity={0.7}
                style={[
                  styles.dayButton,
                  selectedDate === day && styles.dayButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.dayButtonText,
                    selectedDate === day && styles.dayButtonTextActive,
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Baby Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name of baby</Text>
            <TextInput
              placeholder="ex - amy"
              placeholderTextColor="#999"
              value={babyName}
              onChangeText={setBabyName}
              style={styles.input}
            />
          </View>

          {/* Next Button */}
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
  },
  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  weekDay: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
    width: "14.28%",
    textAlign: "center",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 24,
  },
  dayButton: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  dayButtonActive: {
    backgroundColor: "#a8d5a8",
    borderRadius: 8,
  },
  dayButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  dayButtonTextActive: {
    fontWeight: "600",
    color: "white",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: "#000",
  },
  primaryButton: {
    backgroundColor: "#1a0033",
    borderRadius: 12,
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
