"use client";

import { useEffect, useState } from "react";
import { Lightbulb, Utensils } from "lucide-react-native";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GarbhaSanskarFeature from "@/src/app/garbhaSanskar";
import { BabySizeCard } from "@/src/components/home/BabySizeCard";
import { HomeHeader } from "@/src/components/home/HomeHeader";
import { MoodTracker } from "@/src/components/home/MoodTracker";
import { PregnancyPromoCard } from "@/src/components/home/PregnancyPromoCard";
import { PremiumFeaturesCarousel } from "@/src/components/home/PremiumFeaturesCarousel";
import { QuickActionsRow } from "@/src/components/home/QuickActionsRow";
import { ShopLinksRow } from "@/src/components/home/ShopLinksRow";
import { SymptomPillGrid } from "@/src/components/home/SymptomPillGrid";
import { TestimonialsRow } from "@/src/components/home/TestimonialsRow";
import { TipBanner } from "@/src/components/home/TipBanner";
import { UpcomingAppointmentCard } from "@/src/components/home/UpcomingAppointmentCard";
import { WeeklyFAQCard } from "@/src/components/home/WeeklyFAQCard";
import { WhyBumpToBlissCard } from "@/src/components/home/WhyBumpToBlissCard";
import { YoutubeVideoCard } from "@/src/components/home/YoutubeVideoCard";
import { useAuth } from "@/src/context/AuthContext";
import { getUserProfile } from "@/src/services/userDataService";
import { calculateDueInWeeks } from "@/src/utils/pregnancyCalculations";

const FAQ_ITEMS = [
  { id: "faq-1", question: "Why does in the morning sickness, I feel dizziness..." },
  { id: "faq-2", question: "Why does in the morning sickness, I feel dizziness..." },
];

const SHOP_PRODUCTS = [
  { id: "pillow-1", name: "Pillows", price: "₹1200", rating: 4.5 },
  { id: "pillow-2", name: "Pillows", price: "₹1200", rating: 4.5 },
  { id: "pillow-3", name: "Pillows", price: "₹1200", rating: 4.5 },
];

const TESTIMONIALS = [
  {
    id: "testimonial-1",
    quote:
      "Lorem ipsum dolor sit amet consectetur. A auctor mattis sapien ut non mattis. Velit amet sit facilisi tellus mauris.",
    name: "Mishika Agarwal",
    rating: 5,
  },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const [name, setName] = useState("there");
  const [babyName, setBabyName] = useState("Your baby");
  const [dueInWeeks, setDueInWeeks] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;

    getUserProfile(user.id).then((profile) => {
      if (!profile) return;
      if (profile.full_name) setName(profile.full_name.split(" ")[0]);
      if (profile.baby_name) setBabyName(profile.baby_name);
      if (profile.conception_date) {
        setDueInWeeks(calculateDueInWeeks(new Date(profile.conception_date)));
      }
    });
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader name={name} dueInWeeks={dueInWeeks} />

        <View style={styles.section}>
          <BabySizeCard babyName={babyName} />
        </View>

        <View style={styles.section}>
          <UpcomingAppointmentCard date="24th Sept" />
        </View>

        <View style={styles.section}>
          <QuickActionsRow />
        </View>

        <View style={styles.section}>
          <PremiumFeaturesCarousel />
        </View>

        <View style={styles.section}>
          <GarbhaSanskarFeature />
        </View>

        <View style={styles.section}>
          <TipBanner
            message="Take breaks between your daily tasks"
            tagLabel="HELPFUL TIPS!"
            tagColor="#AA65FF"
            paperShadowColor="#D3BBDD"
            Icon={Lightbulb}
          />
        </View>

        <View style={styles.section}>
          <MoodTracker />
        </View>

        <View style={styles.section}>
          <PregnancyPromoCard message="Wanan know how this will help you in your pregnancy..." />
        </View>

        <View style={styles.section}>
          <TipBanner
            message="Eat less sugary drinks and cakes for better..."
            tagLabel="What to EAT?"
            tagColor="#63914B"
            paperShadowColor="#BCCAB0"
            Icon={Utensils}
          />
        </View>

        <View style={styles.section}>
          <SymptomPillGrid />
        </View>

        <View style={styles.section}>
          <WeeklyFAQCard items={FAQ_ITEMS} />
        </View>

        <View style={styles.section}>
          <WhyBumpToBlissCard />
        </View>

        <View style={styles.section}>
          <YoutubeVideoCard caption="How the 5th week of pregnancy look like" />
        </View>

        <View style={styles.section}>
          <TestimonialsRow testimonials={TESTIMONIALS} />
        </View>

        <View style={styles.section}>
          <ShopLinksRow products={SHOP_PRODUCTS} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFAFF",
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  section: {
    marginTop: 28,
  },
});
