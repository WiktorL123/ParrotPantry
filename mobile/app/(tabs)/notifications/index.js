import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import Medicine from "./medicine"
import Feeding from "./feeding"
import Weighting from "./weighting"
import VetVisit from "./vet-visit"

export default function Notifications() {
    const [activeTab, setActiveTab] = useState("Medicine");

    const tabs = [
        { name: "Medicine", component: Medicine },
        { name: "Feeding", component: Feeding },
        { name: "Weighting", component: Weighting },
        { name: "Vet Visit", component: VetVisit },
    ];

    const ActiveComponent = tabs.find(tab => tab.name === activeTab)?.component;

    return (
        <View className="flex-1 bg-gray-100">
            <View className="h-16">
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="bg-white px-2"
                >
                    {tabs.map((tab, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setActiveTab(tab.name)}
                            className={`mr-2 px-10 py-2 rounded-full h-10 mt-3 ${
                                activeTab === tab.name ? "bg-blue-500" : "bg-gray-200"
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
    );
}
