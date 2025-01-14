import {Slot, Stack} from 'expo-router'
import "../global.css";
import ThemeProvider from "../context/ThemeContext";



const RootLayout = () => {

    return (
        <ThemeProvider>
            <Stack>
                <Stack.Screen name="index" options={{headerShown: false}}/>
                <Stack.Screen name="(auth)" options={{headerShown: false}}/>
            </Stack>
        </ThemeProvider>
    )
}

export default RootLayout;


