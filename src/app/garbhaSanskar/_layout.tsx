import { Stack } from "expo-router";
import { PregnancyProvider } from "@/src/context/PregnancyContext";

export default function GarbhaSanskarLayout() {
  return (
    <PregnancyProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </PregnancyProvider>
  );
}