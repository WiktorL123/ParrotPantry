import { View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import Header from "../../../components/Heading";
import AddColorButton from "../../../components/AddColorButton";
import CustomTextInput from "../../../components/CustomTextInput";
import { useState } from "react";
import Button from "../../../components/Button";

export default function AddParrot() {
    const [lastVaccination, setLastVaccination] = useState(new Date());
    const { theme } = useTheme();

    return (
        <View className={`${theme === 'dark' ? 'bg-darkBgPrimary' : 'bg-white'} h-screen`}>
            <View>
                <Header className="ml-10 py-4" text="Add New Parrot" />
            </View>
            <View className="flex justify-center items-center">
                <AddColorButton
                    className="bg-placeholder"
                    textClassName="text-white"
                    text="+"
                />
                <CustomTextInput placeholder="Name" />
                <CustomTextInput placeholder="Weight" />
                <CustomTextInput placeholder="Spiece" />
                <CustomTextInput placeholder="Wingspan" />
                <CustomTextInput placeholder="Food" />
                <CustomTextInput
                    placeholder="Last vaccination"
                    value={lastVaccination}
                    onChange={setLastVaccination}
                    isDatePicker={true}
                />
                <Button text="Add parrot" className="bg-bgPrimary my-8" textClassName="text-white" />
            </View>
        </View>
    );
}
