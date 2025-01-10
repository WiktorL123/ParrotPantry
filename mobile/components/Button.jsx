import {Text, TouchableOpacity} from "react-native";
import React from "react";


const Button = ({text, onPress, className, textClassName}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`w-custom-269 h-custom-38 rounded-3xl py-1 my-4 items-center justify-center ${className}`}
        >
            <Text
                className={`text-center font-medium ${textClassName}`}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button