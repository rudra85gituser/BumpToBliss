"use client";

import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/src/context/AuthContext";
import { addUserRecord } from "@/src/services/userDataService";

const moodOptions = ["Calm", "Happy", "Sad", "Anxious", "Angry", "Worried", "Meh"];

export default function JournalNewEntry() {
  const router = useRouter();
  const { user } = useAuth();
  const [newEntry, setNewEntry] = useState({
    title: "",
    date: new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    mood: "",
    notes: "",
  });

  const handleSaveEntry = async () => {
    if (!newEntry.title.trim() || !newEntry.date.trim() || !newEntry.mood) {
      Alert.alert("Missing details", "Please fill all required fields.");
      return;
    }

    if (!user) return;

    await addUserRecord(user.id, "journal_entries", {
      id: Date.now().toString(),
      title: newEntry.title.trim(),
      date: newEntry.date.trim(),
      mood: newEntry.mood,
      notes: newEntry.notes.trim(),
      created_at: new Date().toISOString(),
    });

    router.back();
  };

  return (
    <SafeAreaView style={styles.provider}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Journal Entry</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Title</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="Peaceful day with baby"
            value={newEntry.title}
            onChangeText={(text) => setNewEntry({ ...newEntry, title: text })}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Date</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="Monday, Nov 2, 2025"
            value={newEntry.date}
            onChangeText={(text) => setNewEntry({ ...newEntry, date: text })}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Mood</Text>
          <View style={styles.moodGrid}>
            {moodOptions.map((mood) => (
              <TouchableOpacity
                key={mood}
                style={[
                  styles.moodButton,
                  newEntry.mood === mood && styles.moodButtonActive,
                ]}
                onPress={() => setNewEntry({ ...newEntry, mood })}
              >
                <Text style={styles.moodLabel}>{mood}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

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

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveEntry}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
    width: "31%",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#F9FAFB",
  },
  moodButtonActive: {
    backgroundColor: "#D1E7DD",
  },
  moodLabel: {
    fontSize: 12,
    color: "#374151",
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
