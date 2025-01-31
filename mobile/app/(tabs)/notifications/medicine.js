import {View, Text, TouchableOpacity, ScrollView} from "react-native";
import CustomDropdown from "../../../components/CustomSelect";
import React, { useState } from "react";
import CustomTextInput from "../../../components/CustomTextInput";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../../../components/Button";
import ParrotDashboardModal from "../../../components/ParrotDashboardModal";
import NotificationModal from "../../../components/NotificationModal";

export default function Medicine() {
    const [selectedOption, setSelectedOption] = useState("Kajtek");
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <ScrollView>
            <View className="flex-1 items-center">
                {isExpanded && (
                    <>
                        <CustomDropdown
                            options={["Kajtek", "Felek", "Milo"]}
                            selectedValue={selectedOption}
                            onSelect={setSelectedOption}
                        />
                        <CustomTextInput placeholder="Name" />
                        <CustomTextInput placeholder="Description" />
                        <CustomTextInput placeholder="Type" />
                        <CustomTextInput placeholder="19.01.2025" isDatePicker={true} />
                    </>
                )}

                <TouchableOpacity
                    onPress={() => setIsExpanded(!isExpanded)}
                    className="mt-4 flex items-center"
                >
                    <MaterialIcons
                        name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                        size={24}
                        color="#5125BF"
                    />
                </TouchableOpacity>

                <Button className="bg-bgPrimary" textClassName="text-white" text="Add medicine" />

                <NotificationModal />
                <NotificationModal />
                <NotificationModal />

            </View>
        </ScrollView>
    );
}
