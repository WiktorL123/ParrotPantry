import React from 'react';
import {TextInput} from "react-native";



export default function CustomTextInput({placeholder, value, onChange, secureTextEntry}) {
    return (
        <TextInput
            className="w-custom-306 h-custom-38 rounded-3xl border-custom-1 border-placeholder pl-4 my-4 font-medium"
            placeholder={placeholder}
            placeholderTextColor="#9E9E9E"
            value={value}
            onChangeText={onChange}
            secureTextEntry={secureTextEntry}
        />
    )
}