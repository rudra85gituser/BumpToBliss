import { Plus } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MOOD_OPTIONS } from "@/src/constants/journal";

/**
 * Presentational mood picker. Selection is local visual state only — no
 * persistence is wired up yet. Mood list/emoji reuse the same
 * MOOD_OPTIONS used by the Journal's mood picker instead of duplicating it.
 */
export function MoodTracker() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View>
      <Text style={styles.heading}>Mood Tracker</Text>
      <View style={styles.panel}>
        {MOOD_OPTIONS.map((mood) => (
          <TouchableOpacity
            key={mood.label}
            style={[styles.item, selected === mood.label && styles.itemSelected]}
            activeOpacity={0.75}
            onPress={() => setSelected(mood.label)}
          >
            <Text style={styles.emoji}>{mood.emoji}</Text>
            <Text style={styles.label} numberOfLines={1}>
              {mood.label}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.item, selected === "Custom" && styles.itemSelected]}
          activeOpacity={0.75}
          onPress={() => setSelected("Custom")}
        >
          <View style={styles.customIcon}>
            <Plus size={12} color="#4CA2A3" />
          </View>
          <Text style={styles.label} numberOfLines={1}>
            Custom
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 14,
    fontWeight: "500",
    color: "#373737",
    marginBottom: 12,
  },
  panel: {
    backgroundColor: "#F4EFF8",
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 52,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.06)",
  },
  itemSelected: {
    borderColor: "#A5E1AD",
    borderWidth: 2,
  },
  emoji: {
    fontSize: 18,
  },
  customIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#E7F4F4",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    marginTop: 6,
    fontSize: 10,
    fontWeight: "400",
    color: "#373737",
    textAlign: "center",
  },
});
