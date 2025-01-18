import {View, Text, ScrollView} from "react-native";
import { useState, useEffect } from "react";
import {useRouter} from "expo-router";
import {useUser} from "../../../context/UserContext";
import Header from "../../../components/Heading";
import UserWelcome from "../../../components/UserWelcome";
import Button from "../../../components/Button";
import {useTheme} from "../../../context/ThemeContext";


    export default function Home() {
    const {user, loadUserData} = useUser();

    const {theme} = useTheme()

    const router = useRouter();

    useEffect(() => {
            loadUserData();

    }, []);

    return (
          <ScrollView
              automaticallyAdjustContentInsets={false}
              style={{backgroundColor: theme === 'dark' ? '#121212' :'#FFFFFF', minHeight: '100%', paddingTop: 32}} >
              {user ? (
                  <UserWelcome
                  firstName={user.firstName}
                  lastName={user.lastName}
                  bgColor={user.userColor || '#CCCCCC'}
                  text={`${user.firstName[0].toUpperCase()} ${user.lastName[0].toUpperCase()}`}
                  textClassName="text-white text-base"
                  className="w-9 h-9 my-1.5"
                  onPress={() => {router.push('/profile')}}
                  />
              ) :(
                  <Text>loading...</Text>
              )}

              <View>
                  <Button className="bg-bgPrimary" textClassName="text-white" text="Add new parrot" onPress={() => router.push('/home/addParrot')}/>
                  <Button className="bg-bgPrimary" textClassName="text-white" text="Edit parrot" onPress={() => router.push('/home/editParrot')}/>
              </View>

          </ScrollView>
    );
}
