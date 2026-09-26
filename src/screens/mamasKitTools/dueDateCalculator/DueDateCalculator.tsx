"use client";

import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { Calendar, ChevronDown, ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import dueDateIllustration from "@/src/assets/dueDateCalculator/due-date-illustration.png";
import { useAuth } from "@/src/context/AuthContext";
import { upsertUserProfile } from "@/src/services/userDataService";

const METHODS = ["Last Period", "Conception Date", "Ultrasound Date"];

type DueDateResult = {
  dueDate: Date;
  weeksPregnant: number;
};

export default function DueDateCalculator() {
  const router = useRouter();
  const { user } = useAuth();
  const [method, setMethod] = useState("Last Period");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [cycleLength, setCycleLength] = useState("28");
  const [showMethodDropdown, setShowMethodDropdown] = useState(false);
  const [showCycleDropdown, setShowCycleDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [result, setResult] = useState<DueDateResult | null>(null);

  const cycleLengths = Array.from({ length: 15 }, (_, index) =>
    (21 + index).toString(),
  );

  const handleCalculate = async () => {
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

    if (user) {
      await upsertUserProfile(user.id, {
        email: user.email,
        conception_date: baseDate.toISOString(),
        conception_day: baseDate.getDate(),
        conception_month: baseDate.getMonth(),
        conception_year: baseDate.getFullYear(),
        due_date: dueDate.toISOString(),
        pregnancy_weeks: weeksPregnant,
      });
    }

    setResult({ dueDate, weeksPregnant });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={22} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Due Date Calculator</Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.infoText}>
            Choose from a variety of options for a prediction of your due date
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Method</Text>

            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setShowMethodDropdown(!showMethodDropdown)}
            >
              <Text style={styles.selectButtonText}>{method}</Text>
              <ChevronDown size={18} color="#292D32" />
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
              <Calendar size={18} color="#292D32" />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={selectedDate || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "default"}
                onValueChange={(_event, date) => {
                  if (date) {
                    setSelectedDate(date);
                  }
                  if (Platform.OS === "android") {
                    setShowDatePicker(false);
                  }
                }}
                onDismiss={() => setShowDatePicker(false)}
              />
            )}
          </View>

          {method === "Last Period" && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Cycle Length</Text>

              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setShowCycleDropdown(!showCycleDropdown)}
              >
                <Text style={styles.selectButtonText}>{cycleLength} days</Text>
                <ChevronDown size={18} color="#292D32" />
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

          {result && (
            <View style={styles.resultSection}>
              <Text style={styles.resultHeading}>
                Your Due Date is  {result.dueDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Text>
              <Text style={styles.resultSubtext}>
                Congratulations! You are {Math.max(result.weeksPregnant, 0)} weeks pregnant.
              </Text>

              <View style={styles.resultBadgeWrap}>
                <Image
                  source={dueDateIllustration}
                  style={styles.resultIllustration}
                  resizeMode="contain"
                />
                <Text style={styles.resultMonth}>
                  {result.dueDate.toLocaleString("en-US", { month: "long" })}
                </Text>
                <View style={styles.resultBadge}>
                  <Text style={styles.resultDay}>{result.dueDate.getDate()}</Text>
                </View>
              </View>
            </View>
          )}

          <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
            <Text style={styles.calculateButtonText}>
              {result ? "Recalculate" : "Calculate"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  infoText: {
    fontSize: 12,
    color: "#494949",
    lineHeight: 18,
    marginBottom: 20,
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
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#00000021",
  },
  selectButtonText: {
    fontSize: 13,
    color: "#292D32",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#00000021",
    overflow: "hidden",
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  dropdownItemText: {
    fontSize: 13,
    color: "#292D32",
  },
  dateText: {
    fontSize: 13,
  },
  dateTextSelected: {
    color: "#292D32",
  },
  dateTextEmpty: {
    color: "#9CA3AF",
  },
  resultSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  resultHeading: {
    fontSize: 16,
    fontWeight: "500",
    color: "#292D32",
    textAlign: "center",
  },
  resultSubtext: {
    fontSize: 12,
    color: "#494949",
    textAlign: "center",
    marginTop: 8,
  },
  resultBadgeWrap: {
    width: 240,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  resultIllustration: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  resultMonth: {
    fontFamily: "Praise",
    fontSize: 34,
    color: "#4CA2A3",
  },
  resultBadge: {
    width: 91,
    height: 91,
    borderRadius: 45.5,
    backgroundColor: "rgba(235, 248, 237, 0.6)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  resultDay: {
    fontFamily: "Praise",
    fontSize: 48,
    color: "#4CA2A3",
  },
  calculateButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#20094D",
    borderRadius: 14,
  },
  calculateButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
