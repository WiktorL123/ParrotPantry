import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useUser} from "../../../context/UserContext";

    export default function Home() {
    const [message, setMessage] = useState(null);
    const {user, loadUserData} = useUser();

    useEffect(() => {
            loadUserData();

    }, []);

    return (
        <View>
            <Text>AAAA</Text>
            {message && <Text className="text-gray-500 text-center">{message}</Text>}
            {user?(
                <View>
                    <Text>Welcome {`${user.firstName} ${user.lastName}`}</Text>

                </View>
            ):<Text>no data</Text>}
        </View>
    );
}
