import {View, Text} from "react-native";
import {useTheme} from "../../../context/ThemeContext";
import Header from "../../../components/Heading";
import AddColorButton from "../../../components/AddColorButton";
import CustomTextInput from "../../../components/CustomTextInput";
import Button from "../../../components/Button";
import {useState} from "react";


export default function EditParrot() {

    const [lastVaccination, setLastVaccination] = useState(new Date());
    const { theme } = useTheme();

    return (
        <View className={`${theme === 'dark' ? 'bg-darkBgPrimary' : 'bg-white'} h-screen`}>
            <View>
                <Header className="ml-10 py-4" text="Edit Parrot" />
            </View>
            <View className="flex justify-center items-center">
                <AddColorButton
                    className="bg-placeholder"
                    textClassName="text-white"
                    text="+"
                />
                <CustomTextInput placeholder="Kajtek" />
                <CustomTextInput placeholder="200 g" />
                <CustomTextInput placeholder="Rudosterka Zielonolica" />
                <CustomTextInput placeholder="60 cm" />
                <CustomTextInput placeholder="Deli Nature nr68" />
                <CustomTextInput
                    placeholder="Last vaccination"
                    value={lastVaccination}
                    onChange={setLastVaccination}
                    isDatePicker={true}
                />
                <Button text="Save" className="bg-bgPrimary my-8" textClassName="text-white" />
            </View>
        </View>
    );
}
