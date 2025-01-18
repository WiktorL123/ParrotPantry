import { Stack } from "expo-router";
import {useTheme} from "../../../context/ThemeContext";

export default function NotificationsLayout() {

    const {theme} = useTheme();

    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: theme === 'dark' ? '#121212' : '#FFFFFF'
            },
            headerTitleStyle: {
                color: theme === 'dark' ? '#FFFFFF' : '#121212'
            },
            headerTintColor: theme === 'dark' ? '#FFFFFF' : '#121212',
            headerShown: false,
        }}>
            <Stack.Screen name="index" options={{ title: "Notifications" }} />
            <Stack.Screen name="medicine" options={{ title: "Medicine"}} />
            <Stack.Screen name="weighting" options={{ title: "Weighting" }} />
            <Stack.Screen name="vet-visit" options={{ title: "Vet Visit" }} />
            <Stack.Screen name="feeding" options={{ title: "Feeding" }} />
        </Stack>
    );
}
