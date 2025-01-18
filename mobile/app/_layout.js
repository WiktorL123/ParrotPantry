import {Slot, Stack} from 'expo-router'
import "../global.css";
import ThemeProvider from "../context/ThemeContext";
import Toast from "react-native-toast-message";
import {UserProvider} from "../context/UserContext";



const RootLayout = () => {

    return (
        <ThemeProvider>
            <UserProvider>
                <Toast className="z-10"/>
                <Stack>
                    <Stack.Screen name="index" options={{headerShown: false}}/>
                    <Stack.Screen name="(auth)" options={{headerShown: false}}/>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                </Stack>
            </UserProvider>
        </ThemeProvider>
    )
}

export default RootLayout;


