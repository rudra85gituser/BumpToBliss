"use client";

import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { PickerGrid, PickerGridItem } from "@/src/components/onboarding/PickerGrid";
import { MONTH_NAMES } from "@/src/constants/months";
import { useAuth } from "@/src/context/AuthContext";
import { getUserProfile, upsertUserProfile } from "@/src/services/userDataService";

const MONTH_ITEMS: PickerGridItem<number>[] = MONTH_NAMES.map((name, index) => ({
  label: name.slice(0, 3).toUpperCase(),
  value: index,
}));

export default function OnboardingMonth() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(6);
  const [babyName, setBabyName] = useState("");

  useEffect(() => {
    if (!user) return;

    getUserProfile(user.id).then((profile) => {
      if (!profile) return;
      if (profile.baby_name) setBabyName(profile.baby_name);
      if (profile.conception_month) setSelectedMonth(profile.conception_month);
    });
  }, [user]);

  const handleNext = async () => {
    if (!babyName.trim()) {
      Alert.alert("Missing details", "Please enter the baby's name to continue.");
      return;
    }

    if (!user) return;

    await upsertUserProfile(user.id, {
      email: user.email,
      baby_name: babyName.trim(),
      conception_month: selectedMonth,
    });
    router.replace("/auth/choose-year");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <Text style={styles.heading}>{"Let's Make this more personalized"}</Text>
        <Text style={styles.subHeading}>Select the month of conceive</Text>

        <PickerGrid
          headerLabel={`${MONTH_NAMES[selectedMonth]}   ${new Date().getFullYear()}`}
          items={MONTH_ITEMS}
          selectedValue={selectedMonth}
          onSelect={setSelectedMonth}
        />

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name of baby</Text>
          <TextInput
            placeholder="ex - amy"
            placeholderTextColor="#999"
            value={babyName}
            onChangeText={setBabyName}
            style={styles.input}
          />
        </View>

        <TouchableOpacity onPress={handleNext} activeOpacity={0.8} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0E9E9",
  },
  screen: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 38,
    paddingBottom: 18,
  },
  heading: {
    color: "#090A0A",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 9,
  },
  subHeading: {
    color: "#242425",
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 15,
  },
  inputGroup: {
    marginTop: 17,
    marginBottom: 0,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#242425",
    marginBottom: 10,
    paddingLeft: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#00000021",
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 13,
    color: "#0F0F10",
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#20094D",
    borderRadius: 14,
    height: 48,
    justifyContent: "center",
    marginTop: "auto",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
