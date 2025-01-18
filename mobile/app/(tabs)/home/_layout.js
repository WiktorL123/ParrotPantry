import { Stack } from "expo-router";

export default function HomeLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Home"}} />
            <Stack.Screen name="addParrot" options={{ title: "Add Parrot" }} />
            <Stack.Screen name="editParrot" options={{ title: "Edit Parrot" }} />
        </Stack>
    );
}
