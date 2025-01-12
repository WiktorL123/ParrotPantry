import {Slot, Stack} from 'expo-router'
import "../global.css";
import ThemeProvider from "../context/ThemeContext";
import Toast from "react-native-toast-message";

const RootLayout = () => {
    return (
        <ThemeProvider>
            <Toast className="z-10"/>
            <Stack>
                <Stack.Screen name="index" options={{headerShown: false}}/>
                <Stack.Screen name="(auth)" options={{headerShown: false}}/>
            </Stack>
        </ThemeProvider>
    )
}

export default RootLayout;


