"use client";

import React, { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { profile } from "@/src/constants/profile";

type MenuItem = {
  icon: ImageSourcePropType;
  title: string;
  subtitle?: string;
};

type MenuItemRowProps = {
  item: MenuItem;
  onPress?: () => void;
};

const MenuItemRow: React.FC<MenuItemRowProps> = ({ item, onPress }) => (
  <Pressable style={styles.menuItemRow} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <Image source={item.icon} style={styles.menuItemIcon} resizeMode="contain" />
      <View style={styles.menuItemContent}>
        <Text style={styles.menuItemTitle}>{item.title}</Text>
        {item.subtitle && <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>}
      </View>
    </View>
    <Text style={styles.menuItemArrow}>â€º</Text>
  </Pressable>
);

export default function Profile() {
  const router = useRouter();

  const [babies] = useState([
    { id: "1", name: "Kiki", avatar: profile.kiki },
    { id: "2", name: "Ayu", avatar: profile.ayu },
  ]);

  const quickActionsMenu = [
    { icon: profile.appointments, title: "Appointments", subtitle: "Upcoming Date 15.11.25" },
    { icon: profile.reports, title: "Reports", subtitle: "View latest updates" },
    { icon: profile.dietChart, title: "Diet Chart", subtitle: "Customized" },
  ];

  const settingsMenu = [
    { icon: profile.notifications, title: "Notifications" },
    { icon: profile.faq, title: "FAQ" },
    { icon: profile.termConditions, title: "Terms & Condition" },
    { icon: profile.privacyPolicy, title: "Privacy Policy" },
    { icon: profile.contactUs, title: "Contact Us" },
    { icon: profile.settings, title: "Settings" },
    { icon: profile.deleteAccount, title: "Delete Account" },
    { icon: profile.logOut, title: "Log out" },
  ];

  return (
    <SafeAreaProvider style={styles.provider}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.headerBack}>â€¹</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <Image source={profile.profileImage} style={styles.profileImage} />
          <View style={styles.profileContent}>
            <Text style={styles.profileName}>Soma Trivedi</Text>
            <Text style={styles.profileEmail}>soma34@gmail.com</Text>
          </View>
          <Pressable style={styles.editButton}>
            <Image source={profile.edit} style={styles.editIcon} />
          </Pressable>
        </View>

        {/* Babies Section */}
        <View style={styles.babiesSection}>
          <Text style={styles.babiesTitle}>Babies</Text>
          <View style={styles.babiesRow}>
            {babies.map((baby) => (
              <View key={baby.id} style={styles.babyItem}>
                <Image source={baby.avatar} style={styles.babyAvatar} />
                <Text style={styles.babyName}>{baby.name}</Text>
              </View>
            ))}
            <Pressable style={styles.addBabyButton}>
              <Text style={styles.addBabyText}>+</Text>
            </Pressable>
          </View>
        </View>

        {/* Quick Actions Card */}
        <View style={styles.menuCard}>
          {quickActionsMenu.map((item, index) => (
            <View key={index}>
              <MenuItemRow item={item} onPress={() => console.log(`Pressed ${item.title}`)} />
              {index < quickActionsMenu.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>

        {/* Settings Card */}
        <View style={styles.menuCard}>
          {settingsMenu.map((item, index) => (
            <View key={index}>
              <MenuItemRow item={item} onPress={() => console.log(`Pressed ${item.title}`)} />
              {index < settingsMenu.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  provider: {
    flex: 1,
    backgroundColor: "#f5f5f7",
    paddingBottom: 100,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: "#ffffff",
  },
  headerBack: {
    fontSize: 24,
    color: "#1f2937",
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  headerSpacer: {
    width: 24,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    elevation: 2,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  profileContent: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 12,
    color: "#6b7280",
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#a8d8e1",
    justifyContent: "center",
    alignItems: "center",
  },
  editIcon: {
    width: 18,
    height: 18,
  },
  babiesSection: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  babiesTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
  },
  babiesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  babyItem: {
    alignItems: "center",
  },
  babyAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  babyName: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "500",
  },
  addBabyButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#d1d5db",
    justifyContent: "center",
    alignItems: "center",
  },
  addBabyText: {
    fontSize: 20,
    color: "#9ca3af",
    fontWeight: "300",
  },
  menuCard: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
  },
  menuItemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuItemIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 2,
  },
  menuItemArrow: {
    fontSize: 18,
    color: "#d1d5db",
    marginLeft: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#f3f4f6",
  },
});
