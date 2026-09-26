import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import activitiesIcon from "@/src/assets/home/icons/activities.png";
import dietIcon from "@/src/assets/home/icons/diet.png";
import doctorsHelpIcon from "@/src/assets/home/icons/doctors-help.png";
import momsCareIcon from "@/src/assets/home/icons/moms-care.png";

type QuickAction = {
  key: string;
  label: string;
  icon: number;
};

type QuickActionsRowProps = {
  onSelect?: (key: string) => void;
};

const ACTIONS: QuickAction[] = [
  { key: "moms-care", label: "Mom's Care", icon: momsCareIcon },
  { key: "activities", label: "Activities", icon: activitiesIcon },
  { key: "doctors-help", label: "Doctor's Help", icon: doctorsHelpIcon },
  { key: "diet", label: "Diet", icon: dietIcon },
];

/**
 * Presentational quick-action grid. Navigation for each action passes
 * through from the Home screen via onSelect.
 */
export function QuickActionsRow({ onSelect }: QuickActionsRowProps) {
  return (
    <View style={styles.row}>
      {ACTIONS.map(({ key, label, icon }) => (
        <TouchableOpacity
          key={key}
          style={styles.item}
          activeOpacity={0.75}
          onPress={() => onSelect?.(key)}
        >
          <View style={styles.iconBox}>
            <Image source={icon} style={styles.icon} resizeMode="contain" />
          </View>
          <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    alignItems: "center",
    width: 80,
  },
  iconBox: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#F4EEFF",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 42,
    height: 42,
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "400",
    color: "#414141",
    textAlign: "center",
  },
});
