import {Text, TouchableOpacity} from "react-native";


export default function AddColorButton({onPress, color, className, textClassName, text}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{backgroundColor: color|| '#CCCCCC'}}
            className={`w-24 h-24 my-2 rounded-full flex justify-center items-center ${className}`}
        >
        <Text className={`text-center text-3xl  ${textClassName}`}>{text}</Text>
        </TouchableOpacity>
    )
}