"use client";

import React, { useState, useMemo } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { router } from "expo-router";
import UserInputDate from "./userInputDate";
import { usePregnancy } from "../../context/PregnancyContext";
import { useGarbhaAllData } from "../../hooks/useGarbhaAllData";

interface SectionWithSubsections {
  id: number;
  title: string;
  garbha_sanskar_subsections: Array<{
    id: number;
    title: string;
  }>;
}

export default function GarbhaSanskarCard() {
  const [showDateInput, setShowDateInput] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
  const [selectedSubsectionId, setSelectedSubsectionId] = useState<number | null>(null);

  const { pregnancyStartDate, pregnancyDay, pregnancyWeek, setPregnancyStartDate } =
    usePregnancy();
  const { loading, error, sections, content, refetch } = useGarbhaAllData(
    pregnancyDay,
    pregnancyWeek
  );

  const handleDateSelected = (date: Date, day: number, week: number) => {
    setPregnancyStartDate(date);
    setShowDateInput(false);
    setSelectedSectionId(null);
    setSelectedSubsectionId(null);
  };

  // Get subsections for selected section (from section data directly)
  const subsectionsForSection = useMemo(() => {
    if (!selectedSectionId || !sections) return [];

    const selectedSection = sections.find(
      (s: any) => s.id === selectedSectionId
    );
    return selectedSection?.garbha_sanskar_subsections || [];
  }, [selectedSectionId, sections]);

  // Get content for selected section + subsection
  const filteredContent = useMemo(() => {
    if (!selectedSectionId || !content) return [];
    if (!selectedSubsectionId) return [];

    return content.filter(
      (item: any) =>
        item.garbha_sanskar_section?.id === selectedSectionId &&
        item.garbha_sanskar_subsection?.id === selectedSubsectionId
    );
  }, [selectedSectionId, selectedSubsectionId, content]);

  const handleChangeDate = () => {
    setShowDateInput(true);
    setSelectedSectionId(null);
    setSelectedSubsectionId(null);
  };

  // Set first section as default when sections load
  React.useEffect(() => {
    if (sections && sections.length > 0 && !selectedSectionId) {
      setSelectedSectionId(sections[0].id);
    }
  }, [sections, selectedSectionId]);

  // Reset subsection when section changes
  React.useEffect(() => {
    setSelectedSubsectionId(null);
  }, [selectedSectionId]);

  // Set first subsection as default when subsections load
  React.useEffect(() => {
    if (subsectionsForSection.length > 0 && !selectedSubsectionId) {
      setSelectedSubsectionId(subsectionsForSection[0].id);
    }
  }, [subsectionsForSection, selectedSubsectionId]);

  return (
    <>
      <UserInputDate
        visible={showDateInput || !pregnancyStartDate}
        onDateSelected={handleDateSelected}
        onCancel={() => setShowDateInput(false)}
      />

      <SafeAreaProvider style={styles.provider}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>What is Garbha Sanskar?</Text>
              <Text style={styles.subtitle}>
                Learn all about garba sanskar in this section
              </Text>
            </View>

            {/* Pregnancy Info */}
            {pregnancyDay && pregnancyWeek && (
              <View style={styles.pregnancyInfo}>
                <View style={styles.pregnancyStats}>
                  <View style={styles.statBox}>
                    <Text style={styles.statValue}>{pregnancyDay}</Text>
                    <Text style={styles.statLabel}>Days</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statValue}>{pregnancyWeek}</Text>
                    <Text style={styles.statLabel}>Weeks</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={handleChangeDate}>
                  <Text style={styles.changeDateLink}>Change Date</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Loading State */}
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#20094D" />
                <Text style={styles.loadingText}>Loading content...</Text>
              </View>
            )}

            {/* Error State */}
            {error && !loading && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={refetch}>
                  <Text style={styles.retryButtonText}>Try Again</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Level 1: Sections Tabs */}
            {!loading && !error && sections && sections.length > 0 && (
              <>
                <Text style={styles.levelTitle}>Categories</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.sectionsScroll}
                >
                  <View style={styles.sectionsRow}>
                    {sections.map((section: any) => (
                      <TouchableOpacity
                        key={section.id}
                        onPress={() => setSelectedSectionId(section.id)}
                        style={[
                          styles.tab,
                          selectedSectionId === section.id && styles.tabActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.tabText,
                            selectedSectionId === section.id && styles.tabTextActive,
                          ]}
                          numberOfLines={1}
                        >
                          {section.title}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>

                {/* Level 2: Subsections Tabs */}
                {selectedSectionId && subsectionsForSection.length > 0 && (
                  <>
                    <Text style={styles.levelTitle}>Sub-Categories</Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={styles.subsectionsScroll}
                    >
                      <View style={styles.subsectionsRow}>
                        {subsectionsForSection.map((subsection: any) => (
                          <TouchableOpacity
                            key={subsection.id}
                            onPress={() => setSelectedSubsectionId(subsection.id)}
                            style={[
                              styles.tab,
                              styles.subsectionTab,
                              selectedSubsectionId === subsection.id &&
                                styles.tabActive,
                            ]}
                          >
                            <Text
                              style={[
                                styles.tabText,
                                selectedSubsectionId === subsection.id &&
                                  styles.tabTextActive,
                              ]}
                              numberOfLines={1}
                            >
                              {subsection.title}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ScrollView>

                    {/* Level 3: Content Items */}
                    {selectedSubsectionId && (
                      <>
                        {filteredContent.length > 0 ? (
                          <FlatList
                            data={filteredContent}
                            renderItem={({ item }) => (
                              <TouchableOpacity
                                    style={styles.contentItem}
                                    onPress={() =>
                                      router.push({
                                        pathname: "/garbhaSanskar/contentDetail",
                                        params: {
                                         contentId: item.id,
                                         pregnancyDay,
                                         pregnancyWeek,

                                        },
                                      })
                                    }
                                  >
                                {item.thumbnail && (
                                  <Image
                                    source={{
                                      uri: item.thumbnail.url ||
                                        "https://via.placeholder.com/100",
                                    }}
                                    style={styles.contentImage}
                                  />
                                )}

                                <View style={styles.contentMeta}>
                                  <Text style={styles.contentTitle} numberOfLines={2}>
                                    {item.title}
                                  </Text>
                                  <Text
                                    style={styles.contentDescription}
                                    numberOfLines={2}
                                  >
                                    {item.shortDescription || item.description}
                                  </Text>

                                  <View style={styles.contentFooter}>
                                    <View
                                      style={[
                                        styles.contentType,
                                        {
                                          backgroundColor:
                                            item.contentsType === "video"
                                              ? "#F4A460"
                                              : item.contentsType === "article"
                                              ? "#B8A2D1"
                                              : "#A8D8E1",
                                        },
                                      ]}
                                    >
                                      <Text style={styles.contentTypeText}>
                                        {item.contentsType}
                                      </Text>
                                    </View>
                                    {item.durationMinutes && (
                                      <Text style={styles.duration}>
                                        {item.durationMinutes} min
                                      </Text>
                                    )}
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                            keyExtractor={(item: any) => item.id.toString()}
                            scrollEnabled={false}
                            ListEmptyComponent={
                              <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>
                                  No content available
                                </Text>
                              </View>
                            }
                          />
                        ) : (
                          <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>
                              No content available for this subsection
                            </Text>
                          </View>
                        )}
                      </>
                    )}
                  </>
                )}

                {/* No Subsections Message */}
                {selectedSectionId && subsectionsForSection.length === 0 && (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                      No subsections available
                    </Text>
                  </View>
                )}
              </>
            )}

            {/* Empty State */}
            {!loading && !error && (!sections || sections.length === 0) && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No sections available</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  provider: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F1F1F",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  pregnancyInfo: {
    backgroundColor: "#F4EFF8",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  pregnancyStats: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#E8F4F8",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#20094D",
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  changeDateLink: {
    fontSize: 13,
    color: "#4CA2A3",
    fontWeight: "600",
    textAlign: "center",
  },
  levelTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    marginTop: 16,
  },
  sectionsScroll: {
    marginBottom: 16,
  },
  sectionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  subsectionsScroll: {
    marginBottom: 16,
  },
  subsectionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  subsectionTab: {
    backgroundColor: "#F3F4F6",
    borderColor: "#d1d5db",
  },
  tabActive: {
    backgroundColor: "#20094D",
    borderColor: "#20094D",
  },
  tabText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
  },
  tabTextActive: {
    color: "#FFF",
  },
  contentItem: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  contentImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
  },
  contentMeta: {
    flex: 1,
    justifyContent: "space-between",
  },
  contentTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F1F1F",
    marginBottom: 4,
  },
  contentDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  contentFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  contentType: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  contentTypeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFF",
    textTransform: "capitalize",
  },
  duration: {
    fontSize: 11,
    color: "#999",
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#666",
  },
  errorContainer: {
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
    alignItems: "center",
  },
  errorText: {
    fontSize: 13,
    color: "#DC2626",
    marginBottom: 12,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#DC2626",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFF",
  },
  emptyContainer: {
    paddingVertical: 30,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
  },
});
