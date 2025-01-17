import { TouchableOpacity, View } from "react-native";

export const ColorPicker = ({ selectedColor, onSelect }) => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD'];

    return (
        <View className="flex flex-row justify-around mt-5 mb-5">
            {colors.map((color) => (
                <TouchableOpacity
                    key={color}
                    onPress={() => onSelect(color)}
                    style={{ backgroundColor: color }}
                    className={`w-12 h-12 rounded-full ${
                        selectedColor === color ? 'border-4 border-black' : ''
                    }`}
                />
            ))}
        </View>
    );
};
