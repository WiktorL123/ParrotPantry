import { View, Text } from "react-native";
import { useState, useEffect } from "react";
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
                    <View className={'rounded-full'} style={{backgroundColor: user.userColor}}>
                        <Text>{user.email}</Text>
                    </View>
                </View>
            ):<Text>no data</Text>}
        </View>
    );
}
