"use client";

import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function JournalNewEntry() {
  const router = useRouter();
  const [newEntry, setNewEntry] = useState({
    title: "",
    date: "",
    mood: "",
    notes: "",
    image: "",
  });

  const moodOptions = [
    { label: "Calm", emoji: "ðŸ˜Œ" },
    { label: "Happy", emoji: "ðŸ˜Š" },
    { label: "Sad", emoji: "ðŸ˜¢" },
    { label: "Anxious", emoji: "ðŸ˜°" },
    { label: "Angry", emoji: "ðŸ˜¡" },
    { label: "Worried", emoji: "ðŸ˜Ÿ" },
    { label: "Meh", emoji: "ðŸ˜‘" },
    { label: "Custom", emoji: "âž•" },
  ];

  const handleSaveEntry = () => {
    if (!newEntry.title || !newEntry.date || !newEntry.mood) {
      alert("Please fill all required fields");
      return;
    }
    router.back();
  };

  return (
    <SafeAreaProvider style={styles.provider}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Journal Entry</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Form */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Title</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="Peaceful day with baby"
            value={newEntry.title}
            onChangeText={(text) => setNewEntry({ ...newEntry, title: text })}
          />
        </View>

        {/* Date */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Date</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="2 November, 2025"
            value={newEntry.date}
            onChangeText={(text) => setNewEntry({ ...newEntry, date: text })}
          />
        </View>

        {/* Mood */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Mood</Text>
          <View style={styles.moodGrid}>
            {moodOptions.map((mood, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.moodButton,
                  newEntry.mood === mood.emoji && styles.moodButtonActive,
                ]}
                onPress={() => setNewEntry({ ...newEntry, mood: mood.emoji })}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={styles.moodLabel}>{mood.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notes */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Notes</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Write something..."
            value={newEntry.notes}
            onChangeText={(text) => setNewEntry({ ...newEntry, notes: text })}
            multiline
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveEntry}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
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
  headerSpacer: {
    width: 24,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  fieldInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
  },
  moodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  moodButton: {
    width: "22%",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#F9FAFB",
  },
  moodButtonActive: {
    backgroundColor: "#D1E7DD",
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 11,
    color: "#6b7280",
    textAlign: "center",
  },
  notesInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    minHeight: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#2D1B4E",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
