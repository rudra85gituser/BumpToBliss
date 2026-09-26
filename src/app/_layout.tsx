"use client";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "@/src/context/AuthContext";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Praise: require("@/src/assets/fonts/Praise-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="auth/login" />
          <Stack.Screen name="auth/signup" />
          <Stack.Screen name="auth/choose-date" />
          <Stack.Screen name="auth/choose-month" />
          <Stack.Screen name="auth/choose-year" />
          <Stack.Screen name="garbhaSanskar" />
          <Stack.Screen name="mamasKitTools" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="bloom/index" />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
