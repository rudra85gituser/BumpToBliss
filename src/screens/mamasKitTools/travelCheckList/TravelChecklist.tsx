"use client";

import { useRouter } from "expo-router";
import { ChevronLeft, Edit2, Image as ImageIcon, Plus, Trash2, X } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

interface ChecklistCategory {
  id: string;
  name: string;
  emoji: string;
  color: string;
  items: ChecklistItem[];
}

const defaultCategories: ChecklistCategory[] = [
  {
    id: "1",
    name: "Hospital Checklist",
    emoji: "🏥",
    color: "#8bd4d0",
    items: [
      { id: "1-1", label: "Clothes", checked: false },
      { id: "1-2", label: "Bottle/ Flask", checked: true },
      { id: "1-3", label: "Baby Clothes", checked: false },
      { id: "1-4", label: "Bottle/ Flask", checked: true },
      { id: "1-5", label: "Baby Clothes", checked: false },
    ],
  },
  {
    id: "2",
    name: "Travel Checklist",
    emoji: "🧳",
    color: "#98d7d2",
    items: [
      { id: "2-1", label: "Passport", checked: false },
      { id: "2-2", label: "Travel Documents", checked: false },
      { id: "2-3", label: "Medications", checked: false },
      { id: "2-4", label: "Insurance Cards", checked: false },
    ],
  },
];

