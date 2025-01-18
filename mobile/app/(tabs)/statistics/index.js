import {View, Text} from "react-native";
import {useTheme} from "../../../context/ThemeContext";


export default function Statistics() {

    const {theme} = useTheme();

    return (
        <View className={`${theme==='dark' ? 'bg-darkBgPrimary' :'bg-white'} h-screen pt-8`}>
            <Text>Statistics</Text>
        </View>
    )
}
