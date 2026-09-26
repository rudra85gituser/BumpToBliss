import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type ConceptionDateCalendarProps = {
  month: number;
  onSelectDate: (day: number) => void;
  selectedDate: number;
  year: number;
};

/**
 * Presentational calendar. Its selected value and change action pass through
 * from the onboarding screen, keeping persistence out of the UI layer.
 */
export function ConceptionDateCalendar({
  month,
  onSelectDate,
  selectedDate,
  year,
}: ConceptionDateCalendarProps) {
  const firstWeekday = new Date(year, month, 1).getDay();
  const numberOfDays = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: 35 }, (_, index) => {
    const day = index - firstWeekday + 1;
    return day > 0 && day <= numberOfDays ? day : null;
  });

  return (
    <View style={styles.calendar}>
      <Text style={styles.monthLabel}>{`${MONTH_NAMES[month]}   ${year}`}</Text>
      <View style={styles.weekHeader}>
        {WEEK_DAYS.map((day, index) => (
          <View key={`${day}-${index}`} style={styles.cellWrapper}>
            <Text style={styles.weekDay}>{day}</Text>
          </View>
        ))}
      </View>
      <View style={styles.dayGrid}>
        {cells.map((day, index) => {
          if (day === null) {
            return (
              <View key={`empty-${index}`} style={styles.cellWrapper}>
                <View style={styles.emptyCell} />
              </View>
            );
          }

          const isSelected = selectedDate === day;

          return (
            <View key={`${year}-${month}-${day}`} style={styles.cellWrapper}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                activeOpacity={0.75}
                onPress={() => onSelectDate(day)}
                style={[styles.dayButton, isSelected && styles.dayButtonSelected]}
              >
                <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
                  {day}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
    alignSelf: "stretch",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 28,
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingTop: 27,
    paddingBottom: 27,
  },
  monthLabel: {
    color: "#242425",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 19,
    marginBottom: 13,
    textAlign: "center",
  },
  weekHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },
  weekDay: {
    color: "#696969",
    fontSize: 8,
    fontWeight: "500",
    lineHeight: 12,
    textAlign: "center",
  },
  dayGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 20,
  },
  cellWrapper: {
    alignItems: "center",
    width: "14.2857%",
  },
  dayButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 9.41,
    height: 31.36,
    justifyContent: "center",
    width: 31.36,
  },
  emptyCell: {
    height: 31.36,
    width: 31.36,
  },
  dayButtonSelected: {
    backgroundColor: "#A5E1AD",
    borderRadius: 10.19,
  },
  dayText: {
    color: "#090A0A",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 14,
  },
  dayTextSelected: {
    color: "#0F0F10",
    fontWeight: "800",
  },
});
