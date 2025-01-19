import {View, Text, Platform, StatusBar, SafeAreaView} from "react-native";
import {useTheme} from "../../../context/ThemeContext";
import CustomDropdown from "../../../components/CustomSelect";
import {useState} from "react";
import ExampleChart from "../../../components/ExampleChart";



export default function Statistics() {
    const [selectedOption, setSelectedOption] = useState("Kajtek");


    const {theme} = useTheme();

    return (
        <SafeAreaView className={`${theme==='dark' ? 'bg-darkBgPrimary' :'bg-white'} flex-1`}
            style={{
                flex: 1,
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }}
        >
            <View className={`${theme==='dark' ? 'bg-darkBgPrimary' :'bg-white'} h-screen pt-8 flex items-center`}>
                <CustomDropdown
                    options={["Kajtek", "Felek", "Milo"]}
                    selectedValue={selectedOption}
                    onSelect={setSelectedOption}
                />
                <ExampleChart />
            </View>
        </SafeAreaView>
    )
}
