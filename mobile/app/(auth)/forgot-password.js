import {View} from "react-native";
import Header from "../../components/Heading"
import CustomTextInput from "../../components/CustomTextInput"
import Button from "../../components/Button"


export default function ForgotPassword() {
    return (
        <View className="bg-white h-screen">
            <View>
                <Header className="ml-10 py-4 pb-12" text="Reset Password"/>
            </View>
            <View className="flex justify-center items-center">
                <CustomTextInput placeholder="E-mail Address" />
                <Button className="bg-bgPrimary my-8" textClassName="text-white" text="Send Link" />
            </View>
        </View>
    )
}