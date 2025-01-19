import { View, Image, Text, TouchableOpacity, Modal } from "react-native";
import { useState } from "react";
import Button from "./Button";
import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";

export default function DashboardModal({ data, className }) {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const { theme } = useTheme();

    return (
        <View className="border-tabsPrimary border-2 mx-4 my-4 rounded-2xl ">
            <View className="flex-row items-center justify-start w-full p-4">
                <Image
                    source={data.logo}
                    className="rounded-full"
                    style={{ width: 50, height: 50 }}
                />
                <View className="ml-4 flex justify-center">
                    <Text
                        className={'font-bold text-lg text-tabsPrimary'}
                    >
                        {data.name}
                    </Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text className="text-textPrimary mt-1 pr-24" >Show Details</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="flex items-center mt-4">
                <Button
                    text={"Visit Shop"}
                    className="bg-bgPrimary w-[60%]"
                    textClassName={"text-white"}
                    onPress={() => router.push(data.url)}
                />
            </View>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white dark:bg-darkBgPrimary rounded-xl p-6 w-11/12">
                        <Text
                            className={`font-bold text-xl mb-4 text-tabsPrimary text-center` }
                        >
                            {data.name}
                        </Text>
                        {data.description && <Text className="mb-2 text-textGray">{data.description}</Text>}
                        {data.address && <Text className="mb-2 text-textGray">Address: {data.address}</Text>}
                        {data.contact && <Text className="mb-2 text-textGray">Contact: {data.contact}</Text>}
                        {data.specialization && (
                            <Text className="mb-2 text-textGray">
                                Specialization: {data.specialization}
                            </Text>
                        )}

                        <Button
                            text={"Close"}
                            className="bg-bgPrimary w-3/5 mt-4 self-center"
                            textClassName={"text-white"}
                            onPress={() => setModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}
