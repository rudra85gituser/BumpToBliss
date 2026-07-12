import { Stack } from "expo-router";
import { PregnancyProvider } from "@/src/context/PregnancyContext";
import AuthGuard from "@/src/components/AuthGuard";

export default function GarbhaSanskarLayout() {
  return (
    <AuthGuard>
      <PregnancyProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </PregnancyProvider>
    </AuthGuard>
  );
}
