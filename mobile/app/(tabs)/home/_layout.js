import { Stack } from "expo-router";
import {useTheme} from "../../../context/ThemeContext";
import BackButton from "../../../components/BackButton";

export default function HomeLayout() {
    const {theme} = useTheme();
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Home",
                    headerStyle: {
                        backgroundColor: theme === 'dark' ? '#121212' : '#FFFFFF',
                    },
                    headerTintColor: theme === 'dark' ? '#FFFFFF' : '#121212',
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="addParrot"
                options={{
                    headerLeft: ()=><BackButton/>,
                    headerTitle: "",
                    headerTintColor: "#5125BF",
                    headerStyle: {
                        backgroundColor: theme === 'dark' ? '#121212' : '#FFFFFF'
                    },
                    headerShadowVisible: false
                }}
            />
            <Stack.Screen
                name="editParrot"
                options={{
                    headerLeft: ()=><BackButton/>,
                    headerTitle: "",
                    headerTintColor: "#5125BF",
                    headerStyle: {
                        backgroundColor: theme === 'dark' ? '#121212' : '#FFFFFF'
                    },
                    headerShadowVisible: false
                }}
            />

            <Stack.Screen
                name="weightParrot"
                options={{
                    headerLeft: ()=><BackButton/>,
                    headerTitle: "",
                    headerTintColor: "#5125BF",
                    headerStyle: {
                        backgroundColor: theme === 'dark' ? '#121212' : '#FFFFFF'
                    },
                    headerShadowVisible: false
                }}
            />
        </Stack>
    );
}
