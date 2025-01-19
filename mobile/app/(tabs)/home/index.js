import {View, Text, ScrollView, SafeAreaView, StatusBar, Platform} from "react-native";
import {useEffect, useState} from "react";
import { useRouter} from "expo-router";
import { useUser} from "../../../context/UserContext";
import UserWelcome from "../../../components/UserWelcome";
import Button from "../../../components/Button";
import {useTheme} from "../../../context/ThemeContext";
import DashboardSectionTitle from "../../../components/DashboardSectionTitle";
import DashboardModal from "../../../components/DashboardModal";
import ParrotDashboardModal from "../../../components/ParrotDashboardModal";
import {MaterialIcons} from "@expo/vector-icons";


    export default function Home() {

    const {user, loadUserData} = useUser();
    const  shop = {
                        name: 'zooplus',
                        url:  'https://www.zooplus.pl/checkout/login?notLoggedIn=true',
                        logo: require('../../../assets/icon.png'),
                        description: 'Description for Shop 1'
                        }
    const vet = {
        name: 'Veterzynarz Przymorze',
        address: 'Street 1, City',
        contact: '+12345678900',
        specialization: 'Exotic birds',
        url: 'https://nordvet.pl/',
        logo: require('../../../assets/icon.png'),

    }

    const parrot =  {
        name: "Rio",
        species: "Macaw",
        age: 2,
        wingspan: 30,
        food: "seeds",
        lastVaccination: new Date("2025-01-01").toDateString()
    }
    const {theme} = useTheme()

    const router = useRouter();

    useEffect(() => {
            loadUserData();

    }, []);

    return (

        <SafeAreaView
            className={`${theme==='dark' ? 'bg-darkBgPrimary' :'bg-white'} flex-1`}
            style={{
                flex: 1,
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
                      }}
        >

          <ScrollView
              automaticallyAdjustContentInsets={false}
          >
              {user ? (
                  <UserWelcome
                  firstName={user.firstName}
                  lastName={user.lastName}
                  bgColor={user.userColor || '#CCCCCC'}
                  text={`${user.firstName[0].toUpperCase()} ${user.lastName[0].toUpperCase()}`}
                  textClassName="text-white text-base"
                  className="w-9 h-9 my-2/3"
                  onPress={() => {router.push('/profile')}}
                  />
              ) :(
                  <Text>loading...</Text>
              )}

              <View className={'my-8'}>
                  <DashboardSectionTitle text={'Your Parrots'} className={'ml-10 my-4'}/>

                  <ParrotDashboardModal data={parrot} onAddNew={()=>router.push('/home/addParrot')}/>
                  <ParrotDashboardModal data={parrot} onAddNew={()=>router.push('/home/addParrot')}/>
                  <ParrotDashboardModal data={parrot} onAddNew={()=>router.push('/home/addParrot')}/>
                  <ParrotDashboardModal data={parrot} onAddNew={()=>router.push('/home/addParrot')}/>
                  <Button
                          text="Add New Parrot"
                          className="bg-bgPrimary m-auto"
                          textClassName="text-white"
                          onPress={()=>router.push('/home/addParrot')}
                      />
              </View>

              <View >
                  <DashboardSectionTitle text={'Popular Pet Stores'} className={'ml-10 my-4'}/>
                  <ScrollView
                  horizontal={true}
                  >
                      <DashboardModal data={shop}/>
                      <DashboardModal data={shop}/>
                      <DashboardModal data={shop}/>

                  </ScrollView>

              </View>
              <View>
                  <DashboardSectionTitle text={'Popular Veterinarians'} className={'ml-10 my-4'}/>
                  <ScrollView
                  horizontal={true}
                  >
                      <DashboardModal data={vet}/>
                      <DashboardModal data={vet}/>
                      <DashboardModal data={vet}/>
                  </ScrollView>
              </View>

          </ScrollView>
            </SafeAreaView>
    );
}
