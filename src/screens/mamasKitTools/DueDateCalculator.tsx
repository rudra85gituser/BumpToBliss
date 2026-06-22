"use client";

import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const METHODS = ["Last Period", "Conception Date", "Ultrasound Date"];

export default function DueDateCalculator() {
  const router = useRouter();
  const [method, setMethod] = useState("Last Period");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [cycleLength, setCycleLength] = useState("28");
  const [showMethodDropdown, setShowMethodDropdown] = useState(false);
  const [showCycleDropdown, setShowCycleDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const cycleLengths = Array.from({ length: 15 }, (_, index) =>
    (21 + index).toString(),
  );

  const handleCalculate = () => {
    if (!selectedDate) {
      alert("Please select a date");
      return;
    }

    const baseDate = new Date(selectedDate);
    const dueDate = new Date(baseDate);

    if (method === "Last Period") {
      dueDate.setDate(
        dueDate.getDate() + 280 + (Number.parseInt(cycleLength, 10) - 28),
      );
    } else if (method === "Conception Date") {
      dueDate.setDate(dueDate.getDate() + 266);
    } else if (method === "Ultrasound Date") {
      dueDate.setDate(dueDate.getDate() + 280);
    }

    const now = new Date();
    const diffMs = now.getTime() - baseDate.getTime();
    const weeksPregnant = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));

    const formattedDate = dueDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    router.push({
      pathname: "/tools/due-date-calculator/your-baby-due-date",
      params: {
        date: formattedDate,
        weeks: weeksPregnant.toString(),
      },
    });
  };

  return (
    <SafeAreaProvider style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Due Date Calculator</Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Description */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Choose from a variety of options for a prediction of your due date
          </Text>
        </View>

        {/* Method Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Method</Text>

          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setShowMethodDropdown(!showMethodDropdown)}
          >
            <Text style={styles.selectButtonText}>{method}</Text>
            <Text style={styles.selectArrow}>v</Text>
          </TouchableOpacity>

          {showMethodDropdown && (
            <View style={styles.dropdown}>
              {METHODS.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setMethod(item);
                    setShowMethodDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Date Picker */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            {method === "Last Period"
              ? "First Date of Last Period"
              : method === "Conception Date"
                ? "Date of Conception"
                : "Ultrasound Date"}
          </Text>

          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.selectButton}
          >
            <Text
              style={[
                styles.dateText,
                selectedDate ? styles.dateTextSelected : styles.dateTextEmpty,
              ]}
            >
              {selectedDate ? selectedDate.toDateString() : "Choose Date"}
            </Text>
            <Text style={styles.calendarIcon}>[]</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={(_, date) => {
                setShowDatePicker(Platform.OS === "ios");
                if (date) {
                  setSelectedDate(date);
                }
              }}
            />
          )}
        </View>

        {/* Cycle Length */}
        {method === "Last Period" && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Cycle length</Text>

            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setShowCycleDropdown(!showCycleDropdown)}
            >
              <Text style={styles.selectButtonText}>{cycleLength} days</Text>
              <Text style={styles.selectArrow}>v</Text>
            </TouchableOpacity>

            {showCycleDropdown && (
              <View style={styles.dropdown}>
                {cycleLengths.map((length) => (
                  <TouchableOpacity
                    key={length}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setCycleLength(length);
                      setShowCycleDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{length} days</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Calculate Button */}
        <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F7FB",
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
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  selectButtonText: {
    fontSize: 14,
    color: "#6b7280",
  },
  selectArrow: {
    fontSize: 12,
    color: "#9ca3af",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#1f2937",
  },
  dateText: {
    fontSize: 14,
  },
  dateTextSelected: {
    color: "#111827",
  },
  dateTextEmpty: {
    color: "#6b7280",
  },
  calendarIcon: {
    fontSize: 18,
  },
  calculateButton: {
    backgroundColor: "#20094D",
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  calculateButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
