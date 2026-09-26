// import { Tabs } from 'expo-router';
// import AuthGuard from '@/src/components/AuthGuard';

// export default function TabLayout() {
//   return (
//     <AuthGuard>
//       <Tabs
//         screenOptions={{
//           headerShown: false,
//           tabBarActiveTintColor: '#20094D',
//           tabBarInactiveTintColor: '#999',
//         }}
//       >
//         <Tabs.Screen name="home-wrapper" options={{ title: 'Home' }} />
//         <Tabs.Screen name="bloom-wrapper" options={{ title: 'Bloom' }} />
//         <Tabs.Screen name="mamas-kit-wrapper" options={{ title: "Mama's Kit" }} />
//         <Tabs.Screen name="profile-wrapper" options={{ title: 'Profile' }} />
//       </Tabs>
//     </AuthGuard>
//   );
// }
import AuthGuard from "@/src/components/AuthGuard";
import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabLayout() {
  return (
    <AuthGuard>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "rgba(255, 255, 255, 0.5)",
          tabBarStyle: {
            position: "absolute",
            left: 16,
            right: 16,
            bottom: 16,
            height: 64,
            backgroundColor: "#20094D",
            borderRadius: 24,
            borderTopWidth: 0,
            elevation: 8,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
          },
          tabBarItemStyle: {
            paddingVertical: 8,
          },
        }}
      >
        <Tabs.Screen
          name="home-wrapper"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../../assets/tabs/home.png")}
                style={{ width: 24, height: 24, tintColor: color }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bloom-wrapper"
          options={{
            title: "Bloom",
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../../assets/tabs/bloom.png")}
                style={{ width: 24, height: 24, tintColor: color }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="mamas-kit-wrapper"
          options={{
            title: "Mama's Kit",
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../../assets/tabs/mamas-kit.png")}
                style={{ width: 24, height: 24, tintColor: color }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile-wrapper"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../../assets/tabs/profile.png")}
                style={{ width: 24, height: 24, tintColor: color }}
                resizeMode="contain"
              />
            ),
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}
