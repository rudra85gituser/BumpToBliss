"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { ConceptionDateCalendar } from "@/src/components/onboarding/ConceptionDateCalendar";
import { useAuth } from "@/src/context/AuthContext";
import { getUserProfile, upsertUserProfile } from "@/src/services/userDataService";

const today = new Date();

export default function OnboardingDate() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(16);
  const [babyName, setBabyName] = useState("");

  useEffect(() => {
    if (!user) return;

    getUserProfile(user.id).then((profile) => {
      if (!profile) return;
      if (profile.baby_name) setBabyName(profile.baby_name);
      if (profile.conception_day) setSelectedDate(profile.conception_day);
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
      conception_day: selectedDate,
    });
    router.replace("/auth/choose-month");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
          {/* Heading */}
          <Text style={styles.heading}>{"Let's Make this more personalized"}</Text>
          <Text style={styles.subHeading}>Select the day of conceive</Text>

          <ConceptionDateCalendar
            month={today.getMonth()}
            onSelectDate={setSelectedDate}
            selectedDate={selectedDate}
            year={today.getFullYear()}
          />

          {/* Baby Name Input */}
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

          {/* Next Button */}
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            style={styles.primaryButton}
          >
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
    color: "#696969",
    fontSize: 14,
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
    borderRadius: 16,
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
