import {View, Text, ScrollView} from "react-native";
import { useState, useEffect } from "react";
import {useUser} from "../../../context/UserContext";
import Header from "../../../components/Heading";
import UserWelcome from "../../../components/UserWelcome";

    export default function Home() {
    const {user, loadUserData} = useUser();

    useEffect(() => {
            loadUserData();

    }, []);

    return (
        <ScrollView>
            <Header
                className={'bg-white w-full h-1/10'}
            />
            {user ? (
                <UserWelcome
                firstName={user.firstName}
                lastName={user.lastName}
                bgColor={user.userColor || '#121212'}
                />
            ) :(
                <Text>loading...</Text>
            )}

        </ScrollView>
    );
}
