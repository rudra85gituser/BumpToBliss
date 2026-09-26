"use client";

import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Calendar, ChevronLeft, Paperclip, Plus } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { JournalEntry, MOOD_OPTIONS } from "@/src/constants/journal";
import { useAuth } from "@/src/context/AuthContext";
import {
  addUserRecord,
  getUserCollection,
  updateUserRecord,
} from "@/src/services/userDataService";

export default function JournalNewEntry() {
  const router = useRouter();
  const { user } = useAuth();
  const { id: editingId } = useLocalSearchParams<{ id?: string }>();
  const isEditing = !!editingId;

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
    image: null as string | null,
  });
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [isCustomMood, setIsCustomMood] = useState(false);
  const [customMoodText, setCustomMoodText] = useState("");

  useEffect(() => {
    if (!user || !editingId) return;

    getUserCollection<JournalEntry>(user.id, "journal_entries").then((entries) => {
      const existing = entries.find((entry) => entry.id === editingId);
      if (!existing) return;

      setNewEntry({
        title: existing.title,
        date: existing.date,
        mood: existing.mood,
        notes: existing.notes,
        image: existing.image ?? null,
      });

      const isKnownMood = MOOD_OPTIONS.some((option) => option.label === existing.mood);
      if (!isKnownMood && existing.mood) {
        setIsCustomMood(true);
        setCustomMoodText(existing.mood);
      }
    });
  }, [user, editingId]);

  const handleSelectMood = (mood: string) => {
    setIsCustomMood(false);
    setNewEntry({ ...newEntry, mood });
  };

  const handleSelectCustomMood = () => {
    setIsCustomMood(true);
    setNewEntry({ ...newEntry, mood: customMoodText });
  };

  const handleCustomMoodChange = (text: string) => {
    setCustomMoodText(text);
    setNewEntry({ ...newEntry, mood: text });
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Please allow photo library access to add an image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      setNewEntry({ ...newEntry, image: asset.uri });
      setImageFileName(asset.fileName ?? asset.uri.split("/").pop() ?? "Image selected");
    }
  };

  const handleSaveEntry = async () => {
    if (!newEntry.title.trim() || !newEntry.date.trim() || !newEntry.mood.trim()) {
      Alert.alert("Missing details", "Please fill all required fields.");
      return;
    }

    if (!user) return;

    if (isEditing && editingId) {
      await updateUserRecord<JournalEntry>(user.id, "journal_entries", editingId, {
        title: newEntry.title.trim(),
        date: newEntry.date.trim(),
        mood: newEntry.mood.trim(),
        notes: newEntry.notes.trim(),
        image: newEntry.image,
      });
    } else {
      await addUserRecord(user.id, "journal_entries", {
        id: Date.now().toString(),
        title: newEntry.title.trim(),
        date: newEntry.date.trim(),
        mood: newEntry.mood.trim(),
        notes: newEntry.notes.trim(),
        image: newEntry.image,
        created_at: new Date().toISOString(),
      });
    }

    router.back();
  };

  return (
    <SafeAreaView style={styles.provider}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditing ? "Edit Journal Entry" : "New Journal Entry"}
        </Text>
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
            placeholderTextColor="#9CA3AF"
            value={newEntry.title}
            onChangeText={(text) => setNewEntry({ ...newEntry, title: text })}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Date</Text>
          <View style={styles.fieldInputRow}>
            <TextInput
              style={styles.fieldInputRowText}
              placeholder="Monday, Nov 2, 2025"
              placeholderTextColor="#9CA3AF"
              value={newEntry.date}
              onChangeText={(text) => setNewEntry({ ...newEntry, date: text })}
            />
            <Calendar size={18} color="#6b7280" />
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Mood</Text>
          <View style={styles.moodGrid}>
            {MOOD_OPTIONS.map((option) => {
              const isSelected = !isCustomMood && newEntry.mood === option.label;
              return (
                <TouchableOpacity
                  key={option.label}
                  style={[styles.moodPill, isSelected && styles.moodPillActive]}
                  onPress={() => handleSelectMood(option.label)}
                >
                  <Text style={styles.moodEmoji}>{option.emoji}</Text>
                  <Text style={styles.moodLabel}>{option.label}</Text>
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              style={[styles.moodPill, isCustomMood && styles.moodPillActive]}
              onPress={handleSelectCustomMood}
            >
              <View style={styles.moodCustomIcon}>
                <Plus size={14} color="#4CA2A3" />
              </View>
              <Text style={styles.moodLabel}>Custom</Text>
            </TouchableOpacity>
          </View>

          {isCustomMood && (
            <TextInput
              style={styles.customMoodInput}
              placeholder="Describe how you feel"
              placeholderTextColor="#9CA3AF"
              value={customMoodText}
              onChangeText={handleCustomMoodChange}
              autoFocus
            />
          )}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Add Image</Text>
          <TouchableOpacity style={styles.fieldInputRow} onPress={handlePickImage}>
            <Text
              style={[styles.fieldInputRowText, !imageFileName && styles.fieldInputPlaceholder]}
              numberOfLines={1}
            >
              {imageFileName ?? "Choose a photo"}
            </Text>
            <Paperclip size={18} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Notes</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Write something..."
            placeholderTextColor="#9CA3AF"
            value={newEntry.notes}
            onChangeText={(text) => setNewEntry({ ...newEntry, notes: text })}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveEntry}>
          <Text style={styles.saveButtonText}>{isEditing ? "Update" : "Save"}</Text>
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
    color: "#242425",
    marginBottom: 8,
  },
  fieldInput: {
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#00000021",
    paddingHorizontal: 16,
    fontSize: 13,
    color: "#0F0F10",
  },
  fieldInputRow: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#00000021",
    paddingHorizontal: 16,
  },
  fieldInputRowText: {
    flex: 1,
    fontSize: 13,
    color: "#0F0F10",
  },
  fieldInputPlaceholder: {
    color: "#9CA3AF",
  },
  moodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  moodPill: {
    minWidth: 64,
    minHeight: 64,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  moodPillActive: {
    backgroundColor: "#D1E7DD",
    borderColor: "#4CA2A3",
  },
  moodEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  moodCustomIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#E7F4F4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 10,
    color: "#374151",
    textAlign: "center",
  },
  customMoodInput: {
    height: 44,
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#00000021",
    paddingHorizontal: 16,
    fontSize: 13,
    color: "#0F0F10",
  },
  notesInput: {
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#00000021",
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 13,
    color: "#0F0F10",
    textAlignVertical: "top",
  },
  saveButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#20094D",
    borderRadius: 14,
    marginBottom: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
