import React, {createContext, useContext, useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    const saveUserData = async (userData) => {

        console.log("Saving user data:", userData);
        console.log(`imie: ${userData.firstName} nazwisko: ${userData.lastName}`);
        const {authToken, email, userId, firstName, lastName, userColor} = userData
        try {
            await AsyncStorage.multiSet([
                ["authToken", authToken],
                ["email", email],
                ["userId", userId],
                ["firstName", firstName],
                ["lastName", lastName],
                ["userColor", userColor]
            ])
            setUser(userData);
        }
        catch (error) {
            console.log(error);
        }
    }
    const loadUserData = async () => {
        try {
            const values = await AsyncStorage.multiGet([
                "authToken",
                "email",
                "userId",
                "firstName",
                "lastName",
                "userColor",

            ]);
            console.log("values in storage:", values);
            const userData = Object.fromEntries(values);
            console.log('loading data:', userData);
            if (userData.authToken) {
                setUser(userData);
            } else {
                console.log("No token found");
            }
        } catch (error) {
            console.log("Error loading user data:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <UserContext.Provider
        value={{
            user,
            loading,
            saveUserData,
            loadUserData,
        }}>
            {children}
        </UserContext.Provider>
    )
}

