import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Button from "./Button"

export default function ParrotDashboardModal({ data }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [visible, setVisible] = useState(true);
    const router = useRouter();

    return (
        <>
            {visible && (
                <View className="py-3 px-4 border-2 border-tabsPrimary mx-4 my-4 rounded-2xl flex-row justify-between  items-center">
                    <View className="flex" >
                        <Text className="text-textPrimary font-bold mb-1 mr-4 ">
                            {data.name} - {data.species}
                        </Text>

                        {isExpanded && (
                            <View className="mt-2">
                                <Text className="text-textGray text-sm leading-relaxed">
                                    <Text className="font-medium">Age:</Text> {data.age}
                                </Text>
                                <Text className="text-textGray text-sm leading-relaxed">
                                    <Text className="font-medium">Wingspan:</Text> {data.wingspan} cm
                                </Text>
                                <Text className="text-textGray text-sm leading-relaxed">
                                    <Text className="font-medium">Food:</Text> {data.food}
                                </Text>
                                {data.lastVaccination && (
                                    <Text className="text-textGray text-sm leading-relaxed">
                                        <Text className="font-medium">Last Vaccination:</Text> {data.lastVaccination}
                                    </Text>
                                )}
                            </View>
                        )}
                    </View>

                    {isExpanded ? "" : (
                        <View>
                            <TouchableOpacity
                                className={`w-custom-120 bg-bgPrimary h-8 rounded-3xl py-1 my-4 items-center justify-center `}
                                onPress={()=>router.push('/home/weightParrot')}
                            >
                                <Text className={`text-center font-medium text-white `}> Weight Parrot </Text>
                            </TouchableOpacity>
                        </View>
                    )}


                    <View className="flex-row items-center  ">
                        <MaterialIcons
                            className={'mr-4'}
                            name={isExpanded ? "keyboard-arrow-down" : "keyboard-arrow-up"}
                            size={24}
                            color="#5125BF"
                            onPress={() => setIsExpanded(!isExpanded)}
                        />

                        <TouchableOpacity className={'mr-1'} onPress={() => setVisible(false)}>
                            <MaterialIcons name="delete" size={24} color="#5125BF" />
                        </TouchableOpacity>

                        <TouchableOpacity className={'ml-1'} onPress={() => router.push('/home/editParrot')}>
                            <FontAwesome name="pencil" size={24} color="#5125BF" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    );
}
