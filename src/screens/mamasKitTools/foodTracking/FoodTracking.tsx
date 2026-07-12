"use client";

import { ChevronLeft, Plus, Trash2 } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FoodEntry = {
  id: string;
  meal: string;
  food: string;
  time: string;
};

const initialEntries: FoodEntry[] = [
  { id: "1", meal: "Breakfast", food: "Oats, banana and milk", time: "8:30 AM" },
  { id: "2", meal: "Lunch", food: "Dal, rice and salad", time: "1:15 PM" },
];

export default function FoodTracking() {
  const router = useRouter();
  const [entries, setEntries] = useState(initialEntries);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [meal, setMeal] = useState("Snack");
  const [food, setFood] = useState("");
  const [time, setTime] = useState("4:00 PM");

  const handleSave = () => {
    if (!food.trim()) return;

    setEntries([
      { id: Date.now().toString(), meal, food: food.trim(), time },
      ...entries,
    ]);
    setFood("");
    setMeal("Snack");
    setTime("4:00 PM");
    setShowNewEntry(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <ChevronLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Food Tracking</Text>
        <TouchableOpacity onPress={() => setShowNewEntry(true)} style={styles.newButton}>
          <Text style={styles.newButtonText}>New Entry</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Today</Text>
          {entries.map((entry) => (
            <View key={entry.id} style={styles.entryRow}>
              <View style={styles.mealIcon}>
                <Text style={styles.mealIconText}>{entry.meal.charAt(0)}</Text>
              </View>
              <View style={styles.entryContent}>
                <Text style={styles.entryMeal}>{entry.meal}</Text>
                <Text style={styles.entryFood}>{entry.food}</Text>
                <Text style={styles.entryTime}>{entry.time}</Text>
              </View>
              <TouchableOpacity
                onPress={() => setEntries(entries.filter((item) => item.id !== entry.id))}
                style={styles.deleteButton}
              >
                <Trash2 size={16} color="#ef4444" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal visible={showNewEntry} animationType="slide">
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setShowNewEntry(false)} style={styles.headerButton}>
              <ChevronLeft size={22} color="#111827" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>New Food Entry</Text>
            <View style={styles.headerButton} />
          </View>
          <View style={styles.formCard}>
            <Text style={styles.label}>Meal</Text>
            <TextInput style={styles.input} value={meal} onChangeText={setMeal} />
            <Text style={styles.label}>Food</Text>
            <TextInput
              style={styles.input}
              value={food}
              onChangeText={setFood}
              placeholder="What did you eat?"
              placeholderTextColor="#9ca3af"
            />
            <Text style={styles.label}>Time</Text>
            <TextInput style={styles.input} value={time} onChangeText={setTime} />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Plus size={18} color="#ffffff" />
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
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
  newButton: {
    backgroundColor: "#4aaeb0",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
  newButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },
  content: {
    padding: 18,
    paddingBottom: 120,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    minHeight: 420,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  entryRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eef2f2",
  },
  mealIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#e7f7ed",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  mealIconText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#32936f",
  },
  entryContent: {
    flex: 1,
  },
  entryMeal: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  entryFood: {
    fontSize: 13,
    color: "#4b5563",
    marginTop: 3,
  },
  entryTime: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 3,
  },
  deleteButton: {
    padding: 8,
  },
  formCard: {
    margin: 18,
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#ffffff",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: "#111827",
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 8,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#25075b",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});
