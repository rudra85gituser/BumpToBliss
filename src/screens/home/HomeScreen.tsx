"use client";

import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GarbhaSanskarFeature from "@/src/app/garbhaSanskar";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroContainer}>
          <Text style={styles.title}>Pregnancy Tracker</Text>
          <Text style={styles.subtitle}>Track your pragnancy journey</Text>
        </View>

        <GarbhaSanskarFeature />
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
});
