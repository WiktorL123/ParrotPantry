import {Text, View} from "react-native";
import Header from "../../components/Heading"
import CustomTextInput from "../../components/CustomTextInput";
import Button from "../../components/Button";
import {useRouter} from "expo-router";


export default function login() {
    const router = useRouter();

    return (
        <View className="bg-white h-screen">
            <View>
                <Header className="ml-10 py-4" text="Sign In" />
            </View>
            <View className="flex justify-center items-center">
                <CustomTextInput placeholder="Username"/>
                <CustomTextInput placeholder="Password"/>
                <Text className="font-medium text-xs text-textSecondary ml-60 py-4" onPress={() => router.push('/forgot-password')}>Forgot password?</Text>
                <Button
                    text="Log In"
                    className="bg-bgPrimary my-12"
                    textClassName="text-white"
                />
                <Text className="text-textGray my-8">OR</Text>
                <Button
                    text="Login With Facebook"
                    className="bg-bgSecondary my-12"
                    textClassName="text-white"
                />
            </View>
        </View>
    )
}

