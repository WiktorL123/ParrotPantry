import React from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import {useTheme} from "../context/ThemeContext";

export default function ExampleChart() {

    const {theme} = useTheme()

    return (
        <View className={`${theme === 'dark' ? 'bg-darkBgPrimary' : 'bg-white'} p-24 rounded-lg flex items-center justify-center`}>
            <LineChart
                data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                    datasets: [
                        {
                            data: [20, 45, 28, 80, 99],
                            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                        },
                        {
                            data: [10, 20, 50, 70, 80],
                            color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
                        },
                    ],
                }}
                width={Dimensions.get("window").width - 32}
                height={220}
                chartConfig={{
                    backgroundColor: "#2C2C2C",
                    backgroundGradientFrom: "#2C2C2C",
                    backgroundGradientTo: "#2C2C2C",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: "3",
                        strokeWidth: "2",
                        stroke: "#ffa726",
                    },
                }}
                bezier
                style={{
                    borderRadius: 16,
                }}
            />
        </View>
    );
}
