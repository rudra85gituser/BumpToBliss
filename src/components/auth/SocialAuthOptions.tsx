import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SocialAuthOptionsProps = {
  googleIcon: number;
  // appleIcon: number;
  onGooglePress?: () => void;
  // onApplePress?: () => void;
};

/** UI-only social sign-in controls. Providers can be wired in by the screen later. */
export function SocialAuthOptions({
  googleIcon,
  // appleIcon,
  onGooglePress,
  // onApplePress,
}: SocialAuthOptionsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>or register with</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          accessibilityLabel="Continue with Google"
          activeOpacity={0.75}
          onPress={onGooglePress}
          style={styles.socialButton}
        >
          <Image source={googleIcon} style={styles.icon} resizeMode="contain" />
        </TouchableOpacity>
        {/* Apple sign-in button, disabled for now (see AuthContext.tsx).
        <TouchableOpacity
          accessibilityLabel="Continue with Apple"
          activeOpacity={0.75}
          onPress={onApplePress}
          style={styles.socialButton}
        >
          <Image source={appleIcon} style={styles.icon} resizeMode="contain" />
        </TouchableOpacity>
        */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 31,
  },
  divider: {
    alignItems: "center",
    flexDirection: "row",
  },
  line: {
    backgroundColor: "#EBEBEB",
    flex: 1,
    height: 1,
  },
  dividerText: {
    color: "#454545",
    fontSize: 11,
    marginHorizontal: 20,
  },
  buttons: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
    marginTop: 28,
    marginBottom: 30,
  },
  socialButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    elevation: 4,
    height: 44,
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    width: 44,
  },
  icon: {
    height: 18,
    width: 18,
  },
});
