"use client";

import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { journal } from "@/src/constants/journal";

type JournalEntry = {
  id: string;
  date: string;
  title: string;
  mood: string;
  image?: any;
  notes: string;
};

export default function Journal() {
  const router = useRouter();
  const [entries] = useState<JournalEntry[]>([
    {
      id: "1",
      date: "Monday, 2 Nov, 2025",
      title: "Peaceful day with baby",
      mood: "ðŸ˜Š",
      image: journal.journalImage,
      notes:
        "As an AI, I don't have real-time access to IMDb's rankings, and my training only goes up until September 2021. However, I can provide:",
    },
  ]);

  return (
    <SafeAreaProvider style={styles.provider}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Journal</Text>

        <TouchableOpacity
          onPress={() => router.push("/mamasKitTools/journal/new-entry")}
          style={styles.newEntryButton}
        >
          <Text style={styles.newEntryButtonText}>New Entry</Text>
        </TouchableOpacity>
      </View>

      {/* Journal Entries */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {entries.map((entry) => (
          <View key={entry.id} style={styles.entryCard}>
            {/* Date and Edit Icon */}
            <View style={styles.entryHeader}>
              <Text style={styles.entryDate}>{entry.date}</Text>
              <TouchableOpacity>
                <Text style={styles.editText}>âœï¸</Text>
              </TouchableOpacity>
            </View>

            {/* Image */}
            {entry.image && <Image source={entry.image} style={styles.entryImage} />}

            {/* Title and Notes */}
            <View style={styles.entryContent}>
              <Text style={styles.entryTitle}>{entry.title}</Text>
              <Text style={styles.entryNotes}>{entry.notes}</Text>
            </View>

            {/* Mood */}
            <View style={styles.moodBadge}>
              <Text style={styles.moodText}>{entry.mood}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
  newEntryButton: {
    backgroundColor: "#4CA2A3",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  newEntryButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  entryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  entryDate: {
    fontSize: 13,
    fontWeight: "500",
    backgroundColor: "#F5F7F8",
    color: "#1B1B1B",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editText: {
    fontSize: 18,
  },
  entryImage: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
  },
  entryContent: {
    marginBottom: 12,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 6,
  },
  entryNotes: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 18,
  },
  moodBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#F5F7F8",
    borderRadius: 20,
    padding: 6,
  },
  moodText: {
    fontSize: 20,
  },
});
