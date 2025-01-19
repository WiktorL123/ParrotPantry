import React, { useState } from "react";
import { TextInput, TouchableOpacity, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../context/ThemeContext";

export default function CustomTextInput({ placeholder, value, onChange, isDatePicker }) {
    const { theme } = useTheme();
    const [isPickerVisible, setIsPickerVisible] = useState(false);

    const textColor = '#9E9E9E'
    const bgColor = theme === "dark" ? "bg-darkBgPrimary" : "bg-white";

    return (
        <>
            {isDatePicker ? (
                <>
                    <TouchableOpacity
                        onPress={() => setIsPickerVisible(true)}
                        className={`w-[306px] h-[38px] rounded-3xl border border-gray-400 pl-4 my-4 font-medium justify-center ${bgColor}`}
                    >
                        <Text className={`${textColor}`}>
                            {value ? value.toLocaleDateString() : placeholder}
                        </Text>
                    </TouchableOpacity>

                    {isPickerVisible && (
                        <DateTimePicker
                            value={value || new Date()}
                            mode="date"
                            textColor={textColor}
                            display={Platform.OS === "ios" ? "inline" : "default"}
                            onChange={(event, selectedDate) => {
                                setIsPickerVisible(false);
                                if (selectedDate) {
                                    onChange(selectedDate);
                                }
                            }}
                        />
                    )}
                </>
            ) : (
                <TextInput
                    className={`w-[306px] h-[38px] rounded-3xl border border-gray-400 pl-4 my-4 font-medium ${bgColor} ${textColor}`}
                    placeholder={placeholder}
                    placeholderTextColor={textColor}
                    value={value}
                    onChangeText={onChange}
                />
            )}
        </>
    );
}
