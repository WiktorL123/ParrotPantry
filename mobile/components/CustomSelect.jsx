import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";

export default function CustomDropdown({ options, selectedValue, onSelect }) {
    const { theme } = useTheme();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <View className="w-[306px]">
            <TouchableOpacity
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex-row justify-between items-center w-full h-[38px] rounded-3xl border border-gray-400 px-4 my-4 ${
                    theme === "dark" ? "bg-darkBgPrimary" : "bg-white"
                }`}
            >
                <Text
                    className={`text-placeholder text-sm`}
                >
                    {selectedValue || "Select an option"}
                </Text>
                <MaterialIcons
                    name={isDropdownOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                    size={24}
                    color={theme === "dark" ? "#9E9E9E" : "#000000"}
                />
            </TouchableOpacity>

            {isDropdownOpen && (
                <View
                    className={`mt-2 rounded-lg border border-gray-300 ${
                        theme === "dark" ? "bg-darkBgPrimary" : "bg-white"
                    }`}
                >
                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                onSelect(option);
                                setIsDropdownOpen(false);
                            }}
                            className={`py-2 px-4 ${
                                index !== options.length - 1
                                    ? "border-b border-gray-300"
                                    : ""
                            }`}
                        >
                            <Text
                                className={`text-sm ${
                                    theme === "dark" ? "text-white" : "text-black"
                                }`}
                            >
                                {option}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
}

