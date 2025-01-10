import {Text} from "react-native";
import React from "react";


export default function Heading({text, className}) {
    return (
        <Text className={`w-full text-textPrimary text-2xl font-poppins-bold ${className}`}>{text}</Text>
    )
}