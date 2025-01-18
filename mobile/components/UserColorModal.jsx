import { View, Text } from "react-native";

export default function UserColorModal({ color, firstName }) {
    return (
        <View
            className="w-12 h-12 mt-3 text-sm text-white rounded-full"
            style={{ backgroundColor: color }}
        >
            <Text className="text-white text-lg font-bold">
                {firstName ? firstName[0] : "taki chuj"}
            </Text>
        </View>
    );
}
