"use client";

import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Activity = {
  id: string;
  title: string;
  duration: string;
  done: boolean;
};

const initialActivities: Activity[] = [
  { id: "1", title: "Morning walk", duration: "20 min", done: true },
  { id: "2", title: "Prenatal stretching", duration: "10 min", done: false },
  { id: "3", title: "Breathing practice", duration: "8 min", done: false },
  { id: "4", title: "Rest break", duration: "30 min", done: true },
];

export default function DailyActivities() {
  const router = useRouter();
  const [activities, setActivities] = useState(initialActivities);

  const completedCount = activities.filter((activity) => activity.done).length;

  const toggleActivity = (id: string) => {
    setActivities(
      activities.map((activity) =>
        activity.id === id ? { ...activity, done: !activity.done } : activity
      )
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <ChevronLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Activities</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Today's progress</Text>
          <Text style={styles.summaryText}>
            {completedCount} of {activities.length} activities completed
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(completedCount / activities.length) * 100}%` },
              ]}
            />
          </View>
        </View>

        <View style={styles.listCard}>
          {activities.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={styles.activityRow}
              onPress={() => toggleActivity(activity.id)}
              activeOpacity={0.8}
            >
              <View style={[styles.checkbox, activity.done && styles.checkboxDone]}>
                {activity.done && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDuration}>{activity.duration}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#eef8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  headerButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  content: {
    padding: 18,
    paddingBottom: 120,
  },
  summaryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  summaryText: {
    marginTop: 6,
    fontSize: 13,
    color: "#6b7280",
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#e5e7eb",
    marginTop: 14,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: "#4aaeb0",
  },
  listCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 8,
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 14,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#cfd8dc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkboxDone: {
    backgroundColor: "#b3a5ff",
    borderColor: "#b3a5ff",
  },
  checkmark: {
    color: "#ffffff",
    fontWeight: "800",
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  activityDuration: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 3,
  },
});
