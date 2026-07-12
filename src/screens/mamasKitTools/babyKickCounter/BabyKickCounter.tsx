"use client";

import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface KickEntry {
  id: string;
  kicks: number;
  duration: string;
  dateTime: string;
}

const mockKickData: KickEntry[] = [
  { id: "1", kicks: 6, duration: "1 min", dateTime: "20 Nov 2025  4:05PM" },
  { id: "2", kicks: 6, duration: "1 min", dateTime: "20 Nov 2025  4:05PM" },
  { id: "3", kicks: 6, duration: "1 min", dateTime: "20 Nov 2025  4:05PM" },
  { id: "4", kicks: 6, duration: "1 min", dateTime: "20 Nov 2025  4:05PM" },
  { id: "5", kicks: 6, duration: "1 min", dateTime: "20 Nov 2025  4:05PM" },
  { id: "6", kicks: 6, duration: "1 min", dateTime: "20 Nov 2025  4:05PM" },
  { id: "7", kicks: 8, duration: "1 min", dateTime: "20 Nov 2025  4:05PM" },
  { id: "8", kicks: 6, duration: "1 min", dateTime: "20 Nov 2025  4:05PM" },
  { id: "9", kicks: 6, duration: "1 min", dateTime: "20 Nov 2025  4:05PM" },
  { id: "10", kicks: 6, duration: "1 min", dateTime: "20 Nov 2025  4:05PM" },
];

export default function BabyKickCounter() {
  const router = useRouter();
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [date, setDate] = useState("20 Nov, 25");
  const [notes, setNotes] = useState("");
  const [entries, setEntries] = useState<KickEntry[]>(mockKickData);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleSave = () => {
    const newEntry: KickEntry = {
      id: Date.now().toString(),
      kicks: 6,
      duration: "1 min",
      dateTime: `${date}  ${endTime ? endTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : ""}`,
    };
    setEntries([newEntry, ...entries]);
    setShowNewEntry(false);
    setStartTime(null);
    setEndTime(null);
    setDate("20 Nov, 25");
    setNotes("");
  };

  const formatTime = (date: Date | null) => {
    if (!date) return "Select Time";
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  };

  if (showNewEntry) {
    return (
      <SafeAreaProvider style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowNewEntry(false)} style={styles.backButton}>
            <Text style={styles.backButtonText}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Baby Kick Counter</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.infoText}>
              After your third trimester begin, you will need to record your baby kick counts to learn about your baby's movement & patterns
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Start Time</Text>
              <TouchableOpacity
                onPress={() => setShowStartTimePicker(true)}
                style={styles.input}
              >
                <Text style={startTime ? styles.inputText : styles.placeholderText}>
                  {formatTime(startTime)}
                </Text>
              </TouchableOpacity>
              {showStartTimePicker && (
                <DateTimePicker
                  value={startTime || new Date()}
                  mode="time"
                  display={Platform.OS === "ios" ? "default" : "default"}
                  onChange={(_, selectedDate) => {
                    setShowStartTimePicker(Platform.OS === "ios");
                    if (selectedDate) {
                      setStartTime(selectedDate);
                    }
                  }}
                />
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>End Time</Text>
              <TouchableOpacity
                onPress={() => setShowEndTimePicker(true)}
                style={styles.input}
              >
                <Text style={endTime ? styles.inputText : styles.placeholderText}>
                  {formatTime(endTime)}
                </Text>
              </TouchableOpacity>
              {showEndTimePicker && (
                <DateTimePicker
                  value={endTime || new Date()}
                  mode="time"
                  display={Platform.OS === "ios" ? "default" : "default"}
                  onChange={(_, selectedDate) => {
                    setShowEndTimePicker(Platform.OS === "ios");
                    if (selectedDate) {
                      setEndTime(selectedDate);
                    }
                  }}
                />
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date</Text>
              <TextInput
                value={date}
                onChangeText={setDate}
                placeholder="20 Nov, 25"
                placeholderTextColor="#9ca3af"
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="No. of Kicks"
                placeholderTextColor="#9ca3af"
                style={[styles.input, styles.textArea]}
                multiline
                numberOfLines={4}
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Baby kicks</Text>
        <TouchableOpacity
          onPress={() => setShowNewEntry(true)}
          style={styles.newEntryButton}
        >
          <Text style={styles.newEntryButtonText}>New Entry</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Kicks</Text>
            <Text style={styles.tableHeaderText}>Duration</Text>
            <Text style={styles.tableHeaderText}>Date & Time</Text>
          </View>
          {entries.map((entry) => (
            <View key={entry.id} style={styles.tableRow}>
              <Text style={styles.tableCellText}>{entry.kicks}</Text>
              <Text style={styles.tableCellText}>{entry.duration}</Text>
              <Text style={styles.tableCellText}>{entry.dateTime}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F6F7FB" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 12, backgroundColor: "#ffffff" },
  backButton: { width: 24, height: 24, justifyContent: "center", alignItems: "center" },
  backButtonText: { fontSize: 24, fontWeight: "600", color: "#000" },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#000" },
  headerSpacer: { width: 24 },
  newEntryButton: { backgroundColor: "#14b8a6", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  newEntryButtonText: { color: "#ffffff", fontSize: 14, fontWeight: "600" },
  contentContainer: { padding: 16 },
  card: { backgroundColor: "#ffffff", borderRadius: 12, padding: 24, marginBottom: 16 },
  infoText: { fontSize: 14, color: "#6b7280", lineHeight: 20, marginBottom: 24 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: "#1f2937", marginBottom: 8 },
  input: { backgroundColor: "#ffffff", borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: "#e5e7eb" },
  inputText: { fontSize: 14, color: "#1f2937" },
  placeholderText: { fontSize: 14, color: "#9ca3af" },
  textArea: { height: 96, textAlignVertical: "top" },
  saveButton: { backgroundColor: "#20094D", borderRadius: 12, paddingVertical: 16, alignItems: "center", marginTop: 8 },
  saveButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
  tableCard: { backgroundColor: "#ffffff", borderRadius: 12, overflow: "hidden" },
  tableHeader: { flexDirection: "row", backgroundColor: "#f3f4f6", paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#e5e7eb" },
  tableHeaderText: { flex: 1, fontSize: 14, fontWeight: "600", color: "#1f2937" },
  tableRow: { flexDirection: "row", paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#e5e7eb" },
  tableCellText: { flex: 1, fontSize: 14, color: "#1f2937" },
});
