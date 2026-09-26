import type { ComponentProps } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type AuthTextFieldProps = ComponentProps<typeof TextInput> & {
  label: string;
};

/** Presentational labelled input; its value and change handler are passed in. */
export function AuthTextField({
  label,
  style,
  ...inputProps
}: AuthTextFieldProps) {
  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...inputProps}
        style={[styles.input, style]}
        placeholderTextColor="#787878"
        selectionColor="#20094D"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    marginBottom: 16,
  },
  label: {
    color: "#353030",
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 10,
    paddingLeft: 6,
  },
  input: {
    height: 47,
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 14,
    color: "#353030",
    fontSize: 13,
    paddingHorizontal: 15,
  },
});
