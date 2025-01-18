import {Stack, Tabs} from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {useTheme} from "../../context/ThemeContext";

export default function TabsLayout() {

    const {theme} = useTheme();

    return (
        <Tabs screenOptions={{
            tabBarStyle: {
                paddingTop: 0,
                backgroundColor: theme === 'dark' ? '#121212' : '#FFFFFF',
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: "bold",
            },
            tabBarActiveTintColor: `#481196`,
        }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="notifications"
                options={{
                    title: "Notifications",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="notifications-outline" color={color} size={size} />
                    )
                }}
            />
            <Tabs.Screen
                name="statistics"
                options={{
                    title: "Statistics",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="stats-chart-outline" color={color} size={size} />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" color={color} size={size} />
                    )
                }}
            />

        </Tabs>
    );
}
