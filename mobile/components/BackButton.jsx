import {TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useRouter} from "expo-router";

export default function BackButton(){
    const router = useRouter();
    return (
        <TouchableOpacity className={'ml-4.5'} onPress={()=>router.back()}>
            <Ionicons name="arrow-back" size={24} color="#5125BF" />
        </TouchableOpacity>
    )
}