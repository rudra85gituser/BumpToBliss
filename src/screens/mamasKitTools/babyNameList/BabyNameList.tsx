"use client";

import { useRouter } from "expo-router";
import { ChevronLeft, Heart } from "lucide-react-native";
import { useMemo, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface NameEntry {
  id: string;
  name: string;
  gender: "boy" | "girl";
  isFavorite: boolean;
  letter: string;
}

const babyNames: NameEntry[] = [
  // A
  { id: "1", name: "Akash", gender: "boy", isFavorite: false, letter: "A" },
  { id: "2", name: "Akansha", gender: "girl", isFavorite: false, letter: "A" },
  { id: "3", name: "Ajay", gender: "boy", isFavorite: true, letter: "A" },
  // B
  { id: "4", name: "Binod", gender: "boy", isFavorite: false, letter: "B" },
  { id: "5", name: "Bharat", gender: "boy", isFavorite: false, letter: "B" },
  { id: "6", name: "Bheem", gender: "boy", isFavorite: true, letter: "B" },
  // C
  { id: "7", name: "Charlie", gender: "boy", isFavorite: false, letter: "C" },
  { id: "8", name: "Chahak", gender: "girl", isFavorite: false, letter: "C" },
  { id: "9", name: "Chirag", gender: "boy", isFavorite: true, letter: "C" },
  // D
  { id: "10", name: "Dhruv", gender: "boy", isFavorite: false, letter: "D" },
  { id: "11", name: "Diya", gender: "girl", isFavorite: false, letter: "D" },
  // E
  { id: "12", name: "Ethan", gender: "boy", isFavorite: false, letter: "E" },
  // F
  { id: "13", name: "Faisal", gender: "boy", isFavorite: false, letter: "F" },
];

export default function BabyNameList() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "boy" | "girl" | "favorites">("all");
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(babyNames.filter((n) => n.isFavorite).map((n) => n.id))
  );

  const filteredNames = useMemo(() => {
    let filtered = babyNames.map((n) => ({
      ...n,
      isFavorite: favorites.has(n.id),
    }));

    if (search) {
      filtered = filtered.filter((n) =>
        n.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter === "boy") {
      filtered = filtered.filter((n) => n.gender === "boy");
    } else if (filter === "girl") {
      filtered = filtered.filter((n) => n.gender === "girl");
    } else if (filter === "favorites") {
      filtered = filtered.filter((n) => n.isFavorite);
    }

    return filtered.sort((a, b) => a.letter.localeCompare(b.letter));
  }, [search, filter, favorites]);

  const groupedNames = useMemo(() => {
    const groups: Record<string, typeof filteredNames> = {};
    filteredNames.forEach((name) => {
      if (!groups[name.letter]) {
        groups[name.letter] = [];
      }
      groups[name.letter].push(name);
    });
    return groups;
  }, [filteredNames]);

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Baby Name List</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchIconContainer}>
            <ChevronLeft size={20} color="#9ca3af" style={{ transform: [{ rotate: "45deg" }] }} />
          </View>
          <TextInput
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#9ca3af"
            style={styles.searchInput}
          />
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            onPress={() => setFilter("all")}
            style={[
              styles.filterButton,
              filter === "all" && styles.filterButtonActiveAll,
            ]}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter === "all" && styles.filterButtonTextActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter("boy")}
            style={[
              styles.filterButton,
              filter === "boy" && styles.filterButtonActiveBoy,
            ]}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter === "boy" && styles.filterButtonTextActive,
              ]}
            >
              Boy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter("girl")}
            style={[
              styles.filterButton,
              filter === "girl" && styles.filterButtonActiveGirl,
            ]}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter === "girl" && styles.filterButtonTextActive,
              ]}
            >
              Girl
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter("favorites")}
            style={[
              styles.filterButton,
              filter === "favorites" && styles.filterButtonActiveFavorites,
            ]}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter === "favorites" && styles.filterButtonTextActive,
              ]}
            >
              Favourites
            </Text>
          </TouchableOpacity>
        </View>

        {/* Names List */}
        <View style={styles.namesCard}>
          {Object.entries(groupedNames).map(([letter, names]) => (
            <View key={letter} style={styles.letterGroup}>
              <Text style={styles.letterHeader}>{letter}</Text>
              <View style={styles.namesList}>
                {names.map((name) => (
                  <View key={name.id} style={styles.nameRow}>
                    <Text style={styles.nameText}>{name.name}</Text>
                    <TouchableOpacity
                      onPress={() => toggleFavorite(name.id)}
                      style={styles.favoriteButton}
                    >
                      <Heart
                        size={20}
                        fill={favorites.has(name.id) ? "#ef4444" : "transparent"}
                        color={favorites.has(name.id) ? "#ef4444" : "#9ca3af"}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {filteredNames.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No names found</Text>
          </View>
        )}
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
  searchContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#ffffff", borderRadius: 8, borderWidth: 1, borderColor: "#e5e7eb", marginBottom: 16 },
  searchIconContainer: { paddingHorizontal: 12 },
  searchInput: { flex: 1, paddingVertical: 12, paddingRight: 16, fontSize: 14, color: "#1f2937" },
  filterContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  filterButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: "#f3f4f6" },
  filterButtonActiveAll: { backgroundColor: "#14b8a6" },
  filterButtonActiveBoy: { backgroundColor: "#3b82f6" },
  filterButtonActiveGirl: { backgroundColor: "#ec4899" },
  filterButtonActiveFavorites: { backgroundColor: "#a855f7" },
  filterButtonText: { fontSize: 14, fontWeight: "600", color: "#1f2937" },
  filterButtonTextActive: { color: "#ffffff" },
  namesCard: { backgroundColor: "#ffffff", borderRadius: 12, padding: 24 },
  letterGroup: { marginBottom: 24 },
  letterHeader: { fontSize: 18, fontWeight: "700", color: "#1f2937", marginBottom: 12 },
  namesList: { gap: 8 },
  nameRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 8, paddingHorizontal: 12, backgroundColor: "#f9fafb", borderRadius: 8 },
  nameText: { fontSize: 16, fontWeight: "500", color: "#1f2937" },
  favoriteButton: { padding: 8 },
  emptyContainer: { paddingVertical: 32, alignItems: "center" },
  emptyText: { fontSize: 14, color: "#9ca3af" },
});
