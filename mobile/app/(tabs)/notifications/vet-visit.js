import {View, Text, TouchableOpacity, ScrollView} from "react-native";
import CustomDropdown from "../../../components/CustomSelect";
import { useState } from "react";
import CustomTextInput from "../../../components/CustomTextInput";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../../../components/Button";
import NotificationModal from "../../../components/NotificationModal";

export default function VetVisit() {
    const [selectedParrotOption, setSelectedParrotOption] = useState("Kajtek");
    const [selectedVetOption, setSelectedVetOption] = useState("Vet1");
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <ScrollView>
            <View className="flex-1 items-center">
                {isExpanded && (
                    <>
                        <CustomDropdown
                            options={["Kajtek", "Felek", "Milo"]}
                            selectedValue={selectedParrotOption}
                            onSelect={setSelectedParrotOption}
                        />
                        <CustomDropdown
                            options={["Vet1", "Vet2", "Vet3"]}
                            selectedValue={selectedVetOption}
                            onSelect={setSelectedVetOption}
                        />
                        <CustomTextInput placeholder="Description" />
                        <CustomTextInput placeholder="19.01.2025" isDatePicker={true} />
                        <CustomTextInput placeholder="Hour" />
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

                <Button className="bg-bgPrimary" textClassName="text-white" text="Add vet visit" />

                <NotificationModal />
            </View>
        </ScrollView>
    );
}
