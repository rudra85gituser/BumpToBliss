import { Tabs } from 'expo-router';
import AuthGuard from '@/src/components/AuthGuard';

export default function TabLayout() {
  return (
    <AuthGuard>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#20094D',
          tabBarInactiveTintColor: '#999',
        }}
      >
        <Tabs.Screen name="home-wrapper" options={{ title: 'Home' }} />
        <Tabs.Screen name="bloom-wrapper" options={{ title: 'Bloom' }} />
        <Tabs.Screen name="mamas-kit-wrapper" options={{ title: "Mama's Kit" }} />
        <Tabs.Screen name="profile-wrapper" options={{ title: 'Profile' }} />
      </Tabs>
    </AuthGuard>
  );
}
