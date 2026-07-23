"use client";

import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { profile } from "@/src/constants/profile";
import { useAuth } from "@/src/context/AuthContext";
import { getUserProfile, type UserProfile } from "@/src/services/userDataService";

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
    <Text style={styles.menuItemArrow}>{">"}</Text>
  </Pressable>
);

export default function Profile() {
  const router = useRouter();
  const { logout, user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!user) {
      Promise.resolve().then(() => setUserProfile(null));
      return;
    }

    getUserProfile(user.id).then(setUserProfile);
  }, [user]);

  const babyName = userProfile?.baby_name?.trim();
  const babies = babyName
    ? [{ id: "1", name: babyName, avatar: profile.kiki }]
    : [];

  const quickActionsMenu: MenuItem[] = [
    { icon: profile.appointments, title: "Appointments", subtitle: "Upcoming Date 15.11.25" },
    { icon: profile.reports, title: "Reports", subtitle: "View latest updates" },
    { icon: profile.dietChart, title: "Diet Chart", subtitle: "Customized" },
  ];

  const settingsMenu: MenuItem[] = [
    { icon: profile.notifications, title: "Notifications" },
    { icon: profile.faq, title: "FAQ" },
    { icon: profile.termConditions, title: "Terms & Condition" },
    { icon: profile.privacyPolicy, title: "Privacy Policy" },
    { icon: profile.contactUs, title: "Contact Us" },
    { icon: profile.settings, title: "Settings" },
    { icon: profile.deleteAccount, title: "Delete Account" },
    { icon: profile.logOut, title: "Log out" },
  ];

  const openPlaceholder = (title: string) => {
    router.push({
      pathname: "/profile/placeholder",
      params: { title },
    });
  };

  const handleMenuPress = async (title: string) => {
    if (title === "Log out") {
      try {
        await logout();
        router.replace("/auth/login");
      } catch (error) {
        Alert.alert("Logout failed", error instanceof Error ? error.message : "Please try again.");
      }
      return;
    }

    openPlaceholder(title);
  };

  return (
    <SafeAreaView style={styles.provider}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.headerIconButton}>
            <ChevronLeft size={22} color="#1f2937" />
          </Pressable>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.profileCard}>
          <Image source={profile.profileImage} style={styles.profileImage} />
          <View style={styles.profileContent}>
            <Text style={styles.profileName}>
              {userProfile?.full_name ?? user?.email?.split("@")[0] ?? "Profile"}
            </Text>
            <Text style={styles.profileEmail}>{user?.email ?? "No email available"}</Text>
            {userProfile?.conception_date && (
              <Text style={styles.profileMeta}>
                Pregnancy date {new Date(userProfile.conception_date).toLocaleDateString()}
              </Text>
            )}
          </View>
          <Pressable style={styles.editButton} onPress={() => openPlaceholder("Edit Profile")}>
            <Image source={profile.edit} style={styles.editIcon} />
          </Pressable>
        </View>

        <View style={styles.babiesSection}>
          <Text style={styles.babiesTitle}>Babies</Text>
          <View style={styles.babiesRow}>
            {babies.map((baby) => (
              <View key={baby.id} style={styles.babyItem}>
                <Image source={baby.avatar} style={styles.babyAvatar} />
                <Text style={styles.babyName}>{baby.name}</Text>
              </View>
            ))}
            {!babyName && <Text style={styles.emptyBabyText}>No baby profile added</Text>}
            <Pressable style={styles.addBabyButton} onPress={() => openPlaceholder("Add Baby")}>
              <Text style={styles.addBabyText}>+</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.menuCard}>
          {quickActionsMenu.map((item, index) => (
            <View key={item.title}>
              <MenuItemRow item={item} onPress={() => handleMenuPress(item.title)} />
              {index < quickActionsMenu.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>

        <View style={styles.menuCard}>
          {settingsMenu.map((item, index) => (
            <View key={item.title}>
              <MenuItemRow item={item} onPress={() => handleMenuPress(item.title)} />
              {index < settingsMenu.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  provider: {
    flex: 1,
    backgroundColor: "#f5f5f7",
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
  },
  headerIconButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  headerSpacer: {
    width: 36,
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
  profileMeta: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
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
  emptyBabyText: {
    flex: 1,
    fontSize: 12,
    color: "#9ca3af",
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
