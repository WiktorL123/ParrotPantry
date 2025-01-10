import {Text, TouchableOpacity} from "react-native";


export default function AddPhotoButton({onPress, className, textClassName}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`w-24 h-24 my-8 rounded-full flex justify-center items-center ${className}`}
        >
        <Text className={`text-center text-3xl  ${textClassName}`}>+</Text>
        </TouchableOpacity>
    )
}