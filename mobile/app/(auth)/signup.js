import {Text, View} from "react-native";
import Header from "../../components/Heading"
import AddPhotoButton from "../../components/AddPhotoButton";
import CustomTextInput from "../../components/CustomTextInput";
import {useTheme} from "../../context/ThemeContext";


export default function signup() {

    const { theme } = useTheme()
    return (
        <View className={`${theme==='dark' ? 'bg-darkBgPrimary' :'bg-white'} h-screen`}>
            <View>
                <Header className="ml-10 py-4" text="Create new account" />
            </View>
            <View className="flex justify-center items-center">
                <AddPhotoButton className="bg-placeholder" textClassName="text-white" />
                <CustomTextInput placeholder="First Name" />
                <CustomTextInput placeholder="Last Name" />
                <CustomTextInput placeholder="Username" />
                <CustomTextInput placeholder="E-mail Address" />
                <CustomTextInput placeholder="Password" />
                <CustomTextInput placeholder="Confirm Password" />
            </View>
        </View>
    )
}