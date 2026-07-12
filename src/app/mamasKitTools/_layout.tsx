import { Stack } from "expo-router";

import AuthGuard from "@/src/components/AuthGuard";

export default function MamasKitToolsLayout() {
  return (
    <AuthGuard>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthGuard>
  );
}
