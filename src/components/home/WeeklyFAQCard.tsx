import { useState } from "react";
import { ChevronDown } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type FAQItem = {
  id: string;
  question: string;
};

type WeeklyFAQCardProps = {
  items: FAQItem[];
};

/**
 * Presentational FAQ list. Question copy passes through from the Home
 * screen; expand/collapse is local visual state only for now.
 */
export function WeeklyFAQCard({ items }: WeeklyFAQCardProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <View>
      <Text style={styles.heading}>Weekly FAQ</Text>
      <View style={styles.list}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              setExpandedId((current) => (current === item.id ? null : item.id))
            }
          >
            <Text style={styles.question}>{item.question}</Text>
            <View style={styles.chevronWrap}>
              <ChevronDown
                size={16}
                color="#292D32"
                style={
                  expandedId === item.id
                    ? styles.chevronExpanded
                    : undefined
                }
              />
            </View>
          </TouchableOpacity>
        ))}
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
  list: {
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 73,
  },
  question: {
    flex: 1,
    fontSize: 12,
    fontWeight: "500",
    color: "#483D3D",
    marginRight: 12,
  },
  chevronWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  chevronExpanded: {
    transform: [{ rotate: "180deg" }],
  },
});
