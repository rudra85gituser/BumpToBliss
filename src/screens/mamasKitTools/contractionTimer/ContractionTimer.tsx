"use client";

import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
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

  const getIntensityLabel = (value: number) => {
    if (value < 33) return "Low";
    if (value < 66) return "Medium";
    return "High";
  };

  const formatClockTime = (date: Date) => {
    const hours24 = date.getHours();
    const hours12 = hours24 % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours24 < 12 ? "AM" : "PM";
    return `${hours12}:${minutes}${period}`;
  };

  const handleStart = () => {
    if (isRunning) {
      // Save the entry
      const now = new Date();
      const newEntry: ContractionEntry = {
        id: Date.now().toString(),
        duration: `${time}s`,
        date: now.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "2-digit",
        }),
        time: `${formatClockTime(now)} - ${formatClockTime(now)}`,
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

          <View style={styles.timerCard}>
            {/* Intensity Slider */}
            <View style={styles.sliderGroup}>
              <Text style={styles.label}>Intensity</Text>
              <View style={styles.sliderContainer}>
                <Text style={styles.sliderLabel}>Low</Text>
                <View style={styles.sliderTrackWrapper}>
                  <View style={styles.sliderBaseTrack} />
                  <LinearGradient
                    colors={["#4CAF50", "#FFC107", "#F44336"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.sliderFillTrack, { width: `${intensity}%` }]}
                  />
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    value={intensity}
                    onValueChange={setIntensity}
                    disabled={isRunning}
                    minimumTrackTintColor="transparent"
                    maximumTrackTintColor="transparent"
                    thumbTintColor="#20094D"
                  />
                </View>
                <Text style={styles.sliderLabel}>High</Text>
              </View>
            </View>

            {/* Timer Display */}
            <View style={styles.timerDisplay}>
              <Text style={styles.timerText}>{formatTime(time)}</Text>
            </View>

            {/* Start/Stop Button */}
            <View style={styles.startButtonRow}>
              <TouchableOpacity
                style={[styles.startButton, isRunning && styles.stopButton]}
                onPress={handleStart}
              >
                <Text style={styles.startButtonText}>{isRunning ? "Stop" : "Start"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Contractions */}
          <View style={styles.recentSection}>
            <Text style={styles.recentTitle}>Recent</Text>
            <View style={styles.entriesHeaderRow}>
              <Text style={[styles.entriesHeaderText, styles.entriesHeaderDuration]}>Duration</Text>
              <Text style={[styles.entriesHeaderText, styles.entriesHeaderDate]}>Date</Text>
              <Text style={[styles.entriesHeaderText, styles.entriesHeaderTime]}>Start & End Time</Text>
              <Text style={[styles.entriesHeaderText, styles.entriesHeaderIntensity]}>Intensity</Text>
            </View>
            <View style={styles.entriesContainer}>
              {entries.map((entry) => (
                <View key={entry.id} style={styles.entryRow}>
                  <Text style={[styles.entryCellText, styles.entryDuration]} numberOfLines={1}>
                    {entry.duration}
                  </Text>
                  <Text style={[styles.entryCellText, styles.entryDate]} numberOfLines={1}>
                    {entry.date}
                  </Text>
                  <Text style={[styles.entryCellText, styles.entryTime]} numberOfLines={1}>
                    {entry.time}
                  </Text>
                  <View style={styles.entryIntensityCell}>
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
                      <Text
                        style={[
                          styles.intensityText,
                          entry.intensity === "High"
                            ? styles.intensityTextHigh
                            : entry.intensity === "Medium"
                              ? styles.intensityTextMedium
                              : styles.intensityTextLow,
                        ]}
                        numberOfLines={1}
                      >
                        {entry.intensity}
                      </Text>
                    </View>
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
  card: { backgroundColor: "#ffffff", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 24, marginBottom: 16 },
  infoText: { fontSize: 14, color: "#6b7280", lineHeight: 20, marginBottom: 16 },
  timerCard: { backgroundColor: "#EBF8ED", borderRadius: 16, padding: 24, marginBottom: 24 },
  sliderGroup: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: "600", color: "#1f2937", marginBottom: 8 },
  sliderContainer: { flexDirection: "row", alignItems: "center", gap: 12 },
  sliderLabel: { fontSize: 12, color: "#9ca3af" },
  sliderTrackWrapper: { flex: 1, justifyContent: "center" },
  sliderBaseTrack: { position: "absolute", left: 0, right: 0, height: 6, borderRadius: 14, backgroundColor: "#D9D9D9" },
  sliderFillTrack: { position: "absolute", left: 0, height: 6, borderRadius: 14 },
  slider: { width: "100%", height: 8 },
  timerDisplay: { alignItems: "center", marginBottom: 24 },
  timerText: { fontSize: 48, fontWeight: "700", color: "#1f2937", letterSpacing: 4 },
  startButtonRow: { alignItems: "center" },
  startButton: { backgroundColor: "#20094D", borderRadius: 34, paddingVertical: 12, paddingHorizontal: 26, alignItems: "center" },
  stopButton: { backgroundColor: "#dc2626" },
  startButtonText: { fontSize: 16, fontWeight: "600", color: "#ffffff" },
  recentSection: { marginBottom: 16 },
  recentTitle: { fontSize: 14, fontWeight: "600", color: "#1f2937", marginBottom: 12 },
  entriesHeaderRow: { flexDirection: "row", paddingLeft: 8, marginBottom: 8 },
  entriesHeaderText: { fontSize: 10, fontWeight: "400", color: "#555555" },
  entriesHeaderDuration: { width: 30 },
  entriesHeaderDate: { width: 62, marginLeft: 12 },
  entriesHeaderTime: { width: 112, marginLeft: 12 },
  entriesHeaderIntensity: { width: 60, marginLeft: 12, textAlign: "right" },
  entriesContainer: { gap: 16 },
  entryRow: { flexDirection: "row", alignItems: "center", paddingLeft: 8 },
  entryCellText: { fontSize: 11, color: "#1f2937" },
  entryDuration: { width: 30 },
  entryDate: { width: 62, marginLeft: 12 },
  entryTime: { width: 112, marginLeft: 12 },
  entryIntensityCell: { width: 60, marginLeft: 12, alignItems: "flex-end" },
  intensityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  intensityHigh: { backgroundColor: "#FADADA" },
  intensityMedium: { backgroundColor: "#FBEFC5" },
  intensityLow: { backgroundColor: "#D9F2DA" },
  intensityText: { fontSize: 12, fontWeight: "600" },
  intensityTextHigh: { color: "#E0554A" },
  intensityTextMedium: { color: "#B98B1F" },
  intensityTextLow: { color: "#4CAF50" },
});
