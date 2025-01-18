import { Stack } from "expo-router";

export default function NotificationsLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Notifications" }} />
            <Stack.Screen name="medicine" options={{ title: "Medicine"}} />
            <Stack.Screen name="weighting" options={{ title: "Weighting" }} />
            <Stack.Screen name="vet-visit" options={{ title: "Vet Visit" }} />
            <Stack.Screen name="feeding" options={{ title: "Feeding" }} />
        </Stack>
    );
}
