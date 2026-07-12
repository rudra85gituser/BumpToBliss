"use client";

import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface ContractionEntry {
  id: string;
  duration: string;
  date: string;
  time: string;
  intensity: "High" | "Medium" | "Low";
}

const mockContractionData: ContractionEntry[] = [
  { id: "1", duration: "6s", date: "20 Nov 25", time: "4:05PM - 4:05PM", intensity: "High" },
  { id: "2", duration: "6s", date: "20 Nov 25", time: "4:05PM - 4:05PM", intensity: "Medium" },
  { id: "3", duration: "6s", date: "20 Nov 25", time: "4:05PM - 4:05PM", intensity: "Low" },
  { id: "4", duration: "6s", date: "20 Nov 25", time: "4:05PM - 4:05PM", intensity: "High" },
  { id: "5", duration: "6s", date: "20 Nov 25", time: "4:05PM - 4:05PM", intensity: "High" },
];

export default function ContractionTimer() {
  const router = useRouter();
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [intensity, setIntensity] = useState(50);
  const [entries, setEntries] = useState<ContractionEntry[]>(mockContractionData);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const getIntensityColor = (value: number) => {
    if (value < 33) return "#4CAF50"; // Green - Low
    if (value < 66) return "#FFC107"; // Orange - Medium
    return "#F44336"; // Red - High
  };

  const getIntensityLabel = (value: number) => {
    if (value < 33) return "Low";
    if (value < 66) return "Medium";
    return "High";
  };

  const handleStart = () => {
    if (isRunning) {
      // Save the entry
      const newEntry: ContractionEntry = {
        id: Date.now().toString(),
        duration: `${time}s`,
        date: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "2-digit",
        }),
        time:
          new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) +
          " - " +
          new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        intensity: getIntensityLabel(intensity) as "High" | "Medium" | "Low",
      };
      setEntries([newEntry, ...entries]);
      setTime(0);
      setIntensity(50);
    }
    setIsRunning(!isRunning);
  };

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contraction Timer</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.infoText}>
            Start contraction timer to calculate the duration of your contraction
          </Text>

          {/* Intensity Slider */}
          <View style={styles.sliderGroup}>
            <Text style={styles.label}>Intensity</Text>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>Low</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={intensity}
                onValueChange={setIntensity}
                disabled={isRunning}
                minimumTrackTintColor="#4CAF50"
                maximumTrackTintColor="#F44336"
                thumbTintColor="#20094D"
              />
              <Text style={styles.sliderLabel}>High</Text>
            </View>
          </View>

          {/* Timer Display */}
          <View style={styles.timerDisplay}>
            <Text style={styles.timerText}>{formatTime(time)}</Text>
          </View>

          {/* Start/Stop Button */}
          <TouchableOpacity
            style={[styles.startButton, isRunning && styles.stopButton]}
            onPress={handleStart}
          >
            <Text style={styles.startButtonText}>{isRunning ? "Stop" : "Start"}</Text>
          </TouchableOpacity>

          {/* Recent Contractions */}
          <View style={styles.recentSection}>
            <Text style={styles.recentTitle}>Recent</Text>
            <View style={styles.entriesContainer}>
              {entries.map((entry) => (
                <View key={entry.id} style={styles.entryRow}>
                  <View style={styles.entryInfo}>
                    <Text style={styles.entryDuration}>{entry.duration}</Text>
                    <Text style={styles.entryDate}>{entry.date}</Text>
                    <Text style={styles.entryTime}>{entry.time}</Text>
                  </View>
                  <View
                    style={[
                      styles.intensityBadge,
                      entry.intensity === "High"
                        ? styles.intensityHigh
                        : entry.intensity === "Medium"
                          ? styles.intensityMedium
                          : styles.intensityLow,
                    ]}
                  >
                    <Text style={styles.intensityText}>{entry.intensity}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F6F7FB" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 12, backgroundColor: "#ffffff" },
  backButton: { width: 24, height: 24, justifyContent: "center", alignItems: "center" },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#000" },
  headerSpacer: { width: 24 },
  contentContainer: { padding: 16 },
  card: { backgroundColor: "#ffffff", borderRadius: 12, padding: 24, marginBottom: 16 },
  infoText: { fontSize: 14, color: "#6b7280", lineHeight: 20, marginBottom: 24 },
  sliderGroup: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: "600", color: "#1f2937", marginBottom: 8 },
  sliderContainer: { flexDirection: "row", alignItems: "center", gap: 12 },
  sliderLabel: { fontSize: 12, color: "#9ca3af" },
  slider: { flex: 1, height: 8 },
  timerDisplay: { backgroundColor: "#f0fdf4", borderRadius: 12, padding: 32, alignItems: "center", marginBottom: 24 },
  timerText: { fontSize: 48, fontWeight: "700", color: "#1f2937", letterSpacing: 4 },
  startButton: { backgroundColor: "#20094D", borderRadius: 24, paddingVertical: 16, alignItems: "center", marginBottom: 24 },
  stopButton: { backgroundColor: "#dc2626" },
  startButtonText: { fontSize: 16, fontWeight: "600", color: "#ffffff" },
  recentSection: { marginBottom: 16 },
  recentTitle: { fontSize: 14, fontWeight: "600", color: "#1f2937", marginBottom: 12 },
  entriesContainer: { gap: 8, maxHeight: 256 },
  entryRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f3f4f6", borderRadius: 8, padding: 12 },
  entryInfo: { flex: 1 },
  entryDuration: { fontSize: 12, color: "#9ca3af", marginBottom: 4 },
  entryDate: { fontSize: 14, color: "#1f2937", marginBottom: 2 },
  entryTime: { fontSize: 12, color: "#9ca3af" },
  intensityBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  intensityHigh: { backgroundColor: "#F44336" },
  intensityMedium: { backgroundColor: "#FFC107" },
  intensityLow: { backgroundColor: "#4CAF50" },
  intensityText: { fontSize: 12, fontWeight: "600", color: "#ffffff" },
});
