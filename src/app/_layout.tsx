"use client";

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Tabs layout */}
        <Stack.Screen name="(tabs)" />
        


        {/* Home page outside tabs */}
        <Stack.Screen name="index" />
        


        {/* Auth pages */}
        {/* 
        <Stack.Screen name="auth/signup" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/choose-date" />
        <Stack.Screen name="auth/choose-month" />
        <Stack.Screen name="auth/choose-year" />
        */}


        {/* Header */}
        {/* 
        <Stack.Screen name="header/index" />
        */}



        {/* Other pages outside tabs */}
        {/* 
        <Stack.Screen name="symptoms/index" />
        <Stack.Screen name="homeScreenSymptom/index" />
        <Stack.Screen name="aiChatAssistant/index" />
        <Stack.Screen name="plansCard/index" />
        <Stack.Screen name="plansCardHomeScreen/index" />
        <Stack.Screen name="profile/index" />
        <Stack.Screen name="bloom/index" />
        <Stack.Screen name="upcomingAppointment/index" />
        <Stack.Screen name="moodTracker/index" />
        <Stack.Screen name="videoCard/index" />
        <Stack.Screen name="videoCard/allVideos" />
        <Stack.Screen name="testimonials/index" />
        <Stack.Screen name="shopLinks/index" />
        <Stack.Screen name="babySizeCard/index" />
        <Stack.Screen name="helpfulTipsCard/index" />
        <Stack.Screen name="pregnancyTipCard/index" />
        <Stack.Screen name="bumpCard/index" />
        <Stack.Screen name="garbhaSanskarCard/index" />
        <Stack.Screen name="weeklyFAQ/index" />
        */}
        <Stack.Screen name="garbhaSanskar/index" />
        <Stack.Screen name="garbhaSanskar/contentDetail" />
        
        
        {/* tools mamas-kit pages outside tabs */}
        {/* 
        <Stack.Screen name="mamasKitTools/mamas-kit/index" />
        <Stack.Screen name="mamasKitTools/features/${featureId}" />
        <Stack.Screen name="mamasKitTools/due-date-calculator/index" />
        <Stack.Screen name="mamasKitTools/journal/index" />
        */}
        
      </Stack>
    </SafeAreaProvider>
  );
}
