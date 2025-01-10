import {useTheme} from "../context/ThemeContext";
import {Switch} from "react-native";


export default function ThemeSwitch() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Switch
            value={theme === "dark"}
            onValueChange={toggleTheme}
        />
    )
}