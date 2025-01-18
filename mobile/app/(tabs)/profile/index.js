import {View, Text, TouchableOpacity, Alert, Linking, Platform} from "react-native";
import Switch from "../../../components/Switch"
import Button from "../../../components/Button";
import {useRouter} from "expo-router";
import {useTheme} from "../../../context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import UserWelcome from "../../../components/UserWelcome";
import {useUser} from "../../../context/UserContext";
import Heading from "../../../components/Heading";
import {useEffect} from "react";
import AddColorButton from "../../../components/AddColorButton";



export default function UserProfile() {
    const handlePress = async () => {
        const appStoreUrl = "https://apps.apple.com/app/id123456789";
        const playStoreUrl = "https://play.google.com/store/apps/details?id=com.example.app";

        const url = Platform.OS === "ios" ? appStoreUrl : playStoreUrl;

        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert("Error", "Cannot open the store link.");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong while opening the store link.");
        }
    };

    const {user, loadUserData} = useUser();

    useEffect(() => {
        loadUserData();

    }, []);


    const {theme} = useTheme();

    const router = useRouter();

    return (
        <View className={`${theme==='dark' ? 'bg-darkBgPrimary' :'bg-white'} flex-1`}>
            <View className="flex-row justify-between items-center pt-8 px-2 mb-4">
                <Switch />
                <TouchableOpacity onPress={() => router.push('/')}>
                    <MaterialIcons name="logout" size={24} color="#8e8e93"/>
                </TouchableOpacity>
            </View>
            <View className="flex items-center mt-12">
                <AddColorButton
                    className="bg-placeholder my-2"
                    textClassName="text-white"
                    text={`${user.firstName[0].toUpperCase()} ${user.lastName[0].toUpperCase()}`}
                    color={user.userColor}
                />
                {user ?
                    <>
                        <Heading text={`${user.firstName} ${user.lastName} `} className="text-center py-4"/>
                        <Text className="font-poppins-regular text-textGray text-base">{`${user.email}`}</Text>
                    </> :
                    <></>
                }

                <Button className="bg-bgPrimary my-8" textClassName="text-white" text="Edit Profile" onPress={() => router.push('/profile/editProfile')} />
                <Button className="bg-bgPrimary my-8" textClassName="text-white" text="Rate Us" onPress={handlePress}/>
            </View>
        </View>
    )
}
