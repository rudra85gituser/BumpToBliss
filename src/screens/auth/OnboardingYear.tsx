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

export default function OnboardingYear() {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState(2025);
  const [babyName, setBabyName] = useState("");
  const [startYear, setStartYear] = useState(2020);

  const years = Array.from({ length: 12 }, (_, index) => startYear + index);

  const handlePrevious = () => {
    if (startYear > 2000) {
      setStartYear(startYear - 12);
    }
  };

  const handleNextYears = () => {
    setStartYear(startYear + 12);
  };

  const handleNext = () => {
    if (babyName) {
      router.push("/");
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
          <Text style={styles.subHeading}>Select the year of conceive</Text>

          {/* Navigation */}
          <View style={styles.navigationRow}>
            <TouchableOpacity onPress={handlePrevious} activeOpacity={0.7}>
              <Text style={styles.navigationText}>{"<"} Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextYears} activeOpacity={0.7}>
              <Text style={styles.navigationText}>Next {">"}</Text>
            </TouchableOpacity>
          </View>

          {/* Year Grid */}
          <View style={styles.yearGrid}>
            {years.map((year) => (
              <TouchableOpacity
                key={year}
                onPress={() => setSelectedYear(year)}
                activeOpacity={0.7}
                style={[
                  styles.yearButton,
                  selectedYear === year && styles.yearButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.yearButtonText,
                    selectedYear === year && styles.yearButtonTextActive,
                  ]}
                >
                  {year}
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
    marginBottom: 20,
  },
  navigationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  navigationText: {
    fontSize: 13,
    color: "#999",
    fontWeight: "600",
  },
  yearGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  yearButton: {
    width: "23%",
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#f5f5f5",
  },
  yearButtonActive: {
    borderColor: "#a8d5a8",
    backgroundColor: "#a8d5a8",
  },
  yearButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  yearButtonTextActive: {
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
