import { LinearGradient } from "expo-linear-gradient";
import type { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AuthFormShellProps = PropsWithChildren;

/**
 * Presentational auth page frame. Business logic and navigation stay in the
 * screen that renders this component.
 */
export function AuthFormShell({ children }: AuthFormShellProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <LinearGradient
        colors={["#A5E1AD", "#E6FFFF"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.page}
      >
        <View pointerEvents="none" style={styles.backgroundLayer}>
          <View style={styles.bottomBackground} />
          <View style={styles.topGlow} />
        </View>
        <View style={styles.content}>
          <View style={styles.card}>{children}</View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0E9E9",
  },
  page: {
    flex: 1,
  },
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  bottomBackground: {
    position: "absolute",
    top: "53%",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#F0E9E9",
  },
  topGlow: {
    position: "absolute",
    top: 92,
    left: 22,
    right: 22,
    height: 178,
    borderTopLeftRadius: 68,
    borderTopRightRadius: 68,
    backgroundColor: "rgba(255, 255, 255, 0.32)",
  },
  content: {
    flex: 1,
    paddingHorizontal: 21,
    paddingTop: 106,
    paddingBottom: 32,
  },
  card: {
    width: "100%",
    maxWidth: 349,
    alignSelf: "center",
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    paddingHorizontal: 12,
    paddingVertical: 28,
    minHeight: 623,
    zIndex: 1,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 8,
  },
});
