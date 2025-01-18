import { Stack } from "expo-router";
import {useTheme} from "../../../context/ThemeContext";

export default function StatisticsLayout() {

    const {theme} = useTheme();

    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: theme === 'dark' ? '#121212' : '#FFFFFF',
            },
            headerTintColor: theme === 'dark' ? '#FFFFFF' : '#121212',
            headerShown: false,
        }}
        >
            <Stack.Screen name="index" options={{ title: "Statistics" }} />
        </Stack>
    );
}
