import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {useTheme} from "../context/ThemeContext";

export default function NotificationModal() {

    const {theme} = useTheme();

    return (
        <View className={`${theme === 'dark' ? 'bg-darkBgPrimary' : 'bg-white'} border-tabsPrimary border-custom-1 max-w-md w-full shadow-lg rounded-lg p-4 mx-auto my-4`}>
            <Text className="text-lg font-bold text-bgPrimary mb-2">Name: Poranne leki</Text>

            <View className="mt-2">
                <Text className="text-textGray text-base leading-relaxed">
                    <Text className="font-medium">Description:</Text> Podawanie leków jest bardzo ważne w trosce o swoich pupili.
                </Text>
                <View className="flex-row items-center mt-3">
                    <MaterialIcons name="info-outline" size={18} color="#5125BF" />
                    <Text className="ml-2 text-textGray text-base">Typ powiadomienia: Powtarzalny</Text>
                </View>
                <View className="flex-row items-center mt-2">
                    <MaterialIcons name="schedule" size={18} color="#5125BF" />
                    <Text className="ml-2 text-textGray text-base">Godzina: 10:00</Text>
                </View>
            </View>

            <TouchableOpacity
                className="bg-bgPrimary w-4/5 py-2 px-6 rounded-full m-auto mt-4"
                activeOpacity={0.7}
            >
                <Text className="text-white font-semibold text-center">Delete Notification</Text>
            </TouchableOpacity>
        </View>
    );
}
