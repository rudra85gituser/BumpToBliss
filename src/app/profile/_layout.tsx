import { Stack } from "expo-router";

import AuthGuard from "@/src/components/AuthGuard";

export default function ProfileLayout() {
  return (
    <AuthGuard>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthGuard>
  );
}
