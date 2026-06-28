"use client";

import { useRouter } from "expo-router";
import { ChevronLeft, Edit2, Plus, Trash2, X } from "lucide-react-native";
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
import { SafeAreaProvider } from "react-native-safe-area-context";
// import { storage } from "../../config/MMKVStorageConfig";

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

interface ChecklistCategory {
  id: string;
  name: string;
  items: ChecklistItem[];
}

const defaultCategories: ChecklistCategory[] = [
  {
    id: "1",
    name: "Hospital Checklist",
    emoji: "🏥",
    color: "#2dd4bf",
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
    emoji: "✈️",
    color: "#fb923c",
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

  // useEffect(() => {
  //   const savedCategories = storage.getString("travelChecklist");
  //   if (savedCategories) {
  //     setCategories(JSON.parse(savedCategories));
  //   }
  // }, []);

  // useEffect(() => {
  //   storage.set("travelChecklist", JSON.stringify(categories));
  // }, [categories]);

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
                  label: newItemText,
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
                item.id === itemId ? { ...item, label: newLabel } : item
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
      name: newCategoryName,
      emoji: "📋",
      color: "#8b5cf6",
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
      <SafeAreaProvider style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSelectedCategory(null)} style={styles.backButton}>
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{currentCategory.name}</Text>
          <TouchableOpacity
            onPress={() => setShowNewEntry(!showNewEntry)}
            style={styles.iconButton}
          >
            <Plus size={20} color="#14b8a6" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.categoryCard}>
            <View style={[styles.categoryImage, { backgroundColor: currentCategory.color }]}>
              <Text style={styles.categoryEmoji}>{currentCategory.emoji}</Text>
            </View>

            <View style={styles.progressCard}>
              <Text style={styles.progressText}>
                {checkedCount} of {currentCategory.items.length} completed
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${(checkedCount / currentCategory.items.length) * 100}%` },
                  ]}
                />
              </View>
            </View>

            {showNewEntry && (
              <View style={styles.addForm}>
                <TextInput
                  style={styles.input}
                  placeholder="Add new item"
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

            <View style={styles.itemsList}>
              {currentCategory.items.map((item) => (
                <View key={item.id} style={styles.itemRow}>
                  <TouchableOpacity
                    onPress={() => handleToggleItem(currentCategory.id, item.id)}
                    style={styles.checkbox}
                  >
                    <View style={[styles.checkboxInner, item.checked && styles.checkboxChecked]}>
                      {item.checked && <Text style={styles.checkmark}>✓</Text>}
                    </View>
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
                    <Text
                      style={[
                        styles.itemText,
                        item.checked && styles.itemTextChecked,
                      ]}
                    >
                      {item.label}
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={() => setEditingItem({ categoryId: currentCategory.id, itemId: item.id, label: item.label })}
                    style={styles.itemAction}
                  >
                    <Edit2 size={16} color="#6b7280" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDeleteItem(currentCategory.id, item.id)}
                    style={styles.itemAction}
                  >
                    <Trash2 size={16} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}
              {currentCategory.items.length === 0 && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>No items yet. Add your first item!</Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Travel Checklist</Text>
        <View style={styles.headerSpacer} />
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
              >
                <View style={[styles.categoryImage, { backgroundColor: category.color }]}>
                  <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
                <View style={styles.categoryFooter}>
                  <Text style={styles.categoryProgress}>
                    {checkedCount} of {category.items.length} completed
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleDeleteCategory(category.id)}
                  style={styles.deleteCategoryButton}
                >
                  <X size={16} color="#ef4444" />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            onPress={() => setShowAddCategory(true)}
            style={[styles.categoryCard, styles.addCategoryCard]}
          >
            <View style={styles.addCategoryContent}>
              <Plus size={32} color="#9ca3af" />
              <Text style={styles.addCategoryText}>Add Category</Text>
            </View>
          </TouchableOpacity>
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
            <TextInput
              style={styles.modalInput}
              placeholder="Category name"
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
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8fafc" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 12, backgroundColor: "#ffffff", borderBottomWidth: 1, borderBottomColor: "#e2e8f0" },
  backButton: { width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  backButtonText: { fontSize: 24, fontWeight: "600", color: "#000" },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#1e293b" },
  headerSpacer: { width: 32 },
  iconButton: { width: 32, height: 32, justifyContent: "center", alignItems: "center", backgroundColor: "#f0fdfa", borderRadius: 16 },
  newEntryButton: { backgroundColor: "#14b8a6", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  newEntryButtonText: { fontSize: 14, fontWeight: "600", color: "#ffffff" },
  contentContainer: { padding: 16 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 16 },
  categoryCard: { backgroundColor: "#ffffff", borderRadius: 16, overflow: "hidden", width: "48%", marginBottom: 8, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  categoryImage: { aspectRatio: 16 / 9, justifyContent: "center", alignItems: "center" },
  categoryEmoji: { fontSize: 48, marginBottom: 8 },
  categoryName: { fontSize: 14, fontWeight: "600", color: "#ffffff" },
  categoryFooter: { padding: 12, backgroundColor: "#ffffff" },
  categoryProgress: { fontSize: 12, color: "#64748b", fontWeight: "500" },
  deleteCategoryButton: { position: "absolute", top: 8, right: 8, backgroundColor: "#ffffff", borderRadius: 12, padding: 4, elevation: 2 },
  addCategoryCard: { borderStyle: "dashed", borderWidth: 2, borderColor: "#cbd5e1", backgroundColor: "transparent", elevation: 0 },
  addCategoryContent: { aspectRatio: 16 / 9, justifyContent: "center", alignItems: "center" },
  addCategoryText: { fontSize: 14, fontWeight: "500", color: "#94a3b8", marginTop: 8 },
  progressCard: { backgroundColor: "#ffffff", borderRadius: 16, padding: 20, marginBottom: 20, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  progressText: { fontSize: 15, fontWeight: "600", color: "#1e293b", marginBottom: 10 },
  progressBar: { height: 10, backgroundColor: "#e2e8f0", borderRadius: 5, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: "#10b981", borderRadius: 5 },
  addForm: { flexDirection: "row", gap: 12, marginBottom: 20 },
  input: { flex: 1, backgroundColor: "#f8fafc", borderRadius: 12, padding: 14, fontSize: 16, borderWidth: 1, borderColor: "#e2e8f0" },
  editInput: { flex: 1, fontSize: 16, padding: 4, borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 8, backgroundColor: "#ffffff" },
  addButton: { backgroundColor: "#10b981", borderRadius: 12, width: 52, height: 52, justifyContent: "center", alignItems: "center", elevation: 2 },
  addButtonText: { fontSize: 20, fontWeight: "600", color: "#ffffff" },
  itemsList: { gap: 12 },
  itemRow: { flexDirection: "row", alignItems: "center", padding: 14, backgroundColor: "#ffffff", borderRadius: 12, elevation: 1, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  checkbox: { marginRight: 12 },
  checkboxInner: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: "#cbd5e1", justifyContent: "center", alignItems: "center" },
  checkboxChecked: { backgroundColor: "#10b981", borderColor: "#10b981" },
  checkmark: { color: "#ffffff", fontSize: 14, fontWeight: "700" },
  itemText: { flex: 1, fontSize: 16, color: "#1e293b" },
  itemTextChecked: { textDecorationLine: "line-through", color: "#94a3b8" },
  itemAction: { padding: 8, marginLeft: 4 },
  emptyState: { padding: 40, alignItems: "center" },
  emptyText: { fontSize: 14, color: "#94a3b8", textAlign: "center" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "center", alignItems: "center", padding: 20 },
  modalContent: { backgroundColor: "#ffffff", borderRadius: 16, padding: 24, width: "100%", maxWidth: 400 },
  modalTitle: { fontSize: 18, fontWeight: "600", color: "#1e293b", marginBottom: 16 },
  modalInput: { backgroundColor: "#f8fafc", borderRadius: 12, padding: 14, fontSize: 16, borderWidth: 1, borderColor: "#e2e8f0", marginBottom: 20 },
  modalButtons: { flexDirection: "row", gap: 12 },
  modalButton: { flex: 1, padding: 14, borderRadius: 12, alignItems: "center" },
  cancelButton: { backgroundColor: "#f1f5f9" },
  cancelButtonText: { fontSize: 16, fontWeight: "600", color: "#64748b" },
  confirmButton: { backgroundColor: "#10b981" },
  confirmButtonText: { fontSize: 16, fontWeight: "600", color: "#ffffff" },
});
