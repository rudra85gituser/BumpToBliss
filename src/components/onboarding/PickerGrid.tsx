import type { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type PickerGridItem<T extends string | number> = {
  label: string;
  value: T;
};

type PickerGridProps<T extends string | number> = {
  headerLabel?: string;
  items: PickerGridItem<T>[];
  selectedValue: T;
  onSelect: (value: T) => void;
  disabledValues?: T[];
  footer?: ReactNode;
};

const COLUMNS = 4;

const chunkIntoRows = <T,>(items: T[], size: number): T[][] => {
  const rows: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size));
  }
  return rows;
};

/**
 * Presentational month/year picker card, matching the same translucent card
 * language as ConceptionDateCalendar. Selection and header text pass through
 * from the onboarding screen; this component only lays things out.
 */
export function PickerGrid<T extends string | number>({
  headerLabel,
  items,
  selectedValue,
  onSelect,
  disabledValues,
  footer,
}: PickerGridProps<T>) {
  const rows = chunkIntoRows(items, COLUMNS);

  return (
    <View style={styles.card}>
      {!!headerLabel && <Text style={styles.headerLabel}>{headerLabel}</Text>}

      <View style={styles.grid}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item) => {
              const isSelected = item.value === selectedValue;
              const isDisabled = disabledValues?.includes(item.value);

              return (
                <TouchableOpacity
                  key={item.value}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected, disabled: isDisabled }}
                  activeOpacity={0.75}
                  disabled={isDisabled}
                  onPress={() => onSelect(item.value)}
                  style={[
                    styles.cell,
                    isSelected && styles.cellSelected,
                    isDisabled && styles.cellDisabled,
                  ]}
                >
                  <Text
                    style={[
                      styles.cellText,
                      isSelected && styles.cellTextSelected,
                      isDisabled && styles.cellTextDisabled,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      {footer}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 32,
    borderWidth: 1,
    paddingHorizontal: 31,
    paddingTop: 27,
    paddingBottom: 27,
    width: 337,
  },
  headerLabel: {
    color: "#242425",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 19,
    marginBottom: 12,
    textAlign: "center",
  },
  grid: {
    gap: 8,
  },
  row: {
    flexDirection: "row",
    gap: 9,
  },
  cell: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 9.41,
    flex: 1,
    height: 63,
    justifyContent: "center",
  },
  cellSelected: {
    backgroundColor: "#A5E1AD",
    borderRadius: 10.19,
  },
  cellDisabled: {
    opacity: 0.4,
  },
  cellText: {
    color: "#090A0A",
    fontSize: 13,
    fontWeight: "600",
  },
  cellTextSelected: {
    color: "#0F0F10",
    fontWeight: "800",
  },
  cellTextDisabled: {
    color: "#696969",
  },
});
