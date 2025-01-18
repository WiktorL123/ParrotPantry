import React from "react";
import { TextInput } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function CustomTextInput({ placeholder, value, onChange, secureTextEntry }) {
    const { theme } = useTheme();

    return (
        <TextInput
            className={`w-[306px] h-[38px] rounded-3xl border border-gray-400 pl-4 my-4 font-medium ${
                theme === "dark" ? "text-white" : "text-black"
            }`}
            placeholder={placeholder}
            placeholderTextColor={theme === "dark" ? "#9E9E9E" : "#555555"}
            value={value}
            onChangeText={onChange}
            secureTextEntry={secureTextEntry}
        />
    );
}
