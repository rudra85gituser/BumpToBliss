import { LinearGradient } from "expo-linear-gradient";
import { Gem } from "lucide-react-native";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import basicAffirmations from "@/src/assets/home/photos/basic-affirmations.png";
import basicBabyGrowth from "@/src/assets/home/photos/basic-baby-growth.png";
import basicCommunity from "@/src/assets/home/photos/basic-community.png";
import basicDailyActivities from "@/src/assets/home/photos/basic-daily-activities.png";
import basicKickCounter from "@/src/assets/home/photos/basic-kick-counter.png";
import basicSoothingMusic from "@/src/assets/home/photos/basic-soothing-music.png";
import premiumDietPlan from "@/src/assets/home/photos/premium-diet-plan.png";
import premiumDoctorConsultation from "@/src/assets/home/photos/premium-doctor-consultation.png";
import premiumExpertSessions from "@/src/assets/home/photos/premium-expert-sessions.png";
import premiumTailoredExercises from "@/src/assets/home/photos/premium-tailored-exercises.png";
import premiumYoga from "@/src/assets/home/photos/premium-yoga.png";

type PlanFeature = {
  key: string;
  caption: string;
  image?: number;
};

type Plan = {
  key: string;
  name: string;
  price: string;
  billing: string;
  subtitle: string;
  highlighted: boolean;
  features: PlanFeature[];
};

const PLANS: Plan[] = [
  {
    key: "basic",
    name: "Basic Plan",
    price: "₹2400",
    billing: "Monthly",
    subtitle: "Everything you need for a mindful and healthy pregnancy includes:",
    highlighted: false,
    features: [
      { key: "daily-activities", caption: "Daily Garbhsanskar activities", image: basicDailyActivities },
      { key: "baby-growth", caption: "Track baby's growth - weekly insights", image: basicBabyGrowth },
      { key: "soothing-music", caption: "Soothing music & mantras for positivity", image: basicSoothingMusic },
      { key: "affirmations", caption: "Affirmations & mood boosters", image: basicAffirmations },
      { key: "kick-counter", caption: "Kick counter & health alerts", image: basicKickCounter },
      { key: "community", caption: "Community access connect with moms to be", image: basicCommunity },
    ],
  },
  {
    key: "premium",
    name: "Premium Plan",
    price: "₹3400",
    billing: "Monthly",
    subtitle: "Personalized care for every stage of your pregnancy. Everything in Basic plus:",
    highlighted: true,
    features: [
      { key: "all-basic", caption: "Including all Basic Plan", image: basicDailyActivities },
      { key: "yoga", caption: "Yoga teacher guidance for strength & flexibility", image: premiumYoga },
      {
        key: "doctor-consultation",
        caption: 'Doctor consultation & "Ask your Doctor Anytime" support',
        image: premiumDoctorConsultation,
      },
      {
        key: "tailored-exercises",
        caption: "Tailored exercises for normal delivery & high-risk cases",
        image: premiumTailoredExercises,
      },
      { key: "diet-plan", caption: "Personalized diet plans for a healthy pregnancy", image: premiumDietPlan },
      { key: "expert-sessions", caption: "1-to-1 premium sessions with experts", image: premiumExpertSessions },
    ],
  },
];

type PremiumFeaturesCarouselProps = {
  onStartFreeTrial?: () => void;
};

const pairUp = <T,>(items: T[]): T[][] => {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }
  return rows;
};

/**
 * Presentational premium-plan carousel. The trial CTA passes through from
 * the Home screen; plan content is static copy for now. Feature tiles fall
 * back to a colour placeholder until their real photo is wired in.
 */
export function PremiumFeaturesCarousel({
  onStartFreeTrial,
}: PremiumFeaturesCarouselProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headingRow}>
        <Gem size={22} color="#806EDB" />
        <Text style={styles.heading}>Unlock All Premium Features</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.plansRow}
      >
        {PLANS.map((plan) => (
          <View
            key={plan.key}
            style={[styles.planCard, plan.highlighted && styles.planCardHighlighted]}
          >
            <View style={styles.planHeaderRow}>
              <Text style={styles.planName}>{plan.name}</Text>
              <View style={styles.priceBlock}>
                <Text style={styles.price}>{plan.price}</Text>
                <Text style={styles.billing}>{plan.billing}</Text>
              </View>
            </View>
            <Text style={styles.planSubtitle}>{plan.subtitle}</Text>

            <View style={styles.featureGrid}>
              {pairUp(plan.features).map((row, rowIndex) => (
                <View key={rowIndex} style={styles.featureRow}>
                  {row.map((feature) => (
                    <View key={feature.key} style={styles.featureTile}>
                      {feature.image && (
                        <Image
                          source={feature.image}
                          style={styles.featureTileImage}
                          resizeMode="contain"
                        />
                      )}
                      <LinearGradient
                        colors={["transparent", "rgba(0, 0, 0, 0.15)", "rgba(0, 0, 0, 0.75)"]}
                        locations={[0, 0.45, 1]}
                        style={styles.featureTileOverlay}
                      >
                        <Text style={styles.featureTileText} numberOfLines={3}>
                          {feature.caption}
                        </Text>
                      </LinearGradient>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.trialButton}
        activeOpacity={0.85}
        onPress={onStartFreeTrial}
      >
        <Text style={styles.trialButtonText}>Start Free Trial</Text>
      </TouchableOpacity>
    </View>
  );
}

const PLAN_CARD_WIDTH = 260;
const PLAN_CARD_PADDING = 16;
const FEATURE_TILE_GAP = 8;
const FEATURE_TILE_WIDTH =
  (PLAN_CARD_WIDTH - PLAN_CARD_PADDING * 2 - FEATURE_TILE_GAP) / 2;
const FEATURE_TILE_HEIGHT = FEATURE_TILE_WIDTH * (112 / 150);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EEF5F5",
    borderRadius: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  heading: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#292D32",
  },
  plansRow: {
    paddingHorizontal: 20,
    gap: 16,
  },
  planCard: {
    width: PLAN_CARD_WIDTH,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#C3E0E0",
    borderRadius: 18,
    padding: PLAN_CARD_PADDING,
  },
  planCardHighlighted: {
    borderColor: "#A594F9",
  },
  planHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  planName: {
    fontSize: 12,
    fontWeight: "500",
    color: "#000000",
  },
  priceBlock: {
    alignItems: "flex-end",
  },
  price: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4CA2A3",
  },
  billing: {
    fontSize: 8,
    color: "#777777",
    marginTop: 2,
  },
  planSubtitle: {
    fontSize: 9,
    fontWeight: "300",
    color: "#777777",
    marginTop: 8,
    marginBottom: 12,
  },
  featureGrid: {
    flexDirection: "column",
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: FEATURE_TILE_GAP,
  },
  featureTile: {
    width: FEATURE_TILE_WIDTH,
    height: FEATURE_TILE_HEIGHT,
    borderRadius: 12,
    backgroundColor: "#D9D2EC",
    overflow: "hidden",
  },
  featureTileImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  featureTileOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  featureTileText: {
    fontSize: 9,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  trialButton: {
    alignSelf: "center",
    backgroundColor: "#20094D",
    borderWidth: 1,
    borderColor: "#A5E1AD",
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 10,
    marginTop: 16,
  },
  trialButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
  },
});
