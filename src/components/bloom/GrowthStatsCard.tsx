import { LinearGradient } from "expo-linear-gradient";
import { Sparkle } from "lucide-react-native";
import type { ImageSourcePropType } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";

import mangoIcon from "@/src/assets/bloom/icons/mango.png";

import { WeekSelector } from "./WeekSelector";

type GrowthStatsCardProps = {
  weekLabel: string;
  dateRangeLabel: string;
  onPrevWeek?: () => void;
  onNextWeek?: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
  illustration: ImageSourcePropType;
  weightLabel: string;
  heightLabel: string;
  subjectName: string;
  sizeComparisonLabel: string | null;
  variant?: "Baby" | "Mom";
  captionOverride?: string;
};

/**
 * Presentational weekly growth card (the hero header of the Baby & Mom's
 * Growth screen). All copy and navigation pass through from the screen;
 * this component only lays things out. The gradient reuses the same
 * three-stop colours as the Home screen's BabySizeCard/UpcomingAppointmentCard.
 */
export function GrowthStatsCard({
  weekLabel,
  dateRangeLabel,
  onPrevWeek,
  onNextWeek,
  disablePrev,
  disableNext,
  illustration,
  weightLabel,
  heightLabel,
  subjectName,
  sizeComparisonLabel,
  variant = "Baby",
  captionOverride,
}: GrowthStatsCardProps) {
  const isMom = variant === "Mom";

  return (
    <LinearGradient
      colors={["#A5E1AD", "#4CA2A3", "#20094D"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <WeekSelector
        weekLabel={weekLabel}
        dateRangeLabel={dateRangeLabel}
        onPrevWeek={onPrevWeek}
        onNextWeek={onNextWeek}
        disablePrev={disablePrev}
        disableNext={disableNext}
      />

      <View style={styles.illustrationArea}>
        <View style={styles.circleWrapper}>
          <View style={[styles.illustrationCircle, isMom && styles.illustrationCircleMom]}>
            <Image source={illustration} style={styles.illustration} resizeMode="cover" />
          </View>

          <View
            style={[
              styles.statBubble,
              isMom ? styles.weightBubbleMom : styles.weightBubbleBaby,
              isMom && styles.statBubbleMom,
            ]}
          >
            <Text style={styles.statValue}>{weightLabel}</Text>
            <Text style={styles.statUnit}>Weight</Text>
          </View>

          <View
            style={[
              styles.statBubble,
              isMom ? styles.heightBubbleMom : styles.heightBubbleBaby,
              isMom && styles.statBubbleMom,
            ]}
          >
            <Text style={styles.statValue}>{heightLabel}</Text>
            <Text style={styles.statUnit}>Height</Text>
          </View>

          {sizeComparisonLabel && (
            <View style={styles.sizeBadge}>
              <Sparkle
                style={styles.sizeBadgeSparkle1}
                size={16}
                color="#A594F9"
                fill="#A594F9"
              />
              <Sparkle
                style={styles.sizeBadgeSparkle2}
                size={12}
                color="#A594F9"
                fill="#A594F9"
              />
              <Sparkle
                style={styles.sizeBadgeSparkle3}
                size={6}
                color="#A594F9"
                fill="#A594F9"
              />
              <Image source={mangoIcon} style={styles.sizeBadgeImage} resizeMode="contain" />
            </View>
          )}
        </View>
      </View>

      <Text style={styles.caption}>
        {captionOverride
          ? captionOverride
          : sizeComparisonLabel
          ? `${subjectName} is the size of ${sizeComparisonLabel}`
          : `${subjectName}'s size for this week isn't available yet`}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
  },
  illustrationArea: {
    alignItems: "center",
    marginTop: 28,
    marginBottom: 16,
  },
  circleWrapper: {
    width: 218,
    height: 218,
  },
  illustrationCircle: {
    width: 218,
    height: 218,
    borderRadius: 109,
    borderWidth: 1,
    borderColor: "#D3CAFF",
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  illustrationCircleMom: {
    borderWidth: 0,
  },
  illustration: {
    width: "100%",
    height: "100%",
  },
  statBubble: {
    position: "absolute",
    width: 76,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  weightBubbleBaby: {
    left: 180,
    top: -4,
  },
  heightBubbleBaby: {
    left: 180,
    top: 76,
  },
  statBubbleMom: {
    backgroundColor: "#F3E4CD",
  },
  weightBubbleMom: {
    left: 161,
    top: -1,
  },
  heightBubbleMom: {
    left: 199,
    top: 82,
  },
  statValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#292D32",
  },
  statUnit: {
    fontSize: 9,
    fontWeight: "400",
    color: "#777777",
    marginTop: 1,
  },
  sizeBadge: {
    position: "absolute",
    left: 177,
    top: 159,
    width: 87,
    height: 87,
    borderRadius: 43.5,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  sizeBadgeImage: {
    width: 52,
    height: 52,
  },
  sizeBadgeSparkle1: {
    position: "absolute",
    left: 9,
    top: -3,
  },
  sizeBadgeSparkle2: {
    position: "absolute",
    left: 66,
    top: 59,
  },
  sizeBadgeSparkle3: {
    position: "absolute",
    left: 60,
    top: 71,
  },
  caption: {
    fontSize: 13,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 8,
  },
});
