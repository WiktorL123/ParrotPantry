import {View} from "react-native";
import Header from "../../../components/Heading"
import CustomTextInput from "../../../components/CustomTextInput"
import Button from "../../../components/Button"
import {useTheme} from "../../../context/ThemeContext";
import {useState} from "react";


export default function WeightParrot() {
    const { theme } = useTheme()
    const [weightingDate, setWeightingDate] = useState(new Date())

    return (
        <View className= {`h-screen ${theme === 'dark' ? 'bg-darkBgPrimary' : 'bg-white'}`}>
            <View>
                <Header className="ml-10 py-4 pb-12" text="Weight Parrot" />
            </View>
            <View className="flex justify-center items-center">
                <CustomTextInput placeholder="weight" />
                <CustomTextInput
                    isDatePicker={true}
                    placeholder={"19-01-2025"}
                    value={weightingDate}
                    onChange={setWeightingDate}
                />
                <Button className="bg-bgPrimary my-8" textClassName="text-white" text="Weight " />
            </View>
        </View>
    )
}