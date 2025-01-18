import { View, Text } from "react-native";
import React from "react";
import Heading from "./Heading";
import UserColorModal from "./UserColorModal";

export default function UserWelcome({firstName, lastName, bgColor}) {
    return (
        <View
        className={'flex flex-row mt-3 mx-6 justify-between'}>
            <View >
                <Text className={'color-textGray'}>
                    Welcome
                </Text>
               <Heading text={`${firstName} ${lastName}`} />
            </View>
            <UserColorModal  color={bgColor} firstName={firstName} />
        </View>
    )
}