import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';


export default function App() {
    return (
        <View className="flex-1 items-center justify-center p-5 bg-white">
            <Text className="text-pink-500">Siema</Text>
            <StatusBar style="auto" />
        </View>
    );
}


