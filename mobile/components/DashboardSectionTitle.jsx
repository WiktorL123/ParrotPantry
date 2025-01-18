import React from "react";
import { Text } from "react-native";
export default function DashboardSectionTitle({text, className }) {
    return (
        <Text className={`color-textPrimary font-poppins-bold ${className}`}>
            {text}
        </Text>
    )
}