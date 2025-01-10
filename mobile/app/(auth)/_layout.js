import {Stack} from "expo-router";


export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen name="login" options={{
                headerTitle: "",
                headerTintColor: "#5125BF",
                headerStyle: {
                    backgroundColor: "#ffffff"
                },
                headerShadowVisible: false
            }} />
            <Stack.Screen name="forgot-password" options={{
                headerTitle: "",
                headerTintColor: "#5125BF",
                headerStyle: {
                    backgroundColor: "#ffffff"
                },
                headerShadowVisible: false
            }} />
            <Stack.Screen name="signup" options={{
                headerTitle: "",
                headerTintColor: "#5125BF",
                headerStyle: {
                    backgroundColor: "#ffffff"
                },
                headerShadowVisible: false
            }} />
        </Stack>
    )
}