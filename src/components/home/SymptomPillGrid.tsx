import type { ImageSourcePropType } from "react-native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import backPainIcon from "@/src/assets/home/icons/back-pain.png";
import bloatingIcon from "@/src/assets/home/icons/bloating.png";
import constipationIcon from "@/src/assets/home/icons/constipation.png";
import contractionsIcon from "@/src/assets/home/icons/contractions.png";
import crampingIcon from "@/src/assets/home/icons/cramping.png";
import diarrheaIcon from "@/src/assets/home/icons/diarrhea.png";
import dizzinessIcon from "@/src/assets/home/icons/dizziness.png";
import exhaustionIcon from "@/src/assets/home/icons/exhaustion.png";
import foodAversionsIcon from "@/src/assets/home/icons/food-aversions.png";
import soreBreastsIcon from "@/src/assets/home/icons/sore-breasts.png";

export type Symptom = {
  key: string;
  label: string;
  iconBackground: string;
  icon: ImageSourcePropType;
};

const SYMPTOMS: Symptom[] = [
  { key: "back-pain", label: "Back pain", iconBackground: "#FFE8E8", icon: backPainIcon },
  { key: "bloating", label: "Bloating", iconBackground: "#FFF0F0", icon: bloatingIcon },
  { key: "contractions", label: "Contractions", iconBackground: "#FDECEF", icon: contractionsIcon },
  { key: "sore-breasts", label: "Sore breasts", iconBackground: "#FDEDE5", icon: soreBreastsIcon },
  { key: "constipation", label: "Constipation", iconBackground: "#FFF6E5", icon: constipationIcon },
  { key: "cramping", label: "Cramping", iconBackground: "#FFF0F0", icon: crampingIcon },
  { key: "diarrhea", label: "Diarrhea", iconBackground: "#E6F7F5", icon: diarrheaIcon },
  { key: "dizziness", label: "Dizziness", iconBackground: "#EFF0FB", icon: dizzinessIcon },
  { key: "exhaustion", label: "Exhaustion", iconBackground: "#FFECEC", icon: exhaustionIcon },
  { key: "food-aversions", label: "Food aversions", iconBackground: "#F3EEFF", icon: foodAversionsIcon },
];

type SymptomPillGridProps = {
  onViewAll?: () => void;
  onSelect?: (key: string) => void;
};

/**
 * Presentational symptom grid. Selection/navigation passes through from
 * the Home screen.
 */
export function SymptomPillGrid({ onViewAll, onSelect }: SymptomPillGridProps) {
  return (
    <View>
      <View style={styles.headingRow}>
        <Text style={styles.heading}>How are you feeling today?</Text>
        <TouchableOpacity onPress={onViewAll} activeOpacity={0.7}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {SYMPTOMS.map((symptom) => (
          <TouchableOpacity
            key={symptom.key}
            style={styles.pill}
            activeOpacity={0.75}
            onPress={() => onSelect?.(symptom.key)}
          >
            <View
              style={[styles.iconBox, { backgroundColor: symptom.iconBackground }]}
            >
              <Image source={symptom.icon} style={styles.icon} resizeMode="contain" />
            </View>
            <Text style={styles.label} numberOfLines={2}>
              {symptom.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: "500",
    color: "#191818",
  },
  viewAll: {
    fontSize: 12,
    fontWeight: "400",
    color: "#777777",
    textDecorationLine: "underline",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  pill: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 56,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 16,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 22,
    height: 22,
  },
  label: {
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
    color: "#191818",
  },
});
