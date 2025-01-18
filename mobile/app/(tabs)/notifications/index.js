import React, { useState } from "react";
import {View, ScrollView, TouchableOpacity, Text, Platform, StatusBar, SafeAreaView} from "react-native";
import Medicine from "./medicine"
import Feeding from "./feeding"
import Weighting from "./weighting"
import VetVisit from "./vet-visit"
import {useTheme} from "../../../context/ThemeContext";

export default function Notifications() {
    const [activeTab, setActiveTab] = useState("Medicine");

    const {theme} = useTheme();



    const tabs = [
        { name: "Medicine", component: Medicine },
        { name: "Feeding", component: Feeding },
        { name: "Weighting", component: Weighting },
        { name: "Vet Visit", component: VetVisit },
    ];

    const ActiveComponent = tabs.find(tab => tab.name === activeTab)?.component;

    return (
        <SafeAreaView className={`${theme==='dark' ? 'bg-darkBgPrimary' :'bg-white'} flex-1`}
            style={{
                flex: 1,
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }}
        >
        <View className={`h-screen flex-1`}>
            <View className="h-16">
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className={`${theme==='dark' ? 'bg-darkBgPrimary' :'bg-white'} h-screen px-2`}
                >
                    {tabs.map((tab, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setActiveTab(tab.name)}
                            className={`mr-2 px-10 py-2 rounded-full h-10 mt-3 ${
                                activeTab === tab.name ? "bg-bgPrimary" : "bg-gray-200"
                            }`}
                        >
                            <Text
                                className={`text-sm font-medium ${
                                    activeTab === tab.name ? "text-white" : "text-gray-700"
                                }`}
                            >
                                {tab.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View className="flex-1 p-4">
                {ActiveComponent && <ActiveComponent />}
            </View>
        </View>
        </SafeAreaView>
    );
}
