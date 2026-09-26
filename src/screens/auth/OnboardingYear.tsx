"use client";

import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { PickerGrid, PickerGridItem } from "@/src/components/onboarding/PickerGrid";
import { MONTH_NAMES } from "@/src/constants/months";
import { useAuth } from "@/src/context/AuthContext";
import { getUserProfile, upsertUserProfile } from "@/src/services/userDataService";

const EARLIEST_YEAR = 2000;

export default function OnboardingYear() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedYear, setSelectedYear] = useState(2025);
  const [conceptionMonth, setConceptionMonth] = useState(6);
  const [babyName, setBabyName] = useState("");
  const [startYear, setStartYear] = useState(2020);

  const yearItems: PickerGridItem<number>[] = Array.from({ length: 12 }, (_, index) => {
    const year = startYear + index;
    return { label: String(year), value: year };
  });

  const handlePrevious = () => {
    if (startYear > EARLIEST_YEAR) {
      setStartYear(startYear - 12);
    }
  };

  const handleNextYears = () => {
    setStartYear(startYear + 12);
  };

  useEffect(() => {
    if (!user) return;

    getUserProfile(user.id).then((profile) => {
      if (!profile) return;
      if (profile.baby_name) setBabyName(profile.baby_name);
      if (profile.conception_year) setSelectedYear(profile.conception_year);
      if (profile.conception_month) setConceptionMonth(profile.conception_month);
    });
  }, [user]);

  const handleNext = async () => {
    if (!babyName.trim()) {
      Alert.alert("Missing details", "Please enter the baby's name to continue.");
      return;
    }

    if (!user) return;

    const currentProfile = await getUserProfile(user.id);
    const conceptionDay = currentProfile?.conception_day ?? 1;
    const month = currentProfile?.conception_month ?? conceptionMonth;
    const conceptionDate = new Date(selectedYear, month, conceptionDay);

    await upsertUserProfile(user.id, {
      email: user.email,
      baby_name: babyName.trim(),
      conception_year: selectedYear,
      conception_date: conceptionDate.toISOString(),
    });
    router.replace("/(tabs)/home-wrapper");
  };

  const isPreviousDisabled = startYear <= EARLIEST_YEAR;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <Text style={styles.heading}>{"Let's Make this more personalized"}</Text>
        <Text style={styles.subHeading}>Select the year of conceive</Text>

        <PickerGrid
          headerLabel={`${MONTH_NAMES[conceptionMonth]}   ${selectedYear}`}
          items={yearItems}
          selectedValue={selectedYear}
          onSelect={setSelectedYear}
          footer={
            <View style={styles.navigationRow}>
              <TouchableOpacity
                onPress={handlePrevious}
                activeOpacity={0.7}
                disabled={isPreviousDisabled}
                style={styles.navigationButton}
              >
                <ChevronLeft
                  size={14}
                  color={isPreviousDisabled ? "#D9C9C9" : "#CC8B82"}
                />
                <Text
                  style={[
                    styles.navigationText,
                    isPreviousDisabled && styles.navigationTextDisabled,
                  ]}
                >
                  Previous
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleNextYears}
                activeOpacity={0.7}
                style={styles.navigationButton}
              >
                <Text style={styles.navigationText}>Next</Text>
                <ChevronRight size={14} color="#CC8B82" />
              </TouchableOpacity>
            </View>
          }
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
  navigationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  navigationButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  navigationText: {
    fontSize: 10,
    color: "#CC8B82",
    fontWeight: "400",
  },
  navigationTextDisabled: {
    color: "#D9C9C9",
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
