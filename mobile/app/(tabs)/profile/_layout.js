import { Stack } from "expo-router";
import {useTheme} from "../../../context/ThemeContext";
import BackButton from "../../../components/BackButton";

export default function ProfileLayout() {

    const {theme} = useTheme();

    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: theme === 'dark' ? '#121212' : '#FFFFFF',
            },
            headerTintColor: theme === 'dark' ? '#FFFFFF' : '#121212',
        }}
        >
            <Stack.Screen name="index" options={{ title: "Profile", headerShown: false}} />
            <Stack.Screen name="editProfile" options={{
                headerLeft: ()=><BackButton/>,
                headerTitle: "",
                headerTintColor: "#5125BF",
                headerStyle: {
                    backgroundColor: theme === 'dark' ? '#121212' : '#FFFFFF'
                },
                headerShadowVisible: false
            }} />
        </Stack>
    );
}
