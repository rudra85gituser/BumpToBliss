"use client";

import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { AuthFormShell } from "@/src/components/auth/AuthFormShell";
import { AuthTextField } from "@/src/components/auth/AuthTextField";
import { SocialAuthOptions } from "@/src/components/auth/SocialAuthOptions";
import { Logo } from "@/src/components/brand/Logo";
import { authImages } from "@/src/constants/authImages";
import { useAuth } from "@/src/context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { isAuthenticated, isLoading, login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Missing details", "Enter your email and password.");
      return;
    }

    try {
      setSubmitting(true);
      await login(email, password);
    } catch (error) {
      Alert.alert("Login failed", error instanceof Error ? error.message : "Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      Alert.alert(
        "Google sign-in failed",
        error instanceof Error ? error.message : "Please try again.",
      );
    }
  };

  // const handleAppleLogin = async () => {
  //   try {
  //     await loginWithApple();
  //   } catch (error) {
  //     Alert.alert(
  //       "Apple sign-in failed",
  //       error instanceof Error ? error.message : "Please try again.",
  //     );
  //   }
  // };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/(tabs)/home-wrapper");
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <AuthFormShell>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Logo size={36} />
            </View>
          </View>

          {/* Header */}
          <Text style={styles.title}>Log In</Text>
          <Text style={styles.subtitle}>
            Welcome back to your personalized tracking
          </Text>

          {/* Email Input */}
          <AuthTextField
            label="Email"
            placeholder="ex - abc@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          {/* Password Input */}
          <AuthTextField
            label="Password"
            placeholder="**********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="current-password"
          />

          {/* Log In Button */}
          <TouchableOpacity
            onPress={handleLogin}
            activeOpacity={0.8}
            disabled={submitting}
            style={[styles.primaryButton, submitting && styles.disabledButton]}
          >
            <Text style={styles.primaryButtonText}>
              {submitting ? "Logging in..." : "Log In"}
            </Text>
          </TouchableOpacity>

          <SocialAuthOptions
            googleIcon={authImages.google}
            onGooglePress={handleGoogleLogin}
            // appleIcon={authImages.apple}
            // onApplePress={handleAppleLogin}
          />

          {/* Signup Link */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>{"Don't have an account? "}</Text>
            <TouchableOpacity onPress={() => router.push("/auth/signup")}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
    </AuthFormShell>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginBottom: 29,
  },
  logo: {
    width: 57,
    height: 57,
    borderRadius: 29,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F0F10",
    marginBottom: 11,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    color: "#606060",
    textAlign: "center",
    marginBottom: 23,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#20094D",
    borderRadius: 14,
    height: 46,
    justifyContent: "center",
  },
  disabledButton: {
    opacity: 0.65,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#454545",
  },
  footerLink: {
    fontSize: 12,
    color: "#0F0F10",
    fontWeight: "600",
  },
});
