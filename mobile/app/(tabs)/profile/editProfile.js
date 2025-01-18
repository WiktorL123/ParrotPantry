import {View, Text} from "react-native";
import {useTheme} from "../../../context/ThemeContext";
import Header from "../../../components/Heading";
import AddColorButton from "../../../components/AddColorButton";
import CustomTextInput from "../../../components/CustomTextInput";
import Button from "../../../components/Button";


export default function EditUserProfile() {

    const {theme} = useTheme();

    return (
        <View className={`${theme === 'dark' ? 'bg-darkBgPrimary' : 'bg-white'} h-screen`}>
            <View>
                <Header className="ml-10 py-4" text="Edit Profile" />
            </View>
            <View className="flex justify-center items-center">
                <AddColorButton
                    className="bg-placeholder"
                    textClassName="text-white"
                    text="+"
                />
                <CustomTextInput placeholder="Peter" />
                <CustomTextInput placeholder="Jones" />
                <CustomTextInput placeholder="PJones" />

                <Button text="Save" className="bg-bgPrimary my-8" textClassName="text-white" />
            </View>
        </View>
    );
}
