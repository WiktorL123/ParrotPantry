import { StatusBar } from 'expo-status-bar';
import {Image, Text, View} from 'react-native';
import { useFonts } from "expo-font";
import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from "@expo-google-fonts/poppins";
import {useRouter} from 'expo-router'
import Button from '../components/Button'
import Header from '../components/Heading'
import {useTheme} from "../context/ThemeContext";
import ThemeSwitch from "../components/Switch"


export default function App() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_500Medium,
    });

    const router = useRouter()

    const { theme } = useTheme();
    const backgroundColor = theme === 'dark' ? '#121212' : '#FFFFFF'


    return (
        <View className={`flex-1 items-center justify-center p-5 ${theme === 'dark' ? "bg-darkBgPrimary" : "bg-white"}`}>
            <StatusBar
                style={theme === 'dark' ? 'light' : 'dark'}
                backgroundColor={theme === 'dark' ? '#121212' : '#FFFFFF'}
            />
            <ThemeSwitch />
            <Image
                source={require('../assets/images/papuga.png')}
                style={{ width: 200, height: 210, marginBottom: 20}}
            />
            <Header className="text-center" text="ParrotPantry"/>
            <Text className="text-textGray text-lg pt-4 pb-16 text-center w-full font-poppins-regular">Use this application to control your parrots whenever you want</Text>
            <Button
                onPress={() => router.push("/login")}
                className="bg-bgPrimary"
                textClassName="text-white"
                text="Log In"
            />
            <Button
                onPress={() => router.push("/signup")}
                className={`border-custom-1 border-bgPrimary ${theme === 'dark' ? "bg-darkBgPrimary" : 'bg-white'}`}
                textClassName="text-textPrimary"
                text="Sign Up" />
        </View>
    );
}


