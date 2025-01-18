import {View, Text, Platform, StatusBar, SafeAreaView} from "react-native";
import {useTheme} from "../../../context/ThemeContext";


export default function Statistics() {

    const {theme} = useTheme();

    return (
        <SafeAreaView className={`${theme==='dark' ? 'bg-darkBgPrimary' :'bg-white'} flex-1`}
            style={{
                flex: 1,
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }}
        >
            <View className={`${theme==='dark' ? 'bg-darkBgPrimary' :'bg-white'} h-screen pt-8`}>
                <Text>Statistics</Text>
            </View>
        </SafeAreaView>
    )
}
