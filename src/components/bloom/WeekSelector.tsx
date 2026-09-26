import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type WeekSelectorProps = {
  weekLabel: string;
  dateRangeLabel: string;
  onPrevWeek?: () => void;
  onNextWeek?: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
};

/**
 * Presentational week pager. Navigation passes through from the screen so
 * this stays free of any week-calculation logic.
 */
export function WeekSelector({
  weekLabel,
  dateRangeLabel,
  onPrevWeek,
  onNextWeek,
  disablePrev,
  disableNext,
}: WeekSelectorProps) {
  return (
    <View style={styles.pill}>
      <TouchableOpacity
        onPress={onPrevWeek}
        disabled={disablePrev}
        style={styles.arrowButton}
      >
        <ChevronLeft size={18} color={disablePrev ? "#C7C7C7" : "#292D32"} />
      </TouchableOpacity>

      <View style={styles.labels}>
        <Text style={styles.weekLabel}>{weekLabel}</Text>
        <Text style={styles.dateRangeLabel}>{dateRangeLabel}</Text>
      </View>

      <TouchableOpacity
        onPress={onNextWeek}
        disabled={disableNext}
        style={styles.arrowButton}
      >
        <ChevronRight size={18} color={disableNext ? "#C7C7C7" : "#292D32"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F6FFFD",
    borderRadius: 36,
    height: 48,
    paddingHorizontal: 16,
  },
  arrowButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  labels: {
    alignItems: "center",
  },
  weekLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#292D32",
  },
  dateRangeLabel: {
    fontSize: 10,
    fontWeight: "400",
    color: "#777777",
    marginTop: 2,
  },
});
