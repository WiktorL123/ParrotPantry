import {View, Text} from "react-native";
import {useTheme} from "../../../context/ThemeContext";


export default function AddParrot() {

    const {theme} = useTheme();

    return (
        <View className={`${theme==='dark' ? 'bg-darkBgPrimary' :'bg-white'} h-screen`}>
            <Text>Add Parrot</Text>
        </View>
    )
}
