import {View, Text, ScrollView} from "react-native";
import { useState, useEffect } from "react";
import {useRouter} from "expo-router";
import {useUser} from "../../../context/UserContext";
import Header from "../../../components/Heading";
import UserWelcome from "../../../components/UserWelcome";
import Button from "../../../components/Button";


    export default function Home() {
    const {user, loadUserData} = useUser();

    const router = useRouter();

    useEffect(() => {
            loadUserData();

    }, []);

    return (
      <View>
          <ScrollView>
              <Header
                  className={'bg-white w-full h-1/10'}
              />
              {user ? (
                  <UserWelcome
                  firstName={user.firstName}
                  lastName={user.lastName}
                  bgColor={user.userColor || '#121212'}
                  />
              ) :(
                  <Text>loading...</Text>
              )}

          </ScrollView>
          <View>
              <Text>AAAA</Text>
              {message && <Text className="text-gray-500 text-center">{message}</Text>}
              {user?(
                  <View>
                      <Text>Welcome {`${user.firstName} ${user.lastName}`}</Text>
                      <View className={'rounded-full'} style={{backgroundColor: user.userColor}}>
                          <Text>{user.email}</Text>
                      </View>
                  </View>
              ):<Text>no data</Text>}
              <View>
                  <Button className="bg-bgPrimary" textClassName="text-white" text="Add new parrot" onPress={() => router.push('/home/addParrot')}/>
                  <Button className="bg-bgPrimary" textClassName="text-white" text="Edit parrot" onPress={() => router.push('/home/editParrot')}/>
              </View>
          </View>
        </View
    );
}
