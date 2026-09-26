// app/(tabs)/search/index.tsx
"use client";

import { useFocusEffect, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import babyInWombIllustration from "@/src/assets/bloom/photos/baby-in-womb.png";
import momPregnancyIllustration from "@/src/assets/bloom/photos/mom-pregnancy.png";
import { CareTipsRow } from "@/src/components/bloom/CareTipsRow";
import { ContentVideoRow } from "@/src/components/bloom/ContentVideoRow";
import { DrTipsRow } from "@/src/components/bloom/DrTipsRow";
import { GrowthStatsCard } from "@/src/components/bloom/GrowthStatsCard";
import { WeeklyChangesCard } from "@/src/components/bloom/WeeklyChangesCard";
import { useAuth } from "@/src/context/AuthContext";
import { getUserProfile } from "@/src/services/userDataService";
import {
  calculatePregnancyDay,
  calculatePregnancyWeek,
} from "@/src/utils/pregnancyCalculations";

import { useMomAndBabyAllData } from "../../hooks/useMomAndBabyAllData";
import { useWeeklyStage } from "../../hooks/useWeeklyStage";

const TOTAL_PREGNANCY_WEEKS = 40;

const formatWeight = (grams: number | null | undefined) =>
  grams ? `${grams}gm` : "—";

const formatHeight = (cm: number | null | undefined) => (cm ? `${cm}cm` : "—");

const formatDateRange = (startDate: Date | null, weekNumber: number | null) => {
  if (!startDate || !weekNumber) return "";

  const weekStart = new Date(startDate);
  weekStart.setDate(weekStart.getDate() + (weekNumber - 1) * 7);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const format = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return `${format(weekStart)} - ${format(weekEnd)}`;
};

export default function Bloom() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"Baby" | "Mom">("Baby");
  const [babyName, setBabyName] = useState("Baby");
  const [pregnancyStartDate, setPregnancyStartDate] = useState<Date | null>(null);
  const [pregnancyDay, setPregnancyDay] = useState<number | null>(null);
  const [pregnancyWeek, setPregnancyWeek] = useState<number | null>(null);
  const [viewingWeek, setViewingWeek] = useState<number | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      console.log("🌸 Bloom focused. user:", user?.id ?? "none");

      if (!user) {
        const timeout = setTimeout(() => setProfileLoading(false), 0);
        return () => clearTimeout(timeout);
      }

      let cancelled = false;

      getUserProfile(user.id)
        .then((profile) => {
          console.log("🌸 Bloom profile fetched:", profile);
          if (cancelled || !profile) return;
          if (profile.baby_name) setBabyName(profile.baby_name);
          if (!profile.conception_date) {
            console.log("🌸 Bloom: no conception_date on profile");
            return;
          }

          const date = new Date(profile.conception_date);
          if (Number.isNaN(date.getTime())) return;

          const day = calculatePregnancyDay(date);
          const week = Math.max(1, calculatePregnancyWeek(date));
          console.log("🌸 Bloom computed day/week:", day, week);
          setPregnancyStartDate(date);
          setPregnancyDay(day);
          setPregnancyWeek(week);
          setViewingWeek((current) => current ?? week);
        })
        .catch((error) => {
          console.error("Bloom: failed to load user profile", error);
        })
        .finally(() => {
          if (!cancelled) setProfileLoading(false);
        });

      return () => {
        cancelled = true;
      };
    }, [user]),
  );

  const { content, loading } = useMomAndBabyAllData(
    pregnancyDay ?? 0,
    pregnancyWeek ?? 0,
  );
  const { stage } = useWeeklyStage(viewingWeek ?? 1);

  const currentContent =
    content?.filter((item) => item.mom_and_baby_section?.MomOrBaby === activeTab) || [];

  const activitiesSectionTitle =
    activeTab === "Baby" ? "Activities for Baby Development" : "Daily Read";
  const changesSectionTitle =
    activeTab === "Baby" ? "Major Changes (Current Week)" : "Weekly Symptoms";
  const drTipsSectionTitle =
    activeTab === "Baby" ? "Dr. Tips for Baby" : "Dr. Tips for Mom";
  const careTipsSectionTitles =
    activeTab === "Baby" ? ["Extra Care Tips"] : ["Mom's Fitness", "Healthy Meals"];

  const videoItems = currentContent
    .filter((item) => item.mom_and_baby_section?.title === activitiesSectionTitle)
    .map((item) => ({
      id: item.id,
      title: item.title,
      thumbnailUrl: item.thumbnail?.url ?? null,
      isVideo: item.contentsType === "video",
    }));

  const changeItems = currentContent
    .filter((item) => item.mom_and_baby_section?.title === changesSectionTitle)
    .map((item) => ({
      id: item.id,
      title: item.title,
      description: item.shortDescription,
      thumbnailUrl: item.thumbnail?.url ?? null,
    }));

  const drTipsItems = currentContent
    .filter((item) => item.mom_and_baby_section?.title === drTipsSectionTitle)
    .map((item) => ({
      id: item.id,
      title: item.title,
      thumbnailUrl: item.thumbnail?.url ?? null,
    }));

  const momCaption = viewingWeek
    ? `Mom is entering her Week ${viewingWeek} of pregnancy. Below are your diet and exercise plans for the week`
    : undefined;

  const careTipsGroups = careTipsSectionTitles.map((title) => ({
    title,
    items: currentContent
      .filter((item) => item.mom_and_baby_section?.title === title)
      .map((item) => ({
        id: item.id,
        title: item.title,
        thumbnailUrl: item.thumbnail?.url ?? null,
      })),
  }));

  const header = (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
        <ChevronLeft size={22} color="#111827" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Baby & Mom&apos;s Growth</Text>
      <View style={styles.headerButton} />
    </View>
  );

  if (profileLoading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        {header}
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#9333ea" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {header}

      {/* HEADER TABS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab("Baby")}
          style={[styles.tabButton, activeTab === "Baby" && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Baby" && styles.activeTabText,
            ]}
          >
            Baby
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("Mom")}
          style={[styles.tabButton, activeTab === "Mom" && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Mom" && styles.activeTabText,
            ]}
          >
            Mom
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <GrowthStatsCard
          weekLabel={viewingWeek ? `Week ${viewingWeek}` : "Week —"}
          dateRangeLabel={formatDateRange(pregnancyStartDate, viewingWeek)}
          onPrevWeek={() =>
            setViewingWeek((w) => Math.max(1, (w ?? 1) - 1))
          }
          onNextWeek={() =>
            setViewingWeek((w) => Math.min(TOTAL_PREGNANCY_WEEKS, (w ?? 1) + 1))
          }
          disablePrev={(viewingWeek ?? 1) <= 1}
          disableNext={(viewingWeek ?? 1) >= TOTAL_PREGNANCY_WEEKS}
          illustration={activeTab === "Baby" ? babyInWombIllustration : momPregnancyIllustration}
          variant={activeTab}
          weightLabel={activeTab === "Baby" ? formatWeight(stage?.fetalWeightGrams) : "—"}
          heightLabel={activeTab === "Baby" ? formatHeight(stage?.fetalHeightCm) : "—"}
          subjectName={activeTab === "Baby" ? babyName : "Mom"}
          sizeComparisonLabel={activeTab === "Baby" ? stage?.fetalSizeComparison ?? null : null}
          captionOverride={activeTab === "Mom" ? momCaption : undefined}
        />

        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#9333ea" />
            <Text style={styles.loadingText}>Loading growth data...</Text>
          </View>
        ) : (
          <View style={styles.listContent}>
            <ContentVideoRow heading={activitiesSectionTitle} items={videoItems} />

            <WeeklyChangesCard heading={changesSectionTitle} items={changeItems} />

            <DrTipsRow
              heading="Dr. Tips"
              items={drTipsItems}
              accentColor={activeTab === "Baby" ? "#4CA2A3" : "#A594F9"}
            />

            {careTipsGroups.map((group) => (
              <CareTipsRow key={group.title} heading={group.title} items={group.items} />
            ))}

            <View style={{ height: 100 }} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Perfectly matches your team's StyleSheet structure!
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF9F9" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  headerButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tabButton: {
    flex: 1,
    paddingBottom: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: { borderBottomColor: "#9333ea" },
  tabText: { fontSize: 18, color: "#9CA3AF" },
  activeTabText: { fontWeight: "bold", color: "#6B21A8" },
  centerContainer: { paddingVertical: 60, justifyContent: "center", alignItems: "center" },
  loadingText: { color: "#6B7280", marginTop: 8 },
  scrollContainer: { flex: 1 },
  listContent: { paddingHorizontal: 16 },
});
