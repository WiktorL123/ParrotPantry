import { View, Text } from "react-native";
import React from "react";
import Heading from "./Heading";
import AddColorButton from "./AddColorButton";

export default function UserWelcome({firstName, lastName, bgColor, className, text, textClassName, onPress}) {
    return (
        <View
        className={'flex flex-row mt-3 mx-6 justify-between'}>
            <View >
                <Text className={'color-textGray'}>
                    Welcome
                </Text>
               <Heading text={`${firstName} ${lastName}`} />
            </View>
            <AddColorButton color={bgColor} className={className} text={text} textClassName={textClassName} onPress={onPress} />
        </View>
    )
}