export default function TravelChecklist() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [categories, setCategories] = useState<ChecklistCategory[]>(defaultCategories);
  const [newItemText, setNewItemText] = useState("");
  const [editingItem, setEditingItem] = useState<{ categoryId: string; itemId: string; label: string } | null>(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleToggleItem = (categoryId: string, itemId: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              ),
            }
          : cat
      )
    );
  };

  const handleAddItem = (categoryId: string) => {
    if (!newItemText.trim()) return;
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: [
                ...cat.items,
                {
                  id: `${categoryId}-${Date.now()}`,
                  label: newItemText.trim(),
                  checked: false,
                },
              ],
            }
          : cat
      )
    );
    setNewItemText("");
    setShowNewEntry(false);
  };

  const handleDeleteItem = (categoryId: string, itemId: string) => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setCategories(
            categories.map((cat) =>
              cat.id === categoryId
                ? { ...cat, items: cat.items.filter((item) => item.id !== itemId) }
                : cat
            )
          );
        },
      },
    ]);
  };

  const handleEditItem = (categoryId: string, itemId: string, newLabel: string) => {
    if (!newLabel.trim()) return;
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId ? { ...item, label: newLabel.trim() } : item
              ),
            }
          : cat
      )
    );
    setEditingItem(null);
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    const newCategory: ChecklistCategory = {
      id: Date.now().toString(),
      name: newCategoryName.trim(),
      emoji: "📋",
      color: "#8bd4d0",
      items: [],
    };
    setCategories([...categories, newCategory]);
    setNewCategoryName("");
    setShowAddCategory(false);
  };

  const handleDeleteCategory = (categoryId: string) => {
    Alert.alert("Delete Category", "Are you sure you want to delete this category?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setCategories(categories.filter((cat) => cat.id !== categoryId));
        },
      },
    ]);
  };

  const currentCategory = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)
    : null;

  if (selectedCategory && currentCategory) {
    const checkedCount = currentCategory.items.filter((i) => i.checked).length;

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSelectedCategory(null)} style={styles.headerButton}>
            <ChevronLeft size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{currentCategory.name}</Text>
          <TouchableOpacity
            onPress={() => setShowNewEntry(!showNewEntry)}
            style={styles.newEntryButton}
          >
            <Text style={styles.newEntryButtonText}>New Entry</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>{currentCategory.name}</Text>
            <View style={[styles.heroImage, { backgroundColor: currentCategory.color }]}>
              <Text style={styles.heroEmoji}>{currentCategory.emoji}</Text>
              <Text style={styles.heroText}>{currentCategory.name}</Text>
            </View>

            <View style={styles.progressCard}>
              <Text style={styles.progressText}>
                {checkedCount} of {currentCategory.items.length} completed
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: currentCategory.items.length
                        ? `${(checkedCount / currentCategory.items.length) * 100}%`
                        : "0%",
                    },
                  ]}
                />
              </View>
            </View>

            {showNewEntry && (
              <View style={styles.addForm}>
                <TextInput
                  style={styles.input}
                  placeholder="Start writing"
                  value={newItemText}
                  onChangeText={setNewItemText}
                  onSubmitEditing={() => handleAddItem(currentCategory.id)}
                  autoFocus
                />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddItem(currentCategory.id)}
                >
                  <Plus size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            )}

            {currentCategory.items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <TouchableOpacity
                  onPress={() => handleToggleItem(currentCategory.id, item.id)}
                  style={[styles.checkbox, item.checked && styles.checkboxChecked]}
                >
                  {item.checked && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
                {editingItem?.itemId === item.id ? (
                  <TextInput
                    style={styles.editInput}
                    value={editingItem.label}
                    onChangeText={(text) => setEditingItem({ ...editingItem, label: text })}
                    onSubmitEditing={() => handleEditItem(currentCategory.id, item.id, editingItem.label)}
                    onBlur={() => setEditingItem(null)}
                    autoFocus
                  />
                ) : (
                  <Text style={[styles.itemText, item.checked && styles.itemTextChecked]}>
                    {item.label}
                  </Text>
                )}
                <TouchableOpacity
                  onPress={() => setEditingItem({ categoryId: currentCategory.id, itemId: item.id, label: item.label })}
                  style={styles.itemAction}
                >
                  <Edit2 size={15} color="#6b7280" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteItem(currentCategory.id, item.id)}
                  style={styles.itemAction}
                >
                  <Trash2 size={15} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ))}

            {currentCategory.items.length === 0 && (
              <View style={styles.emptyState}>
                <ImageIcon size={28} color="#4aaeb0" />
                <Text style={styles.emptyText}>No items yet. Add your first item.</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <ChevronLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Travel Checklist</Text>
        <TouchableOpacity onPress={() => setShowAddCategory(true)} style={styles.newEntryButton}>
          <Text style={styles.newEntryButtonText}>New Entry</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {categories.map((category) => {
            const checkedCount = category.items.filter((i) => i.checked).length;
            return (
              <TouchableOpacity
                key={category.id}
                onPress={() => setSelectedCategory(category.id)}
                style={styles.categoryCard}
                activeOpacity={0.85}
              >
                <View style={[styles.categoryArt, { backgroundColor: category.color }]}>
                  <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
                <Text style={styles.categoryProgress}>
                  {checkedCount} of {category.items.length} completed
                </Text>
                <TouchableOpacity
                  onPress={() => handleDeleteCategory(category.id)}
                  style={styles.deleteCategoryButton}
                >
                  <X size={15} color="#ef4444" />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <Modal
        visible={showAddCategory}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAddCategory(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Category</Text>
            <View style={styles.modalImagePlaceholder}>
              <ImageIcon size={28} color="#4aaeb0" />
            </View>
            <TextInput
              style={styles.modalInput}
              placeholder="Add heading"
              value={newCategoryName}
              onChangeText={setNewCategoryName}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setShowAddCategory(false)}
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddCategory}
                style={[styles.modalButton, styles.confirmButton]}
              >
                <Text style={styles.confirmButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  newEntryButton: {
    backgroundColor: "#4aaeb0",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
  newEntryButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },
  contentContainer: {
    padding: 18,
    paddingBottom: 120,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryCard: {
    width: "48%",
    borderRadius: 16,
    backgroundColor: "#ffffff",
    overflow: "hidden",
    minHeight: 146,
  },
  categoryArt: {
    height: 106,
    justifyContent: "flex-end",
    padding: 12,
  },
  categoryEmoji: {
    position: "absolute",
    top: 16,
    alignSelf: "center",
    fontSize: 42,
  },
  categoryName: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
  },
  categoryProgress: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 11,
    color: "#6b7280",
  },
  deleteCategoryButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 4,
  },
  detailCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    minHeight: 520,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 14,
  },
  heroImage: {
    height: 132,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  heroEmoji: {
    fontSize: 52,
    marginBottom: 8,
  },
  heroText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  progressCard: {
    marginBottom: 14,
  },
  progressText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4aaeb0",
    borderRadius: 4,
  },
  addForm: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 13,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  addButton: {
    backgroundColor: "#25075b",
    borderRadius: 12,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  checkbox: {
    width: 21,
    height: 21,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#cfd8dc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: "#b3a5ff",
    borderColor: "#b3a5ff",
  },
  checkmark: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "800",
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    color: "#4b5563",
  },
  itemTextChecked: {
    textDecorationLine: "line-through",
    color: "#9ca3af",
  },
  editInput: {
    flex: 1,
    fontSize: 15,
    padding: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  itemAction: {
    padding: 7,
    marginLeft: 2,
  },
  emptyState: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    marginTop: 10,
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 20,
    width: "100%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 14,
  },
  modalImagePlaceholder: {
    height: 110,
    borderRadius: 14,
    backgroundColor: "#e4f1f0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  modalInput: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 18,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f1f5f9",
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#64748b",
  },
  confirmButton: {
    backgroundColor: "#25075b",
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ffffff",
  },
});
