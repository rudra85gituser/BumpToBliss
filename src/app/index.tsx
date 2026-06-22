"use client";

import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

/*
import BabySizeCard from "@/app/babySizeCard";
import BumpCard from "@/app/bumpCard";
import GarbhaSanskarCard from "@/app/garbhaSanskarCard";
import Header from "@/app/header";
import HelpfulTipsCard from "@/app/helpfulTipsCard";
import HomeScreenSymptom from "@/app/homeScreenSymptom";
import MoodTracker from "@/app/moodTracker";
import PlansCardHomeScreen from "@/app/plansCardHomeScreen";
import PregnancyTipCard from "@/app/pregnancyTipCard";
import ShopLinks from "@/app/shopLinks";
import Testimonials from "@/app/testimonials";
import UpcomingAppointment from "@/app/upcomingAppointment";
import VideoCard from "@/app/videoCard";
import WeeklyFAQ from "@/app/weeklyFAQ";
*/
import GarbhaSanskarFeature from "@/src/app/garbhaSanskar";


export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header
        <Header />
         */}
        



        <View style={styles.heroContainer}>
          <Text style={styles.title}>Pregnancy Tracker</Text>
          <Text style={styles.subtitle}>Track your pragnancy journey</Text>
        </View>


    {/* ACTION BUTTONS */}
    {/*
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/auth/signup")}>
            <Text style={styles.actionButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/plansCard")}>
            <Text style={styles.actionButtonText}>Plans Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/aiChatAssistant")}>
            <Text style={styles.actionButtonText}>AI Chat Assistant</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.lastActionButton]}
            onPress={() => router.push("/symptoms")}>
            <Text style={styles.actionButtonText}>Symptoms Tracker</Text>
          </TouchableOpacity>
        </View>
        */}



  

       <GarbhaSanskarFeature />

        {/* COMPONENTS SHOWN DIRECTLY 
        <BabySizeCard />
        <UpcomingAppointment />
        <PlansCardHomeScreen />
        
        <HelpfulTipsCard />
        <MoodTracker />
        <PregnancyTipCard />
        <HelpfulTipsCard />
        <HomeScreenSymptom />
        <WeeklyFAQ />
        <BumpCard />
        <VideoCard />
        <Testimonials />
        <ShopLinks />
        */}




      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebf7f7ff",
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 2,
    paddingBottom: 100,
  },
  heroContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#20094D",
  },
  actionsContainer: {
    width: "100%",
    gap: 16,
    marginTop: 30,
  },
  actionButton: {
    backgroundColor: "#20094D",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  lastActionButton: {
    marginBottom: 14,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
