import {Stack} from "expo-router";
import {useTheme} from "../../context/ThemeContext";


export default function AuthLayout() {
    const { theme } = useTheme();

    return (
        <Stack>
            <Stack.Screen name="login" options={{
                headerTitle: "",
                headerTintColor: "#5125BF",
                headerStyle: {
                    backgroundColor: theme === 'dark' ? '#121212' : '#FFFFFF'
                },
                headerShadowVisible: false
            }} />
            <Stack.Screen name="forgot-password" options={{
                headerTitle: "",
                headerTintColor: "#5125BF",
                headerStyle: {
                    backgroundColor: theme === 'dark' ? '#121212' : '#FFFFFF'
                },
                headerShadowVisible: false
            }} />
            <Stack.Screen name="signup" options={{
                headerTitle: "",
                headerTintColor: "#5125BF",
                headerStyle: {
                    backgroundColor: theme === 'dark' ? '#121212' : '#FFFFFF'
                },
                headerShadowVisible: false
            }} />
        </Stack>
    )
}