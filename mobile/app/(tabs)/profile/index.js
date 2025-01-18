import {View, Text} from "react-native";
import Button from "../../../components/Button";
import {useRouter} from "expo-router";


export default function UserProfile() {

    const router = useRouter();

    return (
        <View>
            <Text>User Profile</Text>
            <Button className="bg-bgPrimary" textClassName="text-white" text="Edit Profile" onPress={() => router.push('/profile/editProfile')} />
        </View>
    )
}
